var textarea = document.getElementById("text");

//指令及说明
var commands;

//ajax获取json数据
$.ajax({
	url:"/js/commands_config.json",
	async:false, //必须同步，否则commands.js读取信息会出错
	success:(response)=>{
        commands = response;
	}
})

//存放历史指令
var historyCommands = new Array();

textarea.value += "Welcome to NuoyaLucas's command browser.You can type 'command all' to show all the commands.\n\n";

textarea.addEventListener("keyup",(event) => {
	if (event.key !== "Enter") {
		return;
	}
	else {
		//获取指令及参数
    	let input = textarea.value.split("\n");
    	let detailInput = /(\d{4}-\d{1,2}-\d{1,2} \d{1,2}:\d{1,2}) >\s?(.*)/.exec(input[input.length-2]);
    	let oldParm = detailInput[2].replace(/\s+/," ");
    	//将不必要的内容删掉
    	oldParm = oldParm.replace(/^\s+/,"");
    	oldParm = oldParm.replace(/;?$/,"");
    	oldParm = oldParm.replace(/\s+$/,"");
   		let parm = oldParm.split(" ");
   		let time = detailInput[1]
        pauseCommand(parm,time);
	}
});

//解析指令
function pauseCommand(parm,time) {
	if (parm[0] === "") {
		return;
	}
    else if (!(parm[0] in commands)) {
    	textarea.value += `command not found:${parm[0]}\n`;
    }
    else {
    	commands[parm[0]]["method"](parm);
    	//将指令加入历史指令中
    	if (parm[1] !== "clear") {
	    	oneHistory = time;
	    	for (var i=0;i<parm.length;i++) {
	    		oneHistory += " "+parm[i];
	    	}
	    	historyCommands.push(oneHistory);
	    }
    }
}

//显示时间
var newDate = function(){
	let myDate = new Date();
	let Y = myDate.getFullYear();
	let Mo = myDate.getMonth()+1;
	let D = myDate.getDate();
	let H = myDate.getHours();
	let Mi = myDate.getMinutes();
	let curDay = Y + '-'+ Mo + '-' + D +" " + H + ":" + Mi +" > ";
	textarea.value += curDay;
};
newDate();

//换行就显示时间
textarea.addEventListener("keyup",(event) => {
	if (event.key == "Enter") {
		newDate();
	}
});

//获取鼠标行数
function getMousePos() {
	let pos = textarea.selectionStart;
	let value = textarea.value;
	let lines = value.split("\n");
	let char = 0;
	for (var x=1;x<lines.length+1;x++) {
		for (var y=0;y<lines[x-1].length;y++) {
			if (char !== pos) {
				char++;
			}
			else {
				console.log(x)
				return x;
			}
		}
	}
}

