import { expect_to_fail, get_account, set_mockup, set_mockup_now, set_quiet } from '@completium/experiment-ts'
import { Address, Bytes, Duration, Int, Nat, Option, Rational, Tez, Ticket } from '@completium/archetype-ts-types'

const assert = require('assert')

import { sample_state, states } from './contracts/bindings/sample_state'

/* Accounts ---------------------------------------------------------------- */

const alice = get_account('alice');
const bob = get_account('bob')

/* Endpoint ---------------------------------------------------------------- */

set_mockup()

/* Verbose mode ------------------------------------------------------------ */

set_quiet(true);

/* Now --------------------------------------------------------------------- */

set_mockup_now(new Date(Date.now()))

/* Scenario ---------------------------------------------------------------- */

describe('[state] Contract deployment', async () => {
  it('Deploy state', async () => {
    await sample_state.deploy({ as: alice })
  });
})

describe('[state] Call entry `exec`', async () => {
  it("Call entry 'exec'", async () => {
    const before = await sample_state.get_state()
    assert(before == states.First)
    await sample_state.exec({ as: alice })
    const after = await sample_state.get_state()
    assert(after == states.Second)
  })
})