import * as ex from "@completium/experiment-ts";
import * as att from "@completium/archetype-ts-types";
export const storage_mich_stype: att.MichelineType = att.pair_array_to_mich_type([
    att.pair_array_to_mich_type([
        att.pair_array_to_mich_type([
            att.pair_array_to_mich_type([
                att.prim_annot_to_mich_type("nat", ["%a"]),
                att.prim_annot_to_mich_type("string", ["%b"])
            ], []),
            att.prim_annot_to_mich_type("bytes", ["%c"])
        ], []),
        att.prim_annot_to_mich_type("bool", ["%d"])
    ], ["%s"]),
    att.prim_annot_to_mich_type("nat", ["%n"])
], []);
const storage_arg_to_mich = (s: [
    [
        [
            att.Nat,
            string
        ],
        att.Bytes
    ],
    boolean
], n: att.Nat): att.Micheline => {
    return att.pair_to_mich([att.pair_to_mich([att.pair_to_mich([att.pair_to_mich([s[0][0][0].to_mich(), att.string_to_mich(s[0][0][1])]), s[0][1].to_mich()]), att.bool_to_mich(s[1])]), n.to_mich()]);
}
const set_a_arg_to_mich = (_: att.Nat): att.Micheline => {
    return _.to_mich();
}
const set_s_arg_to_mich = (_: [
    [
        [
            att.Nat,
            string
        ],
        att.Bytes
    ],
    boolean
]): att.Micheline => {
    return att.pair_to_mich([att.pair_to_mich([att.pair_to_mich([_[0][0][0].to_mich(), att.string_to_mich(_[0][0][1])]), _[0][1].to_mich()]), att.bool_to_mich(_[1])]);
}
const set_b_arg_to_mich = (_: string): att.Micheline => {
    return att.string_to_mich(_);
}
const set_c_arg_to_mich = (_: att.Bytes): att.Micheline => {
    return _.to_mich();
}
const set_d_arg_to_mich = (_: boolean): att.Micheline => {
    return att.bool_to_mich(_);
}
const set_n_arg_to_mich = (_: att.Nat): att.Micheline => {
    return _.to_mich();
}
const view_v_a_arg_to_mich = (): att.Micheline => {
    return att.unit_mich;
}
const view_v_b_arg_to_mich = (_: string): att.Micheline => {
    return att.string_to_mich(_);
}
export class Michelson_contract_p {
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
    async originate(s: [
        [
            [
                att.Nat,
                string
            ],
            att.Bytes
        ],
        boolean
    ], n: att.Nat, params: Partial<ex.Parameters>) {
        const address = (await ex.originate("./tests/contracts/michelson_contract_p.tz", storage_arg_to_mich(s, n), params)).address;
        this.address = address;
    }
    async set_a(_: att.Nat, params: Partial<ex.Parameters>): Promise<any> {
        if (this.address != undefined) {
            return await ex.call(this.address, "set_a", set_a_arg_to_mich(_), params);
        }
        throw new Error("Contract not initialised");
    }
    async set_s(_: [
        [
            [
                att.Nat,
                string
            ],
            att.Bytes
        ],
        boolean
    ], params: Partial<ex.Parameters>): Promise<any> {
        if (this.address != undefined) {
            return await ex.call(this.address, "set_s", set_s_arg_to_mich(_), params);
        }
        throw new Error("Contract not initialised");
    }
    async set_b(_: string, params: Partial<ex.Parameters>): Promise<any> {
        if (this.address != undefined) {
            return await ex.call(this.address, "set_b", set_b_arg_to_mich(_), params);
        }
        throw new Error("Contract not initialised");
    }
    async set_c(_: att.Bytes, params: Partial<ex.Parameters>): Promise<any> {
        if (this.address != undefined) {
            return await ex.call(this.address, "set_c", set_c_arg_to_mich(_), params);
        }
        throw new Error("Contract not initialised");
    }
    async set_d(_: boolean, params: Partial<ex.Parameters>): Promise<any> {
        if (this.address != undefined) {
            return await ex.call(this.address, "set_d", set_d_arg_to_mich(_), params);
        }
        throw new Error("Contract not initialised");
    }
    async set_n(_: att.Nat, params: Partial<ex.Parameters>): Promise<any> {
        if (this.address != undefined) {
            return await ex.call(this.address, "set_n", set_n_arg_to_mich(_), params);
        }
        throw new Error("Contract not initialised");
    }
    async get_set_a_param(_: att.Nat, params: Partial<ex.Parameters>): Promise<att.CallParameter> {
        if (this.address != undefined) {
            return await ex.get_call_param(this.address, "set_a", set_a_arg_to_mich(_), params);
        }
        throw new Error("Contract not initialised");
    }
    async get_set_s_param(_: [
        [
            [
                att.Nat,
                string
            ],
            att.Bytes
        ],
        boolean
    ], params: Partial<ex.Parameters>): Promise<att.CallParameter> {
        if (this.address != undefined) {
            return await ex.get_call_param(this.address, "set_s", set_s_arg_to_mich(_), params);
        }
        throw new Error("Contract not initialised");
    }
    async get_set_b_param(_: string, params: Partial<ex.Parameters>): Promise<att.CallParameter> {
        if (this.address != undefined) {
            return await ex.get_call_param(this.address, "set_b", set_b_arg_to_mich(_), params);
        }
        throw new Error("Contract not initialised");
    }
    async get_set_c_param(_: att.Bytes, params: Partial<ex.Parameters>): Promise<att.CallParameter> {
        if (this.address != undefined) {
            return await ex.get_call_param(this.address, "set_c", set_c_arg_to_mich(_), params);
        }
        throw new Error("Contract not initialised");
    }
    async get_set_d_param(_: boolean, params: Partial<ex.Parameters>): Promise<att.CallParameter> {
        if (this.address != undefined) {
            return await ex.get_call_param(this.address, "set_d", set_d_arg_to_mich(_), params);
        }
        throw new Error("Contract not initialised");
    }
    async get_set_n_param(_: att.Nat, params: Partial<ex.Parameters>): Promise<att.CallParameter> {
        if (this.address != undefined) {
            return await ex.get_call_param(this.address, "set_n", set_n_arg_to_mich(_), params);
        }
        throw new Error("Contract not initialised");
    }
    async view_v_a(params: Partial<ex.Parameters>): Promise<att.Nat> {
        if (this.address != undefined) {
            const mich = await ex.exec_view(this.get_address(), "v_a", view_v_a_arg_to_mich(), params);
            return att.mich_to_nat(mich.value);
        }
        throw new Error("Contract not initialised");
    }
    async view_v_b(_: string, params: Partial<ex.Parameters>): Promise<string> {
        if (this.address != undefined) {
            const mich = await ex.exec_view(this.get_address(), "v_b", view_v_b_arg_to_mich(_), params);
            return att.mich_to_string(mich.value);
        }
        throw new Error("Contract not initialised");
    }
    async get_s(): Promise<[
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
            const storage = await ex.get_raw_storage(this.address);
            return (p => {
                return [(p => {
                        return [(p => {
                                return [att.mich_to_nat((p as att.Mpair).args[0]), att.mich_to_string((p as att.Mpair).args[1])];
                            })((p as att.Mpair).args[0]), att.mich_to_bytes((p as att.Mpair).args[1])];
                    })((p as att.Mpair).args[0]), att.mich_to_bool((p as att.Mpair).args[1])];
            })((storage as att.Mpair).args[0]);
        }
        throw new Error("Contract not initialised");
    }
    async get_n(): Promise<att.Nat> {
        if (this.address != undefined) {
            const storage = await ex.get_raw_storage(this.address);
            return att.mich_to_nat((storage as att.Mpair).args[1]);
        }
        throw new Error("Contract not initialised");
    }
    errors = {};
}
export const michelson_contract_p = new Michelson_contract_p();
