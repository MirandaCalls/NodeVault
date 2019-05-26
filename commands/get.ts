import { CommanderStatic } from 'commander';

module.exports = function getCommand( program: CommanderStatic ) {
    program.command( 'get' )
    .description( 'Finds a password by key and loads it into the clipboard' )
    .action( () => {
        console.log( 'TODO: Got password' );
    });
}