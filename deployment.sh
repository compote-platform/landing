#!/bin/bash

# clean
rm -rf ./vendor
rm -rf ./css
rm -rf ./img
rm -rf ./index.html

# unarchive and relocate
tar -xzvf deployment.tar.gz
cp -a ./deployment/* ./

# remove deployment
rm -rf ./deployment
rm -rf ./deployment.tar.gz
rm -rf ./deployment.sh
