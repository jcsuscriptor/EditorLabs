(function () {

    //Make http://www.joshstuder.com/personnal-motion/
    
    var angleInit = 180;
    var angleAni = 180;
    var canvas = document.getElementById('area_dibujo');
    var ctx = canvas.getContext('2d');



    var ball = {
        x: canvas.width/2,
        y: canvas.height/2,
        vx: 5,
        vy: 2,
        radius: 100,
        angle: 0,
        vel: 1,
        color: 'blue',
        draw: function () {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, this.angle, this.angle + Math.PI, true);
            ctx.closePath();
            ctx.fillStyle = this.color;
            ctx.fill();
        }
    };


    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height); // clear canvas

        ball.angle = (Math.PI / 180) * angleAni;
        ball.draw();

        angleAni += ball.vel;

        if (angleAni > 270 || angleAni < 180) {
            ball.vel = -ball.vel;
        }

        window.requestAnimationFrame(draw);
    }



    window.requestAnimationFrame(draw);


})();




