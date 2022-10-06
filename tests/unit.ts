import { generate_binding, Target, Language } from '../src/main'

const fs = require('fs');

describe('Test', async () => {

  it('unit', async () => {
    const name = 'big_map';

    const input = fs.readFileSync("./check/json/" + name + ".json");
    const ci = JSON.parse(input);
    const a = generate_binding(ci, { target: Target.Experiment, language: Language.Archetype, path: "./contracts/" });
    console.log(a)
    fs.writeFileSync("./check/tests/binding/" + name + ".ts", a)
  })
})