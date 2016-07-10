var code = 'var answer = 42';
var syntax = esprima.parse(code);

console.log(code);
console.log("\n");
console.log(JSON.stringify(syntax));