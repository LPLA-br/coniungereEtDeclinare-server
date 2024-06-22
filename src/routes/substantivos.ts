import { Router } from "express";
import { Request, Response } from "express";
import Substantivo from "../controllers/substantivo";
import TratadorConsultaSql from "../utilitarios/TratadorConsulta";
import FormatadorErro from "../utilitarios/FormatadorErro";
import substativosQuery from "../middlewares/substativosQuery";

const substantivos = Router();

substantivos.get( "/substantivos", ( req: Request, res: Response  )=>
{
  const substantivo = new Substantivo( req, res, new TratadorConsultaSql( req, res ), new FormatadorErro());
  substantivo.todosOsSubstantivos();
});

substantivos.get( "/substantivo", substativosQuery, ( req: Request, res: Response  )=>
{
  const substantivo = new Substantivo( req, res, new TratadorConsultaSql( req, res ), new FormatadorErro());
  substantivo.umSubstantivo(); 
});


export { substantivos };
