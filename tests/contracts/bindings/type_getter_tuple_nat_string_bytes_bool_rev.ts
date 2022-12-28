import * as ex from "@completium/experiment-ts";
import * as att from "@completium/archetype-ts-types";
const get_value_arg_to_mich = (i: [
    [
        [
            att.Nat,
            string
        ],
        att.Bytes
    ],
    boolean
]): att.Micheline => {
    return att.pair_to_mich([att.pair_to_mich([att.pair_to_mich([i[0][0][0].to_mich(), att.string_to_mich(i[0][0][1])]), i[0][1].to_mich()]), att.bool_to_mich(i[1])]);
}
export const deploy_get_value_callback = async (params: Partial<ex.Parameters>): Promise<att.DeployResult> => {
    return await ex.deploy_callback("get_value", att.pair_array_to_mich_type([
        att.pair_array_to_mich_type([
            att.pair_array_to_mich_type([
                att.prim_annot_to_mich_type("nat", []),
                att.prim_annot_to_mich_type("string", [])
            ], []),
            att.prim_annot_to_mich_type("bytes", [])
        ], []),
        att.prim_annot_to_mich_type("bool", [])
    ], []), params);
};
export class Type_getter_tuple_nat_string_bytes_bool_rev {
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
        const address = (await ex.deploy("./tests/contracts/type_getter_tuple_nat_string_bytes_bool_rev.arl", {}, params)).address;
        this.address = address;
        this.get_value_callback_address = (await deploy_get_value_callback(params)).address;
    }
    async get_value(i: [
        [
            [
                att.Nat,
                string
            ],
            att.Bytes
        ],
        boolean
    ], params: Partial<ex.Parameters>): Promise<[
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
            if (this.get_value_callback_address != undefined) {
                const entrypoint = new att.Entrypoint(new att.Address(this.get_value_callback_address), "callback");
                await ex.call(this.address, "get_value", att.getter_args_to_mich(get_value_arg_to_mich(i), entrypoint), params);
                return await ex.get_callback_value<[
                    [
                        [
                            att.Nat,
                            string
                        ],
                        att.Bytes
                    ],
                    boolean
                ]>(this.get_value_callback_address, x => { return (p => {
                    return [(p => {
                            return [(p => {
                                    return [att.Nat.from_mich((p as att.Mpair).args[0]), att.mich_to_string((p as att.Mpair).args[1])];
                                })((p as att.Mpair).args[0]), att.Bytes.from_mich((p as att.Mpair).args[1])];
                        })((p as att.Mpair).args[0]), att.mich_to_bool((p as att.Mpair).args[1])];
                })(x); });
            }
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
            const storage = await ex.get_raw_storage(this.address);
            return (p => {
                return [(p => {
                        return [(p => {
                                return [att.Nat.from_mich((p as att.Mpair).args[0]), att.mich_to_string((p as att.Mpair).args[1])];
                            })((p as att.Mpair).args[0]), att.Bytes.from_mich((p as att.Mpair).args[1])];
                    })((p as att.Mpair).args[0]), att.mich_to_bool((p as att.Mpair).args[1])];
            })(storage);
        }
        throw new Error("Contract not initialised");
    }
    errors = {};
}
export const type_getter_tuple_nat_string_bytes_bool_rev = new Type_getter_tuple_nat_string_bytes_bool_rev();
