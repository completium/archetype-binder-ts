import { expect_to_fail, get_account, set_mockup, set_mockup_now, set_quiet } from '@completium/experiment-ts'
import { Address, Bytes, Duration, Int, Nat, Option, Rational, Tez, Ticket } from '@completium/archetype-ts-types'

const assert = require('assert')

import { sample_storage_variables } from './contracts/bindings/sample_storage_variables'
import { sample_tuple_tuple_rational } from './contracts/bindings/sample_tuple_tuple_rational'

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

describe('Sample', async () => {
  it('Storage_variables', async () => {
    await sample_storage_variables.deploy({ as: alice })
    const n = await sample_storage_variables.get_n();
    const s = await sample_storage_variables.get_s();
    const r = await sample_storage_variables.get_r();
    assert(n.equals(new Nat(0)))
    assert(s == "mystr")
    assert(r.equals(new Rational(0.1)))
  });

  it('Tuple_tuple_rational', async () => {
    await sample_tuple_tuple_rational.deploy({ as: alice })
    const v = await sample_tuple_tuple_rational.get_v();
    assert(v[0].equals(new Nat(0)))
    assert(v[1][0] == "mystr")
    assert(v[1][1].equals(new Rational(0.1)))
  });
})
