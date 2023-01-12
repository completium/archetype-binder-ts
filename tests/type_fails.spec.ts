import { Bls12_381_fr, Bls12_381_g1, Bls12_381_g2, Bytes, Chain_id, Chest, Chest_key, Duration, Int, Key_hash, Nat, Rational, Option, Or, Sapling_transaction, Tez, Unit } from '@completium/archetype-ts-types';
import { expect_to_fail, get_account, set_mockup, set_quiet } from '@completium/experiment-ts';

import { fail_simple } from './contracts/bindings/fail_simple'
import { fail_invalid_condition } from './contracts/bindings/fail_invalid_condition'
import { fail_bad_character } from './contracts/bindings/fail_bad_character'
import { fail_complex } from './contracts/bindings/fail_complex'

const assert = require('assert')

const alice = get_account('alice')

/* Verbose mode ------------------------------------------------------------ */

set_quiet(true);

/* Endpoint ---------------------------------------------------------------- */

set_mockup()

/* Constants --------------------------------------------------------------- */

const path_contracts = './tests/contracts/';

/* Functions --------------------------------------------------------------- */


describe('Fails', () => {
  it('Fail simple', async () => {
    await fail_simple.deploy({ as: alice })

    expect_to_fail(async () => {
      fail_simple.f({ as: alice })
    }, fail_simple.errors.MYERROR)
  });

  it('Fail invalid condition', async () => {
    await fail_invalid_condition.deploy({ as: alice })

    expect_to_fail(async () => {
      fail_invalid_condition.f({ as: alice })
    }, fail_invalid_condition.errors.r1)
  });

  it('Fail bad character', async () => {
    await fail_bad_character.deploy({ as: alice })

    expect_to_fail(async () => {
      fail_bad_character.f({ as: alice })
    }, fail_bad_character.errors.DON_T_FAIL_)
  });

  it('Fail complex', async () => {
    await fail_complex.deploy({ as: alice })

    expect_to_fail(async () => {
      fail_complex.exec({ as: alice })
    }, { prim: "Pair", args: [{ string: "error" }, { int: "0" }] })
  });

})
