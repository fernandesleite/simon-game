var simon = {
	buttons: document.querySelectorAll(".button"),
	toPress: [],
}

function init(){
	for (var i = 0; i < simon.buttons.length; i++) {
		simon.buttons[i].addEventListener("click", function(event){
			console.log(event.target)
		})
	}
}
init(0)