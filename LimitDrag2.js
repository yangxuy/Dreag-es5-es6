(function () {
    class Drag {
        constructor(){
            this.disX = 0;
            this.disY = 0;
            this.odiv=null;
        }
        init(id) {
            let self = this;
            this.odiv = document.getElementById(id);
            this.odiv.onmousedown = function (ev) {
                self.fndown(ev)
            };
            return false
        }
        fndown(ev) {
            let self = this;
            let oevent = ev || event;
            this.disX = oevent.clientX - this.odiv.offsetLeft;
            this.disY = oevent.clientY - this.odiv.offsetTop;
            document.onmousemove = function (ev) {
                self.fnmove(ev)
            };
            document.onmouseup = function (ev) {
                self.fnup(ev)
            };
            return false
        }
        fnmove (ev) {
            let oevent = ev || event;
            let x=oevent.clientX - this.disX;
            let y=oevent.clientY - this.disY;
            this.odiv.style.left = x + 'px';
            this.odiv.style.top =  y+ 'px';
        }
        fnup() {
            document.onmousedown = null;
            document.onmousemove = null;
        }
    }
    class LimitDrag extends Drag{
        constructor(props){
            super(props)
        }
        fnmove (ev) {
            let oevent = ev || event;
            let x=oevent.clientX - this.disX;
            let y=oevent.clientY - this.disY;
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
    } 
    window.LimitDrag=new LimitDrag()
})();