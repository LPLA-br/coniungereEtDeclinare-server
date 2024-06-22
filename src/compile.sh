#!/bin/bash
echo diretório ./build existe ?
if [[ -d './build' ]]; then
  echo sim, compilando;
else
  echo não, criando e compilando;
  mkdir ./build;
fi

../node_modules/typescript/bin/tsc ;
