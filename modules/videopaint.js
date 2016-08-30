displaySystem.registerModule({
    name: 'videopaint',
    template: multiline(function() {/*
        <ul id="videopainttools" class="hidden">
            <li><a href="#">Tools</a>
            <ul class="videotoolspalet">
                <li><a href="#" id="videotools_clear">clear</a></li>
                <li><a href="#" id="videotools_yellow">yellow</a></li>
                <li><a href="#" id="videotools_red">red</a></li>
            </ul></li>
        </ul>
        <canvas id="videopaint"></canvas>
    */}),
    style: multiline(function() {/*

        #videopaint {
            margin: 20px auto;
            display: block;
            border: 5px solid #E8E8E8;
            z-index: 100;
            opacity: 1;
            transition: opacity 0.3s;
        }
        #videopaint.hidden {
            opacity: 0;
        }
        #videopainttools {
            position: absolute;
            bottom: 0.5em;
            right: 0.5em;
            color: white;
            font-size: 24px;
        }
    */}),
    factory: function(config, onMessage, sendMessage) {
        var el;
        var visible = false;
        var local = false;
        var ctx;
        var system = displaySystem;


        function getElement() {
            return document.getElementById('videopaint');
        }
        function getTools(){
            return document.getElementById('videopainttools');
        }
        function setLocal() {
            if (system.ws){
                local = true;
                console.log("There is a network, so non local operation")
            } else {
                local = false;
            }
        }
        function show() {
            visible = true;
            getElement().classList.remove('hidden');
            getTools().classList.remove('hidden');
            addEvents();
        }
        function hide() {
            visible = false;
            getElement().classList.add('hidden');
            getTools().classList.add('hidden');
            removeEvents();
        }
        function addEvents(){
            $(getElement()).on('drag dragstart dragend', dragEvent);
        }
        function removeEvents(){
            $(getElement()).off('drag dragstart dragend', dragEvent);
        }
        function draw(x, y, type) {
            console.log('draw');
            if (type === "dragstart") {
                ctx.beginPath();
                return ctx.moveTo(x, y);
            } else if (type === "drag") {
                ctx.lineTo(x, y);
                return ctx.stroke();
            } else if (type === "dragend"){
                return ctx.closePath();
            } else if (type === "clearcanvas"){
                ctx.clearRect(0,0, getElement().width, getElement().height); // todo canvas size issues
            } else if (type === "setbrushyellow") {
                ctx.fillStyle = "solid";
                ctx.strokeStyle = "#ECD018";
                ctx.lineWidth = 5;
                ctx.lineCap = "round"; 
            } else if (type === "setbrushred") {
                ctx.fillStyle = "solid";
                ctx.strokeStyle = "#DC143C";
                ctx.lineWidth = 5;
                ctx.lineCap = "round"; 
            } else {
                return ctx.closePath();
            }
        }
        function clearCanvas(){
            console.log("clear Canvas");
            if (local){
                draw(0,0, "clearcanvas");
            } else {
                data = {
                    'x': 0,
                    'y': 0,
                    'type': 'clearcanvas'
                };
                system.ws.sendMessage({name:'videopaint'}, 'draw', data)
            } 
        }
        function dragEvent(e){
            var offset, type, x, y;
            type = e.handleObj.type;
            //console.log(e);
            offset = $('#videopaint').offset();
            
            x = e.pageX - offset.left;
            y = e.pageY - offset.top;

            if (local){
                draw(x, y, type);
            } else {
                data = {
                    'x': x,
                    'y': y,
                    'type': type
                };
                system.ws.sendMessage({name:'videopaint'}, 'draw', data)
            }
        }
        function setBrushYellow(){
            console.log("set Brush to Yellow");
            if (local){
                draw(0,0, "setbrushyellow");
            } else {
                data = {
                    'x': 0,
                    'y': 0,
                    'type': 'setbrushyellow'
                };
                system.ws.sendMessage({name:'videopaint'}, 'draw', data)
            } 
        }
        function setBrushRed(){
            console.log("set Brush to Red");
            if (local){
                draw(0,0, "setbrushred");
            } else {
                data = {
                    'x': 0,
                    'y': 0,
                    'type': 'setbrushred'
                };
                system.ws.sendMessage({name:'videopaint'}, 'draw', data)
            } 
        }
        function init(){
            console.log("init videopaint");
            setLocal();
            var c = getElement();
            c.width = window.innerWidth * 0.9;
            c.height = window.innerHeight * 0.75;

            ctx = c.getContext("2d");

            draw(0,0, "setbrushyellow");

            $('#videotools_clear').click(clearCanvas);
            $('#videotools_yellow').click(setBrushYellow);
            $('#videotools_red').click(setBrushRed);

        }

        onMessage('draw', function(msg) {
            //console.log('external draw');
            if (msg && msg.data) {
                draw(msg.data.x, msg.data.y, msg.data.type);
            }
        });

        if (config.visible) {
            show();
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