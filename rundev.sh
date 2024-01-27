#!/bin/bash


gnome-terminal --window -x bash -c "cd ~/Server;yarn start:dev;exec bash"
gnome-terminal --window -x bash -c "cd ~/adminWeb;yarn dev;exec bash"
gnome-terminal --window -x bash -c "cd ~/userWeb;yarn dev;exec bash"

