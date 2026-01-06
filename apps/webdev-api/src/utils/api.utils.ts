export const createErrorObject = (
  status: number,
  title: string,
  detail: string
) => {
  return {
    status: status,
    title: title,
    detail: detail,
  };
};
export const buildPaginationLinks = (
  baseUrl: string,
  pageNumber: number,
  pageSize: number,
  totalRecords: number
) => {
  const totalPages = Math.ceil(totalRecords / pageSize);

  const buildLink = (p: number) =>
    `${baseUrl}?page[number]=${p}&page[size]=${pageSize}`;

  // self, first, last, prev, next
  return {
    self: buildLink(pageNumber),
    first: buildLink(1),
    last: buildLink(totalPages),
    ...(pageNumber > 1 && { prev: buildLink(pageNumber - 1) }),
    ...(pageNumber < totalPages && { next: buildLink(pageNumber + 1) }),
    next: pageNumber < totalPages ? buildLink(pageNumber + 1) : null,
    prev: pageNumber > 1 ? buildLink(pageNumber - 1) : null,
  };
};

export const createResourceObject = (
  type: string,
  id: string,
  attributes: unknown
) => ({
  type: type,
  id: id,
  attributes: attributes,
});

export const createResourceObjects = (
  type: string,
  rows: { id: string; attributes: unknown }[] | null
) =>
  (rows ?? []).map((row) => createResourceObject(type, row.id, row.attributes));

export const createSingleErrorResponse = (
  status: number,
  title: string,
  detail: string
) => {
  return {
    errors: [createErrorObject(status, title, detail)],
  };
};

export const createMultipleErrorsResponse = (
  errors: { status: number; title: string; detail: string }[]
) => {
  return {
    errors: errors.map((error) =>
      createErrorObject(error.status, error.title, error.detail)
    ),
  };
};



export const createSingleResourceResponse = (
  message: string,
  data: unknown
) => {
  return {
    meta: {
      success: true,
      message: message,
    },
    data: data,
  };
};
