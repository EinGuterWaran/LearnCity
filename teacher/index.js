import * as stHa from "../storage_handler.js";
var menu = "dashboard";
var data;
var tablerow;
async function firstMain(){
    await stHa.main();
    data = await stHa.getStorage();
    tablerow = "<tr>\n" +
        "                    <th scope=\"row\">[place]</th>\n" +
        "                    <td>[name]</td>\n" +
        "                    <td>[points]</td>\n" +
        "                </tr>";
    setTimeout(function(){
        var content = document.getElementById("content");
        document.getElementById("dashboard").addEventListener ("click", function(){switchMenu("dashboard");}, false);
        document.getElementById ("subjects").addEventListener ("click", function(){switchMenu("subjects");}, false);
        document.getElementById ("students").addEventListener ("click", function(){switchMenu("students");}, false);
        document.getElementById ("items").addEventListener ("click", function(){switchMenu("items");}, false);
        document.getElementById ("tests").addEventListener ("click", function(){switchMenu("tests");}, false);
        document.getElementById ("settings").addEventListener ("click", function(){switchMenu("settings");}, false);
        main();
    }, 500);
}
firstMain();
function reloadCSS() {
    const links = document.getElementsByTagName('link');

    Array.from(links)
        .filter(link => link.rel.toLowerCase() === 'stylesheet' && link.href)
        .forEach(link => {
            const url = new URL(link.href, location.href);
            url.searchParams.set('forceReload', Date.now());
            link.href = url.href;
        });
}

function switchMenu(newMenu) {
    menu = newMenu;
    clearContent();
    setTimeout(function(){
        main();
    }, 100);
}

function clearContent() {
    content.innerHTML = "";
}

function clearMenu(){
    const menupoints = ["dashboard","subjects", "students", "items", "tests", "settings"];
    menupoints.forEach(menupoint => document.getElementById(menupoint).removeAttribute("aria-current"));
    menupoints.forEach(menupoint => document.getElementById(menupoint).setAttribute("class","nav-link"));
}
async function main(){
    await stHa.main();
    clearMenu();
    document.getElementById(menu).setAttribute("aria-current","page");
    document.getElementById(menu).setAttribute("class","nav-link active");
    await content.appendChild(generateContent(data));
    reloadCSS();
    document.getElementById("title").innerText = menu.charAt(0).toUpperCase()+menu.slice(1);
}

function generatTh(heads, table){
    var th = document.createElement("thead");
    var head = "<tr>";
    for (var i = 0; i < heads.length;i++){
        head+= "<th scope=\"colr\">"+heads[i]+"</th>";
    }
    head+="</tr>";
    th.insertAdjacentHTML('beforeend', head);
    table.appendChild(th);
}

function generateContent(data){

    var table = document.createElement("table");
    table.classList.add('table');
    table.classList.add('table-striped');
    table.classList.add('table-hover');
    var tbody = document.createElement("tbody");
     if (menu == "subjects") {
         generatTh(["Id","Subject", "highscore", "delete"], table);
         var subjects = data["subjects"];
         var subid=0;
        var keyss = []
         for (var key in subjects) {
             var tr = document.createElement("tr");
             tr.insertAdjacentHTML("beforeend", "<td>"+subid+"</td><td>"+key.charAt(0).toUpperCase()+key.slice(1)+"</td>");
             keyss.push(key);
             var hightable = document.createElement("table");
             hightable.classList.add('table');
             hightable.classList.add('table-striped');
             hightable.classList.add('table-hover');
             hightable.setAttribute("id", "highscore"+subid);
             var highbody = document.createElement("tbody");
             var hightd = document.createElement("td");
             for (var j = 0; j < subjects[key]["highscore"].length; j++){
                 highbody.insertAdjacentHTML("beforeend",
                     tablerow.replace("[name]", subjects[key]["highscore"][j]["name"])
                         .replace("[place]",(j+1).toString())
                         .replace("[points]", subjects[key]["highscore"][j]["exp"]));
             }
             hightable.appendChild(highbody);
             hightd.appendChild(hightable);
             tr.appendChild(hightd);
             tr.insertAdjacentHTML("beforeend","<button id='delete"+key+"'>Delete</button>");
             setTimeout(function(){
                 var actKey = keyss.pop();
                 document.getElementById ("delete"+actKey).addEventListener ("click", function(){deleteSubject(actKey);}, false);
             }, 500);
             tbody.appendChild(tr);
             subid++;
         }
        if (subid < 4){
         tbody.insertAdjacentHTML("beforeend","<tr><td></td><td><input id='newSubject' type='text'></td><td><input type='button' id ='addSubject' value='Add subject!'></td></tr>");
            setTimeout(function(){
                document.getElementById ("addSubject").addEventListener ("click", function(){addSubject();}, false);
            }, 500);
        }
        else
            tbody.insertAdjacentHTML("beforeend","<tr><td colspan='3'>Maximum number of subjects has been reached</td></tr>");

         table.appendChild(tbody);
     }

     else if (menu === "students") {
        var students = data["students"];
        var actStudent = [];
        generatTh(["Id","Name","Badges","Items", "avatar", "delete"], table);
        for (var s = 0; s < students.length; s++){
            if (students[s]!=null) {
                actStudent.push(s);
                var badgesOutput = students[s]["badges"].toString();
                badgesOutput = badgesOutput.replaceAll(",","").replaceAll("g","!g!").replaceAll("s","!s!").replaceAll("b","!b!")
                    .replaceAll("!g!","<img src='../img/badges/gold_dark.svg' height='40'>")
                    .replaceAll("!s!","<img src='../img/badges/silver_dark.svg' height='40'>")
                    .replaceAll("!b!","<img src='../img/badges/bronze_dark.svg' height='40'>");
                var itemsOutput = students[s]["items"].toString().replaceAll(",","");
                itemsOutput = visualizeItems(itemsOutput);

                tbody.insertAdjacentHTML("beforeend", "<tr><td>" + students[s]["id"] + "</td><td>" + students[s]["name"] + "</td><td>"
                    + badgesOutput + "</td><td>" + itemsOutput + "</td><td><img height='100' onerror=\"this.style.display='none'\" alt=\"Don't have an avatar yet\" src='../" + students[s]["char"] + "'></td>" +
                    "<td><button id='deleteStudent" + s + "'>Delete</button></td></tr>");
                setTimeout(function () {
                    var actKey = actStudent.shift();
                    document.getElementById("deleteStudent" + actKey).addEventListener("click", function () {
                        deleteStudent(actKey);
                    }, false);
                }, 500);
            }
            else
                delete students[s];
        }
        if (students.length < 16) {
            tbody.insertAdjacentHTML("beforeend", "<tr><td></td><td><input type='text' id='studentName'></td><td><input type='button' id ='addStudent' value='Add student!'></td><td></td><td></td></tr>")
            setTimeout(function(){
                document.getElementById ("addStudent").addEventListener ("click", function(){addStudent();}, false);

            }, 500);
        }
        else
             tbody.insertAdjacentHTML("beforeend","<tr colspan='5'>Maximum number of students has been reached!</tr>");
         table.appendChild(tbody);
    }
     else if (menu === "items") {
         var items = data["items"];
         generatTh(["Id","Name","Letter", "Price", "Scarcity (1-100)", "type", "kind", "scale","Image"], table);
         for (var i = 0; i < items.length; i++){
             tbody.insertAdjacentHTML("beforeend",
                 "<tr><td>"+items[i]["id"]+"</td><td>"+items[i]["name"]+"</td>" +
                 "<td>"+items[i]["let"]+"</td><td>"+items[i]["price"]+"</td>" +
                 "<td>"+items[i]["scarcity"]+"</td><td>"+items[i]["type"]+"</td>" +
                 "<td>"+items[i]["kind"]+"</td><td>"+items[i]["scale"]+"</td>" +
                 "<td><img height='100' src='../img/furniture/"+items[i]["src"]+"'></td></tr>")
         }
         tbody.insertAdjacentHTML("beforeend","<tr><td></td><td><input type='text'></td><td><input type='text'></td>" +
             "<td><input type='text'></td><td><input type='text'></td><td>" +
             "<select id=\"type\" name=\"type\">\n" +
             "  <option value=\"clothing\">clothing</option>\n" +
             "  <option value=\"furniture\">furniture</option>\n" +
             "</select>\n" +
             "</td><td><input type='text'></td><td><input type='text'></td>" +
             "<td><input type='file'></td><td><input type='button' onclick='window.alert(\"For technical reasons, it is not possible to add items in this demo. We apologize for the inconvenience. <3 \")' value='Add Item!'></td></tr>")
         table.appendChild(tbody);


    }
     else if (menu === "tests") {
         table = document.createElement("h1");
         table.insertAdjacentText("beforeend", "Here would be a module to add and edit tests.");

    }
     else if (menu === "settings"){
         var teacher = data["teacher"];
         table = document.createElement("form");
         var form = "  <div class=\"form-group\">\n" +
             "    <label for=\"firstName\">First Name</label>\n" +
             "    <input type=\"text\" class=\"form-control\" id=\"firstName\" value="+teacher.firstname+">\n" +
             "  </div>\n" +
             "<div class=\"form-group\">\n" +
             "    <label for=\"lastName\">Last Name</label>\n" +
             "    <input type=\"text\" class=\"form-control\" id=\"lastName\" value="+teacher.lastname+">\n" +
             "  </div>\n"+
             "  <div class=\"form-group\">\n" +
             "    <label for=\"title\">Title</label>\n" +
             "    <select class=\"form-control\" id=\"title2\">\n";
            if (teacher.title !== "Mr.")
                form+="<option>Mr.</option>\n";
            else
                form+="<option selected>Mr.</option>\n";
            if (teacher.title !== "Mrs.")
                form+="<option>Mrs.</option>\n";
            else
                form+="<option selected value='Mrs.'>Mrs.</option>\n";
         if (teacher.title !== "Ms.")
             form+="<option>Ms.</option>\n";
         else
             form+="<option selected>Ms.</option>\n";
         form+="    </select>\n" +
         "</div>\n";
         var semesterGoal = teacher.semesterGoal;
         form+="<div class=\"form-group\">"+
             "    <label for=\"classGoal\">Class Goal (EXP)</label>\n" +
             "    <input type=\"range\" class=\"form-control\" onchange=\"updateTextInput(this.value);\" id=\"classGoal\" min='10000' max='100000' step='10000' value="+semesterGoal+">\n" +
             "<input disabled type=\"text\" id=\"textInput\" value="+semesterGoal+">\n"+
             "  </div>\n";
         form +=  "<div class=\"form-group\"><br><input type='button' id='setButton' value='Save'></div>" +
             "<hr> <div class=\"alert alert-danger\" role=\"alert\">\n" +
             "  Danger Zone\n" +
             "</div>\n" +
             "If you click this button, there is no way back. <br><br>"+
             "<button type=\"button\" class=\"btn btn-danger\" id='reset'>Reset this class!</button>\n";
         setTimeout(function(){
             document.getElementById ("setButton").addEventListener ("click", function(){saveSettings();}, false);
             document.getElementById ("reset").addEventListener ("click", function(){stHa.initStorage();window.alert("This class has been reset.");location.reload();}, false);

         }, 500);
         table.insertAdjacentHTML("beforeend", form);
     }
     else {
         var teacherdata = data["teacher"];
        table = document.createElement("div");
        var h1teacher = document.createElement("h1");
        h1teacher.insertAdjacentText("beforeend", "Welcome "+teacherdata.title+" "+teacherdata.firstname+" "+teacherdata.lastname+"! :)");
        var h2teacher = document.createElement("h2");
        h2teacher.insertAdjacentHTML("beforeend","This is a demo of the part of Learn City that a potential teacher would see. <br>");
        h2teacher.insertAdjacentText("beforeend","In this demo, the data of your imaginary class is stored in the Local Storage, i.e. the changes you make can be seen immediately in the demo for the students. Try it out! :)");
        table.appendChild(h1teacher);
        table.appendChild(h2teacher);
        table.insertAdjacentHTML("beforeend", "<br><br><hr><div class=\"alert alert-warning\" role=\"alert\">If you click on a 'Delete' button, the element will be gone." +
            " There is no way back!</div>");
    }
    return table;

}

async function saveSettings(){
    var tData = await stHa.getStorage();
    var firstInput = document.getElementById("firstName").value;
    var lasttInput = document.getElementById("lastName").value;
    var titleInput = document.getElementById("title2").value;
    var goalInput = document.getElementById("classGoal").value;

    if (firstInput.length !==0 && lasttInput.length !==0){
        tData["teacher"].firstname = firstInput;
        tData["teacher"].lastname = lasttInput;
        tData["teacher"].title = titleInput;
        tData["teacher"].semesterGoal = goalInput;
        stHa.writeStorage(tData);
        window.alert("New settings have been saved successfully. :)");
        location.reload();
    }
    else {
        window.alert("No empty inputs please!");
    }
}

async function addStudent(){
    var sData = await stHa.getStorage();
    var studentName = document.getElementById("studentName").value;
    var avatars = ['philip','janu','rk','mo','romelo'];
    if (studentName.length > 0 && studentName.length <= 12) {
        if (sData["students"].length < 16) {
            var whichAvatar = Math.floor(Math.random() * 4);
            var newStudent = {
                "id": sData["students"].length,
                "name": studentName,
                "map": [
                    "attttttttp",
                    "l        r",
                    "l        r",
                    "l        r",
                    "l        r",
                    "l        r",
                    "l        r",
                    "d        r",
                    "l        r",
                    "zbbbbbbbbx"
                ],
                "char": "img/chars/"+avatars[whichAvatar]+".svg",
                "items": [
                ],
                "badges":[
                ]
            };
            sData["students"].push(newStudent);
            stHa.writeStorage(sData);
            window.alert(studentName+" has been added successfully. :)");
            location.reload();


        } else
            window.alert("Maximum number of students has been reached!");
    }
    else if(studentName.length == 0)
        window.alert("Empty student name!");
    else
        window.alert("The maximum number of characters for a student name is 12!");
}

async function addSubject() {
    var stData = await stHa.getStorage();
    var subjectName = document.getElementById("newSubject").value;
    if (subjectName.length > 0){
        stData["subjects"][subjectName] = {};
        stData["subjects"][subjectName].highscore = [];
        stData["subjects"][subjectName].test = [];
        stHa.writeStorage(stData);
        window.alert(subjectName+" has been added successfully. :)");
        location.reload();

    }
    else
        window.alert("Empty name for new subject!");

}

async function deleteSubject(key) {
    var subData = await stHa.getStorage();
    delete subData["subjects"][key];
    stHa.writeStorage(subData);
    window.alert(key+" has been deleted successfully. :)");
    location.reload();

}

async function deleteStudent(key) {
    var stuData = await stHa.getStorage();
    var stuName = stuData["students"][key]["name"];
    stuData["students"].splice(key,1);
    stHa.writeStorage(stuData);
    window.alert(stuName+" has been deleted successfully. :)");
    location.reload();
}

function visualizeItems(itemString){
    itemString;
    var itemData = data;
    var outputItems = "";
    var isItemArray=[];
    var itemArray=[];
    for (var i=0; i < itemString.length;i++){
        if (!isItemArray.includes(itemString.charAt(i))){
            isItemArray.push(itemString.charAt(i));
        }
    }
    isItemArray.sort(function (a,b) {
        return parseInt(a) - parseInt(b);
    });
    for (var i=0; i < itemString.length;i++){
        if (itemArray[itemString.charAt(i)] == null)
            itemArray[itemString.charAt(i)] = 1;
        else
            itemArray[itemString.charAt(i)]+=1;
    }
    for (var i = 0; i < isItemArray.length; i++){
        if (i!=0 && i!=isItemArray.length)
            outputItems+=", ";
        if (itemArray[isItemArray[i]] > 1){
            outputItems += itemArray[isItemArray[i]]+"x";
        }
        outputItems+="<img height='60' src='../img/furniture/"+itemData['items'][isItemArray[i]]['src']+"'>";
    }

    return outputItems;
}


