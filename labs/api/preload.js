function __preload(game) {
    var list = [@preload];

    for (var index = 0; index < list.length; index++) {
        var element = list[index];
        var image = campusoft.game.asset.images['fillnotfound'];
        if (campusoft.game.asset.images[element]) {
           image= campusoft.game.asset.images[element];
        }

        game.load.image(element, getFullPath(image.src));
    }
}

function __create(game) {
    
}

try {
    @code
} catch (error) {
    console.log("error.tryCatchTemplate");
}


function __load(){
    
}