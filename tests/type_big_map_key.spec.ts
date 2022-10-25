/* eslint-disable @typescript-eslint/no-inferrable-types */
  /* DO NOT EDIT, GENERATED FILE */
import { Address, Bls12_381_fr, Bls12_381_g1, Bls12_381_g2, Bytes, Chain_id, Chest, Chest_key, Duration, Int, Key, Key_hash, Nat, Rational, Option, Or, Sapling_transaction, Signature, Tez, Unit } from '@completium/archetype-ts-types';
import { get_account, set_mockup, set_quiet } from '@completium/experiment-ts';

import * as type_big_map_key_address from './contracts/bindings/type_big_map_key_address'
import * as type_big_map_key_bool from './contracts/bindings/type_big_map_key_bool'
import * as type_big_map_key_bytes from './contracts/bindings/type_big_map_key_bytes'
import * as type_big_map_key_chain_id from './contracts/bindings/type_big_map_key_chain_id'
import * as type_big_map_key_date from './contracts/bindings/type_big_map_key_date'
import * as type_big_map_key_duration from './contracts/bindings/type_big_map_key_duration'
import * as type_big_map_key_int from './contracts/bindings/type_big_map_key_int'
import * as type_big_map_key_key from './contracts/bindings/type_big_map_key_key'
import * as type_big_map_key_key_hash from './contracts/bindings/type_big_map_key_key_hash'
import * as type_big_map_key_nat from './contracts/bindings/type_big_map_key_nat'
import * as type_big_map_key_rational from './contracts/bindings/type_big_map_key_rational'
import * as type_big_map_key_signature from './contracts/bindings/type_big_map_key_signature'
import * as type_big_map_key_string from './contracts/bindings/type_big_map_key_string'
import * as type_big_map_key_tez from './contracts/bindings/type_big_map_key_tez'
import * as type_big_map_key_unit from './contracts/bindings/type_big_map_key_unit'
import * as type_big_map_key_option_nat from './contracts/bindings/type_big_map_key_option_nat'
import * as type_big_map_key_option_string from './contracts/bindings/type_big_map_key_option_string'
import * as type_big_map_key_option_bool from './contracts/bindings/type_big_map_key_option_bool'
import * as type_big_map_key_or_nat_string from './contracts/bindings/type_big_map_key_or_nat_string'
import * as type_big_map_key_tuple_nat_string from './contracts/bindings/type_big_map_key_tuple_nat_string'
import * as type_big_map_key_tuple_nat_string_bytes from './contracts/bindings/type_big_map_key_tuple_nat_string_bytes'
import * as type_big_map_key_tuple_nat_string_bytes_bool from './contracts/bindings/type_big_map_key_tuple_nat_string_bytes_bool'
import * as type_big_map_key_tuple_nat_string_bytes_rev from './contracts/bindings/type_big_map_key_tuple_nat_string_bytes_rev'
import * as type_big_map_key_tuple_nat_string_bytes_bool_rev from './contracts/bindings/type_big_map_key_tuple_nat_string_bytes_bool_rev'
import * as type_big_map_key_tuple_nat_string_bytes_bool_custom from './contracts/bindings/type_big_map_key_tuple_nat_string_bytes_bool_custom'
import * as type_big_map_key_enum_simple from './contracts/bindings/type_big_map_key_enum_simple'
import * as type_big_map_key_record_1_field from './contracts/bindings/type_big_map_key_record_1_field'
import * as type_big_map_key_record_2_fields from './contracts/bindings/type_big_map_key_record_2_fields'
import * as type_big_map_key_record_3_fields from './contracts/bindings/type_big_map_key_record_3_fields'
import * as type_big_map_key_record_4_fields from './contracts/bindings/type_big_map_key_record_4_fields'
import * as type_big_map_key_record_4_fields_custom from './contracts/bindings/type_big_map_key_record_4_fields_custom'


import assert from 'assert'

const alice = get_account('alice')

/* Verbose mode ------------------------------------------------------------ */

set_quiet(true);

/* Endpoint ---------------------------------------------------------------- */

set_mockup()

/* Tests-------------------------------------------------------------------- */

describe('Type big_map_key', () => {
  // address
  it('address', async () => {
    const v : Address = new Address("tz1VSUr8wwNhLAzempoch5d6hLRiTh8Cjcjb");
    await type_big_map_key_address.type_big_map_key_address.deploy({ as: alice });
    await type_big_map_key_address.type_big_map_key_address.set_value(v, { as: alice });
    const res = await type_big_map_key_address.type_big_map_key_address.get_res_value(v);
    assert(res?.equals(new Nat(0)), "Invalid Value")
    const c = await type_big_map_key_address.type_big_map_key_address.has_res_value(v);
    assert(c, "Invalid Value")
  });

  // bool
  it('bool', async () => {
    const v : boolean = true;
    await type_big_map_key_bool.type_big_map_key_bool.deploy({ as: alice });
    await type_big_map_key_bool.type_big_map_key_bool.set_value(v, { as: alice });
    const res = await type_big_map_key_bool.type_big_map_key_bool.get_res_value(v);
    assert(res?.equals(new Nat(0)), "Invalid Value")
    const c = await type_big_map_key_bool.type_big_map_key_bool.has_res_value(v);
    assert(c, "Invalid Value")
  });

  // bytes
  it('bytes', async () => {
    const v : Bytes = new Bytes("ff");
    await type_big_map_key_bytes.type_big_map_key_bytes.deploy({ as: alice });
    await type_big_map_key_bytes.type_big_map_key_bytes.set_value(v, { as: alice });
    const res = await type_big_map_key_bytes.type_big_map_key_bytes.get_res_value(v);
    assert(res?.equals(new Nat(0)), "Invalid Value")
    const c = await type_big_map_key_bytes.type_big_map_key_bytes.has_res_value(v);
    assert(c, "Invalid Value")
  });

  // chain_id
  it('chain_id', async () => {
    const v : Chain_id = new Chain_id("NetXdQprcVkpaWU");
    await type_big_map_key_chain_id.type_big_map_key_chain_id.deploy({ as: alice });
    await type_big_map_key_chain_id.type_big_map_key_chain_id.set_value(v, { as: alice });
    const res = await type_big_map_key_chain_id.type_big_map_key_chain_id.get_res_value(v);
    assert(res?.equals(new Nat(0)), "Invalid Value")
    const c = await type_big_map_key_chain_id.type_big_map_key_chain_id.has_res_value(v);
    assert(c, "Invalid Value")
  });

  // date
  it('date', async () => {
    const v : Date = new Date("2022-12-31");
    await type_big_map_key_date.type_big_map_key_date.deploy({ as: alice });
    await type_big_map_key_date.type_big_map_key_date.set_value(v, { as: alice });
    const res = await type_big_map_key_date.type_big_map_key_date.get_res_value(v);
    assert(res?.equals(new Nat(0)), "Invalid Value")
    const c = await type_big_map_key_date.type_big_map_key_date.has_res_value(v);
    assert(c, "Invalid Value")
  });

  // duration
  it('duration', async () => {
    const v : Duration = new Duration("2m");
    await type_big_map_key_duration.type_big_map_key_duration.deploy({ as: alice });
    await type_big_map_key_duration.type_big_map_key_duration.set_value(v, { as: alice });
    const res = await type_big_map_key_duration.type_big_map_key_duration.get_res_value(v);
    assert(res?.equals(new Nat(0)), "Invalid Value")
    const c = await type_big_map_key_duration.type_big_map_key_duration.has_res_value(v);
    assert(c, "Invalid Value")
  });

  // int
  it('int', async () => {
    const v : Int = new Int(2);
    await type_big_map_key_int.type_big_map_key_int.deploy({ as: alice });
    await type_big_map_key_int.type_big_map_key_int.set_value(v, { as: alice });
    const res = await type_big_map_key_int.type_big_map_key_int.get_res_value(v);
    assert(res?.equals(new Nat(0)), "Invalid Value")
    const c = await type_big_map_key_int.type_big_map_key_int.has_res_value(v);
    assert(c, "Invalid Value")
  });

  // key
  it('key', async () => {
    const v : Key = alice.get_public_key();
    await type_big_map_key_key.type_big_map_key_key.deploy({ as: alice });
    await type_big_map_key_key.type_big_map_key_key.set_value(v, { as: alice });
    const res = await type_big_map_key_key.type_big_map_key_key.get_res_value(v);
    assert(res?.equals(new Nat(0)), "Invalid Value")
    const c = await type_big_map_key_key.type_big_map_key_key.has_res_value(v);
    assert(c, "Invalid Value")
  });

  // key_hash
  it('key_hash', async () => {
    const v : Key_hash = new Key_hash(alice.get_address().toString());
    await type_big_map_key_key_hash.type_big_map_key_key_hash.deploy({ as: alice });
    await type_big_map_key_key_hash.type_big_map_key_key_hash.set_value(v, { as: alice });
    const res = await type_big_map_key_key_hash.type_big_map_key_key_hash.get_res_value(v);
    assert(res?.equals(new Nat(0)), "Invalid Value")
    const c = await type_big_map_key_key_hash.type_big_map_key_key_hash.has_res_value(v);
    assert(c, "Invalid Value")
  });

  // nat
  it('nat', async () => {
    const v : Nat = new Nat(2);
    await type_big_map_key_nat.type_big_map_key_nat.deploy({ as: alice });
    await type_big_map_key_nat.type_big_map_key_nat.set_value(v, { as: alice });
    const res = await type_big_map_key_nat.type_big_map_key_nat.get_res_value(v);
    assert(res?.equals(new Nat(0)), "Invalid Value")
    const c = await type_big_map_key_nat.type_big_map_key_nat.has_res_value(v);
    assert(c, "Invalid Value")
  });

  // rational
  it('rational', async () => {
    const v : Rational = new Rational(1.5);
    await type_big_map_key_rational.type_big_map_key_rational.deploy({ as: alice });
    await type_big_map_key_rational.type_big_map_key_rational.set_value(v, { as: alice });
    const res = await type_big_map_key_rational.type_big_map_key_rational.get_res_value(v);
    assert(res?.equals(new Nat(0)), "Invalid Value")
    const c = await type_big_map_key_rational.type_big_map_key_rational.has_res_value(v);
    assert(c, "Invalid Value")
  });

  // signature
  it('signature', async () => {
    const v : Signature = new Signature("sigPGRuva6xjBJkmb6BYpbovGb4BoobkE3GUN2njdxwkG25yRT39GaDrsBgczf5VybSRGi5eddQy6VBfUkg2YcLfMvgg8Uk1");
    await type_big_map_key_signature.type_big_map_key_signature.deploy({ as: alice });
    await type_big_map_key_signature.type_big_map_key_signature.set_value(v, { as: alice });
    const res = await type_big_map_key_signature.type_big_map_key_signature.get_res_value(v);
    assert(res?.equals(new Nat(0)), "Invalid Value")
    const c = await type_big_map_key_signature.type_big_map_key_signature.has_res_value(v);
    assert(c, "Invalid Value")
  });

  // string
  it('string', async () => {
    const v : string = "mystr";
    await type_big_map_key_string.type_big_map_key_string.deploy({ as: alice });
    await type_big_map_key_string.type_big_map_key_string.set_value(v, { as: alice });
    const res = await type_big_map_key_string.type_big_map_key_string.get_res_value(v);
    assert(res?.equals(new Nat(0)), "Invalid Value")
    const c = await type_big_map_key_string.type_big_map_key_string.has_res_value(v);
    assert(c, "Invalid Value")
  });

  // tez
  it('tez', async () => {
    const v : Tez = new Tez(2);
    await type_big_map_key_tez.type_big_map_key_tez.deploy({ as: alice });
    await type_big_map_key_tez.type_big_map_key_tez.set_value(v, { as: alice });
    const res = await type_big_map_key_tez.type_big_map_key_tez.get_res_value(v);
    assert(res?.equals(new Nat(0)), "Invalid Value")
    const c = await type_big_map_key_tez.type_big_map_key_tez.has_res_value(v);
    assert(c, "Invalid Value")
  });

  // unit
  it('unit', async () => {
    const v : Unit = new Unit();
    await type_big_map_key_unit.type_big_map_key_unit.deploy({ as: alice });
    await type_big_map_key_unit.type_big_map_key_unit.set_value(v, { as: alice });
    const res = await type_big_map_key_unit.type_big_map_key_unit.get_res_value(v);
    assert(res?.equals(new Nat(0)), "Invalid Value")
    const c = await type_big_map_key_unit.type_big_map_key_unit.has_res_value(v);
    assert(c, "Invalid Value")
  });

  // option_nat
  it('option_nat', async () => {
    const v : Option<Nat> = Option.Some(new Nat(2));
    await type_big_map_key_option_nat.type_big_map_key_option_nat.deploy({ as: alice });
    await type_big_map_key_option_nat.type_big_map_key_option_nat.set_value(v, { as: alice });
    const res = await type_big_map_key_option_nat.type_big_map_key_option_nat.get_res_value(v);
    assert(res?.equals(new Nat(0)), "Invalid Value")
    const c = await type_big_map_key_option_nat.type_big_map_key_option_nat.has_res_value(v);
    assert(c, "Invalid Value")
  });

  // option_string
  it('option_string', async () => {
    const v : Option<string> = Option.Some<string>("mystr");
    await type_big_map_key_option_string.type_big_map_key_option_string.deploy({ as: alice });
    await type_big_map_key_option_string.type_big_map_key_option_string.set_value(v, { as: alice });
    const res = await type_big_map_key_option_string.type_big_map_key_option_string.get_res_value(v);
    assert(res?.equals(new Nat(0)), "Invalid Value")
    const c = await type_big_map_key_option_string.type_big_map_key_option_string.has_res_value(v);
    assert(c, "Invalid Value")
  });

  // option_bool
  it('option_bool', async () => {
    const v : Option<boolean> = Option.Some<boolean>(true);
    await type_big_map_key_option_bool.type_big_map_key_option_bool.deploy({ as: alice });
    await type_big_map_key_option_bool.type_big_map_key_option_bool.set_value(v, { as: alice });
    const res = await type_big_map_key_option_bool.type_big_map_key_option_bool.get_res_value(v);
    assert(res?.equals(new Nat(0)), "Invalid Value")
    const c = await type_big_map_key_option_bool.type_big_map_key_option_bool.has_res_value(v);
    assert(c, "Invalid Value")
  });

  // or_nat_string
  it('or_nat_string', async () => {
    const v : Or<Nat, string> = Or.Left(new Nat(2));
    await type_big_map_key_or_nat_string.type_big_map_key_or_nat_string.deploy({ as: alice });
    await type_big_map_key_or_nat_string.type_big_map_key_or_nat_string.set_value(v, { as: alice });
    const res = await type_big_map_key_or_nat_string.type_big_map_key_or_nat_string.get_res_value(v);
    assert(res?.equals(new Nat(0)), "Invalid Value")
    const c = await type_big_map_key_or_nat_string.type_big_map_key_or_nat_string.has_res_value(v);
    assert(c, "Invalid Value")
  });

  // tuple_nat_string
  it('tuple_nat_string', async () => {
    const v : [Nat, string] = [new Nat(2), "mystring"];
    await type_big_map_key_tuple_nat_string.type_big_map_key_tuple_nat_string.deploy({ as: alice });
    await type_big_map_key_tuple_nat_string.type_big_map_key_tuple_nat_string.set_value(v, { as: alice });
    const res = await type_big_map_key_tuple_nat_string.type_big_map_key_tuple_nat_string.get_res_value(v);
    assert(res?.equals(new Nat(0)), "Invalid Value")
    const c = await type_big_map_key_tuple_nat_string.type_big_map_key_tuple_nat_string.has_res_value(v);
    assert(c, "Invalid Value")
  });

  // tuple_nat_string_bytes
  it('tuple_nat_string_bytes', async () => {
    const v : [Nat, string, Bytes] = [new Nat(2), "toto", new Bytes("ff")];
    await type_big_map_key_tuple_nat_string_bytes.type_big_map_key_tuple_nat_string_bytes.deploy({ as: alice });
    await type_big_map_key_tuple_nat_string_bytes.type_big_map_key_tuple_nat_string_bytes.set_value(v, { as: alice });
    const res = await type_big_map_key_tuple_nat_string_bytes.type_big_map_key_tuple_nat_string_bytes.get_res_value(v);
    assert(res?.equals(new Nat(0)), "Invalid Value")
    const c = await type_big_map_key_tuple_nat_string_bytes.type_big_map_key_tuple_nat_string_bytes.has_res_value(v);
    assert(c, "Invalid Value")
  });

  // tuple_nat_string_bytes_bool
  it('tuple_nat_string_bytes_bool', async () => {
    const v : [Nat, string, Bytes, boolean] = [new Nat(2), "toto", new Bytes("ff"), true];
    await type_big_map_key_tuple_nat_string_bytes_bool.type_big_map_key_tuple_nat_string_bytes_bool.deploy({ as: alice });
    await type_big_map_key_tuple_nat_string_bytes_bool.type_big_map_key_tuple_nat_string_bytes_bool.set_value(v, { as: alice });
    const res = await type_big_map_key_tuple_nat_string_bytes_bool.type_big_map_key_tuple_nat_string_bytes_bool.get_res_value(v);
    assert(res?.equals(new Nat(0)), "Invalid Value")
    const c = await type_big_map_key_tuple_nat_string_bytes_bool.type_big_map_key_tuple_nat_string_bytes_bool.has_res_value(v);
    assert(c, "Invalid Value")
  });

  // tuple_nat_string_bytes_rev
  it('tuple_nat_string_bytes_rev', async () => {
    const v : [[Nat, string], Bytes] = [[new Nat(2), "toto"], new Bytes("ff")];
    await type_big_map_key_tuple_nat_string_bytes_rev.type_big_map_key_tuple_nat_string_bytes_rev.deploy({ as: alice });
    await type_big_map_key_tuple_nat_string_bytes_rev.type_big_map_key_tuple_nat_string_bytes_rev.set_value(v, { as: alice });
    const res = await type_big_map_key_tuple_nat_string_bytes_rev.type_big_map_key_tuple_nat_string_bytes_rev.get_res_value(v);
    assert(res?.equals(new Nat(0)), "Invalid Value")
    const c = await type_big_map_key_tuple_nat_string_bytes_rev.type_big_map_key_tuple_nat_string_bytes_rev.has_res_value(v);
    assert(c, "Invalid Value")
  });

  // tuple_nat_string_bytes_bool_rev
  it('tuple_nat_string_bytes_bool_rev', async () => {
    const v : [[[Nat, string], Bytes], boolean] = [[[new Nat(2), "toto"], new Bytes("ff")], true];
    await type_big_map_key_tuple_nat_string_bytes_bool_rev.type_big_map_key_tuple_nat_string_bytes_bool_rev.deploy({ as: alice });
    await type_big_map_key_tuple_nat_string_bytes_bool_rev.type_big_map_key_tuple_nat_string_bytes_bool_rev.set_value(v, { as: alice });
    const res = await type_big_map_key_tuple_nat_string_bytes_bool_rev.type_big_map_key_tuple_nat_string_bytes_bool_rev.get_res_value(v);
    assert(res?.equals(new Nat(0)), "Invalid Value")
    const c = await type_big_map_key_tuple_nat_string_bytes_bool_rev.type_big_map_key_tuple_nat_string_bytes_bool_rev.has_res_value(v);
    assert(c, "Invalid Value")
  });

  // tuple_nat_string_bytes_bool_custom
  it('tuple_nat_string_bytes_bool_custom', async () => {
    const v : [Nat, [string, Bytes], boolean] = [new Nat(2), ["toto", new Bytes("ff")], true];
    await type_big_map_key_tuple_nat_string_bytes_bool_custom.type_big_map_key_tuple_nat_string_bytes_bool_custom.deploy({ as: alice });
    await type_big_map_key_tuple_nat_string_bytes_bool_custom.type_big_map_key_tuple_nat_string_bytes_bool_custom.set_value(v, { as: alice });
    const res = await type_big_map_key_tuple_nat_string_bytes_bool_custom.type_big_map_key_tuple_nat_string_bytes_bool_custom.get_res_value(v);
    assert(res?.equals(new Nat(0)), "Invalid Value")
    const c = await type_big_map_key_tuple_nat_string_bytes_bool_custom.type_big_map_key_tuple_nat_string_bytes_bool_custom.has_res_value(v);
    assert(c, "Invalid Value")
  });

  // enum_simple
  it('enum_simple', async () => {
    const v : type_big_map_key_enum_simple.e_enum = new type_big_map_key_enum_simple.e_2();
    await type_big_map_key_enum_simple.type_big_map_key_enum_simple.deploy({ as: alice });
    await type_big_map_key_enum_simple.type_big_map_key_enum_simple.set_value(v, { as: alice });
    const res = await type_big_map_key_enum_simple.type_big_map_key_enum_simple.get_res_value(v);
    assert(res?.equals(new Nat(0)), "Invalid Value")
    const c = await type_big_map_key_enum_simple.type_big_map_key_enum_simple.has_res_value(v);
    assert(c, "Invalid Value")
  });

  // record_1_field
  it('record_1_field', async () => {
    const v : type_big_map_key_record_1_field.r_record = new Nat(2);
    await type_big_map_key_record_1_field.type_big_map_key_record_1_field.deploy({ as: alice });
    await type_big_map_key_record_1_field.type_big_map_key_record_1_field.set_value(v, { as: alice });
    const res = await type_big_map_key_record_1_field.type_big_map_key_record_1_field.get_res_value(v);
    assert(res?.equals(new Nat(0)), "Invalid Value")
    const c = await type_big_map_key_record_1_field.type_big_map_key_record_1_field.has_res_value(v);
    assert(c, "Invalid Value")
  });

  // record_2_fields
  it('record_2_fields', async () => {
    const v : type_big_map_key_record_2_fields.r_record = new type_big_map_key_record_2_fields.r_record(new Nat(2), "mystr");
    await type_big_map_key_record_2_fields.type_big_map_key_record_2_fields.deploy({ as: alice });
    await type_big_map_key_record_2_fields.type_big_map_key_record_2_fields.set_value(v, { as: alice });
    const res = await type_big_map_key_record_2_fields.type_big_map_key_record_2_fields.get_res_value(v);
    assert(res?.equals(new Nat(0)), "Invalid Value")
    const c = await type_big_map_key_record_2_fields.type_big_map_key_record_2_fields.has_res_value(v);
    assert(c, "Invalid Value")
  });

  // record_3_fields
  it('record_3_fields', async () => {
    const v : type_big_map_key_record_3_fields.r_record = new type_big_map_key_record_3_fields.r_record(new Nat(2), "mystr", new Bytes("02"));
    await type_big_map_key_record_3_fields.type_big_map_key_record_3_fields.deploy({ as: alice });
    await type_big_map_key_record_3_fields.type_big_map_key_record_3_fields.set_value(v, { as: alice });
    const res = await type_big_map_key_record_3_fields.type_big_map_key_record_3_fields.get_res_value(v);
    assert(res?.equals(new Nat(0)), "Invalid Value")
    const c = await type_big_map_key_record_3_fields.type_big_map_key_record_3_fields.has_res_value(v);
    assert(c, "Invalid Value")
  });

  // record_4_fields
  it('record_4_fields', async () => {
    const v : type_big_map_key_record_4_fields.r_record = new type_big_map_key_record_4_fields.r_record(new Nat(2), "mystr", new Bytes("02"), true);
    await type_big_map_key_record_4_fields.type_big_map_key_record_4_fields.deploy({ as: alice });
    await type_big_map_key_record_4_fields.type_big_map_key_record_4_fields.set_value(v, { as: alice });
    const res = await type_big_map_key_record_4_fields.type_big_map_key_record_4_fields.get_res_value(v);
    assert(res?.equals(new Nat(0)), "Invalid Value")
    const c = await type_big_map_key_record_4_fields.type_big_map_key_record_4_fields.has_res_value(v);
    assert(c, "Invalid Value")
  });

  // record_4_fields_custom
  it('record_4_fields_custom', async () => {
    const v : type_big_map_key_record_4_fields_custom.r_record = new type_big_map_key_record_4_fields_custom.r_record(new Nat(2), "mystr", new Bytes("02"), true);
    await type_big_map_key_record_4_fields_custom.type_big_map_key_record_4_fields_custom.deploy({ as: alice });
    await type_big_map_key_record_4_fields_custom.type_big_map_key_record_4_fields_custom.set_value(v, { as: alice });
    const res = await type_big_map_key_record_4_fields_custom.type_big_map_key_record_4_fields_custom.get_res_value(v);
    assert(res?.equals(new Nat(0)), "Invalid Value")
    const c = await type_big_map_key_record_4_fields_custom.type_big_map_key_record_4_fields_custom.has_res_value(v);
    assert(c, "Invalid Value")
  });

  
})
