# 命令行浏览器，让你沉浸式体验命令行的魅力
<pre>
一共有6种指令：
bg:{
    introduce:能获取当前的背景图片url，以及设置背景图片,
    demo:{
        1:bg(获取当前背景图片),
        2:bg https://xxx.xxx.com/xxx.png(将目标图片设置为当前背景)
    }
}
goto:{
    introduce:能前往一个指定网页（url最好是完整的，如：https://www.baidu.com,
    demo:{
        1:goto https://github.com/(前往github)
        2:goto csdn.net(前往csdn，非完整url可能会引起打开网页错误)
    }
}
command:{
    introduce:能显示6大指令的简介,
    demo:{
        1:command all(获取所有指令的简介),
        2:command bg(只获取bg指令的简介)
    }
}
history:{
    introduce:查看之前用过的指令或清空指令,
    demo:{
        1:history(获取所有用过的指令),
        2:history 3(获取之前用过的第三条指令),
        3:history limit 5(获取之前的前5条指令)
        4:history clear(清空指令，并且该指令不会计入历史指令中)
    }
}
search:{
    introduce:选定搜索引擎在搜索内容,支持baidu,bing,github,zhihu,360
    demo:{
        1:search spider baidu(在百度搜索spider),
        2:search javascript github(在github搜索javascript)
    }
}
download:{
    introduce:通过url来下载指定文件,支持exe,zip,rar,7z,tar.gz,jpg,jpeg,png,gif,webp,dmg,pkg,msi后缀的文件
    demo:{
        1:download https://github.com/nuoyalucas/nuoyalucas.github.io/archive/refs/heads/main.zip(下载指定压缩包),
        2:download https://az764295.vo.msecnd.net/stable/da76f93349a72022ca4670c1b84860304616aaa2/VSCodeSetup-x64-1.70.0.exe(下载指定应用程序)
    }
}
</pre>