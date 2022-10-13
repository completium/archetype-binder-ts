/* DO NOT EDIT, GENERATED FILE */
import { Address, Bls12_381_fr, Bls12_381_g1, Bls12_381_g2, Bytes, Chain_id, Chest, Chest_key, Duration, Int, Key, Key_hash, Nat, Rational, Option, Or, Sapling_transaction, Signature, Tez, Unit } from '@completium/archetype-ts-types';
import { get_account, set_mockup, set_quiet } from '@completium/experiment-ts';

import * as type_asset_key_1_address from './contracts/bindings/type_asset_key_1_address'
import * as type_asset_key_1_bool from './contracts/bindings/type_asset_key_1_bool'
import * as type_asset_key_1_bytes from './contracts/bindings/type_asset_key_1_bytes'
import * as type_asset_key_1_chain_id from './contracts/bindings/type_asset_key_1_chain_id'
import * as type_asset_key_1_date from './contracts/bindings/type_asset_key_1_date'
import * as type_asset_key_1_duration from './contracts/bindings/type_asset_key_1_duration'
import * as type_asset_key_1_int from './contracts/bindings/type_asset_key_1_int'
import * as type_asset_key_1_key from './contracts/bindings/type_asset_key_1_key'
import * as type_asset_key_1_key_hash from './contracts/bindings/type_asset_key_1_key_hash'
import * as type_asset_key_1_nat from './contracts/bindings/type_asset_key_1_nat'
import * as type_asset_key_1_rational from './contracts/bindings/type_asset_key_1_rational'
//import * as type_asset_key_1_signature from './contracts/bindings/type_asset_key_1_signature'
import * as type_asset_key_1_string from './contracts/bindings/type_asset_key_1_string'
import * as type_asset_key_1_tez from './contracts/bindings/type_asset_key_1_tez'
import * as type_asset_key_1_unit from './contracts/bindings/type_asset_key_1_unit'
import * as type_asset_key_1_option_nat from './contracts/bindings/type_asset_key_1_option_nat'
import * as type_asset_key_1_option_string from './contracts/bindings/type_asset_key_1_option_string'
import * as type_asset_key_1_option_bool from './contracts/bindings/type_asset_key_1_option_bool'
//import * as type_asset_key_1_or_nat_string from './contracts/bindings/type_asset_key_1_or_nat_string'
import * as type_asset_key_1_tuple_nat_string from './contracts/bindings/type_asset_key_1_tuple_nat_string'
import * as type_asset_key_1_tuple_nat_string_bytes from './contracts/bindings/type_asset_key_1_tuple_nat_string_bytes'
import * as type_asset_key_1_tuple_nat_string_bytes_bool from './contracts/bindings/type_asset_key_1_tuple_nat_string_bytes_bool'
import * as type_asset_key_1_tuple_nat_string_bytes_rev from './contracts/bindings/type_asset_key_1_tuple_nat_string_bytes_rev'
import * as type_asset_key_1_tuple_nat_string_bytes_bool_rev from './contracts/bindings/type_asset_key_1_tuple_nat_string_bytes_bool_rev'
import * as type_asset_key_1_tuple_nat_string_bytes_bool_custom from './contracts/bindings/type_asset_key_1_tuple_nat_string_bytes_bool_custom'
import * as type_asset_key_1_enum_simple from './contracts/bindings/type_asset_key_1_enum_simple'


const assert = require('assert')

const alice = get_account('alice')

/* Verbose mode ------------------------------------------------------------ */

set_quiet(true);

/* Endpoint ---------------------------------------------------------------- */

set_mockup()

/* Tests-------------------------------------------------------------------- */

describe('Type asset_key_1', async () => {
  // address
  it('address', async () => {
    const v : Address = new Address("tz1VSUr8wwNhLAzempoch5d6hLRiTh8Cjcjb");
    await type_asset_key_1_address.type_asset_key_1_address.deploy({ as: alice });
    await type_asset_key_1_address.type_asset_key_1_address.asset_put(v, { as: alice });
    const res = await type_asset_key_1_address.type_asset_key_1_address.get_my_asset();
    assert(1 == res.length && v.equals(res[0][0]), "Invalid Value")
  });

  // bool
  it('bool', async () => {
    const v : boolean = true;
    await type_asset_key_1_bool.type_asset_key_1_bool.deploy({ as: alice });
    await type_asset_key_1_bool.type_asset_key_1_bool.asset_put(v, { as: alice });
    const res = await type_asset_key_1_bool.type_asset_key_1_bool.get_my_asset();
    assert(1 == res.length && ((x : boolean, y : boolean) => {return x == y})(v, res[0][0]), "Invalid Value")
  });

  // bytes
  it('bytes', async () => {
    const v : Bytes = new Bytes("ff");
    await type_asset_key_1_bytes.type_asset_key_1_bytes.deploy({ as: alice });
    await type_asset_key_1_bytes.type_asset_key_1_bytes.asset_put(v, { as: alice });
    const res = await type_asset_key_1_bytes.type_asset_key_1_bytes.get_my_asset();
    assert(1 == res.length && v.equals(res[0][0]), "Invalid Value")
  });

  // chain_id
  it('chain_id', async () => {
    const v : Chain_id = new Chain_id("NetXdQprcVkpaWU");
    await type_asset_key_1_chain_id.type_asset_key_1_chain_id.deploy({ as: alice });
    await type_asset_key_1_chain_id.type_asset_key_1_chain_id.asset_put(v, { as: alice });
    const res = await type_asset_key_1_chain_id.type_asset_key_1_chain_id.get_my_asset();
    assert(1 == res.length && v.equals(res[0][0]), "Invalid Value")
  });

  // date
  it('date', async () => {
    const v : Date = new Date("2022-12-31");
    await type_asset_key_1_date.type_asset_key_1_date.deploy({ as: alice });
    await type_asset_key_1_date.type_asset_key_1_date.asset_put(v, { as: alice });
    const res = await type_asset_key_1_date.type_asset_key_1_date.get_my_asset();
    assert(1 == res.length && ((x : Date, y : Date) => {return x.toISOString() == y.toISOString()})(v, res[0][0]), "Invalid Value")
  });

  // duration
  it('duration', async () => {
    const v : Duration = new Duration("2m");
    await type_asset_key_1_duration.type_asset_key_1_duration.deploy({ as: alice });
    await type_asset_key_1_duration.type_asset_key_1_duration.asset_put(v, { as: alice });
    const res = await type_asset_key_1_duration.type_asset_key_1_duration.get_my_asset();
    assert(1 == res.length && v.equals(res[0][0]), "Invalid Value")
  });

  // int
  it('int', async () => {
    const v : Int = new Int(2);
    await type_asset_key_1_int.type_asset_key_1_int.deploy({ as: alice });
    await type_asset_key_1_int.type_asset_key_1_int.asset_put(v, { as: alice });
    const res = await type_asset_key_1_int.type_asset_key_1_int.get_my_asset();
    assert(1 == res.length && v.equals(res[0][0]), "Invalid Value")
  });

  // key
  it('key', async () => {
    const v : Key = alice.get_public_key();
    await type_asset_key_1_key.type_asset_key_1_key.deploy({ as: alice });
    await type_asset_key_1_key.type_asset_key_1_key.asset_put(v, { as: alice });
    const res = await type_asset_key_1_key.type_asset_key_1_key.get_my_asset();
    assert(1 == res.length && v.equals(res[0][0]), "Invalid Value")
  });

  // key_hash
  it('key_hash', async () => {
    const v : Key_hash = new Key_hash(alice.get_address().toString());
    await type_asset_key_1_key_hash.type_asset_key_1_key_hash.deploy({ as: alice });
    await type_asset_key_1_key_hash.type_asset_key_1_key_hash.asset_put(v, { as: alice });
    const res = await type_asset_key_1_key_hash.type_asset_key_1_key_hash.get_my_asset();
    assert(1 == res.length && v.equals(res[0][0]), "Invalid Value")
  });

  // nat
  it('nat', async () => {
    const v : Nat = new Nat(2);
    await type_asset_key_1_nat.type_asset_key_1_nat.deploy({ as: alice });
    await type_asset_key_1_nat.type_asset_key_1_nat.asset_put(v, { as: alice });
    const res = await type_asset_key_1_nat.type_asset_key_1_nat.get_my_asset();
    assert(1 == res.length && v.equals(res[0][0]), "Invalid Value")
  });

  // rational
  it('rational', async () => {
    const v : Rational = new Rational(1.5);
    await type_asset_key_1_rational.type_asset_key_1_rational.deploy({ as: alice });
    await type_asset_key_1_rational.type_asset_key_1_rational.asset_put(v, { as: alice });
    const res = await type_asset_key_1_rational.type_asset_key_1_rational.get_my_asset();
    assert(1 == res.length && v.equals(res[0][0]), "Invalid Value")
  });

  // signature
  /*it('signature', async () => {
    const v : Signature = new Signature("edsigtZ5u2yo1EfNLoxaPKafnmDZ6q1tjaP6deA7mX5dwx6GyPoN3Y3BfJv76jDcTAy9wsxkL1AQzFb4FvTWxLAtaXiS2dQg9gw");
    await type_asset_key_1_signature.type_asset_key_1_signature.deploy({ as: alice });
    await type_asset_key_1_signature.type_asset_key_1_signature.asset_put(v, { as: alice });
    const res = await type_asset_key_1_signature.type_asset_key_1_signature.get_my_asset();
    assert(1 == res.length && v.equals(res[0][0]), "Invalid Value")
  });*/

  // string
  it('string', async () => {
    const v : string = "mystr";
    await type_asset_key_1_string.type_asset_key_1_string.deploy({ as: alice });
    await type_asset_key_1_string.type_asset_key_1_string.asset_put(v, { as: alice });
    const res = await type_asset_key_1_string.type_asset_key_1_string.get_my_asset();
    assert(1 == res.length && ((x : string, y : string) => {return x == y})(v, res[0][0]), "Invalid Value")
  });

  // tez
  it('tez', async () => {
    const v : Tez = new Tez(2);
    await type_asset_key_1_tez.type_asset_key_1_tez.deploy({ as: alice });
    await type_asset_key_1_tez.type_asset_key_1_tez.asset_put(v, { as: alice });
    const res = await type_asset_key_1_tez.type_asset_key_1_tez.get_my_asset();
    assert(1 == res.length && v.equals(res[0][0]), "Invalid Value")
  });

  // unit
  it('unit', async () => {
    const v : Unit = new Unit();
    await type_asset_key_1_unit.type_asset_key_1_unit.deploy({ as: alice });
    await type_asset_key_1_unit.type_asset_key_1_unit.asset_put(v, { as: alice });
    const res = await type_asset_key_1_unit.type_asset_key_1_unit.get_my_asset();
    assert(1 == res.length && v.equals(res[0][0]), "Invalid Value")
  });

  // option_nat
  it('option_nat', async () => {
    const v : Option<Nat> = Option.Some(new Nat(2));
    await type_asset_key_1_option_nat.type_asset_key_1_option_nat.deploy({ as: alice });
    await type_asset_key_1_option_nat.type_asset_key_1_option_nat.asset_put(v, { as: alice });
    const res = await type_asset_key_1_option_nat.type_asset_key_1_option_nat.get_my_asset();
    assert(1 == res.length && v.equals(res[0][0]), "Invalid Value")
  });

  // option_string
  it('option_string', async () => {
    const v : Option<string> = Option.Some<string>("mystr");
    await type_asset_key_1_option_string.type_asset_key_1_option_string.deploy({ as: alice });
    await type_asset_key_1_option_string.type_asset_key_1_option_string.asset_put(v, { as: alice });
    const res = await type_asset_key_1_option_string.type_asset_key_1_option_string.get_my_asset();
    assert(1 == res.length && v.equals(res[0][0]), "Invalid Value")
  });

  // option_bool
  it('option_bool', async () => {
    const v : Option<boolean> = Option.Some<boolean>(true);
    await type_asset_key_1_option_bool.type_asset_key_1_option_bool.deploy({ as: alice });
    await type_asset_key_1_option_bool.type_asset_key_1_option_bool.asset_put(v, { as: alice });
    const res = await type_asset_key_1_option_bool.type_asset_key_1_option_bool.get_my_asset();
    assert(1 == res.length && v.equals(res[0][0]), "Invalid Value")
  });

  // or_nat_string
  /*it('or_nat_string', async () => {
    const v : Or<Nat, string> = Or.Left(new Nat(2));
    await type_asset_key_1_or_nat_string.type_asset_key_1_or_nat_string.deploy({ as: alice });
    await type_asset_key_1_or_nat_string.type_asset_key_1_or_nat_string.asset_put(v, { as: alice });
    const res = await type_asset_key_1_or_nat_string.type_asset_key_1_or_nat_string.get_my_asset();
    assert(1 == res.length && v.equals(res[0][0]), "Invalid Value")
  });*/

  // tuple_nat_string
  it('tuple_nat_string', async () => {
    const v : [Nat, string] = [new Nat(2), "mystring"];
    await type_asset_key_1_tuple_nat_string.type_asset_key_1_tuple_nat_string.deploy({ as: alice });
    await type_asset_key_1_tuple_nat_string.type_asset_key_1_tuple_nat_string.asset_put(v, { as: alice });
    const res = await type_asset_key_1_tuple_nat_string.type_asset_key_1_tuple_nat_string.get_my_asset();
    assert(1 == res.length && ((x : [Nat, string], y : [Nat, string]) => {return x[0].equals(y[0]) && x[1] == y[1]})(v, res[0][0]), "Invalid Value")
  });

  // tuple_nat_string_bytes
  it('tuple_nat_string_bytes', async () => {
    const v : [Nat, string, Bytes] = [new Nat(2), "toto", new Bytes("ff")];
    await type_asset_key_1_tuple_nat_string_bytes.type_asset_key_1_tuple_nat_string_bytes.deploy({ as: alice });
    await type_asset_key_1_tuple_nat_string_bytes.type_asset_key_1_tuple_nat_string_bytes.asset_put(v, { as: alice });
    const res = await type_asset_key_1_tuple_nat_string_bytes.type_asset_key_1_tuple_nat_string_bytes.get_my_asset();
    assert(1 == res.length && ((x : [Nat, string, Bytes], y : [Nat, string, Bytes]) => {return x[0].equals(y[0]) && x[1] == y[1] && x[2].equals(y[2])})(v, res[0][0]), "Invalid Value")
  });

  // tuple_nat_string_bytes_bool
  it('tuple_nat_string_bytes_bool', async () => {
    const v : [Nat, string, Bytes, boolean] = [new Nat(2), "toto", new Bytes("ff"), true];
    await type_asset_key_1_tuple_nat_string_bytes_bool.type_asset_key_1_tuple_nat_string_bytes_bool.deploy({ as: alice });
    await type_asset_key_1_tuple_nat_string_bytes_bool.type_asset_key_1_tuple_nat_string_bytes_bool.asset_put(v, { as: alice });
    const res = await type_asset_key_1_tuple_nat_string_bytes_bool.type_asset_key_1_tuple_nat_string_bytes_bool.get_my_asset();
    assert(1 == res.length && ((x : [Nat, string, Bytes, boolean], y : [Nat, string, Bytes, boolean]) => {return x[0].equals(y[0]) && x[1] == y[1] && x[2].equals(y[2]) && x[3] == y[3]})(v, res[0][0]), "Invalid Value")
  });

  // tuple_nat_string_bytes_rev
  it('tuple_nat_string_bytes_rev', async () => {
    const v : [[Nat, string], Bytes] = [[new Nat(2), "toto"], new Bytes("ff")];
    await type_asset_key_1_tuple_nat_string_bytes_rev.type_asset_key_1_tuple_nat_string_bytes_rev.deploy({ as: alice });
    await type_asset_key_1_tuple_nat_string_bytes_rev.type_asset_key_1_tuple_nat_string_bytes_rev.asset_put(v, { as: alice });
    const res = await type_asset_key_1_tuple_nat_string_bytes_rev.type_asset_key_1_tuple_nat_string_bytes_rev.get_my_asset();
    assert(1 == res.length && ((x : [[Nat, string], Bytes], y : [[Nat, string], Bytes]) => {return x[0][0].equals(y[0][0]) && x[0][1] == y[0][1] && x[1].equals(y[1])})(v, res[0][0]), "Invalid Value")
  });

  // tuple_nat_string_bytes_bool_rev
  it('tuple_nat_string_bytes_bool_rev', async () => {
    const v : [[[Nat, string], Bytes], boolean] = [[[new Nat(2), "toto"], new Bytes("ff")], true];
    await type_asset_key_1_tuple_nat_string_bytes_bool_rev.type_asset_key_1_tuple_nat_string_bytes_bool_rev.deploy({ as: alice });
    await type_asset_key_1_tuple_nat_string_bytes_bool_rev.type_asset_key_1_tuple_nat_string_bytes_bool_rev.asset_put(v, { as: alice });
    const res = await type_asset_key_1_tuple_nat_string_bytes_bool_rev.type_asset_key_1_tuple_nat_string_bytes_bool_rev.get_my_asset();
    assert(1 == res.length && ((x : [[[Nat, string], Bytes], boolean], y : [[[Nat, string], Bytes], boolean]) => {return x[0][0][0].equals(y[0][0][0]) && x[0][0][1] == y[0][0][1] && x[0][1].equals(y[0][1]) && x[1] == y[1]})(v, res[0][0]), "Invalid Value")
  });

  // tuple_nat_string_bytes_bool_custom
  it('tuple_nat_string_bytes_bool_custom', async () => {
    const v : [Nat, [string, Bytes], boolean] = [new Nat(2), ["toto", new Bytes("ff")], true];
    await type_asset_key_1_tuple_nat_string_bytes_bool_custom.type_asset_key_1_tuple_nat_string_bytes_bool_custom.deploy({ as: alice });
    await type_asset_key_1_tuple_nat_string_bytes_bool_custom.type_asset_key_1_tuple_nat_string_bytes_bool_custom.asset_put(v, { as: alice });
    const res = await type_asset_key_1_tuple_nat_string_bytes_bool_custom.type_asset_key_1_tuple_nat_string_bytes_bool_custom.get_my_asset();
    assert(1 == res.length && ((x : [Nat, [string, Bytes], boolean], y : [Nat, [string, Bytes], boolean]) => {return x[0].equals(y[0]) && x[1][0] == y[1][0] && x[1][1].equals(y[1][1]) && x[2] == y[2]})(v, res[0][0]), "Invalid Value")
  });

  // enum_simple
  it('enum_simple', async () => {
    const v : type_asset_key_1_enum_simple.enum_simple = new type_asset_key_1_enum_simple.e_2();
    await type_asset_key_1_enum_simple.type_asset_key_1_enum_simple.deploy({ as: alice });
    await type_asset_key_1_enum_simple.type_asset_key_1_enum_simple.asset_put(v, { as: alice });
    const res = await type_asset_key_1_enum_simple.type_asset_key_1_enum_simple.get_my_asset();
    assert(1 == res.length && ((x : type_asset_key_1_enum_simple.enum_simple, y : type_asset_key_1_enum_simple.enum_simple) => {return x.toString() == y.toString()})(v, res[0][0]), "Invalid Value")
  });

  
})
