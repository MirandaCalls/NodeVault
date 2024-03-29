const log = console.log;
import chalk from 'chalk';
import clipboard from 'clipboardy';
import {CommanderStatic} from 'commander';
import {KeyValueStore} from '../lib/keystore';
import Vault from '../lib/vault';

module.exports = function getCommand(program: CommanderStatic, config: KeyValueStore) {
    program.command('get')
    .description('Finds a password by key and loads it into the clipboard')
    .arguments('<key>')
    .action(async(key) => {
        let vault: Vault;
        try {
            vault = await Vault.loadVault(config);
        } catch(error) {
            log(error.message);
            return;
        }

        let password = vault.get(key);
        if (!password) {
            log(chalk.red('Password with key \'' + key + '\' does not exist.'));
            return;
        }

        clipboard.writeSync(password);
        log(chalk.green(key + ' has been copied to the clipboard!'));
    });
}