import { expect_to_fail, get_account, set_mockup, set_mockup_now, set_quiet } from '@completium/experiment-ts'
import { Address, Bytes, Duration, Int, Nat, Option, Rational, Tez } from '@completium/archetype-ts-types'

const assert = require('assert')

import {
  test_big_record,
  all,
  visitor_2_container,
  visitor_2_value,
  B,
  anenum_types
} from './contracts/bindings/test_big_record'

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

const r_value = new all(
  new Nat(14),
  new Int(-12),
  new Tez(12334, "mutez"),
  new Rational(0.456),
  true,
  new Bytes("0000"),
  "a string value",
  new Date(),
  new Duration("0"),
  new Address(alice.pkh),
  new Option<Nat>(new Nat(4)),
  [ "an list element" ],
  [ ["a tuple set element", new Nat(7), new Int(9) ],
    ["another tuple set element", new Nat(8), new Int(10)]
  ]
)

const l_value = [ new Int(2), new Int(4), new Int(6) ]

const l1_value = [ r_value, r_value ]

const l2_value = [ l1_value ]

const m_value : Array<[ Nat, [ string, Int ] ]> = [ [ new Nat(3), [ "test", new Int(5) ] ] ]

const s1_value = [ new Nat(3), new Nat(4), new Nat(5) ]

const v_value : Array<[ Address, Nat ]> = [ [ new Address(alice.pkh), new Nat(1) ] ]

const v_2_value = new visitor_2_value(new Nat(1), new Date())

const visitor_2_container : visitor_2_container = [ [ new Address(alice.pkh), v_2_value ] ]

const just_a_key_container : Address[] = [ new Address(alice.pkh) ]

/* Scenario ---------------------------------------------------------------- */

describe('[test_big_record] Contract deployment', async () => {
  it('Deploy test_big_record', async () => {
    await test_big_record.deploy(new Address(alice.pkh), new Option<Address>(new Address(alice.pkh)), { as: alice })
  });
})

describe('[test_big_record] Call entry', async () => {
  it("Call 'myentry'", async () => {
    await test_big_record.myentry(r_value, { as : alice })
  })
  it("Test 's' int value getter", async () => {
    const s = await test_big_record.get_s();
    assert(s.equals(new Int(2)))
  })
  it("Test 'r' value record getter", async () => {
    const r = await test_big_record.get_r();
    assert(r_value.equals(r))
  })
  it("Test 'l' value list of int getter", async () => {
    const l = await test_big_record.get_l();
    assert(l.length == l_value.length)
    for (let i = 0; i < l.length; i++) {
      assert(l[i].equals(l_value[i]))
    }
  })
  it("Test 'l1' value list of record 'all' getter", async () => {
    const l1 = await test_big_record.get_l1();
    assert(l1.length == l1_value.length)
    for (let i = 0; i < l1.length; i++) {
      assert(l1[i].equals(l1_value[i]))
    }
  })
  it("Test 'l2' value list of list of record 'all' getter", async () => {
    const l2 = await test_big_record.get_l2();
    assert(l2.length == l2_value.length)
    for (let j = 0; j < l2.length; j++) {
      for (let i = 0; i < l2[j].length; i++) {
        assert(l2[j][i].equals(l2_value[j][i]))
      }
    }
  })
  it("Test 'm' value map of nat to pair of string int getter", async () => {
    const m = await test_big_record.get_m();
    assert(m.length == m_value.length)
    for (let i = 0; i < m.length; i++) {
      assert(m[i][0].equals(m_value[i][0]))
      assert(m[i][1][0] == m_value[i][1][0])
      assert(m[i][1][1].equals(m_value[i][1][1]))
    }
  })
  it("Test 's1' value set of nat getter", async () => {
    const s1 = await test_big_record.get_s1()
    assert(s1.length == s1_value.length)
    for (let i = 0; i < s1.length; i++) {
      assert(s1[i].equals(s1_value[i]))
    }
  })
  it("Test 'visitor' one field asset value getter", async () => {
    const v = await test_big_record.get_visitor()
    assert(v.length == v_value.length)
    for (let i = 0; i < v.length; i++) {
      assert(v[i][0].equals(v_value[i][0]))
      assert(v[i][1].equals(v_value[i][1]))
    }
  })
  it("Test 'visitor2' several fields asset value getter", async () => {
    const v = await test_big_record.get_visitor_2()
    assert(v.length == visitor_2_container.length)
    for (let i = 0; i < v.length; i++) {
      assert(v[i][0].equals(visitor_2_container[i][0]))
      assert(v[i][1].equals(v_2_value))
    }
  })
  it("Test 'just_a_key' one key field asset getter", async () => {
    const v = await test_big_record.get_just_a_key()
    assert(v.length == just_a_key_container.length)
    for (let i = 0; i < v.length; i++) {
      assert(v[i].equals(just_a_key_container[i]))
    }
  })
  it("Call to entry 2 should fail with INVALID_CALLER", async () => {
    await expect_to_fail(async () => {
      await test_big_record.myentry2([ new Nat(0), "an argument" ], { as : bob })
    }, test_big_record.errors.INVALID_CALLER)
  })
  it("Call to entry 2 should fail with NOT_TO_BE_CALLED", async () => {
    await expect_to_fail(async () => {
      await test_big_record.myentry2([ new Nat(20), "an argument" ], { as : alice })
    }, test_big_record.errors.NOT_TO_BE_CALLED)
  })
  it("Call to entry 3 to set enum value", async () => {
    await test_big_record.myentry3(new B([new Nat(3), "an arg value"]), { as : alice })
    const a_value = (await test_big_record.get_a_value() as B)
    assert(a_value.type() == anenum_types.B)
    assert(a_value.get()[0].equals(new Nat(3)))
    assert(a_value.get()[1] == "an arg value")
  })
  //it("Call to getter that returns an anenum value", async () => {
  //  const value = await test_big_record.mygetter({ as : alice });
  //  assert(value.type() == anenum_types.B)
  //})
})