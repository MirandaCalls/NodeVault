const log = console.log;
const error = console.error;
import NodeConfiguration from './package.json';
import constants from './constants';
import program from 'commander';
import chalk from 'chalk';
import fs from 'fs';
import commandLoader from './commands';
import {KeyValueStore} from './lib/keystore';
import {randomString} from './lib/encryption';

program.version(NodeConfiguration.version, '-v, --version');
program.description('Utility to store and protect passwords for use from the command line.');

if (!fs.existsSync(constants.CONFIG_PATH)) {
    log(chalk.green('Initialized config file at ' + constants.CONFIG_PATH) + '\n');
    let initial_config = new KeyValueStore({
        lock_timeout: 3600,
        secret: randomString()
    });
    fs.writeFileSync(constants.CONFIG_PATH, initial_config.toString());
}

// Setup commands
let config_json = fs.readFileSync(constants.CONFIG_PATH).toString();
let config: KeyValueStore = new KeyValueStore(JSON.parse(config_json));
commandLoader(program, config);

program.on('command:*', function() {
    error('Invalid command: %s\nSee --help for a list of available commands.\n', program.args.join(' '));
    process.exit(1);
});

program.parse(process.argv);

if (program.args.length === 0) {
    program.outputHelp();
}