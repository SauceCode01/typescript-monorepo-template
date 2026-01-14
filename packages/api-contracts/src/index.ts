import {
  ApiTypes,
  callEndpoint,
  createContract,
  createExpressController,
} from "@packages/api-typing";
import { root } from "./routes/index.js";
import { Models } from "./models/index.js";

const Contract = createContract(root);
type ContractTypes = ApiTypes<typeof root>;

export { Models, Contract, type ContractTypes };
