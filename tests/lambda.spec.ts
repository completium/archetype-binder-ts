import { expect_to_fail, get_account, set_mockup, set_mockup_now, set_quiet } from '@completium/experiment-ts'
import { Address, Bytes, Duration, Int, Micheline, Nat, Option, Rational, Tez, Ticket } from '@completium/archetype-ts-types'

const assert = require('assert')

import { sample_lambda } from './contracts/bindings/sample_lambda'

/* Accounts ---------------------------------------------------------------- */

const alice = get_account('alice');
const bob   = get_account('bob')

/* Endpoint ---------------------------------------------------------------- */

set_mockup()

/* Verbose mode ------------------------------------------------------------ */

set_quiet(true);

/* Now --------------------------------------------------------------------- */

set_mockup_now(new Date(Date.now()))

/* Scenario ---------------------------------------------------------------- */

describe('[Lambda] Contract deployment', async () => {
  it('Deploy', async () => {
    await sample_lambda.deploy({ as: alice })
  });
})

describe('[Lambda] Check storage value', async () => {
  it("Get `lambda`", async () => {
    const ref : Micheline = [[{prim: "DUP"}, {prim: "SIZE"}, {prim:"DIP", args:[[{prim:"DROP"}]]}]];
    const l = await sample_lambda.get_l()
    assert(JSON.stringify(ref, null, 2) == JSON.stringify(l, null, 2), "Invalid value");
  })
})

describe('[Lambda] Call entry `exec`', async () => {
  it("Call 'exec'", async () => {
    const i_before =  await sample_lambda.get_i()
    assert(i_before.equals(new Nat(0)), "Invalid value");
    await sample_lambda.exec({ as: alice });
    const i_after =  await sample_lambda.get_i()
    assert(i_after.equals(new Nat(5)), "Invalid value");
  })

  it("Call 'set_l'", async () => {
    const michelson : Micheline = [{prim: "DROP"}, {prim:"PUSH", args:[{prim:"nat"}, {int:"2"}]}];
    await sample_lambda.set_l(michelson, { as: alice });
    await sample_lambda.exec({ as: alice });
    const i =  await sample_lambda.get_i()
    assert(i.equals(new Nat(2)), "Invalid value");
  })

})