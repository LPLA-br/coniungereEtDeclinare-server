import { Request, Response, NextFunction } from "express";

/** emite bad request para verbos */
export default ( req: Request, res: Response, next: NextFunction ) =>
{
  const { infinitivo } = req.query;
  if ( typeof infinitivo == "undefined" )
    res.json( {status:400,erro:"bad request: esqueceste ?infinitivo=VERBO"} );
  else
    next();
}

