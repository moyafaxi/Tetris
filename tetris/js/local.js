define(['game'], function(game){
    　　　　var Local = function(){
                //游戏对象
                var oGame;
                //定时器
                var timer = null;
                //事件间隔
                var TNTERVAL = 500;
                //事件
                var time = 0;
                //计数
                var count = 0;
                //绑定键盘事件
                var bindKeyEvent = function(){
                    document.onkeydown = function(e){
                      if(e.keyCode == 38){//up
                        oGame.rotate();    
                      }else if(e.keyCode == 39){//right
                        oGame.right();
                      }else if(e.keyCode == 40){//down
                        oGame.down();
                      }else if(e.keyCode == 37){//left
                        oGame.left();
                      }else if(e.keyCode == 32){//space
                        oGame.fall();
                      }
                    }
                }
                //移动
                var move = function(){
                    count++;
                    if(count==2){
                        time++;
                        count=0;
                    }
                    oGame.setTime(time);
                    if(!oGame.down()){
                       oGame.checkClear();
                       oGame.fixed();
                       var line = oGame.checkClear();
                       console.log(line);
                       if(line){
                           oGame.addScore(line);
                       }
                       
                       if(oGame.checkGameOver()){
                           stop();
                       }else{
                           oGame.performNext(generateType(),generateDir())
                       }
  
                    }
                }
                //形成随机方块类型
                var generateType = function(){
                    return Math.floor(Math.random()*6+1);
                }
                //形成随机方块旋转次数
                var generateDir = function(){
                    return Math.floor(Math.random()*4+1);
                }
                //开始
                var start = function(){
                    var doms = {
                        gameDiv:document.getElementById('game'),
                        nextDiv:document.getElementById('next'),
                        timeDiv:document.getElementById('time'),
                        scoreDiv:document.getElementById('score')
                    }
                    oGame = new game.Game();
                    oGame.init(doms,generateType(),generateDir());
                    bindKeyEvent();
                    oGame.performNext(generateType(),generateDir());
                    timer = setInterval(move,TNTERVAL)
                }
                //结束
                var stop = function(){
                    clearInterval(timer);
                 }
                this.start=start
            }
    　　　　return {
                local : Local
    　　　　};
    　　});