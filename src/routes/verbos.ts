import { Router } from "express";
import { Request, Response } from "express";
import Verbos from "../controllers/verbos";
import FormatadorErro from "../utilitarios/FormatadorErro";
import TratadorConsulta from "../utilitarios/TratadorConsulta";
import verbosQuery from "../middlewares/verbosQuery";

const verbos = Router();

verbos.get("/infinitivos", ( req: Request, res: Response )=>
{
  const verbosController = new Verbos( req, res, new TratadorConsulta(req, res), new FormatadorErro() );
  verbosController.obterInfinitivosAtivos();
});

verbos.get("/indicativoativo", verbosQuery, ( req: Request, res: Response )=>
{
  const verbosController = new Verbos( req, res, new TratadorConsulta(req, res), new FormatadorErro() );
  verbosController.obterIndicativoAtivo();
});

verbos.get("/subjuntivoativo", verbosQuery, ( req: Request, res: Response )=>
{
  const verbosController = new Verbos( req, res, new TratadorConsulta(req, res), new FormatadorErro() );
  verbosController.obterSubjuntivoAtivo();
});

verbos.get("/indicativopassivo", verbosQuery, ( req: Request, res: Response )=>
{
  const verbosController = new Verbos( req, res, new TratadorConsulta(req, res), new FormatadorErro() );
  verbosController.obterIndicativoPassivo();
});

verbos.get("/subjuntivopassivo", verbosQuery, ( req: Request, res: Response )=>
{
  const verbosController = new Verbos( req, res, new TratadorConsulta(req, res), new FormatadorErro() );
  verbosController.obterSubjuntivoPassivo();
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
