 
 import { createExpressController } from "@packages/contract-gen";
 import { contract } from "@packages/api-contracts";

export class HealthController {
  constructor() {}

  public health = createExpressController(
    contract.api.health.GET,
    async ({ input, output, ctx }) => {
      return output(200, {
        status: "success",
        message: "API is healthy",
        data: {
          data: "OK",
        },
      });
    }
  );
}

export const healthControllerInstance = new HealthController();