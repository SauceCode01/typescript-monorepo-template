import { userRoleModel, UserRoleModel } from "./userRole.model.js";

export class UserRoleService {
  constructor(private userRoleModel: UserRoleModel) {}

  async getUserRole(userId: string) {
    const data = await this.userRoleModel.getUserRoleById(userId);
    return data;
  }
}

export const userRoleService = new UserRoleService(userRoleModel);
