import * as ex from "@completium/experiment-ts";
import * as att from "@completium/archetype-ts-types";
const set_value_arg_to_mich = (i: Array<[
    [
        [
            att.Nat,
            string
        ],
        att.Bytes
    ],
    boolean
]>): att.Micheline => {
    return att.list_to_mich(i, x => {
        return att.pair_to_mich([att.pair_to_mich([att.pair_to_mich([x[0][0][0].to_mich(), att.string_to_mich(x[0][0][1])]), x[0][1].to_mich()]), att.bool_to_mich(x[1])]);
    });
}
export class Type_list_tuple_nat_string_bytes_bool_rev {
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
        const address = await ex.deploy("./tests/contracts/type_list_tuple_nat_string_bytes_bool_rev.arl", {}, params);
        this.address = address;
    }
    async set_value(i: Array<[
        [
            [
                att.Nat,
                string
            ],
            att.Bytes
        ],
        boolean
    ]>, params: Partial<ex.Parameters>): Promise<any> {
        if (this.address != undefined) {
            return await ex.call(this.address, "set_value", set_value_arg_to_mich(i), params);
        }
        throw new Error("Contract not initialised");
    }
    async get_set_value_param(i: Array<[
        [
            [
                att.Nat,
                string
            ],
            att.Bytes
        ],
        boolean
    ]>, params: Partial<ex.Parameters>): Promise<att.CallParameter> {
        if (this.address != undefined) {
            return await ex.get_call_param(this.address, "set_value", set_value_arg_to_mich(i), params);
        }
        throw new Error("Contract not initialised");
    }
    async get_res(): Promise<Array<[
        [
            [
                att.Nat,
                string
            ],
            att.Bytes
        ],
        boolean
    ]>> {
        if (this.address != undefined) {
            const storage = await ex.get_storage(this.address);
            const res: Array<[
                [
                    [
                        att.Nat,
                        string
                    ],
                    att.Bytes
                ],
                boolean
            ]> = [];
            for (let i = 0; i < storage.length; i++) {
                res.push((x => { return [[[(x => { return new att.Nat(x); })(x[Object.keys(x)[0]]), (x => { return x; })(x[Object.keys(x)[1]])], (x => { return new att.Bytes(x); })(x[Object.keys(x)[2]])], (x => { return x; })(x[Object.keys(x)[3]])]; })(storage[i]));
            }
            return res;
        }
        throw new Error("Contract not initialised");
    }
    errors = {};
}
export const type_list_tuple_nat_string_bytes_bool_rev = new Type_list_tuple_nat_string_bytes_bool_rev();