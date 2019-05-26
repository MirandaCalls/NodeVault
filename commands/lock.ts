import { CommanderStatic } from 'commander';

module.exports = function lockCommand( program: CommanderStatic ) {
    program.command( 'lock' )
    .description( 'Lock the password vault' )
    .action( () => {
        console.log( 'TODO: Locked the password vault' );
    });
}