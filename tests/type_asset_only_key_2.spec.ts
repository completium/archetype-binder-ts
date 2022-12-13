/* eslint-disable @typescript-eslint/no-inferrable-types */
  /* DO NOT EDIT, GENERATED FILE */
import { Address, Bls12_381_fr, Bls12_381_g1, Bls12_381_g2, Bytes, Chain_id, Chest, Chest_key, Duration, Int, Key, Key_hash, Nat, Rational, Option, Or, Sapling_transaction, Signature, Tez, Tx_rollup_l2_address, Unit } from '@completium/archetype-ts-types';
import { get_account, set_mockup, set_quiet } from '@completium/experiment-ts';

import * as type_asset_only_key_2_address from './contracts/bindings/type_asset_only_key_2_address'
import * as type_asset_only_key_2_bool from './contracts/bindings/type_asset_only_key_2_bool'
import * as type_asset_only_key_2_bytes from './contracts/bindings/type_asset_only_key_2_bytes'
import * as type_asset_only_key_2_chain_id from './contracts/bindings/type_asset_only_key_2_chain_id'
import * as type_asset_only_key_2_date from './contracts/bindings/type_asset_only_key_2_date'
import * as type_asset_only_key_2_duration from './contracts/bindings/type_asset_only_key_2_duration'
import * as type_asset_only_key_2_int from './contracts/bindings/type_asset_only_key_2_int'
import * as type_asset_only_key_2_key from './contracts/bindings/type_asset_only_key_2_key'
import * as type_asset_only_key_2_key_hash from './contracts/bindings/type_asset_only_key_2_key_hash'
import * as type_asset_only_key_2_nat from './contracts/bindings/type_asset_only_key_2_nat'
import * as type_asset_only_key_2_rational from './contracts/bindings/type_asset_only_key_2_rational'
import * as type_asset_only_key_2_signature from './contracts/bindings/type_asset_only_key_2_signature'
import * as type_asset_only_key_2_string from './contracts/bindings/type_asset_only_key_2_string'
import * as type_asset_only_key_2_tez from './contracts/bindings/type_asset_only_key_2_tez'
import * as type_asset_only_key_2_unit from './contracts/bindings/type_asset_only_key_2_unit'
import * as type_asset_only_key_2_option_nat from './contracts/bindings/type_asset_only_key_2_option_nat'
import * as type_asset_only_key_2_option_string from './contracts/bindings/type_asset_only_key_2_option_string'
import * as type_asset_only_key_2_option_bool from './contracts/bindings/type_asset_only_key_2_option_bool'
import * as type_asset_only_key_2_or_nat_string from './contracts/bindings/type_asset_only_key_2_or_nat_string'
import * as type_asset_only_key_2_tuple_nat_string from './contracts/bindings/type_asset_only_key_2_tuple_nat_string'
import * as type_asset_only_key_2_tuple_nat_string_bytes from './contracts/bindings/type_asset_only_key_2_tuple_nat_string_bytes'
import * as type_asset_only_key_2_tuple_nat_string_bytes_bool from './contracts/bindings/type_asset_only_key_2_tuple_nat_string_bytes_bool'
import * as type_asset_only_key_2_tuple_nat_string_bytes_rev from './contracts/bindings/type_asset_only_key_2_tuple_nat_string_bytes_rev'
import * as type_asset_only_key_2_tuple_nat_string_bytes_bool_rev from './contracts/bindings/type_asset_only_key_2_tuple_nat_string_bytes_bool_rev'
import * as type_asset_only_key_2_tuple_nat_string_bytes_bool_custom from './contracts/bindings/type_asset_only_key_2_tuple_nat_string_bytes_bool_custom'
import * as type_asset_only_key_2_enum_simple from './contracts/bindings/type_asset_only_key_2_enum_simple'
import * as type_asset_only_key_2_enum_param from './contracts/bindings/type_asset_only_key_2_enum_param'
import * as type_asset_only_key_2_record_1_field from './contracts/bindings/type_asset_only_key_2_record_1_field'
import * as type_asset_only_key_2_record_2_fields from './contracts/bindings/type_asset_only_key_2_record_2_fields'
import * as type_asset_only_key_2_record_3_fields from './contracts/bindings/type_asset_only_key_2_record_3_fields'
import * as type_asset_only_key_2_record_4_fields from './contracts/bindings/type_asset_only_key_2_record_4_fields'
import * as type_asset_only_key_2_record_4_fields_custom from './contracts/bindings/type_asset_only_key_2_record_4_fields_custom'


import assert from 'assert'

const alice = get_account('alice')

/* Verbose mode ------------------------------------------------------------ */

set_quiet(true);

/* Endpoint ---------------------------------------------------------------- */

set_mockup()

/* Tests-------------------------------------------------------------------- */

describe('Type asset_only_key_2', () => {
  // address
  it('address', async () => {
    const v : Address = new Address("tz1VSUr8wwNhLAzempoch5d6hLRiTh8Cjcjb");
    await type_asset_only_key_2_address.type_asset_only_key_2_address.deploy({ as: alice });
    await type_asset_only_key_2_address.type_asset_only_key_2_address.asset_put(v, { as: alice });
    const res = await type_asset_only_key_2_address.type_asset_only_key_2_address.get_my_asset();
    assert(new type_asset_only_key_2_address.my_asset_key(v, new Nat(0)).equals(res[0]), "Invalid Value")
  });

  // bool
  it('bool', async () => {
    const v : boolean = true;
    await type_asset_only_key_2_bool.type_asset_only_key_2_bool.deploy({ as: alice });
    await type_asset_only_key_2_bool.type_asset_only_key_2_bool.asset_put(v, { as: alice });
    const res = await type_asset_only_key_2_bool.type_asset_only_key_2_bool.get_my_asset();
    assert(new type_asset_only_key_2_bool.my_asset_key(v, new Nat(0)).equals(res[0]), "Invalid Value")
  });

  // bytes
  it('bytes', async () => {
    const v : Bytes = new Bytes("ff");
    await type_asset_only_key_2_bytes.type_asset_only_key_2_bytes.deploy({ as: alice });
    await type_asset_only_key_2_bytes.type_asset_only_key_2_bytes.asset_put(v, { as: alice });
    const res = await type_asset_only_key_2_bytes.type_asset_only_key_2_bytes.get_my_asset();
    assert(new type_asset_only_key_2_bytes.my_asset_key(v, new Nat(0)).equals(res[0]), "Invalid Value")
  });

  // chain_id
  it('chain_id', async () => {
    const v : Chain_id = new Chain_id("NetXdQprcVkpaWU");
    await type_asset_only_key_2_chain_id.type_asset_only_key_2_chain_id.deploy({ as: alice });
    await type_asset_only_key_2_chain_id.type_asset_only_key_2_chain_id.asset_put(v, { as: alice });
    const res = await type_asset_only_key_2_chain_id.type_asset_only_key_2_chain_id.get_my_asset();
    assert(new type_asset_only_key_2_chain_id.my_asset_key(v, new Nat(0)).equals(res[0]), "Invalid Value")
  });

  // date
  it('date', async () => {
    const v : Date = new Date("2022-12-31");
    await type_asset_only_key_2_date.type_asset_only_key_2_date.deploy({ as: alice });
    await type_asset_only_key_2_date.type_asset_only_key_2_date.asset_put(v, { as: alice });
    const res = await type_asset_only_key_2_date.type_asset_only_key_2_date.get_my_asset();
    assert(new type_asset_only_key_2_date.my_asset_key(v, new Nat(0)).equals(res[0]), "Invalid Value")
  });

  // duration
  it('duration', async () => {
    const v : Duration = new Duration("2m");
    await type_asset_only_key_2_duration.type_asset_only_key_2_duration.deploy({ as: alice });
    await type_asset_only_key_2_duration.type_asset_only_key_2_duration.asset_put(v, { as: alice });
    const res = await type_asset_only_key_2_duration.type_asset_only_key_2_duration.get_my_asset();
    assert(new type_asset_only_key_2_duration.my_asset_key(v, new Nat(0)).equals(res[0]), "Invalid Value")
  });

  // int
  it('int', async () => {
    const v : Int = new Int(2);
    await type_asset_only_key_2_int.type_asset_only_key_2_int.deploy({ as: alice });
    await type_asset_only_key_2_int.type_asset_only_key_2_int.asset_put(v, { as: alice });
    const res = await type_asset_only_key_2_int.type_asset_only_key_2_int.get_my_asset();
    assert(new type_asset_only_key_2_int.my_asset_key(v, new Nat(0)).equals(res[0]), "Invalid Value")
  });

  // key
  it('key', async () => {
    const v : Key = alice.get_public_key();
    await type_asset_only_key_2_key.type_asset_only_key_2_key.deploy({ as: alice });
    await type_asset_only_key_2_key.type_asset_only_key_2_key.asset_put(v, { as: alice });
    const res = await type_asset_only_key_2_key.type_asset_only_key_2_key.get_my_asset();
    assert(new type_asset_only_key_2_key.my_asset_key(v, new Nat(0)).equals(res[0]), "Invalid Value")
  });

  // key_hash
  it('key_hash', async () => {
    const v : Key_hash = new Key_hash(alice.get_address().toString());
    await type_asset_only_key_2_key_hash.type_asset_only_key_2_key_hash.deploy({ as: alice });
    await type_asset_only_key_2_key_hash.type_asset_only_key_2_key_hash.asset_put(v, { as: alice });
    const res = await type_asset_only_key_2_key_hash.type_asset_only_key_2_key_hash.get_my_asset();
    assert(new type_asset_only_key_2_key_hash.my_asset_key(v, new Nat(0)).equals(res[0]), "Invalid Value")
  });

  // nat
  it('nat', async () => {
    const v : Nat = new Nat(2);
    await type_asset_only_key_2_nat.type_asset_only_key_2_nat.deploy({ as: alice });
    await type_asset_only_key_2_nat.type_asset_only_key_2_nat.asset_put(v, { as: alice });
    const res = await type_asset_only_key_2_nat.type_asset_only_key_2_nat.get_my_asset();
    assert(new type_asset_only_key_2_nat.my_asset_key(v, new Nat(0)).equals(res[0]), "Invalid Value")
  });

  // rational
  it('rational', async () => {
    const v : Rational = new Rational(1.5);
    await type_asset_only_key_2_rational.type_asset_only_key_2_rational.deploy({ as: alice });
    await type_asset_only_key_2_rational.type_asset_only_key_2_rational.asset_put(v, { as: alice });
    const res = await type_asset_only_key_2_rational.type_asset_only_key_2_rational.get_my_asset();
    assert(new type_asset_only_key_2_rational.my_asset_key(v, new Nat(0)).equals(res[0]), "Invalid Value")
  });

  // signature
  it('signature', async () => {
    const v : Signature = new Signature("sigPGRuva6xjBJkmb6BYpbovGb4BoobkE3GUN2njdxwkG25yRT39GaDrsBgczf5VybSRGi5eddQy6VBfUkg2YcLfMvgg8Uk1");
    await type_asset_only_key_2_signature.type_asset_only_key_2_signature.deploy({ as: alice });
    await type_asset_only_key_2_signature.type_asset_only_key_2_signature.asset_put(v, { as: alice });
    const res = await type_asset_only_key_2_signature.type_asset_only_key_2_signature.get_my_asset();
    assert(new type_asset_only_key_2_signature.my_asset_key(v, new Nat(0)).equals(res[0]), "Invalid Value")
  });

  // string
  it('string', async () => {
    const v : string = "mystr";
    await type_asset_only_key_2_string.type_asset_only_key_2_string.deploy({ as: alice });
    await type_asset_only_key_2_string.type_asset_only_key_2_string.asset_put(v, { as: alice });
    const res = await type_asset_only_key_2_string.type_asset_only_key_2_string.get_my_asset();
    assert(new type_asset_only_key_2_string.my_asset_key(v, new Nat(0)).equals(res[0]), "Invalid Value")
  });

  // tez
  it('tez', async () => {
    const v : Tez = new Tez(2);
    await type_asset_only_key_2_tez.type_asset_only_key_2_tez.deploy({ as: alice });
    await type_asset_only_key_2_tez.type_asset_only_key_2_tez.asset_put(v, { as: alice });
    const res = await type_asset_only_key_2_tez.type_asset_only_key_2_tez.get_my_asset();
    assert(new type_asset_only_key_2_tez.my_asset_key(v, new Nat(0)).equals(res[0]), "Invalid Value")
  });

  // unit
  it('unit', async () => {
    const v : Unit = new Unit();
    await type_asset_only_key_2_unit.type_asset_only_key_2_unit.deploy({ as: alice });
    await type_asset_only_key_2_unit.type_asset_only_key_2_unit.asset_put(v, { as: alice });
    const res = await type_asset_only_key_2_unit.type_asset_only_key_2_unit.get_my_asset();
    assert(new type_asset_only_key_2_unit.my_asset_key(v, new Nat(0)).equals(res[0]), "Invalid Value")
  });

  // option_nat
  it('option_nat', async () => {
    const v : Option<Nat> = Option.Some(new Nat(2));
    await type_asset_only_key_2_option_nat.type_asset_only_key_2_option_nat.deploy({ as: alice });
    await type_asset_only_key_2_option_nat.type_asset_only_key_2_option_nat.asset_put(v, { as: alice });
    const res = await type_asset_only_key_2_option_nat.type_asset_only_key_2_option_nat.get_my_asset();
    assert(new type_asset_only_key_2_option_nat.my_asset_key(v, new Nat(0)).equals(res[0]), "Invalid Value")
  });

  // option_string
  it('option_string', async () => {
    const v : Option<string> = Option.Some<string>("mystr");
    await type_asset_only_key_2_option_string.type_asset_only_key_2_option_string.deploy({ as: alice });
    await type_asset_only_key_2_option_string.type_asset_only_key_2_option_string.asset_put(v, { as: alice });
    const res = await type_asset_only_key_2_option_string.type_asset_only_key_2_option_string.get_my_asset();
    assert(new type_asset_only_key_2_option_string.my_asset_key(v, new Nat(0)).equals(res[0]), "Invalid Value")
  });

  // option_bool
  it('option_bool', async () => {
    const v : Option<boolean> = Option.Some<boolean>(true);
    await type_asset_only_key_2_option_bool.type_asset_only_key_2_option_bool.deploy({ as: alice });
    await type_asset_only_key_2_option_bool.type_asset_only_key_2_option_bool.asset_put(v, { as: alice });
    const res = await type_asset_only_key_2_option_bool.type_asset_only_key_2_option_bool.get_my_asset();
    assert(new type_asset_only_key_2_option_bool.my_asset_key(v, new Nat(0)).equals(res[0]), "Invalid Value")
  });

  // or_nat_string
  it('or_nat_string', async () => {
    const v : Or<Nat, string> = Or.Left(new Nat(2));
    await type_asset_only_key_2_or_nat_string.type_asset_only_key_2_or_nat_string.deploy({ as: alice });
    await type_asset_only_key_2_or_nat_string.type_asset_only_key_2_or_nat_string.asset_put(v, { as: alice });
    const res = await type_asset_only_key_2_or_nat_string.type_asset_only_key_2_or_nat_string.get_my_asset();
    assert(new type_asset_only_key_2_or_nat_string.my_asset_key(v, new Nat(0)).equals(res[0]), "Invalid Value")
  });

  // tuple_nat_string
  it('tuple_nat_string', async () => {
    const v : [Nat, string] = [new Nat(2), "mystring"];
    await type_asset_only_key_2_tuple_nat_string.type_asset_only_key_2_tuple_nat_string.deploy({ as: alice });
    await type_asset_only_key_2_tuple_nat_string.type_asset_only_key_2_tuple_nat_string.asset_put(v, { as: alice });
    const res = await type_asset_only_key_2_tuple_nat_string.type_asset_only_key_2_tuple_nat_string.get_my_asset();
    assert(new type_asset_only_key_2_tuple_nat_string.my_asset_key(v, new Nat(0)).equals(res[0]), "Invalid Value")
  });

  // tuple_nat_string_bytes
  it('tuple_nat_string_bytes', async () => {
    const v : [Nat, string, Bytes] = [new Nat(2), "toto", new Bytes("ff")];
    await type_asset_only_key_2_tuple_nat_string_bytes.type_asset_only_key_2_tuple_nat_string_bytes.deploy({ as: alice });
    await type_asset_only_key_2_tuple_nat_string_bytes.type_asset_only_key_2_tuple_nat_string_bytes.asset_put(v, { as: alice });
    const res = await type_asset_only_key_2_tuple_nat_string_bytes.type_asset_only_key_2_tuple_nat_string_bytes.get_my_asset();
    assert(new type_asset_only_key_2_tuple_nat_string_bytes.my_asset_key(v, new Nat(0)).equals(res[0]), "Invalid Value")
  });

  // tuple_nat_string_bytes_bool
  it('tuple_nat_string_bytes_bool', async () => {
    const v : [Nat, string, Bytes, boolean] = [new Nat(2), "toto", new Bytes("ff"), true];
    await type_asset_only_key_2_tuple_nat_string_bytes_bool.type_asset_only_key_2_tuple_nat_string_bytes_bool.deploy({ as: alice });
    await type_asset_only_key_2_tuple_nat_string_bytes_bool.type_asset_only_key_2_tuple_nat_string_bytes_bool.asset_put(v, { as: alice });
    const res = await type_asset_only_key_2_tuple_nat_string_bytes_bool.type_asset_only_key_2_tuple_nat_string_bytes_bool.get_my_asset();
    assert(new type_asset_only_key_2_tuple_nat_string_bytes_bool.my_asset_key(v, new Nat(0)).equals(res[0]), "Invalid Value")
  });

  // tuple_nat_string_bytes_rev
  it('tuple_nat_string_bytes_rev', async () => {
    const v : [[Nat, string], Bytes] = [[new Nat(2), "toto"], new Bytes("ff")];
    await type_asset_only_key_2_tuple_nat_string_bytes_rev.type_asset_only_key_2_tuple_nat_string_bytes_rev.deploy({ as: alice });
    await type_asset_only_key_2_tuple_nat_string_bytes_rev.type_asset_only_key_2_tuple_nat_string_bytes_rev.asset_put(v, { as: alice });
    const res = await type_asset_only_key_2_tuple_nat_string_bytes_rev.type_asset_only_key_2_tuple_nat_string_bytes_rev.get_my_asset();
    assert(new type_asset_only_key_2_tuple_nat_string_bytes_rev.my_asset_key(v, new Nat(0)).equals(res[0]), "Invalid Value")
  });

  // tuple_nat_string_bytes_bool_rev
  it('tuple_nat_string_bytes_bool_rev', async () => {
    const v : [[[Nat, string], Bytes], boolean] = [[[new Nat(2), "toto"], new Bytes("ff")], true];
    await type_asset_only_key_2_tuple_nat_string_bytes_bool_rev.type_asset_only_key_2_tuple_nat_string_bytes_bool_rev.deploy({ as: alice });
    await type_asset_only_key_2_tuple_nat_string_bytes_bool_rev.type_asset_only_key_2_tuple_nat_string_bytes_bool_rev.asset_put(v, { as: alice });
    const res = await type_asset_only_key_2_tuple_nat_string_bytes_bool_rev.type_asset_only_key_2_tuple_nat_string_bytes_bool_rev.get_my_asset();
    assert(new type_asset_only_key_2_tuple_nat_string_bytes_bool_rev.my_asset_key(v, new Nat(0)).equals(res[0]), "Invalid Value")
  });

  // tuple_nat_string_bytes_bool_custom
  it('tuple_nat_string_bytes_bool_custom', async () => {
    const v : [Nat, [string, Bytes], boolean] = [new Nat(2), ["toto", new Bytes("ff")], true];
    await type_asset_only_key_2_tuple_nat_string_bytes_bool_custom.type_asset_only_key_2_tuple_nat_string_bytes_bool_custom.deploy({ as: alice });
    await type_asset_only_key_2_tuple_nat_string_bytes_bool_custom.type_asset_only_key_2_tuple_nat_string_bytes_bool_custom.asset_put(v, { as: alice });
    const res = await type_asset_only_key_2_tuple_nat_string_bytes_bool_custom.type_asset_only_key_2_tuple_nat_string_bytes_bool_custom.get_my_asset();
    assert(new type_asset_only_key_2_tuple_nat_string_bytes_bool_custom.my_asset_key(v, new Nat(0)).equals(res[0]), "Invalid Value")
  });

  // enum_simple
  it('enum_simple', async () => {
    const v : type_asset_only_key_2_enum_simple.e_enum = new type_asset_only_key_2_enum_simple.e_2();
    await type_asset_only_key_2_enum_simple.type_asset_only_key_2_enum_simple.deploy({ as: alice });
    await type_asset_only_key_2_enum_simple.type_asset_only_key_2_enum_simple.asset_put(v, { as: alice });
    const res = await type_asset_only_key_2_enum_simple.type_asset_only_key_2_enum_simple.get_my_asset();
    assert(new type_asset_only_key_2_enum_simple.my_asset_key(v, new Nat(0)).equals(res[0]), "Invalid Value")
  });

  // enum_param
  it('enum_param', async () => {
    const v : type_asset_only_key_2_enum_param.e_enum = new type_asset_only_key_2_enum_param.e_2(new Nat(2));
    await type_asset_only_key_2_enum_param.type_asset_only_key_2_enum_param.deploy({ as: alice });
    await type_asset_only_key_2_enum_param.type_asset_only_key_2_enum_param.asset_put(v, { as: alice });
    const res = await type_asset_only_key_2_enum_param.type_asset_only_key_2_enum_param.get_my_asset();
    assert(new type_asset_only_key_2_enum_param.my_asset_key(v, new Nat(0)).equals(res[0]), "Invalid Value")
  });

  // record_1_field
  it('record_1_field', async () => {
    const v : type_asset_only_key_2_record_1_field.r_record = new type_asset_only_key_2_record_1_field.r_record(new Nat(2));
    await type_asset_only_key_2_record_1_field.type_asset_only_key_2_record_1_field.deploy({ as: alice });
    await type_asset_only_key_2_record_1_field.type_asset_only_key_2_record_1_field.asset_put(v, { as: alice });
    const res = await type_asset_only_key_2_record_1_field.type_asset_only_key_2_record_1_field.get_my_asset();
    assert(new type_asset_only_key_2_record_1_field.my_asset_key(v, new Nat(0)).equals(res[0]), "Invalid Value")
  });

  // record_2_fields
  it('record_2_fields', async () => {
    const v : type_asset_only_key_2_record_2_fields.r_record = new type_asset_only_key_2_record_2_fields.r_record(new Nat(2), "mystr");
    await type_asset_only_key_2_record_2_fields.type_asset_only_key_2_record_2_fields.deploy({ as: alice });
    await type_asset_only_key_2_record_2_fields.type_asset_only_key_2_record_2_fields.asset_put(v, { as: alice });
    const res = await type_asset_only_key_2_record_2_fields.type_asset_only_key_2_record_2_fields.get_my_asset();
    assert(new type_asset_only_key_2_record_2_fields.my_asset_key(v, new Nat(0)).equals(res[0]), "Invalid Value")
  });

  // record_3_fields
  it('record_3_fields', async () => {
    const v : type_asset_only_key_2_record_3_fields.r_record = new type_asset_only_key_2_record_3_fields.r_record(new Nat(2), "mystr", new Bytes("02"));
    await type_asset_only_key_2_record_3_fields.type_asset_only_key_2_record_3_fields.deploy({ as: alice });
    await type_asset_only_key_2_record_3_fields.type_asset_only_key_2_record_3_fields.asset_put(v, { as: alice });
    const res = await type_asset_only_key_2_record_3_fields.type_asset_only_key_2_record_3_fields.get_my_asset();
    assert(new type_asset_only_key_2_record_3_fields.my_asset_key(v, new Nat(0)).equals(res[0]), "Invalid Value")
  });

  // record_4_fields
  it('record_4_fields', async () => {
    const v : type_asset_only_key_2_record_4_fields.r_record = new type_asset_only_key_2_record_4_fields.r_record(new Nat(2), "mystr", new Bytes("02"), true);
    await type_asset_only_key_2_record_4_fields.type_asset_only_key_2_record_4_fields.deploy({ as: alice });
    await type_asset_only_key_2_record_4_fields.type_asset_only_key_2_record_4_fields.asset_put(v, { as: alice });
    const res = await type_asset_only_key_2_record_4_fields.type_asset_only_key_2_record_4_fields.get_my_asset();
    assert(new type_asset_only_key_2_record_4_fields.my_asset_key(v, new Nat(0)).equals(res[0]), "Invalid Value")
  });

  // record_4_fields_custom
  it('record_4_fields_custom', async () => {
    const v : type_asset_only_key_2_record_4_fields_custom.r_record = new type_asset_only_key_2_record_4_fields_custom.r_record(new Nat(2), "mystr", new Bytes("02"), true);
    await type_asset_only_key_2_record_4_fields_custom.type_asset_only_key_2_record_4_fields_custom.deploy({ as: alice });
    await type_asset_only_key_2_record_4_fields_custom.type_asset_only_key_2_record_4_fields_custom.asset_put(v, { as: alice });
    const res = await type_asset_only_key_2_record_4_fields_custom.type_asset_only_key_2_record_4_fields_custom.get_my_asset();
    assert(new type_asset_only_key_2_record_4_fields_custom.my_asset_key(v, new Nat(0)).equals(res[0]), "Invalid Value")
  });

  
})
