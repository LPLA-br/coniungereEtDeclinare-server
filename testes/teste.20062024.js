/***************************
 * Teste semi-manual da api
 * 20/06/2024
 * validando 0.2.0-alpha
 ***************************/

// MÉTRICAS AVALIADAS
// sanidade dos dados

const substantivos = [ "rosa","insula","Iulia","equus","puer",
"verbum","poculum","Marcus","humus","portus","domus","cornú","sól","Caesar",
"leó","vóx","ós","corpus","opus","nómen","návis","urbis","móns",
"mare","animal","diés","res"
];

fetch('http://127.0.0.1:8080/nomes/substantivos/')
.then( (res)=>
{
  console.log( '\n', res.json(), '\n' );
}).catch( (err)=>{ console.error( err ) });

for ( let i = 0; i < substantivos.length; i++ )
{
  fetch(`http://127.0.0.1:8080/nomes/substantivo?noms=${substantivos[i]}`)
  .then( (res)=>
  {
    console.log( '\n', res.json(), '\n' );
  }).catch( (err)=>{ console.error( err ) });
}

const verbo = 'amare';
const recursos = [ "infinitivos", "indicativoativo", "subjuntivoativo",
  "indicativopassivo","subjuntivopassivo","imperativo","participio",
  "gerundio","gerundivo"
];

function verbRequest( urn, verbo )
{
  fetch( `http://127.0.0.1:8080/verbos/${urn}?infinitivo=${verbo}` )
  .then( (res)=>
  {
    console.log( '\n', res.json() ,'\n' );
  })
  .catch( (err)=>{ console.error( err ) });
}

for ( let i = 0; i < substantivos.length; i++ )
{
  verbRequest( recursos[i], "amare" );
}

