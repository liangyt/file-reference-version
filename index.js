var fs = require('fs');
var path = require('path');
var crypto = require('crypto');

var list = [];
var count = 0;

var jsFlag = true, cssFlag = true, codeL = 8;

function readDir(_path, callback) {

    // 递归取得该目录下面所有的文件路径

    var toExec = function (_path) {

        var pathJud = fs.lstatSync(_path);
        // 判断是否文件
        if(pathJud.isFile()) {
            callback([_path]);
            return;
        }

        count++;
        fs.readdir(_path, function (err, files) {
            if (err) {
                console.log(err);
                return;
            }

            files.forEach(function (file, i) {
                var stat = fs.lstatSync(path.join(_path, file));
                if (stat.isFile()) {
                    // 只处理jsp html htm asp
                    if(file.lastIndexOf('.jsp') >= 0 || file.lastIndexOf('.html') >= 0 || file.lastIndexOf('.htm') >= 0 || file.lastIndexOf('.asp') >= 0)
                        list.push(path.join(_path, file));
                } else if (stat.isDirectory()) {
                    toExec(path.join(_path, file));
                }

                if ((i + 1) === files.length) {
                    count--;
                }

                if(count === 0){
                    callback(list);
                }
            });
        });
    };

    toExec(_path);
};

// 取得md5
function getMd5() {
    var st = crypto.createHash('md5')
    st.update(new Date().getTime() + '', 'utf-8')
    return st.digest('hex')
}

module.exports = function(folder, jsf, cssf, l) {
    console.log("需要添加版本号的目录/文件:" + folder);
    console.log('script 是否需要添加/修改版本号：' + jsf);
    console.log('link 是否需要添加/修改版本号：' + cssf);
    console.log('--------------------------------------');
    jsFlag = jsf;
    cssFlag = cssf;

    codeL = l ? l : 8;

    readDir(folder, function (_list) {
        var md5Code = getMd5();
        md5Code = md5Code.substring(0, codeL)
        _list.forEach(function(file, i) {
            fs.readFile(file, 'utf-8', (err, data) => {

                var replaceList = [];
                var reg = null;
                // link 是否需要添加版本号
                if(cssFlag) {
                    reg = new RegExp('link.*href=".*.css[^"]*"','g');
                    while (rs = reg.exec(data))
                    {
                        // 找到需要添加或修改版本号的路径
                        var url = rs.toString();
                        replaceList.push(url);
                    }
                }
                // script 是否需要添加版本号
                if(jsFlag) {
                    reg = new RegExp('script.*src=".*.js[^"]*"','g');
                    while (rs = reg.exec(data))
                    {
                        // 找到需要添加或修改版本号的路径
                        var url = rs.toString();
                        replaceList.push(url);
                    }
                }

                replaceList.forEach(function(quote, i) {
                    var rpUrl = quote.indexOf('?v=') >= 0 ? quote.substring(0, quote.indexOf('?v=')) + '?v=' + md5Code + '"' : quote.substring(0, quote.length - 1) + '?v=' + md5Code + '"';
                    data = data.replace(quote, rpUrl)
                })

                // 把处理的字符串写回文件中
                fs.writeFile(file, data, function(err) {
                    if(err) {
                        console.log(file + ' 添加失败');
                        return;
                    }
                    console.log(file + ' 添加成功');
                })
            })
        })
    });
}