// 创建动画 animate 让小鸟动 背景动 还有蚊子




var bird = {
    skyPosition: 0,
    skyStep: 2,
    birdTop: 220,
    birdStepY: 0,
    startColor: "blue",
    suo: false,
    minTop: 0,
    maxTOP: 570,
    init: function() {
        this.initData();
        this.animate();
        this.handle();
    },
    // 初始化数据 initData
    initData: function() {
        this.el = document.getElementById("game");
        this.obird = this.el.getElementsByClassName("bird")[0];
        this.ostart = document.getElementsByClassName("start")[0];
        this.oscore = this.el.getElementsByClassName("score")[0];
        this.oend = document.getElementsByClassName("end")[0];
        this.omark = document.getElementsByClassName("mark")[0];
    },
    animate: function() {
        var slef = this;
        var count = 0;
        this.timer = setInterval(function() {
            slef.skyMove();
            if (slef.suo) {
                slef.birdDrop();
            }

            if (++count % 10 === 0) {
                if (!slef.suo === "flase") {
                    slef.startBound();
                    slef.birdJump();
                }

                slef.birdFly(count);
            };
        }, 30)
    },
    skyMove: function() {
        this.skyPosition -= this.skyStep;
        this.el.style.backgroundPositionX = this.skyPosition + "px";
    },
    birdJump: function() {
        this.birdTop = this.birdTop == 220 ? 290 : 220
        this.obird.style.top = this.birdTop + "px";
    },

    birdFly: function(count) {
        this.obird.style.backgroundPositionX = count % 3 * -30 + "px";
    },
    // 小鸟往下落
    birdDrop: function() {
        this.birdTop += ++this.birdStepY;
        this.obird.style.top = this.birdTop + "px";
        this.judgeKnok();
    },
    startBound: function() {
        var prevtColor = this.startColor;
        this.startColor = prevtColor == 'blue' ? "white" : 'blue';
        this.ostart.classList.remove('start-' + prevtColor);
        this.ostart.classList.add('start-' + this.startColor)
            // this.ostart.className = this.ostart.className == "start start-blue" ? "start start-white" : "start start-blue";
    },
    judgeKnok: function() {
        this.judgeBoundary();
        this.judgePipe();

    },
    // 进行碰撞检测
    judgeBoundary: function() {
        if (this.birdTop < this.minTop || this.birdTop > this.maxTOP) {
            this.failGame();
        }
    },
    judgePipe: function() {},

    handle: function() {
        this.handleStart()
    },
    handleStart: function() {
        var slef = this;
        this.ostart.onclick = function() {
            this.style.display = "none";
            slef.oscore.style.display = "block";
            slef.obird.style.left = 80 + "px";
            slef.skyStep = 5;
            slef.suo = true;
        }
    },
    failGame: function() {
        clearInterval(this.timer);
        this.el.style.display = "block";
        this.oend.style.display = "block";
        this.omark.style.display = "block";
        this.obird.style.display = "none";
        this.oscore.style.display = "none";

    },
}
bird.init();
// starColor:blue