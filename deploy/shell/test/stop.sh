#!/bin/sh

APP="DXHQuestServer"
NODE_HOME=/usr/local/node-v7.6.0-linux-x64
export PATH=$PATH:$NODE_HOME/bin  
export NODE_PATH=$NODE_PATH:$NODE_HOME/lib/node_modules  

pm2=pm2

$pm2 stop $APP
