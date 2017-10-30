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
        fnup: function () {
            document.onmousedown = null;
            document.onmousemove = null;
        }
    };
    function LimitDrag() {
        Drag.call(this)
    }
    for ( var i in Drag.prototype){
        LimitDrag.prototype[i]=Drag.prototype[i]
    }
    LimitDrag.prototype.fnmove=function (ev) {
        var oevent = ev || event;
        var x=oevent.clientX - this.disX;
        var y=oevent.clientY - this.disY;
        if(x<0){
            x=0
        }else if(x>document.documentElement.clientWidth- this.odiv.offsetWidth){
            x=document.documentElement.clientWidth- this.odiv.offsetWidth
        }
        if(y<0){
            y=0
        }else if(y>document.documentElement.clientHeight- this.odiv.offsetHeight){
            y=document.documentElement.clientHeight- this.odiv.offsetHeight
        }
        this.odiv.style.left = x + 'px';
        this.odiv.style.top =  y+ 'px';
    };
    window.LimitDrag=new LimitDrag()
})();
