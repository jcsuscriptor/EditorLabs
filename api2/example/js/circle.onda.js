
color('black',0);

stroke('cyan', 3,1);
var circulo1 = circle(200,200, 100);

stroke('cyan', 3,0.8);
var circulo2 = circle(200,200, 120);

stroke('cyan', 3,0.5);
var circulo3 = circle(200,200, 180);


stroke('cyan', 3,0.3);
var circulo4 = circle(200,200, 250);

tween(circulo2).to({alpha:0});
tween(circulo3).to({alpha:0},1500,null,true,1500);
tween(circulo4).to({alpha:0},1500,null,true,3000);
