import ts, { createPrinter, createSourceFile, factory, isAccessor, ListFormat, NewLineKind, NodeFlags, ScriptKind, ScriptTarget, SyntaxKind, TsConfigSourceFile } from 'typescript';

import { archetype_type_to_mich_type, archetype_type_to_ts_type, ArchetypeType, Asset, ContractInterface, ContractParameter, entity_to_mich, Entrypoint, Enum, EnumValue, Event, Field, function_param_to_mich, function_params_to_mich, FunctionParameter, get_constructor, get_get_address_decl, get_get_balance_decl, Getter, make_cmp_body, make_error, make_to_string_decl, mich_to_field_decl, MichelsonType, Record, storage_to_mich, StorageElement, taquito_to_ts, unit_to_mich, value_to_mich_type, View, makeTaquitoEnv, ATNamed, RawContractInterface, raw_to_contract_interface } from "./utils";

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

const fields_to_mich_to_entity_decl = (name: string, fields: Array<Omit<Field, "is_key">>) => {
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
        return mich_to_field_decl(x.type, factory.createElementAccessExpression(
          factory.createIdentifier("fields"),
          factory.createIdentifier(i.toString())
        ), i, fields.length)
      })
    ))
  ])
}

const mich_to_asset_value_decl = (a: Asset) => {
  const fields_no_key = a.fields.filter(x => !x.is_key)
  const name = a.name + "_value"
  if (fields_no_key.length > 1) {
    return fields_to_mich_to_entity_decl(a.name + "_value", a.fields.filter(x => !x.is_key))
  } else if (fields_no_key.length == 1) {
    return make_mich_to_entity_decl(name, [
      factory.createReturnStatement(mich_to_field_decl(fields_no_key[0].type, factory.createIdentifier("v")))
    ])
  } else {
    return make_mich_to_entity_decl(name, [factory.createThrowStatement(factory.createNewExpression(
      factory.createIdentifier("Error"),
      undefined,
      [factory.createStringLiteral("mich_to_" + name + " should not be called")]
    ))])
  }
}
const mich_to_record_decl = (r: Record) => {
  if (r.fields.length > 1) {
    return fields_to_mich_to_entity_decl(r.name, r.fields)
  } else {
    return make_mich_to_entity_decl(r.name, [factory.createThrowStatement(factory.createNewExpression(
      factory.createIdentifier("Error"),
      undefined,
      [factory.createStringLiteral("mich_to_" + r.name + " should not be called")]
    ))])
  }
}
const field_to_cmp_body = (field: Omit<Field, "is_key">, arg_a: ts.Expression, arg_b: ts.Expression) => {
  const a = factory.createPropertyAccessExpression(
    arg_a,
    factory.createIdentifier(field.name)
  )
  const b = factory.createPropertyAccessExpression(
    arg_b,
    factory.createIdentifier(field.name)
  )
  return make_cmp_body(a, b, field.type)
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

const storage_to_entry = (ci: ContractInterface): Entrypoint => {
  return {
    name: "storage",
    args: ci.storage.map(x => {
      return {
        name: x.name,
        type: x.type
      }
    })
  }
}

const generate_storage_utils = (ci: ContractInterface) => {
  if (ci.storage_type?.value == undefined) return []
  return [
    // generate storage michelson type
    entity_to_mich_type_decl("storage_mich_stype", ci.storage_type?.value),
    // generate storage literal maker
    entity_to_mich_decl("storage", ci.storage, storage_to_mich(ci.storage_type.value, ci.storage, ci))
  ]
}

const entity_to_mich_decl = (name: string, args: FunctionParameter[], body: ts.Expression) => {
  return factory.createVariableDeclarationList(
    [factory.createVariableDeclaration(
      factory.createIdentifier(name + "_arg_to_mich"),
      undefined,
      undefined,
      factory.createArrowFunction(
        undefined,
        undefined,
        args.map(x => contractParameterToParamDecl(x)),
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
  return entity_to_mich_decl(e.name, e.args, function_params_to_mich(e.args, ci))
}

const fieldToPropertyDecl = (f: Omit<Field, "is_key">) => {
  return factory.createPropertySignature(
    undefined,
    factory.createIdentifier(f.name),
    undefined,
    archetype_type_to_ts_type(f.type)
  )
}

const entityToInterfaceDecl = (name: string, mt: MichelsonType, fields: Array<Omit<Field, "is_key">>, ci: ContractInterface) => {
  if (fields.length == 1) {
    const field = fields[0];
    return factory.createTypeAliasDeclaration(
      undefined,
      [factory.createModifier(ts.SyntaxKind.ExportKeyword)],
      factory.createIdentifier(name),
      undefined,
      archetype_type_to_ts_type(field.type)
    )
  } else {
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
          fields.map(x => contractParameterToParamDecl(x, true)),
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
            [factory.createReturnStatement((entity_to_mich("this", mt, fields, 0, ci))[1])],
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
          factory.createBlock(fields.length > 0 ?
            [factory.createReturnStatement(
              factory.createParenthesizedExpression(
                fields.reduce((acc, f) => {
                  return factory.createBinaryExpression(
                    acc,
                    factory.createToken(ts.SyntaxKind.AmpersandAmpersandToken),
                    field_to_cmp_body(f, factory.createThis(), factory.createIdentifier("v"))
                  )
                }, field_to_cmp_body(fields[0], factory.createThis(), factory.createIdentifier("v")))
              ))] : [factory.createReturnStatement(factory.createTrue())],
            true
          )
        )
      ]
    )
  }
}

const assetKeyToInterfaceDecl = (a: Asset, ci: ContractInterface) => entityToInterfaceDecl(a.name + "_key", a.key_type_michelson, a.fields.filter(x => x.is_key), ci)
const assetValueToInterfaceDecl = (a: Asset, ci: ContractInterface) => entityToInterfaceDecl(a.name + "_value", a.value_type_michelson, a.fields.filter(x => !x.is_key), ci)
const recordToInterfaceDecl = (r: Record, ci: ContractInterface) => entityToInterfaceDecl(r.name, r.type_michelson, r.fields, ci)

const assetContainerToTypeDecl = (a: Asset) => {
  return factory.createTypeAliasDeclaration(
    undefined,
    [factory.createModifier(SyntaxKind.ExportKeyword)],
    factory.createIdentifier(a.name + "_container"),
    undefined,
    factory.createTypeReferenceNode(
      factory.createIdentifier("Array"),
      [not_a_set(a) ?
        factory.createTupleTypeNode([
          factory.createTypeReferenceNode(
            factory.createIdentifier(a.name + "_key"),
            undefined
          ),
          factory.createTypeReferenceNode(
            factory.createIdentifier(a.name + "_value"),
            undefined
          )
        ]) :
        factory.createTypeReferenceNode(
          factory.createIdentifier(a.name + "_key"),
          undefined
        )
      ]
    ))
}

const entityToMichDecl = (entity_postfix: string, aname: string, mt: MichelsonType, fields: Array<Partial<Field>>, ci: ContractInterface) => {
  return factory.createVariableStatement(
    [factory.createModifier(ts.SyntaxKind.ExportKeyword)],
    factory.createVariableDeclarationList(
      [factory.createVariableDeclaration(
        factory.createIdentifier(aname + entity_postfix + "_to_mich"),
        undefined,
        undefined,
        factory.createArrowFunction(
          undefined,
          undefined,
          [factory.createParameterDeclaration(
            undefined,
            undefined,
            undefined,
            factory.createIdentifier("x"),
            undefined,
            factory.createTypeReferenceNode(
              factory.createIdentifier(aname + entity_postfix),
              undefined
            ),
            undefined
          )],
          factory.createTypeReferenceNode(
            factory.createQualifiedName(
              factory.createIdentifier("att"),
              factory.createIdentifier("Micheline")
            ),
            undefined
          ),
          factory.createToken(ts.SyntaxKind.EqualsGreaterThanToken),
          factory.createBlock(
            [factory.createReturnStatement((entity_to_mich("x", mt, fields, 0, ci))[1])],
            true
          )
        )
      )],
      ts.NodeFlags.Const
    ))
}

const contractParameterToParamDecl = (fp: FunctionParameter, pub = false) => {
  return factory.createParameterDeclaration(
    undefined,
    pub ? [factory.createModifier(ts.SyntaxKind.PublicKeyword)] : [],
    undefined,
    factory.createIdentifier(fp.name),
    undefined,
    archetype_type_to_ts_type(fp.type),
    undefined
  )
}

const storageElementToParamDecl = (se: StorageElement) => {
  return factory.createParameterDeclaration(
    undefined,
    undefined,
    undefined,
    factory.createIdentifier(se.name),
    factory.createToken(SyntaxKind.QuestionToken),
    archetype_type_to_ts_type(se.type),
    undefined
  )
}

const entry_to_method = (name: string, args: FunctionParameter[], ret: ts.TypeNode, body: ts.Statement[]) => {
  return factory.createMethodDeclaration(
    undefined,
    [factory.createModifier(SyntaxKind.AsyncKeyword)],
    undefined,
    factory.createIdentifier(name),
    undefined,
    undefined,
    args.map(x => contractParameterToParamDecl(x)).concat([
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
      [ret]
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

const entryToMethod = (e: Entrypoint) => {
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
    )))])
}

const entryToGetParam = (e: Entrypoint) => {
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
    )))])
}

const getter_to_method = (g: Getter, ci: ContractInterface) => {
  return entry_to_method(g.name, g.args, archetype_type_to_ts_type(g.return),
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
              [archetype_type_to_ts_type(g.return)],
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
                  factory.createBlock(taquito_to_ts(factory.createIdentifier("x"), g.return, ci, makeTaquitoEnv()))
                )
              ]
            )))
          ],
          true
        ),
        undefined
      )
    ]
  )
}

const view_to_method = (v: View, ci: ContractInterface) => {
  return entry_to_method("view_" + v.name, v.args, archetype_type_to_ts_type(v.return),
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
    ...(taquito_to_ts(factory.createPropertyAccessExpression(
      factory.createIdentifier("mich"),
      factory.createIdentifier("value")
    ), v.return, ci, makeTaquitoEnv()))
    ])
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
                        factory.createIdentifier("get_storage")
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

const get_storage_identifier = (selt: StorageElement, ci: ContractInterface) => {
  const root = factory.createIdentifier("storage")
  return ci.storage.length + ci.parameters.length > 1 ?
    factory.createPropertyAccessExpression(
      root,
      factory.createIdentifier(selt.name)
    ) :
    root
}

const storage_elt_to_class = (selt: StorageElement, ci: ContractInterface) => {
  const elt = get_storage_identifier(selt, ci);
  return storage_elt_to_getter_skeleton(
    "get_",
    selt.name,
    [],
    archetype_type_to_ts_type(selt.type),
    taquito_to_ts(elt, selt.type, ci, makeTaquitoEnv())
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
                              taquito_to_ts(factory.createIdentifier("x"), { node: "event", name: e.name }, ci, makeTaquitoEnv()),
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

const get_big_map_value_getter_body = (name: string, key_type: ArchetypeType, key_mich_type: ts.Expression, value_mich_type: ts.Expression, selt: ts.Expression, return_statement_found: ts.Statement[], ret_value_not_found: ts.Expression, ci: ContractInterface): ts.Statement[] => {
  return [
    factory.createVariableStatement(
      undefined,
      factory.createVariableDeclarationList(
        [factory.createVariableDeclaration(
          factory.createIdentifier("data"),
          undefined,
          undefined,
          factory.createAwaitExpression(factory.createCallExpression(
            factory.createPropertyAccessExpression(
              factory.createIdentifier("ex"),
              factory.createIdentifier("get_big_map_value")
            ),
            undefined,
            [
              factory.createCallExpression(
                factory.createIdentifier("BigInt"),
                undefined,
                [selt]
              ),
              function_param_to_mich({ name: "key", type: key_type }, ci),
              key_mich_type,
              value_mich_type
            ]
          ))
        ),
        factory.createVariableDeclaration(
          factory.createIdentifier("collapsed"),
          undefined,
          undefined,
          factory.createTrue()
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

const storageToGetters = (selt: StorageElement, ci: ContractInterface) => {
  switch (selt.type.node) {
    case "big_map": // special treatment
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
            archetype_type_to_ts_type(selt.type.key_type),
            undefined
          )],
          factory.createUnionTypeNode([
            archetype_type_to_ts_type(selt.type.value_type),
            factory.createKeywordTypeNode(ts.SyntaxKind.UndefinedKeyword)
          ]),
          get_big_map_value_getter_body(
            selt.name,
            selt.type.key_type,
            value_to_mich_type(archetype_type_to_mich_type(selt.type.key_type)),
            value_to_mich_type(archetype_type_to_mich_type(selt.type.value_type)),
            /* TODO: handle above when record, asset_value, enum, ...
              these types already have a michelson_type variable created for that purpose
            */
            get_storage_identifier(selt, ci),
            taquito_to_ts(factory.createIdentifier("data"), selt.type.value_type, ci, makeTaquitoEnv()),
            factory.createIdentifier("undefined"),
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
            archetype_type_to_ts_type(selt.type.key_type),
            undefined
          )],
          factory.createKeywordTypeNode(ts.SyntaxKind.BooleanKeyword),
          get_big_map_value_getter_body(
            selt.name,
            selt.type.key_type,
            value_to_mich_type(archetype_type_to_mich_type(selt.type.key_type)),
            value_to_mich_type(archetype_type_to_mich_type(selt.type.value_type)),
            /* TODO: handle above when record, asset_value, enum, ...
              these types already have a michelson_type variable created for that purpose
            */
            get_storage_identifier(selt, ci),
            [factory.createReturnStatement(factory.createTrue())],
            factory.createFalse(),
            ci
          )
        )
      ]
    case "asset": { // Special treatment for big map assets
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
            factory.createTypeReferenceNode(
              factory.createIdentifier(selt.name + "_key"),
              undefined
            ),
            undefined
          )],
          factory.createUnionTypeNode([
            factory.createTypeReferenceNode(
              factory.createIdentifier(selt.name + "_value"),
              undefined
            ),
            factory.createKeywordTypeNode(ts.SyntaxKind.UndefinedKeyword)
          ]),
          get_big_map_value_getter_body(
            selt.name,
            get_asset_key_archetype_type(selt.type, ci),
            factory.createIdentifier(selt.name + "_key_mich_type"),
            factory.createIdentifier(selt.name + "_value_mich_type"),
            get_storage_identifier(selt, ci),
            taquito_to_ts(factory.createIdentifier("data"), selt.type, ci, makeTaquitoEnv()),
            factory.createIdentifier("undefined"),
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
            factory.createTypeReferenceNode(
              factory.createIdentifier(selt.name + "_key"),
              undefined
            ),
            undefined
          )],
          factory.createKeywordTypeNode(ts.SyntaxKind.BooleanKeyword),
          get_big_map_value_getter_body(
            selt.name,
            get_asset_key_archetype_type(selt.type, ci),
            factory.createIdentifier(selt.name + "_key_mich_type"),
            factory.createIdentifier(selt.name + "_value_mich_type"),
            get_storage_identifier(selt, ci),
            [factory.createReturnStatement(factory.createTrue())],
            factory.createFalse(),
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

const get_asset_value_archetype_type = (a: ATNamed, ci: ContractInterface): ArchetypeType => {
  const assetType = ci.types.assets.find(x => x.name == a.name)
  if (assetType != undefined) {
    const fields = assetType.fields.filter(x => !x.is_key)
    if (fields.length == 1) {
      return fields[0].type
    }
    else {
      return { node: "record", name: assetType.name + "_value" }
    }
  }
  throw new Error("get_asset_value_archetype_type: asset " + (a.name ? a.name : "null") + " not found")
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
    params.map(x => contractParameterToParamDecl(x)).concat([
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
      ...(ci.entrypoints.map(entryToMethod)),
      ...(ci.entrypoints.map(entryToGetParam)),
      ...(ci.getters.map(x => getter_to_method(x, ci))),
      ...(ci.views.map(x => view_to_method(x, ci))),
      ...(ci.parameters.filter(x => !x.const).reduce((acc, x) => acc.concat(storageToGetters(x, ci)), <ts.MethodDeclaration[]>[])),
      ...(ci.storage.filter(x => !x.const).reduce((acc, x) => acc.concat(storageToGetters(x, ci)), <ts.MethodDeclaration[]>[])),
      ...(ci.types.enums.filter(x => x.name == "state").map(getStateDecl)),
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
    []
  )
}

const make_enum_type_to_mich_return_stt = (c: EnumValue, idx: number, ci: ContractInterface): ts.Expression => {
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
  if (idx == 0) {
    return factory.createCallExpression(
      factory.createPropertyAccessExpression(
        factory.createIdentifier("att"),
        factory.createIdentifier("left_to_mich")
      ),
      undefined,
      [mich_value]
    )
  } else {
    const last = factory.createCallExpression(
      factory.createPropertyAccessExpression(
        factory.createIdentifier("att"),
        factory.createIdentifier((idx % 2 == 0) ? "right_to_mich" : "left_to_mich")
      ),
      undefined,
      [mich_value]
    )
    let res = last
    for (let i = 0; i < Math.floor((idx + 1) / 2); i++) {
      res = factory.createCallExpression(
        factory.createPropertyAccessExpression(
          factory.createIdentifier("att"),
          factory.createIdentifier("right_to_mich")
        ),
        undefined,
        [res]
      )
    }
    return res
  }
}

const make_simple_enum_type_to_mich_return_stt = (idx: number): ts.Expression => {
  return factory.createCallExpression(
    factory.createPropertyAccessExpression(
      factory.createNewExpression(
        factory.createPropertyAccessExpression(
          factory.createIdentifier("att"),
          factory.createIdentifier("Nat")
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

const make_enum_type_class_decl = (name: string, c: EnumValue, idx: number, complex: boolean, ci: ContractInterface): ts.ClassDeclaration => {
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
      archetype_type_to_ts_type(atype),
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
        factory.createIdentifier(name),
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
              factory.createIdentifier(name + "_types"),
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
            complex ? make_enum_type_to_mich_return_stt(c, idx, ci) : make_simple_enum_type_to_mich_return_stt(idx))],
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
      ...(e.constructors.map((x, i) => make_enum_type_class_decl(e.name, x, i, e.type_michelson.prim == "or", ci)))
    ]
  }
}

const mich_to_simple_enum_decl = (e: Enum) => {
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
            factory.createIdentifier(e.name),
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
                              [factory.createIdentifier("m")]
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
                        [factory.createReturnStatement(factory.createNewExpression(
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

const mich_to_complex_enum_decl = (e: Enum) => {
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
            factory.createIdentifier(e.name),
            undefined
          ),
          factory.createToken(ts.SyntaxKind.EqualsGreaterThanToken),
          factory.createBlock(
            [factory.createThrowStatement(factory.createNewExpression(
              factory.createIdentifier("Error"),
              undefined,
              [factory.createStringLiteral("mich_to" + e.name + " : complex enum not supported yet")]
            ))],
            true
          )
        )
      )],
      ts.NodeFlags.Const
    )
  )
}

const mich_to_enum_decl = (e: Enum) => {
  if (e.type_michelson.prim == "or") {
    return mich_to_complex_enum_decl(e)
  } else {
    return mich_to_simple_enum_decl(e)
  }
}

const getStateDecl = (e: Enum): ts.MethodDeclaration => {
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
                        factory.createIdentifier("get_storage")
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
                    factory.createPropertyAccessExpression(
                      factory.createIdentifier("storage"),
                      factory.createIdentifier("_state")
                    )
                  )],
                  ts.NodeFlags.Const | ts.NodeFlags.AwaitContext | ts.NodeFlags.ContextFlags | ts.NodeFlags.TypeExcludesFlags
                )
              ),
              factory.createSwitchStatement(
                factory.createCallExpression(
                  factory.createPropertyAccessExpression(
                    factory.createIdentifier("state"),
                    factory.createIdentifier("toNumber")
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
      value: { prim: "int", int: null, args: [], annots: [], array: [], bytes: null, string: null },
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
    ...(contract_interface.types.events.map(x => recordToInterfaceDecl(x, contract_interface))),
    // enums
    ...(contract_interface.types.enums.map(x => (enum_to_decl(x, contract_interface)))).flat(),
    ...(contract_interface.types.enums.map(mich_to_enum_decl)),
    // records
    ...(contract_interface.types.records.map(x => recordToInterfaceDecl(x, contract_interface))),
    ...(contract_interface.types.records.map(recordToMichTypeDecl)),
    // ...(contract_interface.types.records.map(mich_to_record_decl)),
    // asset keys
    ...(contract_interface.types.assets.map(x => assetKeyToInterfaceDecl(x, contract_interface))),
    ...(contract_interface.types.assets.map(assetKeyToMichTypeDecl)),
    // asset values
    ...(contract_interface.types.assets.filter(not_a_set).map(x => assetValueToInterfaceDecl(x, contract_interface))),
    ...(contract_interface.types.assets.filter(not_a_set).map(assetValueToMichTypeDecl)),
    // ...(contract_interface.types.assets.filter(not_a_set).map(mich_to_asset_value_decl)),
    // asset containers
    ...(contract_interface.types.assets.map(assetContainerToTypeDecl)),
    ...(contract_interface.types.assets.map(assetContainerToMichTypeDecl)),
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
