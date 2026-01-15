import express from "express";
import { setupLoader } from "./loaders/setup.loader.js";
import { parsersLoader } from "./loaders/parse.loader.js";
import { routesLoader } from "./loaders/routes.loader.js";
import { errorHandlerLoader } from "./loaders/errorHandlers.loader.js";
import { configs } from "./configs/configs.js";
import { EndpointSchemas, RouteTree, Response } from "@packages/rest-contracts"; 

// import { createExpressController } from "@packages/api-typing";
import { createExpressController, EndpointDef } from "@packages/contract-gen";
import { Contract } from "@packages/api-contracts";
import z, { ZodAny, ZodType } from "zod";
  
 export interface EndpointDefff {
  request?: {
    params?: ZodType<any>;
    body?: ZodType<any>;
    query?: ZodType<any>;
  };
  response: {
    [statusCode: number]: ZodType<any>;
  };
  metadata?: {
    method: string;
    path: string;
    signature: string;
  };
}
const a:EndpointDef   = RouteTree.archives.archiveId.PATCH;

const b  = Contract.articleSystem.articles.get;

// const handler = createExpressController(
//   a,
//   async ({ input, ctx, output }) => {
//     // implement your logic here
//   }
// )

const createEController = <T extends EndpointDef>(contract: T) => {};

createEController(a);

// const b: Response<"archives_archiveId_PATCH">[200] = {
//   status: "string",
//   message: "string",
//   data: {
//     something: "string",
//   },
// };

const app = express();
const port = configs.port;

// setup api
setupLoader(app);

// Parsing body
parsersLoader(app);

// load routes
routesLoader(app);

// error handlers
errorHandlerLoader(app);

// listen
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
