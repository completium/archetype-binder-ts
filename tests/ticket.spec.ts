import { expect_to_fail, get_account, set_mockup, set_mockup_now, set_quiet } from '@completium/experiment-ts'
import { Address, Bytes, Duration, Int, Nat, Option, Rational, Tez, Ticket } from '@completium/archetype-ts-types'

const assert = require('assert')

import { sample_ticket } from './contracts/bindings/sample_ticket'

/* Accounts ---------------------------------------------------------------- */

const alice = get_account('alice');
const bob   = get_account('bob')

/* Endpoint ---------------------------------------------------------------- */

set_mockup()

/* Verbose mode ------------------------------------------------------------ */

set_quiet(true);

/* Scenario ---------------------------------------------------------------- */

describe('[Ticket] Contract deployment', async () => {
  it('Deploy Ticket', async () => {
    await sample_ticket.deploy({ as: alice })
  });
})

describe('[Ticket] Call entry `create`', async () => {
  it("Call 'create'", async () => {
    const ticket_ref : Ticket<string> = new Ticket(sample_ticket.get_address(), ("info" as string), new Nat(1));
    await sample_ticket.create({as : alice});
    const ticket_actual = await sample_ticket.get_my_ticket();
    const ta = ticket_actual.get();
    assert(ticket_ref.equals(ta), "Invalid value")
  })

})