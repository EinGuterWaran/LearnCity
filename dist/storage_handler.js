async function getJson(url) {
    let response = await fetch(url);
    let data = await response.json();
    return data;
}

async function main() {
    userData = await getJson('data.json');

    localStorage.setItem('testObject', JSON.stringify(testObject));

// Retrieve the object from storage
    var retrievedObject = localStorage.getItem('testObject');

    console.log('retrievedObject: ', JSON.parse(retrievedObject));

}

main();