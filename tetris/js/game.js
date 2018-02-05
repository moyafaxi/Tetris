
define(['squareFactory'], function(squareFactory){
    　　　　var Game = function(){
                //dom元素
                var gameDiv;
                var nextDiv;
                var scoreDiv;
                //分数
                var score=0;
                //游戏矩阵
                var gameData=[
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                ];
                //当前方块
                var cur;
                //下一个方块
                var next;
            
            
                //divs
                var nextDivs = [];
                var gameDivs = [];
            
            
                //初始化div
                var initDiv = function(container,data,divs){
                    for(var i=0;i<data.length;i++){
                        var div = [];
                        for(var j=0;j<data[0].length;j++){
                            var newNode = document.createElement('div');
                            newNode.className = 'none';
                            newNode.style.top = (i*20)+'px';
                            newNode.style.left = (j*20)+'px';
                            container.appendChild(newNode);
                            div.push(newNode);
                        }
                        divs.push(div);
                    }
                }
            
            
                //刷新div
            
                var refreshDiv = function(data,divs){
                    for (var i=0;i<data.length;i++){
                        for(var j=0;j<data[0].length;j++){
                        if(data[i][j]==0){
                            divs[i][j].className = 'none'
                        }else if(data[i][j]==1){
                            divs[i][j].className = 'done'
                        }else if(data[i][j]==2){
                            divs[i][j].className = 'current'
                        }
                        }
                    }
                }
                //设置数据
                var setdata = function(){
                    for(var i=0;i<cur.data.length;i++){
                        for(var j=0;j<cur.data[0].length;j++){
                            if(check(cur.origin,i,j)){
                                gameData[cur.origin.x+i][cur.origin.y+j]=cur.data[i][j];
                            }
                        }
                    }
                }
                //监测点是否合法
                var check = function(posi,x,y){
                    if(posi.x+x<0){
                        return false;
                    }else if(posi.x+x >= gameData.length){
                        return false;
                    }else if(posi.y+y >= gameData[0].length){
                        return false;
                    }else if(posi.y+y < 0){
                        return false;
                    }else if(gameData[posi.x+x][posi.y+y]==1){
                        return false;
                    }else{
                        return true;
                    }
                }
                //检测数据是否合法
                var isValid = function(pos,data){
                    for(var i=0;i<data.length;i++){
                       for(var j=0;j<data[0].length;j++){
                           if(data[i][j] != 0){
                               if(!check(pos,i,j)){
                                   return false;
                               }
                           }
                       }
                    }
                    return true;
                }
                //清除数据
                var cleardata = function(){
                    for(var i=0;i<cur.data.length;i++){
                        for(var j=0;j<cur.data[0].length;j++){
                            if(check(cur.origin,i,j)){
                                gameData[cur.origin.x+i][cur.origin.y+j]=0;
                            } 
                        }
                    }
                    return true;
                }

                //旋转
                var rotate = function(){
                    if(cur.canRotate(isValid)){
                        cleardata();
                        cur.rotate();
                        setdata();
                        refreshDiv(gameData,gameDivs);
                    }
                }

                //下移
                var down = function(){
                    if(cur.canDown(isValid)){
                        cleardata();
                        cur.down();
                        setdata();
                        refreshDiv(gameData,gameDivs);
                        return true;
                    }else{
                        return false;
                    }
                }
                //左移
                var left = function(){
                    if(cur.canLeft(isValid)){
                        cleardata();
                        cur.left();
                        setdata();
                        refreshDiv(gameData,gameDivs);
                    }
                }
                //右移
                var right = function(){
                    if(cur.canRight(isValid)){
                        cleardata();
                        cur.right();
                        setdata();
                        refreshDiv(gameData,gameDivs);
                    }
                }
                
                //方块移动到底部固定
                var fixed = function(){
                    for(var i=0;i<cur.data.length;i++){
                        for(var j=0;j<cur.data[0].length;j++){
                            if(check(cur.origin,i,j)){
                                if(gameData[cur.origin.x+i][cur.origin.y+j]==2){
                                    gameData[cur.origin.x+i][cur.origin.y+j]=1
                                }
                            }
                        }
                    }
                    refreshDiv(gameData,gameDivs);
                }

                //使用下一个方块
                var performNext = function(index,dir){
                    cur = next;
                    setdata();
                    next = squareFactory.SquareFactory.make(index,dir);
                    refreshDiv(gameData,gameDivs);
                    refreshDiv(next.data,nextDivs);
                }
                //消行
                var checkClear = function(){
                    var line = 0;
                    for(var i=gameData.length-1;i>=0;i--){
                        var clear = true;
                        for(var j=0;j<gameData[0].length;j++){
                            if(gameData[i][j]!=1){
                                clear = false;
                                break;
                            }
                        }
                        if(clear){
                            line++;
                           for(var m=i;m>0;m--){
                               for(var n=0;n<gameData[0].length;n++){
                                  gameData[m][n] = gameData[m-1][n];
                               }
                           } 
                           for(var n=0;n<gameData[0].length;n++){
                               gameData[0][n]=0;
                           }
                           i++;
                        }
                    }
                    return line;
                }

                //判断游戏结束
                var checkGameOver = function(){
                    var gameover = false;
                    for(var i=0;i<gameData[0].length;i++){
                       if(gameData[1][i]==1){
                           gameover = true;

                       }
                    }
                    return gameover;
                }
                var setTime = function(time){
                    timeDiv.innerHTML=time;
                }

                //加分
                var addScore = function(line){
                    var s = 0;
                    switch(line){
                      case 1:
                        s=10;
                        break;
                      case 2:
                        s=30;
                        break;
                      case 3:
                        s=60;
                        break;
                      case 4:
                        s=100;
                        break;
                      case 5:
                        s=150;
                        break;
                      default:
                        break;
                    }
                    score=score+s;
                    console.log(score);
                    scoreDiv.innerHTML=score;
                }
                
                //初始化
                var init = function(doms,index,dir){
                gameDiv = doms.gameDiv;
                nextDiv = doms.nextDiv;
                timeDiv = doms.timeDiv;
                scoreDiv = doms.scoreDiv;
                next = squareFactory.SquareFactory.make(index,dir);
                initDiv(gameDiv,gameData,gameDivs);
                initDiv(nextDiv,next.data,nextDivs);
                refreshDiv(next.data,nextDivs);
                }
                this.init=init;
                this.down=down;
                this.left=left;
                this.right=right;
                this.rotate=rotate;
                this.fixed=fixed;
                this.performNext=performNext;
                this.checkClear=checkClear;
                this.checkGameOver=checkGameOver;
                this.setTime=setTime;
                this.addScore=addScore;
                this.fall=function(){while(down());}
            }
    　　　　return {
    　　　　　　Game : Game
    　　　　};
    　　});