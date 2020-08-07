//The logic needed to create and display a board.
//------------------------------------------------------------------

//Iterator to make sure each of the boards get a unique ID. 
var boardCount = 0;

//The ID of the board that is currently being displayed.
var activeBoardID;

document.getElementById("createNewBoard").addEventListener("click", createNewBoard);

//Creating a new board as a 'div'. Attaching the right attributes, classname/id, event listeners, and other elements it needs to work as a board.
function createNewBoard(){
    var newBoard = document.createElement("div");
    newBoard.className = "board";
    newBoard.id = "board" + boardCount;
    
    //Each board need to allow "dragging", which is by default disallowed.
    var attribute1 = document.createAttribute("ondragover");
    attribute1.value = "preventDefaultBehaviour(event)";
    newBoard.setAttributeNode(attribute1);
    
    document.getElementById("body").appendChild(newBoard);
    setActiveBoard(newBoard.id);
    
    document.getElementById("boardIconContainer").appendChild(createNewBoardIcon());
    
    var strongTag = document.createElement("STRONG");
    var boardNamePTag = document.createElement("p");
    var attribute2 = document.createAttribute("contenteditable");
    
    strongTag.className = "boardName"
    strongTag.id = "boardName" + boardCount;
    attribute2.value = "true";
    boardNamePTag.setAttributeNode(attribute2);
    boardNamePTag.innerHTML = prompt("Choose a name for the board");
    
    strongTag.appendChild(boardNamePTag);
    document.getElementById("boardNamesContainer").appendChild(strongTag);
    
    displayBoardName(strongTag.id);
    
    boardCount++;
}

//Creating the icon that represents the board, and enables switching between the different boards you have created.
function createNewBoardIcon() {
    var newBoardIcon = document.createElement("div");
    newBoardIcon.className = "boardIcon";
    newBoardIcon.id = "boardIcon" + boardCount;
    newBoardIcon.addEventListener("click", switchBoardClick);
    
    var boardIconText = document.createElement("p");
    boardIconText.id = "boardIconText" + boardCount;
    boardIconText.innerHTML = boardCount + 1;
    newBoardIcon.appendChild(boardIconText);
    
    return newBoardIcon;
}

//Temporarily disabling all the boards, then turning on the one what was either just created, or chosen.
function setActiveBoard(id){
    var allBoards = document.getElementsByClassName("board");

    for(var i = 0; i < allBoards.length; i++){
        allBoards[i].style.display = "none";
    }
    
    document.getElementById(id).style.display = "flex";
    activeBoardID = id;
}

//Removing all board names, then displaying the one matching the active board.
function displayBoardName(id){
    var allBoardNames = document.getElementsByClassName("boardName");

    for(var i = 0; i < allBoardNames.length; i++){
        allBoardNames[i].style.display = "none";
    }
    
    document.getElementById(id).style.display = "block";
}

//Swapping between the boards by clicking their icon.
function switchBoardClick(event){   
    setActiveBoard("board" + event.target.id.slice(-1));
    displayBoardName("boardName" + event.target.id.slice(-1));
}