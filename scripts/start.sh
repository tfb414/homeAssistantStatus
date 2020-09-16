#!/bin/bash
exec 1>/home/pi/development/homeAssistantStatus/scripts/startScript.log 2>&1
echo is this working > test.log
/usr/local/bin/node ./bin/www
