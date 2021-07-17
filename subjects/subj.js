var url_string = window.location.href;
var url = new URL(url_string);
const SUBJ = url.searchParams.get("s");
var userData;
var test ="<div class=\"p-5 mb-4 bg-light rounded-3\">\n" +
    "            <div class=\"container-fluid py-5\">\n" +
    "                <h1 class=\"display-5 fw-bold\">[testname]</h1>\n" +
    "                <p class=\"col-md-8 fs-4\">[desc]</p>\n" +
    "                <button class=\"btn btn-primary btn-lg\" type=\"button\">Start</button>\n" +
    "            </div>\n" +
    "        </div>";

async function getJson(url) {
    let response = await fetch (url);
    let data = await response.json();
    return data;
}
async function main(){
    userData = await getJson("../data.json");
    var testData = userData["subjects"][SUBJ]["test"];
    for (i=0; i < testData.length; i++){
        if(!testData[i].done){
            console.log("Todo");
        }
        else {
            console.log("Done");
        }
    }
}
main();
