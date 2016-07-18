var campusoft = campusoft || {};
if (!campusoft.game) { campusoft.game = {}; }


var campusoft_game_player = (function () {
   
    this.loopGlobal;

    return {
        preload: function (game) {
            //Dyamic
            console.log('preload');
        },

        start: function (element) {
            //Begin. Codigo Usuario
            var perro = sprite('perro');

            perro.tap(otraFuncion);

            function loop() {
                console.log('1.looop.interno');
            }

            function otraFuncion() {
                console.log('otraFuncion');
            }

            //Fin. Codigo Usuario
             if (typeof loop === 'function') {
                 this.loopGlobal = loop;
            }
        },

        wrapperLoop: function () {
            //console.log('2.looop.wrraper');
            //TODO: Como accedr al loop de start ??
            //1. Copiar el codigo.. de loop
            //2. Generar codigo JS → AST → JS
            //console.log('looop');
            if (this.loopGlobal && (typeof this.loopGlobal === 'function')) {
                this.loopGlobal.call();
            }
        }
    };
} ())

function runCode() {
    campusoft_game_player.start();
}

function wrapperLoop() {
    //console.log('3.looop.externo');
    campusoft_game_player.wrapperLoop();
}