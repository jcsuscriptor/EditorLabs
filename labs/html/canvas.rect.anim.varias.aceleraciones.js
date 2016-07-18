(function () {

    var canvas = document.getElementById('area_dibujo');
    var ctx = canvas.getContext('2d');


    function Rectangulo(x, y, width, height) {
        this.x = x || 0;
        this.y = y || 0;
        this.width = width || 100;
        this.height = height || 100;
        this.color = 'blue';
        this.vx = 10;
        this.acceleration = 0;
    }

    Rectangulo.prototype = {
        draw: function () {
            ctx.fillStyle = this.color;
            ctx.fillRect(this.x, this.y, this.width, this.height);   // Draw a rectangle with default settings
        },

        checkWorldBounds: function () {
            if (this.x < 0)
                return true;
            if (this.x + this.width >= canvas.width)
                return true;

            return false;
            //return (this.blocked.up || this.blocked.down || this.blocked.left || this.blocked.right);
        },

        changeAcceleration: function (ease) {

            if (ease == 'linear') {
                this.vx = 10;
                this.acceleration = 0;
            } else if (ease == 'ease.out') {
                this.vx = 0.02;
                this.acceleration = 0.005;
            } else if (ease == 'ease.in') {
                this.vx =  0.1;
                this.acceleration = 0.10;
            }

        }
    };

    var rect1 = new Rectangulo(0, 50, 100, 100);
    var rect2 = new Rectangulo(0, 200, 100, 100);

    rect2.color = 'red';
    rect2.changeAcceleration('ease.out');
    var rect3 = new Rectangulo(0, 350, 100, 100);

    rect3.changeAcceleration('ease.in');
    rect3.color = 'yellow';

    function draw(timestamp) {
        console.log(timestamp);

        // clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        //Draw
        rect1.draw();

        rect2.draw();

        rect3.draw();

        //acceleration
        rect2.vx += rect2.acceleration;
        rect3.vx += rect3.acceleration;


        //Velocity
        if (!rect1.checkWorldBounds()) {
            rect1.x += rect1.vx;
        }


        if (!rect2.checkWorldBounds()) {
            rect2.x += (1 / rect2.vx);
        }

        //console.debug((1 / rect2.vx));

        if (!rect3.checkWorldBounds()) {
            rect3.x += Math.pow(2, rect3.vx);
        }


        //console.debug(Math.pow(2, rect3.vx))

        if (!((rect1.checkWorldBounds()) &&
            (rect2.checkWorldBounds()) &&
            (rect3.checkWorldBounds()))) {
            window.requestAnimationFrame(draw);
        }

    }



    window.requestAnimationFrame(draw);


})();




