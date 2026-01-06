import { vi } from "vitest";

type AnnouncementRow = {
  id: string;
  title: string;
  content: string;
  creator_id: string;
  created_at: string;
  banner_url: string | null;
};

// generate row with random id and content
const geneerateRow = (defaultId?: string): AnnouncementRow => {
  const id = defaultId ?? Math.random().toString(36).substring(2, 10);
  const title = `Announcement Title ${id}`;
  const content = `This is the content of announcement ${id}.`;
  const created_at = new Date().toISOString();
  const creator_id = `user-${Math.floor(Math.random() * 10) + 1}`;
  return { id, title, content, creator_id, created_at, banner_url: null };
};

const buildRows = (count = 5): AnnouncementRow[] =>
  Array.from({ length: count }, (_, idx) => geneerateRow(String(idx + 1)));

let mockRows: any[] = [];

export const announcementModel = {
  // Helpers for testing
  __setMockData: (data: any[]) => {
    mockRows = [...data];
  },
  __getMockData: () => mockRows,

  __resetMockData: (amount: number = 15) => {
    mockRows = buildRows(amount);
  },

  // Mocked Implementations
  listAnnouncementsByPage: vi.fn(async (page: number, size: number) => {
    const from = (page - 1) * size;
    return mockRows.slice(from, from + size);
  }),

  countAnnouncements: vi.fn(async () => mockRows.length),

  createAnnouncement: vi.fn(async (dto: any) => {
    const newRow = {
      id: String(mockRows.length + 1),
      ...dto,
      created_at: new Date().toISOString(),
    };
    mockRows.push(newRow);
    return newRow;
  }),

  getAnnouncementById: vi.fn(async (id: string) => {
    return mockRows.find((r) => r.id === id) || null;
  }),

  updateAnnouncement: vi.fn(async (id: string, dto: Partial<AnnouncementRow>) => {
    const row = mockRows.find((r) => r.id === id);
    if (!row) {
      return null;
    }

    if (typeof dto.title !== "undefined") {
      row.title = dto.title as string;
    }
    if (typeof dto.content !== "undefined") {
      row.content = dto.content as string;
    }
    if (Object.prototype.hasOwnProperty.call(dto, "banner_url")) {
      row.banner_url = (dto as any).banner_url ?? null;
    }

    return row;
  }),

  deleteAnnouncement: vi.fn(async (id: string) => {
    const idx = mockRows.findIndex((r) => r.id === id);
    if (idx === -1) {
      return false;
    }
    mockRows.splice(idx, 1);
    return true;
  }),
};
