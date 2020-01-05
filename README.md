# BloggApp
A lightweight web application for a blog. It's super fast, easy to deploy. A great alternative for other CMS-based blogs you can find on the web (yes, I'm looking to you, WordPress).

# Why BloggApp?
It's really fast because it has been built using NodeJS and ExpressJS. Lightweight. MongoDB, so all your data stored in json format. Did I already told you that it's REALLY fast and lightweight? Well, it is! 

# Install
Prerequisites:
- NodeJS installed and ready to use on your server, with NPM;
- MongoDB installed;

Download archive of a repository to your server.
Go to location where you downloaded and unzipped the app.

Run in command line:<br/>
npm i<br/>
to install all dependecies (node-modules).

App is ready to use.

# Run BloggApp
Entry file is server.js. Use your favourite method to start it as node app.

If you don't know what to do, just run 'node server.js' in CLI.

# Create admin user
Currently to give Admin role to your user, it must be done from CLI on your server. Log in into mongo, find user and update 'isAdmin' prop to true. Sorry for inconvenience, I'll add admin management later.

# App structure
/components/ - all components of the app.<br/>
/config/ - config file of the app.<br/>
server.js - entry file.

# Usage of this software
BloggApp is totally free to use. You can change the app source code however you like.
If you will use the app on a public server, you should leave references for me and my website inside code.

Thank you!

2018-2020<br/>
BloggApp<br/>
Developed by Kirill Makeev
