var textarea = document.getElementById("text");

//指令及说明
var commands = {
	"bg":"a command that can show the background's image and set the background's image",
    "goto":"a command that can open a url",
    "command":"a command that can show the commands' detail",
    "history":"a command that can show all the commands that be used",
    "search":"a command that can search some thing on an appointed search engine",
    "download":"a command that can download a file"
}

//存放历史指令
var historyCommands = new Array();

textarea.value += "Welcome to NuoyaLucas's command browser.You can type 'command all' to show all the commands.\n\n";

textarea.addEventListener("keyup",(event) => {
	if (event.keyCode !== 13) {
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
    	switch(parm[0]) {
            //bg指令
    		case "bg": {
    			if (parm.length === 1) {
    		    	textarea.value += "The backgroung's image is: "+/url\(\"(.*?)\"\)/.exec($(textarea).css("backgroundImage"))[1]+"\n";
    		    }
    		    else {
    		    	$(textarea).css("backgroundImage",`url(${parm[1]})`);
    		    }
    		    break;
    		}
            //goto指令
    	    case "goto": {
    	    	if (parm.length === 1) {
    		    	textarea.value += `Where do you want to go?\n`;
    		    }
    		    else {
    		    	if (/^https?:\/\/.*/.test(parm[1])) {
    		    		window.open(parm[1]);
    		    	}
    		    	else {
    		    		window.open("https://"+parm[1]);
    		    	}
    		    }
    		    break;
    	    }
            //command 指令
            case "command": {
                if (parm.length === 1) {
                    textarea.value += `Please add a parameter !\n`;
                }
                else {
                    switch (parm[1]) {
                        case "all": {
                        	textarea.value += "----------------------------------------------------------------------------------------------------\n";
                            for (let detail in commands) {
                                textarea.value += `Command '${detail}': ${commands[detail]}\n`;
                            }
                            textarea.value += "----------------------------------------------------------------------------------------------------\n";
                            break;
                        }
                        default:
                            for (var x=1;x < parm.length;x++) {
                                textarea.value += (parm[x] in commands) ? `Command '${parm[x]}': ${commands[parm[x]]}\n` : `command not found: ${parm[x]}\n`;
                            }
                            break;
                    }
                }
                break;
            }
            //history指令
            case "history":{
            	//输出函数
            	function outHistory(len) {
            		textarea.value += "----------------------------------------------------------------------------------------------------\n";
	            	for (var index=0;index<len;index++) {
	            		textarea.value += historyCommands[index]+"\n";
	            	}
	            	textarea.value += "----------------------------------------------------------------------------------------------------\n";
            	}
            	//没有记录
            	if (historyCommands.length === 0) {
            		textarea.value += "There is no history\n";
            	}
            	//全部记录
            	else if (parm.length === 1) {
	            	outHistory(historyCommands.length);
                }
                //清空
                else if (parm[1] === "clear") {
                	historyCommands = [];
                	break;
                }
                //部分记录
                else if (parm[1] === "limit" && Number(parm[2] <= historyCommands.length)) {
                	outHistory(Number(parm[2]));
                }
                //单条记录
                else if (/\d+/.test(parm[1]) && Number(parm[1] <= historyCommands.length)){
                	textarea.value += "----------------------------------------------------------------------------------------------------\n";
                    textarea.value += historyCommands[Number(parm[1])-1]+"\n";
                    textarea.value += "----------------------------------------------------------------------------------------------------\n";
                }
                else {
                	textarea.value += `command not found: ${parm[1]}\n`;
                }
                break;
            }
            //search指令
            case "search": {
            	if (parm.length === 1) {
            		text.value += "What do you want to search?\n";
            		break;
            	}
            	else if (parm.length === 2) {
            		text.value += "You should choose a search engine in baidu,bing,github,zhihu,360\n";
            		break;
            	}
            	else {
            		switch(parm[2]) {
            			//百度
            			case "baidu":
            			    window.open(`https://www.baidu.com/s?ie=utf-8&f=8&rsv_bp=1&rsv_idx=1&tn=baidu&wd=${parm[1]}&fenlei=256&rsv_pq=c176b9c70007eddf&rsv_t=68ceV2Ge1OT5bG4LEwNcettA7VdjvkuX8SUZPzR4fH%2BEKWsiBgBnuchEUhJ0&rqlang=en&rsv_dl=tb&rsv_enter=1&rsv_sug3=3&rsv_sug1=3&rsv_sug7=101&rsv_sug2=0&rsv_btype=i&prefixsug=a&rsp=4&inputT=1517&rsv_sug4=1517`)
            			    break;
            			//必应
            			case "bing":
            			    window.open(`https://cn.bing.com/search?q=${parm[1]}&form=QBLH&sp=-1&pq=kj&sc=10-2&qs=n&sk=&cvid=992337B72AE64ED388545F828CA64C3F&ghsh=0&ghacc=0&ghpl=`);
            			    break;
            			//github
            			case "github":
            			    window.open(`https://github.com/search?q=${parm[1]}`);
            			    break;
            			//知乎
            			case "zhihu":
            			    window.open(`https://www.zhihu.com/search?q=${parm[1]}&utm_content=search_hot&type=content`);
            			    break;
            			//360
            			case "360":
            			    window.open(`https://www.so.com/s?ie=utf-8&fr=so.com&src=home_so.com&ssid=&nlpv=basezt&q=${parm[1]}`);
            			    break;
            		}
            	}
            }
            //download指令
            case "download": {
            	//检测下载后缀是否合理
            	let suffix = /.*\/(.*?)\.(exe|zip|rar|7z|jpg|jpeg|gif|png|webp|msi|pkg|tar\.gz)$/i;
            	if (parm.length === 1) {
            		textarea.value += "What do you want to download?\n";
            	}
            	else if (suffix.test(parm[1])) {
            		let fileName = suffix.exec(parm[1]);
            		let a_link = document.createElement("a");
            		a_link.download = fileName[1]+"."+fileName[2];
            		a_link.href = parm[1];
            		document.body.appendChild(a_link);
            		a_link.click();
            		document.body.removeChild(a_link);
            	}
            	//文件后缀无效
            	else {
                    textarea.value += "The file to be downloaded has an invalid suffix, you can only download files with the suffix EXE or ZIP or RAR or 7Z or JPG or JPEG or GIF or PNG or WEBP or MSI or PKG or TAR.GZ\n";
            	}
                break;
            }
    	}
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
	if (event.keyCode == 13) {
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