import { Router } from "express";
import { Request, Response } from "express";
import Verbos from "../controllers/verbos";
import FormatadorErro from "../utilitarios/FormatadorErro";
import TratadorConsulta from "../utilitarios/TratadorConsulta";
import verbosQuery from "../middlewares/verbosQuery";
import { CONSULTAS } from "../types/consultas";

const verbos = Router();

( ()=>
  {
    for ( let i = 0; i < CONSULTAS.length; i++)
    {
      verbos.get(`/${CONSULTAS[i].toLowerCase()}`, verbosQuery, ( req: Request, res: Response )=>
      {
        const verbosController = new Verbos( req, res, new TratadorConsulta(req, res), new FormatadorErro() );
        verbosController.obterTempoVerbalPorRegistroDeConsultas( CONSULTAS[i] );
      });
    }
  }
)();

verbos.get("/infinitivos", ( req: Request, res: Response )=>
{
  const verbosController = new Verbos( req, res, new TratadorConsulta(req, res), new FormatadorErro() );
  verbosController.obterInfinitivosAtivos();
});

verbos.get("/imperativo", verbosQuery, ( req: Request, res: Response )=>
{
  const verbosController = new Verbos( req, res, new TratadorConsulta(req, res), new FormatadorErro() );
  verbosController.obterImperativo();
});

verbos.get("/participio", verbosQuery, ( req: Request, res: Response )=>
{
  const verbosController = new Verbos( req, res, new TratadorConsulta(req, res), new FormatadorErro() );
  verbosController.obterParticipio();
});

verbos.get("/gerundio", verbosQuery, ( req: Request, res: Response )=>
{
  const verbosController = new Verbos( req, res, new TratadorConsulta(req, res), new FormatadorErro() );
  verbosController.obterGerundio();
});

verbos.get("/gerundivo", verbosQuery, ( req: Request, res: Response )=>
{
  const verbosController = new Verbos( req, res, new TratadorConsulta(req, res), new FormatadorErro() );
  verbosController.obterGerundivo();
});

export { verbos };
