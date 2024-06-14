import { Request, Response, NextFunction } from "express";

const log = ( req: Request, res: Response, next: NextFunction ) =>
{
  console.log( `{"timestamp":${Date.now()},"ip":"${req.ip}","path":"${req.path}"},\n` ); 
  next();
};

export default { log };
