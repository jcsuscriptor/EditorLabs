(function () {


    var canvas = document.getElementById('area_dibujo');
    var ctx = canvas.getContext('2d');



    var factor = 400;
    //x = y
    ctx.moveTo(0, canvas.height);
    ctx.beginPath();
    for (i = 0; i <= 1; i += 0.1) {
        x = i;
        y = i;
        y1 = canvas.height - (y * factor);
        x1 = x * factor;
        ctx.lineTo(x1, y1);

    }
    ctx.strokeStyle = 'red';
    ctx.stroke();
    ctx.closePath();

    //x = y2
    ctx.moveTo(0, canvas.height);
    ctx.beginPath();
    for (i = 0; i <= 1; i += 0.1) {
        x = i;
        y = i * i;
        y1 = canvas.height - (y * factor);
        x1 = x * factor;
        ctx.lineTo(x1, y1);

    }
    ctx.strokeStyle = 'blue';
    ctx.stroke();
    ctx.closePath();
 
    //x = exp (3)
    ctx.moveTo(0, canvas.height);
    ctx.beginPath();
    for (i = 0; i <= 1; i += 0.1) {
        x = i;
        y = Math.pow(i,3);
        y1 = canvas.height - (y * factor);
        x1 = x * factor;
        ctx.lineTo(x1, y1);

    }
    ctx.strokeStyle = 'black';
    ctx.stroke();
    ctx.closePath();


    //sin
    //radians = (Math.PI/180)*degrees
    ctx.moveTo(0, canvas.height);
    ctx.beginPath();
    var increase = Math.PI / 100;
    var counter = 0;
    factor = 400;
    for (i = 0; i <= 1.05; i += 0.05) {
        x = i;
        y = Math.sin((Math.PI/180)*(i*180));
        y1 = canvas.height - (y * factor);
        x1 = x * factor;
        ctx.lineTo(x1, y1);
    }
    ctx.strokeStyle = 'green';
    ctx.stroke();
    ctx.closePath();

})();




