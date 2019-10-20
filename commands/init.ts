const log = console.log;
import {existsSync, writeFileSync} from 'fs';
import path from 'path';
import chalk from 'chalk';
import {CommanderStatic} from 'commander';
import {KeyValueStore} from '../lib/keystore';
import {hashPasskey, encrypt} from '../lib/encryption';
import prompt from '../lib/prompt';
import constants from '../constants';

module.exports = function initCommand(program: CommanderStatic, config: KeyValueStore) {
    program.command('init')
    .description('Set up a password vault in the current directory.')
    .arguments('<filename>')
    .action(async(filename) => {
        if (existsSync(filename)) {
            let answer: string = await prompt('File already exists in this directory, overwrite? (y/n): ');
            answer = answer.toLowerCase();
            if (answer !== 'y') {
                return;
            }
        }

        let passkey: string = await prompt('Passkey for vault: ', true);
        let repeat: string = await prompt('Repeat passkey: ', true);
        if (passkey != repeat) {
            log(chalk.red("Passkeys did not match."));
            return;
        }

        writeFileSync(filename, encrypt(passkey, '{}'));
        let vault_path: string = path.join(process.cwd(), filename);

        config.set('vaultPath', vault_path);
        config.set('passkeyHash', hashPasskey(passkey, config.get("secret")));
        writeFileSync(constants.CONFIG_PATH, config.toString());

        log(chalk.green('Initialized new vault => ' + filename));
    });
}