//The logic needed to create a new column and remove them.
//------------------------------------------------------------------

document.getElementById("createNewColumn").addEventListener("click", createNewBoardColumn);

//Creating a new column as a 'div'. Attaching the right attributes, classname/id, event listeners, and other elements it needs to work as a board column.
function createNewBoardColumn(){
    var newColumn = document.createElement("div");
    newColumn.className = "boardColumn";
    
    //When an element is dropped into the column, it is ment to "adopt" it.
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

//Deleting a column by not displaying it anymore.
function removeColumn(event){
    event.target.parentElement.style.display = "none";
}