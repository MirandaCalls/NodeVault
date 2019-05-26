import NodeConfiguration from './package.json';
import Constants from './constants';
import program from 'commander';
import chalk from 'chalk';
import fs from 'fs';
import path from 'path';

// Setup commands
require( './commands' )( program );

program.version( NodeConfiguration.version, '-v, --version' );
program.description( 'Utility to store and protect passwords for use from the command line.' )

let config: object;
const home_path: string = ( process.env.HOME as string );
let config_path = path.join( home_path, Constants.CONFIG_FILENAME );
if ( fs.existsSync( config_path ) ) {
    config = JSON.parse( fs.readFileSync( config_path ).toString() );
} else {
    console.log( chalk.green( 'Initialized config file at ' + config_path ) + '\n' );
    config = { test: "set a value" };
    fs.writeFileSync( config_path, JSON.stringify( config ) );
}

program.parse( process.argv );