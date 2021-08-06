import * as stHa from '../storage_handler.js';


const scaleDown = 1.3333333333333333;

async function main() {
  // default choose first player
  await stHa.main();
  var userData = await stHa.getStorage();
  document.addEventListener("click", async function () {
    userData = await stHa.getStorage();
  });

  //console.log(userData['students']['0']);

  //player = userData['students']['0'];
  //console.log(player['map']);

  //   for (var i = 0; i < userData['students'].length; i++) {
  //     console.log(userData['students'][i]);
  //   }

  kaboom({
    global: true,
    //width: window.innerHeight <= window.innerWidth ? (window.innerHeight / 3) * 4 : window.innerWidth,
    //height: window.innerWidth <= window.innerHeight ? (window.innerWidth / 4) * 3 : window.innerHeight,
    root: document.getElementById('game'),
    width: 1080, //1440
    height: 768, //1024
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

  // loadSprite('elevator-sketch', '../img/elevator/elevator-sketch.png');
  // loadSprite('elevator-inside', '../img/elevator/elevator-inside.png');
  // loadSprite('bell-button', '../img/elevator/bell-button.png');

  // furniture
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

  // city
  // loadSprite('city-background', 'https://i.imgur.com/Tu3Qqzi.png');
  // loadSprite('apartment-building', 'https://i.imgur.com/tKRE5mO.png');
  // loadSprite('settings-building', 'https://i.imgur.com/iWlvTL2.png');
  // loadSprite('subject-building', 'https://i.imgur.com/oKq4WvC.png');
  // loadSprite('market', 'https://i.imgur.com/xsCx0QA.png');
  // loadSprite('club-house', 'https://i.imgur.com/VqVolZR.png');
  // loadSprite('city-image', 'https://i.imgur.com/FROeDHY.png');
  // loadSprite('market-inside', 'https://i.imgur.com/ZrvMVTZ.png');
  // loadSprite('club-house-inside', 'https://i.imgur.com/09wCp4G.png');

  // loadSprite('loading-screen', 'https://i.imgur.com/8n8c7fJ.png');
  // loadSprite('avatar1', 'https://i.imgur.com/zWJNFUn.png');
  // loadSprite('avatar2', 'https://i.imgur.com/9PU6ViJ.png');

  // // elevator
  // loadSprite('elevator-up', 'https://i.imgur.com/oLybhK4.png');
  // loadSprite('elevator-down', 'https://i.imgur.com/prk0prO.png');

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
  loadSprite('settings-inside', '../img/small/settings-inside.png');
  loadSprite('avatar1', '../img/small/avatar1.png');
  loadSprite('avatar2', '../img/small/avatar2.png');
  loadSprite('elevator-up', '../img/small/elevator-up.png');
  loadSprite('elevator-down', '../img/small/elevator-down.png');

  // sounds
  // loadSound("elevator-music", "sounds/539574__qd42__elevator-ding-at-arenco-tower-dubai.wav");

  loadSound('elevator1', '../sounds/55837_644651-lq.mp3');
  loadSound('elevator2', '../sounds/539574_3775755-lq.mp3');
  loadSound('elevator3', '../sounds/403188_7813079-lq.mp3');
  loadSound('elevator4', '../sounds/331205_2792951-lq.mp3');
  loadSound('elevator5', '../sounds/467243_6300624-lq.mp3');
  loadSound('elevator6', '../sounds/482096_8253036-lq.mp3');
  loadSound('door', '../sounds/214001_3635427-lq.mp3');
  loadSound('city-sound', '../sounds/366304_5950368-lq.mp3');

  // loadSound(
  //   'elevator1',
  //   'https://freesound.org/data/previews/55/55837_644651-lq.mp3',
  // );

  // loadSound(
  //   'elevator2',
  //   'https://freesound.org/data/previews/539/539574_3775755-lq.mp3',
  // );

  // loadSound(
  //   'elevator3',
  //   'https://freesound.org/data/previews/403/403188_7813079-lq.mp3',
  // );

  // loadSound(
  //   'elevator4',
  //   'https://freesound.org/data/previews/331/331205_2792951-lq.mp3',
  // );

  // loadSound(
  //   'elevator5',
  //   'https://freesound.org/data/previews/467/467243_6300624-lq.mp3',
  // );

  // loadSound(
  //   'elevator6',
  //   'https://freesound.org/data/previews/482/482096_8253036-lq.mp3',
  // );

  // loadSound(
  //   'door',
  //   'https://freesound.org/data/previews/214/214001_3635427-lq.mp3',
  // );

  // loadSound(
  //   'city-sound',
  //   'https://freesound.org/data/previews/366/366304_5950368-lq.mp3',
  // );

  scene('loading-screen', () => {
    add([
      sprite('loading-screen'),
      //scale(width() / 240, height() / 240),
      origin('topleft'),
    ]);
    wait(0, () => {
      go('city');
    });
  });

  scene('city', () => {
    add([
      sprite('city-background'),
      //scale(width() / 240, height() / 240),
      origin('topleft'),
    ]);

    myfunc()


    const citySound = play('city-sound', {
      volume: 1.0,
      speed: 1.0,
      loop: true,
      seek: 27,
      //detune: 1200,
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
          //detune: 1200,
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

    const size = 1.0; // 0.9
    // var x = 1240;
    // var y = 737;
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
    add([
      sprite('settings-inside'),
      //scale(width() / 240, height() / 240),
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
      //scale(width() / 240, height() / 240),
      origin('topleft'),
    ]);

    // add(
    //   [rect(100, 100)],
    //   pos(950 / scaleDown, 950 / scaleDown),
    //   color(0, 0, 0),
    // );

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
      //scale(width() / 240, height() / 240),
      origin('topleft'),
    ]);

    exitButton.action(() => {
      if (exitButton.isClicked()) {
        go('settings-building');
      }
    });
  });

  scene('market', () => {
    const rectangle = add([
      rect(1200 / scaleDown, 600 / scaleDown),
      pos(Math.round(120 / scaleDown), Math.round(210 / scaleDown)),
      color(0, 0, 0),
      origin('topleft'),
    ]);

    add([
      sprite('market-inside'),
      //scale(width() / 240, height() / 240),
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
        go('city');
      }
    });
    var stateMessage = true;
    rectangle.action(() => {
      // console.log(board.pos)
      // console.log('Testtt');
      // console.log(message.scale);
      // console.log(scale(1).scale);
      if (rectangle.isClicked()) {
        if (stateMessage) {
          const message = add([
            rect(1440 / scaleDown, 1024 / scaleDown),
            pos(0 / scaleDown, 0 / scaleDown),
            color(rgba(0, 0, 0, 0.8)),
            origin('topleft'),
            'message',
            // scale(1),
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
          //stateMessage = true;
          destroyAll('message');
          wait(0.1, () => {
            stateMessage = true;
          });
        }
      });
    });
  });

  scene('club-house', () => {
    add([
      sprite('club-house-inside'),
      //scale(width() / 240, height() / 240),
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
            // scale(1),
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
          //stateMessage = true;
          destroyAll('message2');
          wait(0.1, () => {
            stateMessage2 = true;
          });
        }
      });
    });

    rectangleC.action(() => {
      // console.log(board.pos)
      // console.log('Testtt');
      // console.log(message.scale);
      // console.log(scale(1).scale);
      if (rectangleC.isClicked()) {
        if (stateMessage) {
          const message = add([
            rect(1440 / scaleDown, 1024 / scaleDown),
            pos(0 / scaleDown, 0 / scaleDown),
            color(rgba(0, 0, 0, 0.8)),
            origin('topleft'),
            'message',
            // scale(1),
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
          //stateMessage = true;
          destroyAll('message');
          wait(0.1, () => {
            stateMessage = true;
          });
        }
      });


      // if (mouseIsClicked()) {
      //   destroyAll('message');
      //   stateMessage = true;
      // }
    });
  });

  scene('elevator-animation', (from) => {
    add([
      sprite('elevator-up'),
      //scale(width() / 240, height() / 240),
      origin('topleft'),
    ]);
    play('elevator3', {
      volume: 1.0,
      speed: 1.0,
      //detune: 1200,
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
      //scale(width() / 240, height() / 240),
      origin('topleft'),
    ]);

    play('elevator6', {
      volume: 1.0,
      speed: 1.0,
      //detune: 1,
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
      volume: 0.1,
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
          //detune: 1,
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
      //pos(237, 241),
      //scale(width() / 240, height() / 240),
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

      // console.log(buttons);

      // console.log(userData['students'][i]);
      // buttons[i] = add([
      //   sprite('bell-button'),
      //   pos(x + (i % 3) * 342, y + row * 91),
      //   origin('topleft'),
      // ]);

      // player = userData['students'][i];
      // console.log(player);
      // // buttons[i].action(() => {
      // //   if (buttons[i].isClicked()) {
      // //     go('room', userData['students'][i]);
      // //   }
      // // });

      // add([
      //   text(userData['students'][i].name, 18),
      //   pos(x + (i % 3) * 342 + 90, y + row * 91 + 22),
      //   color(0, 0, 0),
      //   origin('topleft'),
      // ]);

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
            //detune: 1,
          });
          wait(1, () => {
            elevatorMusic.stop();
            go('elevator-animation2', 'elevator', player, whichPlayer);
          });
        }
      });

      var xname = Math.round((x + (i % 3) * 342 + 87) / scaleDown);
      var yname = Math.round((y + row * 91 + 24) / scaleDown);

      // xname +=
      //   (((12 - userData['students'][i].name.length) / (12 * 2)) * 150) /
      //   scaleDown;
      // console.log(userData['students'][i].name.length);

      add([
        text(userData['students'][i].name, 11),
        pos(xname, yname),
        color(0, 0, 0),
        origin('topleft'),
      ]);
    }
    //console.log(buttons);
  });

  scene('room', (player, whichPlayer) => {
    //console.log(player);
    //console.log(player['map']);
    layers(['bg', 'obj', 'ui'], 'obj');

    add([
      sprite('floor'),
      //scale(width() / 240, height() / 240),
      origin('topleft'),
    ]);

    // const shiftx = 300;
    // const shifty = 144;
    const shiftx = 160;
    const shifty = 6; // 48

    const title = add([
      text(userData['students'][whichPlayer].name, 36, { width: 10 },),
      layer('ui'),
      pos( 760 + shiftx, -34 + shifty),
      // pos(254 + shiftx, -40 + shifty),
    ]);
    

    const board = add([
      sprite('board'),
      pos(372*1.5 + shiftx + 19, 46*1.5 + shifty - 60),
      scale(0.065),
      layer('ui'),
    ]);

    function add_badges() {
      player = userData['students'][whichPlayer];
      console.log(whichPlayer)
      console.log(player['badges']);
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
          // py+=30
          if (px < 390*1.5 + shiftx + 19) {
            px += 40*2 + 19;
          } else {
            py += 50*1.5;
            px = 40 + shiftx + 19;
          }
          console.log(px);
        });
      }
    }

    board.action(() => {
      // console.log(board.pos)
      if (board.isClicked()) {
        if (board.scale.x == 0.065) {
          board.scale.x = 0.577;
          board.scale.y = 0.577;
          board.pos = vec2(0 + shiftx + 19, 60 + shifty);
          add_badges();
          console.log(board);
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
    console.log(map);
    console.log(player['name']);
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

    // console.log(map)
    // console.log(new Array(11).join(" "))

    // keyPress('left', () => {
    //   person.scale.x = -0.2*1.5;
    // });

    // keyPress('right', () => {
    //   person.scale.x = 0.2*1.5;
    // });
    const person = add([
      sprite('char'),
      pos(250 + shiftx, 120 + shifty),
      scale(1.0),
    ]);
    
    keyPressRep('left', () => {
      person.move(-MOVE_SPEED, 0);
      // person.scale.x = -0.2*1.5;
    });
    keyPressRep('right', () => {
      person.move(MOVE_SPEED, 0);
      // person.scale.x = 0.2*1.5;
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
      play('door', {
        volume: 1.0,
        speed: 1.0,
        //detune: 1200,
      });
      wait(0.5, () => {
        go('elevator-animation2', 'room', player);
      });
    });
    const allObjs = get('char');
    //console.log(allObjs);
  });

  start('loading-screen');
}

main();
