import axios from "axios";
import { CONSULTAS } from "../src/types/consultas";

/*Arranje Act Assert
* */

describe("REQUISICOES VERBOS EM TODOS OS MODOS, VOZES, TEMPOS E PESSOAS",()=>
{
  const infinitivoVerbo = "legere";

  for ( let i = 0; i < CONSULTAS.length; i++ )
  {
    test( CONSULTAS[i].concat(`infinitivo:${infinitivoVerbo}`) ,()=>
    {
      (async ()=>
      {
        const res = await axios.get(`http://127.0.0.1:8080/verbos/${CONSULTAS[i].toLowerCase()}?infinitivo=${infinitivoVerbo}`);
        const resJson = JSON.parse( res.data );

        expect( typeof resJson ).toBe( "object" );
        expect( resJson ).toHaveProperty( "res" );
        expect( resJson ).toHaveProperty( "status" );
        expect( resJson.data.res.pri_sing ).toBe(  );
      })();
    });
  }
});

describe("REQUISICOES VERBOS PARA IMPERATIVO PARTICIPIO GERUNDIO GERUNDIVO", ()=>{});

