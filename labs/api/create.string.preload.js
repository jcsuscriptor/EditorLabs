var images = ['foo','bar','foobar'];
var strImages = images.join(",");
console.log(strImages);

var strImages2 = "";
for (var index = 0; index < images.length; index++) {
    var element = images[index];
    if (index!=0){
        strImages2 += ",";
    }
    strImages2 += "'" + element + "'";
}
console.log(strImages2);