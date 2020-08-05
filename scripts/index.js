//Iterator to make sure each of the tasks get a unique ID. 
var boardCount = 0;

var activeBoardID;

document.getElementById("createNewBoard").addEventListener("click", createNewBoard);

function createNewBoard(){
    var newBoard = document.createElement("div");
    newBoard.className = "board";
    newBoard.id = "board" + boardCount;
    
    var attribute1 = document.createAttribute("ondragover");
    attribute1.value = "preventDefaultBehaviour(event)";
    newBoard.setAttributeNode(attribute1);
    
    document.getElementById("body").appendChild(newBoard);
    setActiveBoard(newBoard.id);
    
    var newBoardIcon = document.createElement("div");
    newBoardIcon.className = "boardIcon";
    newBoardIcon.id = "boardIcon" + boardCount;
    newBoardIcon.addEventListener("click", switchBoardClick);
    
    var boardIconText = document.createElement("p");
    boardIconText.id = "boardIconText" + boardCount;
    boardIconText.innerHTML = boardCount + 1;
    newBoardIcon.appendChild(boardIconText);
    
    document.getElementById("boardIconContainer").appendChild(newBoardIcon);
    
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

function setActiveBoard(id){
    var allBoards = document.getElementsByClassName("board");

    for(var i = 0; i < allBoards.length; i++){
        allBoards[i].style.display = "none";
    }
    
    document.getElementById(id).style.display = "flex";
    activeBoardID = id;
}

function displayBoardName(id){
    var allBoardNames = document.getElementsByClassName("boardName");

    for(var i = 0; i < allBoardNames.length; i++){
        allBoardNames[i].style.display = "none";
    }
    
    document.getElementById(id).style.display = "block";
}

function switchBoardClick(event){   
    setActiveBoard("board" + event.target.id.slice(-1));
    displayBoardName("boardName" + event.target.id.slice(-1));
}

document.getElementById("createNewColumn").addEventListener("click", createNewBoardColumn);

function createNewBoardColumn(){
    var newColumn = document.createElement("div");
    newColumn.className = "boardColumn";
    
    var attribute1 = document.createAttribute("ondrop");
    attribute1.value = "switchParentOfObject(event)";
    newColumn.setAttributeNode(attribute1);
    
    var removeColumnButton = document.createElement("div");
    removeColumnButton.className = "removeColumn";
    removeColumnButton.addEventListener("click", removeColumn);
    newColumn.appendChild(removeColumnButton);
    
    var strongTag = document.createElement("STRONG");
    var columnNamePTag = document.createElement("p");
    var attribute2 = document.createAttribute("contenteditable");
    
    attribute2.value = "true";
    columnNamePTag.setAttributeNode(attribute2);
    columnNamePTag.innerHTML = prompt("What will this column represent?");
    
    strongTag.appendChild(columnNamePTag);
    newColumn.appendChild(strongTag);
    
    document.getElementById(activeBoardID).appendChild(newColumn);
}


function removeColumn(event){
    event.target.parentElement.style.display = "none";
}


document.getElementById("createNewTask").addEventListener("click", createNewTask);


var taskCount = 0;
//Creating a new task as a 'div'. Attaching the right attributes, classname/id, event listeners, and other elements it needs to work as a task.
function createNewTask(){
    var task = document.createElement("div");
    task.className = "dragDropTask";
    task.id = "dragDropTask" + taskCount;
    
    var attribute1 = document.createAttribute("draggable");
    attribute1.value = "true";
    task.setAttributeNode(attribute1);
    
    var attribute2 = document.createAttribute("ondragstart");
    attribute2.value = "saveIdOfObject(event)";
    task.setAttributeNode(attribute2);

    
    var assignPersonToTask = document.createElement("button");
    assignPersonToTask.className = "assignPerson";
    assignPersonToTask.id = "assignPerson" + boardCount;
    assignPersonToTask.addEventListener("click", assignTaskToPerson);
    
    task.appendChild(assignPersonToTask);
    
    for(var i = 0; i < document.getElementById(activeBoardID).childNodes.length; i++){
        if(document.getElementById(activeBoardID).childNodes[i].style.display !== "none"){
            document.getElementById(activeBoardID).childNodes[i].appendChild(task);
            break;    
        }
    }
    
    taskCount++;
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

function isMouseOverTask(event){
    if(event.target.className === "dragDropTask" || event.target.className === "assignPerson"){
        return true;
    } else {
        return false;
    }
}

function assignTaskToPerson(event) {
    var person = prompt("Who is going to work on this task?");
    var personPTag = document.createElement("p");
    personPTag.innerHTML = person;
    document.getElementById(event.target.parentElement.id).appendChild(personPTag);
}








