var code = "particles( ' diamante ', 200,200,50);sprite('uno');var jc = sprite('dos');var lista = particles(['diamante','star'], 200,200,50);sprite();jc.change('foo');";
//loc	Nodes have line and column-based location info
var options = { loc: true };
var syntax = esprima.parse(code, options);

console.log(syntax);

//Recuperar unicamente llamadas a funciones
var path = "$..[?(@.type=='CallExpression')]";
var result = JSONPath({ path: path, json: syntax });

var images = [];

console.log(result);

//Recorrer los elementos, para recuperar unicamente las funciones del API
//que requiere imagenes
result.forEach(function (element) {

    //TODO:MemberExpression. LLamadas a Metodos spring.chage
    //'type' => "MemberExpression"
    //property' ...
    //'type' => "Identifier"
    //'name' => "change"
    if (element.callee.type == "Identifier") {
        if (element.callee.name.toUpperCase() == "PARTICLES" ||
            element.callee.name.toUpperCase() == "SPRITE") {

            if (element.arguments.length > 0) {

                var item = element.arguments[0];

                if (item.type == "Literal") {
                    images.push(item.value);
                } else if (item.type == "ArrayExpression") {

                    item.elements.forEach(function (elementArray) {
                        images.push(elementArray.value);
                    }, this);
                }


            }
        }
    }

}, this);

console.log(images);

var strImages2 = "";
for (var index = 0; index < images.length; index++) {
    var element = images[index];
    if (index != 0) {
        strImages2 += ",";
    }
    //TODO: Excluir duplicados
    strImages2 += "'" + element.trim() + "'";
}
console.log(strImages2);