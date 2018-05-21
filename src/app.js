/**
 * Run phantom-script.js from a node process.
 *
 * Credit to Our Code World for their tutorial:
 *  https://ourcodeworld.com/articles/read/379/how-to-use-phantomjs-with-node-js
 */
const path = require('path');
const spawn = require('child_process').spawn;
require('dotenv').config();

// PhantomJS command-line args and options
let args = [path.join(__dirname, 'phantom-script.js'),
    /* args 1 and 2 */ process.env.LOGIN_URL, process.env.URL,
    /* args 3 and 4 */ process.env.SITE_USERNAME, process.env.SITE_PASSWORD,
    /* args 5 and 6 */ process.env.AUTH_COOKIE_NAME, process.env.SITE_CLASS
];
// PhantomJS executable path
let phantomExecutable = 'phantomjs';


/**
 * Convert a Uint8Array to its String form
 * @param   {Uint8Array} uint8Arr
 * @return  {String}
 */
function Uint8ArrayToString(uint8Arr) {
    return String.fromCharCode.apply(null, uint8Arr);
}


// Create PhantomJS process
let child = spawn(phantomExecutable, args);

// Receive output
child.stdout.on('data', (data) => {
    let text = Uint8ArrayToString(data);
    console.log(text);
});
child.stderr.on('data', (err) => {
    console.log(`Error in PhantomJS process!`);
    let text = Uint8ArrayToString(err);
    console.log(text);
});
child.on('close', (code) => {
    console.log(`Process closed with status code: ${code}`);
});
