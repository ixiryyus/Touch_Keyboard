var letter;


var GAMES ={
    is_over :false,
    DislayLetter:[[],[],[],[],[],[],[],[],[],[],[],[],[],],
    score: 0,
    BestScore: localStorage["bestscore"] ? localStorage["bestscore"] : 0,

}
const CONFIG = {
    nb_column : 12,
    nb_letter : 26,

}

function DetectKey(){
document.addEventListener('keydown', function(event){
    if (Is_letter_on_screen(event.key)){
    RemoveLetter(event.key)
    GAMES.score++}
    else GAMES.score--

})
}

function RemoveLetter(key){
    var Is_Already_Filtrer = false
    var Is_Max_Column_Filtrer = false




    var Index_Col= Get_Max_Column_Index()
    var col= GAMES.DislayLetter[Index_Col]


    GAMES.DislayLetter[Index_Col].reverse()
    GAMES.DislayLetter[Index_Col] = GAMES.DislayLetter[Index_Col].filter(function(current_key){

        if (Is_Already_Filtrer) return current_key;
        else{
            if (current_key == key){
                Is_Already_Filtrer = true
                Is_Max_Column_Filtrer = true
            }
            return current_key != key
        }
    })
    GAMES.DislayLetter[Index_Col].reverse()



    if (!Is_Max_Column_Filtrer){
        for(i = 0; i<CONFIG.nb_column ; i++){
            GAMES.DislayLetter[i].reverse()
            GAMES.DislayLetter[i] = GAMES.DislayLetter[i].filter(function(current_key){

                if (Is_Already_Filtrer) return current_key;
                else{
                    if (current_key == key){
                        Is_Already_Filtrer = true
                    }
                    return current_key != key
                }
            })
            GAMES.DislayLetter[i].reverse()

        }

    }




}
function Is_letter_on_screen(letter){
    for (i=0;i<CONFIG.nb_column;i++){
        for(j=0;j<GAMES.DislayLetter[i].length;j++){

            if (GAMES.DislayLetter[i][j] == letter )
                return true

        }
    }
    return false
}
function Get_Random_Letter() {
	var alphabet = ["a", "z", "e", "r", "t", "y", "u", "i", "o", "p", "q", "s", "d", "f", "g", "h", "j", "k", "l", "m", "w", "x", "c", "v", "b", "n"];
	var index_alphabet = Math.round(Math.random() * 25);
	letter = alphabet[index_alphabet]
	return letter
}
function Repain_letter(){

    for (i=0;i<CONFIG.nb_column;i++){
        var columnHTML = Get_Column_By_Index(i)
        columnHTML.innerHTML =""


        for(j=0;j<GAMES.DislayLetter[i].length;j++){
            columnHTML.innerHTML += "<div class='Touch_Keyboard_Block_letter letter_" + GAMES.DislayLetter[i][j].toUpperCase() +"'><p id='Random_Letter'>" + GAMES.DislayLetter[i][j] + "</p></div>"
            if (GAMES.is_over)
                setTimeout(Refresh_Game, 100)
        }
    }


}
function Refresh_score(){
    var scoreHTML=document.getElementById("Value_Current_Score")
    scoreHTML.innerHTML = GAMES.score
}
function Refresh_Game(){
    var NewLetter = Get_Random_Letter()
    GAMES.DislayLetter[Get_Randomn_Column_Index()].
    push(NewLetter)

    for(i=0;i<GAMES.DislayLetter.length;i++) {

}

	if (Count_Max_Element_In_Columns() == 10){
	alert("Game Over")
	location.reload()}

	else {

	    Repain_letter()
		setTimeout(Refresh_Game, 200)
	}
	Refresh_score()
    Refresh_BestScore()
}
function Refresh_BestScore(){
    if (GAMES.score> GAMES.BestScore){
        localStorage["bestscore"] = GAMES.score
        GAMES.BestScore= GAMES.score

    }
    var scoreHTML=document.getElementById("Value_Best_Score")
    scoreHTML.innerHTML = GAMES.BestScore

}
function Get_Randomn_Column_Index(){
    return Math.round(Math.random() * CONFIG.nb_column)
}
function Get_Column_By_Index(index){
    var column_array = document.getElementsByClassName("Column_Touch_Keyboard_Block")
    return column_array[index]



}
function Get_Random_Column() {
	var column_array = document.getElementsByClassName("Column_Touch_Keyboard_Block")
	return column_array[Get_Randomn_Column_Index()]
}
function Get_Max_Column_Index() {
	var number_Elements = 0
    var Column_Max_Index =0
	var column_array = document.getElementsByClassName("Column_Touch_Keyboard_Block")
	for (var i = 0; i < column_array.length; i++) {
		var col=column_array[i].children ; 
		if (col.length > number_Elements) {
			number_Elements = col.length
            Column_Max_Index = i
		}


	}
	return Column_Max_Index
}

function Count_Max_Element_In_Columns() {
    var number_Elements = 0
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
DetectKey();

Refresh_Game();
