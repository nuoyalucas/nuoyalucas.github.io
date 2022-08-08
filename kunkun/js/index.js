//实例化Vue对象
var game = new Vue(
    {
        el:"#game",
        data:{
            //坤坤背景图片
            square_list:[
                ["./src/img/bg.jpg","./src/img/bg.jpg","./src/img/bg.jpg","./src/img/bg.jpg"],
                ["./src/img/bg.jpg","./src/img/bg.jpg","./src/img/bg.jpg","./src/img/bg.jpg"],
                ["./src/img/bg.jpg","./src/img/bg.jpg","./src/img/bg.jpg","./src/img/bg.jpg"],
                ["./src/img/bg.jpg","./src/img/bg.jpg","./src/img/bg.jpg","./src/img/bg.jpg"],
                ["./src/img/bg.jpg","./src/img/bg.jpg","./src/img/bg.jpg","./src/img/bg.jpg"]
            ],
            index:3,
            //坤坤音乐
            chick_music:"./src/music/chick.mp3",
            ni_gan_ma:"./src/music/ni_gan_ma.mp3",
            chick_pretty:"./src/music/chick_pretty.mp3",
            num:20,
            text:``,
            head_text:`坤坤大挑战 看看你是否是真ikun`,
            show_text:false,
            if_not_start:true,
            is_end_game:false,
            //正则表达式
            kun_exp:/src\/img\/kun\.jpg/,
            bg_exp:/src\/img\/bg\.jpg/,
            chick_exp:/src\/img\/chick\.jpg/,
            //记录时间
            start_time:0,
            end_time:0
        },
        methods:{
            //游戏结束
            end_game:function(note){
                let text = document.getElementById("text");
                let btn = document.getElementById("btn");
                text.innerText = note;
                let yes = document.createElement("button");
                yes.innerHTML = "是";
                yes.style = "position:absolute;left:0;";
                yes.onclick = function(){location.reload();};
                let no = document.createElement("button");
                no.innerHTML = "否";
                no.style = "position:absolute;right:0;";
                no.onclick = this.quit_game;
                btn.appendChild(yes);
                btn.appendChild(no);
            },
            //点击图片
            click_img:function(ele_id){
                let ele = document.getElementById(ele_id);
                let mp3; //音频对象
                //游戏结束了还在点
                if (this.is_end_game){
                    alert("游戏已结束");
                    return 0;
                }
                //点对了
                if (this.kun_exp.test(ele.src) && ele_id[0] == 3){
                    this.square_list[Number(ele_id[0])][Number(ele_id[1])] = "./src/img/chick.jpg";
                    mp3 = new Audio(this.chick_music);
                    mp3.play();
                    this.num--;
                    this.change_text();
                    this.change_pos();
                    //通关
                    if (this.num === 0){
                        this.end_time = new Date().getTime();
                        this.is_end_game = true;
                        document.getElementById("square").innerHTML = `
                            <img src="./src/img/ji_tai_mei.gif" style="width:400px;height:400px">
                        `;
                        mp3=new Audio(this.chick_pretty);
                        mp3.play();
                        this.end_game(`恭喜你，通关了，用时${(this.end_time-this.start_time)/1000}秒，是否再来一次？`);
                    }
                }
                //点到了空白
                else if(this.bg_exp.test(ele.src)) {
                    this.is_end_game = true;
                    ele.src = "./src/img/ni_gan_ma.jpg";
                    mp3 = new Audio(this.ni_gan_ma);
                    mp3.play();
                    this.end_game("很遗憾，挑战失败，是否再来一次？");
                }
                //点到了鸡
                else if(this.chick_exp.test(ele.src)){
                    alert("要点坤坤，不是鸡")
                }
                //点的不是第4排的坤坤
                else if(ele_id[0] != 3){
                    alert("从下往上点坤坤");
                }
            },
            //变换位置
            change_pos:function(){
                this.square_list.pop();
                let push_list = ["./src/img/bg.jpg","./src/img/bg.jpg","./src/img/bg.jpg","./src/img/bg.jpg"];
                push_list[Math.floor(Math.random() * 4)] = "./src/img/kun.jpg";
                this.square_list.unshift(push_list);
            },
            //开始游戏
            start_game:function(){
                let value =  document.getElementById("time").value;
                //检查输入是否符合规则
                if (/^\d+$/.test(value)){
                    this.num = value;
                }
                else{
                    alert("只能输入数字");
                    return 0;
                };
                this.show_text = true;
                this.if_not_start = false;
                this.start_time = new Date().getTime();
            },
            //退出游戏
            quit_game:function(){
                location.href = "about:blank";
            },
            //显示文字
            change_text:function(){
                this.text = `还剩${this.num}只鸡`;
            }
        }
    }
)
 
//外部初始化接口
function init(){
    for (var x = 0 ; x < 4 ; x++){
        //Vue对象参数中data里的属性会成为该对象的属性
        game.square_list[x][Math.floor(Math.random() * 4)] = "./src/img/kun.jpg";
    }
}
init();