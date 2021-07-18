// var json = JSON.parse(('../data.json'));
// console.log(json)
async function getJson(url) {
    let response = await fetch(url);
    let data = await response.json();
    return data;
}
async function main() {

    // default choose first palyer
    userData = await getJson("../data.json");
    console.log(userData['students']['0'])


    player = userData['students']['0']
    console.log(player['map'])

    const k = kaboom({
        global: true,
        width: (window.innerHeight / 3) * 4,
        height: window.innerHeight,
        scale: 1,
        debug: true,
        clearColor: [0, 0, 0, 0]
    });

    loadSprite('char', userData['student']['character'])
    loadSprite('bed', 'img/bed.png')
    loadSprite('door', 'https://i.imgur.com/okdJNls.png')
    loadSprite('sofa', 'img/sofa.png')
    loadSprite('lamp', 'img/lamp.png')
    
    // badges
    // loadSprite('gold-badge', 'img/badges/')

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

    scene("room", (player) => {

        layers(['bg', 'obj', 'ui'], 'obj')

        const title = add([
            text("Apartment", 15),
            layer("ui"),
            pos(innerWidth / 3, 2)
        ])
        const person = add([
            sprite("char"),
            pos(50, 335),
            scale(0.2)
        ])

        const board = add([
            sprite("board"),
            pos(355, 54),
            scale(0.05),
            layer('ui')
        ])

        board.action(() => {
            // console.log(board.pos)
            if (board.isClicked()) {
                if (board.scale == 0.05) {
                    board.scale = 0.385
                    board.pos = vec2(0, 60)

                } else {
                    board.scale = 0.05
                    board.pos = vec2(355, 54)

                }
            }
        })

        const MOVE_SPEED = 120

        // 20 by 20 map
        const sizeOfMap = 20
        const map = player['map']
        // [
        //     "attttttttp",
        //     "l   e k  r",
        //     "l        r",
        //     "l        r",
        //     "l       sr",
        //     "l    k   r",
        //     "l        r",
        //     "d    s   r",
        //     "l        r",
        //     "zbbbbbbbbx"
        //   ]



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
            'k': [sprite('lamp'), scale(0.2), solid(), 'lamp']
        }

        addLevel(map, posItems)

        // console.log(map)
        // console.log(new Array(11).join(" "))


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
        // person.action(() => {
        //     person.resolve()
        // })

        person.collides('door', () => {
            go("outside");
        })
        const allObjs = get('char');
        console.log(allObjs)

    });

    scene("outside", () => {

    })

    // scene("board", () => {
    //     layers(['bg', 'obj', 'ui'], 'obj')

    //     const background = add([sprite('board'), layer('bg'), scale(0.5)])
    //     background.action(() => {
    //         if (background.isClicked()) {
    //             go("room", player)
    //         }
    //     })
    // })

    start("room", player);


    console.log(window.innerHeight)
    console.log((window.innerHeight / 4) * 3)

    // action(() => {
    //     console.log("oh hi")
    // });
}
main();
