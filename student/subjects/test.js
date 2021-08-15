import * as stHa from "/LearnCity/storage_handler.js";


setTimeout(function(){
    document.getElementById("but").addEventListener ("click", function(){nextQuestion(); return false;}, false);
    }, 500);


var url_string = window.location.href;
var url = new URL(url_string);
var userData;
var curQue=0;
var first = 1;
var final = 0;
var feedback = 0;
var correct= 0;
var addCoins=0;
var addExp=0;

async function main(next){
    await stHa.main();
    var SUBJ = url.searchParams.get("s");
    var TEST = url.searchParams.get("t");
    userData = await stHa.getStorage();
    var student = userData["student"];
    var testData = userData["subjects"][SUBJ]["test"];
    if (!next && (testData[TEST]["done"] || testData[TEST]["started"])){
        if (testData[TEST]["started"]){
            userData["subjects"][SUBJ]["test"][TEST].done=1;
            stHa.writeStorage(userData);
        }
        document.getElementById("testmain").innerHTML = "<div class='card border-danger mb-3'>You have already taken this test!</div>"
        +"<br> <a href='index.html?s="+SUBJ+"'>Back</a>";
        throw new Error("You have already taken this test!");
    }
    if (next){
        userData["subjects"][SUBJ]["test"][TEST].started=1;
        userData["subjects"][SUBJ]["test"][TEST].correct=correct;
        var answer = document.getElementById("answer").value;
        document.getElementById("answer").value='';
        if (feedback)
            document.getElementById("feedback").remove();
        if (answer===testData[TEST]["task"][curQue]["answer"]){
            feedback=1;
            var wonExp = testData[TEST]["ExpPC"];
            var wonCoins = testData[TEST]["CPC"];
            document.getElementById("row").insertAdjacentHTML("afterbegin",
                "<div id='feedback' class='card border-success mb-3'><div class ='card-body text-success'>" +
                "<h5>Correct answer. Well done!</h5>" +
                "<p class='card-text'>"+answer+" was the right answer.</p>" +
                "<p>You get "+wonExp+" EXP and "+wonCoins+" Coins.</p>"+
                "</div></div>");
            correct++;
            userData["subjects"][SUBJ]["test"][TEST].correct=correct;
            userData["student"].coins+=wonCoins;
            userData["student"].exp+=wonExp;
            addCoins += wonCoins;
            addExp += wonExp;
        }
        else {
            feedback=1;
            document.getElementById("row").insertAdjacentHTML("afterbegin",
                "<div id='feedback' class='card border-danger mb-3'><div class ='card-body text-danger'><h5>Sorry, wrong answer!</h5><p class='card-text'>"+testData[TEST]["task"][curQue]["answer"]+" was the right answer for \""+testData[TEST]["task"][curQue]["question"]+"\".</p></div></div>");

        }
        if (curQue<testData[TEST]["task"].length)
            curQue++;
        if (curQue===testData[TEST]["task"].length)
            final = 1;
        stHa.writeStorage(userData);
    }
    var progressPerc = 100*(curQue)/testData[TEST]["task"].length;
    if (final){
        curQue--;
        var progressPerc = 100*(curQue+1)/testData[TEST]["task"].length;
        document.getElementById('progBar').setAttribute("style", "width: "+progressPerc+"%");
        document.getElementById('progBar').setAttribute("aria-valuenow", progressPerc);
        document.getElementById('ques').remove();
        document.getElementById('answerform').remove();
        document.getElementById("but").setAttribute("onclick", "location.href = 'index.html?s="+SUBJ+"'")
        document.getElementById("but").setAttribute("type", "button");
        document.getElementById("form").insertAdjacentHTML('afterbegin', "<h3>The test is over. :) You answered "+correct+
            " out of "+testData[TEST]["task"].length+" questions correctly.</h3>" +
            "<h5>You earned "+addExp+" EXP and "+addCoins+" Coins. :)</h5>");
        var percReach = correct/testData[TEST]["task"].length;
        var badge= "";
        var showBadge="<h3> Because you answered more than <b>[perc]%</b> of the questions correctly, you get a <b> [badge] badge</b>. Great job!</h3> "
            +"<div style='text-align: center'><img src='../../img/badges/[badgei].svg'></div>";
        if (percReach >= 0.9) {
            badge = "g";
            showBadge = showBadge.replace("[perc]","90")
                .replace("[badge]","gold")
                .replace("[badgei]","gold_dark");
        }
        else if (percReach >= 0.7){
            badge="s";
            showBadge = showBadge.replace("[perc]","70")
                .replace("[badge]","silver")
                .replace("[badgei]","silver_dark");
        }

        else if (percReach >= 0.5){
            badge="b";
            showBadge = showBadge.replace("[perc]","50")
                .replace("[badge]","bronze")
                .replace("[badgei]","bronze_dark");
        }
        if (percReach >= 0.5){
            document.getElementById("form").insertAdjacentHTML('beforeend',showBadge);
        }
        userData["students"][0].badges.push(badge);
        userData["subjects"][SUBJ]["test"][TEST].done=1;
        userData["subjects"][SUBJ]["test"][TEST].correct=correct;
        userData["student"].coins+=addCoins;
        userData["student"].exp+=addExp;
        stHa.writeStorage(userData);
        document.getElementById("but").innerText = "Leave";

    }
    else {
        document.getElementById('progBar').setAttribute("style", "width: "+progressPerc+"%");
        document.getElementById('progBar').setAttribute("aria-valuenow", progressPerc);
        document.getElementById('ques').innerHTML = "Question: <br>"+testData[TEST]["task"][curQue]["question"];

    }
    if (first) {
        document.getElementById('sbj').innerText = SUBJ.charAt(0).toUpperCase() + SUBJ.slice(1);
        document.getElementById('testname').innerText = testData[TEST]["-name"];
        document.getElementById('desc').innerText = testData[TEST]["desc"];
        first = 0;
    }
    document.getElementById('student').innerHTML = "<b>"+student["name"]+", "+(student["exp"]+addExp)+" EXP, "+(student["coins"]+addCoins)+" Coins</b>";
    document.getElementById('progr').innerText=(curQue+1)+"/"+testData[TEST]["task"].length;

    if (final)
        document.getElementById('student').innerHTML = "<b>"+student["name"]+", "+(student["exp"])+" EXP, "+(student["coins"])+" Coins</b>";

    return false;
}

 function nextQuestion(){
    main(1);
    return false;
}
main(0);
