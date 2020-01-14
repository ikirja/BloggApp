//**************
// CONFIGURATION
//**************
var system = {};

//**************
// USER SETTINGS
//**************
// NODE_ENV
system.nodeEnv = 'DEVELOPMENT';

// PORT and IP for PRODUCTION
system.port = '8080';
system.ip = 'localhost';

// Template Folder name
let templateFolder = '';

// DB
system.db = 'BloggApp';

// Public Directory Absolute Path
system.publicRoot = '/home/kirill/apps/blogg-app-frontend/dist';

// Nodemailer Transport Options
system.nodemailer = {
  options: {}
};

// JWToken Secret
system.jwtSecret = '';

//*******************************
// SYSTEM SETTINGS, DO NOT CHANGE
//*******************************
// System objects and arrays
system.components = {};
system.templates = {};

// Components/System address
system.components.system = './components/system';

// Templates address
system.templates.path = 'templates';

// Template to use
system.templates.template = `${system.templates.path}/${templateFolder}`;

// Static folder
system.templates.static = `public/templates/${templateFolder}`;

// Minify
system.templates.minifyPaths = {
  css: `${system.templates.static}/css`,
  js: `${system.templates.static}/js`
};
system.templates.minifyWrite = `${system.templates.static}/min`;

// Additional Functions
system.functions = './components/system/functions';

//******************
// CUSTOM COMPONENTS
//******************

// Example
/*
system.components.nameOfComponent = './components/nameOfComponent';
*/

// EXPORT system object
module.exports = system;
