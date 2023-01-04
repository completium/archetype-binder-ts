import * as ex from "@completium/experiment-ts";
import * as att from "@completium/archetype-ts-types";
export const storage_mich_stype: att.MichelineType = att.prim_annot_to_mich_type("nat", []);
const storage_arg_to_mich = ($default: att.Nat): att.Micheline => {
    return $default.to_mich();
}
const default_arg_to_mich = (_: att.Nat): att.Micheline => {
    return _.to_mich();
}
const view_getN_arg_to_mich = (): att.Micheline => {
    return att.unit_mich;
}
export class Michelson_simple_view {
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
    async originate($default: att.Nat, params: Partial<ex.Parameters>) {
        const address = (await ex.originate("./tests/contracts/michelson_simple_view.tz", storage_arg_to_mich($default), params)).address;
        this.address = address;
    }
    async default(_: att.Nat, params: Partial<ex.Parameters>): Promise<att.CallResult> {
        if (this.address != undefined) {
            return await ex.call(this.address, "default", default_arg_to_mich(_), params);
        }
        throw new Error("Contract not initialised");
    }
    async get_default_param(_: att.Nat, params: Partial<ex.Parameters>): Promise<att.CallParameter> {
        if (this.address != undefined) {
            return await ex.get_call_param(this.address, "default", default_arg_to_mich(_), params);
        }
        throw new Error("Contract not initialised");
    }
    async view_getN(params: Partial<ex.Parameters>): Promise<att.Nat | undefined> {
        if (this.address != undefined) {
            const mich = await ex.exec_view(this.get_address(), "getN", view_getN_arg_to_mich(), params);
            return mich.value ? att.Nat.from_mich(mich.value) : undefined;
        }
        throw new Error("Contract not initialised");
    }
    async get_$default(): Promise<att.Nat> {
        if (this.address != undefined) {
            const storage = await ex.get_raw_storage(this.address);
            return att.Nat.from_mich(storage);
        }
        throw new Error("Contract not initialised");
    }
    errors = {};
}
export const michelson_simple_view = new Michelson_simple_view();
