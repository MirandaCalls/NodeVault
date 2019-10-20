const log = console.log;
import chalk from 'chalk';
import {CommanderStatic} from 'commander';
import {KeyValueStore} from '../lib/keystore';
import prompt from '../lib/prompt';
import Vault from '../lib/vault';

module.exports = function setCommand(program: CommanderStatic, config: KeyValueStore) {
    program.command('set')
    .description('Adds a new password to a vault')
    .arguments('<key>')
    .action(async(key) => {
        let vault: Vault;
        try {
            vault = await Vault.loadVault(config);
        } catch(error) {
            log(error.message);
            return;
        }

        let password: string = await prompt('New password: ', true);
        if (password.length == 0) {
            log(chalk.red('No password provided.'));
            return;
        }
        vault.set(key, password);
        Vault.saveVault(config.get("vaultPath"), vault);
    });
}