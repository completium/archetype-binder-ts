import { expect_to_fail, get_account, set_mockup, set_mockup_now, set_quiet } from '@completium/experiment-ts'
import { Address, Bytes, Duration, Int, Micheline, Nat, Option, Or, Rational, Tez, Ticket } from '@completium/archetype-ts-types'

const assert = require('assert')

import { sample_big_map } from './contracts/bindings/sample_big_map'
import { sample_iterable_big_map } from './contracts/bindings/sample_iterable_big_map'
import { sample_never } from './contracts/bindings/sample_never'
import { sample_storage_variables } from './contracts/bindings/sample_storage_variables'
import { sample_tuple_tuple_rational } from './contracts/bindings/sample_tuple_tuple_rational'
import { sample_view } from './contracts/bindings/sample_view'

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

  it('Never', async () => {
    await sample_never.deploy({ as: alice })
    const v = await sample_never.get_res()
    assert(v.equals(Or.Right<Micheline, Nat>(new Nat(1))))
  });

  it('Big_map', async () => {
    const k: Int = new Int(2)
    const v: Bytes = new Bytes("06")

    await sample_big_map.deploy({ as: alice })
    const before_has_v_value = await sample_big_map.has_v_value(k);
    assert(!before_has_v_value)

    await sample_big_map.exec(k, v, { as: alice })

    const after_has_v_value = await sample_big_map.has_v_value(k);
    const actual_value = await sample_big_map.get_v_value(k)
    assert(after_has_v_value)
    assert(actual_value?.equals(v))
  });

  it('View', async () => {
    const even: Nat = new Nat(2)
    const odd: Nat = new Nat(3)

    await sample_view.deploy({as: alice})

    const res_even = await sample_view.view_my_view(even, {as: alice});
    assert(res_even?.equals(even))

    const res_odd = await sample_view.view_my_view(odd, {as: alice});
    assert(res_odd == undefined)
  })

  it('Iterable_big_map', async () => {
    const k: Int = new Int(2)
    const v: Bytes = new Bytes("06")

    await sample_iterable_big_map.deploy({ as: alice })
    const before_has_v_value = await sample_iterable_big_map.has_v_value(k);
    assert(!before_has_v_value)

    await sample_iterable_big_map.exec(k, v, { as: alice })

    const after_has_v_value = await sample_iterable_big_map.has_v_value(k);
    const actual_value = await sample_iterable_big_map.get_v_value(k)
    assert(after_has_v_value)
    assert(actual_value?.equals(v))
  });
})
