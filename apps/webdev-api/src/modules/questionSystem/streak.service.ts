import {
  streakModel as defaultStreakModel,
  StreakModel,
} from "./streak.model.js";

export class StreakService {
  constructor(private streakModel: StreakModel = defaultStreakModel) {}

  getByUser = async ({ userId }: { userId: string }) => {
    const { data, error } = await this.streakModel.getByUser({ userId });
    if (error) return { error };
    return { data };
  };

  list = async ({
    pageNumber = 1,
    pageSize = 10,
  }: {
    pageNumber?: number;
    pageSize?: number;
  }) => {
    const { data, error } = await this.streakModel.list({
      pageNumber,
      pageSize,
    });
    if (error) return { error };
    return { data };
  };

  /**
   * INCREMENT STREAK VALUE
   * - increment the streak value of a user by a 1
   */
  incrementStreakValue = async ({ userId }: { userId: string }) => {
    const { data, error } = await this.streakModel.setStreakValue({
      userId,
      value: 1,
    });
    if (error) return { error };
    return { data };
  };

  /**
   * DECREMENT STREAK VALUE
   * - decrement the streak value of a user by a 1
   */
  decrementStreakValue = async ({ userId }: { userId: string }) => {
    const { data, error } = await this.streakModel.setStreakValue({
      userId,
      value: -1,
    });
    if (error) return { error };
    return { data };
  };
}

export const streakServive = new StreakService();
