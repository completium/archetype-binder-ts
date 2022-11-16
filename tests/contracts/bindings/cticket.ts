import * as ex from "@completium/experiment-ts";
import * as att from "@completium/archetype-ts-types";
const create_arg_to_mich = (): att.Micheline => {
    return att.unit_mich;
}
export class Cticket {
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
        const address = (await ex.deploy("./tests/contracts/cticket.arl", {}, params)).address;
        this.address = address;
    }
    async create(params: Partial<ex.Parameters>): Promise<any> {
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
            const storage = await ex.get_storage(this.address);
            return new att.Option<att.Ticket<string>>(storage.my_ticket == null ? null : (x => { return new att.Ticket<string>(new att.Address(x.ticketer), x.value, new att.Nat(x.amount)); })(storage.my_ticket));
        }
        throw new Error("Contract not initialised");
    }
    async get_metadata_value(key: string): Promise<att.Bytes | undefined> {
        if (this.address != undefined) {
            const storage = await ex.get_storage(this.address);
            const data = await ex.get_big_map_value(BigInt(storage.metadata), att.string_to_mich(key), att.prim_annot_to_mich_type("string", []), att.prim_annot_to_mich_type("bytes", [])), collapsed = true;
            if (data != undefined) {
                return new att.Bytes(data);
            }
            else {
                return undefined;
            }
        }
        throw new Error("Contract not initialised");
    }
    async has_metadata_value(key: string): Promise<boolean> {
        if (this.address != undefined) {
            const storage = await ex.get_storage(this.address);
            const data = await ex.get_big_map_value(BigInt(storage.metadata), att.string_to_mich(key), att.prim_annot_to_mich_type("string", []), att.prim_annot_to_mich_type("bytes", [])), collapsed = true;
            if (data != undefined) {
                return true;
            }
            else {
                return false;
            }
        }
        throw new Error("Contract not initialised");
    }
    errors = {};
}
export const cticket = new Cticket();
