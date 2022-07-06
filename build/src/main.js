"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var ts = __importStar(require("typescript"));
var file = ts.createSourceFile("source.ts", "", ts.ScriptTarget.ESNext, false, ts.ScriptKind.TS);
var printer = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed });
//const stringTypeReference = ts.factory.createTypeReferenceNode("string");
//const uuidDecl = ts.factory.createTypeAliasDeclaration(
//  undefined, // decorators
//  undefined, // modifiers
//  ts.factory.createIdentifier("Uuid"), // name
//  undefined, // type parameters
//  stringTypeReference // aliased type
//);
var importExDecl = ts.factory.createImportDeclaration(undefined, undefined, ts.factory.createImportClause(false, undefined, ts.factory.createNamespaceImport(ts.factory.createIdentifier("ex"))), ts.factory.createStringLiteral("@completium/experiment-ts"), undefined);
var result = printer.printNode(ts.EmitHint.Unspecified, importExDecl, file);
console.log(result);
//# sourceMappingURL=main.js.map