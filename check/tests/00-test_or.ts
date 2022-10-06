import * as ex from "@completium/experiment-ts";
import { Nat, Or, Bytes } from "@completium/archetype-ts-types";

import { or } from './binding/or'

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

describe('[OR] Contract deployment', async () => {
  it('Deploy test_binding', async () => {
    await or.deploy({ as: alice })
  });
})

describe('[OR] Call entry', async () => {
  it("Call 'set_value'", async () => {
    const v : Or<Nat, string> = Or.Left(new Nat(2));;
    const before = await or.get_res()
    assert(before.equals(Or.Right<Nat, string>("")), "before");
    await or.set_value(v, { as: alice })
    const res = await or.get_res()
    assert(res.equals(v), "after");
  })
})
