const log = console.log;
import {CommanderStatic} from 'commander';
import {KeyValueStore} from '../lib/keystore';
import Vault from '../lib/vault';

module.exports = function getCommand(program: CommanderStatic, config: KeyValueStore) {
    program.command('remove')
    .description('Removes a password from the vault.')
    .arguments('<key>')
    .action(async(key) => {
        let vault: Vault;
        try {
            vault = await Vault.loadVault(config);
        } catch(error) {
            log(error.message);
            return;
        }

        vault.delete(key);
        Vault.saveVault(config.get("vaultPath"), vault);
    });
}