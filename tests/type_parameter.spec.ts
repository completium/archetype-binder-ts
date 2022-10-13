/* DO NOT EDIT, GENERATED FILE */
import { Address, Bls12_381_fr, Bls12_381_g1, Bls12_381_g2, Bytes, Chain_id, Chest, Chest_key, Duration, Int, Key, Key_hash, Nat, Rational, Option, Or, Sapling_transaction, Signature, Tez, Unit } from '@completium/archetype-ts-types';
import { get_account, set_mockup, set_quiet } from '@completium/experiment-ts';

import * as type_parameter_address from './contracts/bindings/type_parameter_address'
import * as type_parameter_bls12_381_fr from './contracts/bindings/type_parameter_bls12_381_fr'
import * as type_parameter_bls12_381_g1 from './contracts/bindings/type_parameter_bls12_381_g1'
import * as type_parameter_bls12_381_g2 from './contracts/bindings/type_parameter_bls12_381_g2'
import * as type_parameter_bool from './contracts/bindings/type_parameter_bool'
import * as type_parameter_bytes from './contracts/bindings/type_parameter_bytes'
import * as type_parameter_chain_id from './contracts/bindings/type_parameter_chain_id'
//import * as type_parameter_chest from './contracts/bindings/type_parameter_chest'
//import * as type_parameter_chest_key from './contracts/bindings/type_parameter_chest_key'
import * as type_parameter_date from './contracts/bindings/type_parameter_date'
import * as type_parameter_duration from './contracts/bindings/type_parameter_duration'
import * as type_parameter_int from './contracts/bindings/type_parameter_int'
import * as type_parameter_key from './contracts/bindings/type_parameter_key'
import * as type_parameter_key_hash from './contracts/bindings/type_parameter_key_hash'
import * as type_parameter_nat from './contracts/bindings/type_parameter_nat'
import * as type_parameter_rational from './contracts/bindings/type_parameter_rational'
//import * as type_parameter_sapling_transaction from './contracts/bindings/type_parameter_sapling_transaction'
import * as type_parameter_signature from './contracts/bindings/type_parameter_signature'
import * as type_parameter_string from './contracts/bindings/type_parameter_string'
import * as type_parameter_tez from './contracts/bindings/type_parameter_tez'
import * as type_parameter_unit from './contracts/bindings/type_parameter_unit'
import * as type_parameter_list_nat from './contracts/bindings/type_parameter_list_nat'
import * as type_parameter_list_string from './contracts/bindings/type_parameter_list_string'
import * as type_parameter_list_bool from './contracts/bindings/type_parameter_list_bool'
import * as type_parameter_map_nat_string from './contracts/bindings/type_parameter_map_nat_string'
import * as type_parameter_option_nat from './contracts/bindings/type_parameter_option_nat'
import * as type_parameter_option_string from './contracts/bindings/type_parameter_option_string'
import * as type_parameter_option_bool from './contracts/bindings/type_parameter_option_bool'
import * as type_parameter_or_nat_string from './contracts/bindings/type_parameter_or_nat_string'
import * as type_parameter_set_nat from './contracts/bindings/type_parameter_set_nat'
import * as type_parameter_set_string from './contracts/bindings/type_parameter_set_string'
import * as type_parameter_set_bool from './contracts/bindings/type_parameter_set_bool'
import * as type_parameter_tuple_nat_string from './contracts/bindings/type_parameter_tuple_nat_string'
import * as type_parameter_tuple_nat_string_bytes from './contracts/bindings/type_parameter_tuple_nat_string_bytes'
import * as type_parameter_tuple_nat_string_bytes_bool from './contracts/bindings/type_parameter_tuple_nat_string_bytes_bool'
import * as type_parameter_tuple_nat_string_bytes_rev from './contracts/bindings/type_parameter_tuple_nat_string_bytes_rev'
import * as type_parameter_tuple_nat_string_bytes_bool_rev from './contracts/bindings/type_parameter_tuple_nat_string_bytes_bool_rev'
import * as type_parameter_tuple_nat_string_bytes_bool_custom from './contracts/bindings/type_parameter_tuple_nat_string_bytes_bool_custom'
import * as type_parameter_enum_simple from './contracts/bindings/type_parameter_enum_simple'
import * as type_parameter_record_2_fields from './contracts/bindings/type_parameter_record_2_fields'
import * as type_parameter_record_3_fields from './contracts/bindings/type_parameter_record_3_fields'
import * as type_parameter_record_4_fields from './contracts/bindings/type_parameter_record_4_fields'
import * as type_parameter_record_4_fields_custom from './contracts/bindings/type_parameter_record_4_fields_custom'


const assert = require('assert')

const alice = get_account('alice')

/* Verbose mode ------------------------------------------------------------ */

set_quiet(true);

/* Endpoint ---------------------------------------------------------------- */

set_mockup()

/* Tests-------------------------------------------------------------------- */

describe('Type parameter', async () => {
  // address
  it('address', async () => {
    const v : Address = new Address("tz1VSUr8wwNhLAzempoch5d6hLRiTh8Cjcjb");
    await type_parameter_address.type_parameter_address.deploy(v, { as: alice });
    const res = await type_parameter_address.type_parameter_address.get_res();
    assert(v.equals(res), "Invalid Value")
  });

  // bls12_381_fr
  it('bls12_381_fr', async () => {
    const v : Bls12_381_fr = new Bls12_381_fr("0200000000000000000000000000000000000000000000000000000000000000");
    await type_parameter_bls12_381_fr.type_parameter_bls12_381_fr.deploy(v, { as: alice });
    const res = await type_parameter_bls12_381_fr.type_parameter_bls12_381_fr.get_res();
    assert(v.equals(res), "Invalid Value")
  });

  // bls12_381_g1
  it('bls12_381_g1', async () => {
    const v : Bls12_381_g1 = new Bls12_381_g1("063bd6e11e2fcaac1dd8cf68c6b1925a73c3c583e298ed37c41c3715115cf96358a42dbe85a0228cbfd8a6c8a8c54cd015b5ae2860d1cc47f84698d951f14d9448d03f04df2ca0ffe609a2067d6f1a892163a5e05e541279134cae52b1f23c6b");
    await type_parameter_bls12_381_g1.type_parameter_bls12_381_g1.deploy(v, { as: alice });
    const res = await type_parameter_bls12_381_g1.type_parameter_bls12_381_g1.get_res();
    assert(v.equals(res), "Invalid Value")
  });

  // bls12_381_g2
  it('bls12_381_g2', async () => {
    const v : Bls12_381_g2 = new Bls12_381_g2("10c6d5cdca84fc3c7f33061add256f48e0ab03a697832b338901898b650419eb6f334b28153fb73ad2ecd1cd2ac67053161e9f46cfbdaf7b1132a4654a55162850249650f9b873ac3113fa8c02ef1cd1df481480a4457f351d28f4da89d19fa405c3d77f686dc9a24d2681c9184bf2b091f62e6b24df651a3da8bd7067e14e7908fb02f8955b84af5081614cb5bc49b416d9edf914fc608c441b3f2eb8b6043736ddb9d4e4d62334a23b5625c14ef3e1a7e99258386310221b22d83a5eac035c");
    await type_parameter_bls12_381_g2.type_parameter_bls12_381_g2.deploy(v, { as: alice });
    const res = await type_parameter_bls12_381_g2.type_parameter_bls12_381_g2.get_res();
    assert(v.equals(res), "Invalid Value")
  });

  // bool
  it('bool', async () => {
    const v : boolean = true;
    await type_parameter_bool.type_parameter_bool.deploy(v, { as: alice });
    const res = await type_parameter_bool.type_parameter_bool.get_res();
    assert(((x : boolean, y : boolean) => {return x == y})(v, res), "Invalid Value")
  });

  // bytes
  it('bytes', async () => {
    const v : Bytes = new Bytes("ff");
    await type_parameter_bytes.type_parameter_bytes.deploy(v, { as: alice });
    const res = await type_parameter_bytes.type_parameter_bytes.get_res();
    assert(v.equals(res), "Invalid Value")
  });

  // chain_id
  it('chain_id', async () => {
    const v : Chain_id = new Chain_id("NetXdQprcVkpaWU");
    await type_parameter_chain_id.type_parameter_chain_id.deploy(v, { as: alice });
    const res = await type_parameter_chain_id.type_parameter_chain_id.get_res();
    assert(v.equals(res), "Invalid Value")
  });

  // chest
  /*it('chest', async () => {
    const v : Chest = new Chest("c5ecdde89eb8c1e7aaeb85abb8f5e5cef3b4fa80c4aee2fccbf0a78ce0debaa5e9ddede3ddfbd9abdea28cc7dc99e6d3a9baf3cbae9adaaabc89cbc39e97e2c7a6cba99197d19ba09ddfd181afc997ffbcc5acb2d29ecbb698c2cacbdd83d1b4ced0bffe9cd78295b3fba4d9f9d5f4d4ec9ad3c7e1a8eeb9dba5cbd8a2dbf29af8e4a4c1e4b1edacf98fccefaef9fea4f0bacdd38ecbfe81c3f9839b9e9ab8fbf5f1eabac48a9f8ca7c588eefe94d1f18bd9bcee9aecde8dd285cf9098f4e1a7eec787f3a0e0ff9cd0ce8ec5a2a4e5ecb08fce899eb5baa397fabf90de9397cebc81bbdfb386e6b4da9fd8fdd19ed9f8d684c782b0aacfeebae4f6e7d1c5c1e6a093c68081cf83b991b4ecd7b38aee92deddcad79eb9abe0a0a0c6b5909dc58495f69445fff5ae9cefe8b8beb2fb86ccf5c9ad91989bdad8a3cfbedaffa2de8bf19dc6ac8cbc8a9584fa9f85f9ba958fc6bbc09ac8e7d5f0fdb98b86c1c7d59ad7c6dfc2d2cefaf5d9db909bf0e3acd3ccc792bc9bccbab4a4febda9b685dbc39ea2a4a7b69990d3abd8b9b3d7dbc581b984f3e08a98f7f7f0e697cc8dfd88edc8c3ca8dc3b2a9ccf6cdd6d0efcc848bc8ead5858bbabfcfc1c8ecea84fd9b96a5e4eabb8c918dafe6f78d83e8e1c2e5f8ee88a4ee8dcaeeafffebfcbbfda1e9eb86c582f2eedd9299cbc0a7fce083ced8c8ddb0e7eaacb696c1fccdadcdc8e3c6f7b9de84eece9bb7919094fef4fdf6efd8b1ba8bbecb9380add4f59ddbf9a19f95facc84e9d0a99bfa93f1fcc3a0fbde9b9ce0c7e8dec6e8d1dfa7dda6f490bb9580abfdbcc0e202e5ff731c3c17d080ee430edd30979a47aa653656e11e593800000015c2ca2a23b732a72932611618ad9ea324986377591e");
    await type_parameter_chest.type_parameter_chest.deploy(v, { as: alice });
    const res = await type_parameter_chest.type_parameter_chest.get_res();
    assert(v.equals(res), "Invalid Value")
  });*/

  // chest_key
  /*it('chest_key', async () => {
    const v : Chest_key = new Chest_key("0xa0aceddfb3c9fbe1b8c382c7d5a7dedbe2e5adf9edcfc3e9d084caa6aeb9818ff1e985cb9efe8fa089ceeaa0f5d0bcb583e2f29196f2d3908fffffdcda868faffcb78fb697e7eaf3e7dca9d4b5dda2c3e4f8adf8abf484ecae85f7d6e0f2d28cb69af1d7b19082e8d8d7ba96e7e1e0bb8ac9b9fcf0a9e5b7c1a499c4faf4c8a3a9c8e4d09aa780eac6cee1b78a97a3e983abf9a5f1e8d2a2a2b5e3bcb8c4effeb7a3a68a85a497cd91c9a2c096c3f596deb8d1aca3a5aff28effb8cfc9c7ced892e3a7c09deeb8c8ec9387a3b384b5c8bccaafc7a9a2c1cfd8c7becfd7d6828a9af8f4988fe4ead3b59ecfb8ff8cabf8be90d4c8bdbddfce9cd7c2bb81edc4b7ad80a59a978f8c9debe7aaf08cf0c588f3eaade6b9f4e4e6edf1ed9c9988e48d9ba0aa8f01d18bac92b886db9dd798b5f6fdc891a28da2c4c48da1918897a2b7c2dfa0b78ab8e291b68fb1a2bfa5e8b88e9cabb0b5b0feabcffc9cfeee888ac4afeed9dc8bf5a4eaa9ae89a3838cf6cfd4f8acff8fa7aef7a9889fbbc7d8f6dde4edf3e58096e580e299e5b082b9cf85f3fe8ac6c0998eb1bcbab9bfb8fba39faea7bce0f6fed9ea86dfdad58cf7cbc7fcc4ecf7e2e898d3b19582e38c8092b7e4a0cddc83eb8bc38d91fefed6be869496b8e4fc99d5fae5c6a2b2dcabe2a4ea85b68b87b182d7e8cac29fe0b9efd6d0eb999ffa98aaaf9bf09fe7c4b39d81db97e4e7bbaef0e3bfedd69d9089bc8d91b292afa6c8b389fc9fb7aaa8decab6d9b493a6eafaa5baffe8fb85f2d483ecd1f2d1e58f938df9d8d5e385fe96c5f58ae1e0b09bf2b3c2931f");
    await type_parameter_chest_key.type_parameter_chest_key.deploy(v, { as: alice });
    const res = await type_parameter_chest_key.type_parameter_chest_key.get_res();
    assert(v.equals(res), "Invalid Value")
  });*/

  // date
  it('date', async () => {
    const v : Date = new Date("2022-12-31");
    await type_parameter_date.type_parameter_date.deploy(v, { as: alice });
    const res = await type_parameter_date.type_parameter_date.get_res();
    assert(((x : Date, y : Date) => {return x.toISOString() == y.toISOString()})(v, res), "Invalid Value")
  });

  // duration
  it('duration', async () => {
    const v : Duration = new Duration("2m");
    await type_parameter_duration.type_parameter_duration.deploy(v, { as: alice });
    const res = await type_parameter_duration.type_parameter_duration.get_res();
    assert(v.equals(res), "Invalid Value")
  });

  // int
  it('int', async () => {
    const v : Int = new Int(2);
    await type_parameter_int.type_parameter_int.deploy(v, { as: alice });
    const res = await type_parameter_int.type_parameter_int.get_res();
    assert(v.equals(res), "Invalid Value")
  });

  // key
  it('key', async () => {
    const v : Key = alice.get_public_key();
    await type_parameter_key.type_parameter_key.deploy(v, { as: alice });
    const res = await type_parameter_key.type_parameter_key.get_res();
    assert(v.equals(res), "Invalid Value")
  });

  // key_hash
  it('key_hash', async () => {
    const v : Key_hash = new Key_hash(alice.get_address().toString());
    await type_parameter_key_hash.type_parameter_key_hash.deploy(v, { as: alice });
    const res = await type_parameter_key_hash.type_parameter_key_hash.get_res();
    assert(v.equals(res), "Invalid Value")
  });

  // nat
  it('nat', async () => {
    const v : Nat = new Nat(2);
    await type_parameter_nat.type_parameter_nat.deploy(v, { as: alice });
    const res = await type_parameter_nat.type_parameter_nat.get_res();
    assert(v.equals(res), "Invalid Value")
  });

  // rational
  it('rational', async () => {
    const v : Rational = new Rational(1.5);
    await type_parameter_rational.type_parameter_rational.deploy(v, { as: alice });
    const res = await type_parameter_rational.type_parameter_rational.get_res();
    assert(v.equals(res), "Invalid Value")
  });

  // sapling_transaction
  /*it('sapling_transaction', async () => {
    const v : Sapling_transaction = new Sapling_transaction("00000000000001f3849b5eba6e22354dbbccf076d39d63ab59d091f44bed6deb71a319cc10afed24a34ffaa403d7e58766dc6c5e0364a3d1a47e7286d87855544b8a9a4f04d6e1a6f80dba30932a82bb68fce3299aeed3ee9422d1330cffefed109dd0b753263470bea78799ee3f3cbb26a08c5dd8310ae8af66feb33950c45c67b7439e8c41e7941457b941e9ea3157105b860f9424eb210b4de663cd1239f692315049f789d367552c929f6b2aa4f0d01f2384ad1cc2daa5c4cd0731245506b614f67e7bd102ee0b639501c39b7028766fb469a99d3cd3754207098a1daec24645419514e76cbc29173e49d5d16e7aa43cd96acb77054aa333078b407987c4afdd42160bc5f585ba60296a8c1a1e48b7070c1d7106afdf6bf32c688d153b3871a784c354a779560000004f544b45fe787256593b593dcf8e54e9d57c15f86ad6ebc17c3ff65d5e7e6f216283ab4af840848b9a6928f3d65156fd10bef74b06366de141f906f94b48c9f0d0af5da81ee00177b8760cb6b99f74db3951eede8ad2be0b2f7aee18486431a9a1a439c639cacb0f6ebf7834e7c772d8cfa98ec7c844298f59107b5933c8876eeca7368bb9b0efb82b35e3acf6c0f6a1a7db98f3cd1c4e93f865dd654b393425d04a78e0a72529511e961025ba5e41d83a56825ab4db8809c7e9589959453608b4db6e1ce0ffa0077237bd3477007cc972642977b926d3d0d4f690550fbb543193ab31bf2c2ddf7c2a946fae1c62253dafaf25b87cbc18107469630b9f2cd0657cfdf4a6fff5d9f04bc1a50e43613900ffffffffff676980fbc2f4300c01f0b7820d00e3347c8da4ee614674376cbc45359daa54f9b5493e00000000");
    await type_parameter_sapling_transaction.type_parameter_sapling_transaction.deploy(v, { as: alice });
    const res = await type_parameter_sapling_transaction.type_parameter_sapling_transaction.get_res();
    assert(v.equals(res), "Invalid Value")
  });*/

  // signature
  it('signature', async () => {
    const v : Signature = new Signature("edsigtZ5u2yo1EfNLoxaPKafnmDZ6q1tjaP6deA7mX5dwx6GyPoN3Y3BfJv76jDcTAy9wsxkL1AQzFb4FvTWxLAtaXiS2dQg9gw");
    await type_parameter_signature.type_parameter_signature.deploy(v, { as: alice });
    const res = await type_parameter_signature.type_parameter_signature.get_res();
    assert(v.equals(res), "Invalid Value")
  });

  // string
  it('string', async () => {
    const v : string = "mystr";
    await type_parameter_string.type_parameter_string.deploy(v, { as: alice });
    const res = await type_parameter_string.type_parameter_string.get_res();
    assert(((x : string, y : string) => {return x == y})(v, res), "Invalid Value")
  });

  // tez
  it('tez', async () => {
    const v : Tez = new Tez(2);
    await type_parameter_tez.type_parameter_tez.deploy(v, { as: alice });
    const res = await type_parameter_tez.type_parameter_tez.get_res();
    assert(v.equals(res), "Invalid Value")
  });

  // unit
  it('unit', async () => {
    const v : Unit = new Unit();
    await type_parameter_unit.type_parameter_unit.deploy(v, { as: alice });
    const res = await type_parameter_unit.type_parameter_unit.get_res();
    assert(v.equals(res), "Invalid Value")
  });

  // list_nat
  it('list_nat', async () => {
    const v : Array<Nat> = [new Nat(1), new Nat(2), new Nat(3)];
    await type_parameter_list_nat.type_parameter_list_nat.deploy(v, { as: alice });
    const res = await type_parameter_list_nat.type_parameter_list_nat.get_res();
    assert(((x : Array<Nat>, y : Array<Nat>) => {return x.length == y.length && x[0].equals(y[0]) && x[1].equals(y[1]) && x[2].equals(y[2])})(v, res), "Invalid Value")
  });

  // list_string
  it('list_string', async () => {
    const v : Array<string> = ["a", "b", "c", "d"];
    await type_parameter_list_string.type_parameter_list_string.deploy(v, { as: alice });
    const res = await type_parameter_list_string.type_parameter_list_string.get_res();
    assert(((x : Array<string>, y : Array<string>) => {return x.length == y.length && x[0] == y[0] && x[1] == y[1] && x[2] == y[2] && x[3] == y[3]})(v, res), "Invalid Value")
  });

  // list_bool
  it('list_bool', async () => {
    const v : Array<boolean> = [true, false, true, true];
    await type_parameter_list_bool.type_parameter_list_bool.deploy(v, { as: alice });
    const res = await type_parameter_list_bool.type_parameter_list_bool.get_res();
    assert(((x : Array<boolean>, y : Array<boolean>) => {return x.length == y.length && x[0] == y[0] && x[1] == y[1] && x[2] == y[2] && x[3] == y[3]})(v, res), "Invalid Value")
  });

  // map_nat_string
  it('map_nat_string', async () => {
    const v : Array<[Nat, string]> = [[new Nat(0), "mystr"]];
    await type_parameter_map_nat_string.type_parameter_map_nat_string.deploy(v, { as: alice });
    const res = await type_parameter_map_nat_string.type_parameter_map_nat_string.get_res();
    assert(((x : Array<[Nat, string]>, y : Array<[Nat, string]>) => {return x.length == y.length && x[0][0].equals(y[0][0]) && x[0][1] == y[0][1]})(v, res), "Invalid Value")
  });

  // option_nat
  it('option_nat', async () => {
    const v : Option<Nat> = Option.Some(new Nat(2));
    await type_parameter_option_nat.type_parameter_option_nat.deploy(v, { as: alice });
    const res = await type_parameter_option_nat.type_parameter_option_nat.get_res();
    assert(v.equals(res), "Invalid Value")
  });

  // option_string
  it('option_string', async () => {
    const v : Option<string> = Option.Some<string>("mystr");
    await type_parameter_option_string.type_parameter_option_string.deploy(v, { as: alice });
    const res = await type_parameter_option_string.type_parameter_option_string.get_res();
    assert(v.equals(res), "Invalid Value")
  });

  // option_bool
  it('option_bool', async () => {
    const v : Option<boolean> = Option.Some<boolean>(true);
    await type_parameter_option_bool.type_parameter_option_bool.deploy(v, { as: alice });
    const res = await type_parameter_option_bool.type_parameter_option_bool.get_res();
    assert(v.equals(res), "Invalid Value")
  });

  // or_nat_string
  it('or_nat_string', async () => {
    const v : Or<Nat, string> = Or.Left(new Nat(2));
    await type_parameter_or_nat_string.type_parameter_or_nat_string.deploy(v, { as: alice });
    const res = await type_parameter_or_nat_string.type_parameter_or_nat_string.get_res();
    assert(v.equals(res), "Invalid Value")
  });

  // set_nat
  it('set_nat', async () => {
    const v : Array<Nat> = [new Nat(2)];
    await type_parameter_set_nat.type_parameter_set_nat.deploy(v, { as: alice });
    const res = await type_parameter_set_nat.type_parameter_set_nat.get_res();
    assert(((x : Array<Nat>, y : Array<Nat>) => {return x.length == y.length && x[0].equals(y[0])})(v, res), "Invalid Value")
  });

  // set_string
  it('set_string', async () => {
    const v : Array<string> = ["a", "b"];
    await type_parameter_set_string.type_parameter_set_string.deploy(v, { as: alice });
    const res = await type_parameter_set_string.type_parameter_set_string.get_res();
    assert(((x : Array<string>, y : Array<string>) => {return x.length == y.length && x[0] == y[0] && x[1] == y[1]})(v, res), "Invalid Value")
  });

  // set_bool
  it('set_bool', async () => {
    const v : Array<boolean> = [false, true];
    await type_parameter_set_bool.type_parameter_set_bool.deploy(v, { as: alice });
    const res = await type_parameter_set_bool.type_parameter_set_bool.get_res();
    assert(((x : Array<boolean>, y : Array<boolean>) => {return x.length == y.length && x[0] == y[0] && x[1] == y[1]})(v, res), "Invalid Value")
  });

  // tuple_nat_string
  it('tuple_nat_string', async () => {
    const v : [Nat, string] = [new Nat(2), "mystring"];
    await type_parameter_tuple_nat_string.type_parameter_tuple_nat_string.deploy(v, { as: alice });
    const res = await type_parameter_tuple_nat_string.type_parameter_tuple_nat_string.get_res();
    assert(((x : [Nat, string], y : [Nat, string]) => {return x[0].equals(y[0]) && x[1] == y[1]})(v, res), "Invalid Value")
  });

  // tuple_nat_string_bytes
  it('tuple_nat_string_bytes', async () => {
    const v : [Nat, string, Bytes] = [new Nat(2), "toto", new Bytes("ff")];
    await type_parameter_tuple_nat_string_bytes.type_parameter_tuple_nat_string_bytes.deploy(v, { as: alice });
    const res = await type_parameter_tuple_nat_string_bytes.type_parameter_tuple_nat_string_bytes.get_res();
    assert(((x : [Nat, string, Bytes], y : [Nat, string, Bytes]) => {return x[0].equals(y[0]) && x[1] == y[1] && x[2].equals(y[2])})(v, res), "Invalid Value")
  });

  // tuple_nat_string_bytes_bool
  it('tuple_nat_string_bytes_bool', async () => {
    const v : [Nat, string, Bytes, boolean] = [new Nat(2), "toto", new Bytes("ff"), true];
    await type_parameter_tuple_nat_string_bytes_bool.type_parameter_tuple_nat_string_bytes_bool.deploy(v, { as: alice });
    const res = await type_parameter_tuple_nat_string_bytes_bool.type_parameter_tuple_nat_string_bytes_bool.get_res();
    assert(((x : [Nat, string, Bytes, boolean], y : [Nat, string, Bytes, boolean]) => {return x[0].equals(y[0]) && x[1] == y[1] && x[2].equals(y[2]) && x[3] == y[3]})(v, res), "Invalid Value")
  });

  // tuple_nat_string_bytes_rev
  it('tuple_nat_string_bytes_rev', async () => {
    const v : [[Nat, string], Bytes] = [[new Nat(2), "toto"], new Bytes("ff")];
    await type_parameter_tuple_nat_string_bytes_rev.type_parameter_tuple_nat_string_bytes_rev.deploy(v, { as: alice });
    const res = await type_parameter_tuple_nat_string_bytes_rev.type_parameter_tuple_nat_string_bytes_rev.get_res();
    assert(((x : [[Nat, string], Bytes], y : [[Nat, string], Bytes]) => {return x[0][0].equals(y[0][0]) && x[0][1] == y[0][1] && x[1].equals(y[1])})(v, res), "Invalid Value")
  });

  // tuple_nat_string_bytes_bool_rev
  it('tuple_nat_string_bytes_bool_rev', async () => {
    const v : [[[Nat, string], Bytes], boolean] = [[[new Nat(2), "toto"], new Bytes("ff")], true];
    await type_parameter_tuple_nat_string_bytes_bool_rev.type_parameter_tuple_nat_string_bytes_bool_rev.deploy(v, { as: alice });
    const res = await type_parameter_tuple_nat_string_bytes_bool_rev.type_parameter_tuple_nat_string_bytes_bool_rev.get_res();
    assert(((x : [[[Nat, string], Bytes], boolean], y : [[[Nat, string], Bytes], boolean]) => {return x[0][0][0].equals(y[0][0][0]) && x[0][0][1] == y[0][0][1] && x[0][1].equals(y[0][1]) && x[1] == y[1]})(v, res), "Invalid Value")
  });

  // tuple_nat_string_bytes_bool_custom
  it('tuple_nat_string_bytes_bool_custom', async () => {
    const v : [Nat, [string, Bytes], boolean] = [new Nat(2), ["toto", new Bytes("ff")], true];
    await type_parameter_tuple_nat_string_bytes_bool_custom.type_parameter_tuple_nat_string_bytes_bool_custom.deploy(v, { as: alice });
    const res = await type_parameter_tuple_nat_string_bytes_bool_custom.type_parameter_tuple_nat_string_bytes_bool_custom.get_res();
    assert(((x : [Nat, [string, Bytes], boolean], y : [Nat, [string, Bytes], boolean]) => {return x[0].equals(y[0]) && x[1][0] == y[1][0] && x[1][1].equals(y[1][1]) && x[2] == y[2]})(v, res), "Invalid Value")
  });

  // enum_simple
  it('enum_simple', async () => {
    const v : type_parameter_enum_simple.e_enum = new type_parameter_enum_simple.e_2();
    await type_parameter_enum_simple.type_parameter_enum_simple.deploy(v, { as: alice });
    const res = await type_parameter_enum_simple.type_parameter_enum_simple.get_res();
    assert(((x : type_parameter_enum_simple.e_enum, y : type_parameter_enum_simple.e_enum) => {return x.toString() == y.toString()})(v, res), "Invalid Value")
  });

  // record_2_fields
  it('record_2_fields', async () => {
    const v : type_parameter_record_2_fields.r_record = new type_parameter_record_2_fields.r_record(new Nat(2), "mystr");
    await type_parameter_record_2_fields.type_parameter_record_2_fields.deploy(v, { as: alice });
    const res = await type_parameter_record_2_fields.type_parameter_record_2_fields.get_res();
    assert(v.equals(res), "Invalid Value")
  });

  // record_3_fields
  it('record_3_fields', async () => {
    const v : type_parameter_record_3_fields.r_record = new type_parameter_record_3_fields.r_record(new Nat(2), "mystr", new Bytes("02"));
    await type_parameter_record_3_fields.type_parameter_record_3_fields.deploy(v, { as: alice });
    const res = await type_parameter_record_3_fields.type_parameter_record_3_fields.get_res();
    assert(v.equals(res), "Invalid Value")
  });

  // record_4_fields
  it('record_4_fields', async () => {
    const v : type_parameter_record_4_fields.r_record = new type_parameter_record_4_fields.r_record(new Nat(2), "mystr", new Bytes("02"), true);
    await type_parameter_record_4_fields.type_parameter_record_4_fields.deploy(v, { as: alice });
    const res = await type_parameter_record_4_fields.type_parameter_record_4_fields.get_res();
    assert(v.equals(res), "Invalid Value")
  });

  // record_4_fields_custom
  it('record_4_fields_custom', async () => {
    const v : type_parameter_record_4_fields_custom.r_record = new type_parameter_record_4_fields_custom.r_record(new Nat(2), "mystr", new Bytes("02"), true);
    await type_parameter_record_4_fields_custom.type_parameter_record_4_fields_custom.deploy(v, { as: alice });
    const res = await type_parameter_record_4_fields_custom.type_parameter_record_4_fields_custom.get_res();
    assert(v.equals(res), "Invalid Value")
  });

  
})
