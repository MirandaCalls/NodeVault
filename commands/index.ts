import fs from 'fs';
import path from 'path';
import { CommanderStatic, Command } from 'commander';

interface CommandMap {
    [ key: string ]: Command;
}

export default function commandLoader( program: CommanderStatic ) {
	'use strict';

	let commands: CommandMap = {};
	let loadPath = path.dirname( __filename );

	// Loop though command files
	fs.readdirSync( loadPath ).filter( function ( filename ) {
		return ( /\.js$/.test( filename ) && filename !== 'index.js' );
	} ).forEach( function ( filename ) {
		let name: string = filename.substr( 0, filename.lastIndexOf( '.' ) );

		// Require command
		let command = require( path.join( loadPath, filename ) );

		// Initialize command
		commands[ name ] = command( program );
	});

	return commands;
};