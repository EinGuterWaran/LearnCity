var url_string = window.location.href;
var url = new URL(url_string);
const SUBJ = url.searchParams.get("s");
const TEST = url.searchParams.get("t");
var userData;
var curQue=0;
var first = 1;
var final = 0;
var feedback = 0;
var correct= 0;
var addCoins=0;
var addExp=0;
async function getJson(url) {
    let response = await fetch (url);
    let data = await response.json();
    return data;
}
async function main(next){
    userData = await getJson("../data.json");
    var student = userData["student"];
    var testData = userData["subjects"][SUBJ]["test"];
    if (next){
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
        document.getElementById("form").insertAdjacentHTML('afterbegin', "<h3>The test is over. :)</h3>" +
            "<h5>You earned "+addExp+" EXP and "+addCoins+" Coins. :)</h5>");
        document.getElementById("but").innerText = "Leave";

    }
    else {
        document.getElementById('progBar').setAttribute("style", "width: "+progressPerc+"%");
        document.getElementById('progBar').setAttribute("aria-valuenow", progressPerc);
        document.getElementById('ques').innerText = testData[TEST]["task"][curQue]["question"];

    }
    if (first) {
        document.getElementById('sbj').innerText = SUBJ.charAt(0).toUpperCase() + SUBJ.slice(1);
        document.getElementById('testname').innerText = testData[TEST]["-name"];
        document.getElementById('desc').innerText = testData[TEST]["desc"];
        first = 0;
    }
    document.getElementById('student').innerHTML = "<b>"+student["name"]+", "+(student["exp"]+addExp)+" EXP, "+(student["coins"]+addCoins)+" Coins</b>";
    document.getElementById('progr').innerText=(curQue+1)+"/"+testData[TEST]["task"].length;

    return false;
}

 function nextQuestion(){
    main(1);
    return false;
}
main(0);
