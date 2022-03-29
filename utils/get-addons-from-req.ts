import {Request} from "express";

export const getAddonsFromReq = (req: Request) => {
  const {cookieAddons} = req.cookies;
  return cookieAddons ? JSON.parse(cookieAddons) : [];
}