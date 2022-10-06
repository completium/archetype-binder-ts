import * as ex from "@completium/experiment-ts";
import { Nat, Bytes, Int } from "@completium/archetype-ts-types";

import { big_map } from './binding/big_map'

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

describe('[BIG_MAP] Contract deployment', async () => {
  it('Deploy test_binding', async () => {
    await big_map.deploy({ as: alice })
  });
})

describe('[BIG_MAP] Call entry', async () => {
  it("Call 'set_value'", async () => {
    const item : Int = new Int(2);
    await big_map.set_value(item, {as: alice})
    const res = await big_map.get_res_value(new Nat(0));
    assert(res?.equals(item), "Invalid Value")
  })
})
