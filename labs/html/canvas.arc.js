(function () {


    var canvas = document.getElementById('area_dibujo');
    var ctx = canvas.getContext('2d');

    var radius = 50;

    ctx.beginPath();
    ctx.arc(50, 50, radius, 0, Math.PI, false);
    ctx.fill();


})();




