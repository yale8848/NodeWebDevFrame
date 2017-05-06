#! /bin/bash

MODE="test"

SERVER_PATH="/home/server"

APP_NAME="DXHQuestServer"
NODE_VERSION="v7.6.0"
NODE_VERSION_NAME="node-v7.6.0-linux-x64"
SOFT_PATH="$SERVER_PATH/soft/"
NODE_PATH="/usr/local/$NODE_VERSION_NAME/bin"
APP_HOME="$SERVER_PATH/$APP_NAME"
LOG_HOME="$SERVER_PATH/logs/$APP_NAME"
APP_LOG_PATH="$LOG_HOME/app"
PM2_GUI_LOG_PATH="$LOG_HOME/pm2-gui"
APP_START_SHELL="$APP_HOME/deploy/shell/$MODE/start.sh"

isFind () {
    while read LINE 
       do 
       if [[ $LINE == *$2* ]]
          then
          return 0
       fi
       done < $1
     return 1
} 

downloadNode () {
if [ ! -d "$SOFT_PATH" ]
    then
    mkdir -p "$SOFT_PATH"
fi

 cd $SOFT_PATH 

 if [ ! -d $NODE_VERSION_NAME ]
    then
    wget http://nodejs.org/dist/$NODE_VERSION/$NODE_VERSION_NAME.tar.xz &&
    tar -xvJf $NODE_VERSION_NAME.tar.xz &&
    cp -r $NODE_VERSION_NAME /usr/local
 fi
}


addNodePath () {
isFind /etc/profile $NODE_PATH

if [ $? == 1 ]
   then 
   echo "export PATH=$PATH:$NODE_PATH" >> /etc/profile 
fi
source /etc/profile
}


installDepend () {
npm install -g cnpm --registry=https://registry.npm.taobao.org 
cnpm i pm2 -g 
pm2 install pm2-logrotate 
cnpm install pm2-gui -g 
}


createDir () {
mkdir -p $APP_HOME 
mkdir -p $APP_LOG_PATH 
mkdir -p $PM2_GUI_LOG_PATH 

}

addStartUp () {

isFind /etc/rc.local $APP_HOME

if [ $? == 1 ]
   then 
   echo "sh $APP_START_SHELL" >> /etc/rc.local && chmod +x /etc/rc.local
fi

}

downloadNode
addNodePath
installDepend
createDir
addStartUp


echo "======= all finish ========"

