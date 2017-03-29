@echo off

if  "%~1"=="" (
 echo "please input git commit info"
) else (

   git add -A
   git commit -a -m "%~1"
   git push
)
