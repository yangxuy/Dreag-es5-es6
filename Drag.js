(function () {
    function Drag() {
        this.disX = 0;
        this.disY = 0;
        this.odiv=null;
    }
    Drag.prototype = {
        init: function (id) {
            var self = this;
            this.odiv = document.getElementById(id);
            this.odiv.onmousedown = function (ev) {
                self.fndown(ev)
            };
            return false
        },
        fndown: function (ev) {
            var self = this;
            var oevent = ev || event;
            this.disX = oevent.clientX - this.odiv.offsetLeft;
            this.disY = oevent.clientY - this.odiv.offsetTop;
            document.onmousemove = function (ev) {
                self.fnmove(ev)
            };
            document.onmouseup = function (ev) {
                self.fnup(ev)
            };
            return false
        },
        fnmove: function (ev) {
            var oevent = ev || event;
            var x=oevent.clientX - this.disX;
            var y=oevent.clientY - this.disY;
            this.odiv.style.left = x + 'px';
            this.odiv.style.top =  y+ 'px';
        },
        fnup: function () {
            document.onmousedown = null;
            document.onmousemove = null;
        }
    };
    window.Drag=new Drag();
})();