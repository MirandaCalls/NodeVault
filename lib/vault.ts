import chalk from 'chalk';
import {existsSync, readFileSync, statSync, writeFileSync} from 'fs';
import {Dictionary, KeyValueStore} from "./keystore";
import {decipher, encrypt, checkHash} from './encryption';
import prompt from './prompt';

export default class Vault extends KeyValueStore {

    private _passkey: string;

    constructor(passkey: string, data: Dictionary) {
        super(data);
        this._passkey = passkey;
    }

    toString(): string {
        let content: string = super.toString();
        return encrypt(this._passkey, content);
    }

    static async loadVault(config: KeyValueStore): Promise<Vault> {
        let vault_path: string = config.get("vaultPath");
        if (!vault_path) {
            throw new Error('No vault has been initialized. See init --help for how to initialize a vault.');
        }

        let passkey = await prompt('Enter your passkey: ', true);
        if (!checkHash(passkey, config.get("passkeyHash"), config.get("secret"))) {
            throw new Error(chalk.red("Invalid passkey."));
        }

        if (!existsSync(vault_path) || !statSync(vault_path).isFile()) {
            throw new Error(chalk.red('Vault no longer exists. Fix file path in config file or use init to create a new vault.'));
        }

        let encrypted: string = readFileSync(vault_path).toString();
        let content: string;
        try {
            content = decipher(passkey, encrypted);
        } catch(error) {
            throw new Error(chalk.red('Failed to unlock vault.'));
        }
        let data = JSON.parse(content);

        return new Vault(passkey, data);
    }

    static saveVault(vaultPath: string, vault: Vault): void {
        writeFileSync(vaultPath, vault.toString());
    }
};