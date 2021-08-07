import * as stHa from '../storage_handler.js';


const scaleDown = 1.3333333333333333;

async function main() {
  await stHa.main();
  var userData = await stHa.getStorage();
  document.addEventListener("click", async function () {
    userData = await stHa.getStorage();
  });

  kaboom({
    global: true,
    root: document.getElementById('game'),
    width: 1080,
    height: 768,
    scale: 1,
    debug: true,
    clearColor: [0, 0, 0, 1],
  });

  const myfunc = () => {
    var userExp = userData['student'].exp;
    var userLvl = Math.floor(userExp/1000);
    const expPercent = (userExp-userLvl*1000)/1000;
    var goalPercent1 = 0;
    for (var i = 0; i < userData['students'].length; i++) {
      goalPercent1 += userData['students'][i].exp;
    }
    var goalPercent = goalPercent1 / userData['teacher'].semesterGoal;


    add([
      rect(Math.round(304 / scaleDown), Math.round(114 / scaleDown)),
      pos(Math.round(1142 / scaleDown), Math.round(0 / scaleDown)),
      color(rgba(1, 1, 1, 0.0)),
      origin('topleft'),
    ]);

    if (userData['student'].name.length <= 9){
        add([
            text('User: ' + userData['student'].name, Math.round(20 / scaleDown)),
            pos(Math.round(1120 / scaleDown), Math.round(5 / scaleDown)),
            color(0, 0, 0),
            origin('topleft'),
        ]);
    }
    else {
        add([
            text('User: ' + userData['student'].name, Math.round(17 / scaleDown)),
            pos(Math.round(1120 / scaleDown), Math.round(5 / scaleDown)),
            color(0, 0, 0),
            origin('topleft'),
        ]);
      }


    add([
      text('Coins: ' + userData['student'].coins, Math.round(20 / scaleDown)),
      pos(Math.round(1120 / scaleDown), Math.round(35 / scaleDown)),
      color(0, 0, 0),
      origin('topleft'),
    ]);
    add([
      text('LVL: '+ userLvl, Math.round(18 / scaleDown)),
      pos(Math.round(1120 / scaleDown), Math.round(65 / scaleDown)),
      color(0, 0, 0),
      origin('topleft'),
    ]);

    add([
      rect(140, 20),
      pos(Math.round(1240 / scaleDown), Math.round(60 / scaleDown)),
      color(0, 0, 0),
      origin('topleft'),
    ]);

    add([
      rect(140*expPercent, 20),
      pos(Math.round(1240 / scaleDown), Math.round(60 / scaleDown)),
      color(rgba(0.094, 0.760, 0.058)),
      origin('topleft'),
    ]);
  add([
      text('EXP: '+ userExp + '/' + (userLvl+1)*1000, Math.round(10 / scaleDown)),
      pos(Math.round(1250 / scaleDown), Math.round(68 / scaleDown)),
      color(255, 255, 255),
      origin('topleft'),
  ]);
    add([
      text('Class\nGoal:', Math.round(18 / scaleDown)),
      pos(Math.round(1120 / scaleDown), Math.round(95 / scaleDown)),
      color(0, 0, 0),
      origin('topleft'),
    ]);

    add([
      rect(140, 20),
      pos(Math.round(1240 / scaleDown), Math.round(100 / scaleDown)),
      color(0, 0, 0),
      origin('topleft'),
    ]);

    add([
      rect(140*goalPercent, 20),
      pos(Math.round(1240 / scaleDown), Math.round(100 / scaleDown)),
      color(rgba(0.094, 0.760, 0.058)),
      origin('topleft'),
    ]);
      add([
          text(goalPercent1 + '/' + userData['teacher'].semesterGoal, Math.round(10 / scaleDown)),
          pos(Math.round(1250 / scaleDown), Math.round(108 / scaleDown)),
          color(255, 255, 255),
          origin('topleft'),
      ]);
  }

  loadSprite('char', '../img/chars/' + userData['student']['character']);
  loadSprite('door', '../img/apartment/door5.png');
  for (var i = 0; i < userData['items'].length; i++) {
    var item = userData['items'][i];
    if (item['type'] === 'furniture') {
      loadSprite(
          item['src'].substr(0, item['src'].length - 4),
          '../img/furniture/' + item['src'],
      );
    }
  }

  // badges
  loadSprite('g', '../img/badges/gold_light.svg');
  loadSprite('s', '../img/badges/silver_light.svg');
  loadSprite('b', '../img/badges/bronze_light.svg');

  // walls
  loadSprite('left-wall', '../img/apartment/left-wall.png');
  loadSprite('top-wall', '../img/apartment/top-wall.png');
  loadSprite('bottom-wall', '../img/apartment/bottom-wall.png');
  loadSprite('right-wall', '../img/apartment/right-wall.png');
  loadSprite('bottom-left-wall', '../img/apartment/bottom-left-wall.png');
  loadSprite('bottom-right-wall', '../img/apartment/bottom-right-wall.png');
  loadSprite('top-left-wall', '../img/apartment/top-left-wall.png');
  loadSprite('top-right-wall', '../img/apartment/top-right-wall.jpg');
  loadSprite('board', '../img/badges/wooden_board.svg');

  loadSprite('floor', '../img/apartment/floor10.png');
  
  loadSprite('elevator-inside', '../img/small/elevator-inside.png');
  loadSprite('bell-button', '../img/small/bell-button.png');
  loadSprite('city-background', '../img/small/city-background.png');
  loadSprite('apartment-building', '../img/small/apartment-building.png');
  loadSprite('settings-building', '../img/small/settings-building.png');
  loadSprite('subject-building', '../img/small/subject-building.png');
  loadSprite('market', '../img/small/market.png');
  loadSprite('club-house', '../img/small/club-house.png');
  loadSprite('market-inside', '../img/small/market-inside.png');
  loadSprite('club-house-inside', '../img/small/club-house-inside.png');
  loadSprite('loading-screen', '../img/small/loading-screen.png');
  loadSprite('easter-egg', '../img/small/easter-egg.png');
  loadSprite('settings-inside', '../img/small/settings-inside.png');
  loadSprite('avatar1', '../img/small/avatar1.png');
  loadSprite('avatar2', '../img/small/avatar2.png');
  loadSprite('elevator-up', '../img/small/elevator-up.png');
  loadSprite('elevator-down', '../img/small/elevator-down.png');
  
  loadSound('elevator1', '../sounds/55837_644651-lq.mp3');
  loadSound('elevator2', '../sounds/539574_3775755-lq.mp3');
  loadSound('elevator3', '../sounds/403188_7813079-lq.mp3');
  loadSound('elevator4', '../sounds/331205_2792951-lq.mp3');
  loadSound('elevator5', '../sounds/467243_6300624-lq.mp3');
  loadSound('elevator6', '../sounds/482096_8253036-lq.mp3');
  loadSound('door', '../sounds/214001_3635427-lq.mp3');
  loadSound('city-sound', '../sounds/366304_5950368-lq.mp3');
  loadSound('easteregg', '../sounds/easteregg.mp3');
  loadSound('dreamy', '../sounds/bensound-dreams.mp3');


  scene('loading-screen', () => {
    add([
      sprite('loading-screen'),
      origin('topleft'),
    ]);
    wait(0, () => {
      go('city');
    });
  });
  scene('easter-egg', () => {
    var easteregg = add([
      sprite('easter-egg'),
      origin('topleft'),
    ]);
    const eggSound= play('easteregg', {
      volume: 0.2,
      speed: 1.0,
      loop: true,
      seek: 27,
    });
    easteregg.action(() => {
      if (easteregg.isClicked()) {
        eggSound.stop();
          go('city');
      }
    });

  });
  scene('city', () => {
    add([
      sprite('city-background'),
      origin('topleft'),
    ]);
    const balloon = add([
      rect(42 / scaleDown, 70 / scaleDown),
      pos(Math.round(1051 / scaleDown), Math.round(40 / scaleDown)),
      color(0, 0, 0, 0),
      origin('topleft'),
    ]);
    balloon.action(() => {
      if (balloon.isClicked()) {
        citySound.stop();
        go('easter-egg');
      }
    });
    myfunc()


    const citySound = play('city-sound', {
      volume: 40.0,
      speed: 1.0,
      loop: true,
      seek: 27,
    });

    const apartmentBuilding = add([
      sprite('apartment-building'),
      pos(Math.round(0 / scaleDown), Math.round(63 / scaleDown)),
      origin('topleft'),
    ]);

    apartmentBuilding.action(() => {
      if (apartmentBuilding.isClicked()) {
        play('door', {
          volume: 1.0,
          speed: 1.0,
        });
        wait(1, () => {
          citySound.stop();
          go('elevator-animation', 'city');
        });
      }
    });

    const market = add([
      sprite('market'),
      pos(Math.round(580 / scaleDown), Math.round(327 / scaleDown)),
      origin('topleft'),
    ]);

    market.action(() => {
      if (market.isClicked()) {
        citySound.stop();
        go('market');
      }
    });

    const clubHouse = add([
      sprite('club-house'),
      pos(Math.round(1212 / scaleDown), Math.round(380 / scaleDown)),
      origin('topleft'),
    ]);

    clubHouse.action(() => {
      if (clubHouse.isClicked()) {
        citySound.stop();
        go('club-house');
      }
    });

    const settingsBuilding = add([
      sprite('settings-building'),
      pos(Math.round(938 / scaleDown), Math.round(290 / scaleDown)),
      origin('topleft'),
    ]);

    settingsBuilding.action(() => {
      if (settingsBuilding.isClicked()) {
        citySound.stop();
        go('settings-building');
      }
    });

    const size = 1.0;
    var x = 1250;
    var y = 762;
    var row = 0;

    var i = 0;

    for (var subject in userData['subjects']) {
      const house = add([
        sprite('subject-building'),
        pos(Math.round((x - i * 190) / scaleDown), Math.round((y - (i % 2) * 80) / scaleDown)),
        scale(size),
        origin('topleft'),
        subject,
      ]);
      var shiftMiddle = 5;
      var subjectName = subject.charAt(0).toUpperCase() + subject.substring(1);
      if (subjectName.length > 7) {
        subjectName =
          subjectName.substring(0, 6) + '-' + subjectName.substring(6);
        shiftMiddle = 0;
      }

      var xname = Math.round((x - i * 190 + 69) / scaleDown)
      var yname = Math.round((y - (i % 2) * 80 + 66 + shiftMiddle) / scaleDown)

      if (subjectName.length <= 7) {
        xname +=
        (((7 - subjectName.length) / (7 * 2)) * 94) /
        scaleDown;
      }



      add([
        text(subjectName, 9, {
          width: Math.round(94 / scaleDown), // wrap when exceeds this width (defaults to 0 - no wrap)
        }),
        pos(
          xname,
          yname,
        ),
        color(0, 0, 0),
        origin('topleft'),
      ]);

      const location = 'subjects/?s=' + subject;

      action(subject, (b) => {
        if (b.isClicked()) {
          citySound.stop();
          window.location = location;
        }
      });

      ++i;
    }
  });

  scene('settings-building', () => {
    let dreamySound;
    wait(0.2, () => {
      dreamySound = play('dreamy', {
        volume: 0.1,
        speed: 1.0,
        loop: true,
        seek: 27,
        //detune: 1200,
      });
    });
    add([
      sprite('settings-inside'),
      origin('topleft'),
    ]);
    const nameButton = add([
      rect(489 / scaleDown, 146 / scaleDown),
      pos(Math.round(475 / scaleDown), Math.round(270 / scaleDown)),
      color(0, 0, 0, 0),
      origin('topleft'),
    ]);

    const avatarButton = add([
      rect(489 / scaleDown, 146 / scaleDown),
      pos(Math.round(475 / scaleDown), Math.round(519 / scaleDown)),
      color(0, 0, 0, 0),
      origin('topleft'),
    ]);
    const exitButton = add([
      text('Exit', Math.round(48 / scaleDown)),
      pos(Math.round(1050 / scaleDown), Math.round(750 / scaleDown)),
      color(0, 0, 0),
      origin('topleft'),
    ]);

    exitButton.action(() => {
      if (exitButton.isClicked()) {
        dreamySound.stop();
        go('city');
      }
    });
    avatarButton.action(() => {
      if (avatarButton.isClicked()) {
        go('avatarScene1');
      }
    });
    nameButton.action(() => {
      if (nameButton.isClicked()) {
        window.open("name.html", "Change name","width=500,height=500");
      }
    });
  });
  scene('avatarScene1', () => {
    add([
      sprite('avatar1'),
      origin('topleft'),
    ]);


    const continueButton = add([
      text('Continue', Math.round(48 / scaleDown)),
      pos(Math.round(950 / scaleDown), Math.round(950 / scaleDown)),
      color(0, 0, 0),
      origin('topleft'),
    ]);

    continueButton.action(() => {
      if (continueButton.isClicked()) {
        go('avatarScene2');
      }
    });
  });

  scene('avatarScene2', () => {
    const exitButton = add([
      text('Exit', Math.round(88 / scaleDown)),
      pos(Math.round(950 / scaleDown), Math.round(860 / scaleDown)),
      color(0, 0, 0),
      origin('topleft'),
    ]);

    add([
      sprite('avatar2'),
      origin('topleft'),
    ]);

    exitButton.action(() => {
      if (exitButton.isClicked()) {
        go('settings-building');
      }
    });
  });

  scene('market', () => {
    let dreamySound;
    wait(0.2, () => {
      dreamySound = play('dreamy', {
        volume: 0.1,
        speed: 1.0,
        loop: true,
        seek: 27,
      });
    });
    const rectangle = add([
      rect(1200 / scaleDown, 600 / scaleDown),
      pos(Math.round(120 / scaleDown), Math.round(210 / scaleDown)),
      color(0, 0, 0),
      origin('topleft'),
    ]);

    add([
      sprite('market-inside'),
      origin('topleft'),
    ]);

    const exitButton = add([
      rect(200 / scaleDown, 70 / scaleDown),
      pos(Math.round(1095 / scaleDown),Math.round(837 / scaleDown)),
      color(255, 0, 0),
      origin('topleft'),
    ]);

    add([
      text('Exit', Math.round(48 / scaleDown)),
      pos(Math.round(1100 / scaleDown), Math.round(850 / scaleDown)),
      color(0, 0, 0),
      origin('topleft'),
    ]);

    exitButton.action(() => {
      if (exitButton.isClicked()) {
        dreamySound.stop();
        go('city');
      }
    });
    var stateMessage = true;
    rectangle.action(() => {
      if (rectangle.isClicked()) {
        if (stateMessage) {
          const message = add([
            rect(1440 / scaleDown, 1024 / scaleDown),
            pos(0 / scaleDown, 0 / scaleDown),
            color(rgba(0, 0, 0, 0.8)),
            origin('topleft'),
            'message',
          ]);

          const padding = 100;

          add([
            text(
                "In this demo you\ncan't buy anything on the market.\nBut do not worry!\nYou already own\nevery item 2 times.",
                48,
                { width: Math.round((1440 - padding * 2) / scaleDown) },
            ),
            pos(Math.round(150 / scaleDown), Math.round(300 / scaleDown)),
            origin('topleft'),
            color(1, 0, 0),
            origin('topleft'),
            'message',
          ]);

          stateMessage = false;
        } else {
          destroyAll('message');
          stateMessage = true;
        }
      }
      mouseClick(() => {
        if (!stateMessage) {

          destroyAll('message');
          wait(0.1, () => {
            stateMessage = true;
          });
        }
      });
    });
  });

  scene('club-house', () => {
    let dreamySound;
    wait(0.2, () => {
      dreamySound = play('dreamy', {
        volume: 0.1,
        speed: 1.0,
        loop: true,
        seek: 27,
      });
    });
    add([
      sprite('club-house-inside'),
      origin('topleft'),
    ]);
    const rectangleC = add([
      rect(300 / scaleDown, 375 / scaleDown),
      pos(Math.round(230 / scaleDown), Math.round(200 / scaleDown)),
      color(0, 0, 0, 0),
      origin('topleft'),
    ]);
    const rectangleC2 = add([
      rect(300 / scaleDown, 125 / scaleDown),
      pos(Math.round(230 / scaleDown), Math.round(575 / scaleDown)),
      color(0, 0, 0, 0),
      origin('topleft'),
    ]);

    const exitButton = add([
      rect(200 / scaleDown, 70 / scaleDown),
      pos(Math.round(1095 / scaleDown), Math.round(849 / scaleDown)),
      color(1, 0, 0),
      origin('topleft'),
    ]);

    add([
      text('Exit', Math.round(48 / scaleDown)),
      pos(Math.round(1100 / scaleDown), Math.round(865 / scaleDown)),
      color(0, 0, 0),
      origin('topleft'),
    ]);

    exitButton.action(() => {
      if (exitButton.isClicked()) {
        dreamySound.stop();
        go('city');
      }
    });

    var stateMessage = true;
    var stateMessage2 = true;
    rectangleC2.action(() => {
      if (rectangleC2.isClicked()) {
        if (stateMessage2) {
          const message2 = add([
            rect(1440 / scaleDown, 1024 / scaleDown),
            pos(0 / scaleDown, 0 / scaleDown),
            color(rgba(0, 0, 0, 0.8)),
            origin('topleft'),
            'message2',
          ]);

          const padding = 100;

          add([
            text('Janusan Lingeswaran,\nProject Manager, Lead Developer\n\n' +
                'Philipp Kant,\nDeveloper\n\n' +
                'Radhhicka Kishorpouria,\nDesigner\n\n' +
                'Mahamad Patol,\nDeveloper\n\n\n\nWe hope you like the demo. :-)', 16, {
              width: Math.round((1440 - padding * 2) / scaleDown),
            }),
            pos(Math.round(150 / scaleDown), Math.round(300 / scaleDown)),
            origin('topleft'),
            color(255, 255, 255),
            origin('topleft'),
            'message2',
          ]);

          stateMessage2 = false;
        } else {
          destroyAll('message2');
          stateMessage2 = true;
        }
      }
      mouseClick(() => {
        if (!stateMessage2) {
          destroyAll('message2');
          wait(0.1, () => {
            stateMessage2 = true;
          });
        }
      });
    });

    rectangleC.action(() => {
      if (rectangleC.isClicked()) {
        if (stateMessage) {
          const message = add([
            rect(1440 / scaleDown, 1024 / scaleDown),
            pos(0 / scaleDown, 0 / scaleDown),
            color(rgba(0, 0, 0, 0.8)),
            origin('topleft'),
            'message',
          ]);

          const padding = 100;

          add([
            text('This function is\nlocked in this\ndemo.', 48, {
              width: Math.round((1440 - padding * 2) / scaleDown),
            }),
            pos(Math.round(150 / scaleDown), Math.round(300 / scaleDown)),
            origin('topleft'),
            color(255, 0, 0),
            origin('topleft'),
            'message',
          ]);

          stateMessage = false;
        } else {
          destroyAll('message');
          stateMessage = true;
        }
      }
      mouseClick(() => {
        if (!stateMessage) {
          destroyAll('message');
          wait(0.1, () => {
            stateMessage = true;
          });
        }
      });
    });
  });

  scene('elevator-animation', (from) => {
    add([
      sprite('elevator-up'),
      origin('topleft'),
    ]);
    play('elevator3', {
      volume: 2.0,
      speed: 1.0,
    });

    wait(2, () => {
      if (from == 'city') {
        go('elevator');
      } else if (from == 'elevator') {
        go('city');
      }
    });
  });

  scene('elevator-animation2', (from, player, whichPlayer) => {
    add([
      sprite('elevator-down'),
      origin('topleft'),
    ]);

    play('elevator6', {
      volume: 1.0,
      speed: 1.0,
    });

    wait(2, () => {
      if (from == 'room') {
        go('elevator', player, whichPlayer);
      } else if (from == 'elevator') {
        go('room', player, whichPlayer);
      }
    });
  });

  scene('elevator', () => {
    add([sprite('elevator-inside'), origin('topleft')]);

    const elevatorMusic = play('elevator5', {
      volume: 0.3,
      loop: true,
    });

    const exitButton = add([
      sprite('bell-button'),
      pos(Math.round((237 + 342 * 1) / scaleDown), Math.round((241 + 91 * 5) / scaleDown)),
      origin('topleft'),
    ]);

    exitButton.action(() => {
      if (exitButton.isClicked()) {
        play('elevator4', {
          volume: 1.0,
          speed: 1.0,
        });
        wait(1, () => {
          elevatorMusic.stop();
          go('elevator-animation', 'elevator');
        });
      }
    });

    add([
      text('Exit', Math.round(14 / scaleDown)),
      pos(Math.round((237 + 342 * 1 + 90) / scaleDown), Math.round((241 + 91 * 5 + 22) / scaleDown)),
      color(255, 0, 0),
      origin('topleft'),
    ]);

    var x = 237;
    var y = 241;
    var row = 0;

    for (var i = 0; i < userData['students'].length; i++) {
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


      add([
        sprite('bell-button'),
        pos(Math.round((x + (i % 3) * 342) / scaleDown), Math.round((y + row * 91) / scaleDown)),
        origin('topleft'),
        i.toString(),
      ]);

      const player = userData['students'][i];
      const whichPlayer = i;
      action(i.toString(), (b) => {
        if (b.isClicked()) {
          play('elevator4', {
            volume: 1.0,
            speed: 1.0,
          });
          wait(1, () => {
            elevatorMusic.stop();
            go('elevator-animation2', 'elevator', player, whichPlayer);
          });
        }
      });

      var xname = Math.round((x + (i % 3) * 342 + 87) / scaleDown);
      var yname = Math.round((y + row * 91 + 24) / scaleDown);

      add([
        text(userData['students'][i].name, 11),
        pos(xname, yname),
        color(0, 0, 0),
        origin('topleft'),
      ]);
    }
  });

  scene('room', (player, whichPlayer) => {
    layers(['bg', 'obj', 'ui'], 'obj');

    let dreamySound;
    wait(0.8, () => {
      dreamySound = play('dreamy', {
        volume: 0.1,
        speed: 1.0,
        loop: true,
        seek: 27,
      });
    });

    add([
      sprite('floor'),
      origin('topleft'),
    ]);

    const shiftx = 160;
    const shifty = 6;

    const title = add([
      text(userData['students'][whichPlayer].name, 36, { width: 10 },),
      layer('ui'),
      pos( 760 + shiftx, -34 + shifty),
    ]);
    

    const board = add([
      sprite('board'),
      pos(372*1.5 + shiftx + 19, 46*1.5 + shifty - 60),
      scale(0.065),
      layer('ui'),
    ]);

    function add_badges() {
      player = userData['students'][whichPlayer];
      add([
        text(player['name'] + ' (Badges)', 23),
        layer('ui'),
        pos(128*1.5 + shiftx, 58*1.5 + shifty),
        'name',
      ]);
      if (player['badges'].length == 0) {
        add([
          text(
              'You can do it!! Lets do some challenges to earn some badges',
              15,
              { width: 300 },
          ),
          color(rgb(1, 0, 0)),
          layer('ui'),
          pos(100, 100),
          'name',
        ]);
      } else {
        var px = 40 + shiftx;
        var py = 125 + shifty;

        player['badges'].forEach((element) => {
          add([sprite(element), pos(px, py), layer('ui'), scale(0.25*1.5), 'badge']);
          if (px < 390*1.5 + shiftx + 19) {
            px += 40*2 + 19;
          } else {
            py += 50*1.5;
            px = 40 + shiftx + 19;
          }
        });
      }
    }

    board.action(() => {
      if (board.isClicked()) {
        if (board.scale.x == 0.065) {
          board.scale.x = 0.577;
          board.scale.y = 0.577;
          board.pos = vec2(0 + shiftx + 19, 60 + shifty);
          add_badges();
        } else {
          board.scale.x = 0.065;
          board.scale.y = 0.065;
          board.pos = vec2(372*1.5 + shiftx + 19, 46*1.5 + shifty - 60);
          every('badge', (obj) => {
            destroy(obj);
          });
          every('name', (obj) => {
            destroy(obj);
          });
        }
      }
    });

    const MOVE_SPEED = 250;

    // 20 by 20 map
    const sizeOfMap = 20;
    const map = player['map'];

    var posItems = {
      width: 72*1.5,
      height: 72*1.5,
      pos: vec2(shiftx, shifty),
      r: [sprite('right-wall'), solid(), 'wall', scale(2.25)],
      l: [sprite('left-wall'), solid(), 'wall', scale(2.25)],
      d: [sprite('door'), solid(), 'door', scale(2.25)],
      b: [sprite('bottom-wall'), solid(), 'wall', scale(2.25)],
      t: [sprite('top-wall'), solid(), 'wall', scale(2.25)],
      p: [sprite('top-right-wall'), solid(), 'wall', scale(2.25)],
      z: [sprite('bottom-left-wall'), solid(), 'wall', scale(2.25)],
      a: [sprite('top-left-wall'), solid(), 'wall', scale(2.25)],
      x: [sprite('bottom-right-wall'), solid(), 'wall', scale(2.25)],
    };
    for (var i = 0; i < userData['items'].length; i++) {
      var item = userData['items'][i];
      if (item['type'] == 'furniture') {
        if ('scale' in item)
          posItems[item['let']] = [
            sprite(item['src'].substr(0, item['src'].length - 4)),
            scale(item['scale']),
            item['kind'],
          ];
        else
          posItems[item['let']] = [
            sprite(item['src'].substr(0, item['src'].length - 4)),
            solid(),
            item['kind'],
          ];
        if (item['solid'])
          posItems[item['let']].push(solid());

      }
    }

    addLevel(map, posItems);

    const person = add([
      sprite('char'),
      pos(250 + shiftx, 120 + shifty),
      scale(1.0),
    ]);

    keyPressRep('left', () => {
      person.move(-MOVE_SPEED, 0);
    });
    keyPressRep('right', () => {
      person.move(MOVE_SPEED, 0);
    });
    keyPressRep('up', () => {
      person.move(0, -MOVE_SPEED);
    });
    keyPressRep('down', () => {
      person.move(0, MOVE_SPEED);
    });
    person.action(() => {
      person.resolve();
    });

    person.collides('door', () => {
      dreamySound.stop();
      play('door', {
        volume: 1.0,
        speed: 1.0,
      });
      wait(0.5, () => {
        go('elevator-animation2', 'room', player);
      });
    });

    var door = add([
      rect(Math.round(140 / scaleDown), Math.round(140 / scaleDown)),
      pos(Math.round(505 / scaleDown), Math.round(17 / scaleDown)),
      color(rgba(0,0,0,0)),
      origin('topleft'),
    ]);
    door.action(() => {
      if (door.isClicked()) {
        dreamySound.stop();
        play('door', {
          volume: 1.0,
          speed: 1.0,
        });
        wait(0.5, () => {
          go('elevator-animation2', 'room', player);
        });
      }
    });
    const allObjs = get('char');
  });

  start('loading-screen');
}

main();
