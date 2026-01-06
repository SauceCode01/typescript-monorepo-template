import { Request, RequestHandler, Response } from "express";
import z, { ZodType } from "zod";

export type DeepInfer<T> = {
  [K in keyof T]: T[K] extends z.ZodTypeAny
    ? z.infer<T[K]> // Case A: It's a Schema -> Infer it
    : T[K] extends Record<string, any>
      ? DeepInfer<T[K]> // Case B: It's a Namespace -> Go Deeper
      : never; // Case C: Helper functions/consts -> Hide
};

export type SchemaType = {
  path?: string;
  request: {
    query?: ZodType<any>;
    params?: ZodType<any>;
    body?: ZodType<any>;
  };
  response: {
    [statusCode: number]: ZodType<any>;
  };
};
export type ApiType = {
  [key: string]: SchemaType | ApiType;
};

type HttpMethod =
  | "GET"
  | "POST"
  | "PUT"
  | "DELETE"
  | "PATCH"
  | "LIST"
  | "UPDATE";

export type ApiTypeStrict = {
  [key: string]:
    | SchemaType // direct HTTP method schema
    | { [K in HttpMethod]?: SchemaType } // grouped HTTP methods
    | ApiTypeStrict; // nested namespace
};

type InferHandlerResult<T extends SchemaType> = {
  [K in keyof T["response"]]: {
    status: K; // The status code (e.g., 200)
    body: z.infer<T["response"][K]>; // The schema for that code
  };
}[keyof T["response"]];

type InferRequestInput<T extends SchemaType> =
  // REQUIRED keys (schema exists)
  {
    [K in keyof T["request"] as T["request"][K] extends ZodType<any>
      ? K
      : never]: z.infer<NonNullable<T["request"][K]>>;
  } & {
    // FORBIDDEN keys (schema does not exist)
    [K in keyof T["request"] as T["request"][K] extends ZodType<any>
      ? never
      : K]?: never;
  };
type ResponseSchemaOf<
  T extends SchemaType,
  S extends keyof T["response"],
> = z.infer<T["response"][S]>;

export const EnforceSchemas = <T extends SchemaType>(
  schema: T,
  handler: ({
    input,
    output,
    res,
    req,
  }: {
    input: InferRequestInput<T>;
    output: <S extends keyof T["response"]>(
      status: S,
      body: ResponseSchemaOf<T, S>
    ) => { status: S; body: ResponseSchemaOf<T, S> };
    res: Response;
    req: Request;
  }) => Promise<InferHandlerResult<T>>
): RequestHandler => {
  return async (req, res, next) => {
    try {
      const { request, response } = schema;

      const input = {} as InferRequestInput<T>;

      if (request.query) {
        console.log("Parsing query", req.query, JSON.stringify(req.query));
        (input as any).query = await request.query.parseAsync(req.query);
      }

      if (request.params) {
        (input as any).params = await request.params.parseAsync(req.params);
      }

      if (request.body) {
        (input as any).body = await request.body.parseAsync(req.body);
      }

      const output = <S extends keyof T["response"]>(
        status: S,
        body: ResponseSchemaOf<T, S>
      ) => {
        return { status, body } as const;
      };

      const result = await handler({ input, output, req, res });

      const statusCode = result.status;
      const responseSchema = (response as any)[statusCode];

      if (responseSchema) {
        await responseSchema.parseAsync(result.body);
      }

      res.status(Number(statusCode)).json(result.body);
    } catch (error) {
      next(error);
    }
  };
};
