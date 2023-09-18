#!/bin/bash

echo "Read terminal ANSI snapshots with cat."
SEPERATOR="------------------------"

if [ -z "$1" ]; then
  echo "You should pass an snapshot file."

  exit 127
else
  FILE=$1
fi

if [ -z "$2" ]; then
  echo "You can pass the snapshot id to view it."
fi

echo "$SEPERATOR"

FILES=$FILE

for f in $FILES; do
  echo "Processing test snapshot: $f"
  echo "$SEPERATOR"
  echo
  # take action on each file. $f store current file name
  if [ ! -z "$2" ]; then
    cat $f | sed -e 's/\x1b\[[0-9?]\+[^m0-9?]//g' | sed -n "/$2/,\$p" | less
  else
    cat $f | sed -e 's/\x1b\[[0-9?]\+[^m0-9?]//g' | less
  fi
done
