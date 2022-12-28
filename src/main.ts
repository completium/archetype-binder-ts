import ts, { createPrinter, createSourceFile, factory, ListFormat, NewLineKind, NodeFlags, ScriptKind, ScriptTarget, SyntaxKind } from 'typescript';

import { archetype_type_to_mich_type, archetype_type_to_ts_type, ArchetypeType, Asset, ContractInterface, ContractParameter, entity_to_mich, Entrypoint, Enum, EnumValue, Event, Field, function_param_to_mich, function_params_to_mich, FunctionParameter, get_constructor, get_get_address_decl, get_get_balance_decl, Getter, make_cmp_body, make_error, make_to_string_decl, Record, storage_to_mich, StorageElement, value_to_mich_type, View, ATNamed, RawContractInterface, raw_to_contract_interface, mich_to_archetype_type, MichelsonType, get_path, make_arg, MTPrimMulti, compute_path_enum, e_left_right, is_asset_one_field_key, is_asset_one_field_val } from "./utils";

const file = createSourceFile("source.ts", "", ScriptTarget.ESNext, false, ScriptKind.TS);
const printer = createPrinter({ newLine: NewLineKind.LineFeed });

// https://ts-ast-viewer.com/#

const make_mich_to_entity_decl = (name: string, body: ts.Statement[]) => {
  return factory.createVariableStatement(
    [factory.createModifier(ts.SyntaxKind.ExportKeyword)],
    factory.createVariableDeclarationList(
      [factory.createVariableDeclaration(
        factory.createIdentifier("mich_to_" + name),
        undefined,
        undefined,
        factory.createArrowFunction(
          undefined,
          undefined,
          [factory.createParameterDeclaration(
            undefined,
            undefined,
            undefined,
            factory.createIdentifier("v"),
            undefined,
            factory.createTypeReferenceNode(
              factory.createQualifiedName(
                factory.createIdentifier("att"),
                factory.createIdentifier("Micheline")
              ),
              undefined
            ),
            undefined
          ),
          factory.createParameterDeclaration(
            undefined,
            undefined,
            undefined,
            factory.createIdentifier("collapsed"),
            undefined,
            factory.createKeywordTypeNode(ts.SyntaxKind.BooleanKeyword),
            factory.createFalse()
          )],
          factory.createTypeReferenceNode(
            factory.createIdentifier(name),
            undefined
          ),
          factory.createToken(ts.SyntaxKind.EqualsGreaterThanToken),
          factory.createBlock(body, true)
        )
      )],
      ts.NodeFlags.Const
    ))
}

const fields_to_mich_to_entity_decl = (name: string, fields: Array<Omit<Field, "is_key">>, ci: ContractInterface) => {
  return make_mich_to_entity_decl(name, [
    factory.createVariableStatement(
      undefined,
      factory.createVariableDeclarationList(
        [factory.createVariableDeclaration(
          factory.createIdentifier("fields"),
          undefined,
          factory.createArrayTypeNode(factory.createTypeReferenceNode(
            factory.createQualifiedName(
              factory.createIdentifier("att"),
              factory.createIdentifier("Micheline")
            ),
            undefined
          )),
          factory.createArrayLiteralExpression(
            [],
            false
          )
        )],
        ts.NodeFlags.Let
      )
    ),
    factory.createIfStatement(
      factory.createIdentifier("collapsed"),
      factory.createBlock(
        [factory.createExpressionStatement(factory.createBinaryExpression(
          factory.createIdentifier("fields"),
          factory.createToken(ts.SyntaxKind.EqualsToken),
          factory.createCallExpression(
            factory.createPropertyAccessExpression(
              factory.createIdentifier("att"),
              factory.createIdentifier("mich_to_pairs")
            ),
            undefined,
            [factory.createIdentifier("v")]
          )
        ))],
        true
      ),
      factory.createBlock(
        [factory.createExpressionStatement(factory.createBinaryExpression(
          factory.createIdentifier("fields"),
          factory.createToken(ts.SyntaxKind.EqualsToken),
          factory.createCallExpression(
            factory.createPropertyAccessExpression(
              factory.createIdentifier("att"),
              factory.createIdentifier("annotated_mich_to_array")
            ),
            undefined,
            [
              factory.createIdentifier("v"),
              factory.createIdentifier(name + "_mich_type")
            ]
          )
        ))],
        true
      )
    ),
    factory.createReturnStatement(factory.createNewExpression(
      factory.createIdentifier(name),
      undefined,
      fields.map((x, i) => {
        return mich_to_archetype_type(x.type, factory.createElementAccessExpression(
          factory.createIdentifier("fields"),
          factory.createIdentifier(i.toString())
        ), ci)
      })
    ))
  ])
}

const field_to_cmp_body = (field: Omit<Field, "is_key">, arg_a: ts.Expression, arg_b: ts.Expression, ci: ContractInterface) => {
  const a = factory.createPropertyAccessExpression(
    arg_a,
    factory.createIdentifier(field.name)
  )
  const b = factory.createPropertyAccessExpression(
    arg_b,
    factory.createIdentifier(field.name)
  )
  return make_cmp_body(a, b, field.type, ci)
}

const entity_to_mich_type_decl = (name: string, mt: MichelsonType) => {
  return factory.createVariableStatement(
    [factory.createModifier(ts.SyntaxKind.ExportKeyword)],
    factory.createVariableDeclarationList(
      [factory.createVariableDeclaration(
        factory.createIdentifier(name),
        undefined,
        factory.createTypeReferenceNode(
          factory.createQualifiedName(
            factory.createIdentifier("att"),
            factory.createIdentifier("MichelineType")
          ),
          undefined
        ),
        value_to_mich_type(mt)
      )],
      ts.NodeFlags.Const
    )
  )
}

const assetKeyToMichTypeDecl = (a: Asset) => entity_to_mich_type_decl(a.name + "_key_mich_type", a.key_type_michelson)
const assetValueToMichTypeDecl = (a: Asset) => entity_to_mich_type_decl(a.name + "_value_mich_type", a.value_type_michelson)
const assetContainerToMichTypeDecl = (a: Asset) => entity_to_mich_type_decl(a.name + "_container_mich_type", a.container_type_michelson)
const recordToMichTypeDecl = (r: Record) => entity_to_mich_type_decl(r.name + "_mich_type", r.type_michelson)

const generate_storage_utils = (ci: ContractInterface) => {
  if (ci.storage_type?.value == undefined) return []
  return [
    // generate storage michelson type
    entity_to_mich_type_decl("storage_mich_stype", ci.storage_type?.value),
    // generate storage literal maker
    entity_to_mich_decl("storage", ci.storage, storage_to_mich(ci.storage_type.value, ci.storage, ci), ci)
  ]
}

const entity_to_mich_decl = (name: string, args: FunctionParameter[], body: ts.Expression, ci: ContractInterface) => {
  return factory.createVariableDeclarationList(
    [factory.createVariableDeclaration(
      factory.createIdentifier(name + "_arg_to_mich"),
      undefined,
      undefined,
      factory.createArrowFunction(
        undefined,
        undefined,
        args.map(x => contractParameterToParamDecl(x, ci)),
        factory.createTypeReferenceNode(
          factory.createQualifiedName(
            factory.createIdentifier("att"),
            factory.createIdentifier("Micheline")
          ),
          undefined
        ),
        factory.createToken(ts.SyntaxKind.EqualsGreaterThanToken),
        factory.createBlock(
          [factory.createReturnStatement(body)],
          true
        )
      )
    )],
    ts.NodeFlags.Const
  )
}

const entryToArgToMichDecl = (e: Entrypoint | Getter, ci: ContractInterface): ts.VariableDeclarationList => {
  return entity_to_mich_decl(e.name, e.args, function_params_to_mich(e.args, ci), ci)
}

const compute_arg = (root: ts.Expression, name: string, ty: MichelsonType): ts.Expression => {
  const a = name.charAt(0) == '%' ? name : "%" + name
  const path = get_path(a, ty);

  const res = path.reduce((acc, pi) => {
    const expr_arg = factory.createAsExpression(
      acc,
      factory.createTypeReferenceNode(
        factory.createQualifiedName(
          factory.createIdentifier("att"),
          factory.createIdentifier("Mpair")
        ),
        undefined
      )
    );
    return make_arg(expr_arg, pi)
  }, root);
  return res
}

const mich_to_record_body = (name: string, fields: Array<Omit<Field, "is_key">>, mty: MichelsonType, arg: ts.Expression, ci: ContractInterface): ts.Statement[] => {
  const extract_id = (mty: MichelsonType) => {
    let accu: Array<string> = []
    const f = (mty: MichelsonType) => {
      if (mty.annots?.length == 1) {
        accu.push(mty.annots[0])
      } else if ((mty as MTPrimMulti).prim == "pair") {
        (mty as MTPrimMulti).args.forEach(f)
      }
    }
    f(mty)
    return accu
  }

  let args: Array<ts.Expression> = [];
  let ids = fields.map(x => x.name);
  const new_ids = extract_id(mty);
  if (ids.length == new_ids.length) {
    ids = new_ids
  }
  for (let i = 0; i < fields.length; ++i) {
    const field = fields[i];
    const a = compute_arg(arg, ids[i], mty)
    const b = mich_to_archetype_type(field.type, a, ci);
    args.push(b)
  }

  const ret = factory.createReturnStatement(factory.createNewExpression(
    factory.createIdentifier(name),
    undefined,
    args
  ))
  return [ret];
}

const entityToInterfaceDecl = (name: string, mt: MichelsonType, fields: Array<Omit<Field, "is_key">>, mich_body: ts.Statement[], ci: ContractInterface) => {
  return factory.createClassDeclaration(
    undefined,
    [factory.createModifier(ts.SyntaxKind.ExportKeyword)],
    factory.createIdentifier(name),
    undefined,
    [factory.createHeritageClause(
      ts.SyntaxKind.ImplementsKeyword,
      [factory.createExpressionWithTypeArguments(
        factory.createPropertyAccessExpression(
          factory.createIdentifier("att"),
          factory.createIdentifier("ArchetypeType")
        ),
        undefined
      )]
    )],
    [
      factory.createConstructorDeclaration(
        undefined,
        undefined,
        fields.map(x => contractParameterToParamDecl(x, ci, true)),
        factory.createBlock(
          [],
          false
        )
      ),
      make_to_string_decl(),
      factory.createMethodDeclaration(
        undefined,
        undefined,
        undefined,
        factory.createIdentifier("to_mich"),
        undefined,
        undefined,
        [],
        factory.createTypeReferenceNode(
          factory.createQualifiedName(
            factory.createIdentifier("att"),
            factory.createIdentifier("Micheline")
          ),
          undefined
        ),
        factory.createBlock(
          [factory.createReturnStatement((entity_to_mich(fields.length == 1 ? "this." + fields[0].name : "this", mt, fields, 0, ci))[1])],
          true
        )
      ),
      factory.createMethodDeclaration(
        undefined,
        undefined,
        undefined,
        factory.createIdentifier("equals"),
        undefined,
        undefined,
        [factory.createParameterDeclaration(
          undefined,
          undefined,
          undefined,
          factory.createIdentifier("v"),
          undefined,
          factory.createTypeReferenceNode(
            factory.createIdentifier(name),
            undefined
          ),
          undefined
        )],
        factory.createKeywordTypeNode(ts.SyntaxKind.BooleanKeyword),
        factory.createBlock(fields.length > 1 ?
          [factory.createReturnStatement(factory.createCallExpression(
            factory.createPropertyAccessExpression(
              factory.createIdentifier("att"),
              factory.createIdentifier("micheline_equals")
            ),
            undefined,
            [
              factory.createCallExpression(
                factory.createPropertyAccessExpression(
                  factory.createThis(),
                  factory.createIdentifier("to_mich")
                ),
                undefined,
                []
              ),
              factory.createCallExpression(
                factory.createPropertyAccessExpression(
                  factory.createIdentifier("v"),
                  factory.createIdentifier("to_mich")
                ),
                undefined,
                []
              )
            ]
          ))] :
          (fields.length == 1 ?
            [factory.createReturnStatement(field_to_cmp_body(fields[0], factory.createThis(), factory.createIdentifier("v"), ci))] :
            [factory.createReturnStatement(factory.createTrue())]),
          true
        )
      ),
      factory.createMethodDeclaration(
        undefined,
        [factory.createModifier(ts.SyntaxKind.StaticKeyword)],
        undefined,
        factory.createIdentifier("from_mich"),
        undefined,
        undefined,
        [factory.createParameterDeclaration(
          undefined,
          undefined,
          undefined,
          factory.createIdentifier("input"),
          undefined,
          factory.createTypeReferenceNode(
            factory.createQualifiedName(
              factory.createIdentifier("att"),
              factory.createIdentifier("Micheline")
            ),
            undefined
          ),
          undefined
        )],
        factory.createTypeReferenceNode(
          factory.createIdentifier(name),
          undefined
        ),
        factory.createBlock(
          mich_body,
          true
        )
      )
    ]
  )
}

const assetKeyToInterfaceDecl = (a: Asset, ci: ContractInterface): ts.ClassDeclaration[] => {
  const name = a.name + "_key";
  const mty = a.key_type_michelson;
  const fields = a.fields.filter(x => x.is_key);

  const mich_body = mich_to_record_body(name, fields, mty, factory.createIdentifier("input"), ci)
  return fields.length == 1 ? [] : [entityToInterfaceDecl(name, mty, fields, mich_body, ci)]
}

const assetValueToInterfaceDecl = (a: Asset, ci: ContractInterface): ts.ClassDeclaration[] => {
  const name = a.name + "_value";
  const mty = a.value_type_michelson;
  const fields = a.fields.filter(x => !x.is_key);

  const mich_body = mich_to_record_body(name, fields, mty, factory.createIdentifier("input"), ci)
  return fields.length == 1 ? [] : [entityToInterfaceDecl(name, mty, fields, mich_body, ci)]
}

const recordToInterfaceDecl = (r: Record, ci: ContractInterface): ts.ClassDeclaration[] => {
  const mty = r.type_michelson;

  const mich_body = mich_to_record_body(r.name, r.fields, mty, factory.createIdentifier("input"), ci)
  return [entityToInterfaceDecl(r.name, mty, r.fields, mich_body, ci)]
}

const assetContainerToTypeDecl = (a: Asset, ci: ContractInterface) => {
  const ts_key_type = archetype_type_to_ts_type({ node: "asset_key", name: a.name }, ci)
  const ts_val_type = archetype_type_to_ts_type({ node: "asset_value", name: a.name }, ci)

  return factory.createTypeAliasDeclaration(
    undefined,
    [factory.createModifier(SyntaxKind.ExportKeyword)],
    factory.createIdentifier(a.name + "_container"),
    undefined,
    factory.createTypeReferenceNode(
      factory.createIdentifier("Array"),
      [not_a_set(a) ?
        factory.createTupleTypeNode([
          ts_key_type,
          ts_val_type
        ]) :
        ts_key_type
      ]
    ))
}

const contractParameterToParamDecl = (fp: FunctionParameter, ci: ContractInterface, pub = false) => {
  return factory.createParameterDeclaration(
    undefined,
    pub ? [factory.createModifier(ts.SyntaxKind.PublicKeyword)] : [],
    undefined,
    factory.createIdentifier(fp.name),
    undefined,
    archetype_type_to_ts_type(fp.type, ci),
    undefined
  )
}

const entry_to_method = (name: string, args: FunctionParameter[], ret: ts.TypeNode, body: ts.Statement[], ret_undefined: boolean, ci: ContractInterface) => {
  return factory.createMethodDeclaration(
    undefined,
    [factory.createModifier(SyntaxKind.AsyncKeyword)],
    undefined,
    factory.createIdentifier(name),
    undefined,
    undefined,
    args.map(x => contractParameterToParamDecl(x, ci)).concat([
      factory.createParameterDeclaration(
        undefined,
        undefined,
        undefined,
        factory.createIdentifier("params"),
        undefined,
        factory.createTypeReferenceNode(
          factory.createIdentifier("Partial"),
          [factory.createTypeReferenceNode(
            factory.createQualifiedName(
              factory.createIdentifier("ex"),
              factory.createIdentifier("Parameters")
            ),
            undefined
          )]
        ),
        undefined
      )
    ]),
    factory.createTypeReferenceNode(
      factory.createIdentifier("Promise"),
      [ret_undefined ? factory.createUnionTypeNode([ret, factory.createKeywordTypeNode(ts.SyntaxKind.UndefinedKeyword)]) : ret]
    ),
    factory.createBlock(
      [factory.createIfStatement(
        factory.createBinaryExpression(
          factory.createPropertyAccessExpression(
            factory.createThis(),
            factory.createIdentifier("address")
          ),
          factory.createToken(SyntaxKind.ExclamationEqualsToken),
          factory.createIdentifier("undefined")
        ),
        factory.createBlock(
          body,
          true
        ),
        undefined
      ),
      factory.createThrowStatement(factory.createNewExpression(
        factory.createIdentifier("Error"),
        undefined,
        [factory.createStringLiteral("Contract not initialised")]
      ))],
      true
    )
  )
}

const entryToMethod = (e: Entrypoint, ci: ContractInterface) => {
  return entry_to_method(e.name, e.args, factory.createKeywordTypeNode(SyntaxKind.AnyKeyword), [
    factory.createReturnStatement(factory.createAwaitExpression(factory.createCallExpression(
      factory.createPropertyAccessExpression(
        factory.createIdentifier("ex"),
        factory.createIdentifier("call")
      ),
      undefined,
      [
        factory.createPropertyAccessExpression(
          factory.createThis(),
          factory.createIdentifier("address")
        ),
        factory.createStringLiteral(e.name),
        factory.createCallExpression(
          factory.createIdentifier(e.name + "_arg_to_mich"),
          undefined,
          e.args.map(x => x.name).map(x => factory.createIdentifier(x))
        ),
        factory.createIdentifier("params")
      ]
    )))], false, ci)
}

const entryToGetParam = (e: Entrypoint, ci: ContractInterface) => {
  return entry_to_method("get_" + e.name + "_param", e.args,
    factory.createTypeReferenceNode(
      factory.createQualifiedName(
        factory.createIdentifier("att"),
        factory.createIdentifier("CallParameter")
      ),
      undefined
    ), [
    factory.createReturnStatement(factory.createAwaitExpression(factory.createCallExpression(
      factory.createPropertyAccessExpression(
        factory.createIdentifier("ex"),
        factory.createIdentifier("get_call_param")
      ),
      undefined,
      [
        factory.createPropertyAccessExpression(
          factory.createThis(),
          factory.createIdentifier("address")
        ),
        factory.createStringLiteral(e.name),
        factory.createCallExpression(
          factory.createIdentifier(e.name + "_arg_to_mich"),
          undefined,
          e.args.map(x => x.name).map(x => factory.createIdentifier(x))
        ),
        factory.createIdentifier("params")
      ]
    )))], false, ci)
}

const getter_to_method = (g: Getter, ci: ContractInterface) => {
  return entry_to_method(g.name, g.args, archetype_type_to_ts_type(g.return, ci),
    [
      factory.createIfStatement(
        factory.createBinaryExpression(
          factory.createPropertyAccessExpression(
            factory.createThis(),
            factory.createIdentifier(g.name + "_callback_address")
          ),
          factory.createToken(ts.SyntaxKind.ExclamationEqualsToken),
          factory.createIdentifier("undefined")
        ),
        factory.createBlock(
          [
            factory.createVariableStatement(
              undefined,
              factory.createVariableDeclarationList(
                [factory.createVariableDeclaration(
                  factory.createIdentifier("entrypoint"),
                  undefined,
                  undefined,
                  factory.createNewExpression(
                    factory.createPropertyAccessExpression(
                      factory.createIdentifier("att"),
                      factory.createIdentifier("Entrypoint")
                    ),
                    undefined,
                    [
                      factory.createNewExpression(
                        factory.createPropertyAccessExpression(
                          factory.createIdentifier("att"),
                          factory.createIdentifier("Address")
                        ),
                        undefined,
                        [factory.createPropertyAccessExpression(
                          factory.createThis(),
                          factory.createIdentifier(g.name + "_callback_address")
                        )]
                      ),
                      factory.createStringLiteral("callback")
                    ]
                  )
                )],
                ts.NodeFlags.Const
              )
            ),
            factory.createExpressionStatement(factory.createAwaitExpression(factory.createCallExpression(
              factory.createPropertyAccessExpression(
                factory.createIdentifier("ex"),
                factory.createIdentifier("call")
              ),
              undefined,
              [
                factory.createPropertyAccessExpression(
                  factory.createThis(),
                  factory.createIdentifier("address")
                ),
                factory.createStringLiteral(g.name),
                factory.createCallExpression(
                  factory.createPropertyAccessExpression(
                    factory.createIdentifier("att"),
                    factory.createIdentifier("getter_args_to_mich")
                  ),
                  undefined,
                  [
                    factory.createCallExpression(
                      factory.createIdentifier(g.name + "_arg_to_mich"),
                      undefined,
                      g.args.map(x => x.name).map(x => factory.createIdentifier(x))
                    ),
                    factory.createIdentifier("entrypoint")
                  ]
                ),
                factory.createIdentifier("params")
              ]
            ))),
            factory.createReturnStatement(factory.createAwaitExpression(factory.createCallExpression(
              factory.createPropertyAccessExpression(
                factory.createIdentifier("ex"),
                factory.createIdentifier("get_callback_value")
              ),
              [archetype_type_to_ts_type(g.return, ci)],
              [
                factory.createPropertyAccessExpression(
                  factory.createThis(),
                  factory.createIdentifier(g.name + "_callback_address")
                ),
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
                  factory.createBlock([factory.createReturnStatement(mich_to_archetype_type(g.return, factory.createIdentifier("x"), ci))])
                )
              ]
            )))
          ],
          true
        ),
        undefined
      )
    ], false, ci
  )
}

const view_to_method = (v: View, ci: ContractInterface) => {
  return entry_to_method("view_" + v.name, v.args, archetype_type_to_ts_type(v.return, ci),
    [...[factory.createVariableStatement(
      undefined,
      factory.createVariableDeclarationList(
        [factory.createVariableDeclaration(
          factory.createIdentifier("mich"),
          undefined,
          undefined,
          factory.createAwaitExpression(factory.createCallExpression(
            factory.createPropertyAccessExpression(
              factory.createIdentifier("ex"),
              factory.createIdentifier("exec_view")
            ),
            undefined,
            [
              factory.createCallExpression(
                factory.createPropertyAccessExpression(
                  factory.createThis(),
                  factory.createIdentifier("get_address")
                ),
                undefined,
                []
              ),
              factory.createStringLiteral(v.name),
              factory.createCallExpression(
                factory.createIdentifier("view_" + v.name + "_arg_to_mich"),
                undefined,
                v.args.map(x => x.name).map(x => factory.createIdentifier(x))
              ),
              factory.createIdentifier("params")
            ]
          ))
        )],
        ts.NodeFlags.Const
      )
    )],
    ...(
      [factory.createReturnStatement(factory.createConditionalExpression(
        factory.createPropertyAccessExpression(
          factory.createIdentifier("mich"),
          factory.createIdentifier("value")
        ),
        factory.createToken(ts.SyntaxKind.QuestionToken),
        mich_to_archetype_type(v.return, factory.createPropertyAccessExpression(
          factory.createIdentifier("mich"),
          factory.createIdentifier("value")
        ), ci),
        factory.createToken(ts.SyntaxKind.ColonToken),
        factory.createIdentifier("undefined")
      ))])
    ], true, ci)
}

const make_method_skeleton = (
  is_async: boolean,
  name: string,
  args: ts.ParameterDeclaration[],
  return_type: ts.TypeReferenceNode | undefined,
  with_storage: boolean,
  body: ts.Statement[]
) => {
  return factory.createMethodDeclaration(
    undefined,
    is_async ? [factory.createModifier(ts.SyntaxKind.AsyncKeyword)] : [],
    undefined,
    factory.createIdentifier(name),
    undefined,
    undefined,
    args,
    return_type,
    factory.createBlock(
      [
        factory.createIfStatement(
          factory.createBinaryExpression(
            factory.createPropertyAccessExpression(
              factory.createThis(),
              factory.createIdentifier("address")
            ),
            factory.createToken(ts.SyntaxKind.ExclamationEqualsToken),
            factory.createIdentifier("undefined")
          ),
          factory.createBlock(
            ([
              ...(with_storage ? [factory.createVariableStatement(
                undefined,
                factory.createVariableDeclarationList(
                  [factory.createVariableDeclaration(
                    factory.createIdentifier("storage"),
                    undefined,
                    undefined,
                    factory.createAwaitExpression(factory.createCallExpression(
                      factory.createPropertyAccessExpression(
                        factory.createIdentifier("ex"),
                        factory.createIdentifier("get_raw_storage")
                      ),
                      undefined,
                      [factory.createPropertyAccessExpression(
                        factory.createThis(),
                        factory.createIdentifier("address")
                      )]
                    ))
                  )],
                  ts.NodeFlags.Const | ts.NodeFlags.AwaitContext | ts.NodeFlags.ContextFlags | ts.NodeFlags.TypeExcludesFlags
                )
              )] : []),
              ...(body)
            ])
            ,
            true
          ),
          undefined
        ),
        factory.createThrowStatement(factory.createNewExpression(
          factory.createIdentifier("Error"),
          undefined,
          [factory.createStringLiteral("Contract not initialised")]
        ))
      ],
      true
    )
  )
}

const storage_elt_to_getter_skeleton = (
  prefix: string,
  elt_name: string,
  args: ts.ParameterDeclaration[],
  return_type: ts.KeywordTypeNode<any>,
  body: ts.Statement[]) => {
  return make_method_skeleton(
    true,
    prefix + elt_name,
    args,
    factory.createTypeReferenceNode(
      factory.createIdentifier("Promise"),
      [return_type]
    ),
    true,
    body
  )
}

const get_data_storage_elt = (selt: StorageElement, ci: ContractInterface): ts.Expression => {
  const root: ts.Expression = factory.createIdentifier("storage")
  const name = selt.name;
  const ty = ci.storage_type.value;
  return compute_arg(root, name, ty)
}

const storage_elt_to_class = (selt: StorageElement, ci: ContractInterface) => {
  const elt = get_data_storage_elt(selt, ci);
  return storage_elt_to_getter_skeleton(
    "get_",
    selt.name,
    [],
    archetype_type_to_ts_type(selt.type, ci),
    [factory.createReturnStatement(mich_to_archetype_type(selt.type, elt, ci))]
  )
}

const eventToRegister = (e: Event, ci: ContractInterface) => {
  return make_method_skeleton(
    false,  // not async
    "register_" + e.name,
    [factory.createParameterDeclaration(
      undefined,
      undefined,
      undefined,
      factory.createIdentifier("ep"),
      undefined,
      factory.createTypeReferenceNode(
        factory.createQualifiedName(
          factory.createIdentifier("el"),
          factory.createIdentifier("EventProcessor")
        ),
        [factory.createTypeReferenceNode(
          factory.createIdentifier(e.name),
          undefined
        )]
      ),
      undefined
    )],
    undefined, // returns void
    false,     // don't need storage
    [factory.createExpressionStatement(factory.createCallExpression(
      factory.createPropertyAccessExpression(
        factory.createIdentifier("el"),
        factory.createIdentifier("registerEvent")
      ),
      undefined,
      [factory.createObjectLiteralExpression(
        [
          factory.createPropertyAssignment(
            factory.createIdentifier("source"),
            factory.createPropertyAccessExpression(
              factory.createThis(),
              factory.createIdentifier("address")
            )
          ),
          factory.createPropertyAssignment(
            factory.createIdentifier("filter"),
            factory.createArrowFunction(
              undefined,
              undefined,
              [factory.createParameterDeclaration(
                undefined,
                undefined,
                undefined,
                factory.createIdentifier("tag"),
                undefined,
                undefined,
                undefined
              )],
              undefined,
              factory.createToken(ts.SyntaxKind.EqualsGreaterThanToken),
              factory.createBlock(
                [factory.createReturnStatement(factory.createBinaryExpression(
                  factory.createIdentifier("tag"),
                  factory.createToken(ts.SyntaxKind.EqualsEqualsToken),
                  factory.createStringLiteral(e.name)
                ))],
                false
              )
            )
          ),
          factory.createPropertyAssignment(
            factory.createIdentifier("process"),
            factory.createArrowFunction(
              undefined,
              undefined,
              [
                factory.createParameterDeclaration(
                  undefined,
                  undefined,
                  undefined,
                  factory.createIdentifier("raw"),
                  undefined,
                  factory.createKeywordTypeNode(ts.SyntaxKind.AnyKeyword),
                  undefined
                ),
                factory.createParameterDeclaration(
                  undefined,
                  undefined,
                  undefined,
                  factory.createIdentifier("data"),
                  undefined,
                  factory.createUnionTypeNode([
                    factory.createTypeReferenceNode(
                      factory.createQualifiedName(
                        factory.createIdentifier("el"),
                        factory.createIdentifier("EventData")
                      ),
                      undefined
                    ),
                    factory.createKeywordTypeNode(ts.SyntaxKind.UndefinedKeyword)
                  ]),
                  undefined
                )
              ],
              undefined,
              factory.createToken(ts.SyntaxKind.EqualsGreaterThanToken),
              factory.createBlock(
                [
                  factory.createVariableStatement(
                    undefined,
                    factory.createVariableDeclarationList(
                      [factory.createVariableDeclaration(
                        factory.createIdentifier("event"),
                        undefined,
                        undefined,
                        factory.createCallExpression(
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
                              [factory.createReturnStatement(mich_to_archetype_type({ node: "event", name: e.name }, factory.createIdentifier("x"), ci))],
                              true
                            )
                          )),
                          undefined,
                          [factory.createIdentifier("raw")]
                        )
                      )],
                      ts.NodeFlags.Const
                    )
                  ),
                  factory.createExpressionStatement(factory.createCallExpression(
                    factory.createIdentifier("ep"),
                    undefined,
                    [
                      factory.createIdentifier("event"),
                      factory.createIdentifier("data")
                    ]
                  ))
                ],
                true
              )
            )
          )
        ],
        false
      )]
    )), factory.createReturnStatement(undefined)],
  )
}

const get_n = (expr: ts.Expression, n: number): ts.Expression => {
  return factory.createElementAccessExpression(
    factory.createPropertyAccessExpression(
      factory.createAsExpression(
        expr,
        factory.createTypeReferenceNode(
          factory.createQualifiedName(
            factory.createIdentifier("att"),
            factory.createIdentifier("Mpair")
          ),
          undefined
        )
      ),
      factory.createIdentifier("args")
    ),
    factory.createNumericLiteral(n)
  )
}

const get_big_map_value_getter_body = (name: string, key_type: ArchetypeType, key_mich_type: ts.Expression, value_mich_type: ts.Expression, selt: ts.Expression, return_statement_found: ts.Statement[], ret_value_not_found: ts.Expression, is_iterable_big_map: boolean, ci: ContractInterface): ts.Statement[] => {
  const aa = factory.createAwaitExpression(factory.createCallExpression(
    factory.createPropertyAccessExpression(
      factory.createIdentifier("ex"),
      factory.createIdentifier("get_big_map_value")
    ),
    undefined,
    [
      factory.createCallExpression(
        factory.createIdentifier("BigInt"),
        undefined,
        [
          factory.createCallExpression(
            factory.createPropertyAccessExpression(
              selt,
              factory.createIdentifier("toString")
            ),
            undefined,
            []
          )
        ]
      ),
      function_param_to_mich({ name: "key", type: key_type }, ci),
      key_mich_type
    ]
  ));
  return [
    factory.createVariableStatement(
      undefined,
      factory.createVariableDeclarationList(
        [factory.createVariableDeclaration(
          factory.createIdentifier("data"),
          undefined,
          undefined,
          is_iterable_big_map ? get_n(aa, 1) : aa
        )],
        ts.NodeFlags.Const | ts.NodeFlags.AwaitContext | ts.NodeFlags.ContextFlags | ts.NodeFlags.TypeExcludesFlags
      )
    ),
    factory.createIfStatement(
      factory.createBinaryExpression(
        factory.createIdentifier("data"),
        factory.createToken(ts.SyntaxKind.ExclamationEqualsToken),
        factory.createIdentifier("undefined")
      ),
      factory.createBlock(
        return_statement_found,
        true
      ),
      factory.createBlock(
        [factory.createReturnStatement(ret_value_not_found)],
        true
      )
    )
  ]
}

const mich_to_int = (arg: ts.Expression): ts.Expression => {
  return factory.createCallExpression(
    factory.createPropertyAccessExpression(
      factory.createIdentifier("att"),
      factory.createIdentifier("mich_to_int")
    ),
    undefined,
    [arg]
  )
}

const storageToGetters = (selt: StorageElement, ci: ContractInterface) => {
  switch (selt.type.node) {
    // special treatment
    case "big_map":
    case "iterable_big_map": {
      const is_iterable_big_map = selt.type.node == "iterable_big_map"
      const v_data = get_data_storage_elt(selt, ci)
      const values_map: ts.Expression = is_iterable_big_map ? get_n(v_data, 0) : v_data
      return [
        storage_elt_to_getter_skeleton(
          "get_",
          selt.name + "_value",
          [factory.createParameterDeclaration(
            undefined,
            undefined,
            undefined,
            factory.createIdentifier("key"),
            undefined,
            archetype_type_to_ts_type(selt.type.key_type, ci),
            undefined
          )],
          factory.createUnionTypeNode([
            archetype_type_to_ts_type(selt.type.value_type, ci),
            factory.createKeywordTypeNode(ts.SyntaxKind.UndefinedKeyword)
          ]),
          get_big_map_value_getter_body(
            selt.name,
            selt.type.key_type,
            value_to_mich_type(archetype_type_to_mich_type(selt.type.key_type, ci)),
            value_to_mich_type(archetype_type_to_mich_type(selt.type.value_type, ci)),
            /* TODO: handle above when record, asset_value, enum, ...
              these types already have a michelson_type variable created for that purpose
            */
            mich_to_int(values_map),
            [factory.createReturnStatement(mich_to_archetype_type(selt.type.value_type, factory.createIdentifier("data"), ci))],
            factory.createIdentifier("undefined"),
            is_iterable_big_map,
            ci
          )
        ),
        storage_elt_to_getter_skeleton(
          "has_",
          selt.name + "_value",
          [factory.createParameterDeclaration(
            undefined,
            undefined,
            undefined,
            factory.createIdentifier("key"),
            undefined,
            archetype_type_to_ts_type(selt.type.key_type, ci),
            undefined
          )],
          factory.createKeywordTypeNode(ts.SyntaxKind.BooleanKeyword),
          get_big_map_value_getter_body(
            selt.name,
            selt.type.key_type,
            value_to_mich_type(archetype_type_to_mich_type(selt.type.key_type, ci)),
            value_to_mich_type(archetype_type_to_mich_type(selt.type.value_type, ci)),
            /* TODO: handle above when record, asset_value, enum, ...
              these types already have a michelson_type variable created for that purpose
            */
            mich_to_int(values_map),
            [factory.createReturnStatement(factory.createTrue())],
            factory.createFalse(),
            false,
            ci
          )
        )
      ]
    }
    case "asset": { // Special treatment for big map assets
      const is_iterable_big_map = false
      const assetType = ci.types.assets.find(x => x.name == selt.name)
      if (assetType != undefined && assetType.container_kind == "big_map") {
        return [storage_elt_to_getter_skeleton(
          "get_",
          selt.name + "_value",
          [factory.createParameterDeclaration(
            undefined,
            undefined,
            undefined,
            factory.createIdentifier("key"),
            undefined,
            archetype_type_to_ts_type({ node: "asset_key", name: selt.name }, ci),
            undefined
          )],
          factory.createUnionTypeNode([
            archetype_type_to_ts_type({ node: "asset_value", name: selt.name }, ci),
            factory.createKeywordTypeNode(ts.SyntaxKind.UndefinedKeyword)
          ]),
          get_big_map_value_getter_body(
            selt.name,
            get_asset_key_archetype_type(selt.type, ci),
            factory.createIdentifier(selt.name + "_key_mich_type"),
            factory.createIdentifier(selt.name + "_value_mich_type"),
            mich_to_int(get_data_storage_elt(selt, ci)),
            [factory.createReturnStatement(mich_to_archetype_type({ node: "asset_value", name: selt.name }, factory.createIdentifier("data"), ci))],
            factory.createIdentifier("undefined"),
            is_iterable_big_map,
            ci
          )),
        storage_elt_to_getter_skeleton(
          "has_",
          selt.name + "_value",
          [factory.createParameterDeclaration(
            undefined,
            undefined,
            undefined,
            factory.createIdentifier("key"),
            undefined,
            archetype_type_to_ts_type({ node: "asset_key", name: selt.name }, ci),
            undefined
          )],
          factory.createKeywordTypeNode(ts.SyntaxKind.BooleanKeyword),
          get_big_map_value_getter_body(
            selt.name,
            get_asset_key_archetype_type(selt.type, ci),
            factory.createIdentifier(selt.name + "_key_mich_type"),
            factory.createIdentifier(selt.name + "_value_mich_type"),
            mich_to_int(get_data_storage_elt(selt, ci)),
            [factory.createReturnStatement(factory.createTrue())],
            factory.createFalse(),
            is_iterable_big_map,
            ci
          )
        )
        ]
      }
    }
  }
  return storage_elt_to_class(selt, ci)
}

const decl_callback_deploy = (g: Getter) => {
  return factory.createVariableStatement(
    [factory.createModifier(ts.SyntaxKind.ExportKeyword)],
    factory.createVariableDeclarationList(
      [factory.createVariableDeclaration(
        factory.createIdentifier("deploy_" + g.name + "_callback"),
        undefined,
        undefined,
        factory.createArrowFunction(
          [factory.createModifier(ts.SyntaxKind.AsyncKeyword)],
          undefined,
          [factory.createParameterDeclaration(
            undefined,
            undefined,
            undefined,
            factory.createIdentifier("params"),
            undefined,
            factory.createTypeReferenceNode(
              factory.createIdentifier("Partial"),
              [factory.createTypeReferenceNode(
                factory.createQualifiedName(
                  factory.createIdentifier("ex"),
                  factory.createIdentifier("Parameters")
                ),
                undefined
              )]
            ),
            undefined
          )],
          factory.createTypeReferenceNode(
            factory.createIdentifier("Promise"),
            [factory.createTypeReferenceNode(
              factory.createQualifiedName(
                factory.createIdentifier("att"),
                factory.createIdentifier("DeployResult")
              ),
              undefined
            )]
          ),
          factory.createToken(ts.SyntaxKind.EqualsGreaterThanToken),
          factory.createBlock(
            [factory.createReturnStatement(factory.createAwaitExpression(factory.createCallExpression(
              factory.createPropertyAccessExpression(
                factory.createIdentifier("ex"),
                factory.createIdentifier("deploy_callback")
              ),
              undefined,
              [
                factory.createStringLiteral(g.name),
                value_to_mich_type(g.return_michelson.value),
                factory.createIdentifier("params"),
              ]
            )))],
            true
          )
        )
      )],
      ts.NodeFlags.Const
    )
  )
}

const get_addr_decl = (name: string) => {
  return factory.createPropertyDeclaration(
    undefined,
    undefined,
    factory.createIdentifier(name),
    undefined,
    factory.createUnionTypeNode([
      factory.createKeywordTypeNode(SyntaxKind.StringKeyword),
      factory.createKeywordTypeNode(SyntaxKind.UndefinedKeyword)
    ]),
    undefined
  )
}

const get_addr_assignement = (name: string) => {
  return factory.createExpressionStatement(factory.createBinaryExpression(
    factory.createPropertyAccessExpression(
      factory.createThis(),
      factory.createIdentifier(name + "_callback_address")
    ),
    factory.createToken(ts.SyntaxKind.EqualsToken),
    factory.createPropertyAccessExpression(
      factory.createParenthesizedExpression(factory.createAwaitExpression(factory.createCallExpression(
        factory.createIdentifier("deploy_" + name + "_callback"),
        undefined,
        [factory.createIdentifier("params")]
      ))),
      factory.createIdentifier("address")
    )
  ))
}

const get_asset_key_archetype_type = (a: ATNamed, ci: ContractInterface): ArchetypeType => {
  const assetType = ci.types.assets.find(x => x.name == a.name)
  if (assetType != undefined) {
    const fields = assetType.fields.filter(x => x.is_key)
    if (fields.length == 1) {
      return fields[0].type
    }
    else {
      return { node: "record", name: assetType.name + "_key" }
    }
  }
  throw new Error("get_asset_key_archetype_type: asset " + (a.name ? a.name : "null") + " not found")
}

const storage_elt_to_param = (selt: StorageElement): ContractParameter => {
  return {
    name: selt.name,
    type: selt.type,
    const: false,
    default: null
  }
}

const language_to_deploy_name = (l: Language): string => {
  switch (l) {
    case (Language.Archetype): return "deploy"
    case (Language.Michelson): return "originate"
  }
}

const language_to_extension = (l: Language): ".arl" | ".tz" => {
  switch (l) {
    case (Language.Archetype): return ".arl"
    case (Language.Michelson): return ".tz"
  }
}

const language_to_storage_literal = (ci: ContractInterface, l: Language) => {
  switch (l) {
    case (Language.Archetype): return factory.createObjectLiteralExpression(ci.parameters.map(x =>
      factory.createPropertyAssignment(
        factory.createIdentifier(x.name),
        function_param_to_mich({ name: x.name, type: x.type }, ci)
      )
    ), true)
    case (Language.Michelson): return factory.createCallExpression(
      factory.createIdentifier("storage_arg_to_mich"),
      undefined, ci.storage.map(x => factory.createIdentifier(x.name))
    )
  }
}

const get_deploy = (ci: ContractInterface, settings: BindingSettings) => {
  const name = language_to_deploy_name(settings.language)
  const params = settings.language == Language.Archetype ? ci.parameters : ci.storage.map(storage_elt_to_param)
  const extension = language_to_extension(settings.language)
  const storage = language_to_storage_literal(ci, settings.language)
  return factory.createMethodDeclaration(
    undefined,
    [factory.createModifier(SyntaxKind.AsyncKeyword)],
    undefined,
    factory.createIdentifier(name),
    undefined,
    undefined,
    params.map(x => contractParameterToParamDecl(x, ci)).concat([
      factory.createParameterDeclaration(
        undefined,
        undefined,
        undefined,
        factory.createIdentifier("params"),
        undefined,
        factory.createTypeReferenceNode(
          factory.createIdentifier("Partial"),
          [factory.createTypeReferenceNode(
            factory.createQualifiedName(
              factory.createIdentifier("ex"),
              factory.createIdentifier("Parameters")
            ),
            undefined
          )]
        ),
        undefined
      )
    ]),
    undefined,
    factory.createBlock(
      [
        factory.createVariableStatement(
          undefined,
          factory.createVariableDeclarationList(
            [factory.createVariableDeclaration(
              factory.createIdentifier("address"),
              undefined,
              undefined,
              factory.createPropertyAccessExpression(
                factory.createParenthesizedExpression(factory.createAwaitExpression(factory.createCallExpression(
                  factory.createPropertyAccessExpression(
                    factory.createIdentifier("ex"),
                    factory.createIdentifier(name)
                  ),
                  undefined,
                  [
                    factory.createStringLiteral(settings.path + ci.name + extension),
                    storage,
                    factory.createIdentifier("params")
                  ]
                ))),
                factory.createIdentifier("address")
              ))],
            NodeFlags.Const | NodeFlags.AwaitContext | NodeFlags.ContextFlags | NodeFlags.TypeExcludesFlags
          )
        ),
        factory.createExpressionStatement(factory.createBinaryExpression(
          factory.createPropertyAccessExpression(
            factory.createThis(),
            factory.createIdentifier("address")
          ),
          factory.createToken(SyntaxKind.EqualsToken),
          factory.createIdentifier("address")
        ))
      ].concat(ci.getters.map(x => get_addr_assignement(x.name))),
      true
    )
  )
}

const get_contract_class_node = (ci: ContractInterface, settings: BindingSettings) => {
  return factory.createClassDeclaration(
    undefined,
    [factory.createModifier(SyntaxKind.ExportKeyword)],
    factory.createIdentifier(ci.name.charAt(0).toUpperCase() + ci.name.slice(1)),
    undefined,
    undefined,
    [
      ...([get_addr_decl("address")]),
      ...([get_constructor()]),
      ...(ci.getters.map(x => get_addr_decl(x.name + "_callback_address"))),
      ...([
        get_get_address_decl(),
        get_get_balance_decl(),
        get_deploy(ci, settings)
      ]
      ),
      ...(ci.entrypoints.map(x => entryToMethod(x, ci))),
      ...(ci.entrypoints.map(x => entryToGetParam(x, ci))),
      ...(ci.getters.map(x => getter_to_method(x, ci))),
      ...(ci.views.map(x => view_to_method(x, ci))),
      ...(ci.parameters.filter(x => !x.const).reduce((acc, x) => acc.concat(storageToGetters(x, ci)), <ts.MethodDeclaration[]>[])),
      ...(ci.storage.filter(x => !x.const && x.name != "_state").reduce((acc, x) => acc.concat(storageToGetters(x, ci)), <ts.MethodDeclaration[]>[])),
      ...(ci.types.enums.filter(x => x.name == "state").map(x => getStateDecl(x, ci))),
      ...(ci.types.events.reduce((acc, x) => acc.concat(eventToRegister(x, ci)), <ts.MethodDeclaration[]>[])),
      ...([errors_to_decl(ci)])
    ])
}

const get_import = (namespace: string, name: string) => {
  return factory.createImportDeclaration(
    undefined,
    undefined,
    factory.createImportClause(
      false,
      undefined,
      factory.createNamespaceImport(factory.createIdentifier(namespace))
    ),
    factory.createStringLiteral(name),
    undefined
  )
}

const get_execution_import = (target: Target): string => {
  switch (target) {
    case Target.Dapp: return "@completium/dapp-ts"
    case Target.Experiment: return "@completium/experiment-ts"
  }
}

const get_imports = (ci: ContractInterface, settings: BindingSettings): ts.ImportDeclaration[] => {
  return [
    get_import("ex", get_execution_import(settings.target)),
    get_import("att", "@completium/archetype-ts-types"),
  ].concat(ci.types.events.length > 0 ? [get_import("el", "@completium/event-listener")] : [])
}

const get_contract_decl = (ci: ContractInterface) => {
  return factory.createVariableStatement(
    [factory.createModifier(ts.SyntaxKind.ExportKeyword)],
    factory.createVariableDeclarationList(
      [factory.createVariableDeclaration(
        factory.createIdentifier(ci.name),
        undefined,
        undefined,
        factory.createNewExpression(
          factory.createIdentifier(ci.name.charAt(0).toUpperCase() + ci.name.slice(1)),
          undefined,
          []
        )
      )],
      ts.NodeFlags.Const
    )
  )
}

const make_enum_type_decl = (e: Enum) => {
  return factory.createEnumDeclaration(
    undefined,
    [factory.createModifier(ts.SyntaxKind.ExportKeyword)],
    factory.createIdentifier(e.name + "_types"),
    e.constructors.map(c => {
      return factory.createEnumMember(
        factory.createIdentifier(c.name),
        factory.createStringLiteral(c.name)
      )
    })
  )
}

const make_enum_class_decl = (e: Enum) => {
  return factory.createClassDeclaration(
    undefined,
    [
      factory.createModifier(ts.SyntaxKind.ExportKeyword),
      factory.createModifier(ts.SyntaxKind.AbstractKeyword)
    ],
    factory.createIdentifier(e.name),
    undefined,
    [factory.createHeritageClause(
      ts.SyntaxKind.ExtendsKeyword,
      [factory.createExpressionWithTypeArguments(
        factory.createPropertyAccessExpression(
          factory.createIdentifier("att"),
          factory.createIdentifier("Enum")
        ),
        [factory.createTypeReferenceNode(
          factory.createIdentifier(e.name + "_types"),
          undefined
        )]
      )]
    )],
    [
      factory.createMethodDeclaration(
        undefined,
        [factory.createModifier(ts.SyntaxKind.AbstractKeyword)],
        undefined,
        factory.createIdentifier("to_mich"),
        undefined,
        undefined,
        [],
        factory.createTypeReferenceNode(
          factory.createQualifiedName(
            factory.createIdentifier("att"),
            factory.createIdentifier("Micheline")
          ),
          undefined
        ),
        undefined
      ),
      factory.createMethodDeclaration(
        undefined,
        undefined,
        undefined,
        factory.createIdentifier("equals"),
        undefined,
        undefined,
        [factory.createParameterDeclaration(
          undefined,
          undefined,
          undefined,
          factory.createIdentifier("v"),
          undefined,
          factory.createTypeReferenceNode(
            factory.createIdentifier(e.name),
            undefined
          ),
          undefined
        )],
        factory.createKeywordTypeNode(ts.SyntaxKind.BooleanKeyword),
        factory.createBlock(
          [factory.createReturnStatement(factory.createCallExpression(
            factory.createPropertyAccessExpression(
              factory.createIdentifier("att"),
              factory.createIdentifier("micheline_equals")
            ),
            undefined,
            [
              factory.createCallExpression(
                factory.createPropertyAccessExpression(
                  factory.createThis(),
                  factory.createIdentifier("to_mich")
                ),
                undefined,
                []
              ),
              factory.createCallExpression(
                factory.createPropertyAccessExpression(
                  factory.createIdentifier("v"),
                  factory.createIdentifier("to_mich")
                ),
                undefined,
                []
              )
            ]
          ))],
          true
        )
      )
    ]
  )
}

const make_enum_type_to_mich_return_stt = (e: Enum, c: EnumValue, idx: number, ci: ContractInterface): ts.Expression => {
  let mich_value: ts.Expression = factory.createPropertyAccessExpression(
    factory.createIdentifier("att"),
    factory.createIdentifier("unit_mich")
  )
  if (c.types.length > 0) {
    let atype: ArchetypeType = {
      node: "unit"
    }
    if (c.types.length > 1) {
      atype = {
        node: "tuple",
        args: c.types
      }
    } else {
      atype = c.types[0]
    }
    const param: FunctionParameter = {
      name: "this.content",
      type: atype
    }
    mich_value = function_param_to_mich(param, ci)
  }
  const e_path = compute_path_enum(idx, e.constructors.length)

  const res = e_path.reverse().reduce((accu, x) => {
    return factory.createCallExpression(
      factory.createPropertyAccessExpression(
        factory.createIdentifier("att"),
        factory.createIdentifier(x == e_left_right.Left ? "left_to_mich" : "right_to_mich")
      ),
      undefined,
      [accu]
    )
  }, mich_value)

  return res
}

const make_simple_enum_type_to_mich_return_stt = (idx: number): ts.Expression => {
  return factory.createCallExpression(
    factory.createPropertyAccessExpression(
      factory.createNewExpression(
        factory.createPropertyAccessExpression(
          factory.createIdentifier("att"),
          factory.createIdentifier("Int")
        ),
        undefined,
        [factory.createIdentifier(idx.toString())]
      ),
      factory.createIdentifier("to_mich")
    ),
    undefined,
    []
  )
}

const make_enum_type_class_decl = (e: Enum, c: EnumValue, idx: number, complex: boolean, ci: ContractInterface): ts.ClassDeclaration => {
  let args: ts.ParameterDeclaration[] = []
  if (c.types.length > 0) {
    let atype = c.types[0]
    if (c.types.length > 1) {
      atype = {
        node: "tuple",
        args: c.types
      }
    }
    args = [factory.createParameterDeclaration(
      undefined,
      [factory.createModifier(ts.SyntaxKind.PrivateKeyword)],
      undefined,
      factory.createIdentifier("content"),
      undefined,
      archetype_type_to_ts_type(atype, ci),
      undefined
    )]
  }
  return factory.createClassDeclaration(
    undefined,
    [factory.createModifier(ts.SyntaxKind.ExportKeyword)],
    factory.createIdentifier(c.name),
    undefined,
    [factory.createHeritageClause(
      ts.SyntaxKind.ExtendsKeyword,
      [factory.createExpressionWithTypeArguments(
        factory.createIdentifier(e.name),
        undefined
      )]
    )], [
    ...([
      factory.createConstructorDeclaration(
        undefined,
        undefined,
        args,
        factory.createBlock(
          [factory.createExpressionStatement(factory.createCallExpression(
            factory.createSuper(),
            undefined,
            [factory.createPropertyAccessExpression(
              factory.createIdentifier(e.name + "_types"),
              factory.createIdentifier(c.name)
            )]
          ))],
          true
        )
      ),
      factory.createMethodDeclaration(
        undefined,
        undefined,
        undefined,
        factory.createIdentifier("to_mich"),
        undefined,
        undefined,
        [],
        undefined,
        factory.createBlock(
          [factory.createReturnStatement(
            complex ? make_enum_type_to_mich_return_stt(e, c, idx, ci) : make_simple_enum_type_to_mich_return_stt(idx))],
          false
        )
      ),
      make_to_string_decl()
    ]),
    ...(c.types.length > 0 ? [
      factory.createMethodDeclaration(
        undefined,
        undefined,
        undefined,
        factory.createIdentifier("get"),
        undefined,
        undefined,
        [],
        undefined,
        factory.createBlock(
          [factory.createReturnStatement(factory.createPropertyAccessExpression(
            factory.createThis(),
            factory.createIdentifier("content")
          ))],
          false
        )
      )
    ] : [])
  ]
  )
}

const enum_to_decl = (e: Enum, ci: ContractInterface): Array<ts.EnumDeclaration | ts.ClassDeclaration> => {
  switch (e.name) {
    case "state": return [factory.createEnumDeclaration(
      undefined,
      [factory.createModifier(ts.SyntaxKind.ExportKeyword)],
      factory.createIdentifier("states"),
      e.constructors.map((x, i) => {
        return factory.createEnumMember(
          factory.createIdentifier(x.name),
          i == 0 ? factory.createNumericLiteral("1") : undefined
        )
      })
    )];
    default: return [
      ...([make_enum_type_decl(e), make_enum_class_decl(e)]),
      ...(e.constructors.map((x, i) => make_enum_type_class_decl(e, x, i, e.type_michelson.prim == "or", ci)))
    ]
  }
}

const mich_to_simple_enum_decl = (e: Enum) => {
  const is_state = e.name == "state";
  return factory.createVariableStatement(
    [factory.createModifier(ts.SyntaxKind.ExportKeyword)],
    factory.createVariableDeclarationList(
      [factory.createVariableDeclaration(
        factory.createIdentifier("mich_to_" + e.name),
        undefined,
        undefined,
        factory.createArrowFunction(
          undefined,
          undefined,
          [factory.createParameterDeclaration(
            undefined,
            undefined,
            undefined,
            factory.createIdentifier("m"),
            undefined,
            factory.createKeywordTypeNode(ts.SyntaxKind.AnyKeyword),
            undefined
          )],
          factory.createTypeReferenceNode(
            factory.createIdentifier(is_state ? "states" : e.name),
            undefined
          ),
          factory.createToken(ts.SyntaxKind.EqualsGreaterThanToken),
          factory.createBlock(
            [
              factory.createVariableStatement(
                undefined,
                factory.createVariableDeclarationList(
                  [factory.createVariableDeclaration(
                    factory.createIdentifier("v"),
                    undefined,
                    undefined,
                    factory.createCallExpression(
                      factory.createPropertyAccessExpression(
                        factory.createCallExpression(
                          factory.createPropertyAccessExpression(
                            factory.createParenthesizedExpression(factory.createNewExpression(
                              factory.createPropertyAccessExpression(
                                factory.createIdentifier("att"),
                                factory.createIdentifier("Nat")
                              ),
                              undefined,
                              [factory.createPropertyAccessExpression(
                                factory.createParenthesizedExpression(factory.createAsExpression(
                                  factory.createIdentifier("m"),
                                  factory.createTypeReferenceNode(
                                    factory.createQualifiedName(
                                      factory.createIdentifier("att"),
                                      factory.createIdentifier("Mint")
                                    ),
                                    undefined
                                  )
                                )),
                                factory.createIdentifier("int")
                              )]
                            )),
                            factory.createIdentifier("to_big_number")
                          ),
                          undefined,
                          []
                        ),
                        factory.createIdentifier("toNumber")
                      ),
                      undefined,
                      []
                    )
                  )],
                  ts.NodeFlags.Const
                )
              ),
              factory.createSwitchStatement(
                factory.createIdentifier("v"),
                factory.createCaseBlock(
                  [
                    ...(e.constructors.map((c, i) => {
                      return factory.createCaseClause(
                        factory.createNumericLiteral(i),
                        [factory.createReturnStatement(
                          is_state ?
                            factory.createPropertyAccessExpression(
                              factory.createIdentifier("states"),
                              factory.createIdentifier(c.name)
                            ) :
                            factory.createNewExpression(
                              factory.createIdentifier(c.name),
                              undefined,
                              []
                            ))]
                      )
                    })),
                    ...([factory.createDefaultClause([factory.createThrowStatement(factory.createNewExpression(
                      factory.createIdentifier("Error"),
                      undefined,
                      [factory.createBinaryExpression(
                        factory.createStringLiteral("mich_to_asset_type : invalid value "),
                        factory.createToken(ts.SyntaxKind.PlusToken),
                        factory.createIdentifier("v")
                      )]
                    ))])])
                  ]
                )
              )
            ],
            true
          )
        )
      )],
      ts.NodeFlags.Const
    )
  )
}

const mich_to_complex_enum_decl = (e: Enum, ci: ContractInterface) => {

  const create_body = (e: Enum): ts.Statement[] => {
    const error = factory.createThrowStatement(factory.createNewExpression(
      factory.createIdentifier("Error"),
      undefined,
      [factory.createStringLiteral("mich_to_" + e.name + " : invalid micheline")]
    ));

    if (e.constructors.length == 0) {
      return [error]
    } else if (e.constructors.length == 1) {
      return []
    } else {
      const before_last_enum_constructor = e.constructors[e.constructors.length - 2].name;
      const last_enum_constructor = e.constructors[e.constructors.length - 1].name;

      let res: [ts.Expression, Array<ts.Statement>] = [factory.createIdentifier("m"), []];
      const [_, stts]: [ts.Expression, Array<ts.Statement>] =
        e.constructors.reduce(([arg, acc], x) => {
          const before_last = before_last_enum_constructor == x.name;
          const last = last_enum_constructor == x.name;
          const ea = factory.createElementAccessExpression(
            factory.createPropertyAccessExpression(
              factory.createParenthesizedExpression(
                factory.createAsExpression(
                  arg,
                  factory.createTypeReferenceNode(
                    factory.createQualifiedName(
                      factory.createIdentifier("att"),
                      factory.createIdentifier("Msingle")
                    ),
                    undefined
                  )
                )),
              factory.createIdentifier("args")
            ),
            factory.createNumericLiteral("0")
          );
          const enum_arg: Array<ts.Expression> = []
          if (x.types.length == 1) {
            enum_arg.push(mich_to_archetype_type(x.types[0], ea, ci))
          } else if (x.types.length > 1) {
            const ty: ArchetypeType = { node: "tuple", args: x.types }
            enum_arg.push(mich_to_archetype_type(ty, ea, ci))
          }

          const stt = factory.createIfStatement(
            factory.createBinaryExpression(
              factory.createPropertyAccessExpression(
                factory.createParenthesizedExpression(
                  factory.createAsExpression(
                    arg,
                    factory.createTypeReferenceNode(
                      factory.createQualifiedName(
                        factory.createIdentifier("att"),
                        factory.createIdentifier("Msingle")
                      ),
                      undefined
                    )
                  )),
                factory.createIdentifier("prim")),
              factory.createToken(ts.SyntaxKind.EqualsEqualsToken),
              factory.createStringLiteral(last ? "Right" : "Left")
            ),
            factory.createBlock(
              [factory.createReturnStatement(factory.createNewExpression(
                factory.createIdentifier(x.name),
                undefined,
                enum_arg
              ))],
              true
            ),
            undefined
          );
          acc.push(stt)
          const arg_next = before_last ? arg : factory.createElementAccessExpression(
            factory.createPropertyAccessExpression(
              factory.createParenthesizedExpression(
                factory.createAsExpression(
                  arg,
                  factory.createTypeReferenceNode(
                    factory.createQualifiedName(
                      factory.createIdentifier("att"),
                      factory.createIdentifier("Msingle")
                    ),
                    undefined
                  )
                )),
              factory.createIdentifier("args")
            ),
            factory.createNumericLiteral("0")
          );
          return [arg_next, acc]
        }, res)
      stts.push(error)
      return stts
    }
  }

  return factory.createVariableStatement(
    [factory.createModifier(ts.SyntaxKind.ExportKeyword)],
    factory.createVariableDeclarationList(
      [factory.createVariableDeclaration(
        factory.createIdentifier("mich_to_" + e.name),
        undefined,
        undefined,
        factory.createArrowFunction(
          undefined,
          undefined,
          [factory.createParameterDeclaration(
            undefined,
            undefined,
            undefined,
            factory.createIdentifier("m"),
            undefined,
            factory.createTypeReferenceNode(
              factory.createQualifiedName(
                factory.createIdentifier("att"),
                factory.createIdentifier("Micheline")
              ),
              undefined
            ),
            undefined
          )],
          factory.createTypeReferenceNode(
            factory.createIdentifier(e.name),
            undefined
          ),
          factory.createToken(ts.SyntaxKind.EqualsGreaterThanToken),
          factory.createBlock(create_body(e), true)
        )
      )],
      ts.NodeFlags.Const
    )
  )
}

const mich_to_enum_decl = (e: Enum, ci: ContractInterface) => {
  if (e.type_michelson.prim == "or") {
    return mich_to_complex_enum_decl(e, ci)
  } else {
    return mich_to_simple_enum_decl(e)
  }
}

const getStateDecl = (e: Enum, ci: ContractInterface): ts.MethodDeclaration => {
  return factory.createMethodDeclaration(
    undefined,
    [factory.createModifier(ts.SyntaxKind.AsyncKeyword)],
    undefined,
    factory.createIdentifier("get_state"),
    undefined,
    undefined,
    [],
    factory.createTypeReferenceNode(
      factory.createIdentifier("Promise"),
      [factory.createTypeReferenceNode(
        factory.createIdentifier("states"),
        undefined
      )]
    ),
    factory.createBlock(
      [
        factory.createIfStatement(
          factory.createBinaryExpression(
            factory.createPropertyAccessExpression(
              factory.createThis(),
              factory.createIdentifier("address")
            ),
            factory.createToken(ts.SyntaxKind.ExclamationEqualsToken),
            factory.createIdentifier("undefined")
          ),
          factory.createBlock(
            [
              factory.createVariableStatement(
                undefined,
                factory.createVariableDeclarationList(
                  [factory.createVariableDeclaration(
                    factory.createIdentifier("storage"),
                    undefined,
                    undefined,
                    factory.createAwaitExpression(factory.createCallExpression(
                      factory.createPropertyAccessExpression(
                        factory.createIdentifier("ex"),
                        factory.createIdentifier("get_raw_storage")
                      ),
                      undefined,
                      [factory.createPropertyAccessExpression(
                        factory.createThis(),
                        factory.createIdentifier("address")
                      )]
                    ))
                  )],
                  ts.NodeFlags.Const | ts.NodeFlags.AwaitContext | ts.NodeFlags.ContextFlags | ts.NodeFlags.TypeExcludesFlags
                )
              ),
              factory.createVariableStatement(
                undefined,
                factory.createVariableDeclarationList(
                  [factory.createVariableDeclaration(
                    factory.createIdentifier("state"),
                    undefined,
                    undefined,
                    compute_arg(factory.createIdentifier("storage"), "_state", ci.storage_type.value)
                  )],
                  ts.NodeFlags.Const | ts.NodeFlags.AwaitContext | ts.NodeFlags.ContextFlags | ts.NodeFlags.TypeExcludesFlags
                )
              ),
              factory.createSwitchStatement(
                factory.createCallExpression(
                  factory.createPropertyAccessExpression(
                    factory.createCallExpression(
                      factory.createPropertyAccessExpression(
                        factory.createIdentifier("att"),
                        factory.createIdentifier("mich_to_int")
                      ),
                      undefined,
                      [factory.createIdentifier("state")]
                    ),
                    factory.createIdentifier("to_number")
                  ),
                  undefined,
                  []
                ),
                factory.createCaseBlock(
                  e.constructors.map((x, i) => {
                    return factory.createCaseClause(
                      factory.createNumericLiteral(i),
                      [factory.createReturnStatement(factory.createPropertyAccessExpression(
                        factory.createIdentifier("states"),
                        factory.createIdentifier(x.name)
                      ))]
                    )
                  }))
              )
            ],
            true
          ),
          undefined
        ),
        factory.createReturnStatement(factory.createPropertyAccessExpression(
          factory.createIdentifier("states"),
          factory.createIdentifier(e.constructors[0].name)
        ))
      ],
      true
    )
  )
}

const errors_to_decl = (ci: ContractInterface): ts.PropertyDeclaration => {
  return factory.createPropertyDeclaration(
    undefined,
    undefined,
    factory.createIdentifier("errors"),
    undefined,
    undefined,
    factory.createObjectLiteralExpression(
      ci.errors.map(make_error).reduce((acc, x) => {
        const [label, expr] = x
        if (!acc.reduce((a, p) => {
          const [l, _] = p
          if (!a) {
            return label == l
          } else {
            return true
          }
        }, false)) {
          acc.push([label, expr])
        }
        return acc
      }, <Array<[string, ts.Expression]>>[]).map(x => {
        const [label, expr] = x
        return factory.createPropertyAssignment(
          factory.createIdentifier(label),
          expr
        )
      }),
      true
    )
  )
}

const not_a_set = (a: Asset) => {
  return a.container_type_michelson.prim != "set"
}

const view_to_getter = (v: View): Getter => {
  return {
    ...v, name: "view_" + v.name,
    return_michelson: {
      value: { prim: "int", annots: [] },
      is_storable: true
    }
  }
}

const get_nodes = (contract_interface: ContractInterface, settings: BindingSettings): (ts.ImportDeclaration | ts.InterfaceDeclaration | ts.ClassDeclaration | ts.TypeAliasDeclaration | ts.VariableDeclarationList | ts.VariableStatement | ts.EnumDeclaration)[] => {
  return [
    ...(get_imports(contract_interface, settings)),
    // storage
    ...(settings.language == Language.Michelson ? generate_storage_utils(contract_interface) : []),
    // events
    ...(contract_interface.types.events.map(x => recordToInterfaceDecl(x, contract_interface))).flat(),
    // enums
    ...(contract_interface.types.enums.map(x => (enum_to_decl(x, contract_interface)))).flat(),
    ...(contract_interface.types.enums.map(x => (mich_to_enum_decl(x, contract_interface)))),
    // records
    ...(contract_interface.types.records.map(x => recordToInterfaceDecl(x, contract_interface))).flat(),
    ...(contract_interface.types.records.map(recordToMichTypeDecl)),
    // ...(contract_interface.types.records.map(mich_to_record_decl)),
    // asset keys
    ...(contract_interface.types.assets.map(x => assetKeyToInterfaceDecl(x, contract_interface))).flat(),
    ...(contract_interface.types.assets.map(assetKeyToMichTypeDecl)),
    // asset values
    ...(contract_interface.types.assets.filter(not_a_set).map(x => assetValueToInterfaceDecl(x, contract_interface))).flat(),
    ...(contract_interface.types.assets.filter(not_a_set).map(assetValueToMichTypeDecl)),
    // ...(contract_interface.types.assets.filter(not_a_set).map(mich_to_asset_value_decl)),
    // asset containers
    ...(contract_interface.types.assets.map(x => assetContainerToTypeDecl(x, contract_interface))),
    ...(contract_interface.types.assets.map(x => assetContainerToMichTypeDecl(x))),
    // entrypoint argument to michelson
    ...(contract_interface.entrypoints.map(x => entryToArgToMichDecl(x, contract_interface))),
    // getter/view argument to michelson
    ...(contract_interface.getters.map(x => entryToArgToMichDecl(x, contract_interface))),
    ...(contract_interface.views.map(view_to_getter).map(x => entryToArgToMichDecl(x, contract_interface))),
    ...(contract_interface.getters.map(decl_callback_deploy)),
    ...([
      // contract class
      get_contract_class_node(contract_interface, settings),
      // contract instance
      get_contract_decl(contract_interface)
    ]),
  ]
}

export enum Target {
  Experiment,
  Dapp
}

export enum Language {
  Archetype,
  Michelson
}

export type BindingSettings = {
  target: Target
  language: Language
  path: string
}

export const generate_binding = (raw_contract_interface: RawContractInterface, settings: BindingSettings): string => {
  const contract_interface = raw_to_contract_interface(raw_contract_interface);
  const nodeArr = factory.createNodeArray(get_nodes(contract_interface, settings));
  const result = printer.printList(ListFormat.MultiLine, nodeArr, file);
  return result
}
