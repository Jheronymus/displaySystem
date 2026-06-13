displaySystem.config({
    //websocket host to listen to
    wsHost: "localhost:13900/",
    //host to listen to in case of a secure connection
    wssHost: "localhost.daplie.com:13900/",
    //specify the node that is being subscribed to when using mserver
    mserverNode: "default",
    //modules, order determines z stacking
    modules: {
        'background': {
            // visible: false
            color: 'black',
            //optional chromakey background color
            // color: "lime",
        },
        'camera': {
            // visible: true,
            // audio: true,
        },
        'gallery': {
            visible: true,
            transition: 'fade',
            size: 'cover',
            timeout: 8,
            images: [
                'http://picsum.photos/id/43/1920/1080',
                'http://picsum.photos/id/65/1920/1080',
                'http://picsum.photos/id/179/1920/1080',
                'http://picsum.photos/id/223/1920/1080'
            ],
            pages: [
                // 'http://www.fll-tools.com/'
            ],
        },
        'clock': {
            visible: true,
            // countdown: 20,
        },
        'time': {
            visible: true,
            // format: "MM:ss",
        },
        'twitter': {
            // visible: true,
            // speed: 500,
        },
        'lowThird': {
            visible: true,
            line1: '❤️ press \'C\'',
            line2: 'to show the control window',
        },
        'list': {
            // visible: true,
            header: 'results round 1',
            data: [
                ['🇳🇱 just try',1],
                ['🇳🇱 to copy',2],
                ['🇪🇬 and paste',3],
                ['🇪🇬 some cells',4],
                ['🇪🇬 from excel',5],
                ['🇺🇸 into the control',6],
                ['🇺🇸 window! You\'ll be',7],
                ['🇺🇸 amazed!',8],
                ['🇳🇱 It even has',8],
                ['🇳🇱 automatic',8],
                ['🇳🇱 paging',8],
            ],
            timer: 5000,
            lines: 8
        },
        'table': {
            // visible: true,
            header: ['team name', 'number', 'score 1', 'score 2'],
            data: [
                ['yuby',1, 100, 167],
                ['ahgf',2, 120, 198],
                ['butny',3, 10, 387],
                ['batey',4, 140, 243],
                ['meroy',5, 101, 543],
                ['marnc',6, 123, 198],
                ['arben',7, 189, 123],
                ['opic',8, 203, 431],
                ['poner',9, 403, 142],
                ['notar',10, 257, 289],
                ['serminc',11, 143, 365],
            ],
            timer: 10000,
            lines: 8
        },        
        'sprite': {
            visible: true,
            sprites: [{
                width: '14em',
                top: '1vh',
                left: '5em',
                textAlign: 'center',
                class: 'spritetext primary exitleft',
                html: 'Master Builder'
            },{
                width: '10em',
                top: '12vh',
                left: '7em',
                textAlign: 'center',
                class: 'spritetext standout exitright',
                html: 'FIRST LEGO League'
            },{
                width: '10em',
                top: '24vh',
                left: '7em',
                textAlign: 'center',
                class: 'spritetext primary exitleft',
                html: 'Scoring software'
            },{
                width: '10em',
                top: '36vh',
                left: '7em',
                textAlign: 'center',
                class: 'spritetext secondary exitright',
                html: 'Display system'
            },{
                width: '6em',
                top: '70vh',
                right: '-1em',
                padding: '0.2em 1em 0.2em 0em',
                class: 'spriteimage primary exitright',
                html: '<img class="medium" src="themes/rednblue-plus/img/FIRSTLego_iconHorz_RGB.png"></img>'
            },{
                width: '18em',
                top: '68vh',
                left: '2em',
                fontSize: '4vh',
                textAlign: 'left',
                padding: '0.2em 1.2em',
                class: 'spritetext secondary exitleft',
                html: 'Dean L. Kamen (born April 5, 1951) is an American engineer, inventor, and businessman. He is best known for his invention of the Segway, as well as founding FIRST with Woodie Flowers.'
            },{
                width: '8em',
                top: '61vh',
                left: '7em',
                fontSize: '6vh',
                textAlign: 'center',
                class: 'spritetext primary exitleft',
                html: 'Dean L. Kamen'
            },]
        },
        'css': {
            href: [
                'themes/rednblue-plus/rednblue-plus.css',
                // 'themes/rednblue-plus/rednblue-plus-mod-rtl.css',
                // 'themes/rednblue-plus/rednblue-plus-mod-opaque.css'
            ],
            // href: [
            //     'themes/rednblue/rednblue.css',
            //     // 'themes/rednblue/rednblue-mod-rtl.css'
            // ],
            // href: 'themes/default/default.css',
            // gist: '9c7e4efaba9dbbc4831b'
        },
        'geometry': {
            zoom: 1,
            aspect: 'native',
            rotation: 0,
            overscan: [0,0,0,0]
        },
        'keybindings': {
            'q': 'time.show()',
            'a': 'time.hide()',
            'w': 'clock.show()',
            's': 'clock.hide()',
            'e': 'lowThird.show()',
            'd': 'lowThird.hide()',
            'r': 'twitter.show()',
            'f': 'twitter.hide()',
            't': 'list.show()',
            'g': 'list.hide()',
            'y': 'table.show()',
            'h': 'table.hide()',
            'c': 'controls.open()',
            // 'c': function() {
            //     window.open('controls.html','fllDisplayControlWindow','resize=yes,width=800,height=350');
            // }
        },
        'controls': {
            //url: <your own control window>
        },
        'emojione': {
            // displays emoji characters
            selector: '.line1, .list-cell, .tweet'
        },
        'macro': {
            'magic':[
                'lowThird.hide()',
                'twitter.hide()',
                'time.hide()',
                'clock.hide()',
                'macro.wait(0.3)',
                'lowThird.show()',
                'time.show()',
                'clock.show()',
                'macro.showList()'
            ],
            'showList':[
                'macro.wait(2)',
                'lowThird.hide()',
                'list.show()'
            ]
        }
    },
    //path to the modules, can even be a full url
    modulePath: "modules"
});
