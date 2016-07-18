(function () {

    //Make http://www.joshstuder.com/personnal-motion/

    var angleInit = 180;
    var angleAni = 180;
    var canvas = document.getElementById('area_dibujo');
    var ctx = canvas.getContext('2d');
    var incrementer = .035;
    var signo = 1;

    var ball = {
        x: canvas.width / 2,
        y: canvas.height / 2,
        vx: 5,
        vy: 2,
        radius: 100,
        angle: 0,
        vel: 0.1,
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

        ball.vel += incrementer;
        //console.debug(ball.vel);
        //console.debug(1 / ball.vel);

        //angleAni 180 => 270
        angleAni += (1 / ball.vel)*signo;

        if (angleAni > 270 || angleAni < 180){
            //signo *= -signo;
            if (angleAni > 270) signo = -1;
            if (angleAni < 180) signo = 1;
            console.debug(signo);
            ball.vel = 0.2;
           
        }

        window.requestAnimationFrame(draw);

    }



    window.requestAnimationFrame(draw);


})();




