import * as stHa from "../../storage_handler.js";
stHa.main();

var url_string = window.location.href;
var url = new URL(url_string);
const SUBJ = url.searchParams.get("s");
var userData;
var todo ="<div class=\"col-md-6\">\n" +
    "            <div class=\"h-100 p-5 text-dark bg-light rounded-3\">\n" +
    "                <h1 class=\"display-5 fw-bold\">[testname]</h1>\n" +
    "                <p class=\"col-md-8 fs-3\">[desc]</p>\n" +
    "                <p class=\"col-sm-8 fs-5\">[questions] questions, time: [time].</p>\n" +
    "                <p class=\"col-sm-8 fs-5\">What can you earn in this Test?</p>\n" +
    "                <p class=\"col-sm-8 fs-5\">[earnings]</p>\n" +
    "                <a class=\"btn btn-primary btn-lg\" href='test.html?s="+SUBJ+"&t=[id]' type=\"button\">Start</a>\n" +

    "            </div>\n" +
    "        </div>";
var done ="<div class=\"col-md-6\">\n" +
    "            <div class=\"h-100 p-5 text-white bg-dark rounded-3\">\n" +
    "                <h1 class=\"display-5 fw-bold\">[testname] (finished)</h1>\n" +
    "                <p class=\"col-md-8 fs-3\">[desc]</p>\n" +
    "                <p class=\"col-sm-8 fs-5\">[points] correct answers.</p>\n" +
    "                <p class=\"col-sm-8 fs-5\">What did you earn in this Test?</p>\n" +
    "                <p class=\"col-sm-8 fs-5\">[earnings]</p>\n" +
    "            </div>\n" +
    "        </div>";
var tablerow = "<tr>\n" +
    "                    <th scope=\"row\">[place]</th>\n" +
    "                    <td>[name]</td>\n" +
    "                    <td>[points]</td>\n" +
    "                </tr>";

async function main(){
    function writeTime(seconds){
        if (seconds < 60){
            return seconds+" seconds";
        }
        var minutes = Math.floor(seconds/60);
        var seconds = seconds % 60;
        if (seconds == 0)
            return minutes+" minutes";
        return minutes+" minutes and "+seconds+" seconds";
    }
    userData = await stHa.getStorage();
    document.getElementById('sbj').innerText = SUBJ.charAt(0).toUpperCase()+SUBJ.slice(1);
    var student = userData["student"];
    document.getElementById('student').innerHTML = "<b>"+student["name"]+", "+student["exp"]+" EXP, "+student["coins"]+" Coins</b>";

    var testData = userData["subjects"][SUBJ]["test"];
    var d1 = document.getElementById('mco');
    for (var i=0; i < testData.length; i++){

        if(!testData[i].done){
            d1.insertAdjacentHTML('beforeend', todo
                .replace("[testname]",testData[i]["-name"])
                .replace("[desc]",testData[i]["desc"])
                .replace("[questions]",testData[i]["task"].length)
                .replace("[earnings]", testData[i]["task"].length*testData[i]["CPC"]+" Coins and "+testData[i]["task"].length*testData[i]["ExpPC"]+" EXP.")
                .replace("[id]", i)
                .replace("[time]", writeTime(testData[i]["timer"])));
        }
        else {
            d1.insertAdjacentHTML('beforeend', done
                .replace("[testname]",testData[i]["-name"])
                .replace("[desc]",testData[i]["desc"])
                .replace("[points]",testData[i]["correct"]+"/"+testData[i]["task"].length)
                .replace("[earnings]", testData[i]["correct"]*testData[i]["CPC"]+" Coins and "+testData[i]["correct"]*testData[i]["ExpPC"]+" EXP."));
        }
    }
    var highscoredata = userData["subjects"][SUBJ]["highscore"];
    for (var j = 0; j < highscoredata.length; j++){
        document.getElementById("highbody").insertAdjacentHTML("beforeend",
            tablerow.replace("[name]", highscoredata[j]["name"])
                .replace("[place]",(j+1).toString())
                .replace("[points]", highscoredata[j]["exp"]));
    }
}
main();
