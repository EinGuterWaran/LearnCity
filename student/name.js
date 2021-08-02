import * as stHa from "../storage_handler.js";
var data;
var info = false;
async function main(){
    await stHa.main();
    data = await stHa.getStorage();
    document.getElementById("currentName").innerText = "Your current name is "+data["student"].name+".";
    setTimeout(function(){
        document.getElementById("saveName").addEventListener ("click", function(){saveName();}, false);
    }, 500);
}
main();

function saveName(){
    var newName = document.getElementById("newName").value;
    if (info)
        document.getElementById("info").remove();
    info = true;
    if (newName.length <= 12 && newName.length > 0){
        data["student"].name = newName;
        data["students"][0].name = newName;
        stHa.writeStorage(data);
        document.getElementById("nameDiv").insertAdjacentHTML("beforeend","<div id =\"info\" class=\"alert alert-success\" role=\"alert\">" +
            "Great! Your new name has been saved, "+newName+". :) </div>");
        main();
    }
    else if (newName.length === 0) {
        document.getElementById("nameDiv").insertAdjacentHTML("beforeend","<div id =\"info\" class=\"alert alert-danger\" role=\"alert\">" +
            "You typed in an empty name. Try it again! :)</div>");
    }
    else {
        document.getElementById("nameDiv").insertAdjacentHTML("beforeend","<div id =\"info\" class=\"alert alert-danger\" role=\"alert\">" +
            "The maximum number of characters for your name is 12. Choose a shorter name!</div>");
    }
}