texto = text('Click/Tap Cambiar Color',300,300,'blue',{font: "30px Arial"})
texto.tap(cambiar)
function cambiar(){
	color = random(colors)
	texto.color = color
	texto.text = 'Click: Color '+color
}