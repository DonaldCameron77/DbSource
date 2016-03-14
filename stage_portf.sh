#!/bin/bash

function stageIfNewer {
  if [[ $1 -nt $2 ]]; then
    echo $1 is newer than $2
    echo copying $1 to $2
    cp $1 $2
  fi
}

PREFIX=/Users/dcc1079/Dropbox

# Portfolio index copy. App consists of only one file.
stageIfNewer $PREFIX/Source/PortfolioHome/index.html $PREFIX/Source.Deploy/Root.deploy/index.html

# Altguitar.  There is an external css file.
stageIfNewer $PREFIX/Source/altguitar/index.html $PREFIX/Source.Deploy/Root.deploy/altguitar/index.html
stageIfNewer $PREFIX/Source/altguitar/css/styles.css $PREFIX/Source.Deploy/Root.deploy/altguitar/css/styles.css

# sportsmoodspa.  Single file app
stageIfNewer $PREFIX/Source/sportsmoodspa/sportsmood.html $PREFIX/Source.Deploy/Root.deploy/sportsmoodspa/sportsmood.html

