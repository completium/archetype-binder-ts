import { exec_batch, get_account, set_mockup, set_mockup_now, set_quiet } from '@completium/experiment-ts'
import { Nat } from '@completium/archetype-ts-types'

import assert from 'assert'

import { sample_event, e_event } from './contracts/bindings/sample_event'

/* Accounts ---------------------------------------------------------------- */

const alice = get_account('alice')

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
  it("Call", async () => {
    const event = new e_event(new Nat(2), "mystr")
    const res = await sample_event.exec(event, {as : alice});
    assert(res.events.length == 1)
    const payload = res.events[0].payload;
    const res_event = e_event.from_mich(payload);
    assert(res_event.equals(event))
  })

  it("Batched call", async () => {
    const event = new e_event(new Nat(2), "mystr")
    const param = await sample_event.get_exec_param(event, { as: alice });
    const params = [param, param, param];
    const res = await exec_batch(params, { as: alice })

    assert(res.events.length == 3)
    const events = res.events.map(x => { return e_event.from_mich(x.payload) })
    events.forEach(res_event => {
      assert(res_event.equals(event))
    })

  })

})
