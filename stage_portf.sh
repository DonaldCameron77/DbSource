#!/bin/bash

#N.B. for a new directory/application, I think you have to make the directories first!

function stageIfNewer {
  if [[ $1 -nt $2 ]]; then
    echo $1 is newer than $2
    echo copying $1 to $2
    cp $1 $2
  fi
}

PREFIX=/Users/dcc1079/Dropbox

# Portfolio
stageIfNewer $PREFIX/Source/PortfolioHome/index.html $PREFIX/Source.Deploy/Root.deploy/index.html
stageIfNewer $PREFIX/Source/PortfolioHome/portfolio.css/styles.css $PREFIX/Source.Deploy/Root.deploy/portfolio.css/styles.css

# Altguitar.  There is an external css file.
stageIfNewer $PREFIX/Source/altguitar/index.html $PREFIX/Source.Deploy/Root.deploy/altguitar/index.html
stageIfNewer $PREFIX/Source/altguitar/css/styles.css $PREFIX/Source.Deploy/Root.deploy/altguitar/css/styles.css

# sportsmoodspa.  Single file app
stageIfNewer $PREFIX/Source/sportsmoodspa/sportsmood.html $PREFIX/Source.Deploy/Root.deploy/sportsmoodspa/sportsmood.html

# quote app.  Has styles, js, font, and images directories.
stageIfNewer $PREFIX/Source/quoteapp/index.html $PREFIX/Source.Deploy/Root.deploy/quoteapp/index.html
DIR=stylesheets
FILENAME=styles.css
stageIfNewer $PREFIX/Source/quoteapp/$DIR/$FILENAME $PREFIX/Source.Deploy/Root.deploy/quoteapp/$DIR/$FILENAME
DIR=js
FILENAME=script.js
stageIfNewer $PREFIX/Source/quoteapp/$DIR/$FILENAME $PREFIX/Source.Deploy/Root.deploy/quoteapp/$DIR/$FILENAME
DIR=images
FILENAME=clouds01.jpg
stageIfNewer $PREFIX/Source/quoteapp/$DIR/$FILENAME $PREFIX/Source.Deploy/Root.deploy/quoteapp/$DIR/$FILENAME
DIR=fonts
FILENAME=bitwise.ttf
stageIfNewer $PREFIX/Source/quoteapp/$DIR/$FILENAME $PREFIX/Source.Deploy/Root.deploy/quoteapp/$DIR/$FILENAME

# weather app.  Has stylesheets, js, and weatherIcons directories.
stageIfNewer $PREFIX/Source/weatherappfcc/index.html $PREFIX/Source.Deploy/Root.deploy/weatherappfcc/index.html
DIR=stylesheets
FILENAME=reset.css
stageIfNewer $PREFIX/Source/weatherappfcc/$DIR/$FILENAME $PREFIX/Source.Deploy/Root.deploy/weatherappfcc/$DIR/$FILENAME
DIR=stylesheets
FILENAME=phone-default.css
stageIfNewer $PREFIX/Source/weatherappfcc/$DIR/$FILENAME $PREFIX/Source.Deploy/Root.deploy/weatherappfcc/$DIR/$FILENAME
DIR=stylesheets
FILENAME=tablet.css
stageIfNewer $PREFIX/Source/weatherappfcc/$DIR/$FILENAME $PREFIX/Source.Deploy/Root.deploy/weatherappfcc/$DIR/$FILENAME
DIR=stylesheets
FILENAME=desktop.css
stageIfNewer $PREFIX/Source/weatherappfcc/$DIR/$FILENAME $PREFIX/Source.Deploy/Root.deploy/weatherappfcc/$DIR/$FILENAME
DIR=js
FILENAME=app.js
stageIfNewer $PREFIX/Source/weatherappfcc/$DIR/$FILENAME $PREFIX/Source.Deploy/Root.deploy/weatherappfcc/$DIR/$FILENAME
DIR=weatherIcons
FILENAME=fog.png
stageIfNewer $PREFIX/Source/weatherappfcc/$DIR/$FILENAME $PREFIX/Source.Deploy/Root.deploy/weatherappfcc/$DIR/$FILENAME
DIR=weatherIcons
FILENAME=overcast.png
stageIfNewer $PREFIX/Source/weatherappfcc/$DIR/$FILENAME $PREFIX/Source.Deploy/Root.deploy/weatherappfcc/$DIR/$FILENAME
DIR=weatherIcons
FILENAME=partly_cloudy.png
stageIfNewer $PREFIX/Source/weatherappfcc/$DIR/$FILENAME $PREFIX/Source.Deploy/Root.deploy/weatherappfcc/$DIR/$FILENAME
DIR=weatherIcons
FILENAME=questionmark.png
stageIfNewer $PREFIX/Source/weatherappfcc/$DIR/$FILENAME $PREFIX/Source.Deploy/Root.deploy/weatherappfcc/$DIR/$FILENAME
DIR=weatherIcons
FILENAME=rain.png
stageIfNewer $PREFIX/Source/weatherappfcc/$DIR/$FILENAME $PREFIX/Source.Deploy/Root.deploy/weatherappfcc/$DIR/$FILENAME
DIR=weatherIcons
FILENAME=snow.png
stageIfNewer $PREFIX/Source/weatherappfcc/$DIR/$FILENAME $PREFIX/Source.Deploy/Root.deploy/weatherappfcc/$DIR/$FILENAME
DIR=weatherIcons
FILENAME=sunny.png
stageIfNewer $PREFIX/Source/weatherappfcc/$DIR/$FILENAME $PREFIX/Source.Deploy/Root.deploy/weatherappfcc/$DIR/$FILENAME
DIR=weatherIcons
FILENAME=thunderstorm.png
stageIfNewer $PREFIX/Source/weatherappfcc/$DIR/$FILENAME $PREFIX/Source.Deploy/Root.deploy/weatherappfcc/$DIR/$FILENAME

# stock quote widget.  Has css, js, and images directories.

stageIfNewer $PREFIX/Source/stockquotewidget/index.html $PREFIX/Source.Deploy/Root.deploy/stockquotewidget/index.html
DIR=css
FILENAME=reset.css
stageIfNewer $PREFIX/Source/stockquotewidget/$DIR/$FILENAME $PREFIX/Source.Deploy/Root.deploy/stockquotewidget/$DIR/$FILENAME
DIR=css
FILENAME=phone-default.css
stageIfNewer $PREFIX/Source/stockquotewidget/$DIR/$FILENAME $PREFIX/Source.Deploy/Root.deploy/stockquotewidget/$DIR/$FILENAME
DIR=css
FILENAME=tablet.css
stageIfNewer $PREFIX/Source/stockquotewidget/$DIR/$FILENAME $PREFIX/Source.Deploy/Root.deploy/stockquotewidget/$DIR/$FILENAME
DIR=css
FILENAME=desktop.css
stageIfNewer $PREFIX/Source/stockquotewidget/$DIR/$FILENAME $PREFIX/Source.Deploy/Root.deploy/stockquotewidget/$DIR/$FILENAME
DIR=js
FILENAME=scripts.js
stageIfNewer $PREFIX/Source/stockquotewidget/$DIR/$FILENAME $PREFIX/Source.Deploy/Root.deploy/stockquotewidget/$DIR/$FILENAME
DIR=images
FILENAME=currency.jpg
stageIfNewer $PREFIX/Source/stockquotewidget/$DIR/$FILENAME $PREFIX/Source.Deploy/Root.deploy/stockquotewidget/$DIR/$FILENAME

# eof
