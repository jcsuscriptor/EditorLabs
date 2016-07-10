
var cantidad_circulos = 35;

fill('puffin_p'); //koala_p'); //MuleDeer_p'); //puffin_p');
stroke('black', 0);
var size = 20;
var esperar = 30;

var time = 0;
function loop() {
    time = time + 1;
    if (time > esperar) {
        for (var i = 0; i < cantidad_circulos; i++) {
            var alpha = 0.1+ random()*0.5;
            var scale = 0.1 + random() * 0.3;
            var vel = (0.4 + random() * 0.7);
            color('white', alpha);
            //console.log(vel);
            var circulo = circle(random(10, 590), random(600, 700), scale * size);
            var ani = tween(circulo).to({ y: random(150,100), alpha: 0 }, vel * 7500); //,"Elastic.easeOut"); //"Bounce.easeOut");
        }

        time = 0;
    }
}