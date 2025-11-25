#!/bin/sh
set -e

envsubst < /app/dist/config.template.js > ./dist/config.js

echo "Generated config.js:"
cat ./dist/config.js

exec serve -s dist -l tcp://0.0.0.0:3000