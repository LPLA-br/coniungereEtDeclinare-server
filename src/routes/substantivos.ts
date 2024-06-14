import { Router } from "express";
import { Request, Response } from "express";
import Substantivo from "../controllers/substantivo";

const substantivos = Router();

substantivos.get( "/", ( req: Request, res: Response  )=>
 {
    try
    {
      const substantivo = new Substantivo( req, res );

      if ( Object.keys( req.query ).length == 0 )
        substantivo.todosOsSubstantivos();
      else
        substantivo.umSubstantivo();
    }
    catch( erro )
    {
      res.status(500).send( `{"erro":"${JSON.stringify( erro )}"}` );
    }
 });


export { substantivos };