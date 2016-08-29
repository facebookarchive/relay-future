#!/bin/bash
#
# Serves presentation assets at localhost:8888.

# http://stackoverflow.com/a/246128/2103996
DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

cd "$DIR/content"
python -m SimpleHTTPServer 8888
