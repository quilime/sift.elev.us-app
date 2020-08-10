#!/bin/sh

# delete static folder
ssh sift@elev.us "cd sift.elev.us/public/ && rm -rf precache-*"

# sync new build
rsync -var --exclude "static/sift" --exclude ".DS_Store" ./build/ sift@elev.us:sift.elev.us/public/