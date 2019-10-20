interface Dictionary {
    [key: string]: any;
}

class KeyValueStore {

    private _keyed_values: Dictionary;

    constructor(data: Dictionary) {
        this._keyed_values = data;
    }

    get(key: string): any {
        return this._keyed_values[key];
    }

    getKeys(): string[] {
        return Object.keys(this._keyed_values);
    }

    set(key: string, value: any): void {
        this._keyed_values[key] = value;
    }

    delete(key: string): void {
        delete this._keyed_values[key];
    }

    toString(): string {
        return JSON.stringify(this._keyed_values);
    }
}

export {Dictionary, KeyValueStore};