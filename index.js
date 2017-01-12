var fs = require('fs');
var path = require('path');
var crypto = require('crypto');

var list = [];
var count = 0;

function readDir(_path, callback) {

    var toExec = function (_path) {
        count++;
        fs.readdir(_path, function (err, files) {
            if (err) {
                console.log(err);
                return;
            }

            files.forEach(function (file, i) {
                var stat = fs.lstatSync(path.join(_path, file));
                if (stat.isFile()) {
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


function getMd5() {
    var st = crypto.createHash('md5')
    st.update(new Date().getTime() + '', 'utf-8')
    return st.digest('hex')
}

readDir(folder, function (_list) {
    var md5Code = getMd5();

    _list.forEach(function(file, i) {
        fs.readFile(file, 'utf-8', (err, data) => {

            var reg = new RegExp('link.*href=".*.css.*"','g');
            var replaceList = [];
            while (rs = reg.exec(data))
            {
                // 找到的需要添加或修改版本号的路径
                var url = rs.toString();
                replaceList.push(url);
            }

            reg = new RegExp('script.*src=".*.js.*"','g');
            while (rs = reg.exec(data))
            {
                // 找到的需要添加或修改版本号的路径
                var url = rs.toString();
                replaceList.push(url);
            }

            replaceList.forEach(function(quote, i) {
                var rpUrl = quote.indexOf('?v=') >= 0 ? quote.substring(0, quote.indexOf('?v=')) + '?v=' + md5Code + '"' : quote.substring(0, quote.length - 1) + '?v=' + md5Code;
                console.log();
                data = data.replace(quote, rpUrl)
            })

            fs.writeFile(file, data, (err) => {
                console.log(file + '写入成功');
            })
        })
    })
});

export.fileReferenceVersion = function() {

}