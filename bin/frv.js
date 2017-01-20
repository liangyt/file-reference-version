#!/usr/bin/env node

var frv = require('../index');
var args = process.argv

// 提取参数 例如 frv -d=src -js=false -css=false, 则params=[-d=src,-js=false,-css=false]
var params = args.slice(2);

// 没有参数
if(params.length === 0) {
    console.log('感谢使用 file-reference-version');
}
else if(params.length === 1) {
    var p = params[0];
    // 版本号
    if(p === '-v' || p === '-V') {
        console.log('file-reference-version 1.0.4');
    }
    // 帮助
    else if(p === '-h') {
        console.log('file-reference-version 1.0.4');
        console.log('-h 查看帮助');
        console.log('-v 查看版本');
        console.log('-d -d=src 需要添加修改版本号的文件目录');
        console.log('-js -js=true/false 是否需要给srcipt路径添加版本号 默认添加');
        console.log('-css -css=true/false 是否需要给link路径添加版本号 默认添加');
        console.log('-l -l=8 md5版本号的长度 默认 8');
    }
    // 目录或者文件路径
    else if(p.indexOf('-d=') == 0) {
        var dArr = p.split('=');
        dArr = dArr[1].trim();
        frv(dArr, true, true, 8)
    }
}
else {
    var d = '', js = true, css = true, l = 8;
    for(var i = 0; i < params.length; i++) {
        var p = params[i];
        if(p.indexOf('-d=') == 0) {
            d = p.split('=')[1].trim()
        }
        else if(p.indexOf('-js=') == 0) {
            js = p.split('=')[1].trim() == 'true' ? true : false
        }
        else if(p.indexOf('-css=') == 0) {
            css = p.split('=')[1].trim() == 'true' ? true : false
        }
        else if(p.indexOf('-l=') == 0) {
            l = parseInt(p.split('=')[1].trim());
        }
    }
    if(d == '') {
        console.error('目录不能为空');
        return;
    }
    frv(d, js, css, l)
}