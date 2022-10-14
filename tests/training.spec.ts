import { Nat, Tez } from '@completium/archetype-ts-types';
import { expect_to_fail, get_account, set_mockup, set_quiet } from '@completium/experiment-ts';

import { training_account } from './contracts/bindings/training_account'
import { training_addnumber } from './contracts/bindings/training_addnumber'
import { training_charity } from './contracts/bindings/training_charity'
import { training_counter_two_numbers } from './contracts/bindings/training_counter_two_numbers'
import { training_counter } from './contracts/bindings/training_counter'
import { training_storevalue } from './contracts/bindings/training_storevalue'
import { training_visitors, visitor_value } from './contracts/bindings/training_visitors'

const assert = require('assert')

const alice = get_account('alice')
const bob = get_account('bob')
const carl = get_account('carl')

/* Verbose mode ------------------------------------------------------------ */

set_quiet(true);

/* Endpoint ---------------------------------------------------------------- */

set_mockup()

/* Functions --------------------------------------------------------------- */

describe('Training', async () => {
  describe('training_account', async () => {

  });

  describe('training_addnumber', async () => {
    describe('[ADDNUMBER] Contract deployment', async () => {
      it('Deploy test_binding', async () => {
        await training_addnumber.deploy({ as: alice })
      });
    })

    describe('[ADDNUMBER] Call entry', async () => {
      it("Call 'increment'", async () => {
        const s_before = await training_addnumber.get_count()
        assert(s_before.equals(new Nat(2)))
        await training_addnumber.increment(new Nat(5), { as: alice })
        const s_after = await training_addnumber.get_count()
        assert(s_after.equals(new Nat(7)))
      })
    })
  });

  describe('training_charity', async () => {
    describe('[CHARITY] Contract deployment', async () => {
      it('Deploy charity', async () => {
        await training_charity.deploy(alice.get_address(), { as: alice })
      });
    })

    describe('[CHARITY] Call donate', async () => {
      it("Call 'donate' with 10 tz as carl", async () => {
        const b_before = await training_charity.get_balance()
        await training_charity.donate({ as: carl, amount: new Tez(10) })
        const b_after = await training_charity.get_balance()
        assert(b_before.plus(new Tez(10)).equals(b_after))
      })
      it("Call 'donate' with 5 tz as bob", async () => {
        const b_before = await training_charity.get_balance()
        await training_charity.donate({ as: bob, amount: new Tez(5) })
        const b_after = await training_charity.get_balance()
        assert(b_before.plus(new Tez(5)).equals(b_after))
      })
    })
    describe('[CHARITY] Call collect', async () => {
      it("Call 'collect' as carl should fail", async () => {
        expect_to_fail(async () => {
          await training_charity.collect(new Tez(15), { as: carl })
        }, training_charity.errors.INVALID_CALLER)
      })
      it("Call 'collect' with large amount should fail", async () => {
        expect_to_fail(async () => {
          await training_charity.collect(new Tez(500), { as: alice })
        }, training_charity.errors.r1)
      })
      it("Call 'collect'", async () => {
        await training_charity.collect(new Tez(15), { as: alice })
        const b_final = await training_charity.get_balance()
        assert(b_final.equals(new Tez(0)))
      })
    })
  });

  describe('training_counter_two_numbers', async () => {
    describe('[COUNTER_TWO_NUMBERS] Contract deployment', async () => {
      it('Deploy test_binding', async () => {
        await training_counter_two_numbers.deploy({ as: alice })
      });
    })

    describe('[COUNTER_TWO_NUMBERS] Call entry', async () => {
      it("Call 'myentry'", async () => {
        const v1_before = await training_counter_two_numbers.get_v1()
        assert(v1_before.equals(new Nat(6)))
        const v2_before = await training_counter_two_numbers.get_v2()
        assert(v2_before.equals(new Nat(7)))
        await training_counter_two_numbers.incrementBoth(new Nat(3), new Nat(4), { as: alice })
        const v1_after = await training_counter_two_numbers.get_v1()
        assert(v1_after.equals(new Nat(9)))
        const v2_after = await training_counter_two_numbers.get_v2()
        assert(v2_after.equals(new Nat(11)))
      })
    })
  });

  describe('training_counter', async () => {
    describe('[COUNTER] Contract deployment', async () => {
      it('Deploy test_binding', async () => {
        await training_counter.deploy({ as: alice })
      });
    })

    describe('[COUNTER] Call entry', async () => {
      it("Call 'increment'", async () => {
        const s_before = await training_counter.get_count()
        assert(s_before.equals(new Nat(2)))
        await training_counter.increment({ as: alice })
        const s_after = await training_counter.get_count()
        assert(s_after.equals(new Nat(3)))
      })
    })

  });

  describe('training_storevalue', async () => {
    describe('[STOREVALUE] Contract deployment', async () => {
      it('Deploy storevalue', async () => {
        await training_storevalue.deploy(new Nat(15), { as: alice })
      });
    })

    describe('[STOREVALUE] Call replace', async () => {
      it("Call 'replace' should fail", async () => {
        await expect_to_fail(async () => {
          await training_storevalue.replace(new Nat(101), { as: alice })
        }, training_storevalue.errors.r1)
      })
      it("Call 'replace'", async () => {
        const new_counter = new Nat(20)
        await training_storevalue.replace(new_counter, { as: alice })
        const counter = await training_storevalue.get_counter()
        assert(counter.equals(new Nat(20)))
      })
    })
  });

  describe('training_visitors', async () => {
    describe('[VISITORS] Contract deployment', async () => {
      it('Deploy test_binding', async () => {
        await training_visitors.deploy({ as: alice })
      });
    })

    describe('[VISITORS] Call entry', async () => {
      it("Call 'register'", async () => {
        const visitors_before = await training_visitors.get_visitor()
        assert(visitors_before.length === 0)
        await training_visitors.register("alice", "Alice", { as: alice })
        const visitors_after = await training_visitors.get_visitor()
        assert(visitors_after.length === 1)
        assert(visitors_after[0][1].equals(new visitor_value("Alice", new Nat(0))))
      })
      it("Call 'visit'", async () => {
        await training_visitors.visit("alice", { as: alice })
        const visitors_after = await training_visitors.get_visitor()
        assert(visitors_after.length === 1)
        assert(visitors_after[0][1].equals(new visitor_value("Alice", new Nat(1))))
      })
    })
  });

})
