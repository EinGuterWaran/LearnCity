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
            add([
                sprite('bell-button'),
                pos(x+(i%3)*342,y+row*91),
                //pos(237, 241),
                //scale(width() / 240, height() / 240),
                origin('topleft')
            ])

            add([
                text(userData['students'][i].name, 18),
                pos(x+(i%3)*342+90,y+row*91+22),
                //pos(237, 241),
                //scale(width() / 240, height() / 240),
                origin('topleft')
            ])
        }
    })

    start('elevator')

}

main();