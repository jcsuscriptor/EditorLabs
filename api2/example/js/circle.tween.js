color('yellow');

var circulo = circle(0,100,140);
var circulo2 = circle(400,100,140);

color('blue');
var circulo3= circle(200,100,140);

tween(circulo).to({x:200});
tween(circulo2).to({x:200});