import { generate_binding } from '../src/main'
import { ContractInterface } from '../src/utils'

import * as ts from "typescript";
import { expect_to_fail, get_account, Address, Nat, Int, Tez, set_mockup, set_quiet, Unit, Bytes, KeyHash, ChainId, Bls12381Fr, Duration } from '@completium/experiment-ts';

const archetype = require('@completium/archetype');
const assert = require('assert')
const fs = require('fs')
const tmp = require('tmp');

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

const generate_test_type_simple = (type_str: string, default_value: string, postfix : string): string =>
  `archetype type_simple_${postfix}

variable res : ${type_str} = ${default_value}

entry set_value(i : ${type_str}) {
  res := i
}
`

const test_type_simple = async (type_str: string, default_value: string, v: any, name ?: string) => {
  const postfix = name === undefined ? type_str : name;
  const input = generate_test_type_simple(type_str, default_value, postfix);
  const contract_path = `./type_simple_${postfix}.arl`;
  fs.writeFileSync('./tests/contracts/' + contract_path, input);

  const binding: any = await get_binding(contract_path);
  await binding.deploy({ as: alice })

  await binding.set_value(v, { as: alice });
  const res = await binding.get_res();
  return res;
}


describe('Simple type', async () => {

  // address
  it('address', async () => {
    const v = alice.get_address();
    const res = await test_type_simple('address', 'tz1Lc2qBKEWCBeDU8npG6zCeCqpmaegRi6Jg', v);
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
  it('bls12_381_fr', async () => {
    const v = new Bls12381Fr('02');
    const res = await test_type_simple('bls12_381_fr', '0x12', v);
    assert(v.equals(res), "Invalid Value")
  });

  // bls12_381_g1
  // bls12_381_g2
  // bool
  it('bool', async () => {
    const v = true;
    const res = await test_type_simple('bool', 'false', v);
    assert(v == res, "Invalid Value")
  });

  // bytes
  it('bytes', async () => {
    const v = new Bytes("02");
    const res = await test_type_simple('bytes', '0x', v);
    assert(v.equals(res), "Invalid Value")
  });

  // chain_id
  it('chain_id', async () => {
    const v = new ChainId('NetXdQprcVkpaWU');
    const res = await test_type_simple('chain_id', '"NetXLH1uAxK7CCh"', v);
    assert(v.equals(res), "Invalid Value")
  });

  // chest
  // chest_key
  // collection
  // contract
  // currency (tez)
  it('tez', async () => {
    const v = new Tez(2);
    const res = await test_type_simple('tez', '0tz', v);
    assert(v.equals(res), "Invalid Value")
  });

  // date
  it('date', async () => {
    const v = new Date('2022-12-31');
    const res = await test_type_simple('date', '2023-01-01', v);
    assert(v.toISOString() == res.toISOString(), "Invalid Value")
  });

  // duration
  it('duration', async () => {
    const v = new Duration('1m');
    const res = await test_type_simple('duration', '1s', v);
    assert(v.equals(res), "Invalid Value")
  });

  // enum
  // event
  // int
  it('int', async () => {
    const v = new Int(2);
    const res = await test_type_simple('int', '0i', v);
    assert(v.equals(res), "Invalid Value")
  });

  // iterable_big_map
  // key
  it('key', async () => {
    const v = alice.get_public_key();
    const res = await test_type_simple('key', '"edpkurLzuFFL1XyP3fed4u7MsgeywQoQmHM45Bz91PBzDvUjQ9bvdn"', v);
    assert(v.equals(res), "Invalid Value")
  });

  // key_hash
  it('key_hash', async () => {
    const v = new KeyHash(alice.get_public_key().toString());
    const res = await test_type_simple('key_hash', '"tz1Lc2qBKEWCBeDU8npG6zCeCqpmaegRi6Jg"', v);
    assert(v.equals(res), "Invalid Value")
  });

  // lambda
  // list
  it('list<nat>', async () => {
    const item = new Nat(2);
    const v = [item];
    const res = await test_type_simple('list<nat>', '[]', v, 'list_nat');
    assert(res.length == 1 && res[0].equals(item), "Invalid Value")
  });

  it('list<string>', async () => {
    const item = "mystr";
    const v = [item];
    const res = await test_type_simple('list<string>', '[]', v, 'list_string');
    assert(res.length == 1 && res[0] == item, "Invalid Value")
  });

  it('list<bool>', async () => {
    const item = true;
    const v = [item];
    const res = await test_type_simple('list<bool>', '[]', v, 'list_bool');
    assert(res.length == 1 && res[0] == item, "Invalid Value")
  });

  // map
  // nat
  it('nat', async () => {
    const v = new Nat(2);
    const res = await test_type_simple('nat', '0', v);
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
  it('string', async () => {
    const v = "mystr";
    const res = await test_type_simple('string', '""', v);
    assert(v == res, "Invalid Value")
  });

  // ticket
  // timestamp
  // tuple
  // unit
  it('unit', async () => {
    const v = new Unit();
    const res = await test_type_simple('unit', 'Unit', v);
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