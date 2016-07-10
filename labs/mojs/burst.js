; (function (window) {

    function init() {
        var ele = document.querySelector('#btn1'); //button.icobutton');
        var ele2 = document.querySelector('#btn2');
        var burst = new mojs.Burst({
            parent: ele,
            shape: 'circle',
            fill: ['deeppink', 'cyan', 'orange'],
            x: '50%', y: '50%',
            //angle: -270,
            //degree: 180,// -180, //  90, -90, 180
            //,opacity: 0.6,
            //childOptions: { radius: { 15: 0 } },
            duration: 6000,// 1700,
            radius: { 30: 90 },
            count: 6
            //isRunLess: true,
            //easing: mojs.easing.bezier(0.1, 1, 0.3, 1)
        });
        
       /*
       var transit = new mojs.Transit({
           parent: ele,
           duration: 6000, //700,
           type: 'circle', //equal', //bitsMap', // 'bit', //zigzag', //line', // 'cross', // 'rect', //circle',
           radius: { 0: 60 },
           fill:  'transparent', //deeppink', //, 'cyan', 'orange'], //'transparent',
           stroke: 'deeppink', //  ['deeppink', 'cyan', 'orange'], //'#C0C1C3',
           strokeWidth: { 20: 0 },
           //opacity: 0.6,
           x: '50%',
           y: '50%',
           //isRunLess: true,
           //easing: mojs.easing.sin.out
       });
      

        // burst animation
        var burst2 = new mojs.Burst({
            parent: ele2,
            duration: 600,
            shape: 'circle',
            fill: '#C0C1C3',
            x: '0%',
            y: '0%',
            childOptions: {
                radius: { 60: 0 },
                type: 'line',
                stroke: '#988ADE',
                strokeWidth: 1
            },
            radius: { 80: 250 },
            angle: -90,
            count: 1,
            //isRunLess: true,
            easing: mojs.easing.bezier(0.1, 1, 0.3, 1)
        });

         */

        var burst3 =  new mojs.Burst({
					parent: ele2,
					duration:6000, // 600,
					delay: 150,
					shape : 'circle',
					fill: '#C0C1C3',
					x: '50%',
					y: '50%',
					childOptions: { 
						radius: {30:0},
						type: 'line',
						stroke: '#988ADE',
						strokeWidth: {2:1}
					},
					radius: {60:90},
					//degree: -90,
					angle: 135,
					count: 6,
					//isRunLess: true,
					easing: mojs.easing.bezier(0.1, 1, 0.3, 1)
				})
    }

    init();

})(window);

