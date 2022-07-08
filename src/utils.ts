import { factory, KeywordTypeNode, SyntaxKind } from "typescript";

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
  "types": Array<string> /* TODO */
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

export type Record = {} /* TODO */

export type Getter = {} /* TODO */

export type Event = {} /* TODO */

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
  "getters": Array<Getter>
  "errors": Array<MichelsonType>
}

export const archetypeTypeToTsType = (at: ArchetypeType) : KeywordTypeNode<any>  => {
  switch (at.node) {
    case "key":       return factory.createKeywordTypeNode(SyntaxKind.StringKeyword);
    case "date":      return factory.createTypeReferenceNode(
      factory.createIdentifier("Date"),
      undefined
    )
    case "string":    return factory.createKeywordTypeNode(SyntaxKind.StringKeyword);
    case "signature": return factory.createKeywordTypeNode(SyntaxKind.StringKeyword);
    case "int":       return factory.createKeywordTypeNode(SyntaxKind.BigIntKeyword);
    case "nat":       return factory.createKeywordTypeNode(SyntaxKind.BigIntKeyword);
    case "asset":     return factory.createTypeReferenceNode(
      factory.createIdentifier(at.name+"_container"),
      undefined
    );
    case "asset_value":  return factory.createTypeReferenceNode(
      factory.createIdentifier(at.args[0].name+"_value"),
      undefined
    );
    case "map":    return factory.createTypeReferenceNode(
      factory.createIdentifier("Array"),
      [factory.createTupleTypeNode([
        archetypeTypeToTsType(at.args[0]),
        archetypeTypeToTsType(at.args[1])
      ])]
    );
    case "tuple": return factory.createTupleTypeNode([
      archetypeTypeToTsType(at.args[0]),
      archetypeTypeToTsType(at.args[1])
    ]);
    default:       return factory.createKeywordTypeNode(SyntaxKind.StringKeyword)
  }
}

export const importNode = factory.createImportDeclaration(
  undefined,
  undefined,
  factory.createImportClause(
    false,
    undefined,
    factory.createNamespaceImport(factory.createIdentifier("ex"))
  ),
  factory.createStringLiteral("@completium/experiment-ts"),
  undefined
)