# VACATION WEATHER

<hr>

## Description

The application aims to facilitate the process of planning a vacation destination with respect to where the weather is pleasant.
Search for desired destination and receive information about temperature, humidity and clouds over the next five days.

When clicking on chosen destination more detailed data about the weather conditions are displayed, and the user can also observe mean values of the weather data over chosen amount of days.

OBS! Firebase deployment is under construction, please use localHost to run the application!

<hr>

## File Structure

**Main**

**Router**
Routes the different views in the application.

**Model**
Contains all the set- and get-functions as well as all the calculations.

**Welcome**
Welcome screen.

**Search**
Component containing search bar.

**Destinations**
Render search results.

**Detailed View**
Detailed view of searched destination.

**City List**
JSON file with all available cities. This file enables autocomplete in the search function.


# iprog-firebase

> Deploy Vue-application to firebase. Hosting.

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
