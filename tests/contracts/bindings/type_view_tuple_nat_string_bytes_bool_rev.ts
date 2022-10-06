import * as ex from "@completium/experiment-ts";
import * as att from "@completium/archetype-ts-types";
const view_get_value_arg_to_mich = (): att.Micheline => {
    return att.unit_mich;
}
export class Type_view_tuple_nat_string_bytes_bool_rev {
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
        const address = await ex.deploy("./tests/contracts/type_view_tuple_nat_string_bytes_bool_rev.arl", {}, params);
        this.address = address;
    }
    async view_get_value(params: Partial<ex.Parameters>): Promise<[
        [
            [
                att.Nat,
                string
            ],
            att.Bytes
        ],
        boolean
    ]> {
        if (this.address != undefined) {
            const mich = await ex.exec_view(this.get_address(), "get_value", view_get_value_arg_to_mich(), params);
            return [[[(x => { return new att.Nat(x); })(mich[Object.keys(mich)[0]]), (x => { return x; })(mich[Object.keys(mich)[1]])], (x => { return new att.Bytes(x); })(mich[Object.keys(mich)[2]])], (x => { return x; })(mich[Object.keys(mich)[3]])];
        }
        throw new Error("Contract not initialised");
    }
    async get_res(): Promise<[
        [
            [
                att.Nat,
                string
            ],
            att.Bytes
        ],
        boolean
    ]> {
        if (this.address != undefined) {
            const storage = await ex.get_storage(this.address);
            return [[[(x => { return new att.Nat(x); })(storage[Object.keys(storage)[0]]), (x => { return x; })(storage[Object.keys(storage)[1]])], (x => { return new att.Bytes(x); })(storage[Object.keys(storage)[2]])], (x => { return x; })(storage[Object.keys(storage)[3]])];
        }
        throw new Error("Contract not initialised");
    }
    errors = {};
}
export const type_view_tuple_nat_string_bytes_bool_rev = new Type_view_tuple_nat_string_bytes_bool_rev();
