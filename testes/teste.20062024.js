/***************************
 * Teste semi-manual da api
 * 20/06/2024
 * validando 0.2.0-alpha
 ***************************/

const axios = require('axios');

const substantivos = [ "rosa","insula","Iulia","equus","puer",
"verbum","poculum","Marcus","humus","portus","domus","cornú","sól","Caesar",
"leó","vóx","ós","corpus","opus","nómen","návis","urbis","móns",
"mare","animal","diés","res"
];

const verbo = 'amáre';
const recursos = [ "indicativoativo", "subjuntivoativo",
  "indicativopassivo","subjuntivopassivo","imperativo","participio",
  "gerundio","gerundivo"
];

(async()=>
{
  await axios.get('http://127.0.0.1:8080/nome/substantivos/')
  .then(function (response) {
    console.log(response.data);
  })
  .catch(function (error) {
    console.log(error);
  })
  .finally(function () {
  });

  for ( let i = 0; i < substantivos.length; i++ )
  {
    await axios.get(encodeURI(`http://127.0.0.1:8080/nome/substantivo?noms=${substantivos[i]}`))
    .then(function (response) {
      console.log(response.data);
    })
    .catch(function (error) {
      console.log(error);
    })
    .finally(function () {
    });
  }

})();

(async()=>
{
  await axios.get(encodeURI(`http://127.0.0.1:8080/verbos/infinitivos`))
  .then(function (response) {
    console.log(response.data);
  })
  .catch(function (error) {
    console.log(error);
  })
  .finally(function () {
  });

  for ( let i = 0; i < recursos.length; i++ )
  {
    await axios.get(encodeURI(`http://127.0.0.1:8080/verbos/${recursos[i]}?infinitivo=${verbo}`))
    .then(function (response) {
      console.log(response.data);
    })
    .catch(function (error) {
      console.log(error);
    })
    .finally(function () {
    });
  }  
})();

