import { get_account, set_mockup, set_quiet } from '@completium/experiment-ts'
import { Nat, Option, Ticket } from '@completium/archetype-ts-types'

import assert from 'assert'

import { sample_ticket } from './contracts/bindings/sample_ticket'
import { sample_ticket_detach_big_map_record, my_record } from './contracts/bindings/sample_ticket_detach_big_map_record'

/* Accounts ---------------------------------------------------------------- */

const alice = get_account('alice');
const bob = get_account('bob')

/* Endpoint ---------------------------------------------------------------- */

set_mockup()

/* Verbose mode ------------------------------------------------------------ */

set_quiet(true);

/* Scenario ---------------------------------------------------------------- */

describe('[Ticket] Sample tests', async () => {
  it('sample_ticket', async () => {
    await sample_ticket.deploy({ as: alice })

    const ticket_ref: Ticket<string> = new Ticket(sample_ticket.get_address(), ("info" as string), new Nat(1));
    await sample_ticket.create({ as: alice });
    const ticket_actual = await sample_ticket.get_my_ticket();
    const ta = ticket_actual.get();
    assert(ticket_ref.equals(ta), "Invalid value")
  });

  it("sample_ticket_detach_big_map_record", async () => {
    await sample_ticket_detach_big_map_record.deploy({ as: alice })
    const input_before = await sample_ticket_detach_big_map_record.get_input_value(new Nat(0));
    assert(input_before === undefined)
    const output_before = await sample_ticket_detach_big_map_record.get_output();
    assert(output_before.equals(Option.None()))
    await sample_ticket_detach_big_map_record.init({ as: alice })
    const input_init = await sample_ticket_detach_big_map_record.get_input_value(new Nat(0));
    assert(input_init?.equals(new my_record("mystr", new Ticket<string>(sample_ticket_detach_big_map_record.get_address(), "info", new Nat(1)))))
    const output_init = await sample_ticket_detach_big_map_record.get_output();
    assert(output_init.equals(Option.None()))
    await sample_ticket_detach_big_map_record.exec({ as: alice })
    const input_after = await sample_ticket_detach_big_map_record.get_input_value(new Nat(0));
    assert(input_after == undefined)
    const output_after = await sample_ticket_detach_big_map_record.get_output();
    assert(output_after.equals(Option.Some(new Ticket<string>(sample_ticket_detach_big_map_record.get_address(), "info", new Nat(1)))))
  })
})