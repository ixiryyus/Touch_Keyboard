var letter

function Get_Random_Letter() {
	var alphabet = ["a", "z", "e", "r", "t", "y", "u", "i", "o", "p", "q", "s", "d", "f", "g", "h", "j", "k", "l", "m", "w", "x", "c", "v", "b", "n"];
	var index_alphabet = Math.round(Math.random() * 25);
	letter = alphabet[index_alphabet]
	return letter
}

function Refresh_Game() {
	
	if (Count_Max_Element_In_Columns() == 10){
	alert("Game Over")
	location.reload()}
	
	else {
		var container = Choose_column()
		container.innerHTML += "<div class='Touch_Keyboard_Block_letter'><p id='Random_Letter'>" + Get_Random_Letter() + "</p></div>"
		setTimeout(Refresh_Game, 100)
	}
}

function Choose_column() {
	var column_array = document.getElementsByClassName("Column_Touch_Keyboard_Block")
	return column_array[Math.round(Math.random() * 12)]

}

function Count_Max_Element_In_Columns() {
	var number_Elements =0
	var column_array = document.getElementsByClassName("Column_Touch_Keyboard_Block")
	for (var i = 0; i < column_array.length; i++) {
		var col=column_array[i].children ; 
		if (col.length > number_Elements) {
			number_Elements = col.length
			
		}

	}
	return number_Elements
}

Get_Random_Letter();

Refresh_Game();
