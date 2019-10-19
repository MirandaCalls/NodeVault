import { CommanderStatic } from 'commander';
import { existsSync, writeFileSync } from 'fs';
import prompt from '../lib/prompt';
import KeyValueStore from '../lib/keystore';
import Constants from '../constants';
import path from 'path';

module.exports = function initCommand( program: CommanderStatic ) {
    program.command( 'init' )
    .description( 'Set up a password vault in the current directory.' )
    .arguments( '<filename>' )
    .action( async( filename ) => {
        if ( existsSync( filename ) ) {
            let answer = await prompt( 'File already exists in this directory, overwrite? (y/n): ' );
            if ( answer !== 'y' && answer !== 'Y' ) {
                console.log();
                return;
            }
        }

        writeFileSync( filename, '{}' );

        let config: KeyValueStore = KeyValueStore.loadFromFile( Constants.CONFIG_PATH );
        let vault_path: string = path.join( process.cwd(), filename );
        config.set( 'vaultPath', vault_path );
        KeyValueStore.saveToFile( Constants.CONFIG_PATH, config );

        console.log( 'Initialized new vault => ' + filename + '\n' );
    } );
}