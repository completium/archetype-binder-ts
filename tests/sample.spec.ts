import { expect_to_fail, get_account, set_mockup, set_mockup_now, set_quiet } from '@completium/experiment-ts'
import { Address, Bytes, Duration, Int, Nat, Option, Rational, Tez, Ticket } from '@completium/archetype-ts-types'

const assert = require('assert')

import { sample_tuple_tuple_rational } from './contracts/bindings/sample_tuple_tuple_rational'

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

describe('[Tuple_tuple_rational] Contract deployment', async () => {
  it('Deploy Tuple_tuple_rational', async () => {
    await sample_tuple_tuple_rational.deploy({ as: alice })
    const v = sample_tuple_tuple_rational.get_v();
    assert(v[0].equals(new Nat(0)))
    assert(v[0][0] == "mystr")
    assert(v[0][1].equals(new Rational(0.1)))
  });
})
