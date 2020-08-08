#!/bin/sh

# delete static folder
# ssh sift@elev.us "cd sift.elev.us/public/ && rm -rf static"

# sync new build
rsync -var --delete --exclude ".DS_Store" --exclude "static" ./build/ sift@elev.us:sift.elev.us/public/