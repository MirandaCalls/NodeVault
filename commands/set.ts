import { CommanderStatic } from 'commander';

module.exports = function setCommand( program: CommanderStatic ) {
    program.command( 'set' )
    .description( 'Adds a new password to a vault' )
    .action( () => {
        console.log( 'TODO: Set password' );
    });
}