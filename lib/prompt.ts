import readline, { ReadLine } from 'readline';
import { WriteStream } from 'tty';

interface ReadLineHiddenInput extends ReadLine {
    output: WriteStream,
    _writeToOutput( input: string ): void;
};

function prompt( promptText: string, isPassword: boolean = false ): Promise<string> {
    return new Promise( ( resolve ) => {
        const rl: ReadLineHiddenInput = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        }) as ReadLineHiddenInput;
    
        rl.question( promptText, ( answer: string ) => {
            resolve( answer );
            rl.output.write( '\n' );
            rl.close();
        });
        
        rl._writeToOutput = function _writeToOutput( input: string ) {
            if ( input.includes( '\n' ) ) {
                return;
            }
        
            if ( isPassword ) {
                let splitInput: Array<string> = input.split( promptText );
                if ( splitInput.length == 2 ) {
                    rl.output.write( promptText );
                    rl.output.write( '*'.repeat( splitInput[1].length ) );
                } else {
                    rl.output.write( "*" );
                }
            } else {
                rl.output.write( input );
            }
        };
    
        rl.prompt();
    } );
}

export default prompt;