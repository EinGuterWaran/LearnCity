var menu = "dashboard";
setTimeout(function(){
    var content = document.getElementById("content");
    document.getElementById("dashboard").addEventListener ("click", function(){switchMenu("dashboard");}, false);
    document.getElementById ("subjects").addEventListener ("click", function(){switchMenu("subjects");}, false);
    document.getElementById ("students").addEventListener ("click", function(){switchMenu("students");}, false);
    document.getElementById ("reports").addEventListener ("click", function(){switchMenu("reports");}, false);
    document.getElementById ("tests").addEventListener ("click", function(){switchMenu("tests");}, false);
    main();
}, 500);
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
    console.log(newMenu);
    clearContent();
    setTimeout(function(){
        main();
    }, 100);
}

function clearContent() {
    content.innerHTML = "";
}

function clearMenu(){
    const menupoints = ["dashboard","subjects", "students", "reports", "tests"];
    menupoints.forEach(menupoint => document.getElementById(menupoint).removeAttribute("aria-current"));
    menupoints.forEach(menupoint => document.getElementById(menupoint).setAttribute("class","nav-link"));
}
function main(){
    clearMenu();
    document.getElementById(menu).setAttribute("aria-current","page");
    document.getElementById(menu).setAttribute("class","nav-link active");
    content.insertAdjacentHTML("beforeend", generateContent());
    reloadCSS();
    document.getElementById("title").innerText = menu.charAt(0).toUpperCase()+menu.slice(1);
}

function generateContent(){
    var content="";
    if (menu == "subjects") {

    } else if (menu == "students") {

    } else if (menu == "reports") {
        content+="";

    } else if (menu == "tests") {
        content+="";
    } else {

    }
    return content;

}