import { Request, Response, NextFunction } from "express";

export default ( req: Request, res: Response, next: NextFunction ) =>
{
  console.log( `{"timestamp":${Date.now()},"ipRequisitante":"${req.ip}","path":"${req.path}"},` ); 
  next();
};

