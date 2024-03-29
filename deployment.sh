#!/bin/bash

# clean
rm -rf ./vendor
rm -rf ./fonts
rm -rf ./css
rm -rf ./images
rm -rf ./index.html

# unarchive and relocate
tar -xzvf deployment.tar.gz
cp -a ./deployment/* ./

# remove deployment
rm -rf ./deployment
rm -rf ./deployment.tar.gz
rm -rf ./deployment.sh
