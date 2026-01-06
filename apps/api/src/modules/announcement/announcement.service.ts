import {
  AnnouncementModel,
  announcementModel,
} from "@/modules/announcement/announcement.model.js"; 
import { TablesInsert, TablesUpdate } from "@packages/api-types";

export class AnnouncementService {
  constructor(private announcementModel: AnnouncementModel) {
    this.announcementModel = announcementModel;
  }

  async listAnnouncementsByPage(pageNumber: number, pageSize: number) {
    const { data: listData, error: listError } =
      await this.announcementModel.listAnnouncementsByPage(
        pageNumber,
        pageSize
      );
    if (listError) {
      return { error: listError };
    }

    const { data: count, error: countError } =
      await this.announcementModel.countAnnouncements();
    if (countError) {
      return { error: countError };
    }

    return {
      data: {
        listData: listData || [],
        count: count || 0,
      },
    };
  }

  createAnnouncement = async (DTO: TablesInsert<"announcement">) => {
    // business logic
    const { data, error } =
      await this.announcementModel.createAnnouncement(DTO);

    if (error) {
      return { error };
    }

    // returning data
    return { data };
  };

  getAnnouncement = async (id: string) => {
    const { data, error } =
      await this.announcementModel.getAnnouncementById(id);

    if (error) {
      return { error };
    }

    return { data };
  };

  updateAnnouncement = async (
    id: string,
    dto: TablesUpdate<"announcement">
  ) => {
    const { data, error } = await this.announcementModel.updateAnnouncement(
      id,
      dto
    );

    if (error) {
      return { error };
    }

    return { data };
  };

  deleteAnnouncement = async (id: string) => {
    const { data, error } = await this.announcementModel.deleteAnnouncement(id);

    if (error) {
      return { error };
    }
    return { data };
  };
}

export const announcementService = new AnnouncementService(announcementModel);
