//https://github.com/giodif/ease/blob/master/js/lib/ease.js


var ease = (function (window, undefined) {

    /*
        t = current time
        b = beginning value
        c = end value
        d = duration
    */
    var penner = {

        linear: function (t, b, c, d) {

            c -= b;
            return c * (t / d) + b;
        },
        quadIn: function (t, b, c, d) {

            c -= b;
            t /= d;
            return c * Math.pow(t, 2) + b;
        },
        quadOut: function (t, b, c, d) {

            c -= b;
            t /= d;
            return -c * t * (t - 2) + b;
        },
        quad: function (t, b, c, d) {

            c -= b;
            t /= (d / 2);
            if (t < 1) { return c / 2 * Math.pow(t, 2) + b; }
            t--;
            return (-c / 2) * (t * (t - 2) - 1) + b;
        },
        cubicIn: function (t, b, c, d) {

            c -= b;
            t /= d;
            return c * Math.pow(t, 3) + b;
        },
        // cubic easing out - decelerating to zero velocity
        cubicOut: function (t, b, c, d) {

            c -= b;
            t /= d;
            t--;
            return c * (Math.pow(t, 3) + 1) + b;
        },
        // cubic easing in/out - acceleration until halfway, then deceleration
        cubic: function (t, b, c, d) {

            c -= b;
            t /= (d / 2);
            if (t < 1) { return c / 2 * Math.pow(t, 3) + b; }

            t -= 2;
            return (c / 2) * (Math.pow(t, 3) + 2) + b;
        },
        // quartic easing in - accelerating from zero velocity
        quartIn: function (t, b, c, d) {

            c -= b;
            t /= d;
            return c * Math.pow(t, 4) + b;
        },
        // quartic easing out - decelerating to zero velocity
        quartOut: function (t, b, c, d) {

            c -= b;
            t /= d;
            t--;
            return -c * (Math.pow(t, 4) - 1) + b;
        },
        // quartic easing in/out - acceleration until halfway, then deceleration
        quart: function (t, b, c, d) {

            c -= b;
            t /= (d / 2);
            if (t < 1) { return c / 2 * Math.pow(t, 4) + b; }
            t -= 2;
            return (-c / 2) * (Math.pow(t, 4) - 2) + b;
        },
        // quintic easing in - accelerating from zero velocity
        quintIn: function (t, b, c, d) {

            c -= b;
            t /= d;
            return c * Math.pow(t, 5) + b;
        },
        // quintic easing out - decelerating to zero velocity
        quintOut: function (t, b, c, d) {

            c -= b;
            t /= d;
            t--;
            return c * (Math.pow(t, 5) + 1) + b;
        },
        // quintic easing in/out - acceleration until halfway, then deceleration
        quint: function (t, b, c, d) {

            c -= b;
            t /= (d / 2);
            if (t < 1) { return (c / 2) * Math.pow(t, 5) + b; }
            t -= 2;
            return c / 2 * (Math.pow(t, 5) + 2) + b;
        },
        // sinusoidal easing in - accelerating from zero velocity
        sineIn: function (t, b, c, d) {

            c -= b;
            return -c * Math.cos(t / d * (Math.PI / 2)) + c + b;
        },
        // sinusoidal easing out - decelerating to zero velocity
        sineOut: function (t, b, c, d) {

            c -= b;
            return c * Math.sin(t / d * (Math.PI / 2)) + b;
        },
        // sinusoidal easing in/out - accelerating until halfway, then decelerating
        sine: function (t, b, c, d) {

            c -= b;
            return -c / 2 * (Math.cos(Math.PI * (t / d)) - 1) + b;
        },
        // exponential easing in - accelerating from zero velocity
        expoIn: function (t, b, c, d) {

            c -= b;
            return (t === 0) ? b : c * Math.pow(2, 10 * (t / d - 1)) + b;
        },
        // exponential easing out - decellerating to zero velocity
        expoOut: function (t, b, c, d) {

            c -= b;
            return (t === d) ? b + c : c * (-Math.pow(2, -10 * t / d) + 1) + b;
        },
        // exponential easing in and out
        expo: function (t, b, c, d) {

            c -= b;
            if (t === 0) { return b; }
            if (t === d) { return b + c; }
            if ((t /= d / 2) < 1) { return c / 2 * Math.pow(2, 10 * (t - 1)) + b; }
            return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
        },
        // circular easing in - accelerating from zero velocity
        circIn: function (t, b, c, d) {

            c -= b;
            t /= d;
            return -c * (Math.sqrt(1 - Math.pow(t, 2)) - 1) + b;
        },
        // circular easing out - decelerating to zero velocity
        circOut: function (t, b, c, d) {

            c -= b;
            t /= d;
            t--;
            return c * Math.sqrt(1 - Math.pow(t, 2)) + b;
        },
        // circular easing in/out - acceleration until halfway, then deceleration
        circ: function (t, b, c, d) {

            c -= b;
            t /= (d / 2);
            if (t < 1) { return -c / 2 * (Math.sqrt(1 - Math.pow(t, 2)) - 1) + b; }
            t -= 2;
            return c / 2 * (Math.sqrt(1 - Math.pow(t, 2)) + 1) + b;
        }
    };

    return function (func, t, b, c, d) {

        return penner[func](t, b, c, d);
    };

})(window, undefined);

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
        this.isAnimating = true;
        this.start = 0;
    }

    Rectangulo.prototype = {
        draw: function () {
            ctx.fillStyle = this.color;
            ctx.fillRect(this.x, this.y, this.width, this.height);   // Draw a rectangle with default settings
        },

        animation: function (func, timestamp, begin, end, duration) {
            var start = 0;

            var progress;

            if (!this.start) this.start = timestamp;

            progress = timestamp - this.start;

            if (progress >= duration) {
                console.debug(progress);
                console.debug('x:  ' + ease(func, progress, begin, end, duration));
                progress = duration;
                this.isAnimating = false;
            }

            this.x = ease(func, progress, begin, end, duration);

        }
    };

    var rect1 = new Rectangulo(0, 50, 100, 100);



    var rect2 = new Rectangulo(0, 200, 100, 100);
    rect2.color = 'red';

    var rect3 = new Rectangulo(0, 350, 100, 100);
    rect3.color = 'yellow';


    var duration = 1500;

    function draw(timestamp) {
        //This timestamp is a decimal number, in milliseconds, but with a minimal precision of 1ms (1000 µs).

        // clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
 
        //Animation
        rect1.animation('linear', timestamp, 0, 500, duration);
        rect2.animation('quadOut', timestamp, 0, 500, duration);
        rect3.animation('quadIn', timestamp, 0, 500, duration);

        //Draw
        rect1.draw();
        rect2.draw();
        rect3.draw();

        if (rect1.isAnimating ||
            rect2.isAnimating ||
            rect3.isAnimating) {
            window.requestAnimationFrame(draw);
        }

    }



    window.requestAnimationFrame(draw);


})();




