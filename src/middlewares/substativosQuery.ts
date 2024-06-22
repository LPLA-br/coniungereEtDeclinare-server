import { Request, Response, NextFunction } from "express";

export default ( req: Request, res: Response, next: NextFunction ) =>
{
  const { noms } = req.query;
  if ( typeof noms == "undefined" )
    res.json( {status:400,erro:"bad request: esqueceste ?noms=SUBSTANTIVO"} );
  else
    next();
}

