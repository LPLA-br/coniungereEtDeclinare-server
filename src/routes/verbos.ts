import { Router } from "express";
import { Request, Response } from "express";
import Verbos from "../controllers/verbos";

const verbos = Router();

verbos.get("/listaverbosinfinitivos", ( req: Request, res: Response )=>
{
  const verbosController = new Verbos( req, res );

  try
  {
    verbosController.obterInfinitivosAtivos();
  }
  catch( erro )
  {
    res.status(500).send( `{"erro":"${JSON.stringify( erro )}"}` );
  }
});

verbos.get

export { verbos };
