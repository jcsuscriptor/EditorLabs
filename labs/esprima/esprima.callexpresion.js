var code = "particles( ' diamante ', 200,200,50);sprite('uno');var jc = sprite('dos');var lista = particles(['diamante','star'], 200,200,50);";
var syntax = esprima.parse(code);


console.log(code);
console.log("\n");
console.log(JSON.stringify(syntax));