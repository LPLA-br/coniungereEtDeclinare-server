/*********************************
 * Núcleo das rotas da API
 * a ser incluso na aplicação
 *********************************/

import express from 'express';
import { substantivos } from './substantivos';

const router = express.Router();

router.use( "/substantivos", substantivos );

router.get('/', ( req: express.Request, res: express.Response, next: express.NextFunction )=>
{
  res.send( "API v0.0.1 substantivos e verbos somente leitura\n" );
});

export { router };
