#!/usr/bin/env -S npx tsx

import { Command } from "commander";
import fs from "fs";
import path from "path";
import { checkExport, checkExportSync, listExportsAsync } from "./utils/utils";
import z from "zod";

const program = new Command();

program
  .name("contract-gen")
  .description(
    "Generates a single Zod contract object from a file-based API structure"
  )
  // .requiredOption(
  //   "-i, --input <path>",
  //   "Input directory containing route files"
  // )
  // .requiredOption(
  //   "-o, --output <path>",
  //   "Output file path (e.g., src/index.ts)"
  // )
  .parse(process.argv);

const options = program.opts();
const SRC_DIR = path.resolve(process.cwd(), "./src/routes");
const OUTPUT_FILE = path.resolve(process.cwd(), "./src/contract.ts");

// Helper: Check if folder is a param (e.g. [userId])
const segmentIsPathParameter = (segment: string) =>
  segment.startsWith("[") && segment.endsWith("]");

async function generate() {
  // hold import statements at the top of the generated file
  const imports: string[] = [];

  let endpoints: {
    [key: string]: {
      request: any;
      response: any;
      metadata: any;
    };
  } = {};

  const requestTypes: string[] = [];
  const responseTypes: string[] = [];
  const endpointTypes: string[] = [];

  let route_tree: any = {};

  async function iterateDirectory(
    currentDirectory: string,
    route_tree: any,
    pathStack: string[]
  ) {
    console.log("Reading directory:", currentDirectory);
    // Read all files and folders in the current directory
    const dirItems = fs.readdirSync(currentDirectory);

    for (const dirItem of dirItems) {
      const fullPath = path.join(currentDirectory, dirItem);
      const pathStats = fs.statSync(fullPath);

      if (pathStats.isDirectory()) {
        // FOLDER NAME
        route_tree[dirItem.replace(/\[|\]/g, "")] = route_tree[dirItem] || {};
        await iterateDirectory(
          fullPath,
          route_tree[dirItem.replace(/\[|\]/g, "")],
          [...pathStack, dirItem]
        );
      } else if (dirItem.endsWith(".ts")) {
        // METADATA STUFF
        const endpointMethod = dirItem.replace(".ts", ""); // GET, POST
        const endpointRoute = "/" + pathStack.join("/"); // e.g., /users/[userId]/
        const endpointImportPath =
          "./routes/" + pathStack.join("/") + "/" + endpointMethod;

        const actualFilePath =
          "./src/routes/" + pathStack.join("/") + "/" + endpointMethod + ".ts";

        // FILE NAME
        const endpoint_signature = [...pathStack, endpointMethod]
          .join("_")
          .replace(/\[|\]/g, "");

        let request: any = {};
        let response: any = {};
        let metadata: any = {
          method: endpointMethod,
          path: endpointRoute,
          signature: endpoint_signature,
        };

        // PROCESS REQUEST STUFF
        const pathParams = pathStack
          .filter(segmentIsPathParameter)
          .map((p) => p.slice(1, -1));
        request["params"] =
          `__CODE_START__z.object({${pathParams.map((p) => `${p}: z.string()`).join(",")}})__CODE_END__`;

        // CHECK FILE EXPORTS
        const exports = await listExportsAsync(actualFilePath);
        for (const exportedVariable of exports) {
          if (exportedVariable === "response") {
            const schemaImportName = `${endpoint_signature}_response`;

            imports.push(
              `import { ${exportedVariable} as ${schemaImportName} } from "${endpointImportPath}";`
            );

            response = `__CODE_START__${schemaImportName}__CODE_END__`;
          } else {
            const schemaImportName = `${endpoint_signature}_${exportedVariable}`;

            // push schemas to response
            imports.push(
              `import { ${exportedVariable} as ${schemaImportName} } from "${endpointImportPath}";`
            );

            request[exportedVariable] =
              `__CODE_START__${schemaImportName}__CODE_END__`;
          }
        }

        // ADD TO ENDPOINTS MAP
        endpoints[endpoint_signature] = {
          request: request,
          response: response,
          metadata: metadata,
        };

        // Also add to route tree
        route_tree[endpointMethod] = {
          request: request,
          response: response,
          metadata: metadata,
        };

        // add to types
        requestTypes.push(
          `${endpoint_signature} : { [K in keyof typeof EndpointSchemas[ ${'"' + endpoint_signature + '"'} ][${'"' + "request" + '"'}]]: z.infer<typeof EndpointSchemas[ ${'"' + endpoint_signature + '"'} ][${'"' + "request" + '"'}][K]> }`
        );
 

        responseTypes.push(
          `${endpoint_signature} : { [K in keyof typeof ${endpoint_signature}_response]: z.infer<typeof ${endpoint_signature}_response[K]> }`
        );

        endpointTypes.push(`  ${'"' + endpoint_signature + '"'}: {
          request: { [K in keyof typeof EndpointSchemas[ ${'"' + endpoint_signature + '"'} ][${'"' + "request" + '"'}]]: z.infer<typeof EndpointSchemas[ ${'"' + endpoint_signature + '"'} ][${'"' + "request" + '"'}][K]> };
        response: { [K in keyof typeof ${endpoint_signature}_response]: z.infer<typeof ${endpoint_signature}_response[K]> };
       }`);

        // ${"\"" + "hello world" + "\""}

        // ${`${"\"" + "hello world" + "\""}`}
      }
    }
  }

  await iterateDirectory(SRC_DIR, route_tree, []);

  // Serialize the map to a string, but preserve the variable names
  let jsonString = JSON.stringify(endpoints, null, 2);

  // Unwrap the variable names (remove quotes around them)
  // This turns "api_users_GET" string back into the actual object reference
  jsonString = jsonString.replace(/"__CODE_START__(.*?)__CODE_END__"/g, "$1");

  let route_tree_string = JSON.stringify(route_tree, null, 2).replace(
    /"__CODE_START__(.*?)__CODE_END__"/g,
    "$1"
  );

  const fileContent = `
// THIS FILE IS AUTO-GENERATED. DO NOT EDIT. 
// RUN "pnpm contract-gen -i ./src/routes -o ./src/contract.ts" TO SYNC CHANGES.

import {z} from "zod";

${imports.join("\n")}

export const EndpointSchemas = ${jsonString}

export const RouteTree = ${route_tree_string}

export type ResponseTypes = {
  ${responseTypes.join(",\n  ")}
}
  
export type RequestTypes = {
  ${requestTypes.join(",\n  ")}
}

export type EndpointTypes = {
  ${endpointTypes.join(",\n  ")}
}
  
export type Response<T extends keyof ResponseTypes> = ResponseTypes[T];
export type Request<T extends keyof RequestTypes> = RequestTypes[T];
export type Endpoint<T extends keyof EndpointTypes> = EndpointTypes[T];

`;

  fs.writeFileSync(OUTPUT_FILE, fileContent);
  console.log("✅ API Contract generated at src/indexxx.ts");
}

generate().catch((err) => {
  console.error("❌ Generation failed:", err);
  process.exit(1);
});

// export interface AllTypes {
//   ${types.join(",\n  ")}
// }
// export type Type<T extends keyof AllTypes > =
//   AllTypes[T] ;

// function generate() {
//   if (!fs.existsSync(SRC_DIR)) {
//     console.error(`❌ Input directory not found: ${SRC_DIR}`);
//     process.exit(1);
//   }

//   const imports: string[] = [];
//   const structure: any = {};

//   function walk(currentDir: string, currentMap: any, pathStack: string[]) {
//     const items = fs.readdirSync(currentDir);

//     for (const item of items) {
//       const fullPath = path.join(currentDir, item);
//       const stat = fs.statSync(fullPath);

//       if (stat.isDirectory()) {
//         const key = isParam(item) ? `sw_param_${item.slice(1, -1)}` : item;
//         currentMap[key] = currentMap[key] || {};

//         if (isParam(item)) {
//           currentMap[key]["__paramName"] = item.slice(1, -1);
//         }

//         walk(fullPath, currentMap[key], [...pathStack, item]);
//       } else if (item.endsWith(".ts") || item.endsWith(".tsx")) {
//         const method = item.replace(/\.tsx?$/, ""); // GET, POST

//         // 1. Generate unique variable name for import
//         const safePath = pathStack.map(s => s.replace(/\[|\]/g, '')).join('_');
//         const importName = `route_${safePath}_${method}`;

//         // 2. Calculate relative path from OUTPUT_FILE location to the ROUTE file
//         const outputDir = path.dirname(OUTPUT_FILE);
//         let relativePath = path.relative(outputDir, fullPath);

//         // --- FIX STARTS HERE ---
//         // Normalize path separators to forward slashes (/) for imports
//         // This handles Windows paths (e.g., ..\api\file) correctly
//         relativePath = relativePath.split(path.sep).join("/");
//         // --- FIX ENDS HERE ---

//         // Ensure relative path starts with "./" or "../"
//         if (!relativePath.startsWith(".")) {
//           relativePath = "./" + relativePath;
//         }

//         // Remove extension for import
//         relativePath = relativePath.replace(/\.tsx?$/, "");

//         imports.push(`import * as ${importName} from "${relativePath}";`);

//         const pathParams = pathStack.filter(isParam).map((p) => p.slice(1, -1));

//         currentMap[method] = `__CODE_START__${importName}__CODE_END__`;
//         currentMap[`${method}_params`] = pathParams;
//       }
//     }
//   }

//   walk(SRC_DIR, structure, []);

//   // Serialize and unwrap
//   let jsonString = JSON.stringify(structure, null, 2);
//   jsonString = jsonString.replace(/"__CODE_START__(.*?)__CODE_END__"/g, "$1");

//   const fileContent = `
// // --------------------------------------------------------------------------
// // ⚠️ THIS FILE IS AUTO-GENERATED BY @repo/contract-gen. DO NOT EDIT.
// // --------------------------------------------------------------------------
// import { z } from 'zod';

// ${imports.join("\n")}

// export const contract = ${jsonString} as const;
// `;

//   // Ensure output dir exists
//   fs.mkdirSync(path.dirname(OUTPUT_FILE), { recursive: true });
//   fs.writeFileSync(OUTPUT_FILE, fileContent);

//   console.log(`✅ Contract generated at: ${options.output}`);
// }
