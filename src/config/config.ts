/*****************************
 * Configuração do express
 *****************************/

import express from 'express';

/*Outros middlewares como: cookie-parser, cookie-session ...
 https://expressjs.com/en/resources/middleware.html */

const app = express();
const PORTA = 8080;

//rotas
import { router } from '../routes/index';

app.use( '/', router );

// tratamento de url do express
app.use( express.json() );
app.use( express.urlencoded({ extended: true }) );

// conteúdo estático do servidor. decomente para uso.
//app.use( express.static( path.join(__dirname, '../public') ) );

// renderização de views. Descomente para uso
//app.set( 'views', path.join( __dirname, '../views' ));
//app.set( 'view engine', 'pug');

export { app, PORTA }
