/* eslint-disable @typescript-eslint/no-inferrable-types */
  /* DO NOT EDIT, GENERATED FILE */
import { Address, Bls12_381_fr, Bls12_381_g1, Bls12_381_g2, Bytes, Chain_id, Chest, Chest_key, Duration, Int, Key, Key_hash, Nat, Rational, Option, Or, Sapling_transaction, Signature, Tez, Tx_rollup_l2_address, Unit } from '@completium/archetype-ts-types';
import { get_account, set_mockup, set_quiet } from '@completium/experiment-ts';

import * as type_asset_key_1_big_map_address from './contracts/bindings/type_asset_key_1_big_map_address'
import * as type_asset_key_1_big_map_bool from './contracts/bindings/type_asset_key_1_big_map_bool'
import * as type_asset_key_1_big_map_bytes from './contracts/bindings/type_asset_key_1_big_map_bytes'
import * as type_asset_key_1_big_map_chain_id from './contracts/bindings/type_asset_key_1_big_map_chain_id'
import * as type_asset_key_1_big_map_date from './contracts/bindings/type_asset_key_1_big_map_date'
import * as type_asset_key_1_big_map_duration from './contracts/bindings/type_asset_key_1_big_map_duration'
import * as type_asset_key_1_big_map_int from './contracts/bindings/type_asset_key_1_big_map_int'
import * as type_asset_key_1_big_map_key from './contracts/bindings/type_asset_key_1_big_map_key'
import * as type_asset_key_1_big_map_key_hash from './contracts/bindings/type_asset_key_1_big_map_key_hash'
import * as type_asset_key_1_big_map_nat from './contracts/bindings/type_asset_key_1_big_map_nat'
import * as type_asset_key_1_big_map_rational from './contracts/bindings/type_asset_key_1_big_map_rational'
import * as type_asset_key_1_big_map_signature from './contracts/bindings/type_asset_key_1_big_map_signature'
import * as type_asset_key_1_big_map_string from './contracts/bindings/type_asset_key_1_big_map_string'
import * as type_asset_key_1_big_map_tez from './contracts/bindings/type_asset_key_1_big_map_tez'
import * as type_asset_key_1_big_map_tx_rollup_l2_address from './contracts/bindings/type_asset_key_1_big_map_tx_rollup_l2_address'
import * as type_asset_key_1_big_map_unit from './contracts/bindings/type_asset_key_1_big_map_unit'
import * as type_asset_key_1_big_map_option_nat from './contracts/bindings/type_asset_key_1_big_map_option_nat'
import * as type_asset_key_1_big_map_option_string from './contracts/bindings/type_asset_key_1_big_map_option_string'
import * as type_asset_key_1_big_map_option_bool from './contracts/bindings/type_asset_key_1_big_map_option_bool'
import * as type_asset_key_1_big_map_or_nat_string from './contracts/bindings/type_asset_key_1_big_map_or_nat_string'
import * as type_asset_key_1_big_map_tuple_nat_string from './contracts/bindings/type_asset_key_1_big_map_tuple_nat_string'
import * as type_asset_key_1_big_map_tuple_nat_string_bytes from './contracts/bindings/type_asset_key_1_big_map_tuple_nat_string_bytes'
import * as type_asset_key_1_big_map_tuple_nat_string_bytes_bool from './contracts/bindings/type_asset_key_1_big_map_tuple_nat_string_bytes_bool'
import * as type_asset_key_1_big_map_tuple_nat_string_bytes_rev from './contracts/bindings/type_asset_key_1_big_map_tuple_nat_string_bytes_rev'
import * as type_asset_key_1_big_map_tuple_nat_string_bytes_bool_rev from './contracts/bindings/type_asset_key_1_big_map_tuple_nat_string_bytes_bool_rev'
import * as type_asset_key_1_big_map_tuple_nat_string_bytes_bool_custom from './contracts/bindings/type_asset_key_1_big_map_tuple_nat_string_bytes_bool_custom'
import * as type_asset_key_1_big_map_enum_simple from './contracts/bindings/type_asset_key_1_big_map_enum_simple'
import * as type_asset_key_1_big_map_enum_param from './contracts/bindings/type_asset_key_1_big_map_enum_param'
import * as type_asset_key_1_big_map_record_1_field from './contracts/bindings/type_asset_key_1_big_map_record_1_field'
import * as type_asset_key_1_big_map_record_2_fields from './contracts/bindings/type_asset_key_1_big_map_record_2_fields'
import * as type_asset_key_1_big_map_record_3_fields from './contracts/bindings/type_asset_key_1_big_map_record_3_fields'
import * as type_asset_key_1_big_map_record_4_fields from './contracts/bindings/type_asset_key_1_big_map_record_4_fields'
import * as type_asset_key_1_big_map_record_4_fields_custom from './contracts/bindings/type_asset_key_1_big_map_record_4_fields_custom'


import assert from 'assert'

const alice = get_account('alice')

/* Verbose mode ------------------------------------------------------------ */

set_quiet(true);

/* Endpoint ---------------------------------------------------------------- */

set_mockup()

/* Tests-------------------------------------------------------------------- */

describe('Type asset_key_1_big_map', () => {
  // address
  it('address', async () => {
    const v : Address = new Address("tz1VSUr8wwNhLAzempoch5d6hLRiTh8Cjcjb");
    await type_asset_key_1_big_map_address.type_asset_key_1_big_map_address.deploy({ as: alice });
    await type_asset_key_1_big_map_address.type_asset_key_1_big_map_address.asset_put(v, { as: alice });
    const res = await type_asset_key_1_big_map_address.type_asset_key_1_big_map_address.get_my_asset_value(v);
    assert(res == "", "Invalid Value")
  });

  // bool
  it('bool', async () => {
    const v : boolean = true;
    await type_asset_key_1_big_map_bool.type_asset_key_1_big_map_bool.deploy({ as: alice });
    await type_asset_key_1_big_map_bool.type_asset_key_1_big_map_bool.asset_put(v, { as: alice });
    const res = await type_asset_key_1_big_map_bool.type_asset_key_1_big_map_bool.get_my_asset_value(v);
    assert(res == "", "Invalid Value")
  });

  // bytes
  it('bytes', async () => {
    const v : Bytes = new Bytes("ff");
    await type_asset_key_1_big_map_bytes.type_asset_key_1_big_map_bytes.deploy({ as: alice });
    await type_asset_key_1_big_map_bytes.type_asset_key_1_big_map_bytes.asset_put(v, { as: alice });
    const res = await type_asset_key_1_big_map_bytes.type_asset_key_1_big_map_bytes.get_my_asset_value(v);
    assert(res == "", "Invalid Value")
  });

  // chain_id
  it('chain_id', async () => {
    const v : Chain_id = new Chain_id("NetXdQprcVkpaWU");
    await type_asset_key_1_big_map_chain_id.type_asset_key_1_big_map_chain_id.deploy({ as: alice });
    await type_asset_key_1_big_map_chain_id.type_asset_key_1_big_map_chain_id.asset_put(v, { as: alice });
    const res = await type_asset_key_1_big_map_chain_id.type_asset_key_1_big_map_chain_id.get_my_asset_value(v);
    assert(res == "", "Invalid Value")
  });

  // date
  it('date', async () => {
    const v : Date = new Date("2022-12-31");
    await type_asset_key_1_big_map_date.type_asset_key_1_big_map_date.deploy({ as: alice });
    await type_asset_key_1_big_map_date.type_asset_key_1_big_map_date.asset_put(v, { as: alice });
    const res = await type_asset_key_1_big_map_date.type_asset_key_1_big_map_date.get_my_asset_value(v);
    assert(res == "", "Invalid Value")
  });

  // duration
  it('duration', async () => {
    const v : Duration = new Duration("2m");
    await type_asset_key_1_big_map_duration.type_asset_key_1_big_map_duration.deploy({ as: alice });
    await type_asset_key_1_big_map_duration.type_asset_key_1_big_map_duration.asset_put(v, { as: alice });
    const res = await type_asset_key_1_big_map_duration.type_asset_key_1_big_map_duration.get_my_asset_value(v);
    assert(res == "", "Invalid Value")
  });

  // int
  it('int', async () => {
    const v : Int = new Int(2);
    await type_asset_key_1_big_map_int.type_asset_key_1_big_map_int.deploy({ as: alice });
    await type_asset_key_1_big_map_int.type_asset_key_1_big_map_int.asset_put(v, { as: alice });
    const res = await type_asset_key_1_big_map_int.type_asset_key_1_big_map_int.get_my_asset_value(v);
    assert(res == "", "Invalid Value")
  });

  // key
  it('key', async () => {
    const v : Key = alice.get_public_key();
    await type_asset_key_1_big_map_key.type_asset_key_1_big_map_key.deploy({ as: alice });
    await type_asset_key_1_big_map_key.type_asset_key_1_big_map_key.asset_put(v, { as: alice });
    const res = await type_asset_key_1_big_map_key.type_asset_key_1_big_map_key.get_my_asset_value(v);
    assert(res == "", "Invalid Value")
  });

  // key_hash
  it('key_hash', async () => {
    const v : Key_hash = new Key_hash(alice.get_address().toString());
    await type_asset_key_1_big_map_key_hash.type_asset_key_1_big_map_key_hash.deploy({ as: alice });
    await type_asset_key_1_big_map_key_hash.type_asset_key_1_big_map_key_hash.asset_put(v, { as: alice });
    const res = await type_asset_key_1_big_map_key_hash.type_asset_key_1_big_map_key_hash.get_my_asset_value(v);
    assert(res == "", "Invalid Value")
  });

  // nat
  it('nat', async () => {
    const v : Nat = new Nat(2);
    await type_asset_key_1_big_map_nat.type_asset_key_1_big_map_nat.deploy({ as: alice });
    await type_asset_key_1_big_map_nat.type_asset_key_1_big_map_nat.asset_put(v, { as: alice });
    const res = await type_asset_key_1_big_map_nat.type_asset_key_1_big_map_nat.get_my_asset_value(v);
    assert(res == "", "Invalid Value")
  });

  // rational
  it('rational', async () => {
    const v : Rational = new Rational(1.5);
    await type_asset_key_1_big_map_rational.type_asset_key_1_big_map_rational.deploy({ as: alice });
    await type_asset_key_1_big_map_rational.type_asset_key_1_big_map_rational.asset_put(v, { as: alice });
    const res = await type_asset_key_1_big_map_rational.type_asset_key_1_big_map_rational.get_my_asset_value(v);
    assert(res == "", "Invalid Value")
  });

  // signature
  it('signature', async () => {
    const v : Signature = new Signature("sigPGRuva6xjBJkmb6BYpbovGb4BoobkE3GUN2njdxwkG25yRT39GaDrsBgczf5VybSRGi5eddQy6VBfUkg2YcLfMvgg8Uk1");
    await type_asset_key_1_big_map_signature.type_asset_key_1_big_map_signature.deploy({ as: alice });
    await type_asset_key_1_big_map_signature.type_asset_key_1_big_map_signature.asset_put(v, { as: alice });
    const res = await type_asset_key_1_big_map_signature.type_asset_key_1_big_map_signature.get_my_asset_value(v);
    assert(res == "", "Invalid Value")
  });

  // string
  it('string', async () => {
    const v : string = "mystr";
    await type_asset_key_1_big_map_string.type_asset_key_1_big_map_string.deploy({ as: alice });
    await type_asset_key_1_big_map_string.type_asset_key_1_big_map_string.asset_put(v, { as: alice });
    const res = await type_asset_key_1_big_map_string.type_asset_key_1_big_map_string.get_my_asset_value(v);
    assert(res == "", "Invalid Value")
  });

  // tez
  it('tez', async () => {
    const v : Tez = new Tez(2);
    await type_asset_key_1_big_map_tez.type_asset_key_1_big_map_tez.deploy({ as: alice });
    await type_asset_key_1_big_map_tez.type_asset_key_1_big_map_tez.asset_put(v, { as: alice });
    const res = await type_asset_key_1_big_map_tez.type_asset_key_1_big_map_tez.get_my_asset_value(v);
    assert(res == "", "Invalid Value")
  });

  // tx_rollup_l2_address
  it('tx_rollup_l2_address', async () => {
    const v : Tx_rollup_l2_address = new Tx_rollup_l2_address("tz4HVR6aty9KwsQFHh81C1G7gBdhxT8kuytm");
    await type_asset_key_1_big_map_tx_rollup_l2_address.type_asset_key_1_big_map_tx_rollup_l2_address.deploy({ as: alice });
    await type_asset_key_1_big_map_tx_rollup_l2_address.type_asset_key_1_big_map_tx_rollup_l2_address.asset_put(v, { as: alice });
    const res = await type_asset_key_1_big_map_tx_rollup_l2_address.type_asset_key_1_big_map_tx_rollup_l2_address.get_my_asset_value(v);
    assert(res == "", "Invalid Value")
  });

  // unit
  it('unit', async () => {
    const v : Unit = new Unit();
    await type_asset_key_1_big_map_unit.type_asset_key_1_big_map_unit.deploy({ as: alice });
    await type_asset_key_1_big_map_unit.type_asset_key_1_big_map_unit.asset_put(v, { as: alice });
    const res = await type_asset_key_1_big_map_unit.type_asset_key_1_big_map_unit.get_my_asset_value(v);
    assert(res == "", "Invalid Value")
  });

  // option_nat
  it('option_nat', async () => {
    const v : Option<Nat> = Option.Some(new Nat(2));
    await type_asset_key_1_big_map_option_nat.type_asset_key_1_big_map_option_nat.deploy({ as: alice });
    await type_asset_key_1_big_map_option_nat.type_asset_key_1_big_map_option_nat.asset_put(v, { as: alice });
    const res = await type_asset_key_1_big_map_option_nat.type_asset_key_1_big_map_option_nat.get_my_asset_value(v);
    assert(res == "", "Invalid Value")
  });

  // option_string
  it('option_string', async () => {
    const v : Option<string> = Option.Some<string>("mystr");
    await type_asset_key_1_big_map_option_string.type_asset_key_1_big_map_option_string.deploy({ as: alice });
    await type_asset_key_1_big_map_option_string.type_asset_key_1_big_map_option_string.asset_put(v, { as: alice });
    const res = await type_asset_key_1_big_map_option_string.type_asset_key_1_big_map_option_string.get_my_asset_value(v);
    assert(res == "", "Invalid Value")
  });

  // option_bool
  it('option_bool', async () => {
    const v : Option<boolean> = Option.Some<boolean>(true);
    await type_asset_key_1_big_map_option_bool.type_asset_key_1_big_map_option_bool.deploy({ as: alice });
    await type_asset_key_1_big_map_option_bool.type_asset_key_1_big_map_option_bool.asset_put(v, { as: alice });
    const res = await type_asset_key_1_big_map_option_bool.type_asset_key_1_big_map_option_bool.get_my_asset_value(v);
    assert(res == "", "Invalid Value")
  });

  // or_nat_string
  it('or_nat_string', async () => {
    const v : Or<Nat, string> = Or.Left(new Nat(2));
    await type_asset_key_1_big_map_or_nat_string.type_asset_key_1_big_map_or_nat_string.deploy({ as: alice });
    await type_asset_key_1_big_map_or_nat_string.type_asset_key_1_big_map_or_nat_string.asset_put(v, { as: alice });
    const res = await type_asset_key_1_big_map_or_nat_string.type_asset_key_1_big_map_or_nat_string.get_my_asset_value(v);
    assert(res == "", "Invalid Value")
  });

  // tuple_nat_string
  it('tuple_nat_string', async () => {
    const v : [Nat, string] = [new Nat(2), "mystring"];
    await type_asset_key_1_big_map_tuple_nat_string.type_asset_key_1_big_map_tuple_nat_string.deploy({ as: alice });
    await type_asset_key_1_big_map_tuple_nat_string.type_asset_key_1_big_map_tuple_nat_string.asset_put(v, { as: alice });
    const res = await type_asset_key_1_big_map_tuple_nat_string.type_asset_key_1_big_map_tuple_nat_string.get_my_asset_value(v);
    assert(res == "", "Invalid Value")
  });

  // tuple_nat_string_bytes
  it('tuple_nat_string_bytes', async () => {
    const v : [Nat, string, Bytes] = [new Nat(2), "toto", new Bytes("ff")];
    await type_asset_key_1_big_map_tuple_nat_string_bytes.type_asset_key_1_big_map_tuple_nat_string_bytes.deploy({ as: alice });
    await type_asset_key_1_big_map_tuple_nat_string_bytes.type_asset_key_1_big_map_tuple_nat_string_bytes.asset_put(v, { as: alice });
    const res = await type_asset_key_1_big_map_tuple_nat_string_bytes.type_asset_key_1_big_map_tuple_nat_string_bytes.get_my_asset_value(v);
    assert(res == "", "Invalid Value")
  });

  // tuple_nat_string_bytes_bool
  it('tuple_nat_string_bytes_bool', async () => {
    const v : [Nat, string, Bytes, boolean] = [new Nat(2), "toto", new Bytes("ff"), true];
    await type_asset_key_1_big_map_tuple_nat_string_bytes_bool.type_asset_key_1_big_map_tuple_nat_string_bytes_bool.deploy({ as: alice });
    await type_asset_key_1_big_map_tuple_nat_string_bytes_bool.type_asset_key_1_big_map_tuple_nat_string_bytes_bool.asset_put(v, { as: alice });
    const res = await type_asset_key_1_big_map_tuple_nat_string_bytes_bool.type_asset_key_1_big_map_tuple_nat_string_bytes_bool.get_my_asset_value(v);
    assert(res == "", "Invalid Value")
  });

  // tuple_nat_string_bytes_rev
  it('tuple_nat_string_bytes_rev', async () => {
    const v : [[Nat, string], Bytes] = [[new Nat(2), "toto"], new Bytes("ff")];
    await type_asset_key_1_big_map_tuple_nat_string_bytes_rev.type_asset_key_1_big_map_tuple_nat_string_bytes_rev.deploy({ as: alice });
    await type_asset_key_1_big_map_tuple_nat_string_bytes_rev.type_asset_key_1_big_map_tuple_nat_string_bytes_rev.asset_put(v, { as: alice });
    const res = await type_asset_key_1_big_map_tuple_nat_string_bytes_rev.type_asset_key_1_big_map_tuple_nat_string_bytes_rev.get_my_asset_value(v);
    assert(res == "", "Invalid Value")
  });

  // tuple_nat_string_bytes_bool_rev
  it('tuple_nat_string_bytes_bool_rev', async () => {
    const v : [[[Nat, string], Bytes], boolean] = [[[new Nat(2), "toto"], new Bytes("ff")], true];
    await type_asset_key_1_big_map_tuple_nat_string_bytes_bool_rev.type_asset_key_1_big_map_tuple_nat_string_bytes_bool_rev.deploy({ as: alice });
    await type_asset_key_1_big_map_tuple_nat_string_bytes_bool_rev.type_asset_key_1_big_map_tuple_nat_string_bytes_bool_rev.asset_put(v, { as: alice });
    const res = await type_asset_key_1_big_map_tuple_nat_string_bytes_bool_rev.type_asset_key_1_big_map_tuple_nat_string_bytes_bool_rev.get_my_asset_value(v);
    assert(res == "", "Invalid Value")
  });

  // tuple_nat_string_bytes_bool_custom
  it('tuple_nat_string_bytes_bool_custom', async () => {
    const v : [Nat, [string, Bytes], boolean] = [new Nat(2), ["toto", new Bytes("ff")], true];
    await type_asset_key_1_big_map_tuple_nat_string_bytes_bool_custom.type_asset_key_1_big_map_tuple_nat_string_bytes_bool_custom.deploy({ as: alice });
    await type_asset_key_1_big_map_tuple_nat_string_bytes_bool_custom.type_asset_key_1_big_map_tuple_nat_string_bytes_bool_custom.asset_put(v, { as: alice });
    const res = await type_asset_key_1_big_map_tuple_nat_string_bytes_bool_custom.type_asset_key_1_big_map_tuple_nat_string_bytes_bool_custom.get_my_asset_value(v);
    assert(res == "", "Invalid Value")
  });

  // enum_simple
  it('enum_simple', async () => {
    const v : type_asset_key_1_big_map_enum_simple.e_enum = new type_asset_key_1_big_map_enum_simple.e_2();
    await type_asset_key_1_big_map_enum_simple.type_asset_key_1_big_map_enum_simple.deploy({ as: alice });
    await type_asset_key_1_big_map_enum_simple.type_asset_key_1_big_map_enum_simple.asset_put(v, { as: alice });
    const res = await type_asset_key_1_big_map_enum_simple.type_asset_key_1_big_map_enum_simple.get_my_asset_value(v);
    assert(res == "", "Invalid Value")
  });

  // enum_param
  it('enum_param', async () => {
    const v : type_asset_key_1_big_map_enum_param.e_enum = new type_asset_key_1_big_map_enum_param.e_2(new Nat(2));
    await type_asset_key_1_big_map_enum_param.type_asset_key_1_big_map_enum_param.deploy({ as: alice });
    await type_asset_key_1_big_map_enum_param.type_asset_key_1_big_map_enum_param.asset_put(v, { as: alice });
    const res = await type_asset_key_1_big_map_enum_param.type_asset_key_1_big_map_enum_param.get_my_asset_value(v);
    assert(res == "", "Invalid Value")
  });

  // record_1_field
  it('record_1_field', async () => {
    const v : type_asset_key_1_big_map_record_1_field.r_record = new type_asset_key_1_big_map_record_1_field.r_record(new Nat(2));
    await type_asset_key_1_big_map_record_1_field.type_asset_key_1_big_map_record_1_field.deploy({ as: alice });
    await type_asset_key_1_big_map_record_1_field.type_asset_key_1_big_map_record_1_field.asset_put(v, { as: alice });
    const res = await type_asset_key_1_big_map_record_1_field.type_asset_key_1_big_map_record_1_field.get_my_asset_value(v);
    assert(res == "", "Invalid Value")
  });

  // record_2_fields
  it('record_2_fields', async () => {
    const v : type_asset_key_1_big_map_record_2_fields.r_record = new type_asset_key_1_big_map_record_2_fields.r_record(new Nat(2), "mystr");
    await type_asset_key_1_big_map_record_2_fields.type_asset_key_1_big_map_record_2_fields.deploy({ as: alice });
    await type_asset_key_1_big_map_record_2_fields.type_asset_key_1_big_map_record_2_fields.asset_put(v, { as: alice });
    const res = await type_asset_key_1_big_map_record_2_fields.type_asset_key_1_big_map_record_2_fields.get_my_asset_value(v);
    assert(res == "", "Invalid Value")
  });

  // record_3_fields
  it('record_3_fields', async () => {
    const v : type_asset_key_1_big_map_record_3_fields.r_record = new type_asset_key_1_big_map_record_3_fields.r_record(new Nat(2), "mystr", new Bytes("02"));
    await type_asset_key_1_big_map_record_3_fields.type_asset_key_1_big_map_record_3_fields.deploy({ as: alice });
    await type_asset_key_1_big_map_record_3_fields.type_asset_key_1_big_map_record_3_fields.asset_put(v, { as: alice });
    const res = await type_asset_key_1_big_map_record_3_fields.type_asset_key_1_big_map_record_3_fields.get_my_asset_value(v);
    assert(res == "", "Invalid Value")
  });

  // record_4_fields
  it('record_4_fields', async () => {
    const v : type_asset_key_1_big_map_record_4_fields.r_record = new type_asset_key_1_big_map_record_4_fields.r_record(new Nat(2), "mystr", new Bytes("02"), true);
    await type_asset_key_1_big_map_record_4_fields.type_asset_key_1_big_map_record_4_fields.deploy({ as: alice });
    await type_asset_key_1_big_map_record_4_fields.type_asset_key_1_big_map_record_4_fields.asset_put(v, { as: alice });
    const res = await type_asset_key_1_big_map_record_4_fields.type_asset_key_1_big_map_record_4_fields.get_my_asset_value(v);
    assert(res == "", "Invalid Value")
  });

  // record_4_fields_custom
  it('record_4_fields_custom', async () => {
    const v : type_asset_key_1_big_map_record_4_fields_custom.r_record = new type_asset_key_1_big_map_record_4_fields_custom.r_record(new Nat(2), "mystr", new Bytes("02"), true);
    await type_asset_key_1_big_map_record_4_fields_custom.type_asset_key_1_big_map_record_4_fields_custom.deploy({ as: alice });
    await type_asset_key_1_big_map_record_4_fields_custom.type_asset_key_1_big_map_record_4_fields_custom.asset_put(v, { as: alice });
    const res = await type_asset_key_1_big_map_record_4_fields_custom.type_asset_key_1_big_map_record_4_fields_custom.get_my_asset_value(v);
    assert(res == "", "Invalid Value")
  });

  
})
