import * as ex from "@completium/experiment-ts";
import * as att from "@completium/archetype-ts-types";
const get_value_arg_to_mich = (i: [
    att.Nat,
    string,
    att.Bytes,
    boolean
]): att.Micheline => {
    return att.pair_to_mich([i[0].to_mich(), att.string_to_mich(i[1]), i[2].to_mich(), att.bool_to_mich(i[3])]);
}
export const deploy_get_value_callback = async (): Promise<string> => {
    return await ex.deploy_callback("get_value", att.pair_array_to_mich_type([
        att.prim_annot_to_mich_type("nat", []),
        att.pair_array_to_mich_type([
            att.prim_annot_to_mich_type("string", []),
            att.pair_array_to_mich_type([
                att.prim_annot_to_mich_type("bytes", []),
                att.prim_annot_to_mich_type("bool", [])
            ], [])
        ], [])
    ], []));
};
export class Type_getter_tuple_nat_string_bytes_bool {
    address: string | undefined;
    constructor(address: string | undefined = undefined) {
        this.address = address;
    }
    get_value_callback_address: string | undefined;
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
        const address = await ex.deploy("./tests/contracts/type_getter_tuple_nat_string_bytes_bool.arl", {}, params);
        this.address = address;
        this.get_value_callback_address = await deploy_get_value_callback();
    }
    async get_value(i: [
        att.Nat,
        string,
        att.Bytes,
        boolean
    ], params: Partial<ex.Parameters>): Promise<[
        att.Nat,
        string,
        att.Bytes,
        boolean
    ]> {
        if (this.address != undefined) {
            if (this.get_value_callback_address != undefined) {
                const entrypoint = new att.Entrypoint(new att.Address(this.get_value_callback_address), "callback");
                await ex.call(this.address, "get_value", att.getter_args_to_mich(get_value_arg_to_mich(i), entrypoint), params);
                return await ex.get_callback_value<[
                    att.Nat,
                    string,
                    att.Bytes,
                    boolean
                ]>(this.get_value_callback_address, x => { return [(x => { return new att.Nat(x); })(x[Object.keys(x)[0]]), (x => { return x; })(x[Object.keys(x)[1]]), (x => { return new att.Bytes(x); })(x[Object.keys(x)[2]]), (x => { return x; })(x[Object.keys(x)[3]])]; });
            }
        }
        throw new Error("Contract not initialised");
    }
    async get_res(): Promise<[
        att.Nat,
        string,
        att.Bytes,
        boolean
    ]> {
        if (this.address != undefined) {
            const storage = await ex.get_storage(this.address);
            return [(x => { return new att.Nat(x); })(storage[Object.keys(storage)[0]]), (x => { return x; })(storage[Object.keys(storage)[1]]), (x => { return new att.Bytes(x); })(storage[Object.keys(storage)[2]]), (x => { return x; })(storage[Object.keys(storage)[3]])];
        }
        throw new Error("Contract not initialised");
    }
    errors = {};
}
export const type_getter_tuple_nat_string_bytes_bool = new Type_getter_tuple_nat_string_bytes_bool();
