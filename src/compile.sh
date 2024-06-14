#!/bin/bash
if [[ -d './build' ]]; then
  echo ok;
else
  mkdir ./build;
fi

../node_modules/typescript/bin/tsc ;
