import * as ex from "@completium/experiment-ts";
import * as att from "@completium/archetype-ts-types";
const create_arg_to_mich = (): att.Micheline => {
    return att.unit_mich;
}
export class Sample_ticket {
    address: string | undefined;
    constructor(address: string | undefined = undefined) {
        this.address = address;
    }
    get_address(): att.Address {
        if (undefined != this.address) {
            return new att.Address(this.address);
        }
        throw new Error("Contract not initialised");
    }
    async get_balance(): Promise<att.Tez> {
        if (null != this.address) {
            return await ex.get_balance(new att.Address(this.address));
        }
        throw new Error("Contract not initialised");
    }
    async deploy(params: Partial<ex.Parameters>) {
        const address = (await ex.deploy("./tests/contracts/sample_ticket.arl", {}, params)).address;
        this.address = address;
    }
    async create(params: Partial<ex.Parameters>): Promise<att.CallResult> {
        if (this.address != undefined) {
            return await ex.call(this.address, "create", create_arg_to_mich(), params);
        }
        throw new Error("Contract not initialised");
    }
    async get_create_param(params: Partial<ex.Parameters>): Promise<att.CallParameter> {
        if (this.address != undefined) {
            return await ex.get_call_param(this.address, "create", create_arg_to_mich(), params);
        }
        throw new Error("Contract not initialised");
    }
    async get_my_ticket(): Promise<att.Option<att.Ticket<string>>> {
        if (this.address != undefined) {
            const storage = await ex.get_raw_storage(this.address);
            return att.Option.from_mich(storage, x => { return att.Ticket.from_mich(x, x => { return att.mich_to_string(x); }); });
        }
        throw new Error("Contract not initialised");
    }
    errors = {};
}
export const sample_ticket = new Sample_ticket();
