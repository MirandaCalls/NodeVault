import { CommanderStatic } from 'commander';

module.exports = function listCommand( program: CommanderStatic ) {
    program.command( 'list' )
    .description( 'Displays a list of all password keynames' )
    .action( () => {
        console.log( 'TODO: List of password keynames' );
    });
}