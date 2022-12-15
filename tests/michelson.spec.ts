import { get_account, set_mockup, set_mockup_now, set_quiet } from '@completium/experiment-ts'
import { Bytes, Nat } from '@completium/archetype-ts-types'

const assert = require('assert')

import { michelson_contract_eq } from './contracts/bindings/michelson_contract_eq'
import { michelson_contract_le } from './contracts/bindings/michelson_contract_le'
import { michelson_contract_p } from './contracts/bindings/michelson_contract_p'
import { michelson_contract_tz } from './contracts/bindings/michelson_contract_tz'

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

describe('Michelson', async () => {
  it('contract_eq', async () => {
    const init_a = new Nat(0);
    const init_b = ""
    const init_c = new Bytes("")
    const init_d = false
    await michelson_contract_eq.originate(init_a, init_b, init_c, init_d, { as: alice })
    const res_init_a = await michelson_contract_eq.get_a();
    assert(init_a.equals(res_init_a))
    const res_init_b = await michelson_contract_eq.get_b();
    assert(init_b == res_init_b)
    const res_init_c = await michelson_contract_eq.get_c();
    assert(init_c.equals(res_init_c))
    const res_init_d = await michelson_contract_eq.get_d();
    assert(init_d == res_init_d)

    const new_a = new Nat(2);
    await michelson_contract_eq.set_a(new_a, { as: alice })
    const res_a = await michelson_contract_eq.get_a();
    assert(new_a.equals(res_a))

    const res_view_a = await michelson_contract_eq.view_v_a({ as: alice })
    assert(new_a.equals(res_view_a))

    const new_b = "mystr";
    await michelson_contract_eq.set_b(new_b, { as: alice })
    const res_b = await michelson_contract_eq.get_b();
    assert(new_b == res_b)

    const prefix = "prefix_"
    const res_view_b = await michelson_contract_eq.view_v_b(prefix, { as: alice })
    assert(prefix + new_b == res_view_b)
  });

  it('contract_le', async () => {
    const init_a = new Nat(0);
    const init_b = ""
    const init_c = new Bytes("")
    const init_d = false
    await michelson_contract_le.originate(init_a, init_b, init_c, init_d, { as: alice })
  });

  it('contract_p', async () => {
    const init_a = new Nat(0);
    const init_b = ""
    const init_c = new Bytes("")
    const init_d = false
    const init_n = new Nat(1);
    const init_s: [[[Nat, string], Bytes], boolean] = [[[init_a, init_b], init_c], init_d];
    await michelson_contract_p.originate(init_s, init_n, { as: alice })
    const res_init_s = await michelson_contract_p.get_s();
    assert(res_init_s[0][0][0].equals(init_a) && res_init_s[0][0][1] == init_b && res_init_s[0][1].equals(init_c) && res_init_s[1] == init_d)
    const res_init_n = await michelson_contract_p.get_n();
    assert(init_n.equals(res_init_n))
  });

  it('contract_tz', async () => {
    const init_a = new Nat(0);
    const init_b = ""
    const init_c = new Bytes("")
    await michelson_contract_tz.originate(init_a, init_b, init_c, { as: alice })
  });
})
