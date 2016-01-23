displaySystem.registerModule({
    name: 'vpaint',
    template: multiline(function() {/*
        <canvas id="vpaint" width="1500" height="800"></canvas>
    */}),
    style: multiline(function() {/*

        #vpaint {
            margin: 20px auto;
            display: block;
            border: 5px solid #E8E8E8;
            z-index: 100;
            opacity: 1;
            transition: opacity 0.3s;
        }
        #vpaint.hidden {
            opacity: 0;
        }
    */}),
    factory: function(config, onMessage, sendMessage) {
        var el;
        var visible = false;
        var ctx;
        var system = displaySystem;


        function getElement() {
            return document.getElementById('vpaint');
        }
        function show() {
            visible = true;
            getElement().classList.remove('hidden');
        }
        function hide() {
            visible = false;
            getElement().classList.add('hidden');
        }
        function draw(x, y, type) {
            console.log('draw');
            if (type === "dragstart") {
                ctx.beginPath();
                return ctx.moveTo(x, y);
            } else if (type === "drag") {
                ctx.lineTo(x, y);
                return ctx.stroke();
            } else {
                return ctx.closePath();
            }
        }
        function init(){
            console.log("init");
            ctx = getElement().getContext("2d");
            console.log(ctx);
            ctx.fillStyle = "solid";
            ctx.strokeStyle = "#ECD018";
            ctx.lineWidth = 5;
            ctx.lineCap = "round";

            $(getElement()).on('drag dragstart dragend', function(e){

                var offset, type, x, y;
                type = e.handleObj.type;
                //console.log(e);
                offset = $('#vpaint').offset();
                
                x = e.pageX - offset.left;
                y = e.pageY - offset.top;

                draw(x, y, type);
                data = {
                    'x': x,
                    'y': y,
                    'type': type
                };
                system.ws.sendMessage({name:'vpaint'}, 'draw', data)
            });
        }

        onMessage('draw', function(msg) {
            // need check on socket to prevent double draw
            console.log('external draw');
            if (msg && msg.data) {
                draw(msg.data.x, msg.data.y, msg.data.type);
            }
        });

        if (config.visible) {
            show();
            console.log("show thing");
        }

        init();

        return {
            init: init,
            show: show,
            hide: hide,
            draw: draw
        };
    }
});