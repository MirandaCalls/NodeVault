import { CommanderStatic } from 'commander';

module.exports = function initCommand( program: CommanderStatic ) {
    program.command( 'init' )
    .description( 'Set up a password vault for the current user' )
    .action( () => {
        console.log( 'TODO: Initialize vault' );
    });
}