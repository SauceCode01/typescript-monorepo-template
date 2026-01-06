import { vi } from "vitest";

type StudyJamRow = {
  id: string;
  title: string;
  description: string;
  pre_jam_kit_url: string | null;
  post_jam_kit_url: string | null;
  post_jam_activity_url: string | null;
  creator_id: string;
  created_at: string;
};

const generateRow = (defaultId?: string): StudyJamRow => {
  const id = defaultId ?? Math.random().toString(36).substring(2, 10);
  return {
    id,
    title: `Study Jam ${id}`,
    description: `Description ${id}`,
    pre_jam_kit_url: null,
    post_jam_kit_url: null,
    post_jam_activity_url: null,
    creator_id: "admin-1",
    created_at: new Date().toISOString(),
  };
};

const buildRows = (count = 5): StudyJamRow[] =>
  Array.from({ length: count }, (_, idx) => generateRow(String(idx + 1)));

let mockRows: StudyJamRow[] = [];

export const studyJamModel = {
  __setMockData: (data: StudyJamRow[]) => { mockRows = [...data]; },
  __getMockData: () => mockRows,
  __resetMockData: (amount: number = 15) => { mockRows = buildRows(amount); },

  listStudyJamsByPage: vi.fn(async (page: number, size: number) => {
    const from = (page - 1) * size;
    return mockRows.slice(from, from + size);
  }),

  countStudyJams: vi.fn(async () => mockRows.length),

  createStudyJam: vi.fn(async (dto: Partial<StudyJamRow>) => {
    const newRow: StudyJamRow = {
      id: String(mockRows.length + 1),
      title: dto.title ?? `Study Jam ${mockRows.length + 1}`,
      description: dto.description ?? "Desc",
      pre_jam_kit_url: (dto as any).pre_jam_kit_url ?? null,
      post_jam_kit_url: (dto as any).post_jam_kit_url ?? null,
      post_jam_activity_url: (dto as any).post_jam_activity_url ?? null,
      creator_id: dto.creator_id ?? "admin-1",
      created_at: new Date().toISOString(),
    };
    mockRows.push(newRow);
    return newRow;
  }),

  getStudyJamById: vi.fn(async (id: string) => {
    return mockRows.find((r) => r.id === id) || null;
  }),

  updateStudyJam: vi.fn(async (id: string, dto: Partial<StudyJamRow>) => {
    const row = mockRows.find((r) => r.id === id);
    if (!row) return null;
    if (typeof dto.title !== "undefined") row.title = dto.title!;
    if (typeof dto.description !== "undefined") row.description = dto.description!;
    if (Object.prototype.hasOwnProperty.call(dto, "pre_jam_kit_url")) row.pre_jam_kit_url = (dto as any).pre_jam_kit_url ?? null;
    if (Object.prototype.hasOwnProperty.call(dto, "post_jam_kit_url")) row.post_jam_kit_url = (dto as any).post_jam_kit_url ?? null;
    if (Object.prototype.hasOwnProperty.call(dto, "post_jam_activity_url")) row.post_jam_activity_url = (dto as any).post_jam_activity_url ?? null;
    return row;
  }),

  deleteStudyJam: vi.fn(async (id: string) => {
    const idx = mockRows.findIndex((r) => r.id === id);
    if (idx === -1) return false;
    mockRows.splice(idx, 1);
    return true;
  }),
};
