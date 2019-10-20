const log = console.log;
import {CommanderStatic} from 'commander';
import {KeyValueStore} from '../lib/keystore';
import Vault from '../lib/vault';

module.exports = function listCommand(program: CommanderStatic, config: KeyValueStore) {
    program.command('list')
    .description('Displays a list of all password keynames')
    .action(async() => {
        let vault: Vault;
        try {
            vault = await Vault.loadVault(config);
        } catch(error) {
            log(error.message);
            return;
        }

        let keys: string[] = vault.getKeys();
        for (let name of keys) {
            log(name);
        }
    });
}