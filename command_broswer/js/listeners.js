var textarea = document.getElementById("text");
var commands = {
	"bg":"a command that can show the background's image and set the background's image",
    "goto":"a command that can open a url",
    "command":"a command that can show the commands' detail",
    "history":"a command that can show all the commands that be used",
    "search":"a command that can search some thing on an appointed search engine"
}


textarea.value += "Welcome to NuoyaLucas's command broswer.You can type 'command all' to show all the commands.\n\n"
textarea.addEventListener("keyup",(event) => {
	if (event.keyCode !== 13) {
		return;
	}
	else {
    	let input = textarea.value.split("\n");
    	let detailInput = /\d{4}-\d{1,2}-\d{1,2} \d{1,2}:\d{1,2} > (.*)/.exec(input[input.length-2])[1];
   		let parm = detailInput.split(" ");
        pauseCommand(parm);
	}
});

//解析指令
function pauseCommand(parm) {
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
                            for (let detail in commands) {
                                textarea.value += `Command '${detail}': ${commands[detail]}\n`;
                            }
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
textarea.addEventListener("keyup",(event) => {
	if (event.keyCode == 13) {
		newDate();
	}
});
	
