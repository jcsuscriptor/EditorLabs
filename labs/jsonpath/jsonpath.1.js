
var obj = {
  "lista": [
    {
      "name": "foo",
      "id": 20
    },
    {
      "name": "bar",
      "id": 20
    }
  ]
};

var path = "$..[?(@.name=='foo')]";
var result = JSONPath({ path: path, json: obj });

console.log(result);
