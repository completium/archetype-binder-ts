import { generate_binding } from '../src/main'
import { ContractInterface } from '../src/utils'

import * as ts from "typescript";
import { expect_to_fail, get_account, Address, Nat, Int, Tez, set_mockup, set_quiet, Unit, Bytes } from '@completium/experiment-ts';

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
  const res: any = eval(result);
  return res
}

const test_type_simple = async (filename: string, v: any) => {
  const binding: any = await get_binding(filename);
  await binding.deploy({ as: alice })

  await binding.set_value(v, { as: alice });
  const res = await binding.get_res();
  return res;
}


describe('Simple type', async () => {

  // address
  it('Address', async () => {
    const v = alice.get_address();
    const res = await test_type_simple('type_simple_address.arl', v);
    assert(v.equals(res), "Invalid Value")
  });

  // aggregate
  // asset
  // asset_container
  // asset_key
  // asset_value
  // asset_view
  // big_map
  // bls12_381_fr
  // bls12_381_g1
  // bls12_381_g2
  // bool
  it('Bool', async () => {
    const v = true;
    const res = await test_type_simple('type_simple_bool.arl', v);
    assert(v == res, "Invalid Value")
  });

  // bytes
    it('Bytes', async () => {
    const v = new Bytes("02");
    const res = await test_type_simple('type_simple_bytes.arl', v);
    assert(v.equals(res), "Invalid Value")
  });

  // chain_id
  // chest
  // chest_key
  // collection
  // contract
  // currency (tez)
  it('Tez', async () => {
    const v = new Tez(2);
    const res = await test_type_simple('type_simple_tez.arl', v);
    assert(v.equals(res), "Invalid Value")
  });

  // date
  // duration
  // enum
  // event
  // int
  it('Int', async () => {
    const v = new Int(2);
    const res = await test_type_simple('type_simple_int.arl', v);
    assert(v.equals(res), "Invalid Value")
  });

  // iterable_big_map
  // key
  // keyHash
  // lambda
  // list
  // map
  // nat
  it('Nat', async () => {
    const v = new Nat(2);
    const res = await test_type_simple('type_simple_nat.arl', v);
    assert(v.equals(res), "Invalid Value")
  });

  // never
  // operation
  // option
  // or
  // partition
  // rational
  // record
  // sapling_state
  // sapling_transaction
  // set
  // signature
  // state

  // string
  it('String', async () => {
    const v = "mystr";
    const res = await test_type_simple('type_simple_string.arl', v);
    assert(v == res, "Invalid Value")
  });

  // ticket
  // timestamp
  // tuple
  // unit
  it('Unit', async () => {
    const v = new Unit();
    const res = await test_type_simple('type_simple_unit.arl', v);
    assert(v.equals(res), "Invalid Value")
  });

})

describe('Other', async () => {
  it('Simple fail', async () => {
    const simple_fail: any = await get_binding('simple_fail.arl');
    await simple_fail.deploy({ as: alice })

    expect_to_fail(async () => {
      simple_fail.f({ as: alice })
    }, simple_fail.errors.MYERROR)
  });
})