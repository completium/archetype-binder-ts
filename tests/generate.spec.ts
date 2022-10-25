import { Bls12_381_fr, Bls12_381_g1, Bls12_381_g2, Bytes, Chain_id, Chest, Chest_key, Duration, Int, Key_hash, Nat, Rational, Option, Or, Sapling_transaction, Tez, Unit } from '@completium/archetype-ts-types';
import { expect_to_fail, get_account, set_mockup, set_quiet } from '@completium/experiment-ts';
import { BindingSettings, Language, Target, generate_binding } from '../src/main'
import { ContractInterface } from '../src/utils'

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

class o {
  public fun_eq?: string;
  public name?: string;
  public inactivate?: boolean;
  public decl?: string;
}

class item {
  public type: string;
  public value: string;
  public comparable: boolean;
  public ts_type: string;
  public ts_value: string;
  public o: o;
  constructor(type: string, value: string, comparable: boolean, ts_type: string, ts_value: string, o?: o) {
    this.type = type;
    this.value = value;
    this.comparable = comparable;
    this.ts_type = ts_type;
    this.ts_value = ts_value;
    this.o = o ? o : {};
  }
  get_fun_eq(): string | null {
    if (this.o.fun_eq) {
      return this.o.fun_eq;
    }
    return null
  }
  get_name(): string {
    if (this.o.name) {
      return this.o.name;
    }
    return this.type;
  }
  is_inactivate(): boolean {
    if (this.o.inactivate) {
      return this.o.inactivate;
    }
    return false
  }
  get_decl(): string {
    if (this.o.decl) {
      return this.o.decl;
    }
    return '';
  }
  toString(): string {
    return this.type;
  }
}

let type_default_name: Array<item> = [
  new item('address', 'tz1Lc2qBKEWCBeDU8npG6zCeCqpmaegRi6Jg', true, 'Address', 'new Address("tz1VSUr8wwNhLAzempoch5d6hLRiTh8Cjcjb")'),
  new item('bls12_381_fr', '0x12', false, 'Bls12_381_fr', 'new Bls12_381_fr("0200000000000000000000000000000000000000000000000000000000000000")'),
  new item('bls12_381_g1', '0x063bd6e11e2fcaac1dd8cf68c6b1925a73c3c583e298ed37c41c3715115cf96358a42dbe85a0228cbfd8a6c8a8c54cd015b5ae2860d1cc47f84698d951f14d9448d03f04df2ca0ffe609a2067d6f1a892163a5e05e541279134cae52b1f23c6b', false, 'Bls12_381_g1', 'new Bls12_381_g1("063bd6e11e2fcaac1dd8cf68c6b1925a73c3c583e298ed37c41c3715115cf96358a42dbe85a0228cbfd8a6c8a8c54cd015b5ae2860d1cc47f84698d951f14d9448d03f04df2ca0ffe609a2067d6f1a892163a5e05e541279134cae52b1f23c6b")'),
  new item('bls12_381_g2', '0x10c6d5cdca84fc3c7f33061add256f48e0ab03a697832b338901898b650419eb6f334b28153fb73ad2ecd1cd2ac67053161e9f46cfbdaf7b1132a4654a55162850249650f9b873ac3113fa8c02ef1cd1df481480a4457f351d28f4da89d19fa405c3d77f686dc9a24d2681c9184bf2b091f62e6b24df651a3da8bd7067e14e7908fb02f8955b84af5081614cb5bc49b416d9edf914fc608c441b3f2eb8b6043736ddb9d4e4d62334a23b5625c14ef3e1a7e99258386310221b22d83a5eac035c', false, 'Bls12_381_g2', 'new Bls12_381_g2("10c6d5cdca84fc3c7f33061add256f48e0ab03a697832b338901898b650419eb6f334b28153fb73ad2ecd1cd2ac67053161e9f46cfbdaf7b1132a4654a55162850249650f9b873ac3113fa8c02ef1cd1df481480a4457f351d28f4da89d19fa405c3d77f686dc9a24d2681c9184bf2b091f62e6b24df651a3da8bd7067e14e7908fb02f8955b84af5081614cb5bc49b416d9edf914fc608c441b3f2eb8b6043736ddb9d4e4d62334a23b5625c14ef3e1a7e99258386310221b22d83a5eac035c")'),
  new item('bool', 'false', true, 'boolean', 'true', { fun_eq: "((x : boolean, y : boolean) => {return x == y})" }),
  new item('bytes', '0x', true, 'Bytes', 'new Bytes("ff")'),
  new item('chain_id', '"NetXLH1uAxK7CCh"', true, 'Chain_id', 'new Chain_id("NetXdQprcVkpaWU")'),
  new item('chest', '0xc5ecdde89eb8c1e7aaeb85abb8f5e5cef3b4fa80c4aee2fccbf0a78ce0debaa5e9ddede3ddfbd9abdea28cc7dc99e6d3a9baf3cbae9adaaabc89cbc39e97e2c7a6cba99197d19ba09ddfd181afc997ffbcc5acb2d29ecbb698c2cacbdd83d1b4ced0bffe9cd78295b3fba4d9f9d5f4d4ec9ad3c7e1a8eeb9dba5cbd8a2dbf29af8e4a4c1e4b1edacf98fccefaef9fea4f0bacdd38ecbfe81c3f9839b9e9ab8fbf5f1eabac48a9f8ca7c588eefe94d1f18bd9bcee9aecde8dd285cf9098f4e1a7eec787f3a0e0ff9cd0ce8ec5a2a4e5ecb08fce899eb5baa397fabf90de9397cebc81bbdfb386e6b4da9fd8fdd19ed9f8d684c782b0aacfeebae4f6e7d1c5c1e6a093c68081cf83b991b4ecd7b38aee92deddcad79eb9abe0a0a0c6b5909dc58495f69445fff5ae9cefe8b8beb2fb86ccf5c9ad91989bdad8a3cfbedaffa2de8bf19dc6ac8cbc8a9584fa9f85f9ba958fc6bbc09ac8e7d5f0fdb98b86c1c7d59ad7c6dfc2d2cefaf5d9db909bf0e3acd3ccc792bc9bccbab4a4febda9b685dbc39ea2a4a7b69990d3abd8b9b3d7dbc581b984f3e08a98f7f7f0e697cc8dfd88edc8c3ca8dc3b2a9ccf6cdd6d0efcc848bc8ead5858bbabfcfc1c8ecea84fd9b96a5e4eabb8c918dafe6f78d83e8e1c2e5f8ee88a4ee8dcaeeafffebfcbbfda1e9eb86c582f2eedd9299cbc0a7fce083ced8c8ddb0e7eaacb696c1fccdadcdc8e3c6f7b9de84eece9bb7919094fef4fdf6efd8b1ba8bbecb9380add4f59ddbf9a19f95facc84e9d0a99bfa93f1fcc3a0fbde9b9ce0c7e8dec6e8d1dfa7dda6f490bb9580abfdbcc0e202e5ff731c3c17d080ee430edd30979a47aa653656e11e593800000015c2ca2a23b732a72932611618ad9ea324986377591e', false, 'Chest', 'new Chest("c5ecdde89eb8c1e7aaeb85abb8f5e5cef3b4fa80c4aee2fccbf0a78ce0debaa5e9ddede3ddfbd9abdea28cc7dc99e6d3a9baf3cbae9adaaabc89cbc39e97e2c7a6cba99197d19ba09ddfd181afc997ffbcc5acb2d29ecbb698c2cacbdd83d1b4ced0bffe9cd78295b3fba4d9f9d5f4d4ec9ad3c7e1a8eeb9dba5cbd8a2dbf29af8e4a4c1e4b1edacf98fccefaef9fea4f0bacdd38ecbfe81c3f9839b9e9ab8fbf5f1eabac48a9f8ca7c588eefe94d1f18bd9bcee9aecde8dd285cf9098f4e1a7eec787f3a0e0ff9cd0ce8ec5a2a4e5ecb08fce899eb5baa397fabf90de9397cebc81bbdfb386e6b4da9fd8fdd19ed9f8d684c782b0aacfeebae4f6e7d1c5c1e6a093c68081cf83b991b4ecd7b38aee92deddcad79eb9abe0a0a0c6b5909dc58495f69445fff5ae9cefe8b8beb2fb86ccf5c9ad91989bdad8a3cfbedaffa2de8bf19dc6ac8cbc8a9584fa9f85f9ba958fc6bbc09ac8e7d5f0fdb98b86c1c7d59ad7c6dfc2d2cefaf5d9db909bf0e3acd3ccc792bc9bccbab4a4febda9b685dbc39ea2a4a7b69990d3abd8b9b3d7dbc581b984f3e08a98f7f7f0e697cc8dfd88edc8c3ca8dc3b2a9ccf6cdd6d0efcc848bc8ead5858bbabfcfc1c8ecea84fd9b96a5e4eabb8c918dafe6f78d83e8e1c2e5f8ee88a4ee8dcaeeafffebfcbbfda1e9eb86c582f2eedd9299cbc0a7fce083ced8c8ddb0e7eaacb696c1fccdadcdc8e3c6f7b9de84eece9bb7919094fef4fdf6efd8b1ba8bbecb9380add4f59ddbf9a19f95facc84e9d0a99bfa93f1fcc3a0fbde9b9ce0c7e8dec6e8d1dfa7dda6f490bb9580abfdbcc0e202e5ff731c3c17d080ee430edd30979a47aa653656e11e593800000015c2ca2a23b732a72932611618ad9ea324986377591e")', { inactivate: true }),
  new item('chest_key', '0xa0aceddfb3c9fbe1b8c382c7d5a7dedbe2e5adf9edcfc3e9d084caa6aeb9818ff1e985cb9efe8fa089ceeaa0f5d0bcb583e2f29196f2d3908fffffdcda868faffcb78fb697e7eaf3e7dca9d4b5dda2c3e4f8adf8abf484ecae85f7d6e0f2d28cb69af1d7b19082e8d8d7ba96e7e1e0bb8ac9b9fcf0a9e5b7c1a499c4faf4c8a3a9c8e4d09aa780eac6cee1b78a97a3e983abf9a5f1e8d2a2a2b5e3bcb8c4effeb7a3a68a85a497cd91c9a2c096c3f596deb8d1aca3a5aff28effb8cfc9c7ced892e3a7c09deeb8c8ec9387a3b384b5c8bccaafc7a9a2c1cfd8c7becfd7d6828a9af8f4988fe4ead3b59ecfb8ff8cabf8be90d4c8bdbddfce9cd7c2bb81edc4b7ad80a59a978f8c9debe7aaf08cf0c588f3eaade6b9f4e4e6edf1ed9c9988e48d9ba0aa8f01d18bac92b886db9dd798b5f6fdc891a28da2c4c48da1918897a2b7c2dfa0b78ab8e291b68fb1a2bfa5e8b88e9cabb0b5b0feabcffc9cfeee888ac4afeed9dc8bf5a4eaa9ae89a3838cf6cfd4f8acff8fa7aef7a9889fbbc7d8f6dde4edf3e58096e580e299e5b082b9cf85f3fe8ac6c0998eb1bcbab9bfb8fba39faea7bce0f6fed9ea86dfdad58cf7cbc7fcc4ecf7e2e898d3b19582e38c8092b7e4a0cddc83eb8bc38d91fefed6be869496b8e4fc99d5fae5c6a2b2dcabe2a4ea85b68b87b182d7e8cac29fe0b9efd6d0eb999ffa98aaaf9bf09fe7c4b39d81db97e4e7bbaef0e3bfedd69d9089bc8d91b292afa6c8b389fc9fb7aaa8decab6d9b493a6eafaa5baffe8fb85f2d483ecd1f2d1e58f938df9d8d5e385fe96c5f58ae1e0b09bf2b3c2931f', false, 'Chest_key', 'new Chest_key("0xa0aceddfb3c9fbe1b8c382c7d5a7dedbe2e5adf9edcfc3e9d084caa6aeb9818ff1e985cb9efe8fa089ceeaa0f5d0bcb583e2f29196f2d3908fffffdcda868faffcb78fb697e7eaf3e7dca9d4b5dda2c3e4f8adf8abf484ecae85f7d6e0f2d28cb69af1d7b19082e8d8d7ba96e7e1e0bb8ac9b9fcf0a9e5b7c1a499c4faf4c8a3a9c8e4d09aa780eac6cee1b78a97a3e983abf9a5f1e8d2a2a2b5e3bcb8c4effeb7a3a68a85a497cd91c9a2c096c3f596deb8d1aca3a5aff28effb8cfc9c7ced892e3a7c09deeb8c8ec9387a3b384b5c8bccaafc7a9a2c1cfd8c7becfd7d6828a9af8f4988fe4ead3b59ecfb8ff8cabf8be90d4c8bdbddfce9cd7c2bb81edc4b7ad80a59a978f8c9debe7aaf08cf0c588f3eaade6b9f4e4e6edf1ed9c9988e48d9ba0aa8f01d18bac92b886db9dd798b5f6fdc891a28da2c4c48da1918897a2b7c2dfa0b78ab8e291b68fb1a2bfa5e8b88e9cabb0b5b0feabcffc9cfeee888ac4afeed9dc8bf5a4eaa9ae89a3838cf6cfd4f8acff8fa7aef7a9889fbbc7d8f6dde4edf3e58096e580e299e5b082b9cf85f3fe8ac6c0998eb1bcbab9bfb8fba39faea7bce0f6fed9ea86dfdad58cf7cbc7fcc4ecf7e2e898d3b19582e38c8092b7e4a0cddc83eb8bc38d91fefed6be869496b8e4fc99d5fae5c6a2b2dcabe2a4ea85b68b87b182d7e8cac29fe0b9efd6d0eb999ffa98aaaf9bf09fe7c4b39d81db97e4e7bbaef0e3bfedd69d9089bc8d91b292afa6c8b389fc9fb7aaa8decab6d9b493a6eafaa5baffe8fb85f2d483ecd1f2d1e58f938df9d8d5e385fe96c5f58ae1e0b09bf2b3c2931f")', { inactivate: true }),
  new item('date', '2020-01-01', true, 'Date', 'new Date("2022-12-31")', { fun_eq: "((x : Date, y : Date) => {return x.toISOString() == y.toISOString()})" }),
  new item('duration', '1s', true, 'Duration', 'new Duration("2m")'),
  new item('int', '0i', true, 'Int', 'new Int(2)'),
  new item('key', '"edpkurLzuFFL1XyP3fed4u7MsgeywQoQmHM45Bz91PBzDvUjQ9bvdn"', true, 'Key', 'alice.get_public_key()'),
  new item('key_hash', '"tz1Lc2qBKEWCBeDU8npG6zCeCqpmaegRi6Jg"', true, 'Key_hash', 'new Key_hash(alice.get_address().toString())'),
  new item('nat', '0', true, 'Nat', 'new Nat(2)'),
  new item('rational', '0.1', true, 'Rational', 'new Rational(1.5)'),
  new item('sapling_transaction(8)', '0x00000000000001f3849b5eba6e22354dbbccf076d39d63ab59d091f44bed6deb71a319cc10afed24a34ffaa403d7e58766dc6c5e0364a3d1a47e7286d87855544b8a9a4f04d6e1a6f80dba30932a82bb68fce3299aeed3ee9422d1330cffefed109dd0b753263470bea78799ee3f3cbb26a08c5dd8310ae8af66feb33950c45c67b7439e8c41e7941457b941e9ea3157105b860f9424eb210b4de663cd1239f692315049f789d367552c929f6b2aa4f0d01f2384ad1cc2daa5c4cd0731245506b614f67e7bd102ee0b639501c39b7028766fb469a99d3cd3754207098a1daec24645419514e76cbc29173e49d5d16e7aa43cd96acb77054aa333078b407987c4afdd42160bc5f585ba60296a8c1a1e48b7070c1d7106afdf6bf32c688d153b3871a784c354a779560000004f544b45fe787256593b593dcf8e54e9d57c15f86ad6ebc17c3ff65d5e7e6f216283ab4af840848b9a6928f3d65156fd10bef74b06366de141f906f94b48c9f0d0af5da81ee00177b8760cb6b99f74db3951eede8ad2be0b2f7aee18486431a9a1a439c639cacb0f6ebf7834e7c772d8cfa98ec7c844298f59107b5933c8876eeca7368bb9b0efb82b35e3acf6c0f6a1a7db98f3cd1c4e93f865dd654b393425d04a78e0a72529511e961025ba5e41d83a56825ab4db8809c7e9589959453608b4db6e1ce0ffa0077237bd3477007cc972642977b926d3d0d4f690550fbb543193ab31bf2c2ddf7c2a946fae1c62253dafaf25b87cbc18107469630b9f2cd0657cfdf4a6fff5d9f04bc1a50e43613900ffffffffff676980fbc2f4300c01f0b7820d00e3347c8da4ee614674376cbc45359daa54f9b5493e00000000', false, 'Sapling_transaction', 'new Sapling_transaction("00000000000001f3849b5eba6e22354dbbccf076d39d63ab59d091f44bed6deb71a319cc10afed24a34ffaa403d7e58766dc6c5e0364a3d1a47e7286d87855544b8a9a4f04d6e1a6f80dba30932a82bb68fce3299aeed3ee9422d1330cffefed109dd0b753263470bea78799ee3f3cbb26a08c5dd8310ae8af66feb33950c45c67b7439e8c41e7941457b941e9ea3157105b860f9424eb210b4de663cd1239f692315049f789d367552c929f6b2aa4f0d01f2384ad1cc2daa5c4cd0731245506b614f67e7bd102ee0b639501c39b7028766fb469a99d3cd3754207098a1daec24645419514e76cbc29173e49d5d16e7aa43cd96acb77054aa333078b407987c4afdd42160bc5f585ba60296a8c1a1e48b7070c1d7106afdf6bf32c688d153b3871a784c354a779560000004f544b45fe787256593b593dcf8e54e9d57c15f86ad6ebc17c3ff65d5e7e6f216283ab4af840848b9a6928f3d65156fd10bef74b06366de141f906f94b48c9f0d0af5da81ee00177b8760cb6b99f74db3951eede8ad2be0b2f7aee18486431a9a1a439c639cacb0f6ebf7834e7c772d8cfa98ec7c844298f59107b5933c8876eeca7368bb9b0efb82b35e3acf6c0f6a1a7db98f3cd1c4e93f865dd654b393425d04a78e0a72529511e961025ba5e41d83a56825ab4db8809c7e9589959453608b4db6e1ce0ffa0077237bd3477007cc972642977b926d3d0d4f690550fbb543193ab31bf2c2ddf7c2a946fae1c62253dafaf25b87cbc18107469630b9f2cd0657cfdf4a6fff5d9f04bc1a50e43613900ffffffffff676980fbc2f4300c01f0b7820d00e3347c8da4ee614674376cbc45359daa54f9b5493e00000000")', { name: 'sapling_transaction', inactivate: true }),
  new item('signature', '"edsigte5U54Z8kxengKaSqDNY77ApFzzfq4RtahenZmHs8zWjhiLnshAhCZbSH7MGqnpFSWrrLX5sgbYHnJDmE9NUqjS212KAW8"', true, 'Signature', 'new Signature("sigPGRuva6xjBJkmb6BYpbovGb4BoobkE3GUN2njdxwkG25yRT39GaDrsBgczf5VybSRGi5eddQy6VBfUkg2YcLfMvgg8Uk1")'),
  new item('string', '""', true, 'string', '"mystr"', { fun_eq: "((x : string, y : string) => {return x == y})" }),
  new item('tez', '0tz', true, 'Tez', 'new Tez(2)'),
  new item('unit', 'Unit', true, 'Unit', 'new Unit()'),
  new item('list<nat>', '[]', false, 'Array<Nat>', '[new Nat(1), new Nat(2), new Nat(3)]', { fun_eq: "((x : Array<Nat>, y : Array<Nat>) => {return x.length == y.length && x[0].equals(y[0]) && x[1].equals(y[1]) && x[2].equals(y[2])})", name: 'list_nat' }),
  new item('list<string>', '[]', false, 'Array<string>', '["a", "b", "c", "d"]', { fun_eq: '((x : Array<string>, y : Array<string>) => {return x.length == y.length && x[0] == y[0] && x[1] == y[1] && x[2] == y[2] && x[3] == y[3]})', name: 'list_string' }),
  new item('list<bool>', '[]', false, 'Array<boolean>', '[true, false, true, true]', { fun_eq: '((x : Array<boolean>, y : Array<boolean>) => {return x.length == y.length && x[0] == y[0] && x[1] == y[1] && x[2] == y[2] && x[3] == y[3]})', name: 'list_bool' }),
  new item('map<nat, string>', '[]', false, 'Array<[Nat, string]>', '[[new Nat(0), "mystr"]]', { fun_eq: '((x : Array<[Nat, string]>, y : Array<[Nat, string]>) => {return x.length == y.length && x[0][0].equals(y[0][0]) && x[0][1] == y[0][1]})', name: 'map_nat_string' }),
  new item('option<nat>', 'none', true, 'Option<Nat>', 'Option.Some(new Nat(2))', { name: 'option_nat' }),
  new item('option<string>', 'none', true, 'Option<string>', 'Option.Some<string>("mystr")', { name: 'option_string' }),
  new item('option<bool>', 'none', true, 'Option<boolean>', 'Option.Some<boolean>(true)', { name: 'option_bool' }),
  new item('or<nat, string>', 'right<nat>("")', true, 'Or<Nat, string>', 'Or.Left(new Nat(2))', { name: 'or_nat_string' }),
  new item('set<nat>', '[]', false, 'Array<Nat>', '[new Nat(2)]', { fun_eq: '((x : Array<Nat>, y : Array<Nat>) => {return x.length == y.length && x[0].equals(y[0])})', name: 'set_nat' }),
  new item('set<string>', '[]', false, 'Array<string>', '["a", "b"]', { fun_eq: '((x : Array<string>, y : Array<string>) => {return x.length == y.length && x[0] == y[0] && x[1] == y[1]})', name: 'set_string' }),
  new item('set<bool>', '[]', false, 'Array<boolean>', '[false, true]', { fun_eq: '((x : Array<boolean>, y : Array<boolean>) => {return x.length == y.length && x[0] == y[0] && x[1] == y[1]})', name: 'set_bool' }),

  // tuple
  new item('(nat * string)', '((0, ""))', true, '[Nat, string]', '[new Nat(2), "mystring"]', { fun_eq: '((x : [Nat, string], y : [Nat, string]) => {return x[0].equals(y[0]) && x[1] == y[1]})', name: 'tuple_nat_string' }),
  new item('(nat * string * bytes)', '((0, "", 0x))', true, '[Nat, string, Bytes]', '[new Nat(2), "toto", new Bytes("ff")]', { fun_eq: '((x : [Nat, string, Bytes], y : [Nat, string, Bytes]) => {return x[0].equals(y[0]) && x[1] == y[1] && x[2].equals(y[2])})', name: 'tuple_nat_string_bytes' }),
  new item('(nat * string * bytes * bool)', '((0, "", 0x, false))', true, '[Nat, string, Bytes, boolean]', '[new Nat(2), "toto", new Bytes("ff"), true]', { fun_eq: '((x : [Nat, string, Bytes, boolean], y : [Nat, string, Bytes, boolean]) => {return x[0].equals(y[0]) && x[1] == y[1] && x[2].equals(y[2]) && x[3] == y[3]})', name: 'tuple_nat_string_bytes_bool' }),
  new item('((nat * string) * bytes)', '(((0, ""), 0x))', true, '[[Nat, string], Bytes]', '[[new Nat(2), "toto"], new Bytes("ff")]', { fun_eq: '((x : [[Nat, string], Bytes], y : [[Nat, string], Bytes]) => {return x[0][0].equals(y[0][0]) && x[0][1] == y[0][1] && x[1].equals(y[1])})', name: 'tuple_nat_string_bytes_rev' }),
  new item('(((nat * string) * bytes) * bool)', '((((0, ""), 0x), false))', true, '[[[Nat, string], Bytes], boolean]', '[[[new Nat(2), "toto"], new Bytes("ff")], true]', { fun_eq: '((x : [[[Nat, string], Bytes], boolean], y : [[[Nat, string], Bytes], boolean]) => {return x[0][0][0].equals(y[0][0][0]) && x[0][0][1] == y[0][0][1] && x[0][1].equals(y[0][1]) && x[1] == y[1]})', name: 'tuple_nat_string_bytes_bool_rev' }),
  new item('(nat * (string * bytes) * bool)', '((0, ("", 0x), false))', true, '[Nat, [string, Bytes], boolean]', '[new Nat(2), ["toto", new Bytes("ff")], true]', { fun_eq: '((x : [Nat, [string, Bytes], boolean], y : [Nat, [string, Bytes], boolean]) => {return x[0].equals(y[0]) && x[1][0] == y[1][0] && x[1][1].equals(y[1][1]) && x[2] == y[2]})', name: 'tuple_nat_string_bytes_bool_custom' }),

  // enum
  new item('e_enum', 'e_1', true, '${prefix}.e_enum', 'new ${prefix}.e_2()', { fun_eq: '((x : ${prefix}.e_enum, y : ${prefix}.e_enum) => {return x.toString() == y.toString()})', name: 'enum_simple', decl: 'enum e_enum = | e_1 | e_2 | e_3' }),
  // new item('e_enum', 'e_1', true, '${prefix}.e_enum', 'new ${prefix}.e_2(new Nat(2))', { fun_eq: '((x : ${prefix}.e_enum, y : ${prefix}.e_enum) => {return x.toString() == y.toString()})', name: 'enum_param', decl: 'enum e_enum = | e_1 | e_2<nat> | e_3<string>' }),

  // record
  new item('r_record', '{f_a = 0}', true, '${prefix}.r_record', 'new Nat(2)', { name: 'record_1_field', decl: 'record r_record {f_a : nat}' }),
  new item('r_record', '{f_a = 0; f_b = ""}', true, '${prefix}.r_record', 'new ${prefix}.r_record(new Nat(2), "mystr")', { name: 'record_2_fields', decl: 'record r_record {f_a : nat; f_b : string}' }),
  new item('r_record', '{f_a = 0; f_b = ""; f_c = 0x}', true, '${prefix}.r_record', 'new ${prefix}.r_record(new Nat(2), "mystr", new Bytes("02"))', { name: 'record_3_fields', decl: 'record r_record {f_a : nat; f_b : string; f_c : bytes}' }),
  new item('r_record', '{f_a = 0; f_b = ""; f_c = 0x; f_d = false}', true, '${prefix}.r_record', 'new ${prefix}.r_record(new Nat(2), "mystr", new Bytes("02"), true)', { name: 'record_4_fields', decl: 'record r_record {f_a : nat; f_b : string; f_c : bytes; f_d : bool}' }),
  new item('r_record', '{f_a = 0; f_b = ""; f_c = 0x; f_d = false}', true, '${prefix}.r_record', 'new ${prefix}.r_record(new Nat(2), "mystr", new Bytes("02"), true)', { name: 'record_4_fields_custom', decl: 'record r_record {f_a : nat; f_b : string; f_c : bytes; f_d : bool} as ((%f_a, (%f_b, %f_c), %f_d))' }),

  // event
  // new item('e_event',  '{f_a = 0}', true, '${prefix}.e_event', 'new ${prefix}.e_event(new Nat(2))', { name: 'record_1_field', decl: 'event e_event {f_a : nat}' }),
  // new item('e_event', '{f_a = 0; f_b = ""}', true, '${prefix}.e_event', 'new ${prefix}.e_event(new Nat(2), "mystr")', { name: 'event_2_fields', decl: 'event e_event {f_a : nat; f_b : string}' }),
  // new item('e_event', '{f_a = 0; f_b = ""; f_c = 0x}', true, '${prefix}.e_event', 'new ${prefix}.e_event(new Nat(2), "mystr", new Bytes("02"))', { name: 'event_3_fields', decl: 'event e_event {f_a : nat; f_b : string; f_c : bytes}' }),
  // new item('e_event', '{f_a = 0; f_b = ""; f_c = 0x; f_d = false}', true, '${prefix}.e_event', 'new ${prefix}.e_event(new Nat(2), "mystr", new Bytes("02"), true)', { name: 'event_4_fields', decl: 'event e_event {f_a : nat; f_b : string; f_c : bytes; f_d : bool}' }),
  // new item('e_event', '{f_a = 0; f_b = ""; f_c = 0x; f_d = false}', true, '${prefix}.e_event', 'new ${prefix}.e_event(new Nat(2), "mystr", new Bytes("02"), true)', { name: 'event_4_fields_custom', decl: 'event e_event {f_a : nat; f_b : string; f_c : bytes; f_d : bool} as ((%f_a, (%f_b, %f_c), %f_d))' }),
]

const gen_asset = (): Array<item> => {
  const multi_key = 'multi_key';
  const tos = ['map', "big_map"]
  const fields: Array<[string, string]> = [['f_a: nat', '1_field'], ['f_a : nat; f_b : string', '2_fields'], ['f_a : nat; f_b : string; f_c : bytes', '3_fields'], ['f_a : nat; f_b : string; f_c : bytes; f_d : bool', '4_fields']]
  const keys: Array<[string, string]> = [['f_a', 'single_key'], ['f_a f_b f_c', multi_key]]
  const types: Array<[string, string, boolean]> = [['asset_key', '{}', true], ['asset_value', '{}', true]/*, ['asset_container', '[]', false]*/]

  let res: Array<item> = [];

  for (const to of tos) {
    for (let i = 0; i < fields.length; ++i) {
      const field = fields[i];
      for (const key of keys) {
        if (i < 3 && key[1] == multi_key) {
          break;
        }
        for (const ty of types) {
          const type_name = ty[0]
          const name = `asset_${to}_${field[1]}_${key[1]}_${type_name}`

          const decl = `asset a_asset to ${to} identified by ${key[0]} {${field[0]}}`
          const typ = `${ty[0]}<a_asset>`

          res.push(new item(typ, ty[1], ty[2], '${prefix}.a_asset', 'new ${prefix}.a_asset()', { name: name, decl: decl }))
        }
      }
    }
  }

  return res;
}

const type_assets = gen_asset()

const spec_template = (type: string, imports: string, tests: string) => {
  return `/* eslint-disable @typescript-eslint/no-inferrable-types */
  /* DO NOT EDIT, GENERATED FILE */
import { Address, Bls12_381_fr, Bls12_381_g1, Bls12_381_g2, Bytes, Chain_id, Chest, Chest_key, Duration, Int, Key, Key_hash, Nat, Rational, Option, Or, Sapling_transaction, Signature, Tez, Unit } from '@completium/archetype-ts-types';
import { get_account, set_mockup, set_quiet } from '@completium/experiment-ts';

${imports}

import assert from 'assert'

const alice = get_account('alice')

/* Verbose mode ------------------------------------------------------------ */

set_quiet(true);

/* Endpoint ---------------------------------------------------------------- */

set_mockup()

/* Tests-------------------------------------------------------------------- */

describe('Type ${type}', () => {
  ${tests}
})
`
}

/* Functions --------------------------------------------------------------- */

const get_binding = async (filename: string) => {
  const path_contract = path_contracts + filename;
  const json = await archetype.compile(path_contract, {
    contract_interface: true
  });
  let ci: ContractInterface = JSON.parse(json);
  fs.writeFileSync(path_contracts + 'json/' + filename.replace('.arl', '.json'), JSON.stringify(ci, null, 2))
  const settings: BindingSettings = {
    language: Language.Archetype,
    target: Target.Experiment,
    path: path_contracts
  }
  const output = generate_binding(ci, settings);
  fs.writeFileSync(path_contracts + 'bindings/' + filename.replace('.arl', '.ts'), output)
}

const get_binding_michelson = async (filename: string) => {
  const path_contract = path_contracts + filename;
  const json = await archetype.compile(path_contract, {
    contract_interface_michelson: true
  });
  let ci: ContractInterface = JSON.parse(json);
  fs.writeFileSync(path_contracts + 'json/' + filename.replace('.tz', '.json'), JSON.stringify(ci, null, 2))
  const settings: BindingSettings = {
    language: Language.Michelson,
    target: Target.Experiment,
    path: path_contracts
  }
  const output = generate_binding(ci, settings);
  fs.writeFileSync(path_contracts + 'bindings/' + filename.replace('.tz', '.ts'), output)
}

const generate_type_gen = async (kind: string, content_arl: string, item: item) => {
  const name = item.get_name();
  const contract_path = `./type_${kind}_${name}.arl`;
  fs.writeFileSync('./tests/contracts/' + contract_path, content_arl);

  await get_binding(contract_path);
}

class Ret {
  public kind: string;
  public importss: Array<string>;
  public items: Array<string>;
  constructor(kind: string) {
    this.kind = kind;
    this.importss = []
    this.items = []
  }
}

const iterate_on_comparable_types_gen = async (kind: string, g: (item: item) => Promise<void>, h: (accu: Ret, item: item) => Ret, z: (ret: Ret) => void, doit: (item: item) => boolean, items : Array<item>, skip ?: Array<string>) => {
  const ret = new Ret(kind);
  for (let e of items) {
    if (doit(e)) {
      const name = e.get_name();
      if (skip && skip.indexOf(name) > -1) {
        continue
      }
      const a = h(ret, e);
      it(name, async () => {
        await g(e);
      })
      z(ret)
    }
  }
}

const finalize = (r: Ret) => {
  const output = spec_template(r.kind, r.importss.join(''), r.items.join(''));
  fs.writeFileSync(`./tests/type_${r.kind}.spec.ts`, output);
}

class iter_settings {
  public gen_it: (item: item) => string;
  public import_star: boolean;
  constructor(gen_it: (item: item) => string, import_star?: boolean) {
    this.gen_it = gen_it
    this.import_star = import_star ? import_star : false
  }
}

const myiter = (is: iter_settings): ((accu: Ret, item: item) => Ret) => {
  const res: (accu: Ret, item: item) => Ret = (accu: Ret, item: item) => {
    const comment = item.is_inactivate()
    const name = item.get_name();
    const kind = accu.kind;

    accu.importss.push(`${comment ? '//' : ''}import * as type_${kind}_${name} from './contracts/bindings/type_${kind}_${name}'\n`)

    accu.items.push(`// ${name}
  ${comment ? '/*' : ''}it('${name}', async () => {
    ${is.gen_it(item)}
  });${comment ? '*/' : ''}

  `
    )
    return accu
  };
  return res;
}

const iterate_on_types = async (kind: string, g: (item: item) => Promise<void>, is: iter_settings, skip ?: Array<string>) => {
  iterate_on_comparable_types_gen(kind, g, myiter(is), finalize, ((e: item) => true), type_default_name, skip)
}

const iterate_on_comparable_types = async (kind: string, g: (item: item) => Promise<void>, is: iter_settings, skip ?: Array<string>) => {
  iterate_on_comparable_types_gen(kind, g, myiter(is), finalize, ((e: item) => e.comparable), type_default_name, skip)
}

const iterate_on_asset_types = async (kind: string, g: (item: item) => Promise<void>, is: iter_settings, skip ?: Array<string>) => {
  iterate_on_comparable_types_gen(kind, g, myiter(is), finalize, ((e: item) => true), type_assets, skip)
}

const process_prefix = (prefix: string, str: string | null): string | null => {
  if (str == null) {
    return null
  }
  return str.replace('${prefix}', prefix).replace('${prefix}', prefix) // TODO: Ugly fix this
}

describe('Generate binding fails', async () => {
  it('simple_fail', async () => {
    await get_binding('simple_fail.arl');
  });

  it('simple_fail_invalid_condition', async () => {
    await get_binding('simple_fail_invalid_condition.arl');
  });
})

describe('Generate binding test', async () => {
  it('test_big_record', async () => {
    await get_binding('test_big_record.arl');
  });
})

// describe('Generate michelson test', async () => {
//   it('contract_eq', async () => {
//     await get_binding_michelson('contract_eq.tz');
//   });
//   it('contract_le', async () => {
//     await get_binding_michelson('contract_le.tz');
//   });
//   it('contract_p', async () => {
//     await get_binding_michelson('contract_p.tz');
//   });
//   it('contract_tz', async () => {
//     await get_binding_michelson('contract_tz.tz');
//   });
// })

describe('Generate binding training', async () => {
  it('training_account', async () => {
    await get_binding('training_account.arl');
  });

  it('training_addnumber', async () => {
    await get_binding('training_addnumber.arl');
  });

  it('training_charity', async () => {
    await get_binding('training_charity.arl');
  });

  it('training_counter_two_numbers', async () => {
    await get_binding('training_counter_two_numbers.arl');
  });

  it('training_counter', async () => {
    await get_binding('training_counter.arl');
  });

  it('training_storevalue', async () => {
    await get_binding('training_storevalue.arl');
  });

  it('training_visitors', async () => {
    await get_binding('training_visitors.arl');
  });

})

describe('Generate binding type simple', async () => {
  const kind = 'simple';
  const generate_type_simple = async (item: item) => {
    const content_arl: string =
      `/* DO NOT EDIT, GENERATED FILE */
archetype type_${kind}_${item.get_name()}
${item.get_decl() ? '\n' + item.get_decl() + '\n' : ''}
variable res : ${item.type} = ${item.value}

entry set_value(i : ${item.type}) {
  res := i
}
`;
    await generate_type_gen(kind, content_arl, item);
  }
  const gen_it = (item: item): string => {
    const name = item.get_name();
    const prefix = `type_${kind}_${name}`;
    const ts_type = process_prefix(prefix, item.ts_type);
    const ts_value = process_prefix(prefix, item.ts_value);
    const fun_eq = process_prefix(prefix, item.get_fun_eq());

    return `const v : ${ts_type} = ${ts_value};
    await ${prefix}.${prefix}.deploy({ as: alice });
    await ${prefix}.${prefix}.set_value(v, { as: alice });
    const res = await ${prefix}.${prefix}.get_res();
    assert(${fun_eq != null ? `${fun_eq}(v, res)` : 'v.equals(res)'}, "Invalid Value")`
  };
  iterate_on_types(kind, generate_type_simple, new iter_settings(gen_it))
})

describe('Generate binding type option', async () => {
  const kind = 'option';
  const generate_type_option = async (item: item) => {
    const content_arl: string =
      `/* DO NOT EDIT, GENERATED FILE */
archetype type_${kind}_${item.get_name()}
${item.get_decl() ? '\n' + item.get_decl() + '\n' : ''}
variable res : option<${item.type}> = none

entry set_value(i : option<${item.type}>) {
  res := i
}
`
    await generate_type_gen(kind, content_arl, item);
  }
  const gen_it = (item: item): string => {
    const name = item.get_name();
    const prefix = `type_${kind}_${name}`;
    const ts_type = process_prefix(prefix, item.ts_type);
    const ts_value = process_prefix(prefix, item.ts_value);

    return `const v : Option<${ts_type}> = new Option<${ts_type}>(${ts_value});
    await ${prefix}.${prefix}.deploy({ as: alice });
    await ${prefix}.${prefix}.set_value(v, { as: alice });
    const res = await ${prefix}.${prefix}.get_res();
    assert(v.equals(res), "Invalid Value")`
  };
  iterate_on_types(kind, generate_type_option, new iter_settings(gen_it))
})

describe('Generate binding type set', async () => {
  const kind = 'set';
  const generate_type_option = async (item: item) => {
    const content_arl: string =
      `/* DO NOT EDIT, GENERATED FILE */
archetype type_${kind}_${item.get_name()}
${item.get_decl() ? '\n' + item.get_decl() + '\n' : ''}
variable res : set<${item.type}> = []

entry set_value(i : set<${item.type}>) {
  res := i
}
`
    await generate_type_gen(kind, content_arl, item);
  }
  const gen_it = (item: item): string => {
    const name = item.get_name();
    const prefix = `type_${kind}_${name}`;
    const ts_type = process_prefix(prefix, item.ts_type);
    const ts_value = process_prefix(prefix, item.ts_value);
    const fun_eq = process_prefix(prefix, item.get_fun_eq());

    return `const v : Array<${ts_type}> = [${ts_value}];
    await ${prefix}.${prefix}.deploy({ as: alice });
    await ${prefix}.${prefix}.set_value(v, { as: alice });
    const res = await ${prefix}.${prefix}.get_res();
    assert(v.length == res.length && ${fun_eq != null ? `${fun_eq}(v[0], res[0])` : 'v[0].equals(res[0])'}, "Invalid Value")`
  };
  iterate_on_comparable_types(kind, generate_type_option, new iter_settings(gen_it))
})

describe('Generate binding type list', async () => {
  const kind = 'list';
  const generate_type_option = async (item: item) => {
    const content_arl: string =
      `/* DO NOT EDIT, GENERATED FILE */
archetype type_${kind}_${item.get_name()}
${item.get_decl() ? '\n' + item.get_decl() + '\n' : ''}
variable res : list<${item.type}> = []

entry set_value(i : list<${item.type}>) {
  res := i
}
`
    await generate_type_gen(kind, content_arl, item);
  }
  const gen_it = (item: item): string => {
    const name = item.get_name();
    const prefix = `type_${kind}_${name}`;
    const ts_type = process_prefix(prefix, item.ts_type);
    const ts_value = process_prefix(prefix, item.ts_value);
    const fun_eq = process_prefix(prefix, item.get_fun_eq());

    return `const v : Array<${ts_type}> = [${ts_value}];
    await ${prefix}.${prefix}.deploy({ as: alice });
    await ${prefix}.${prefix}.set_value(v, { as: alice });
    const res = await ${prefix}.${prefix}.get_res();
    assert(v.length == res.length && ${fun_eq != null ? `${fun_eq}(v[0], res[0])` : 'v[0].equals(res[0])'}, "Invalid Value")`
  };
  iterate_on_types(kind, generate_type_option, new iter_settings(gen_it))
})


describe('Generate binding type map key', async () => {
  const kind = 'map_key';
  const generate_type_map_key = async (item: item) => {
    const content_arl: string =
      `/* DO NOT EDIT, GENERATED FILE */
archetype type_${kind}_${item.get_name()}
${item.get_decl() ? '\n' + item.get_decl() + '\n' : ''}
variable res : map<${item.type}, nat> = []

entry set_value(i : ${item.type}) {
  res.put(i, 0)
}
`
    await generate_type_gen(kind, content_arl, item);
  }
  const gen_it = (item: item): string => {
    const name = item.get_name();
    const prefix = `type_${kind}_${name}`;
    const ts_type = process_prefix(prefix, item.ts_type);
    const ts_value = process_prefix(prefix, item.ts_value);
    const fun_eq = process_prefix(prefix, item.get_fun_eq());

    return `const v : ${ts_type} = ${ts_value};
    await ${prefix}.${prefix}.deploy({ as: alice });
    await ${prefix}.${prefix}.set_value(v, { as: alice });
    const res = await ${prefix}.${prefix}.get_res();
    assert(1 == res.length && ${fun_eq != null ? `${fun_eq}(v, res[0][0])` : 'v.equals(res[0][0])'}, "Invalid Value")`
  };
  iterate_on_comparable_types(kind, generate_type_map_key, new iter_settings(gen_it))
})

describe('Generate binding type map value', async () => {
  const kind = 'map_value';
  const generate_type_map_value = async (item: item) => {
    const content_arl: string =
      `/* DO NOT EDIT, GENERATED FILE */
archetype type_${kind}_${item.get_name()}
${item.get_decl() ? '\n' + item.get_decl() + '\n' : ''}
variable res : map<nat, ${item.type}> = []

entry set_value(i : ${item.type}) {
  res.put(0, i)
}
`
    await generate_type_gen(kind, content_arl, item);
  }
  const gen_it = (item: item): string => {
    const name = item.get_name();
    const prefix = `type_${kind}_${name}`;
    const ts_type = process_prefix(prefix, item.ts_type);
    const ts_value = process_prefix(prefix, item.ts_value);
    const fun_eq = process_prefix(prefix, item.get_fun_eq());

    return `const v : ${ts_type} = ${ts_value};
    await ${prefix}.${prefix}.deploy({ as: alice });
    await ${prefix}.${prefix}.set_value(v, { as: alice });
    const res = await ${prefix}.${prefix}.get_res();
    assert(1 == res.length && ${fun_eq != null ? `${fun_eq}(v, res[0][1])` : 'v.equals(res[0][1])'}, "Invalid Value")`
  };
  iterate_on_types(kind, generate_type_map_value, new iter_settings(gen_it))
})


describe('Generate binding type big map key', async () => {
  const kind = 'big_map_key';
  const generate_type_big_map_key = async (item: item) => {
    const content_arl: string =
      `/* DO NOT EDIT, GENERATED FILE */
archetype type_${kind}_${item.get_name()}
${item.get_decl() ? '\n' + item.get_decl() + '\n' : ''}
variable res : big_map<${item.type}, nat> = []

entry set_value(i : ${item.type}) {
  res.put(i, 0)
}
`
    await generate_type_gen(kind, content_arl, item);
  }
  const gen_it = (item: item): string => {
    const name = item.get_name();
    const prefix = `type_${kind}_${name}`;
    const ts_type = process_prefix(prefix, item.ts_type);
    const ts_value = process_prefix(prefix, item.ts_value);
    const fun_eq = process_prefix(prefix, item.get_fun_eq());

    return `const v : ${ts_type} = ${ts_value};
    await ${prefix}.${prefix}.deploy({ as: alice });
    await ${prefix}.${prefix}.set_value(v, { as: alice });
    const res = await ${prefix}.${prefix}.get_res_value(v);
    assert(res?.equals(new Nat(0)), "Invalid Value")
    const c = await ${prefix}.${prefix}.has_res_value(v);
    assert(c, "Invalid Value")`
  };
  iterate_on_comparable_types(kind, generate_type_big_map_key, new iter_settings(gen_it))
})

describe('Generate binding type big map value', async () => {
  const kind = 'big_map_value';
  const generate_type_big_map_value = async (item: item) => {
    const content_arl: string =
      `/* DO NOT EDIT, GENERATED FILE */
archetype type_${kind}_${item.get_name()}
${item.get_decl() ? '\n' + item.get_decl() + '\n' : ''}
variable res : big_map<nat, ${item.type}> = []

entry set_value(i : ${item.type}) {
  res.put(0, i)
}
`
    await generate_type_gen(kind, content_arl, item);
  }
  const gen_it = (item: item): string => {
    const name = item.get_name();
    const prefix = `type_${kind}_${name}`;
    const ts_type = process_prefix(prefix, item.ts_type);
    const ts_value = process_prefix(prefix, item.ts_value);
    const fun_eq = process_prefix(prefix, item.get_fun_eq());

    return `const v : ${ts_type} = ${ts_value};
    await ${prefix}.${prefix}.deploy({ as: alice });
    await ${prefix}.${prefix}.set_value(v, { as: alice });
    const res = await ${prefix}.${prefix}.get_res_value(new Nat(0));
    assert(res !== undefined && ${fun_eq != null ? `${fun_eq}(v, res)` : 'v.equals(res)'}, "Invalid Value")
    const c = await ${prefix}.${prefix}.has_res_value(new Nat(0));
    assert(c, "Invalid Value")`
  };
  iterate_on_types(kind, generate_type_big_map_value, new iter_settings(gen_it))
})

describe('Generate binding type tuple', async () => {
  const kind = 'tuple';
  const generate_type_tuple = async (item: item) => {
    const content_arl: string =
      `/* DO NOT EDIT, GENERATED FILE */
archetype type_${kind}_${item.get_name()}
${item.get_decl() ? '\n' + item.get_decl() + '\n' : ''}
variable res : (nat * ${item.type} * string) = ((0, ${item.value}, ""))

entry set_value(i : ${item.type}) {
  res := ((2, i, "mystr"))
}
`
    await generate_type_gen(kind, content_arl, item);
  }
  const gen_it = (item: item): string => {
    const name = item.get_name();
    const prefix = `type_${kind}_${name}`;
    const ts_type = process_prefix(prefix, item.ts_type);
    const ts_value = process_prefix(prefix, item.ts_value);
    const fun_eq = process_prefix(prefix, item.get_fun_eq());

    return `const v : ${ts_type} = ${ts_value};
    await ${prefix}.${prefix}.deploy({ as: alice });
    await ${prefix}.${prefix}.set_value(v, { as: alice });
    const res = await ${prefix}.${prefix}.get_res();
    assert(${fun_eq != null ? `${fun_eq}(v, res[1])` : 'v.equals(res[1])'}, "Invalid Value")`
  };
  iterate_on_types(kind, generate_type_tuple, new iter_settings(gen_it))
})

describe('Generate binding type or left', async () => {
  const kind = 'or_left';
  const generate_type_or_left = async (item: item) => {
    const content_arl: string =
      `/* DO NOT EDIT, GENERATED FILE */
archetype type_${kind}_${item.get_name()}
${item.get_decl() ? '\n' + item.get_decl() + '\n' : ''}
variable res : or<${item.type}, nat> = right<${item.type}>(0)

entry set_value(i : ${item.type}) {
  res := left<nat>(i)
}
`
    await generate_type_gen(kind, content_arl, item);
  }
  const gen_it = (item: item): string => {
    const name = item.get_name();
    const prefix = `type_${kind}_${name}`;
    const ts_type = process_prefix(prefix, item.ts_type);
    const ts_value = process_prefix(prefix, item.ts_value);
    const fun_eq = process_prefix(prefix, item.get_fun_eq());

    return `const v : ${ts_type} = ${ts_value};
    await ${prefix}.${prefix}.deploy({ as: alice });
    await ${prefix}.${prefix}.set_value(v, { as: alice });
    const res = await ${prefix}.${prefix}.get_res();
    assert(Or.Left<${ts_type}, Nat>(v).equals(res), "Invalid Value")`
  };
  iterate_on_types(kind, generate_type_or_left, new iter_settings(gen_it))
})

describe('Generate binding type or right', async () => {
  const kind = 'or_right';
  const generate_type_or_right = async (item: item) => {
    const content_arl: string =
      `/* DO NOT EDIT, GENERATED FILE */
archetype type_${kind}_${item.get_name()}
${item.get_decl() ? '\n' + item.get_decl() + '\n' : ''}
variable res : or<nat, ${item.type}> = left<${item.type}>(0)

entry set_value(i : ${item.type}) {
  res := right<nat>(i)
}
`
    await generate_type_gen(kind, content_arl, item);
  }
  const gen_it = (item: item): string => {
    const name = item.get_name();
    const prefix = `type_${kind}_${name}`;
    const ts_type = process_prefix(prefix, item.ts_type);
    const ts_value = process_prefix(prefix, item.ts_value);
    const fun_eq = process_prefix(prefix, item.get_fun_eq());

    return `const v : ${ts_type} = ${ts_value};
    await ${prefix}.${prefix}.deploy({ as: alice });
    await ${prefix}.${prefix}.set_value(v, { as: alice });
    const res = await ${prefix}.${prefix}.get_res();
    assert(Or.Right<Nat, ${ts_type}>(v).equals(res), "Invalid Value")`
  };
  iterate_on_types(kind, generate_type_or_right, new iter_settings(gen_it))
})

describe('Generate binding type record', async () => {
  const kind = 'record';
  const generate_type_record = async (item: item) => {
    const content_arl: string =
      `/* DO NOT EDIT, GENERATED FILE */
archetype type_${kind}_${item.get_name()}
${item.get_decl() ? '\n' + item.get_decl() + '\n' : ''}
record my_record {
  n : nat;
  v : ${item.type};
  s : string;
}

variable res : my_record = {0; ${item.value}; ""}

entry set_value(i : my_record) {
  res := i
}
`
    await generate_type_gen(kind, content_arl, item);
  }
  const gen_it = (item: item): string => {
    const name = item.get_name();
    const prefix = `type_${kind}_${name}`;
    const ts_type = process_prefix(prefix, item.ts_type);
    const ts_value = process_prefix(prefix, item.ts_value);
    const fun_eq = process_prefix(prefix, item.get_fun_eq());

    return `const v : type_${kind}_${name}.my_record = new type_${kind}_${name}.my_record(new Nat(2), ${ts_value}, "mystr");
    await ${prefix}.${prefix}.deploy({ as: alice });
    await ${prefix}.${prefix}.set_value(v, { as: alice });
    const res = await ${prefix}.${prefix}.get_res();
    assert(v.equals(res), "Invalid Value")`
  };
  iterate_on_types(kind, generate_type_record, new iter_settings(gen_it, true))
})

describe('Generate binding type asset_value_2', async () => {
  const kind = 'asset_value_2';
  const generate_type_asset_value_2 = async (item: item) => {
    const content_arl: string =
      `/* DO NOT EDIT, GENERATED FILE */
archetype type_${kind}_${item.get_name()}
${item.get_decl() ? '\n' + item.get_decl() + '\n' : ''}
asset my_asset {
  k : nat;
  v : ${item.type};
}

entry asset_put(i : ${item.type}) {
  my_asset.put({0; i})
}
`
    await generate_type_gen(kind, content_arl, item);
  }
  const gen_it = (item: item): string => {
    const name = item.get_name();
    const prefix = `type_${kind}_${name}`;
    const ts_type = process_prefix(prefix, item.ts_type);
    const ts_value = process_prefix(prefix, item.ts_value);
    const fun_eq = process_prefix(prefix, item.get_fun_eq());

    return `const v : ${ts_type} = ${ts_value};
    await ${prefix}.${prefix}.deploy({ as: alice });
    await ${prefix}.${prefix}.asset_put(v, { as: alice });
    const res = await ${prefix}.${prefix}.get_my_asset();
    assert(1 == res.length && ${fun_eq != null ? `${fun_eq}(v, res[0][1])` : 'v.equals(res[0][1])'}, "Invalid Value")`
  };
  iterate_on_types(kind, generate_type_asset_value_2, new iter_settings(gen_it))
})

describe('Generate binding type asset_value_3', async () => {
  const kind = 'asset_value_3';
  const generate_type_asset_value_3 = async (item: item) => {
    const content_arl: string =
      `/* DO NOT EDIT, GENERATED FILE */
archetype type_${kind}_${item.get_name()}
${item.get_decl() ? '\n' + item.get_decl() + '\n' : ''}
asset my_asset {
  k : nat;
  s : string;
  v : ${item.type};
}

entry asset_put(i : ${item.type}) {
  my_asset.put({0; ""; i})
}
`
    await generate_type_gen(kind, content_arl, item);
  }
  const gen_it = (item: item): string => {
    const name = item.get_name();
    const prefix = `type_${kind}_${name}`;
    const ts_type = process_prefix(prefix, item.ts_type);
    const ts_value = process_prefix(prefix, item.ts_value);
    const fun_eq = process_prefix(prefix, item.get_fun_eq());

    return `const v : ${ts_type} = ${ts_value};
    await ${prefix}.${prefix}.deploy({ as: alice });
    await ${prefix}.${prefix}.asset_put(v, { as: alice });
    const res = await ${prefix}.${prefix}.get_my_asset();
    assert(1 == res.length && ${fun_eq != null ? `${fun_eq}(v, res[0][1].v)` : 'v.equals(res[0][1].v)'}, "Invalid Value")`
  };
  iterate_on_types(kind, generate_type_asset_value_3, new iter_settings(gen_it))
})

describe('Generate binding type asset_key_1', async () => {
  const kind = 'asset_key_1';
  const generate_type_asset_key_1 = async (item: item) => {
    const content_arl: string =
      `/* DO NOT EDIT, GENERATED FILE */
archetype type_${kind}_${item.get_name()}
${item.get_decl() ? '\n' + item.get_decl() + '\n' : ''}
asset my_asset {
  k : ${item.type};
  v : string;
}

entry asset_put(i : ${item.type}) {
  my_asset.put({i; ""})
}
`
    await generate_type_gen(kind, content_arl, item);
  }
  const gen_it = (item: item): string => {
    const name = item.get_name();
    const prefix = `type_${kind}_${name}`;
    const ts_type = process_prefix(prefix, item.ts_type);
    const ts_value = process_prefix(prefix, item.ts_value);
    const fun_eq = process_prefix(prefix, item.get_fun_eq());

    return `const v : ${ts_type} = ${ts_value};
    await ${prefix}.${prefix}.deploy({ as: alice });
    await ${prefix}.${prefix}.asset_put(v, { as: alice });
    const res = await ${prefix}.${prefix}.get_my_asset();
    assert(1 == res.length && ${fun_eq != null ? `${fun_eq}(v, res[0][0])` : 'v.equals(res[0][0])'}, "Invalid Value")`
  };
  iterate_on_comparable_types(kind, generate_type_asset_key_1, new iter_settings(gen_it))
})

describe('Generate binding type asset_key_2', async () => {
  const kind = 'asset_key_2';
  const generate_type_asset_key_2 = async (item: item) => {
    const content_arl: string =
      `/* DO NOT EDIT, GENERATED FILE */
archetype type_${kind}_${item.get_name()}
${item.get_decl() ? '\n' + item.get_decl() + '\n' : ''}
asset my_asset identified by k n {
  k : ${item.type};
  n : nat;
  v : string;
}

entry asset_put(i : ${item.type}) {
  my_asset.put({i; 0; ""})
}
`
    await generate_type_gen(kind, content_arl, item);
  }
  const gen_it = (item: item): string => {
    const name = item.get_name();
    const prefix = `type_${kind}_${name}`;
    const ts_type = process_prefix(prefix, item.ts_type);
    const ts_value = process_prefix(prefix, item.ts_value);
    const fun_eq = process_prefix(prefix, item.get_fun_eq());

    return `const v : ${ts_type} = ${ts_value};
    await ${prefix}.${prefix}.deploy({ as: alice });
    await ${prefix}.${prefix}.asset_put(v, { as: alice });
    const res = await ${prefix}.${prefix}.get_my_asset();
    assert(1 == res.length && ${fun_eq != null ? `${fun_eq}(v, res[0][0].k)` : 'v.equals(res[0][0].k)'}, "Invalid Value")`
  };
  iterate_on_comparable_types(kind, generate_type_asset_key_2, new iter_settings(gen_it))
})

describe('Generate binding type parameter', async () => {
  const kind = 'parameter';
  const generate_type_parameter = async (item: item) => {
    const content_arl: string =
      `/* DO NOT EDIT, GENERATED FILE */
archetype type_${kind}_${item.get_name()}(res : ${item.type})
${item.get_decl() ? '\n' + item.get_decl() + '\n' : ''}
entry asset_add(i : ${item.type}) {
  res := i
}
`
    await generate_type_gen(kind, content_arl, item);
  }
  const gen_it = (item: item): string => {
    const name = item.get_name();
    const prefix = `type_${kind}_${name}`;
    const ts_type = process_prefix(prefix, item.ts_type);
    const ts_value = process_prefix(prefix, item.ts_value);
    const fun_eq = process_prefix(prefix, item.get_fun_eq());

    return `const v : ${ts_type} = ${ts_value};
    await ${prefix}.${prefix}.deploy(v, { as: alice });
    const res = await ${prefix}.${prefix}.get_res();
    assert(${fun_eq != null ? `${fun_eq}(v, res)` : 'v.equals(res)'}, "Invalid Value")`
  };
  const SKIP = ['enum_simple', 'record_1_field', 'record_2_fields', 'record_3_fields', 'record_4_fields', 'record_4_fields_custom'];
  iterate_on_types(kind, generate_type_parameter, new iter_settings(gen_it), SKIP)
})

describe('Generate binding type getter', async () => {
  const kind = 'getter';
  const generate_type_getter = async (item: item) => {
    const content_arl: string =
      `/* DO NOT EDIT, GENERATED FILE */
archetype type_${kind}_${item.get_name()}
${item.get_decl() ? '\n' + item.get_decl() + '\n' : ''}
variable res : ${item.type} = ${item.value}

getter get_value(i : ${item.type}) : ${item.type} {
  res := i;
  return res
}
`
    await generate_type_gen(kind, content_arl, item);
  }
  const gen_it = (item: item): string => {
    const name = item.get_name();
    const prefix = `type_${kind}_${name}`;
    const ts_type = process_prefix(prefix, item.ts_type);
    const ts_value = process_prefix(prefix, item.ts_value);
    const fun_eq = process_prefix(prefix, item.get_fun_eq());

    return `const v : ${ts_type} = ${ts_value};
    await ${prefix}.${prefix}.deploy({ as: alice });
    const res = await ${prefix}.${prefix}.get_value(v, { as: alice });
    const s = await ${prefix}.${prefix}.get_res();
    assert(${fun_eq != null ? `${fun_eq}(v, res)` : 'v.equals(res)'}, "Invalid Value");
    assert(${fun_eq != null ? `${fun_eq}(v, s)` : 'v.equals(s)'}, "Invalid Value");`
  };
  iterate_on_types(kind, generate_type_getter, new iter_settings(gen_it))
})

describe('Generate binding type view', async () => {
  const kind = 'view';
  const generate_type_view = async (item: item) => {
    const content_arl: string =
      `/* DO NOT EDIT, GENERATED FILE */
archetype type_${kind}_${item.get_name()}
${item.get_decl() ? '\n' + item.get_decl() + '\n' : ''}
view get_value(i : ${item.type}) : ${item.type} {
  return i
}
`
    await generate_type_gen(kind, content_arl, item);
  }
  const gen_it = (item: item): string => {
    const name = item.get_name();
    const prefix = `type_${kind}_${name}`;
    const ts_type = process_prefix(prefix, item.ts_type);
    const ts_value = process_prefix(prefix, item.ts_value);
    const fun_eq = process_prefix(prefix, item.get_fun_eq());

    return `const v : ${ts_type} = ${ts_value};
    await ${prefix}.${prefix}.deploy({ as: alice });
    const res = await ${prefix}.${prefix}.view_get_value(v, { as: alice });
    assert(${fun_eq != null ? `${fun_eq}(v, res)` : 'v.equals(res)'}, "Invalid Value")`
  };
  iterate_on_types(kind, generate_type_view, new iter_settings(gen_it))
})

// describe('Generate binding extra asset', async () => {
//   const kind = 'extra_asset';
//   const generate_type_simple = async (item: item) => {
//     const content_arl: string =
//       `/* DO NOT EDIT, GENERATED FILE */
// archetype type_${kind}_${item.get_name()}
// ${item.get_decl() ? '\n' + item.get_decl() + '\n' : ''}
// entry set_value(i : ${item.type}) { }
// `;
//     await generate_type_gen(kind, content_arl, item);
//   }
//   const gen_it = (item: item): string => {
//     const name = item.get_name();
//     const prefix = `type_${kind}_${name}`;
//     const ts_type = process_prefix(prefix, item.ts_type);
//     const ts_value = process_prefix(prefix, item.ts_value);
//     // const fun_eq = process_prefix(prefix, item.get_fun_eq());

//     return `const v : ${ts_type} = ${ts_value};
//     await ${prefix}.${prefix}.deploy({ as: alice });
//     await ${prefix}.${prefix}.set_value(v, { as: alice })`
//   };
//   iterate_on_asset_types(kind, generate_type_simple, new iter_settings(gen_it))
// })

describe('Abstract type', async () => {
  // enum
  // event
  // record
  // state
})

describe('Asset type', async () => {
  // aggregate
  // asset
  // asset_container
  // asset_key
  // asset_value
  // asset_view
  // collection
  // partition
})

describe('Other type', async () => {
  // lambda
  // never
  // operation
})
