score = 0
objText = text('TAP!',200,300,'yellow')
function tap(){
	score =  score + 1
	objText.change('tap #: '+ score) 
}