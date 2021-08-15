async function getJson(url) {
    let response = await fetch(url);
    let data = await response.json();
    return data;
}



async function getOriginalJSON(){
    var actURL = window.location.href;
    [actURL] = actURL.split('?');
    var path = window.location.pathname;
    var actURL = actURL.replace(path,'');
    var userData = await getJson(actURL+'/LearnCity/data.json');
    return userData;
}

async function initStorage(){
    var userData2 = await getOriginalJSON();
    localStorage.setItem('LearnStorage', JSON.stringify(userData2));
}
async function getStorage() {
// Retrieve the object from storage
    var retrievedObject = localStorage.getItem('LearnStorage');
    var learnjson = JSON.parse(retrievedObject);
    return learnjson;
}
async function writeStorage(json) {
    localStorage.setItem('LearnStorage', JSON.stringify(json));
}

async function main() {
    if (localStorage.getItem("LearnStorage") === null) {
        await initStorage();
    }
}

export {main, getJson, getOriginalJSON, initStorage, getStorage, writeStorage };
