import fs from "fs";
import path from "path";
import { listExportsAsync, listExportsSync } from "./utils";

export const scanModels = async (modelDir: string) => {
  const imports: {
    name: string;
    alias: string;
    path: string;
  }[] = [];

  const modelTree: {
    [key: string]: unknown | { [key: string]: unknown };
  } = {};

  const modelTypes: {
    signature: string; 
    typeDef: string;
  }[] = [];

  async function iterateModels(
    currentDirectory: string,
    tree: any,
    pathStack: string[]
  ) {
    const dirItems = fs.readdirSync(currentDirectory);
    console.log("processing dir:", currentDirectory);
    console.log("dir items:", dirItems);

    for (const dirItem of dirItems) {
      console.log("processing item:", dirItem);
      const subDirPath = path.join(currentDirectory, dirItem);
      const pathStats = fs.statSync(subDirPath);

      if (pathStats.isDirectory()) {
        // FOLDER NAME
        tree[dirItem] = tree[dirItem] || {};
        console.log("crated new tree endtry for " + dirItem);
        await iterateModels(subDirPath, tree[dirItem], [...pathStack, dirItem]);
      } else if (dirItem.endsWith(".ts")) {
        // MODEL FILE
        const raw_model_name = dirItem.replace(".ts", ""); // GET, POST
        const edited_model_name = raw_model_name + "_model";
        const endpointImportPath =
          "./models/" + pathStack.join("/") + "/" + raw_model_name;
        const fileSignature = ["model", ...pathStack, raw_model_name]
          .join("_")
          .replace(/\//g, "")
          .replace(/\./g, "_");

        console.log(
          "creatignf file sign",
          fileSignature,
          pathStack,
          raw_model_name
        );

        const actualFilePath =
          "./src/models/" + pathStack.join("/") + "/" + raw_model_name + ".ts";

        // CHECK FILE EXPORTS
        console.log("checking file exports:", actualFilePath);
        const exports = listExportsSync(actualFilePath);
        console.log("found exports:", exports);
        for (const exportedVariable of exports) {
          console.log(
            "processing export:",
            exportedVariable,
            "of model name" + raw_model_name
          );
          const importAlias = `${fileSignature}_${exportedVariable}`;

          imports.push({
            name: exportedVariable,
            alias: importAlias,
            path: endpointImportPath,
          });

          tree[edited_model_name] = `__CODE_START__${importAlias}__CODE_END__`;

          modelTypes.push({
            signature: importAlias,
            typeDef: importAlias,
          });
        }
      }
    }
  }

  const res = await iterateModels(modelDir, modelTree, []);

  console.log("imports so far:", imports);
  console.log("modelTree so far:", modelTree);

  return { imports, modelTree };
};
