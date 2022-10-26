import * as ex from "@completium/experiment-ts";
import * as att from "@completium/archetype-ts-types";
export const storage_type: att.MichelineType = { prim: "unit", annots: [] };
const view_get_value_arg_to_mich = (i: [
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
        const address = (await ex.deploy("./tests/contracts/type_view_tuple_nat_string_bytes_bool_rev.arl", {}, params)).address;
        this.address = address;
    }
    async view_get_value(i: [
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
            const mich = await ex.exec_view(this.get_address(), "get_value", view_get_value_arg_to_mich(i), params);
            return (p => {
                const p0 = (p as att.Mpair);
                return [(p => {
                        const p0 = (p as att.Mpair);
                        return [(p => {
                                const p0 = (p as att.Mpair);
                                return [att.mich_to_nat(p0.args[0]), att.mich_to_string(p0.args[1])];
                            })(p0.args[0]), att.mich_to_bytes(p0.args[1])];
                    })(p0.args[0]), att.mich_to_bool(p0.args[1])];
            })(mich.value);
        }
        throw new Error("Contract not initialised");
    }
    errors = {};
}
export const type_view_tuple_nat_string_bytes_bool_rev = new Type_view_tuple_nat_string_bytes_bool_rev();
