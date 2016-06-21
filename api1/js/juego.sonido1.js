//sound('mono',true);

mono = sound('mono',false);

var play = true;
function tap(){
	if (play)
		mono.play();
	else
		mono.stop();
	play = !play;
}
