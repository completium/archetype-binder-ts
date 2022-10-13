/* DO NOT EDIT, GENERATED FILE */
import { Address, Bls12_381_fr, Bls12_381_g1, Bls12_381_g2, Bytes, Chain_id, Chest, Chest_key, Duration, Int, Key, Key_hash, Nat, Rational, Option, Or, Sapling_transaction, Signature, Tez, Unit } from '@completium/archetype-ts-types';
import { get_account, set_mockup, set_quiet } from '@completium/experiment-ts';

import * as type_record_address from './contracts/bindings/type_record_address'
import * as type_record_bls12_381_fr from './contracts/bindings/type_record_bls12_381_fr'
import * as type_record_bls12_381_g1 from './contracts/bindings/type_record_bls12_381_g1'
import * as type_record_bls12_381_g2 from './contracts/bindings/type_record_bls12_381_g2'
import * as type_record_bool from './contracts/bindings/type_record_bool'
import * as type_record_bytes from './contracts/bindings/type_record_bytes'
import * as type_record_chain_id from './contracts/bindings/type_record_chain_id'
//import * as type_record_chest from './contracts/bindings/type_record_chest'
//import * as type_record_chest_key from './contracts/bindings/type_record_chest_key'
import * as type_record_date from './contracts/bindings/type_record_date'
import * as type_record_duration from './contracts/bindings/type_record_duration'
import * as type_record_int from './contracts/bindings/type_record_int'
import * as type_record_key from './contracts/bindings/type_record_key'
import * as type_record_key_hash from './contracts/bindings/type_record_key_hash'
import * as type_record_nat from './contracts/bindings/type_record_nat'
import * as type_record_rational from './contracts/bindings/type_record_rational'
//import * as type_record_sapling_transaction from './contracts/bindings/type_record_sapling_transaction'
//import * as type_record_signature from './contracts/bindings/type_record_signature'
import * as type_record_string from './contracts/bindings/type_record_string'
import * as type_record_tez from './contracts/bindings/type_record_tez'
import * as type_record_unit from './contracts/bindings/type_record_unit'
import * as type_record_list_nat from './contracts/bindings/type_record_list_nat'
import * as type_record_list_string from './contracts/bindings/type_record_list_string'
import * as type_record_list_bool from './contracts/bindings/type_record_list_bool'
import * as type_record_map_nat_string from './contracts/bindings/type_record_map_nat_string'
import * as type_record_option_nat from './contracts/bindings/type_record_option_nat'
import * as type_record_option_string from './contracts/bindings/type_record_option_string'
import * as type_record_option_bool from './contracts/bindings/type_record_option_bool'
//import * as type_record_or_nat_string from './contracts/bindings/type_record_or_nat_string'
import * as type_record_set_nat from './contracts/bindings/type_record_set_nat'
import * as type_record_set_string from './contracts/bindings/type_record_set_string'
import * as type_record_set_bool from './contracts/bindings/type_record_set_bool'
import * as type_record_tuple_nat_string from './contracts/bindings/type_record_tuple_nat_string'
import * as type_record_tuple_nat_string_bytes from './contracts/bindings/type_record_tuple_nat_string_bytes'
import * as type_record_tuple_nat_string_bytes_bool from './contracts/bindings/type_record_tuple_nat_string_bytes_bool'
import * as type_record_tuple_nat_string_bytes_rev from './contracts/bindings/type_record_tuple_nat_string_bytes_rev'
import * as type_record_tuple_nat_string_bytes_bool_rev from './contracts/bindings/type_record_tuple_nat_string_bytes_bool_rev'
import * as type_record_tuple_nat_string_bytes_bool_custom from './contracts/bindings/type_record_tuple_nat_string_bytes_bool_custom'
import * as type_record_enum_simple from './contracts/bindings/type_record_enum_simple'


const assert = require('assert')

const alice = get_account('alice')

/* Verbose mode ------------------------------------------------------------ */

set_quiet(true);

/* Endpoint ---------------------------------------------------------------- */

set_mockup()

/* Tests-------------------------------------------------------------------- */

describe('Type record', async () => {
  // address
  it('address', async () => {
    const v : type_record_address.my_record = new type_record_address.my_record(new Nat(2), new Address("tz1VSUr8wwNhLAzempoch5d6hLRiTh8Cjcjb"), "mystr");
    await type_record_address.type_record_address.deploy({ as: alice });
    await type_record_address.type_record_address.set_value(v, { as: alice });
    const res = await type_record_address.type_record_address.get_res();
    assert(v.equals(res), "Invalid Value")
  });

  // bls12_381_fr
  it('bls12_381_fr', async () => {
    const v : type_record_bls12_381_fr.my_record = new type_record_bls12_381_fr.my_record(new Nat(2), new Bls12_381_fr("0200000000000000000000000000000000000000000000000000000000000000"), "mystr");
    await type_record_bls12_381_fr.type_record_bls12_381_fr.deploy({ as: alice });
    await type_record_bls12_381_fr.type_record_bls12_381_fr.set_value(v, { as: alice });
    const res = await type_record_bls12_381_fr.type_record_bls12_381_fr.get_res();
    assert(v.equals(res), "Invalid Value")
  });

  // bls12_381_g1
  it('bls12_381_g1', async () => {
    const v : type_record_bls12_381_g1.my_record = new type_record_bls12_381_g1.my_record(new Nat(2), new Bls12_381_g1("063bd6e11e2fcaac1dd8cf68c6b1925a73c3c583e298ed37c41c3715115cf96358a42dbe85a0228cbfd8a6c8a8c54cd015b5ae2860d1cc47f84698d951f14d9448d03f04df2ca0ffe609a2067d6f1a892163a5e05e541279134cae52b1f23c6b"), "mystr");
    await type_record_bls12_381_g1.type_record_bls12_381_g1.deploy({ as: alice });
    await type_record_bls12_381_g1.type_record_bls12_381_g1.set_value(v, { as: alice });
    const res = await type_record_bls12_381_g1.type_record_bls12_381_g1.get_res();
    assert(v.equals(res), "Invalid Value")
  });

  // bls12_381_g2
  it('bls12_381_g2', async () => {
    const v : type_record_bls12_381_g2.my_record = new type_record_bls12_381_g2.my_record(new Nat(2), new Bls12_381_g2("10c6d5cdca84fc3c7f33061add256f48e0ab03a697832b338901898b650419eb6f334b28153fb73ad2ecd1cd2ac67053161e9f46cfbdaf7b1132a4654a55162850249650f9b873ac3113fa8c02ef1cd1df481480a4457f351d28f4da89d19fa405c3d77f686dc9a24d2681c9184bf2b091f62e6b24df651a3da8bd7067e14e7908fb02f8955b84af5081614cb5bc49b416d9edf914fc608c441b3f2eb8b6043736ddb9d4e4d62334a23b5625c14ef3e1a7e99258386310221b22d83a5eac035c"), "mystr");
    await type_record_bls12_381_g2.type_record_bls12_381_g2.deploy({ as: alice });
    await type_record_bls12_381_g2.type_record_bls12_381_g2.set_value(v, { as: alice });
    const res = await type_record_bls12_381_g2.type_record_bls12_381_g2.get_res();
    assert(v.equals(res), "Invalid Value")
  });

  // bool
  it('bool', async () => {
    const v : type_record_bool.my_record = new type_record_bool.my_record(new Nat(2), true, "mystr");
    await type_record_bool.type_record_bool.deploy({ as: alice });
    await type_record_bool.type_record_bool.set_value(v, { as: alice });
    const res = await type_record_bool.type_record_bool.get_res();
    assert(v.equals(res), "Invalid Value")
  });

  // bytes
  it('bytes', async () => {
    const v : type_record_bytes.my_record = new type_record_bytes.my_record(new Nat(2), new Bytes("ff"), "mystr");
    await type_record_bytes.type_record_bytes.deploy({ as: alice });
    await type_record_bytes.type_record_bytes.set_value(v, { as: alice });
    const res = await type_record_bytes.type_record_bytes.get_res();
    assert(v.equals(res), "Invalid Value")
  });

  // chain_id
  it('chain_id', async () => {
    const v : type_record_chain_id.my_record = new type_record_chain_id.my_record(new Nat(2), new Chain_id("NetXdQprcVkpaWU"), "mystr");
    await type_record_chain_id.type_record_chain_id.deploy({ as: alice });
    await type_record_chain_id.type_record_chain_id.set_value(v, { as: alice });
    const res = await type_record_chain_id.type_record_chain_id.get_res();
    assert(v.equals(res), "Invalid Value")
  });

  // chest
  /*it('chest', async () => {
    const v : type_record_chest.my_record = new type_record_chest.my_record(new Nat(2), new Chest("c5ecdde89eb8c1e7aaeb85abb8f5e5cef3b4fa80c4aee2fccbf0a78ce0debaa5e9ddede3ddfbd9abdea28cc7dc99e6d3a9baf3cbae9adaaabc89cbc39e97e2c7a6cba99197d19ba09ddfd181afc997ffbcc5acb2d29ecbb698c2cacbdd83d1b4ced0bffe9cd78295b3fba4d9f9d5f4d4ec9ad3c7e1a8eeb9dba5cbd8a2dbf29af8e4a4c1e4b1edacf98fccefaef9fea4f0bacdd38ecbfe81c3f9839b9e9ab8fbf5f1eabac48a9f8ca7c588eefe94d1f18bd9bcee9aecde8dd285cf9098f4e1a7eec787f3a0e0ff9cd0ce8ec5a2a4e5ecb08fce899eb5baa397fabf90de9397cebc81bbdfb386e6b4da9fd8fdd19ed9f8d684c782b0aacfeebae4f6e7d1c5c1e6a093c68081cf83b991b4ecd7b38aee92deddcad79eb9abe0a0a0c6b5909dc58495f69445fff5ae9cefe8b8beb2fb86ccf5c9ad91989bdad8a3cfbedaffa2de8bf19dc6ac8cbc8a9584fa9f85f9ba958fc6bbc09ac8e7d5f0fdb98b86c1c7d59ad7c6dfc2d2cefaf5d9db909bf0e3acd3ccc792bc9bccbab4a4febda9b685dbc39ea2a4a7b69990d3abd8b9b3d7dbc581b984f3e08a98f7f7f0e697cc8dfd88edc8c3ca8dc3b2a9ccf6cdd6d0efcc848bc8ead5858bbabfcfc1c8ecea84fd9b96a5e4eabb8c918dafe6f78d83e8e1c2e5f8ee88a4ee8dcaeeafffebfcbbfda1e9eb86c582f2eedd9299cbc0a7fce083ced8c8ddb0e7eaacb696c1fccdadcdc8e3c6f7b9de84eece9bb7919094fef4fdf6efd8b1ba8bbecb9380add4f59ddbf9a19f95facc84e9d0a99bfa93f1fcc3a0fbde9b9ce0c7e8dec6e8d1dfa7dda6f490bb9580abfdbcc0e202e5ff731c3c17d080ee430edd30979a47aa653656e11e593800000015c2ca2a23b732a72932611618ad9ea324986377591e"), "mystr");
    await type_record_chest.type_record_chest.deploy({ as: alice });
    await type_record_chest.type_record_chest.set_value(v, { as: alice });
    const res = await type_record_chest.type_record_chest.get_res();
    assert(v.equals(res), "Invalid Value")
  });*/

  // chest_key
  /*it('chest_key', async () => {
    const v : type_record_chest_key.my_record = new type_record_chest_key.my_record(new Nat(2), new Chest_key("0xa0aceddfb3c9fbe1b8c382c7d5a7dedbe2e5adf9edcfc3e9d084caa6aeb9818ff1e985cb9efe8fa089ceeaa0f5d0bcb583e2f29196f2d3908fffffdcda868faffcb78fb697e7eaf3e7dca9d4b5dda2c3e4f8adf8abf484ecae85f7d6e0f2d28cb69af1d7b19082e8d8d7ba96e7e1e0bb8ac9b9fcf0a9e5b7c1a499c4faf4c8a3a9c8e4d09aa780eac6cee1b78a97a3e983abf9a5f1e8d2a2a2b5e3bcb8c4effeb7a3a68a85a497cd91c9a2c096c3f596deb8d1aca3a5aff28effb8cfc9c7ced892e3a7c09deeb8c8ec9387a3b384b5c8bccaafc7a9a2c1cfd8c7becfd7d6828a9af8f4988fe4ead3b59ecfb8ff8cabf8be90d4c8bdbddfce9cd7c2bb81edc4b7ad80a59a978f8c9debe7aaf08cf0c588f3eaade6b9f4e4e6edf1ed9c9988e48d9ba0aa8f01d18bac92b886db9dd798b5f6fdc891a28da2c4c48da1918897a2b7c2dfa0b78ab8e291b68fb1a2bfa5e8b88e9cabb0b5b0feabcffc9cfeee888ac4afeed9dc8bf5a4eaa9ae89a3838cf6cfd4f8acff8fa7aef7a9889fbbc7d8f6dde4edf3e58096e580e299e5b082b9cf85f3fe8ac6c0998eb1bcbab9bfb8fba39faea7bce0f6fed9ea86dfdad58cf7cbc7fcc4ecf7e2e898d3b19582e38c8092b7e4a0cddc83eb8bc38d91fefed6be869496b8e4fc99d5fae5c6a2b2dcabe2a4ea85b68b87b182d7e8cac29fe0b9efd6d0eb999ffa98aaaf9bf09fe7c4b39d81db97e4e7bbaef0e3bfedd69d9089bc8d91b292afa6c8b389fc9fb7aaa8decab6d9b493a6eafaa5baffe8fb85f2d483ecd1f2d1e58f938df9d8d5e385fe96c5f58ae1e0b09bf2b3c2931f"), "mystr");
    await type_record_chest_key.type_record_chest_key.deploy({ as: alice });
    await type_record_chest_key.type_record_chest_key.set_value(v, { as: alice });
    const res = await type_record_chest_key.type_record_chest_key.get_res();
    assert(v.equals(res), "Invalid Value")
  });*/

  // date
  it('date', async () => {
    const v : type_record_date.my_record = new type_record_date.my_record(new Nat(2), new Date("2022-12-31"), "mystr");
    await type_record_date.type_record_date.deploy({ as: alice });
    await type_record_date.type_record_date.set_value(v, { as: alice });
    const res = await type_record_date.type_record_date.get_res();
    assert(v.equals(res), "Invalid Value")
  });

  // duration
  it('duration', async () => {
    const v : type_record_duration.my_record = new type_record_duration.my_record(new Nat(2), new Duration("2m"), "mystr");
    await type_record_duration.type_record_duration.deploy({ as: alice });
    await type_record_duration.type_record_duration.set_value(v, { as: alice });
    const res = await type_record_duration.type_record_duration.get_res();
    assert(v.equals(res), "Invalid Value")
  });

  // int
  it('int', async () => {
    const v : type_record_int.my_record = new type_record_int.my_record(new Nat(2), new Int(2), "mystr");
    await type_record_int.type_record_int.deploy({ as: alice });
    await type_record_int.type_record_int.set_value(v, { as: alice });
    const res = await type_record_int.type_record_int.get_res();
    assert(v.equals(res), "Invalid Value")
  });

  // key
  it('key', async () => {
    const v : type_record_key.my_record = new type_record_key.my_record(new Nat(2), alice.get_public_key(), "mystr");
    await type_record_key.type_record_key.deploy({ as: alice });
    await type_record_key.type_record_key.set_value(v, { as: alice });
    const res = await type_record_key.type_record_key.get_res();
    assert(v.equals(res), "Invalid Value")
  });

  // key_hash
  it('key_hash', async () => {
    const v : type_record_key_hash.my_record = new type_record_key_hash.my_record(new Nat(2), new Key_hash(alice.get_address().toString()), "mystr");
    await type_record_key_hash.type_record_key_hash.deploy({ as: alice });
    await type_record_key_hash.type_record_key_hash.set_value(v, { as: alice });
    const res = await type_record_key_hash.type_record_key_hash.get_res();
    assert(v.equals(res), "Invalid Value")
  });

  // nat
  it('nat', async () => {
    const v : type_record_nat.my_record = new type_record_nat.my_record(new Nat(2), new Nat(2), "mystr");
    await type_record_nat.type_record_nat.deploy({ as: alice });
    await type_record_nat.type_record_nat.set_value(v, { as: alice });
    const res = await type_record_nat.type_record_nat.get_res();
    assert(v.equals(res), "Invalid Value")
  });

  // rational
  it('rational', async () => {
    const v : type_record_rational.my_record = new type_record_rational.my_record(new Nat(2), new Rational(1.5), "mystr");
    await type_record_rational.type_record_rational.deploy({ as: alice });
    await type_record_rational.type_record_rational.set_value(v, { as: alice });
    const res = await type_record_rational.type_record_rational.get_res();
    assert(v.equals(res), "Invalid Value")
  });

  // sapling_transaction
  /*it('sapling_transaction', async () => {
    const v : type_record_sapling_transaction.my_record = new type_record_sapling_transaction.my_record(new Nat(2), new Sapling_transaction("00000000000001f3849b5eba6e22354dbbccf076d39d63ab59d091f44bed6deb71a319cc10afed24a34ffaa403d7e58766dc6c5e0364a3d1a47e7286d87855544b8a9a4f04d6e1a6f80dba30932a82bb68fce3299aeed3ee9422d1330cffefed109dd0b753263470bea78799ee3f3cbb26a08c5dd8310ae8af66feb33950c45c67b7439e8c41e7941457b941e9ea3157105b860f9424eb210b4de663cd1239f692315049f789d367552c929f6b2aa4f0d01f2384ad1cc2daa5c4cd0731245506b614f67e7bd102ee0b639501c39b7028766fb469a99d3cd3754207098a1daec24645419514e76cbc29173e49d5d16e7aa43cd96acb77054aa333078b407987c4afdd42160bc5f585ba60296a8c1a1e48b7070c1d7106afdf6bf32c688d153b3871a784c354a779560000004f544b45fe787256593b593dcf8e54e9d57c15f86ad6ebc17c3ff65d5e7e6f216283ab4af840848b9a6928f3d65156fd10bef74b06366de141f906f94b48c9f0d0af5da81ee00177b8760cb6b99f74db3951eede8ad2be0b2f7aee18486431a9a1a439c639cacb0f6ebf7834e7c772d8cfa98ec7c844298f59107b5933c8876eeca7368bb9b0efb82b35e3acf6c0f6a1a7db98f3cd1c4e93f865dd654b393425d04a78e0a72529511e961025ba5e41d83a56825ab4db8809c7e9589959453608b4db6e1ce0ffa0077237bd3477007cc972642977b926d3d0d4f690550fbb543193ab31bf2c2ddf7c2a946fae1c62253dafaf25b87cbc18107469630b9f2cd0657cfdf4a6fff5d9f04bc1a50e43613900ffffffffff676980fbc2f4300c01f0b7820d00e3347c8da4ee614674376cbc45359daa54f9b5493e00000000"), "mystr");
    await type_record_sapling_transaction.type_record_sapling_transaction.deploy({ as: alice });
    await type_record_sapling_transaction.type_record_sapling_transaction.set_value(v, { as: alice });
    const res = await type_record_sapling_transaction.type_record_sapling_transaction.get_res();
    assert(v.equals(res), "Invalid Value")
  });*/

  // signature
  /*it('signature', async () => {
    const v : type_record_signature.my_record = new type_record_signature.my_record(new Nat(2), new Signature("edsigtZ5u2yo1EfNLoxaPKafnmDZ6q1tjaP6deA7mX5dwx6GyPoN3Y3BfJv76jDcTAy9wsxkL1AQzFb4FvTWxLAtaXiS2dQg9gw"), "mystr");
    await type_record_signature.type_record_signature.deploy({ as: alice });
    await type_record_signature.type_record_signature.set_value(v, { as: alice });
    const res = await type_record_signature.type_record_signature.get_res();
    assert(v.equals(res), "Invalid Value")
  });*/

  // string
  it('string', async () => {
    const v : type_record_string.my_record = new type_record_string.my_record(new Nat(2), "mystr", "mystr");
    await type_record_string.type_record_string.deploy({ as: alice });
    await type_record_string.type_record_string.set_value(v, { as: alice });
    const res = await type_record_string.type_record_string.get_res();
    assert(v.equals(res), "Invalid Value")
  });

  // tez
  it('tez', async () => {
    const v : type_record_tez.my_record = new type_record_tez.my_record(new Nat(2), new Tez(2), "mystr");
    await type_record_tez.type_record_tez.deploy({ as: alice });
    await type_record_tez.type_record_tez.set_value(v, { as: alice });
    const res = await type_record_tez.type_record_tez.get_res();
    assert(v.equals(res), "Invalid Value")
  });

  // unit
  it('unit', async () => {
    const v : type_record_unit.my_record = new type_record_unit.my_record(new Nat(2), new Unit(), "mystr");
    await type_record_unit.type_record_unit.deploy({ as: alice });
    await type_record_unit.type_record_unit.set_value(v, { as: alice });
    const res = await type_record_unit.type_record_unit.get_res();
    assert(v.equals(res), "Invalid Value")
  });

  // list_nat
  it('list_nat', async () => {
    const v : type_record_list_nat.my_record = new type_record_list_nat.my_record(new Nat(2), [new Nat(1), new Nat(2), new Nat(3)], "mystr");
    await type_record_list_nat.type_record_list_nat.deploy({ as: alice });
    await type_record_list_nat.type_record_list_nat.set_value(v, { as: alice });
    const res = await type_record_list_nat.type_record_list_nat.get_res();
    assert(v.equals(res), "Invalid Value")
  });

  // list_string
  it('list_string', async () => {
    const v : type_record_list_string.my_record = new type_record_list_string.my_record(new Nat(2), ["a", "b", "c", "d"], "mystr");
    await type_record_list_string.type_record_list_string.deploy({ as: alice });
    await type_record_list_string.type_record_list_string.set_value(v, { as: alice });
    const res = await type_record_list_string.type_record_list_string.get_res();
    assert(v.equals(res), "Invalid Value")
  });

  // list_bool
  it('list_bool', async () => {
    const v : type_record_list_bool.my_record = new type_record_list_bool.my_record(new Nat(2), [true, false, true, true], "mystr");
    await type_record_list_bool.type_record_list_bool.deploy({ as: alice });
    await type_record_list_bool.type_record_list_bool.set_value(v, { as: alice });
    const res = await type_record_list_bool.type_record_list_bool.get_res();
    assert(v.equals(res), "Invalid Value")
  });

  // map_nat_string
  it('map_nat_string', async () => {
    const v : type_record_map_nat_string.my_record = new type_record_map_nat_string.my_record(new Nat(2), [[new Nat(0), "mystr"]], "mystr");
    await type_record_map_nat_string.type_record_map_nat_string.deploy({ as: alice });
    await type_record_map_nat_string.type_record_map_nat_string.set_value(v, { as: alice });
    const res = await type_record_map_nat_string.type_record_map_nat_string.get_res();
    assert(v.equals(res), "Invalid Value")
  });

  // option_nat
  it('option_nat', async () => {
    const v : type_record_option_nat.my_record = new type_record_option_nat.my_record(new Nat(2), Option.Some(new Nat(2)), "mystr");
    await type_record_option_nat.type_record_option_nat.deploy({ as: alice });
    await type_record_option_nat.type_record_option_nat.set_value(v, { as: alice });
    const res = await type_record_option_nat.type_record_option_nat.get_res();
    assert(v.equals(res), "Invalid Value")
  });

  // option_string
  it('option_string', async () => {
    const v : type_record_option_string.my_record = new type_record_option_string.my_record(new Nat(2), Option.Some<string>("mystr"), "mystr");
    await type_record_option_string.type_record_option_string.deploy({ as: alice });
    await type_record_option_string.type_record_option_string.set_value(v, { as: alice });
    const res = await type_record_option_string.type_record_option_string.get_res();
    assert(v.equals(res), "Invalid Value")
  });

  // option_bool
  it('option_bool', async () => {
    const v : type_record_option_bool.my_record = new type_record_option_bool.my_record(new Nat(2), Option.Some<boolean>(true), "mystr");
    await type_record_option_bool.type_record_option_bool.deploy({ as: alice });
    await type_record_option_bool.type_record_option_bool.set_value(v, { as: alice });
    const res = await type_record_option_bool.type_record_option_bool.get_res();
    assert(v.equals(res), "Invalid Value")
  });

  // or_nat_string
  /*it('or_nat_string', async () => {
    const v : type_record_or_nat_string.my_record = new type_record_or_nat_string.my_record(new Nat(2), Or.Left(new Nat(2)), "mystr");
    await type_record_or_nat_string.type_record_or_nat_string.deploy({ as: alice });
    await type_record_or_nat_string.type_record_or_nat_string.set_value(v, { as: alice });
    const res = await type_record_or_nat_string.type_record_or_nat_string.get_res();
    assert(v.equals(res), "Invalid Value")
  });*/

  // set_nat
  it('set_nat', async () => {
    const v : type_record_set_nat.my_record = new type_record_set_nat.my_record(new Nat(2), [new Nat(2)], "mystr");
    await type_record_set_nat.type_record_set_nat.deploy({ as: alice });
    await type_record_set_nat.type_record_set_nat.set_value(v, { as: alice });
    const res = await type_record_set_nat.type_record_set_nat.get_res();
    assert(v.equals(res), "Invalid Value")
  });

  // set_string
  it('set_string', async () => {
    const v : type_record_set_string.my_record = new type_record_set_string.my_record(new Nat(2), ["a", "b"], "mystr");
    await type_record_set_string.type_record_set_string.deploy({ as: alice });
    await type_record_set_string.type_record_set_string.set_value(v, { as: alice });
    const res = await type_record_set_string.type_record_set_string.get_res();
    assert(v.equals(res), "Invalid Value")
  });

  // set_bool
  it('set_bool', async () => {
    const v : type_record_set_bool.my_record = new type_record_set_bool.my_record(new Nat(2), [false, true], "mystr");
    await type_record_set_bool.type_record_set_bool.deploy({ as: alice });
    await type_record_set_bool.type_record_set_bool.set_value(v, { as: alice });
    const res = await type_record_set_bool.type_record_set_bool.get_res();
    assert(v.equals(res), "Invalid Value")
  });

  // tuple_nat_string
  it('tuple_nat_string', async () => {
    const v : type_record_tuple_nat_string.my_record = new type_record_tuple_nat_string.my_record(new Nat(2), [new Nat(2), "mystring"], "mystr");
    await type_record_tuple_nat_string.type_record_tuple_nat_string.deploy({ as: alice });
    await type_record_tuple_nat_string.type_record_tuple_nat_string.set_value(v, { as: alice });
    const res = await type_record_tuple_nat_string.type_record_tuple_nat_string.get_res();
    assert(v.equals(res), "Invalid Value")
  });

  // tuple_nat_string_bytes
  it('tuple_nat_string_bytes', async () => {
    const v : type_record_tuple_nat_string_bytes.my_record = new type_record_tuple_nat_string_bytes.my_record(new Nat(2), [new Nat(2), "toto", new Bytes("ff")], "mystr");
    await type_record_tuple_nat_string_bytes.type_record_tuple_nat_string_bytes.deploy({ as: alice });
    await type_record_tuple_nat_string_bytes.type_record_tuple_nat_string_bytes.set_value(v, { as: alice });
    const res = await type_record_tuple_nat_string_bytes.type_record_tuple_nat_string_bytes.get_res();
    assert(v.equals(res), "Invalid Value")
  });

  // tuple_nat_string_bytes_bool
  it('tuple_nat_string_bytes_bool', async () => {
    const v : type_record_tuple_nat_string_bytes_bool.my_record = new type_record_tuple_nat_string_bytes_bool.my_record(new Nat(2), [new Nat(2), "toto", new Bytes("ff"), true], "mystr");
    await type_record_tuple_nat_string_bytes_bool.type_record_tuple_nat_string_bytes_bool.deploy({ as: alice });
    await type_record_tuple_nat_string_bytes_bool.type_record_tuple_nat_string_bytes_bool.set_value(v, { as: alice });
    const res = await type_record_tuple_nat_string_bytes_bool.type_record_tuple_nat_string_bytes_bool.get_res();
    assert(v.equals(res), "Invalid Value")
  });

  // tuple_nat_string_bytes_rev
  it('tuple_nat_string_bytes_rev', async () => {
    const v : type_record_tuple_nat_string_bytes_rev.my_record = new type_record_tuple_nat_string_bytes_rev.my_record(new Nat(2), [[new Nat(2), "toto"], new Bytes("ff")], "mystr");
    await type_record_tuple_nat_string_bytes_rev.type_record_tuple_nat_string_bytes_rev.deploy({ as: alice });
    await type_record_tuple_nat_string_bytes_rev.type_record_tuple_nat_string_bytes_rev.set_value(v, { as: alice });
    const res = await type_record_tuple_nat_string_bytes_rev.type_record_tuple_nat_string_bytes_rev.get_res();
    assert(v.equals(res), "Invalid Value")
  });

  // tuple_nat_string_bytes_bool_rev
  it('tuple_nat_string_bytes_bool_rev', async () => {
    const v : type_record_tuple_nat_string_bytes_bool_rev.my_record = new type_record_tuple_nat_string_bytes_bool_rev.my_record(new Nat(2), [[[new Nat(2), "toto"], new Bytes("ff")], true], "mystr");
    await type_record_tuple_nat_string_bytes_bool_rev.type_record_tuple_nat_string_bytes_bool_rev.deploy({ as: alice });
    await type_record_tuple_nat_string_bytes_bool_rev.type_record_tuple_nat_string_bytes_bool_rev.set_value(v, { as: alice });
    const res = await type_record_tuple_nat_string_bytes_bool_rev.type_record_tuple_nat_string_bytes_bool_rev.get_res();
    assert(v.equals(res), "Invalid Value")
  });

  // tuple_nat_string_bytes_bool_custom
  it('tuple_nat_string_bytes_bool_custom', async () => {
    const v : type_record_tuple_nat_string_bytes_bool_custom.my_record = new type_record_tuple_nat_string_bytes_bool_custom.my_record(new Nat(2), [new Nat(2), ["toto", new Bytes("ff")], true], "mystr");
    await type_record_tuple_nat_string_bytes_bool_custom.type_record_tuple_nat_string_bytes_bool_custom.deploy({ as: alice });
    await type_record_tuple_nat_string_bytes_bool_custom.type_record_tuple_nat_string_bytes_bool_custom.set_value(v, { as: alice });
    const res = await type_record_tuple_nat_string_bytes_bool_custom.type_record_tuple_nat_string_bytes_bool_custom.get_res();
    assert(v.equals(res), "Invalid Value")
  });

  // enum_simple
  it('enum_simple', async () => {
    const v : type_record_enum_simple.my_record = new type_record_enum_simple.my_record(new Nat(2), new type_record_enum_simple.e_2(), "mystr");
    await type_record_enum_simple.type_record_enum_simple.deploy({ as: alice });
    await type_record_enum_simple.type_record_enum_simple.set_value(v, { as: alice });
    const res = await type_record_enum_simple.type_record_enum_simple.get_res();
    assert(v.equals(res), "Invalid Value")
  });

  
})
