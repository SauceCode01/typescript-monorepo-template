import { RequestHandler } from "express";
import {
  announcementService,
  AnnouncementService,
} from "@/modules/announcement/announcement.service.js";
import {
  buildListAnnouncementResponseObject,
  createAnnouncementResourceObject,
} from "@/modules/announcement/announcement.utils.js";
import {
  getBaseUrl,
  getPaginationQueryParameters,
} from "@/utils/requestUtils.js"; 


/**
 * CONTROLLER LAYER WORKFLOW:
    // parse request parameters and body 
    // validate request parameters and body
    // call service 
    // validate service response
    // build response
 */

export class AnnouncementController {
  constructor(private announcementService: AnnouncementService) {}

  listAnnouncements: RequestHandler = async (req, res) => {
    // parse request parameters and body
    const { pageNumber, pageSize } = getPaginationQueryParameters(req);

    // validate request parameters and body
    // call service
    const { data, error } =
      await this.announcementService.listAnnouncementsByPage(
        pageNumber,
        pageSize
      );

    if (error) {
      return res.status(500).json({
        errors: [
          {
            status: 500,
            title: "Database Error",
            detail: "Failed to fetch announcements.",
          },
        ],
      });
    }

    const { listData, count } = data;

    // validate service response
    // build response
    res.set("Content-Type", "application/vnd.api+json");
    return res.json(
      buildListAnnouncementResponseObject(
        listData,
        count,
        pageNumber,
        pageSize,
        getBaseUrl(req)
      )
    );
  };

  createAnnouncement: RequestHandler = async (req, res) => {
    // parse request parameters and body
    const user = req.user!;
    const body = req.body;
    const { title, content, bannerUrl } = req.body ?? {};
    const creatorId = user.id;

    // validate request parameters and body
    const bodyParseRes = createAnnouncementRequestBodySchema.safeParse(body);
    if (!bodyParseRes.success) {
      return res.status(400).json({
        errors: [
          {
            status: 400,
            title: "Bad Request",
            detail: "Invalid request body.",
          },
        ],
      });
    }

    // call service
    const { data, error } = await this.announcementService.createAnnouncement({
      ...bodyParseRes.data,
      creator_id: creatorId,
    });

    // validate service response
    if (error) {
      return res.status(500).json({
        errors: [
          {
            status: 500,
            title: "Database Error",
            detail: "Failed to create announcement.",
          },
        ],
      });
    }

    // build response
    res.set("Content-Type", "application/vnd.api+json");
    return res.status(201).json({
      meta: {
        success: true,
        message: `Created announcement with ID ${data.id}.`,
      },
      data: createAnnouncementResourceObject(data),
    });
  };

  getAnnouncement: RequestHandler = async (req, res) => {
    // parse request parameters and body
    const id = req.params.id;

    // validate request parameters and body
    // call service
    const { data, error } = await this.announcementService.getAnnouncement(id);
    if (error) {
      return res.status(500).json({
        errors: [
          {
            status: 500,
            title: "Server error",
            detail: `Failed to fetch announcement with ID ${id}.`,
          },
        ],
      });
    }

    // validate service response
    // build response
    res.set("Content-Type", "application/vnd.api+json");
    return res.status(200).json({
      meta: {
        success: true,
        message: `Fetched announcement with ID ${data.id}.`,
      },
      data: createAnnouncementResourceObject(data),
    });
  };

  updateAnnouncement: RequestHandler = async (req, res) => {
    const id = req.params.id;
    const body = req.body;

    // validate request body
    const bodyParseRes = updateAnnouncementRequestBodySchema.safeParse(body);
    if (!bodyParseRes.success) {
      return res.status(400).json({
        errors: [
          {
            status: 400,
            title: "Bad Request",
            detail: "Invalid request body.",
          },
        ],
      });
    }
    const { data, error } = await this.announcementService.updateAnnouncement(
      id,
      bodyParseRes.data
    );
    if (error) {
      return res.status(500).json({
        errors: [
          {
            status: 500,
            title: "Server error",
            detail: `Failed to update announcement with ID ${id}.`,
          },
        ],
      });
    }

    // build response
    res.set("Content-Type", "application/vnd.api+json");
    return res.status(200).json({
      meta: {
        success: true,
        message: `Updated announcement with ID ${data.id}.`,
      },
      data: createAnnouncementResourceObject(data),
    });
  };

  deleteAnnouncement: RequestHandler = async (req, res) => {
    const id = req.params.id;

    // call service
    const { error } = await this.announcementService.deleteAnnouncement(id);

    if (error) {
      return res.status(500).json({
        errors: [
          {
            status: 500,
            title: "Server error",
            detail: `Failed to delete announcement with ID ${id}.`,
          },
        ],
      });
    }

    // build response
    res.set("Content-Type", "application/vnd.api+json");
    return res.status(200).json({
      meta: {
        success: true,
        message: `Deleted announcements.`,
      },
    });
  };
}

export const announcementController = new AnnouncementController(
  announcementService
);
