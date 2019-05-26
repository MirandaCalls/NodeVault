import { CommanderStatic } from 'commander';

module.exports = function unlockCommand( program: CommanderStatic ) {
    program.command( 'unlock' )
    .description( 'Unlock the password vault' )
    .action( () => {
        console.log( 'TODO: Unlocked vault' );
    });
}