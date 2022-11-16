import { expect_to_fail, get_account, set_mockup, set_mockup_now, set_quiet } from '@completium/experiment-ts'
import { Address, Bytes, Duration, Int, Nat, Option, Rational, Tez, Ticket } from '@completium/archetype-ts-types'

const assert = require('assert')

import { template_all_utils } from './contracts/bindings/template_all_utils'
import { template_metadata } from './contracts/bindings/template_metadata'
import { template_ownership } from './contracts/bindings/template_ownership'
import { template_pausable } from './contracts/bindings/template_pausable'

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

describe('[Template] template_metadata', async () => {
  it('Deploy template_metadata', async () => {
    await template_metadata.deploy({ as: alice })
  });

  it("Call set_metadata should succeed", async () => {
    const key = "key";
    const value = new Bytes("abcd");

    const has_before = await template_metadata.has_metadata_value(key);
    assert(has_before == false, "Invalid value");

    await template_metadata.set_metadata(key, Option.Some<Bytes>(value), { as: alice })

    const has_after = await template_metadata.has_metadata_value(key);
    assert(has_after == true, "Invalid value");

    const value_after = await template_metadata.get_metadata_value(key);
    assert(value_after?.equals(value), "Invalid value");
  })

})

describe('[Template] template_ownership', async () => {
  it('Deploy template_ownership', async () => {
    await template_ownership.deploy(alice.get_address(), { as: alice })
  });

  it("Call declare_ownership with wrong owner should fail", async () => {
    await expect_to_fail(async () => {
      await template_ownership.declare_ownership(bob.get_address(), { as: bob })
    }, template_ownership.errors.INVALID_CALLER)
  })

  it("Call declare_ownership with right owner should succeed", async () => {
    const owner_before = await template_ownership.get_owner()
    assert(owner_before.equals(alice.get_address()), "Invalid value");

    const owner_candidate_before = await template_ownership.get_owner_candidate();
    assert(owner_candidate_before.equals(Option.None()), "Invalid value");

    await template_ownership.declare_ownership(bob.get_address(), { as: alice })

    const owner_after = await template_ownership.get_owner()
    assert(owner_after.equals(alice.get_address()), "Invalid value");

    const owner_candidate_after = await template_ownership.get_owner_candidate();
    assert(owner_candidate_after.equals(Option.Some(bob.get_address())), "Invalid value");
  })

  it("Call claim_ownership with wrong candidate owner should fail", async () => {
    await expect_to_fail(async () => {
      await template_ownership.claim_ownership({ as: alice })
    }, template_ownership.errors.INVALID_CALLER)
  })

  it("Call claim_ownership with right candidate owner should succeed", async () => {
    const owner_before = await template_ownership.get_owner()
    assert(owner_before.equals(alice.get_address()), "Invalid value");

    const owner_candidate_before = await template_ownership.get_owner_candidate();
    assert(owner_candidate_before.equals(Option.Some(bob.get_address())), "Invalid value");

    await template_ownership.claim_ownership({ as: bob })

    const owner_after = await template_ownership.get_owner()
    assert(owner_after.equals(bob.get_address()), "Invalid value");

    const owner_candidate_after = await template_ownership.get_owner_candidate();
    assert(owner_candidate_after.equals(Option.None()), "Invalid value");
  })
})

describe('[Template] template_pausable', async () => {
  it('Deploy template_pausable', async () => {
    await template_pausable.deploy({ as: alice })
  });

  it("Call unpause when paused is false should fail", async () => {
    const paused_before = await template_pausable.get_paused();
    assert(paused_before == false);

    await expect_to_fail(async () => {
      await template_pausable.unpause({ as: alice })
    }, template_pausable.errors.pausable_r2)
  })

  it("Call pause when pause should fail", async () => {
    const paused_before = await template_pausable.get_paused();
    assert(paused_before == false);

    await template_pausable.pause({ as: alice })

    const paused_after = await template_pausable.get_paused();
    assert(paused_after == true);
  })

  it("Call unpause when pause should fail", async () => {
    const paused_before = await template_pausable.get_paused();
    assert(paused_before == true);

    await expect_to_fail(async () => {
      await template_pausable.pause({ as: alice })
    }, template_pausable.errors.CONTRACT_PAUSED)
  })

  it("Call pause when pause should fail", async () => {
    const paused_before = await template_pausable.get_paused();
    assert(paused_before == true);

    await template_pausable.unpause({ as: alice })

    const paused_after = await template_pausable.get_paused();
    assert(paused_after == false);
  })

})

describe('[Template] template_all_utils', async () => {
  it('Deploy template_all_utils', async () => {
    await template_all_utils.deploy(alice.get_address(), { as: alice })
  });

  it("Call set_metadata should fail", async () => {
    const key = "key";
    const value = new Bytes("abcd");

    await expect_to_fail(async () => {
      await template_all_utils.set_metadata(key, Option.Some<Bytes>(value), { as: bob })
    }, template_all_utils.errors.INVALID_CALLER)
  })

  it("Call set_metadata should succeed", async () => {
    const key = "key";
    const value = new Bytes("abcd");

    const has_before = await template_all_utils.has_metadata_value(key);
    assert(has_before == false, "Invalid value");

    await template_all_utils.set_metadata(key, Option.Some<Bytes>(value), { as: alice })

    const has_after = await template_all_utils.has_metadata_value(key);
    assert(has_after == true, "Invalid value");

    const value_after = await template_all_utils.get_metadata_value(key);
    assert(value_after?.equals(value), "Invalid value");
  })

  it("Call unpause with wrong owner should fail", async () => {
    await expect_to_fail(async () => {
      await template_all_utils.unpause({ as: bob })
    }, template_all_utils.errors.INVALID_CALLER)
  })

  it("Call unpause when paused is false should fail", async () => {
    const paused_before = await template_all_utils.get_paused();
    assert(paused_before == false);

    await expect_to_fail(async () => {
      await template_all_utils.unpause({ as: alice })
    }, template_all_utils.errors.pausable_r2)
  })

  it("Call pause with wrong owner should fail", async () => {
    await expect_to_fail(async () => {
      await template_all_utils.pause({ as: bob })
    }, template_all_utils.errors.INVALID_CALLER)
  })

  it("Call pause when pause should succeed", async () => {
    const paused_before = await template_all_utils.get_paused();
    assert(paused_before == false);

    await template_all_utils.pause({ as: alice })

    const paused_after = await template_all_utils.get_paused();
    assert(paused_after == true);
  })

  it("Call unpause when pause should fail", async () => {
    const paused_before = await template_all_utils.get_paused();
    assert(paused_before == true);

    await expect_to_fail(async () => {
      await template_all_utils.pause({ as: alice })
    }, template_all_utils.errors.CONTRACT_PAUSED)
  })

  it("Call pause when pause should fail", async () => {
    const paused_before = await template_all_utils.get_paused();
    assert(paused_before == true);

    await template_all_utils.unpause({ as: alice })

    const paused_after = await template_all_utils.get_paused();
    assert(paused_after == false);
  })

  it("Call declare_ownership with wrong owner should fail", async () => {
    await expect_to_fail(async () => {
      await template_all_utils.declare_ownership(bob.get_address(), { as: bob })
    }, template_all_utils.errors.INVALID_CALLER)
  })

  it("Call declare_ownership with right owner should succeed", async () => {
    const owner_before = await template_all_utils.get_owner()
    assert(owner_before.equals(alice.get_address()), "Invalid value");

    const owner_candidate_before = await template_all_utils.get_owner_candidate();
    assert(owner_candidate_before.equals(Option.None()), "Invalid value");

    await template_all_utils.declare_ownership(bob.get_address(), { as: alice })

    const owner_after = await template_all_utils.get_owner()
    assert(owner_after.equals(alice.get_address()), "Invalid value");

    const owner_candidate_after = await template_all_utils.get_owner_candidate();
    assert(owner_candidate_after.equals(Option.Some(bob.get_address())), "Invalid value");
  })

  it("Call claim_ownership with wrong candidate owner should fail", async () => {
    await expect_to_fail(async () => {
      await template_all_utils.claim_ownership({ as: alice })
    }, template_all_utils.errors.INVALID_CALLER)
  })

  it("Call claim_ownership with right candidate owner should succeed", async () => {
    const owner_before = await template_all_utils.get_owner()
    assert(owner_before.equals(alice.get_address()), "Invalid value");

    const owner_candidate_before = await template_all_utils.get_owner_candidate();
    assert(owner_candidate_before.equals(Option.Some(bob.get_address())), "Invalid value");

    await template_all_utils.claim_ownership({ as: bob })

    const owner_after = await template_all_utils.get_owner()
    assert(owner_after.equals(bob.get_address()), "Invalid value");

    const owner_candidate_after = await template_all_utils.get_owner_candidate();
    assert(owner_candidate_after.equals(Option.None()), "Invalid value");
  })
})
