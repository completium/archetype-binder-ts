import ts, { factory, KeywordTypeNode, SyntaxKind } from "typescript";

export type ArchetypeType = {
  "node": string
  "name": string | null
  "args": Array<ArchetypeType>
}

export type MichelsonType = {
  "prim": string | null
  "int": string | null
  "bytes": string | null
  "string": string | null
  "args": Array<MichelsonType>
  "annots": Array<string>
  "array": Array<MichelsonType>
}

export type ContractParameter = {
  "name": string
  "type": ArchetypeType
  "const": boolean
  "default": string | null
}

export type FunctionParameter = {
  "name": string
  "type": ArchetypeType
}

export type Entrypoint = {
  "name": string
  "args": Array<FunctionParameter>
}

export type Field = {
  "name": string
  "type": ArchetypeType
  "is_key": boolean
}

export type Asset = {
  "name": string
  "container_kind": string
  "fields": Array<Field>
  "container_type_michelson": MichelsonType
  "key_type_michelson": MichelsonType
  "value_type_michelson": MichelsonType
}

export type EnumValue = {
  "name": string,
  "types": Array<ArchetypeType>
}

export type Enum = {
  "name": string
  "constructors": Array<EnumValue>
  "type_michelson": MichelsonType
}

export type StorageElement = {
  "name": string
  "type": ArchetypeType
  "const": boolean
}

export type Record = {
  "name": string
  "fields": Array<Omit<Field,"is_key">>
  "type_michelson": MichelsonType
}

export type Getter = {
  "name": string
  "args": Array<FunctionParameter>
  "return" : ArchetypeType
}

export type View = {
  "name": string
  "args": Array<FunctionParameter>
  "return" : ArchetypeType
}

export type Event = {} /* TODO */

export type Error = {
  "kind" : string
  "args" : Array<string>
  "expr" : MichelsonType
}

export type ContractInterface = {
  "name" : string,
  "parameters" : Array<ContractParameter>
  "types": {
    "assets": Array<Asset>
    "enums": Array<Enum>
    "records": Array<Record>
    "events": Array<Event>
  }
  "storage": Array<StorageElement>
  "entrypoints": Array<Entrypoint>
  "getters" ?: Array<Getter>
  "views" ?: Array<View>
  "errors": Array<Error>
}

/* Archetype type to Michelson type ---------------------------------------- */

export const archetype_type_to_mich_type = (at : ArchetypeType) : MichelsonType => {
  switch (at.node) {
    /* TODO record asset tuple enum option or ... */
    default : return {
      prim: at.node,
      int: null,
      bytes: null,
      string: null,
      args: [],
      annots: [],
      array: [],
    }
  }
}

/* Archetype type to Typescript type --------------------------------------- */

export const archetype_type_to_ts_type = (at: ArchetypeType) : KeywordTypeNode<any>  => {
  switch (at.node) {
    case "or":        return factory.createTypeReferenceNode(
      factory.createQualifiedName(
        factory.createIdentifier("ex"),
        factory.createIdentifier("Or")
      ),
      [
        archetype_type_to_ts_type(at.args[0]),
        archetype_type_to_ts_type(at.args[1])
      ]
    )
    case "enum":      return factory.createTypeReferenceNode(
      factory.createIdentifier(at.name != null ? at.name : ""),
      undefined
    )
    case "date":      return factory.createTypeReferenceNode(
      factory.createIdentifier("Date"),
      undefined
    )
    case "duration":  return factory.createTypeReferenceNode(
      factory.createQualifiedName(
        factory.createIdentifier("ex"),
        factory.createIdentifier("Duration")
      ),
      undefined
    );
    case "signature":  return factory.createTypeReferenceNode(
      factory.createQualifiedName(
        factory.createIdentifier("ex"),
        factory.createIdentifier("Signature")
      ),
      undefined
    );
    case "key":  return factory.createTypeReferenceNode(
      factory.createQualifiedName(
        factory.createIdentifier("ex"),
        factory.createIdentifier("Key")
      ),
      undefined
    );
    case "bytes":  return factory.createTypeReferenceNode(
      factory.createQualifiedName(
        factory.createIdentifier("ex"),
        factory.createIdentifier("Bytes")
      ),
      undefined
    );
    case "option": return factory.createTypeReferenceNode(
      factory.createQualifiedName(
        factory.createIdentifier("ex"),
        factory.createIdentifier("Option"),
      ),
      [ archetype_type_to_ts_type(at.args[0]) ]
    );
    case "address":  return factory.createTypeReferenceNode(
      factory.createQualifiedName(
        factory.createIdentifier("ex"),
        factory.createIdentifier("Address")
      ),
      undefined
    );
    case "bool":      return factory.createKeywordTypeNode(SyntaxKind.BooleanKeyword)
    case "contract":  return factory.createTypeReferenceNode(
      factory.createQualifiedName(
        factory.createIdentifier("ex"),
        factory.createIdentifier("Entrypoint")
      ),
      undefined
    );
    case "string":    return factory.createKeywordTypeNode(SyntaxKind.StringKeyword);
    case "signature": return factory.createTypeReferenceNode(
      factory.createQualifiedName(
        factory.createIdentifier("ex"),
        factory.createIdentifier("Signature")
      ),
      undefined
    );
    case "key": return factory.createTypeReferenceNode(
      factory.createQualifiedName(
        factory.createIdentifier("ex"),
        factory.createIdentifier("Key")
      ),
      undefined
    );
    case "int":       return factory.createTypeReferenceNode(
      factory.createQualifiedName(
        factory.createIdentifier("ex"),
        factory.createIdentifier("Int")
      ),
      undefined
    );
    case "nat":       return factory.createTypeReferenceNode(
      factory.createQualifiedName(
        factory.createIdentifier("ex"),
        factory.createIdentifier("Nat")
      ),
      undefined
    );
    case "rational":       return factory.createTypeReferenceNode(
      factory.createQualifiedName(
        factory.createIdentifier("ex"),
        factory.createIdentifier("Rational")
      ),
      undefined
    );
    case "currency":       return factory.createTypeReferenceNode(
      factory.createQualifiedName(
        factory.createIdentifier("ex"),
        factory.createIdentifier("Tez")
      ),
      undefined
    );
    case "asset":     return factory.createTypeReferenceNode(
      factory.createIdentifier(at.name+"_container"),
      undefined
    );
    case "asset_value":  return factory.createTypeReferenceNode(
      factory.createIdentifier(at.args[0].name+"_value"),
      undefined
    );
    case "map": case "big_map" : return factory.createTypeReferenceNode(
      factory.createIdentifier("Array"),
      [factory.createTupleTypeNode([
        archetype_type_to_ts_type(at.args[0]),
        archetype_type_to_ts_type(at.args[1])
      ])]
    );
    case "set" :
    case "list":   return factory.createTypeReferenceNode(
      factory.createIdentifier("Array"),
      [archetype_type_to_ts_type(at.args[0])]
    )
    case "record": if (at.name != null) {
      return factory.createTypeReferenceNode(
        factory.createIdentifier(at.name),
        undefined)
    };
    case "tuple": return factory.createTupleTypeNode(
      at.args.map(t => archetype_type_to_ts_type(t))
    );
    default:       return factory.createKeywordTypeNode(SyntaxKind.StringKeyword)
  }
}

/* Complex data type comparison generators --------------------------------- */

const rm_milliseconds_from = (x : ts.Expression) : ts.BinaryExpression => {
  return factory.createBinaryExpression(
    factory.createCallExpression(
      factory.createPropertyAccessExpression(
        x,
        factory.createIdentifier("getTime")
      ),
      undefined,
      []
    ),
    factory.createToken(ts.SyntaxKind.MinusToken),
    factory.createCallExpression(
      factory.createPropertyAccessExpression(
        x,
        factory.createIdentifier("getMilliseconds")
      ),
      undefined,
      []
    )
  )
}

const make_tuple_cmp_body = (a : ts.Expression, b : ts.Expression, types: Array<ArchetypeType>) : ts.Expression => {
  return factory.createCallExpression(
    factory.createParenthesizedExpression(factory.createArrowFunction(
      undefined,
      undefined,
      [
        factory.createParameterDeclaration(
          undefined,
          undefined,
          undefined,
          factory.createIdentifier("x"),
          undefined,
          undefined,
          undefined
        ),
        factory.createParameterDeclaration(
          undefined,
          undefined,
          undefined,
          factory.createIdentifier("y"),
          undefined,
          undefined,
          undefined
        )
      ],
      undefined,
      factory.createToken(ts.SyntaxKind.EqualsGreaterThanToken),
      factory.createBlock(
        [factory.createReturnStatement(
          types.slice(1).reduce((acc, t, i) => {
          return factory.createBinaryExpression(
            acc,
            factory.createToken(ts.SyntaxKind.AmpersandAmpersandToken),
            make_cmp_body(factory.createElementAccessExpression(
              factory.createIdentifier("x"),
              factory.createNumericLiteral(""+(i+1))
            ), factory.createElementAccessExpression(
              factory.createIdentifier("y"),
              factory.createNumericLiteral(""+(i+1))
            ), t)
          )
        }, make_cmp_body(factory.createElementAccessExpression(
          factory.createIdentifier("x"),
          factory.createNumericLiteral("0")
        ), factory.createElementAccessExpression(
          factory.createIdentifier("y"),
          factory.createNumericLiteral("0")
        ), types[0])))],
        true
      )
    )),
    undefined,
    [ a, b ]
  )
}

export const make_cmp_body = (a : ts.Expression, b : ts.Expression, atype: ArchetypeType) => {
  switch (atype.node) {
    case "date": return  factory.createBinaryExpression(
      factory.createParenthesizedExpression(rm_milliseconds_from(a)),
      factory.createToken(ts.SyntaxKind.EqualsEqualsToken),
      factory.createParenthesizedExpression(rm_milliseconds_from(b))
    );
    case "set"   :
    case "list"  :
    case "map"   :
    case "asset" :return factory.createBinaryExpression(
      factory.createCallExpression(
        factory.createPropertyAccessExpression(
          factory.createIdentifier("JSON"),
          factory.createIdentifier("stringify")
        ),
        undefined,
        [a]
      ),
      factory.createToken(ts.SyntaxKind.EqualsEqualsToken),
      factory.createCallExpression(
        factory.createPropertyAccessExpression(
          factory.createIdentifier("JSON"),
          factory.createIdentifier("stringify")
        ),
        undefined,
        [b]
      )
    )
    case "int"       :
    case "nat"       :
    case "rational"  :
    case "bytes"     :
    case "address"   :
    case "option"    :
    case "currency"  :
    case "duration"  :
    case "signature" :
    case "key"       :
      return factory.createCallExpression(
        factory.createPropertyAccessExpression(
          a,
          factory.createIdentifier("equals")
        ),
        undefined,
        [b]
      )
    case "tuple"    :
      return make_tuple_cmp_body(a, b, atype.args)
    default: return factory.createBinaryExpression(
      a,
      factory.createToken(ts.SyntaxKind.EqualsEqualsToken),
      b
    )
  }
}

/* Michelson to Typescript utils ----------------------------------------------------- */

const make_arg = (i : number) : ts.Expression  => {
  const p_idx = Math.floor(i / 2)
  const arg_idx = i % 2
  return factory.createElementAccessExpression(
    factory.createPropertyAccessExpression(
      factory.createIdentifier("p" + p_idx),
      factory.createIdentifier("args")
    ),
    factory.createNumericLiteral("" + arg_idx)
  )
}

const make_pair_decl = (arg : ts.Expression, i : number) => {
  const idx = Math.floor(i / 2)
  if (idx == 0) {
    return factory.createVariableStatement(
      undefined,
      factory.createVariableDeclarationList(
        [factory.createVariableDeclaration(
          factory.createIdentifier("p0"),
          undefined,
          undefined,
          factory.createParenthesizedExpression(factory.createAsExpression(
            arg,
            factory.createTypeReferenceNode(
              factory.createQualifiedName(
                factory.createIdentifier("ex"),
                factory.createIdentifier("Mpair")
              ),
              undefined
            )
          ))
        )],
        ts.NodeFlags.Const
      )
    )
  } else {
    return factory.createVariableStatement(
      undefined,
      factory.createVariableDeclarationList(
        [factory.createVariableDeclaration(
          factory.createIdentifier("p" + idx),
          undefined,
          undefined,
          factory.createParenthesizedExpression(factory.createAsExpression(
            factory.createElementAccessExpression(
              factory.createPropertyAccessExpression(
                factory.createIdentifier("p" + (idx - 1)),
                factory.createIdentifier("args")
              ),
              factory.createNumericLiteral("1")
            ),
            factory.createTypeReferenceNode(
              factory.createQualifiedName(
                factory.createIdentifier("ex"),
                factory.createIdentifier("Mpair")
              ),
              undefined
            )
          ))
        )],
        ts.NodeFlags.Const
      )
    )
  }
}

const mich_to_tuple = (types : Array<ArchetypeType>, arg : ts.Expression ) => {
  let decls : Array<ts.Statement> = []
  let args  : Array<ts.Expression> = []
  for (let i = 0; i < types.length; i++) {
    if (i % 2 == 0) {
      // create declaration
      decls.push(make_pair_decl(factory.createIdentifier("p"), i))
    }
    args.push(mich_to_field_decl(types[i], make_arg(i)))
  }
  const body = [ ...decls, factory.createReturnStatement(factory.createArrayLiteralExpression(args))]
  return factory.createCallExpression(
    factory.createParenthesizedExpression(factory.createArrowFunction(
      undefined,
      undefined,
      [factory.createParameterDeclaration(
        undefined,
        undefined,
        undefined,
        factory.createIdentifier("p"),
        undefined,
        undefined,
        undefined
      )],
      undefined,
      factory.createToken(ts.SyntaxKind.EqualsGreaterThanToken),
      factory.createBlock(
        body,
        true
      )
    )),
    undefined,
    [arg]
  )
}

const contained_type_to_field_decl = (fname : string, arg : ts.Expression, atype : ArchetypeType) => {
  return factory.createCallExpression(
    factory.createPropertyAccessExpression(
      factory.createIdentifier("ex"),
      factory.createIdentifier(fname)
    ),
    undefined,
    [
      arg,
      factory.createArrowFunction(
        undefined,
        undefined,
        [factory.createParameterDeclaration(
          undefined,
          undefined,
          undefined,
          factory.createIdentifier("x"),
          undefined,
          undefined,
          undefined
        )],
        undefined,
        factory.createToken(ts.SyntaxKind.EqualsGreaterThanToken),
        factory.createBlock(
          [factory.createReturnStatement(mich_to_field_decl(atype, factory.createIdentifier("x"), 0, 0))],
          false
        )
      )
    ]
  )
}

export const mich_to_field_decl = (atype : ArchetypeType, arg : ts.Expression, idx : number = 0, len : number = 0) : ts.Expression => {
  switch (atype.node) {
    case "map" : return factory.createCallExpression(
      factory.createPropertyAccessExpression(
        factory.createIdentifier("ex"),
        factory.createIdentifier("mich_to_map")
      ),
      undefined,
      [
        arg,
        factory.createArrowFunction(
          undefined,
          undefined,
          [
            factory.createParameterDeclaration(
              undefined,
              undefined,
              undefined,
              factory.createIdentifier("x"),
              undefined,
              undefined,
              undefined
            ),
            factory.createParameterDeclaration(
              undefined,
              undefined,
              undefined,
              factory.createIdentifier("y"),
              undefined,
              undefined,
              undefined
            )
          ],
          undefined,
          factory.createToken(ts.SyntaxKind.EqualsGreaterThanToken),
          factory.createArrayLiteralExpression(
            [
              mich_to_field_decl(atype.args[0], factory.createIdentifier("x"), 0, 0),
              mich_to_field_decl(atype.args[1], factory.createIdentifier("y"), 0, 0)
            ],
            false
          )
        )
      ]
    )
    case "record": {
      const larg = idx + 1 == len ? factory.createCallExpression(
        factory.createIdentifier("mich_to_"+ atype.name),
        undefined,
        [factory.createObjectLiteralExpression(
        [
          factory.createPropertyAssignment(
            factory.createIdentifier("prim"),
            factory.createStringLiteral("Pair")
          ),
          factory.createPropertyAssignment(
            factory.createIdentifier("args"),
            factory.createCallExpression(
              factory.createPropertyAccessExpression(
                factory.createIdentifier("fields"),
                factory.createIdentifier("slice")
              ),
              undefined,
              [factory.createNumericLiteral(idx)]
            )
          )
        ],
        false
      ), factory.createIdentifier("collapsed")]) : factory.createCallExpression(
        factory.createIdentifier("mich_to_" + atype.name),
        undefined,
        [arg, factory.createIdentifier("collapsed")])
      return larg
    }
    case "option" :
      return contained_type_to_field_decl("mich_to_option", arg, atype.args[0])
    case "set" :
    case "list":
      return contained_type_to_field_decl("mich_to_list", arg, atype.args[0])
    case "tuple":
      return mich_to_tuple(atype.args, arg)
    default :
      return factory.createCallExpression(
        factory.createPropertyAccessExpression(
          factory.createIdentifier("ex"),
          factory.createIdentifier(archetype_type_to_mich_to_name(atype))
        ),
        undefined,
        [arg]
      )
  }
}

export const archetype_type_to_mich_to_name = (atype : ArchetypeType) : string => {
  switch (atype.node) {
    case "date"     : return "mich_to_date"
    case "nat"      : return "mich_to_nat"
    case "int"      : return "mich_to_int"
    case "currency" : return "mich_to_tez"
    case "duration" : return "mich_to_duration"
    case "bool"     : return "mich_to_bool"
    case "string"   : return "mich_to_string"
    case "rational" : return "mich_to_rational"
    case "address"  : return "mich_to_address"
    case "bytes"    : return "mich_to_bytes"
    case "signature": return "mich_to_signature"
    case "key"      : return "mich_to_key"
    default: throw new Error("archetype_type_to_mich_to_name: unknown type '" + atype.node + "'")
  }
}

/* storage element getter formulas ----------------------------------------- */

const access_nth_field = (x : ts.Expression, i : number) : ts.Expression => {
  return factory.createElementAccessExpression(
    x,
    factory.createElementAccessExpression(
      factory.createCallExpression(
        factory.createPropertyAccessExpression(
          factory.createIdentifier("Object"),
          factory.createIdentifier("keys")
        ),
        undefined,
        [x]
      ),
      factory.createNumericLiteral(""+i)
    )
  )
}

const get_record_type = (name : string | null, ci : ContractInterface) => {
  if (name != null) {
    for (let i = 0; i < ci.types.records.length; i++) {
      if (ci.types.records[i].name == name) {
        return ci.types.records[i]
      }
    }
  }
  throw new Error("get_record_type: '" + name + "' not found")
}

const get_asset_type = (name : string | null, ci : ContractInterface) => {
  if (name != null) {
    for (let i = 0; i < ci.types.assets.length; i++) {
      if (ci.types.assets[i].name == name) {
        return ci.types.assets[i]
      }
    }
  }
  throw new Error("get_asset_type: '" + name + "' not found")
}

const get_field_annot_names = (r : Record) : { [key: string] : string } => {
  const internal_get_fan =
  (mt : MichelsonType, idx : number, acc : { [key: string] : string }) : [ number, { [key: string] : string } ] => {
    if (mt.annots.length > 0) {
      const annot = mt.annots[0].slice(1)
      acc[r.fields[idx].name] = annot
      return [ idx + 1, acc ]
    } else {
      switch (mt.prim) {
        case "pair" : {
          // left
          const [idx_left,   acc_left] = internal_get_fan(mt.args[0], idx, acc)
          // right
          const [idx_right, acc_right] = internal_get_fan(mt.args[1], idx_left, acc_left)
          return [idx_right, acc_right]
        }
        default : throw new Error("internal_get_fan: found a node which is not annotated nor is a pair")
      }
    }
  }
  const [ _, res ] = internal_get_fan(r.type_michelson, 0, {})
  return res
}

const get_lambda_form = (body : ts.Statement[], arg : ts.Expression) : ts.Expression => {
  return factory.createCallExpression(
    factory.createParenthesizedExpression(factory.createArrowFunction(
      undefined,
      undefined,
      [factory.createParameterDeclaration(
        undefined,
        undefined,
        undefined,
        factory.createIdentifier("x"),
        undefined,
        undefined,
        undefined
      )],
      undefined,
      factory.createToken(ts.SyntaxKind.EqualsGreaterThanToken),
      factory.createBlock(
        body,
        false
      )
    )),
    undefined,
    [arg]
  )
}

const get_enum = (name : string | null, ci : ContractInterface) => {
  for (var i = 0; i < ci.types.enums.length; i++) {
    if (ci.types.enums[i].name == name) {
      return ci.types.enums[i]
    }
  }
  return null
}

const make_enum_type_case_body = (elt : ts.Expression, c : EnumValue, ci : ContractInterface) => {
  if (c.types.length == 0) {
    return factory.createReturnStatement(factory.createNewExpression(
      factory.createIdentifier(c.name),
      undefined,
      []
    ))
  } else {
    var atype : ArchetypeType
    if (c.types.length == 1) {
      atype = c.types[0]
    } else {
      atype = {
        node : "tuple",
        name : null,
        args : c.types
      }
    }
    return factory.createReturnStatement(factory.createNewExpression(
      factory.createIdentifier(c.name),
      undefined,
      [factory.createCallExpression(
        factory.createParenthesizedExpression(factory.createArrowFunction(
          undefined,
          undefined,
          [factory.createParameterDeclaration(
            undefined,
            undefined,
            undefined,
            factory.createIdentifier("x"),
            undefined,
            undefined,
            undefined
          )],
          archetype_type_to_ts_type(atype),
          factory.createToken(ts.SyntaxKind.EqualsGreaterThanToken),
          factory.createBlock(
            get_return_body(factory.createIdentifier("x"), atype, ci),
            false
          )
        )),
        undefined,
        [factory.createPropertyAccessExpression(
          elt,
          factory.createIdentifier(c.name)
        )]
      )]
    ))
  }
}

const make_enum_return_body = (elt : ts.Expression, e : Enum, ci : ContractInterface) : ts.Statement => {
  return e.constructors.slice(1).reduce(
    (acc, c) => {
      return factory.createIfStatement(
        factory.createBinaryExpression(
          factory.createPropertyAccessExpression(
            elt,
            factory.createIdentifier(c.name)
          ),
          factory.createToken(ts.SyntaxKind.ExclamationEqualsEqualsToken),
          factory.createIdentifier("undefined")
        ),
        factory.createBlock(
          [make_enum_type_case_body(elt, c, ci)],
          true
        ),
        acc
      )
    },
    <ts.Statement>make_enum_type_case_body(elt, e.constructors[0], ci)
  )
}

export const get_return_body = (elt : ts.Expression, atype: ArchetypeType, ci : ContractInterface) : ts.Statement[] => {
  switch (atype.node) {
    case "enum"     : {
      const e = get_enum(atype.name, ci)
      if (e != null) {
        return [make_enum_return_body(elt, e, ci)]
      }
      throw new Error("enum not found: " + atype.name)
    }
    case "bool"     :
    case "string"   : return [factory.createReturnStatement(elt)]
    case "int"      :
    case "nat"      :
    case "bytes"    :
    case "address"  :
    case "signature":
    case "key"      :
    case "duration" : return [factory.createReturnStatement(factory.createNewExpression(
      factory.createPropertyAccessExpression(
        factory.createIdentifier("ex"),
        factory.createIdentifier(atype.node.charAt(0).toUpperCase() + atype.node.slice(1))
      ),
      undefined,
      [ elt ]
    ))]
    case "rational" :
      return [factory.createReturnStatement(factory.createNewExpression(
      factory.createPropertyAccessExpression(
        factory.createIdentifier("ex"),
        factory.createIdentifier("Rational")
      ),
      undefined,
      [
        access_nth_field(elt, 0),
        access_nth_field(elt, 1)
      ]
    ))]
    case "currency" : return [factory.createReturnStatement(factory.createNewExpression(
      factory.createPropertyAccessExpression(
        factory.createIdentifier("ex"),
        factory.createIdentifier("Tez")
      ),
      undefined,
      [ elt, factory.createStringLiteral("mutez") ]
    ))]
    case "date"    : return [factory.createReturnStatement(factory.createNewExpression(
      factory.createIdentifier("Date"),
      undefined,
      [ elt ]
    ))]
    case "option"  : return [factory.createReturnStatement(factory.createNewExpression(
      factory.createPropertyAccessExpression(
        factory.createIdentifier("ex"),
        factory.createIdentifier("Option")
      ),
      [ archetype_type_to_ts_type(atype.args[0]) ],
      [factory.createConditionalExpression(
        factory.createBinaryExpression(
          elt,
          factory.createToken(ts.SyntaxKind.EqualsEqualsToken),
          factory.createNull()
        ),
        factory.createToken(ts.SyntaxKind.QuestionToken),
        factory.createNull(),
        factory.createToken(ts.SyntaxKind.ColonToken),
        get_lambda_form(get_return_body(factory.createIdentifier("x"), atype.args[0], ci), elt)
      )]
    ))]
    case "set"  :
    case "list" : {
      return [
        factory.createVariableStatement(
          undefined,
          factory.createVariableDeclarationList(
            [factory.createVariableDeclaration(
              factory.createIdentifier("res"),
              undefined,
              archetype_type_to_ts_type(atype),
              factory.createArrayLiteralExpression(
                [],
                false
              )
            )],
            ts.NodeFlags.Const
          )
        ),
        factory.createForStatement(
          factory.createVariableDeclarationList(
            [factory.createVariableDeclaration(
              factory.createIdentifier("i"),
              undefined,
              undefined,
              factory.createNumericLiteral("0")
            )],
            ts.NodeFlags.Let
          ),
          factory.createBinaryExpression(
            factory.createIdentifier("i"),
            factory.createToken(ts.SyntaxKind.LessThanToken),
            factory.createPropertyAccessExpression(
              elt,
              factory.createIdentifier("length")
            )
          ),
          factory.createPostfixUnaryExpression(
            factory.createIdentifier("i"),
            ts.SyntaxKind.PlusPlusToken
          ),
          factory.createBlock(
            [factory.createExpressionStatement(factory.createCallExpression(
              factory.createPropertyAccessExpression(
                factory.createIdentifier("res"),
                factory.createIdentifier("push")
              ),
              undefined,
              [ get_lambda_form(
                  get_return_body(factory.createIdentifier("x"), atype.args[0], ci),
                  factory.createElementAccessExpression(
                    elt,
                    factory.createIdentifier("i")
                  )
                )
              ]
            ))],
            true
          )
        ),
        factory.createReturnStatement(factory.createIdentifier("res"))
      ];
    }
    case "asset" : {
      const a = get_asset_type(atype.name, ci)
      const fields_no_key = a.fields.filter(x => !x.is_key)
      const keys = a.fields.filter(x => x.is_key)
      const key_type : ArchetypeType = keys.length > 1 ? {
        node : "tuple",
        name : null,
        args : keys.map(x => x.type)
      } : keys[0].type
      if (fields_no_key.length > 1) {
        // create a record type in Contract Interface corresponding to asset value
        const asset_value_record_type : Record = {
          name           : a.name + "_value",
          fields         : fields_no_key,
          type_michelson : a.value_type_michelson
        }
        const augmented_ci : ContractInterface = { ...ci,
          types : { ...ci.types,
            records : [ ...ci.types.records, asset_value_record_type]
          }
        }
        const map_type : ArchetypeType = {
          node : "map",
          name : a.name,
          args : [
            key_type,
            {
              node : "record",
              name : a.name + "_value",
              args : []
            }
          ]
        }
        return get_return_body(elt, map_type, augmented_ci)
      } else if (fields_no_key.length == 1) {
        // create local equivalent type to map<key, value>
        const map_type : ArchetypeType = {
          node : "map",
          name : a.name,
          args : [
            key_type,
            fields_no_key[0].type
          ]
        }
        return get_return_body(elt, map_type, ci)
      } else {
        const list_type : ArchetypeType = {
          node : "list",
          name : null,
          args : [ key_type ]
        }
        return get_return_body(elt, list_type, ci)
      }
    }
    case "map" : {
      return [
        factory.createVariableStatement(
          undefined,
          factory.createVariableDeclarationList(
            [factory.createVariableDeclaration(
              factory.createIdentifier("res"),
              undefined,
              archetype_type_to_ts_type(atype)
              ,
              factory.createArrayLiteralExpression(
                [],
                false
              )
            )],
            ts.NodeFlags.Let
          )
        ),
        factory.createForOfStatement(
          undefined,
          factory.createVariableDeclarationList(
            [factory.createVariableDeclaration(
              factory.createIdentifier("e"),
              undefined,
              undefined,
              undefined
            )],
            ts.NodeFlags.Let
          ),
          factory.createCallExpression(
            factory.createPropertyAccessExpression(
              elt,
              factory.createIdentifier("entries")
            ),
            undefined,
            []
          ),
          factory.createBlock(
            [factory.createExpressionStatement(factory.createCallExpression(
              factory.createPropertyAccessExpression(
                factory.createIdentifier("res"),
                factory.createIdentifier("push")
              ),
              undefined,
              [factory.createArrayLiteralExpression(
                [
                  get_lambda_form(
                    get_return_body(factory.createIdentifier("x"), atype.args[0], ci),
                    factory.createElementAccessExpression(
                      factory.createIdentifier("e"),
                      factory.createIdentifier("0")
                    )
                  ),
                  get_lambda_form(
                    get_return_body(factory.createIdentifier("x"), atype.args[1], ci),
                    factory.createElementAccessExpression(
                      factory.createIdentifier("e"),
                      factory.createIdentifier("1")
                    )
                  )
                ],
                false
              )]
            ))],
            true
          )
        ),
        factory.createReturnStatement(factory.createIdentifier("res"))
      ]
    }
    case "tuple" : {
      return [ factory.createReturnStatement(factory.createArrayLiteralExpression(
        atype.args.map((t,i) => {
          return get_lambda_form(
            get_return_body(factory.createIdentifier("x"), t, ci),
            factory.createElementAccessExpression(
              elt,
              factory.createElementAccessExpression(
                factory.createCallExpression(
                  factory.createPropertyAccessExpression(
                    factory.createIdentifier("Object"),
                    factory.createIdentifier("keys")
                  ),
                  undefined,
                  [factory.createIdentifier("x")]
                ),
                factory.createNumericLiteral("" + i)
              )
            )
          )
        }),
        false
      ))]
    }
    case "record" : {
      const name = atype.name
      if (null != name) {
        const r = get_record_type(name, ci)
        const field_annot_names = get_field_annot_names(r)
        return [factory.createReturnStatement(factory.createNewExpression(
          factory.createIdentifier(name),
          undefined,
          r.fields.map(f => {
            const field_value = factory.createPropertyAccessExpression(
              elt,
              factory.createIdentifier(field_annot_names[f.name])
            )
            return  get_lambda_form(get_return_body(factory.createIdentifier("x"), f.type, ci), field_value)
          })
        ))]
      }
    }
  }
  throw new Error("get_return_body: type '" + atype.node + "' not found")
}

/* Typescript To Micheline utils ------------------------------------------------------ */

const class_to_mich = (x  :ts.Expression) => {
  return factory.createCallExpression(
    factory.createPropertyAccessExpression(
      x,
      factory.createIdentifier("to_mich")
    ),
    undefined,
    []
  )
}

const string_to_mich = (x : ts.Expression) => {
  return factory.createCallExpression(
    factory.createPropertyAccessExpression(
      factory.createIdentifier("ex"),
      factory.createIdentifier("string_to_mich")
    ),
    undefined,
    [x]
  );
}

export const unit_to_mich = () => {
  return factory.createCallExpression(
    factory.createPropertyAccessExpression(
      factory.createIdentifier("ex"),
      factory.createIdentifier("unit_to_mich")
    ),
    undefined,
    []
  );
}

const bool_to_mich = (x : ts.Expression) => {
  return factory.createCallExpression(
    factory.createPropertyAccessExpression(
      factory.createIdentifier("ex"),
      factory.createIdentifier("bool_to_mich")
    ),
    undefined,
    [x]
  );
}

const date_to_mich = (x : ts.Expression) => {
  return factory.createCallExpression(
    factory.createPropertyAccessExpression(
      factory.createIdentifier("ex"),
      factory.createIdentifier("date_to_mich")
    ),
    undefined,
    [x]
  );
}

const tuple_to_mich = (name : string, types : ArchetypeType[]) => {
  return factory.createCallExpression(
    factory.createPropertyAccessExpression(
      factory.createIdentifier("ex"),
      factory.createIdentifier("pair_to_mich")
    ),
    undefined,
    [factory.createArrayLiteralExpression(
      types.map((x,i) => function_param_to_mich({ name: name + "[" + i + "]", type: x })),
      false
    )]
  )
}

const list_to_mich = (name : string, atype : ArchetypeType) => {
  return internal_list_to_mich(name, [
    factory.createReturnStatement(function_param_to_mich({ name: "x", type: atype }))
  ])
}

const internal_list_to_mich = (name : string, body : ts.Statement[]) => {
  return factory.createCallExpression(
    factory.createPropertyAccessExpression(
      factory.createIdentifier("ex"),
      factory.createIdentifier("list_to_mich")
    ),
    undefined,
    [
      factory.createIdentifier(name),
      factory.createArrowFunction(
        undefined,
        undefined,
        [factory.createParameterDeclaration(
          undefined,
          undefined,
          undefined,
          factory.createIdentifier("x"),
          undefined,
          undefined,
          undefined
        )],
        undefined,
        factory.createToken(ts.SyntaxKind.EqualsGreaterThanToken),
        factory.createBlock(
          body,
          true
        )
      )
    ]
  )
}

const internal_map_to_mich = (name : string, decls : ts.CallExpression[]) => {
  return internal_list_to_mich(name, [
    factory.createVariableStatement(
      undefined,
      factory.createVariableDeclarationList(
        [factory.createVariableDeclaration(
          factory.createIdentifier("x_key"),
          undefined,
          undefined,
          factory.createElementAccessExpression(
            factory.createIdentifier("x"),
            factory.createNumericLiteral("0")
          )
        )],
        ts.NodeFlags.Const
      )
    ),
    factory.createVariableStatement(
      undefined,
      factory.createVariableDeclarationList(
        [factory.createVariableDeclaration(
          factory.createIdentifier("x_value"),
          undefined,
          undefined,
          factory.createElementAccessExpression(
            factory.createIdentifier("x"),
            factory.createNumericLiteral("1")
          )
        )],
        ts.NodeFlags.Const
      )
    ),
    factory.createReturnStatement(factory.createCallExpression(
      factory.createPropertyAccessExpression(
        factory.createIdentifier("ex"),
        factory.createIdentifier("elt_to_mich")
      ),
      undefined,
      decls
    ))
  ])
}

const map_to_mich = (name : string, key_type : ArchetypeType | null, value_type : ArchetypeType | null) => {
  if (null == key_type) throw new Error("map_to_mich: null key type")
  if (null == value_type) throw new Error("map_to_mich: null value type")
  return internal_map_to_mich(name, [
    function_param_to_mich({ name: "x_key", type: key_type }),
    function_param_to_mich({ name: "x_value", type: value_type })
  ])
}

export const function_param_to_mich = (fp: FunctionParameter) : ts.CallExpression => {
  switch (fp.type.node) {
    case "unit"        : return unit_to_mich()
    case "string"      : return string_to_mich(factory.createIdentifier(fp.name))
    case "bool"        : return bool_to_mich(factory.createIdentifier(fp.name))
    case "date"        : return date_to_mich(factory.createIdentifier(fp.name))
    case "int"         :
    case "nat"         :
    case "bytes"       :
    case "currency"    :
    case "address"     :
    case "duration"    :
    case "rational"    :
    case "option"      :
    case "signature"   :
    case "key"         :
    case "enum"        :
    case "or"          :
    case "asset_value" :
    case "record"      :
    case "contract"    : return class_to_mich(factory.createIdentifier(fp.name))
    case "tuple"       : return tuple_to_mich(fp.name, fp.type.args)
    case "set"         :
    case "list"        : return list_to_mich(fp.name, fp.type.args[0])
    case "map"         :
    case "big_map"     : return map_to_mich(fp.name, fp.type.args[0], fp.type.args[1])
    default            : throw new Error("function_param_to_mich: unhandled type '" + fp.type.node + "'")
  }
}

export const function_params_to_mich = (a : Array<FunctionParameter>) => {
  if (a.length == 0) {
    return factory.createPropertyAccessExpression(
      factory.createIdentifier("ex"),
      factory.createIdentifier("unit_mich")
    )
  } else if (a.length == 1) {
    return function_param_to_mich(a[0])
  } else {
    return factory.createCallExpression(
      factory.createPropertyAccessExpression(
        factory.createIdentifier("ex"),
        factory.createIdentifier("pair_to_mich")
      ),
      undefined,
      [factory.createArrayLiteralExpression(
        a.map((x, i) => function_param_to_mich(x)),
        true
      )]
    )
  }
}

const get_archetype_type_of = (name : string, fields : Array<Omit<Field, "is_key">>) => {
  for (var i = 0; i < fields.length; i++) {
    const field = fields[i]
    if (field.name == name) {
      return field.type
    }
  }
}

const get_archetype_type_from_idx = (idx : number, fields : Array<Partial<Field>>) => {
  return fields[idx].type
}

const get_field_name_from_idx = (idx : number, fields : Array<Partial<Field>>) => {
  return fields[idx].name
}

const mich_type_to_archetype = (mt : MichelsonType) : ArchetypeType => {
  switch (mt.prim) {
    case "string"    : return { node: "string" , name: null, args: [] }
    case "int"       : return { node: "int"    , name: null, args: [] }
    case "nat"       : return { node: "nat"    , name: null, args: [] }
    case "timestamp" : return { node: "date"   , name: null, args: [] }
    case "address"   : return { node: "address", name: null, args: [] }
    case "bytes"     : return { node: "bytes"  , name: null, args: [] }
    case "unit"      : return { node: "unit"   , name :null, args: [] }
    case "list"      : return { node: "list"   , name: null, args: [mich_type_to_archetype(mt.args[0])] }
    case "pair"      : return { node: "tuple"  , name: null, args: [mich_type_to_archetype(mt.args[0]), mich_type_to_archetype(mt.args[1])] }
    default: throw new Error("mich_type_to_archetype: cannot convert prim '" + mt.prim + "'")
  }
}

/**
 * Generates To Michelson TS expression that follows its Michelson Type structure
 * @param v value name
 * @param mt local michelson type
 * @param fields base of fields for type lookup
 * @param fidx field index
 * @returns pair of number of fields looked up so far and 'to_mich' expression
 */
export const entity_to_mich = (v : string, mt: MichelsonType, fields : Array<Partial<Field>>, fidx : number = 0) : [number, ts.CallExpression] => {
  if (mt.annots.length > 0) {
    //const name = mt.annots[0].slice(1)
    const name = get_field_name_from_idx(fidx, fields)

    //const atype = get_archetype_type_of(name, fields)
    const atype = get_archetype_type_from_idx(fidx, fields)
    if (undefined == atype) {
      throw new Error("entity_to_mich: type not found for '" + name + "'")
    }
    const fp = { name: v + "." + name, type : atype }
    return [ fidx + 1, function_param_to_mich(fp) ]
  } else {
    switch (mt.prim) {
      case "pair" : {
        // left
        const [fidx0, expr0] = entity_to_mich(v, mt.args[0], fields, fidx)
        // right
        const [fidx1, expr1] = entity_to_mich(v, mt.args[1], fields, fidx0)
        return [fidx1, factory.createCallExpression(
          factory.createPropertyAccessExpression(
            factory.createIdentifier("ex"),
            factory.createIdentifier("pair_to_mich")
          ),
          undefined,
          [factory.createArrayLiteralExpression(
            [ expr0, expr1 ],
            false
          )]
        )]
      }
      case "map"     :
      case "big_map" : {
        // left
        const [ _,    expr0] = entity_to_mich("x_key", mt.args[0], fields.filter(x => x.is_key), fidx)
        // right
        const [fidx1, expr1] = entity_to_mich("x_value", mt.args[1], fields.filter(x => !x.is_key), fidx)
        return [ fidx1, internal_map_to_mich(v, [
          expr0,
          expr1
        ]) ]
      }
      case "set"    : {
        const [ _,    expr0] = entity_to_mich("x", mt.args[0], fields.filter(x => x.is_key), fidx)
        return [ fidx, internal_list_to_mich(v, [
            factory.createReturnStatement(expr0)
          ])
        ]
      }
      default: return [ fidx, function_param_to_mich({ name: v, type: mich_type_to_archetype(mt) }) ]
    }
  }
}


export const value_to_mich_type = (mt : MichelsonType) : ts.CallExpression => {
  switch (mt.prim) {
    case "big_map": return factory.createCallExpression(
      factory.createPropertyAccessExpression(
        factory.createIdentifier("ex"),
        factory.createIdentifier("pair_to_mich_type")
      ),
      undefined,
      [ factory.createStringLiteral("big_map"), value_to_mich_type(mt.args[0]), value_to_mich_type(mt.args[1]) ]
    )
    case "map": return factory.createCallExpression(
      factory.createPropertyAccessExpression(
        factory.createIdentifier("ex"),
        factory.createIdentifier("pair_to_mich_type")
      ),
      undefined,
      [ factory.createStringLiteral("map"), value_to_mich_type(mt.args[0]), value_to_mich_type(mt.args[1]) ]
    )
    case "pair": return factory.createCallExpression(
      factory.createPropertyAccessExpression(
        factory.createIdentifier("ex"),
        factory.createIdentifier("pair_array_to_mich_type")
      ),
      undefined,
      [factory.createArrayLiteralExpression(
        [ value_to_mich_type(mt.args[0]), value_to_mich_type(mt.args[1]) ],
        true
      )]
    )
    case "option": {
      const annots = mt.annots.length >= 1 ? [factory.createStringLiteral(mt.annots[0])] : []
      return factory.createCallExpression(
      factory.createPropertyAccessExpression(
        factory.createIdentifier("ex"),
        factory.createIdentifier("option_annot_to_mich_type")
      ),
      undefined,
      [
        value_to_mich_type(mt.args[0]),
        factory.createArrayLiteralExpression(
          annots,
          false
        )
      ])
    }
    case "set":
    case "list": {
      const annots = mt.annots.length >= 1 ? [factory.createStringLiteral(mt.annots[0])] : []
      return factory.createCallExpression(
        factory.createPropertyAccessExpression(
          factory.createIdentifier("ex"),
          factory.createIdentifier("list_annot_to_mich_type")
        ),
        undefined,
        [
          value_to_mich_type(mt.args[0]),
          factory.createArrayLiteralExpression(
            annots,
            false
          )
        ])
    }
    default: {
      const prim = mt.prim == null ? "string" : mt.prim
      const annots = mt.annots.length >= 1 ? [factory.createStringLiteral(mt.annots[0])] : []
      return factory.createCallExpression(
        factory.createPropertyAccessExpression(
          factory.createIdentifier("ex"),
          factory.createIdentifier("prim_annot_to_mich_type")
        ),
        undefined,
        [
          factory.createStringLiteral(prim),
          factory.createArrayLiteralExpression(
            annots,
            false
          )
        ]
      )
    }
  }
}

/* Errors ------------------------------------------------------------------ */

export const mich_type_to_error = (expr : MichelsonType) : [string, ts.Expression] => {
  if (expr.string != null) {
    return [ expr.string.split(' ').join('_').toUpperCase(), factory.createCallExpression(
      factory.createPropertyAccessExpression(
        factory.createIdentifier("ex"),
        factory.createIdentifier("string_to_mich")
      ),
      undefined,
      [factory.createStringLiteral("\"" + expr.string + "\"")]
    ) ]
  } else if (expr.prim == "Pair") {
    const args = expr.args.map(mich_type_to_error)
    const label = args.reduce((acc, n) => {
      return (acc == "" ? "" : acc + "_") + n[0].toUpperCase()
    }, "")
    return [ label, factory.createCallExpression(
      factory.createPropertyAccessExpression(
        factory.createIdentifier("ex"),
        factory.createIdentifier("pair_to_mich")
      ),
      undefined,
      [factory.createArrayLiteralExpression(args.map(p => p[1]))]
    ) ]
  } else {
    return [ "NOT_HANDLED", factory.createCallExpression(
      factory.createPropertyAccessExpression(
        factory.createIdentifier("ex"),
        factory.createIdentifier("string_to_mich")
      ),
      undefined,
      [factory.createStringLiteral("" + expr.string)]
    ) ]
  }
}

export const make_error = (error : Error) : [ string, ts.Expression ] => {
  switch (error.kind) {
    case "InvalidCondition" :
      return [ error.args[0], mich_type_to_error(error.expr)[1] ]
    default :
      return mich_type_to_error(error.expr)
  }
}

/* Completium litteral ------------------------------------------------ */

export const make_completium_literal = (name : string, t : ArchetypeType) : ts.Expression => {
  switch (t.node) {
    case "address"   :
    case "tez"       :
    case "nat"       :
    case "int"       :
    case "bytes"     :
    case "signature" :
    case "key"       :
      return factory.createCallExpression(
        factory.createPropertyAccessExpression(
          factory.createIdentifier(name),
          factory.createIdentifier("toString")
        ),
        undefined,
        []
      )
    case "date"   :
      return factory.createCallExpression(
        factory.createPropertyAccessExpression(
          factory.createIdentifier(name),
          factory.createIdentifier("toIsoString")
        ),
        undefined,
        []
      )
    case "option" :
      return factory.createConditionalExpression(
        factory.createCallExpression(
          factory.createPropertyAccessExpression(
            factory.createIdentifier(name),
            factory.createIdentifier("is_some")
          ),
          undefined,
          []
        ),
        factory.createToken(ts.SyntaxKind.QuestionToken),
        make_completium_literal(name + ".get()", t.args[0]),
        factory.createToken(ts.SyntaxKind.ColonToken),
        factory.createNull()
      )
    case "list" :
    case "set"  :
      return factory.createCallExpression(
        factory.createPropertyAccessExpression(
          factory.createIdentifier(name),
          factory.createIdentifier("map")
        ),
        undefined,
        [factory.createArrowFunction(
          undefined,
          undefined,
          [factory.createParameterDeclaration(
            undefined,
            undefined,
            undefined,
            factory.createIdentifier("e"),
            undefined,
            undefined,
            undefined
          )],
          undefined,
          factory.createToken(ts.SyntaxKind.EqualsGreaterThanToken),
          make_completium_literal("e", t.args[0])
        )]
      )
    case "tuple" :
      return factory.createArrayLiteralExpression(
        t.args.map((t, i) => {
          return make_completium_literal(name + "[" + i + "]", t)
        })
        ,
        false
      )
    case "big_map" :
    case "map"     :
      return factory.createCallExpression(
        factory.createPropertyAccessExpression(
          factory.createIdentifier(name),
          factory.createIdentifier("map")
        ),
        undefined,
        [factory.createArrowFunction(
          undefined,
          undefined,
          [factory.createParameterDeclaration(
            undefined,
            undefined,
            undefined,
            factory.createIdentifier("e"),
            undefined,
            undefined,
            undefined
          )],
          undefined,
          factory.createToken(ts.SyntaxKind.EqualsGreaterThanToken),
          factory.createBlock(
            [factory.createReturnStatement(factory.createObjectLiteralExpression(
              [
                factory.createPropertyAssignment(
                  factory.createIdentifier("key"),
                  make_completium_literal("e[0]", t.args[0])
                ),
                factory.createPropertyAssignment(
                  factory.createIdentifier("value"),
                  make_completium_literal("e[1]", t.args[1])
                )
              ],
              true
            ))],
            true
          )
        )]
      )
    default : return factory.createIdentifier(name)
  }
}

/* constant code functions */

export const make_to_string_decl = () => {
  return factory.createMethodDeclaration(
    undefined,
    undefined,
    undefined,
    factory.createIdentifier("toString"),
    undefined,
    undefined,
    [],
    factory.createKeywordTypeNode(ts.SyntaxKind.StringKeyword),
    factory.createBlock(
      [factory.createReturnStatement(factory.createCallExpression(
        factory.createPropertyAccessExpression(
          factory.createIdentifier("JSON"),
          factory.createIdentifier("stringify")
        ),
        undefined,
        [
          factory.createThis(),
          factory.createNull(),
          factory.createNumericLiteral("2")
        ]
      ))],
      true
    )
  )
}