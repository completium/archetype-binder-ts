#! /bin/bash

for file in `ls ./tests/contracts/*.arl`; do
  b=`basename $file`
  ~/archetype/archetype-lang/archetype.exe --show-contract-interface $file | jq > ./tests/contracts/json/${b%.arl}.json
done
