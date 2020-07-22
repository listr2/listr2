#!/bin/bash

echo "Read terminal ANSI snapshots with cat."
SEPERATOR="------------------------"

if [ -z "$1" ]; then
  FILE=*
else
  FILE=$1
fi

if [ -z "$2" ]; then
  echo "You should pass the snapshot id to view it."
  exit
fi

echo "$SEPERATOR"

FILES=__snapshots__/$FILE.snap

for f in $FILES; do
  echo "Processing test snapshot: $f"
  echo "$SEPERATOR"
  echo
  # take action on each file. $f store current file name
  cat $f | sed -e 's/\x1b\[[0-9?]\+[^m0-9?]//g' | sed -n "/$2/,\$p" | less
done
