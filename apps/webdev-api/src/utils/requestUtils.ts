import { Request } from "express";

export const getBaseUrl = (req : Request) => {
  return `${req.protocol}://${req.get("host")}${req.baseUrl}${req.path}`;
};

export const getPaginationQueryParameters = (req : Request) => {
  return {
    pageNumber: Math.max(parseInt(req.query["page[number]"] as string) || 1, 1),
    pageSize: Math.max(parseInt(req.query["page[size]"] as string) || 10, 1),
  };
};
