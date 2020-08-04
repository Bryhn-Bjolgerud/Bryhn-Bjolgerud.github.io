//Iterator to make sure each of the tasks get a unique ID. 
var iterator = 0;

var activeBoardID;

/*
document.getElementById("createFirstBoard").addEventListener("click", createFirstBoard);

function createFirstBoard(){
    document.getElementById("createFirstBoardPopUp").style.display = "none";
    document.getElementById("mainPanel").style.display = "flex";
}*/



document.getElementById("createNewBoard").addEventListener("click", createNewBoard);

function createNewBoard(){
    var newBoard = document.createElement("div");
    newBoard.className = "board";
    newBoard.id = "board" + iterator;
    
    var attribute1 = document.createAttribute("ondragover");
    attribute1.value = "preventDefaultBehaviour(event)";
    newBoard.setAttributeNode(attribute1);
    
    document.getElementById("body").appendChild(newBoard);
    setActiveBoard(newBoard.id);
    
    var newBoardIcon = document.createElement("div");
    newBoardIcon.className = "boardIcon";
    newBoardIcon.id = "boardIcon" + iterator;
    newBoardIcon.addEventListener("click", switchBoardClick);
    
    document.getElementById("boardContainer").appendChild(newBoardIcon);
    
    iterator++;
}

function setActiveBoard(id){
    var allBoards = document.getElementsByClassName("board");

    for(var i = 0; i < allBoards.length; i++){
        allBoards[i].style.display = "none";
    }
    
    document.getElementById(id).style.display = "flex";
    activeBoardID = id;
}

function switchBoardClick(event){   
    setActiveBoard("board" + event.target.id.slice(-1));
}

document.getElementById("test").addEventListener("click", createNewBoardColumn);

function createNewBoardColumn(){
    var newColumn = document.createElement("div");
    newColumn.className = "svadainnhold";
    newColumn.id = "svadainnhold" + iterator;
    
    var attribute1 = document.createAttribute("ondrop");
    attribute1.value = "switchParentOfObject(event)";
    newColumn.setAttributeNode(attribute1);
    
    var removeColumnButton = document.createElement("div");
    removeColumnButton.className = "removeColumn";
    removeColumnButton.addEventListener("click", removeColumn);
    newColumn.appendChild(removeColumnButton);
    
    var strongTag = document.createElement("STRONG");
    var columnName = prompt("What will this column represent?");
    var columnNamePTag = document.createElement("p");
    
    var attribute2 = document.createAttribute("contenteditable");
    attribute2.value = "true";
    columnNamePTag.setAttributeNode(attribute2);
    columnNamePTag.innerHTML = columnName;
    
    strongTag.appendChild(columnNamePTag);
    newColumn.appendChild(strongTag);
    
    document.getElementById(activeBoardID).appendChild(newColumn);
    
    iterator++;
}

//Adding functionality to the three default columns "remove column buttons" that you are given when creating the board.
var removeColumnButtons = document.getElementsByClassName("removeColumn");
for(var i = 0; i < removeColumnButtons.length; i++){
    removeColumnButtons[i].addEventListener("click", removeColumn);
}

function removeColumn(event){
    event.target.parentElement.style.display = "none";
}


document.getElementById("createNewTask").addEventListener("click", createNewTask);


//Creating a new task as a 'div'. Attaching the right attributes, classname/id, event listeners, and other elements it needs to work as a task.
function createNewTask(){
    var task = document.createElement("div");
    task.className = "dragDropTask";
    task.id = "dragDropTask" + iterator;
    
    var attribute1 = document.createAttribute("draggable");
    attribute1.value = "true";
    task.setAttributeNode(attribute1);
    
    var attribute2 = document.createAttribute("ondragstart");
    attribute2.value = "saveIdOfObject(event)";
    task.setAttributeNode(attribute2);

    
    var assignPersonToTask = document.createElement("button");
    assignPersonToTask.className = "assignPerson";
    assignPersonToTask.id = "assignPerson" + iterator;
    assignPersonToTask.addEventListener("click", assignTaskToPerson);
    
    task.appendChild(assignPersonToTask);
    
    for(var i = 0; i < document.getElementById(activeBoardID).childNodes.length; i++){
        if(document.getElementById(activeBoardID).childNodes[i].style.display !== "none"){
            document.getElementById(activeBoardID).childNodes[i].appendChild(task);
            break;    
        }
    }
    
    iterator++;
}


function preventDefaultBehaviour(event) {
    event.preventDefault();
}

function saveIdOfObject(event) {
    event.dataTransfer.setData("text", event.target.id);
}

function switchParentOfObject(event) {
    //If you dropped one task on top of another they would merge.
    if(!isMouseOverTask(event)){
        event.target.appendChild(document.getElementById(event.dataTransfer.getData("text")));
    }
}


function assignTaskToPerson(event) {
    var person = prompt("Who is going to work on this task?");
    var personPTag = document.createElement("p");
    personPTag.innerHTML = person;
    document.getElementById(event.target.parentElement.id).appendChild(personPTag);
}


function isMouseOverTask(event){
    if(event.target.className === "dragDropTask" || event.target.className === "assignPerson"){
        return true;
    } else {
        return false;
    }
}


//-----------------------------------------

/*
document.getElementById("navbar1").addEventListener("click", changeBoard);

function changeBoard(){
    if(document.getElementById("mainPanel").style.display == "flex"){
        
    document.getElementById("mainPanel").style.display = "none";
    } else if(document.getElementById("mainPanel").style.display ==  "none"){
        
    document.getElementById("mainPanel").style.display = "flex";
    }
}

*/








