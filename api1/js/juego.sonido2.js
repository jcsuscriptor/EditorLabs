monkey = sprite('monkey',0,0);
elephant = sprite('elephant',200,300);
pig = sprite('pig',400,0);

monkey.tap(play_monkey); 
elephant.tap(play_elephant);
pig.tap(play_pig);


function play_monkey(){
	console.log('play_monkey');
	sound('mono',true);
}

function play_elephant(){
	console.log('play_elephant');
	sound('elefante',true);
}

function play_pig(){
	console.log('play_pig');
	sound('cerdo_grunidos',true);
}