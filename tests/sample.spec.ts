import { expect_to_fail, get_account, set_mockup, set_mockup_now, set_quiet } from '@completium/experiment-ts'
import { Address, Bytes, Duration, Int, Micheline, Nat, Option, Or, Rational, Tez, Ticket } from '@completium/archetype-ts-types'

const assert = require('assert')

import { sample_asset_iterable_big_map } from './contracts/bindings/sample_asset_iterable_big_map'
import { sample_big_map } from './contracts/bindings/sample_big_map'
import { sample_custom_args_with_record, my_arg } from './contracts/bindings/sample_custom_args_with_record'
import { sample_iterable_big_map } from './contracts/bindings/sample_iterable_big_map'
import { sample_never } from './contracts/bindings/sample_never'
import { sample_storage_variables } from './contracts/bindings/sample_storage_variables'
import { sample_tuple_tuple_rational } from './contracts/bindings/sample_tuple_tuple_rational'
import { sample_view } from './contracts/bindings/sample_view'
import * as sample_event_multi from './contracts/bindings/sample_event_multi'

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

  it('Asset iterable_big_map', async () => {
    await sample_asset_iterable_big_map.deploy({ as: alice })
    const id0_my_asset_before = await sample_asset_iterable_big_map.get_my_asset_value("id0")
    assert(id0_my_asset_before?.equals(new Nat(0)))
    const id1_my_asset_before = await sample_asset_iterable_big_map.get_my_asset_value("id1")
    assert(id1_my_asset_before?.equals(new Nat(1)))
    const id2_my_asset_before = await sample_asset_iterable_big_map.get_my_asset_value("id2")
    assert(id2_my_asset_before?.equals(new Nat(2)))
    const id3_my_asset_before = await sample_asset_iterable_big_map.get_my_asset_value("id3")
    assert(id3_my_asset_before === undefined)
    await sample_asset_iterable_big_map.exec({ as: alice })
    const id0_my_asset_after = await sample_asset_iterable_big_map.get_my_asset_value("id0")
    assert(id0_my_asset_after?.equals(new Nat(0)))
    const id1_my_asset_after = await sample_asset_iterable_big_map.get_my_asset_value("id1")
    assert(id1_my_asset_after?.equals(new Nat(1)))
    const id2_my_asset_after = await sample_asset_iterable_big_map.get_my_asset_value("id2")
    assert(id2_my_asset_after?.equals(new Nat(2)))
    const id3_my_asset_after = await sample_asset_iterable_big_map.get_my_asset_value("id3")
    assert(id3_my_asset_after?.equals(new Nat(3)))
  })


  // it('Sample_custom_args_with_record', async () => {
  //   await sample_custom_args_with_record.deploy({ as: alice })

  //   const res_before = await sample_custom_args_with_record.get_res();
  //   assert(res_before.equals(new Nat(0)))
  //   await sample_custom_args_with_record.exec(new my_arg(new Int(1), new Nat(2), alice.get_address()), {as : alice})
  //   const res_after = await sample_custom_args_with_record.get_res();
  //   assert(res_after.equals(new Nat(2)))
  // });

  it('Event_multi', async () => {
    await sample_event_multi.sample_event_multi.deploy({ as: alice })

    const e1 = new sample_event_multi.e1(new Nat(1) );
    const op1 = await sample_event_multi.sample_event_multi.entry_1(e1, {as : alice})
    assert (op1.events.length == 1)
    const actual1 = sample_event_multi.e1.from_mich(op1.events[0].payload);
    assert (e1.equals(actual1), "ERROR e1")

    const e2 = new sample_event_multi.e2(new Nat(1), "mystr" );
    const op2 = await sample_event_multi.sample_event_multi.entry_2(e2, {as : alice})
    assert (op2.events.length == 1)
    const actual2 = sample_event_multi.e2.from_mich(op2.events[0].payload);
    assert (e2.equals(actual2), "ERROR e2")

    const e3 = new sample_event_multi.e3(new Nat(1), "mystr", new Bytes ("02") );
    const op3 = await sample_event_multi.sample_event_multi.entry_3(e3, {as : alice})
    assert (op3.events.length == 1)
    const actual3 = sample_event_multi.e3.from_mich(op3.events[0].payload);
    assert (e3.equals(actual3), "ERROR e3")

    const e4 = new sample_event_multi.e4(new Nat(1), "mystr", new Bytes ("02"), new Int(3) );
    const op4 = await sample_event_multi.sample_event_multi.entry_4(e4, {as : alice})
    assert (op4.events.length == 1)
    const actual4 = sample_event_multi.e4.from_mich(op4.events[0].payload);
    assert (e4.equals(actual4), "ERROR e4")

    const e5 = new sample_event_multi.e5(new Nat(1), "mystr", new Bytes ("02"), new Int(3), alice.get_address() );
    const op5 = await sample_event_multi.sample_event_multi.entry_5(e5, {as : alice})
    assert (op5.events.length == 1)
    const actual5 = sample_event_multi.e5.from_mich(op5.events[0].payload);
    assert (e5.equals(actual5), "ERROR e5")

    const e6 = new sample_event_multi.e6(new Nat(1), "mystr", new Bytes ("02"), new Int(3), alice.get_address(), alice.get_public_key() );
    const op6 = await sample_event_multi.sample_event_multi.entry_6(e6, {as : alice})
    assert (op6.events.length == 1)
    const actual6 = sample_event_multi.e6.from_mich(op6.events[0].payload);
    assert (e6.equals(actual6), "ERROR e6")
  })
})
