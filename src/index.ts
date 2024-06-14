import { app, PORTA } from './config/config';

app.listen( PORTA, ()=>
{
	console.log(`ouvindo porta ${PORTA}`);
});
