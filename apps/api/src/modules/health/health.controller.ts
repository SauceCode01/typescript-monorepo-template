import { createExpressController } from "@libs/api-typing";
import { Contract } from "@packages/api-contracts";

export class HealthController {
  constructor() {}

  public health = createExpressController(
    Contract.health.get,
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