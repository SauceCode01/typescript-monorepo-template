import fs from "fs";
import path from "path";

const SRC_DIR = path.join(__dirname, "../src/routes");
const OUTPUT_FILE = path.join(__dirname, "../src/indexxx.ts");

// Helper to check if a directory is a param (e.g., [userId])
const isParam = (name: string) => name.startsWith("[") && name.endsWith("]");

function generateContract() {
  const imports: string[] = [];
  const map: any = {};

  function walk(dir: string, parentMap: any, pathStack: string[]) {
    const items = fs.readdirSync(dir);

    for (const item of items) {
      const fullPath = path.join(dir, item);
      const stat = fs.statSync(fullPath);

      if (stat.isDirectory()) {
        const key = isParam(item) ? "sw_param_" + item.slice(1, -1) : item;
        parentMap[key] = parentMap[key] || {};

        // If it's a param folder, we mark it metadata
        if (isParam(item)) {
          parentMap[key]["__paramName"] = item.slice(1, -1);
        }

        walk(fullPath, parentMap[key], [...pathStack, item]);
      } else if (item.endsWith(".ts")) {
        const method = item.replace(".ts", ""); // GET, POST

        // Create a unique variable name for the import
        // e.g. api_users_userId_GET
        const importName = `api_${pathStack.map((s) => s.replace(/\[|\]/g, "")).join("_")}_${method}`;

        // Generate the relative path for the import
        const relativePath = "./routes/" + pathStack.join("/") + "/" + method;
        imports.push(`import * as ${importName} from "${relativePath}";`);

        // Collect path params from the stack (e.g., [userId])
        const pathParams = pathStack.filter(isParam).map((p) => p.slice(1, -1));

        // Assign the import to the map
        parentMap[method] = `__CODE_START__${importName}__CODE_END__`;

        // Inject the pathParams metadata
        parentMap[method + "_params"] = pathParams;
      }
    }
  }

  walk(SRC_DIR, map, []);

  // Serialize the map to a string, but preserve the variable names
  let jsonString = JSON.stringify(map, null, 2);

  // Unwrap the variable names (remove quotes around them)
  // This turns "api_users_GET" string back into the actual object reference
  jsonString = jsonString.replace(/"__CODE_START__(.*?)__CODE_END__"/g, "$1");

  const fileContent = `
// THIS FILE IS AUTO-GENERATED. DO NOT EDIT.
import { z } from 'zod';

${imports.join("\n")}

export const contract = ${jsonString} as const;
`;

  fs.writeFileSync(OUTPUT_FILE, fileContent);
  console.log("✅ API Contract generated at src/indexxx.ts");
}

generateContract();
