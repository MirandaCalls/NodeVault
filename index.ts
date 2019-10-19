import NodeConfiguration from './package.json';
import Constants from './constants';
import program from 'commander';
import chalk from 'chalk';
import fs from 'fs';
import commandLoader from './commands';

program.version( NodeConfiguration.version, '-v, --version' );
program.description( 'Utility to store and protect passwords for use from the command line.' );

// Setup commands
commandLoader( program );

if ( !fs.existsSync( Constants.CONFIG_PATH ) ) {
    console.log( chalk.green( 'Initialized config file at ' + Constants.CONFIG_PATH ) + '\n' );
    fs.writeFileSync( Constants.CONFIG_PATH, '{"lock_timeout":3600}' );
}

program.on( 'command:*', function () {
    console.error( 'Invalid command: %s\nSee --help for a list of available commands.\n', program.args.join( ' ' ) );
    process.exit( 1 );
} );

program.parse( process.argv );

if ( program.args.length === 0 ) {
    program.outputHelp();
}