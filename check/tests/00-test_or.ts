import * as ex from "@completium/experiment-ts";
import { Nat, Bytes } from "@completium/archetype-ts-types";

import { map } from './binding/map'

const assert = require('assert')

/* Accounts ---------------------------------------------------------------- */

const alice = ex.get_account('alice');

/* Endpoint ---------------------------------------------------------------- */

ex.set_mockup()

/* Verbose mode ------------------------------------------------------------ */

ex.set_quiet(true);

/* Now --------------------------------------------------------------------- */

ex.set_mockup_now(new Date(Date.now()))

/* Scenario ---------------------------------------------------------------- */

describe('[MAP] Contract deployment', async () => {
  it('Deploy test_binding', async () => {
    await map.deploy({ as: alice })
  });
})

describe('[MAP] Call entry', async () => {
  it("Call 'set_value'", async () => {
    const item : [ Nat, string ] = [new Nat(0), "mystr"];
    const v : Array<[ Nat, string ]> = [item];
    await map.set_value(v, { as: alice })
    const res = await map.get_res()
    assert(res.length == 1 && res[0][0].equals(item[0]) && res[0][1] == item[1], "Invalid Value")

    // const res_before = await map.get_res()
    // assert(res_before[0].equals(new Nat(0)) && res_before[1] == "" && res_before[2].equals(new Bytes("")), "Invalid Value")
    // const v: [Nat, string, Bytes] = [new Nat(2), "toto", new Bytes("ff")];
    // await tuple.set_value(v, { as: alice })
    // const res = await tuple.get_res()
    // assert(res[0].equals(v[0]) && res[1] == v[1] && res[2].equals(v[2]), "Invalid Value")
  })
})
