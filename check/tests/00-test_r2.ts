import * as ex from "@completium/experiment-ts";
import { Nat, Bytes } from "@completium/archetype-ts-types";

import { record_2, r2 } from './binding/record_2'

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

describe('[R2] Contract deployment', async () => {
  it('Deploy test_binding', async () => {
    await record_2.deploy({ as: alice })
  });
})

describe('[R2] Call entry', async () => {
  it("Call 'set_value'", async () => {
    const v = new r2(new Nat(0), "mystr");
    await record_2.set_value(v, { as: alice })
    const res = await record_2.get_res()
    assert(res.equals(v), "Invalid Value")
  })
})
