import "express";

declare module "express-serve-static-core" {
  interface Request {
    id?: string;
    params:{
        websiteId?:string
    }
  }
}