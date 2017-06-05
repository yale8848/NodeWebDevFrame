#!/bin/sh

APP="DXHQuestServer"
NODE_HOME=/usr/local/node-v7.6.0-linux-x64
export PATH=$PATH:$NODE_HOME/bin

pm2 stop $APP
