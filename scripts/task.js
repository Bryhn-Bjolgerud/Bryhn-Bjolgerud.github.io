//The logic needed to create a new task, and move them around.
//------------------------------------------------------------------

document.getElementById("createNewTask").addEventListener("click", createNewTask);

//Iterator to make sure each of the tasks get a unique ID. 
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

    var memberList = document.createElement("select");
    memberList.className = "boardMember" + activeBoardID.slice(-1);
    task.appendChild(memberList);
    
    var taskInfo = document.createElement("div");
    taskInfo.className = "taskInfo";
    task.appendChild(taskInfo);
    
    var taskInfoPTag = document.createElement("p");
    taskInfoPTag.className = "taskInfoPTag";
    taskInfoPTag.innerHTML = "Write a description of the task"
    var attribute3 = document.createAttribute("contenteditable");
    attribute3.value = "true";
    taskInfoPTag.setAttributeNode(attribute3);
    
    var datePicker = document.createElement("input");
    datePicker.className = "datePicker";
    
    var attribute4 = document.createAttribute("type");
    attribute4.value = "date";
    datePicker.setAttributeNode(attribute4);
    
    task.appendChild(datePicker);
    
    taskInfo.appendChild(taskInfoPTag);
    
    //Appends the task to the left most visible column on the board.
    for(var i = 0; i < document.getElementById(activeBoardID).childNodes.length; i++){
        if(document.getElementById(activeBoardID).childNodes[i].style.display !== "none"){
            document.getElementById(activeBoardID).childNodes[i].appendChild(task);
            break;    
        }
    }
    
    taskCount++;
}

//Default behaviour of is to disallow dragging elements on the page, but we want to do that.
function preventDefaultBehaviour(event) {
    event.preventDefault();
}

//Storing the id of the element we want to drag and drop.
function saveIdOfObject(event) {
    event.dataTransfer.setData("text", event.target.id);
}

//Changing the parent element so it appears as if the task has been "dropped".
function switchParentOfObject(event) {
    //If you dropped one task on top of another they would merge.
    if(isTaskOverColumn(event)){
        event.target.appendChild(document.getElementById(event.dataTransfer.getData("text")));
    }
}

//Want to only be able to drop task into board columns, so we have to check what the target is when we drop.
function isTaskOverColumn(event){
    if(event.target.className === "boardColumn"){
        return true;
    } else {
        return false;
    }
}