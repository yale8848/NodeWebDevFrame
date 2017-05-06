#!/bin/sh

MODE="prod"
APP="DXHQuestServer"
APP_NAME="DXHQuestServer"
SERVER_PATH="/home/server"

APP_HOME=$SERVER_PATH/$APP_NAME
PM2_CONFIG=$APP_HOME/deploy/process/$MODE/pm2-start.json
PM2_GUI_CONFIG=$APP_HOME/deploy/process/$MODE/pm2-gui.ini
NODE_HOME=/usr/local/node-v7.6.0-linux-x64

export PATH=$PATH:$NODE_HOME/bin

echo "node modules installing..."
cd $APP_HOME && cnpm i --production
echo "node modules installed"

pm2 stop $APP
pm2 start $PM2_CONFIG
#pm2-gui stop
#pm2-gui start $PM2_GUI_CONFIG

pm2 set pm2-logrotate:max_size 100K
pm2 set pm2-logrotate:rotateInterval '0 0 * * *'