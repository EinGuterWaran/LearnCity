// var json = JSON.parse(('../data.json'));
// console.log(json)
async function getJson(url) {
    let response = await fetch(url);
    let data = await response.json();
    return data;
}
async function main() {
    userData = await getJson("../data.json");
    const k = kaboom({
        global: true,
        width: (window.innerHeight / 3) * 4,
        height: window.innerHeight,
        scale: 1,
        debug: true,
        clearColor: [0, 0, 0, 0]
    });

    loadSprite('char', 'https://i.imgur.com/Ei1VnX8.png')
    loadSprite('bed', 'img/bed.png')
    loadSprite('door', 'https://i.imgur.com/okdJNls.png')
    loadSprite('sofa', 'img/sofa.png')
    loadSprite('lamp', 'img/lamp.png')

    // loadSprite('board', 'img/')

    // walls
    loadSprite('left-wall', 'https://i.imgur.com/rfDoaa1.png')
    loadSprite('top-wall', 'https://i.imgur.com/QA257Bj.png')
    loadSprite('bottom-wall', 'https://i.imgur.com/vWJWmvb.png')
    loadSprite('right-wall', 'https://i.imgur.com/SmHhgUn.png')
    loadSprite('bottom-left-wall', 'https://i.imgur.com/awnTfNC.png')
    loadSprite('bottom-right-wall', 'https://i.imgur.com/84oyTFy.png')
    loadSprite('top-left-wall', 'https://i.imgur.com/xlpUxIm.png')
    loadSprite('top-right-wall', 'https://i.imgur.com/z0OmBd1.jpg')
    loadSprite('board', 'img/badges/wooden_board.svg')

    scene("room", () => {

        layers(['bg', 'obj', 'ui'], 'obj')

        const title = add([
            text("Apartment", 15),
            layer("ui"),
            pos(innerWidth / 3, 2)
        ])
        const person = add([
            sprite("char"),
            pos(49, 330)
        ])
        // const door = add([
        //     sprite('door'),
        //     pos(0, innerHeight / 2)
        // ])

        // const bed = add([
        //     sprite("bed"),
        //     pos(100, 100),
        //     scale(0.2)
        // ])
        const MOVE_SPEED = 120

        // 20 by 20 map
        const sizeOfMap = 20
        const map = [
            "attttttttp",
            "l   e k  r",
            "l       cr",
            "l        r",
            "l       sr",
            "l        r",
            "l        r",
            "d        r",
            "l        r",
            "zbbbbbbbbx"
        ]

        const posItems = {
            width: 48,
            height: 48,
            'r': [sprite('right-wall'), solid(), 'wall'],
            'l': [sprite('left-wall'), solid(), 'wall'],
            'd': [sprite('door'), solid(), 'door'],
            'b': [sprite('bottom-wall'), solid(), 'wall'],
            't': [sprite('top-wall'), solid(), 'wall'],
            'p': [sprite('top-right-wall'), solid(), 'wall'],
            'z': [sprite('bottom-left-wall'), solid(), 'wall'],
            'a': [sprite('top-left-wall'), solid(), 'wall'],
            'x': [sprite('bottom-right-wall'), solid(), 'wall'],
            'e': [sprite('bed'), scale(0.2), solid(), 'bed'],
            's': [sprite('sofa'), scale(0.05), solid(), 'sofa'],
            'k': [sprite('lamp'), scale(0.2), solid(), 'lamp'],
            'c': [sprite('board'), scale(0.05),origin("center"),'board']
        }

        addLevel(map, posItems)

        // console.log(map)
        console.log(new Array(11).join(" "))


        keyPressRep("left", () => {
            person.move(-MOVE_SPEED, 0)

        })
        keyPressRep("right", () => {
            person.move(MOVE_SPEED, 0)
        })
        keyPressRep("up", () => {
            person.move(0, -MOVE_SPEED)
        })
        keyPressRep("down", () => {
            person.move(0, MOVE_SPEED)
        })
        
        person.action(() => {
            person.resolve()
        })

        person.collides('door', () => {
            go("outside");
        })
        const allObjs = get('char');
        console.log(allObjs)

    });

    scene("outside", () => {

    })

    start("room");


    console.log(window.innerHeight)
    console.log((window.innerHeight / 4) * 3)

    action(() => {
        console.log("oh hi")
    });
}
main();
// userData = await getJson("../data.json")
// console.log(userData) 

// import data from './data.json';
// console.log(data);


// data = fetch("./data.json")
// .then(response => {
//    return response.json();
// })
// // .then(data => console.log(data));

// console.log(data['students'])

// function loadJSON(callback) {   

//     var xobj = new XMLHttpRequest();
//         xobj.overrideMimeType("application/json");
//     xobj.open('GET', 'data.json', true); // Replace 'my_data' with the path to your file
//     xobj.onreadystatechange = function () {
//           if (xobj.readyState == 4 && xobj.status == "200") {
//             // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
//             callback(xobj.responseText);
//           }
//     };
//     xobj.send(null);  
//  }

//  loadJSON(function(response) {
//     // Parse JSON string into object
//       var actual_JSON = JSON.parse(response);
//       console.log(actual_JSON['students'])
//    });

// data = {
//     "id": 0,
//     "name": "Alissa",
//     "map": [
//       "atttttttts",
//       "l   e k  r",
//       "l        r",
//       "l        r",
//       "l       pr",
//       "l        r",
//       "l        r",
//       "d        r",
//       "l        r",
//       "zbbbbbbbbx"
//     ],
//     "items": [
//       1,14,3,11,11
//     ]
//   },
//   {
//     "id": 1,

//     "name": "Nithusan",
//     "map": [
//       "atttttttts",
//       "l   e k  r",
//       "l        r",
//       "l        r",
//       "l       pr",
//       "l    k   r",
//       "l        r",
//       "d    p   r",
//       "l        r",
//       "zbbbbbbbbx"
//     ],
//     "items": [
//       1,14,3,11,33,1,5,3
//     ]
//   },{
//     "id": 2,
//     "name": "Maria",
//     "map": [
//       "atttttttts",
//       "l   e    r",
//       "l        r",
//       "l        r",
//       "l kk    pr",
//       "l        r",
//       "l    k   r",
//       "d        r",
//       "l        r",
//       "zbbbbbbbbx"
//     ],
//     "items": [
//       1,14,3,11,15
//     ]
//   }

// console.log(data)
