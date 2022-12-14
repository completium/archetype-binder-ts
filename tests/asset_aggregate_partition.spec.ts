import { get_account, set_mockup, set_mockup_now, set_quiet } from '@completium/experiment-ts'
import { Address, Bytes, Duration, Int, Nat, Option, Rational, Tez, Ticket } from '@completium/archetype-ts-types'

const assert = require('assert')

import { sample_asset_aggregate_partition } from './contracts/bindings/sample_asset_aggregate_partition'

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

describe('[asset_aggregate_partition] Contract deployment', async () => {
  it('Deploy asset_aggregate_partition', async () => {
    await sample_asset_aggregate_partition.deploy({ as: alice })
  });
})

describe('[asset_aggregate_partition] Call entry', async () => {
  it("Call entry 'add_aggregate'", async () => {
    const before = await sample_asset_aggregate_partition.get_my_asset();
    assert(before.length == 1 && before[0][1].a.length == 0)
    const k = new Nat(1);
    const v = new Bytes("02")
    await sample_asset_aggregate_partition.add_aggregate(k, v, { as: alice })
    const after = await sample_asset_aggregate_partition.get_my_asset()
    assert(after.length == 1 && after[0][1].a.length == 1 && after[0][1].a[0].equals(k))
  })

  it("Call entry 'add_partition'", async () => {
    const before = await sample_asset_aggregate_partition.get_my_asset();
    assert(before.length == 1 && before[0][1].p.length == 0)
    const k = new Nat(2);
    const v = "mystr"
    await sample_asset_aggregate_partition.add_partition(k, v, { as: alice })
    const after = await sample_asset_aggregate_partition.get_my_asset()
    assert(after.length == 1 && after[0][1].p.length == 1 && after[0][1].p[0].equals(k))
  })
})
