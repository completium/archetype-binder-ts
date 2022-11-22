import { expect_to_fail, get_account, set_mockup, set_mockup_now, set_quiet } from '@completium/experiment-ts'
import { Address, Bytes, Duration, Int, Nat, Option, Rational, Tez } from '@completium/archetype-ts-types'

const assert = require('assert')

import {
  path_storage
} from './contracts/bindings/path_storage'
/* Accounts ---------------------------------------------------------------- */

const alice = get_account('alice');
const bob   = get_account('bob')

/* Endpoint ---------------------------------------------------------------- */

set_mockup()

/* Verbose mode ------------------------------------------------------------ */

set_quiet(true);

/* Now --------------------------------------------------------------------- */

set_mockup_now(new Date(Date.now()))

/* Test data --------------------------------------------------------------- */

const c_ref = [new Int(3), new Int(4), new Int(5)]
const b_ref = [new Int(1), new Int(2)]

/* Scenario ---------------------------------------------------------------- */

describe('[test_big_record] Contract deployment', async () => {
  it('Deploy test_big_record', async () => {
    await path_storage.deploy({ as: alice })
  });
})

describe('[test_big_record] Call entry', async () => {
  it("Call 'get_a'", async () => {
    const a = await path_storage.get_a()
    assert(a.equals(new Int(0)))
  })
  it("Call 'get_b'", async () => {
    const b = await path_storage.get_b();
    assert(b.length == b_ref.length)
    assert(b.every((e,i) => e.equals(b_ref[i])))
  })
  it("Call 'get_c'", async () => {
    const c = await path_storage.get_c();
    assert(c.length == c_ref.length)
    assert(c.every((e,i) => e.equals(c_ref[i])))
  })
})