import { Bls12_381_fr, Bls12_381_g1, Bls12_381_g2, Bytes, Chain_id, Chest, Chest_key, Duration, Int, Key_hash, Nat, Rational, Option, Or, Sapling_transaction, Tez, Unit } from '@completium/archetype-ts-types';
import { expect_to_fail, get_account, set_mockup, set_quiet } from '@completium/experiment-ts';

import { simple_fail } from './contracts/bindings/simple_fail'
import { simple_fail_invalid_condition } from './contracts/bindings/simple_fail_invalid_condition'

const assert = require('assert')

const alice = get_account('alice')

/* Verbose mode ------------------------------------------------------------ */

set_quiet(true);

/* Endpoint ---------------------------------------------------------------- */

set_mockup()

/* Constants --------------------------------------------------------------- */

const path_contracts = './tests/contracts/';

/* Functions --------------------------------------------------------------- */


describe('Fails', async () => {
  it('Simple fail', async () => {
    await simple_fail.deploy({ as: alice })

    expect_to_fail(async () => {
      simple_fail.f({ as: alice })
    }, simple_fail.errors.MYERROR)
  });

  it('Simple fail invalid condition', async () => {
    await simple_fail_invalid_condition.deploy({ as: alice })

    expect_to_fail(async () => {
      simple_fail_invalid_condition.f({ as: alice })
    }, simple_fail_invalid_condition.errors.r1)
  });

})
