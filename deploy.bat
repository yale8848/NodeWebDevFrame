@echo off

if  "%~1"=="" (
 echo "please input deploy type"
) else (
   grunt "%~1" --gruntfile Gruntfile-deploy.js
)