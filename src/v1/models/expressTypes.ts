import { Request } from "express";

// created an interface to fix the type values inside
// of request that has a body
export interface RequestWithBody extends Request {
  body: { [key: string]: string | undefined };
}
