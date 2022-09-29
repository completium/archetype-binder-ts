import { generate_binding } from '../src/main'
import { ContractInterface } from '../src/utils'

import * as ts from "typescript";
import { expect_to_fail, get_account, Nat, set_mockup, set_quiet } from '@completium/experiment-ts';

const fs = require('fs')
const assert = require('assert')
const archetype = require('@completium/archetype');

const alice = get_account('alice')

/* Verbose mode ------------------------------------------------------------ */

set_quiet(true);

/* Endpoint ---------------------------------------------------------------- */

set_mockup()

/* Constants --------------------------------------------------------------- */

const path_contracts = './tests/contracts/';

/* Functions --------------------------------------------------------------- */

const get_binding = async (filename: string) => {
  const path_contract = path_contracts + filename;
  const json = await archetype.compile(path_contract, {
    contract_interface: true
  });
  let ci: ContractInterface = JSON.parse(json);
  const output = generate_binding(ci, path_contracts);
  let result = ts.transpile(output);
  const res : any = eval(result);
  return res
}

describe('Contract testing', async () => {
  it('Nat test', async () => {
    const nat_test : any = await get_binding('nat_test.arl');
    await nat_test.deploy({ as: alice })

    expect_to_fail(async () => {
      nat_test.f({ as: alice })
    }, nat_test.errors.MYERROR)

    const v = new Nat(2);
    await nat_test.set_value(v, { as: alice });
    const n = await nat_test.get_n();
    assert(v.equals(n), "Invalid Value")
  });
})
