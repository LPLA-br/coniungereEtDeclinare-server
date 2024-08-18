#!/bin/bash

# compilação do código fonte

if [[ -d './build' ]]; then
  npm exec tsc;
else
  mkdir ./build;
  npm exec tsc;
fi
