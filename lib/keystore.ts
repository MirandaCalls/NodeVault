import { existsSync, readFileSync, statSync, writeFileSync } from 'fs';

interface Dictionary {
    [ key: string ]: any;
}

export default class KeyValueStore {

    private _keyed_values: Dictionary;

    constructor( data: Dictionary ) {
        this._keyed_values = data;
    }

    get( key: string ): any {
        return this._keyed_values[ key ];
    }

    set( key: string, value: any ): void {
        this._keyed_values[ key ] = value;
    }

    toString() {
        return JSON.stringify( this._keyed_values );
    }

    static loadFromFile( filePath: string ) {
        if ( !existsSync( filePath ) || !statSync( filePath ).isFile() ) {
            throw Error( 'Invalid file path specified: ' + filePath );
        }

        let content: string = readFileSync( filePath ).toString();
        let data = JSON.parse( content );
        return new KeyValueStore( data );
    }

    static saveToFile( filePath: string, valueStore: KeyValueStore ) {
        writeFileSync( filePath, valueStore.toString() );
    }
}