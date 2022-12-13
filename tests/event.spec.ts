import { expect_to_fail, get_account, set_mockup, set_mockup_now, set_quiet } from '@completium/experiment-ts'
import { Address, Bytes, Duration, Int, Nat, Option, Rational, Tez, Ticket } from '@completium/archetype-ts-types'

const assert = require('assert')

import { sample_event, e_event } from './contracts/bindings/sample_event'

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

describe('[Event] Contract deployment', async () => {
  it('Deploy Event', async () => {
    await sample_event.deploy({ as: alice })
  });
})

describe('[Event] Call entry `exec`', async () => {
  it("Call 'exec'", async () => {
    const event = new e_event(new Nat(2), "mystr")
    await sample_event.exec(event, {as : alice});
  })

})