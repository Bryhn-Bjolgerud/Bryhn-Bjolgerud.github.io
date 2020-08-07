//The logic needed to add a member to the board/project.
//------------------------------------------------------------------

document.getElementById("addMemberToProject").addEventListener("click", addMember);

//Adding the member to the corrects selects. 
function addMember(){
    var member = prompt("Name of the person");
    
    //All the select tags we need to add the member to. The member list will be different for each board
    var listOfMembers = document.getElementsByClassName("boardMember" + activeBoardID.slice(-1));
    
    //Adding the option to all existing select menus connected to the currently active board.
    for(var i = 0; i < listOfMembers.length; i++){
        var memberOptionTag = document.createElement("option");
        memberOptionTag.innerHTML = member;
        listOfMembers[i].appendChild(memberOptionTag);
    }
}