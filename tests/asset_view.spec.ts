import { expect_to_fail, get_account, set_mockup, set_mockup_now, set_quiet } from '@completium/experiment-ts'
import { Address, Bytes, Duration, Int, Nat, Option, Rational, Tez, Ticket } from '@completium/archetype-ts-types'

const assert = require('assert')

import { Sample_asset_view, sample_asset_view } from './contracts/bindings/sample_asset_view'

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

describe('[asset_view] Contract deployment', async () => {
  it('Deploy asset_view', async () => {
    await sample_asset_view.deploy({ as: alice })
  });
})

describe('[asset_view] Call entry `exec`', async () => {
  it("Call entry 'exec'", async () => {
    const before = await sample_asset_view.get_res();
    assert(before.length == 0)
    const v: Array<Nat> = [new Nat(0)]
    await sample_asset_view.exec(v, { as: alice })
    const after = await sample_asset_view.get_res();
    assert(after.length == 1 && after[0].equals(v[0]))
  })

  it("Call getter 'my_getter'", async () => {
    const ref: Array<Nat> = [new Nat(0), new Nat(2)]
    const res = await sample_asset_view.my_getter({ as: alice })
    assert(res.length == 2 && res[0].equals(ref[0]) && res[1].equals(ref[1]))
  })

  it("Call view 'my_view'", async () => {
    const ref: Array<Nat> = [new Nat(0), new Nat(2)]
    const res = await sample_asset_view.view_my_view({ as: alice })
    assert(res.length == 2 && res[0].equals(ref[0]) && res[1].equals(ref[1]))
  })
})