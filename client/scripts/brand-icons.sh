#!/bin/bash

# TODO: README

dir="$(dirname "$0")"
source="$dir/../src/assets/images/icon.svg"
statics="$dir/../src/statics/icons"
sizes=( 16 32 36 70 72 96 150 144 192 256 310 )

convert -background none -resize 352 $source "$statics/icon.png"
convert -background none -resize 16 $source "$statics/favicon.ico"

for i in "${sizes[@]}"
do
  printf -v path "%q/icon-%qx%q.png" $statics $i $i
  convert -background none -resize $i $source $path
done

exit
