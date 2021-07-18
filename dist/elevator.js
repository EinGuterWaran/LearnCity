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

    for (var i=0; i < userData['students'].length; i++){
        console.log(userData['students'][i]);
    }

    kaboom({
        global: true,
        //width: window.innerHeight <= window.innerWidth ? (window.innerHeight / 3) * 4 : window.innerWidth,
        //height: window.innerWidth <= window.innerHeight ? (window.innerWidth / 4) * 3 : window.innerHeight,
        width: 1440, //1440
        height: 1024, //1024
        scale: 1,
        debug: true,
        clearColor: [0,0,0,1]
    })

    loadSprite('elevator-sketch', 'img/elevator/elevator-sketch.png')
    loadSprite('elevator-inside', 'img/elevator/elevator-inside.png')
    loadSprite('bell-button', 'img/elevator/bell-button.png')

    // furniture
    loadSprite('char', userData['student']['character'])
    loadSprite('bed', 'img/bed.png')
    loadSprite('door', 'https://i.imgur.com/okdJNls.png')
    loadSprite('sofa', 'img/sofa.png')
    loadSprite('lamp', 'img/lamp.png')
    loadSprite('bookshelf', 'img/furniture/bookshelf.svg')
    loadSprite('drawer', 'img/furniture/drawer.svg')
    loadSprite('single-sofa', 'img/furniture/single_sofa.svg')
    loadSprite('cabinet', 'img/furniture/cabinet.svg')
    loadSprite('stool', 'img/furniture/stool.svg')
    loadSprite('three-sofa', 'img/furniture/three_seater_sofa.svg')
    loadSprite('plant', 'img/furniture/plant.svg')

    // badges
    loadSprite('g', 'img/badges/gold_light.svg')
    loadSprite('s', 'img/badges/silver_light.svg')
    loadSprite('b', 'img/badges/bronze_light.svg')

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

    scene('elevator', () => {
    
        add([
            sprite('elevator-inside'),
            //scale(width() / 240, height() / 240),
            origin('topleft')
        ])

        var x = 237;
        var y = 241;
        var row = 0;

        for (var i=0; i < userData['students'].length; i++){
            if (i >= 3) {
                row = 1;
            }
            if (i >= 6) {
                row = 2;
            }
            if (i >= 9) {
                row = 3;
            }
            if (i >= 12) {
                row = 4;
            }
            if (i >= 15) {
                row = 5;
            }

            console.log(userData['students'][i]);
            const buttons = add([
                sprite('bell-button'),
                pos(x+(i%3)*342,y+row*91),
                //pos(237, 241),
                //scale(width() / 240, height() / 240),
                origin('topleft')
            ])
            buttons.action(() => {
                if (buttons.isClicked()){
                    go("room", player);
                }
            })

            add([
                text(userData['students'][i].name, 18),
                pos(x+(i%3)*342+90,y+row*91+22),
                //pos(237, 241),
                //scale(width() / 240, height() / 240),
                origin('topleft')
            ])
        }
    })

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

        function add_badges() {
            console.log(player['badges'])
            add([text(player['name'] + "(Badges)", 15), layer('ui'), pos(150, 72), 'name'])
            if (player['badges'].length == 0) {
                add([text("You can do it!! Lets do some challenges to earn some badges", 15, { width: 300 }), color(rgb(1, 0, 0)), layer('ui'), pos(100, 100), 'name'])
            } else {
                py = 95
                px = 40
                player['badges'].forEach(element => {
                    add([sprite(element), pos(px, py),
                    layer('ui'), scale(0.2), 'badge'])
                    // py+=30
                    if (px < 390) {
                        px += 40
                    } else {
                        py += 50
                        px = 40
                    }
                    console.log(px)
                })

            };
        }

        board.action(() => {
            // console.log(board.pos)
            if (board.isClicked()) {
                if (board.scale == 0.05) {
                    board.scale = 0.385
                    board.pos = vec2(0, 60)
                    add_badges()
                    console.log(board)
                } else {
                    board.scale = 0.05
                    board.pos = vec2(355, 54)
                    every("badge", (obj) => {
                        destroy(obj)
                    });
                    every("name", (obj) => {
                        destroy(obj);
                    });
                }
            }
        })

        const MOVE_SPEED = 150

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
            's': [sprite('single-sofa'), scale(0.2), solid(), 'sofa'],
            '3': [sprite('three-sofa'), scale(0.4), solid(), 'sofa'],
            'k': [sprite('lamp'), scale(0.2), solid(), 'lamp'],
            'n': [sprite('plant'), scale(0.2), solid(), 'plant'],
            'w': [sprite('drawer'), scale(0.2), solid(), 'drawer'],
            'c': [sprite('cabinet'), scale(0.4), solid(), 'cabinet'],
            'o': [sprite('stool'), scale(0.2), solid(), 'stool'],
            'h': [sprite('bookshelf'), scale(0.4), solid(), 'bookshelf']

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
        person.action(() => {
            person.resolve()
        })

        person.collides('door', () => {
            go("elevator");
        })
        const allObjs = get('char');
        console.log(allObjs)

    });
    scene("outside", () => {

    })
    start('elevator')

}

main();