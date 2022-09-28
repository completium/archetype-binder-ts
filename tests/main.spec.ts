import { generate_binding } from '../src/main'
import { ContractInterface } from '../src/utils'

import * as ts from "typescript";
import { expect_to_fail, get_account, Nat, set_mockup, set_quiet } from '@completium/experiment-ts';

const fs = require('fs')
const assert = require('assert')

const alice = get_account('alice')

/* Verbose mode ------------------------------------------------------------ */

set_quiet(true);

/* Endpoint ---------------------------------------------------------------- */

set_mockup()

describe('Contract testing', async () => {
  it('Nat test', async () => {
    const p = './tests/json/nat_test.json';
    const path_contracts = './tests/contracts/';
    const input = fs.readFileSync(p);
    let cContractInterface: ContractInterface = JSON.parse(input);
    const output = generate_binding(cContractInterface, path_contracts);
    let result = ts.transpile(output);
    const nat_test: any = eval(result);

    await nat_test.deploy({ as: alice })

    expect_to_fail(async () => {
      nat_test.f({ as: alice })
    }, nat_test.errors.MYERROR)

    const v = new Nat(2);
    await nat_test.set_value(v, {as: alice});
    const n = await nat_test.get_n();
    assert(v.equals(n), "Invalid Value")
  });
})
