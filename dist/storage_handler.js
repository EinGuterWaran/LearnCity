async function getJson(url) {
    let response = await fetch(url);
    let data = await response.json();
    return data;
}

async function getOriginalJSON(){
    var userData = await getJson('data.json');
    return userData;
}

async function initStorage(){
    var userData = getOriginalJSON();
    localStorage.setItem('LearnStorage', JSON.stringify(userData));
}
async function getStorage() {
// Retrieve the object from storage
    var retrievedObject = localStorage.getItem('LearnStorage');
    var learnjson = JSON.parse(retrievedObject);
    return learnjson;
}
async function writeStorage(var json) {
    localStorage.setItem('LearnStorage', JSON.stringify(json));
}

if (localStorage.getItem("LearnStorage") === null)
    initStorage();

