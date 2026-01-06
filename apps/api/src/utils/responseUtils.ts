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
