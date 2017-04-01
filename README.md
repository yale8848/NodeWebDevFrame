# NodeWebDevFrame
Node Web Dev,Test,Monitor,Deploy

[![Built with Grunt](https://cdn.gruntjs.com/builtwith.png)](http://gruntjs.com/)


## 简介

本工程是node web 工程开发框架，其包括node app开发，测试，监控，以及部署方案；

`config`目录是web app 调用的配置文件，`deploy`目录是部署配置

#### 开发

  默认是用Express web

#### 测试

  用npm启动脚本，PM2进行进程管理
#### 部署

  通过grunt ssh 进行服务器初始化和部署


### 修改项目名称等配置

默认项目名称为DXHQuestServer，需要修改项目名称，端口等信息

1. 修改Gruntfile-replace.js文件中的信息 
   
   - appName 为项目名称，此名称影响到部署后的目录名称，pm2名称
   - appPort 为web端口
   - pm2_gui_port 为pm2_gui 端口
   - webContextPath 为web contextPath

2. grunt --gruntfile Gruntfile-replace.js  注意修改完后如果deploy/shell/目录下的sh文件换行符为CRLF的话，请转化为linux下的LF

3. 注意deploy/process/test/pm2-start.json,deploy/process/prod/pm2-start.json 中的
`NODE_ENV`变量和config/config.js文件中的`process.env.NODE_ENV` 变量一致


### 初次安装

默认服务器为linux服务器，所有的账户为root账户，服务器部署为测试服务器和正式服务器，测试名称为test,正式服务器名为prod

1. npm i

2. 修改deploy/grunt/secret_install.json 服务器信息

3. 测试服务安装node依赖，添加node环境变量，添加开机自启； `grunt install_test --gruntfile Gruntfile-install.js `
 修改deploy/grunt/secret_install.json中的intstall_test 等信息

4. 正式服务器安装node依赖，添加node环境变量，添加开机自启；`grunt install_prod --gruntfile Gruntfile-install.js `
   正式服务器有多个的话，先在 deploy/grunt/secret_install.json中修改intstall_prod 的hosts数组添加host，然后在Gruntfile-install.js 中 environments  task中添加 install_prod0，install_prod1 等等，同时修改install_prod0，install_prod1 中的hosts[0],hosts[1]

### 本地开发测试
1. npm install
2. npm install pm2 -g
3. npm install grunt-cli -g

npm start ==> pm2 start deploy/process/local/pm2-start.json --watch

需要修改deploy/process/local/pm2-start.json 相关信息，默认开启watch

### 测试服务器部署

1. 修改deploy/grunt/secret.json test 字段相关信息,修改方法和初次安装中一样；
2. grunt test --gruntfile Gruntfile-deploy.js

### 正式服务器部署

1. 修改deploy/grunt/secret.json prod 字段相关信息,修改方法和初次安装中一样，注意添加host同时要修改Gruntfile.js中的environments task，添加prod0，prod1 等等
2. grunt prod --gruntfile Gruntfile-deploy.js


### 部署流程

1. 服务器环境安装
   - grunt:async_ssh_exec 创建目录
   - grunt:ssh_deploy 上传文件
   - grunt:async_ssh_exec 执行批处理命令
2. 部署
   - grunt:compress 压缩工程文件未zip文件
   - grunt:ssh_deploy 上传文件
   - grunt:async_ssh_exec 解压并启动
   - grunt:simple_rest 验证接口，看服务器是否正常启动

### 部署说明

此工程用[PM2](https://github.com/Unitech/pm2)进程管理，日志切割用 [pm2-logrotate](https://github.com/pm2-hive/pm2-logrotate) ，服务器监控用 [pm2-gui](https://github.com/Tjatse/pm2-gui)

1. 安装install.sh 会放入/home/server/install/
2. 初次安装会安装node-7.6.0,下载目录/home/server/soft,安装路劲/usr/local/node-xxxxx
3. app工程会放入/home/server/xxxx
4. pm2日志会放入 /home/server/logs/xxx/app
5. pm2-gui日志会放入 /home/server/logs/xxx/pm2-gui



