import fs from 'fs';
import path from 'path';
import {CommanderStatic, Command} from 'commander';
import {KeyValueStore} from '../lib/keystore';

interface CommandMap {
    [key: string]: Command;
}

export default function commandLoader(program: CommanderStatic, config: KeyValueStore) {
	'use strict';

	let commands: CommandMap = {};
	let loadPath = path.dirname(__filename);

	// Loop though command files
	fs.readdirSync(loadPath).filter((filename) => {
		return (/\.js$/.test(filename) && filename !== 'index.js');
	}).forEach((filename) => {
		let name: string = filename.substr(0, filename.lastIndexOf('.'));

		// Require command
		let command = require(path.join(loadPath, filename));

		// Initialize command
		commands[name] = command(program, config);
	});

	return commands;
};