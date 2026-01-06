import request from "supertest";
import { beforeEach, describe, expect, test } from "vitest";
import {
  createTestApp,
  resetStudyJamMocks,
} from "./fixtures/studyJam.route.fixture.js";
import {
  listStudyJamsResponseBodySchema,
  createStudyJamResponseBodySchema,
  getStudyJamResponseBodySchema,
  updateStudyJamResponseBodySchema,
  deleteStudyJamResponseBodySchema,
} from "../studyJam.schema.js";
import { studyJamModel } from "../studyJam.model.js";

const INITIAL_COUNT = 25;
beforeEach(() => resetStudyJamMocks(INITIAL_COUNT));

describe("GET /api/study-jams", () => {
  test("returns 200 and matches schema", async () => {
    const app = createTestApp("user");
    const res = await request(app).get("/api/study-jams");
    expect(res.status).toBe(200);
    const parseResult = listStudyJamsResponseBodySchema.safeParse(res.body);
    expect(parseResult.success).toBe(true);
  });
});

describe("POST /api/study-jams", () => {
  const validCreateStudyJamDTO = {
    title: "Sample Study Jam",
    description: "This is a sample study jam.",
  };
  const invalidCreateStudyJamDTO = {
    invalid: "invalid",
  };

  const request_url = "/api/study-jams";

  test("requires authentication", async () => {
    const app = createTestApp("unauthenticated");
    const res = await request(app)
      .post(request_url)
      .send(validCreateStudyJamDTO);
    expect(res.status).toBe(401);
  });

  test("requires admin", async () => {
    const app = createTestApp("user");
    const res = await request(app)
      .post(request_url)
      .send(validCreateStudyJamDTO);
    expect(res.status).toBe(403);
  });

  test("validates request body", async () => {
    const app = createTestApp("admin");
    const res = await request(app)
      .post(request_url)
      .send(invalidCreateStudyJamDTO);
    expect(res.status).toBe(400);
  });

  test("creates when admin ", async () => {
    const app = createTestApp("admin");
    const before = (studyJamModel as any).__getMockData().length;

    const res = await request(app)
      .post(request_url)
      .send(validCreateStudyJamDTO);

    expect(res.status).toBe(201);

    const after = (studyJamModel as any).__getMockData().length;

    // console.log((studyJamModel as any).__getMockData());
    expect(after).toBe(before + 1);
  });
});

describe("GET /api/study-jams/:id", () => {
  test("returns 200 and matches schema", async () => {
    const app = createTestApp("user");
    const res = await request(app).get("/api/study-jams/1");
    expect(res.status).toBe(200);
    const parseResult = getStudyJamResponseBodySchema.safeParse(res.body);
    expect(parseResult.success).toBe(true);
  });
});

describe("PUT /api/study-jams/:id", () => {
  test("requires admin", async () => {
    const app = createTestApp("user");
    const res = await request(app)
      .put("/api/study-jams/1")
      .send({ title: "Updated" });
    expect(res.status).toBe(403);
  });

  test("updates when admin ", async () => {
    const app = createTestApp("admin");
    const res = await request(app)
      .put("/api/study-jams/1")
      .send({ title: "Updated" });
    expect(res.status).toBe(200);
  });

  test("Response matches schema", async () => {
    const app = createTestApp("admin");
    const res = await request(app)
      .put("/api/study-jams/1")
      .send({ title: "Updated" });
    expect(res.status).toBe(200);
    const parseResult = updateStudyJamResponseBodySchema.safeParse(res.body);
    expect(parseResult.success).toBe(true);
  });
});

describe("DELETE /api/study-jams/:id", () => {
  test("requires admin", async () => {
    const app = createTestApp("user");
    const res = await request(app).delete("/api/study-jams/1");
    expect(res.status).toBe(403);
  });

  test("deletes when admin", async () => {
    const app = createTestApp("admin");
    const res = await request(app).delete("/api/study-jams/1");
    expect(res.status).toBe(200);
  });
});
