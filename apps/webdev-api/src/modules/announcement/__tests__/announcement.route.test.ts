import request from "supertest";
import { beforeEach, describe, expect, test, vi } from "vitest";
import {
  createTestApp,
  resetAnnouncementMocks,
} from "./fixtures/announcement.route.fixture.js";
import {
  createAnnouncementResponseBodySchema,
  getAnnouncementResponseBodySchema,
  listAnnouncementsResponseBodySchema,
  updateAnnouncementResponseBodySchema,
  deleteAnnouncementResponseBodySchema,
} from "../../../schemas/announcement.schema.js";
import { announcementModel } from "../announcement.model.js";

const INITIAL_COUNT = 25;
beforeEach(() => resetAnnouncementMocks(INITIAL_COUNT));

/**
 * GET /api/announcements
 * list announcements with pagination
 */
describe("GET /api/announcements", () => {
  /**
   * Access Control
   */
  describe("Access Control", () => {
    test("returns 401 when unauthenticated", async () => {
      const app = createTestApp("unauthenticated");
      const res = await request(app).get("/api/announcements");
      expect(res.status).toBe(401);
    });

    test("returns 200 when user is authenticated", async () => {
      const app = createTestApp("user");
      const res = await request(app).get("/api/announcements");
      expect(res.status).toBe(200);
    });

    test.todo("returns 429 when rate limit exceeded");
  });

  /**
   * Response Schema
   */
  describe("Response Body Schema", () => {
    test("response matches the listAnnouncementsResponseBodySchema", async () => {
      const app = createTestApp("user");
      const res = await request(app).get("/api/announcements");

      expect(res.status).toBe(200);
      const parseResult = listAnnouncementsResponseBodySchema.safeParse(
        res.body
      );
      expect(parseResult.success).toBe(true);
    });
  });

  /**
   * Logic
   */
  describe("Logic", () => {
    test("return first 10 announcements by default", async () => {
      const app = createTestApp("user");
      const res = await request(app).get("/api/announcements");

      expect(res.status).toBe(200);
      expect(res.body.data).toHaveLength(10);
      expect(res.body.meta.totalRecords).toBe(INITIAL_COUNT);
      expect(res.body.links.next).toContain("page[number]=2");
    });

    test("returns 10 more announcements on page 2", async () => {
      const app = createTestApp("user");
      const res = await request(app)
        .get("/api/announcements")
        .query({ "page[number]": 2 });

      expect(res.status).toBe(200);
      expect(res.body.data).toHaveLength(10);
      expect(res.body.links.next).toContain("page[number]=3");
      expect(res.body.links.prev).toContain("page[number]=1");
    });

    test("returns last 5 announcements on page 3", async () => {
      const app = createTestApp("user");
      const res = await request(app)
        .get("/api/announcements")
        .query({ "page[number]": 3 });

      expect(res.status).toBe(200);
      expect(res.body.data).toHaveLength(5);
      expect(res.body.links.next).toBeNull(); // Correct JSON:API null handling
    });
  });
});

/**
 * POST /api/announcements
 * create a new announcement
 */
describe("POST /api/announcements", () => {
  /**
   * Access Control
   */
  describe("Access Control", () => {
    test("returns 401 when unauthenticated", async () => {
      const app = createTestApp("unauthenticated");
      const res = await request(app)
        .post("/api/announcements")
        .send({ title: "T1", content: "C1", bannerUrl: null });

      expect(res.status).toBe(401);
    });

    test("returns 403 when user is authenticated but not an admin", async () => {
      const app = createTestApp("user"); // Regular user
      const res = await request(app)
        .post("/api/announcements")
        .send({ title: "T2", content: "C2", bannerUrl: null });

      expect(res.status).toBe(403);
    });

    test("returns 201 when user is an admin", async () => {
      const app = createTestApp("admin"); // Admin user
      const res = await request(app)
        .post("/api/announcements")
        .send({ title: "T3", content: "C3", bannerUrl: null });

      expect(res.status).toBe(201);
    });
  });

  /**
   * Request Body Schema
   */
  describe("Request body schema", () => {
    test("returns 500 when data is invalid (schema validation)", async () => {
      const app = createTestApp("admin");
      const res = await request(app)
        .post("/api/announcements")
        .send({ invalid: "invalid field" });

      expect(res.status).toBe(500);
    });
  });

  /**
   * Response Schema
   */
  describe("Response Schema", () => {
    test("response matches the createAnnouncementResponseBodySchema", async () => {
      const app = createTestApp("admin");
      const payload = {
        title: "Title Y",
        content: "Content Y",
        bannerUrl: null,
      };

      const res = await request(app).post("/api/announcements").send(payload);

      expect(res.status).toBe(201);
      const parseResult = createAnnouncementResponseBodySchema.safeParse(
        res.body
      );
      expect(parseResult.success).toBe(true);
    });
  });

  /**
   * logic
   */
  describe("Logic", () => {
    test("creates a new announcement with valid data", async () => {
      const app = createTestApp("admin");
      const before = (announcementModel as any).__getMockData().length;
      const payload = { title: "Hello", content: "World", bannerUrl: null };

      const res = await request(app).post("/api/announcements").send(payload);

      expect(res.status).toBe(201);
      const after = (announcementModel as any).__getMockData().length;
      expect(after).toBe(before + 1);
    });

    test("returns the newly created announcement in response", async () => {
      const app = createTestApp("admin");
      const payload = {
        title: "Title X",
        content: "Content X",
        bannerUrl: null,
      };

      const res = await request(app).post("/api/announcements").send(payload);

      expect(res.status).toBe(201);
      expect(res.body.data.type).toBe("announcement");
      expect(res.body.data.attributes.title).toBe(payload.title);
      expect(res.body.data.attributes.content).toBe(payload.content);
      expect(res.body.data.attributes.banner_url).toBe(payload.bannerUrl);
    });
  });
});

/**
 * GET /api/announcements/:id
 * get a specific announcement by ID
 */
describe("GET /api/announcements/:id", () => {
  const announcementId = 1;
  const url = `/api/announcements/${announcementId}`;

  /**
   * Access Control
   */
  describe("Access Control", () => {
    test("returns 401 when unauthenticated", async () => {
      const app = createTestApp("unauthenticated");
      const res = await request(app).get(url);
      expect(res.status).toBe(401);
    });

    test("returns 200 when user is authenticated", async () => {
      const app = createTestApp("user");
      const res = await request(app).get(url);
      expect(res.status).toBe(200);
    });

    test.todo("returns 429 when rate limit exceeded");
  });

  /**
   * Response Schema
   */
  describe("Response Body Schema", () => {
    test("response follows jsonapi spec", async () => {
      const app = createTestApp("user");
      const res = await request(app).get(url);

      expect(res.status).toBe(200);
      const parseResult = getAnnouncementResponseBodySchema.safeParse(res.body);
      expect(parseResult.success).toBe(true);
    });
  });

  /**
   * Logic
   */
  describe("Logic", () => {
    test("returns the correct announcement", async () => {
      const app = createTestApp("user");
      const res = await request(app).get(url);

      expect(res.status).toBe(200);
      expect(res.body.data.id).toBe("1");
    });
  });
});

/**
 * PUT /api/announcements/:id
 * update an announcement
 */
describe("PUT /api/announcements/:id", () => {
  const existingId = "1";
  const url = `/api/announcements/${existingId}`;

  /**
   * Access Control
   */
  describe("Access Control", () => {
    test("returns 401 when unauthenticated", async () => {
      const app = createTestApp("unauthenticated");
      const res = await request(app).put(url).send({ title: "Updated Title" });
      expect(res.status).toBe(401);
    });

    test("returns 403 when user is authenticated but not an admin", async () => {
      const app = createTestApp("user");
      const res = await request(app).put(url).send({ title: "Updated Title" });
      expect(res.status).toBe(403);
    });

    test("returns 200 when user is an admin", async () => {
      const app = createTestApp("admin");
      const res = await request(app)
        .put(url)
        .send({
          title: "Updated Title",
          content: "Updated Content",
          bannerUrl: null,
        });
      expect(res.status).toBe(200);
    });
  });

  /**
   * Request Body Schema
   */
  describe("Request body schema", () => {
    test("returns 500 when data is invalid (schema validation)", async () => {
      const app = createTestApp("admin");
      const res = await request(app).put(url).send({ title: 123 });
      expect(res.status).toBe(500);
    });
  });

  /**
   * Response Schema
   */
  describe("Response Schema", () => {
    test("response matches the updateAnnouncementResponseBodySchema", async () => {
      const app = createTestApp("admin");
      const res = await request(app).put(url).send({ title: "Schema Title" });

      expect(res.status).toBe(200);
      const parseResult = updateAnnouncementResponseBodySchema.safeParse(
        res.body
      );
      expect(parseResult.success).toBe(true);
    });
  });

  /**
   * Logic
   */
  describe("Logic", () => {
    test("updates the announcement fields", async () => {
      const app = createTestApp("admin");
      const before = (announcementModel as any)
        .__getMockData()
        .find((r: any) => r.id === existingId);
      expect(before).toBeTruthy();

      const payload = {
        title: "New Title",
        content: "New Content",
        bannerUrl: null,
      };
      const res = await request(app).put(url).send(payload);

      expect(res.status).toBe(200);

      const after = (announcementModel as any)
        .__getMockData()
        .find((r: any) => r.id === existingId);
      expect(after.title).toBe(payload.title);
      expect(after.content).toBe(payload.content);
      expect(after.banner_url).toBe(payload.bannerUrl);
    });

    test("returns 404 when announcement does not exist", async () => {
      const app = createTestApp("admin");
      const res = await request(app)
        .put("/api/announcements/9999")
        .send({ title: "Does Not Exist" });
      expect(res.status).toBe(404);
    });
  });
});

/**
 * DELETE /api/announcements/:id
 * delete an announcement
 */
describe("DELETE /api/announcements/:id", () => {
  const existingId = "1";
  const url = `/api/announcements/${existingId}`;

  /**
   * Access Control
   */
  describe("Access Control", () => {
    test("returns 401 when unauthenticated", async () => {
      const app = createTestApp("unauthenticated");
      const res = await request(app).delete(url);
      expect(res.status).toBe(401);
    });

    test("returns 403 when user is authenticated but not an admin", async () => {
      const app = createTestApp("user");
      const res = await request(app).delete(url);
      expect(res.status).toBe(403);
    });

    test("returns 200 when user is an admin", async () => {
      const app = createTestApp("admin");
      const res = await request(app).delete(url);
      expect(res.status).toBe(200);
    });
  });

  /**
   * Response Schema
   */
  describe("Response Schema", () => {
    test("response matches the deleteAnnouncementResponseBodySchema", async () => {
      const app = createTestApp("admin");
      const res = await request(app).delete(url);

      expect(res.status).toBe(200);
      const parseResult = deleteAnnouncementResponseBodySchema.safeParse(
        res.body
      );
      expect(parseResult.success).toBe(true);
    });
  });

  /**
   * Logic
   */
  describe("Logic", () => {
    test("deletes the announcement and reduces count", async () => {
      const app = createTestApp("admin");
      const beforeCount = (announcementModel as any).__getMockData().length;
      const res = await request(app).delete(url);
      expect(res.status).toBe(200);
      const afterCount = (announcementModel as any).__getMockData().length;
      expect(afterCount).toBe(beforeCount - 1);
    });

    test("returns 404 when announcement does not exist", async () => {
      const app = createTestApp("admin");
      const res = await request(app).delete("/api/announcements/9999");
      expect(res.status).toBe(404);
    });
  });
});
