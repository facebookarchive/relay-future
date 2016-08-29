#!/bin/sh

# Copy current HEAD content/* to gh-pages branch, creating a new commit on that
# branch.

set -e

TREE=$(git ls-tree -d HEAD -l content | cut -d ' ' -f 3)
ABBREV=$(git rev-parse --short HEAD)
COMMIT=$(git commit-tree -m "content/ from commit $ABBREV" -p gh-pages "$TREE")
git br -f gh-pages "$COMMIT"
