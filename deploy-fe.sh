#!/bin/bash

cd /home/ubuntu/fe

rm -rf build
rm -rf node_modules

npm i

npm run build

sudo systemctl restart nginx
