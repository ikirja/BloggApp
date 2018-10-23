# BloggApp
A simple BloggApp developed by me using NodeJS, ExpressJS and mongoDB.

# About Me
I'm a junior JS developer, though I'm past my 30s. Worked for more then 10 years as web project manager.
Finally decided that I want to code.

# BloggApp
As a start project I developed a simple web application called BloggApp. It's main purpose is, as the name suggest, to run a blog.
It contains a Blog section (usual blog), a Photo Blog section (photo blog, where all posts contain main image, something like instagram), landing page with my info, comments for Blog and Photo Blog posts.

# Install
Prerequisites:
- NodeJS installed and ready to use on your server, with NPM;
- mongoDB installed;

Clone repositore to your server.
Go to location where you cloned the app.

Run in command line:
npm i
to install all node_modules (dependecies).

App is ready to use.

# Run BloggApp
To test BloggApp, run in commend line:
node app.js

Go to your web address to test it. If main page with my pretty face is what you'll see, then everything is up and running.

# Create admin user
First and foremost: you'll need to create your first user, and it should be admin.
Go to register page (youdomain/register).
Username MUST BE admin. Admin role will automatically add to this account. Only one user with username admin can be registered.
Only admin can post to Blog and Photo Blog. All other regiteres users can comment on all posts.

# Run BloggApp as a service
Install PM2.
Run in command line:
npm install -g PM2
-g mean PM2 will be installed globally on server.
Go to BloggApp directory on your server.
Run in command line:
pm2 start app.js

After anychanges to server code in BloggApp you will have to restart app.js. Run in command line:
pm2 restart app.js

# App structure
/models/ - includes all models.
/public/ - includes all styles and js files with functions and middleware.
/routes/ - includea all routes.
/views/ - includes all views (render files, here you can change layouts for all routes).
app.js - main app file, start point.
package.json - info about app and all dependencies.

# Usage of this software
BloggApp is totally free to use. You can change the app source code however you like.
If you will use the app on public server, you MUST delete my photo.

Thank you!

2018
BloggApp
Developed by Kirill Makeev
