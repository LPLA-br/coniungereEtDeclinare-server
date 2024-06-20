import { Router } from "express";
import { Request, Response } from "express";
import Verbos from "../controllers/verbos";
import FormatadorErro from "../utilitarios/FormatadorErro";

const verbos = Router();

verbos.get("/infinitivos", ( req: Request, res: Response )=>
{
  const verbosController = new Verbos( req, res, new FormatadorErro() );

  try
  {
    verbosController.obterInfinitivosAtivos();
  }
  catch( erro )
  {
    res.status(500).send( `{"erro":"${JSON.stringify( erro )}"}` );
  }
});

verbos.get("/indicativoativo", ( req: Request, res: Response )=>
{
  const verbosController = new Verbos( req, res, new FormatadorErro() );

  try
  {
    verbosController.obterIndicativoAtivo();
  }
  catch( erro )
  {
    res.status(500).send( `{"erro":"${JSON.stringify( erro )}"}` );
  }
});

verbos.get("/subjuntivoativo", ( req: Request, res: Response )=>
{
  const verbosController = new Verbos( req, res, new FormatadorErro() );

  try
  {
    verbosController.obterSubjuntivoAtivo();
  }
  catch( erro )
  {
    res.status(500).send( `{"erro":"${JSON.stringify( erro )}"}` );
  }
});

verbos.get("/indicativopassivo", ( req: Request, res: Response )=>
{
  const verbosController = new Verbos( req, res, new FormatadorErro() );

  try
  {
    verbosController.obterIndicativoPassivo();
  }
  catch( erro )
  {
    res.status(500).send( `{"erro":"${JSON.stringify( erro )}"}` );
  }
});

verbos.get("/subjuntivopassivo", ( req: Request, res: Response )=>
{
  const verbosController = new Verbos( req, res, new FormatadorErro() );

  try
  {
    verbosController.obterSubjuntivoPassivo();
  }
  catch( erro )
  {
    res.status(500).send( `{"erro":"${JSON.stringify( erro )}"}` );
  }
});

verbos.get("/imperativo", ( req: Request, res: Response )=>
{
  const verbosController = new Verbos( req, res, new FormatadorErro() );

  try
  {
    verbosController.obterImperativo();
  }
  catch( erro )
  {
    res.status(500).send( `{"erro":"${JSON.stringify( erro )}"}` );
  }
});

verbos.get("/participio", ( req: Request, res: Response )=>
{
  const verbosController = new Verbos( req, res, new FormatadorErro() );

  try
  {
    verbosController.obterParticipio();
  }
  catch( erro )
  {
    res.status(500).send( `{"erro":"${JSON.stringify( erro )}"}` );
  }
});

verbos.get("/gerundio", ( req: Request, res: Response )=>
{
  const verbosController = new Verbos( req, res, new FormatadorErro() );

  try
  {
    verbosController.obterGerundio();
  }
  catch( erro )
  {
    res.status(500).send( `{"erro":"${JSON.stringify( erro )}"}` );
  }
});

verbos.get("/gerundivo", ( req: Request, res: Response )=>
{
  const verbosController = new Verbos( req, res, new FormatadorErro() );

  try
  {
    verbosController.obterGerundivo();
  }
  catch( erro )
  {
    res.status(500).send( `{"erro":"${JSON.stringify( erro )}"}` );
  }
});

export { verbos };
