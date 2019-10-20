import path from 'path';

let constants = {
    CONFIG_PATH: ''
};

let config_name = '.nodevault.json';
if (process.platform == 'win32') {
    constants.CONFIG_PATH = path.join(process.env.USERPROFILE!, config_name);
} else if (process.platform == 'darwin') {
    constants.CONFIG_PATH = path.join(process.env.HOME!, config_name);
} else {
    throw new Error('ERROR: This program is unsupported on this operating system.');
}

export default Object.freeze( constants );