# BloggApp
A lightweight web application for a blog. It's super fast, use to deploy. A great alternative for other CMS-type blogs you can find on the web.

# Why BloggApp?
It's really fast because it's built using NodeJS and ExpressJS. Lightweight, it's under 30mb unarchived on your webserver. It's using MongoDB to store info, so all your data is in json format. Did I already told you that it's REALLY lightweight and fast? Well, it is! 

# Install
Prerequisites:
- NodeJS installed and ready to use on your server, with NPM;
- MongoDB installed;

Clone repositore to your server.
Go to location where you cloned the app.

Run in command line:
npm i
to install all node_modules (dependecies).

App is ready to use.

# Run BloggApp
Entry file is server.js. Use your favorite method to start it as node app.

If you don't know what to do, just run 'node server.js' in CLI.

# Create admin user
Currently to give Admin role to your user, it must be done from CLI of your server. Log in into mongo, find user and update it's isAdmin prop to true. Sorry for inconvinience, I'll add admin management later.

# App structure
/components/ - all components of the app.
/config/ - config file of the app.
server.js - entry file.

# Usage of this software
BloggApp is totally free to use. You can change the app source code however you like.
If you will use the app on public server, you should leave references for me and my website inside code.

Thank you!

2018-2020
BloggApp
Developed by Kirill Makeev
