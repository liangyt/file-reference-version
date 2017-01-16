### srcipt/link添加版本号

####安装

```
npm install file-reference-version -g
```

####查看帮助信息

```
$frv -h
file-reference-version 1.0.0
-h 查看帮助
-v 查看版本
-d -d=src 需要添加修改版本号的文件目录
-js -js=true/false 是否需要给srcipt路径添加版本号 默认添加
-css -css=true/false 是否需要给link路径添加版本号 默认添加
-l -l=8 md5版本号的长度 默认 8
```

####使用方式
```
$frv -d=src/
需要添加版本号的目录/文件:src/view/
script 是否需要添加/修改版本号：true
link 是否需要添加/修改版本号：true
--------------------------------------
src/view/add.jsp 添加成功
src/view/index.jsp 添加成功
src/view/first/one.jsp 添加成功
```

####注意事项
1.由于匹配的是使用正则表达式，没有写得特别强大，所以写link,srcipt 的时候，href/src 后面需要使用双引号(""),否则匹配不上。

2.-d 目前暂时只支持文件夹，不支持文件