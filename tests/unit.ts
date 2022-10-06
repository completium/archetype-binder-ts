import { generate_binding, Target, Language } from '../src/main'

const fs = require('fs');

describe('Test', async () => {

  it('unit', async () => {
    const input = fs.readFileSync("./check/json/or.json");
    const ci = JSON.parse(input);
    const a = generate_binding(ci, { target: Target.Experiment, language: Language.Archetype, path: "./contracts/" });
    console.log(a)
    fs.writeFileSync('./check/tests/binding/or.ts', a)
  })
})