import z, { ZodType } from "zod";

export type DeepInfer<T> = {
  [K in keyof T]: T[K] extends z.ZodTypeAny
    ? z.infer<T[K]> // Case A: It's a Schema -> Infer it
    : T[K] extends Record<string, any>
      ? DeepInfer<T[K]> // Case B: It's a Namespace -> Go Deeper
      : never; // Case C: Helper functions/consts -> Hide
};

export type DeepInferSchema<T> = {
  [K in keyof T]: T[K] extends z.ZodTypeAny
    ? T[K] // Case A: It's a Schema -> Infer it
    : T[K] extends Record<string, any>
      ? DeepInferSchema<T[K]> // Case B: It's a Namespace -> Go Deeper
      : never; // Case C: Helper functions/consts -> Hide
};

export type ZodValidatorType = ZodType<any>;

// export type EndpointType = {
//   method: "GET" | "POST" | "PUT" | "DELETE";
//   request: {
//     params?: ZodValidatorType;
//     body?: ZodValidatorType;
//     query?: ZodValidatorType;
//   };
//   response: {
//     [statusCode: number]: ZodValidatorType;
//   };
// };

// export type RouteType = {
//   path: string;
//   routes: RoutesType;
// };

export class EndpointType {
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH" | "LIST" | "UPDATE" =
    "GET";
  request: {
    params?: ZodValidatorType;
    body?: ZodValidatorType;
    query?: ZodValidatorType;
  } = {};
  response: {
    [statusCode: number]: ZodValidatorType;
  } = {};
}
 

export class RouteType {
  path: string = "/";
  routes: {
    [routeName: string]: RouteType | EndpointType;
  } = {};
}

export type RoutesType = {
  [routeName: string]: RouteType | EndpointType;
};

type InferEndpoint <T extends EndpointType> = {
  method: T["method"];
  request: {
    [K in keyof T["request"] as T["request"][K] extends ZodType<any>
      ? K
      : never]: z.infer<NonNullable<T["request"][K]>>;
  }, 
  response: {
    [K in keyof T["response"]]:  T["response"][K] extends ZodType<any>
      ? z.infer<T["response"][K]>
      : never;
  };
}

export type ApiContract<T extends RouteType> = {
  [K in keyof T["routes"]]: T["routes"][K] extends RouteType
    ? ApiContract<T["routes"][K]> // Case B: It's a Namespace -> Go Deeper
    : T["routes"][K] extends EndpointType
      ? InferEndpoint<T["routes"][K]> // Case A: It's a Schema -> Infer it
      : never; // Case C: Helper functions/consts -> Hide
};

export type ApiTypes<T extends RouteType> = {
  [K in keyof T["routes"]]: T["routes"][K] extends RouteType
    ? ApiContract<T["routes"][K]> // Case B: It's a Namespace -> Go Deeper
    : T["routes"][K] extends EndpointType
      ? DeepInfer<T["routes"][K]> // Case A: It's a Schema -> Infer it
      : never; // Case C: Helper functions/consts -> Hide
};

export const createRoutes = <T extends RoutesType>(routes: T) => routes;

export const createRoute = <T extends RouteType>(route: T): T => {
  const newRoute = new RouteType();
  newRoute.path = route.path;
  newRoute.routes = route.routes;
  return newRoute as T;
  // return;
};

export const createEndpoint = <T extends EndpointType>(endpoint: T): T => {
  const newEndpoint = new EndpointType();
  newEndpoint.method = endpoint.method;
  newEndpoint.request = endpoint.request;
  newEndpoint.response = endpoint.response;
  return newEndpoint as T;
};

export const createContract = <T extends RouteType>(
  rootRoute: T
): ApiContract<T> => {
  const buildContract = <T extends RouteType>(route: RouteType): ApiContract<T> => {
    const contract: any = {};

    // iterate thru route.routes
    for (const [key, value] of Object.entries(route.routes)) {
      if (value instanceof RouteType) {
        // if value is a route, recurse
        contract[key] = buildContract(value);
      } else {
        // if value is an endpoint, assign directly
        contract[key] = value as EndpointType;
      }
    }
    return contract;
  };
  return buildContract(rootRoute) as ApiContract<T>;
};

// export type ContractType<T extends RoutesType> = {
//   [K in keyof T]: T[K] extends RouteType
//     ? ContractType<T[K]["routes"]>
//     : T[K] extends EndpointType
//       ? T[K]
//       : never;
// };

// export const createContract = <T extends RoutesType>(
//   routes: T
// ): ContractType<T> => {
//   //
// };
