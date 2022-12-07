import { get_path, MichelsonType, PathItem, PathItemSimple, PathItemDouble } from '../src/utils'

const assert = require('assert')

const cmp_path = (actual: Array<PathItem>, ref: Array<PathItem>): boolean => {
  if (actual.length != ref.length) {
    return false
  }
  for (let i = 0; i < actual.length; ++i) {
    if ((actual[i] as PathItemSimple) && (ref[i] as PathItemSimple) && actual[i] == ref[i]) {
      continue
    }
    if ((actual[i] as PathItemDouble) && (ref[i] as PathItemDouble) && actual[i][0] == ref[i][0] && actual[i][1] == ref[i][1]) {
      continue
    }
    console.log(actual)
    return false
  }
  return true
}

describe('Unit test get_path', () => {
  it('simple', () => {
    const sty: MichelsonType = { prim: "pair", args: [{ prim: "nat", annots: ["%a"] }, { prim: "string", annots: ["%b"] }, { prim: "bytes", annots: ["%c"] }] }
    assert(cmp_path(get_path("%a", sty), [[0]]), "Invalid path")
    assert(cmp_path(get_path("%b", sty), [[1]]), "Invalid path")
    assert(cmp_path(get_path("%c", sty), [[2]]), "Invalid path")
  });
  it('double', () => {
    const sty: MichelsonType = {
      prim: "pair", args: [
        { prim: "pair", args: [{ prim: "nat", annots: ["%a"] }, { prim: "string", annots: ["%b"] }, { prim: "bytes", annots: ["%c"] }] },
        { prim: "pair", args: [{ prim: "nat", annots: ["%x"] }, { prim: "string", annots: ["%y"] }, { prim: "bytes", annots: ["%z"] }] }
      ]
    }
    assert(cmp_path(get_path("%a", sty), [[0], [0]]), "Invalid path")
    assert(cmp_path(get_path("%b", sty), [[0], [1]]), "Invalid path")
    assert(cmp_path(get_path("%c", sty), [[0], [2]]), "Invalid path")
    assert(cmp_path(get_path("%x", sty), [[1, 4], [0]]), "Invalid path")
    assert(cmp_path(get_path("%y", sty), [[1, 4], [1]]), "Invalid path")
    assert(cmp_path(get_path("%z", sty), [[1, 4], [2]]), "Invalid path")
  });
  it('triple', () => {
    const sty: MichelsonType = {
      prim: "pair", args: [
        {
          prim: "pair", args: [
            { prim: "pair", args: [{ prim: "nat", annots: ["%a"] }, { prim: "string", annots: ["%b"] }, { prim: "bytes", annots: ["%c"] }] },
            { prim: "pair", args: [{ prim: "nat", annots: ["%d"] }, { prim: "string", annots: ["%e"] }, { prim: "bytes", annots: ["%f"] }] },
            { prim: "pair", args: [{ prim: "nat", annots: ["%g"] }, { prim: "string", annots: ["%h"] }, { prim: "bytes", annots: ["%i"] }] }]
        },
        {
          prim: "pair", args: [
            { prim: "pair", args: [{ prim: "nat", annots: ["%r"] }, { prim: "string", annots: ["%s"] }, { prim: "bytes", annots: ["%t"] }] },
            { prim: "pair", args: [{ prim: "nat", annots: ["%u"] }, { prim: "string", annots: ["%v"] }, { prim: "bytes", annots: ["%w"] }] },
            { prim: "pair", args: [{ prim: "nat", annots: ["%x"] }, { prim: "string", annots: ["%y"] }, { prim: "bytes", annots: ["%z"] }] }]
        }
      ]
    }
    assert(cmp_path(get_path("%a", sty), [[0], [0], [0]]), "Invalid path")
    assert(cmp_path(get_path("%b", sty), [[0], [0], [1]]), "Invalid path")
    assert(cmp_path(get_path("%c", sty), [[0], [0], [2]]), "Invalid path")
    assert(cmp_path(get_path("%d", sty), [[0], [1], [0]]), "Invalid path")
    assert(cmp_path(get_path("%e", sty), [[0], [1], [1]]), "Invalid path")
    assert(cmp_path(get_path("%f", sty), [[0], [1], [2]]), "Invalid path")
    assert(cmp_path(get_path("%g", sty), [[0], [2, 5], [0]]), "Invalid path")
    assert(cmp_path(get_path("%h", sty), [[0], [2, 5], [1]]), "Invalid path")
    assert(cmp_path(get_path("%i", sty), [[0], [2, 5], [2]]), "Invalid path")
    assert(cmp_path(get_path("%r", sty), [[1, 6], [0], [0]]), "Invalid path")
    assert(cmp_path(get_path("%s", sty), [[1, 6], [0], [1]]), "Invalid path")
    assert(cmp_path(get_path("%t", sty), [[1, 6], [0], [2]]), "Invalid path")
    assert(cmp_path(get_path("%u", sty), [[1, 6], [1], [0]]), "Invalid path")
    assert(cmp_path(get_path("%v", sty), [[1, 6], [1], [1]]), "Invalid path")
    assert(cmp_path(get_path("%w", sty), [[1, 6], [1], [2]]), "Invalid path")
    assert(cmp_path(get_path("%x", sty), [[1, 6], [2, 5], [0]]), "Invalid path")
    assert(cmp_path(get_path("%y", sty), [[1, 6], [2, 5], [1]]), "Invalid path")
    assert(cmp_path(get_path("%z", sty), [[1, 6], [2, 5], [2]]), "Invalid path")
  });
  it('tuple nat string rational', () => {
    const sty: MichelsonType = { prim: "pair", args: [{ prim: "nat", annots: ["%a"] }, { prim: "string", annots: ["%b"] }, { prim: "pair", annots: ["%c"], args: [{ prim: "int" }, { prim: "nat" }] }] }
    assert(cmp_path(get_path("%a", sty), [[0]]), "Invalid path")
    assert(cmp_path(get_path("%b", sty), [[1]]), "Invalid path")
    assert(cmp_path(get_path("%c", sty), [[2, 4]]), "Invalid path")
  });
})
