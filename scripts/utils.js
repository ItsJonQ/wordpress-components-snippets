const path = require( 'path' );

const ROOT_DIR = path.resolve( __dirname, '../' );
const DATA_DIR = path.join( ROOT_DIR, '/data' );
const DATA_FILES = path.join( DATA_DIR, '*.snip' );

const PKG_DIR = path.join( ROOT_DIR, '/packages/' );
const VSCODE_SNIPPETS_DIR = path.join( PKG_DIR, '/vscode/snippets' );
const VSCODE_SNIPPETS_FILE = path.join( VSCODE_SNIPPETS_DIR, '/javascript.json' );

module.exports = {
	ROOT_DIR,
	DATA_DIR,
	DATA_FILES,
	PKG_DIR,
	VSCODE_SNIPPETS_DIR,
	VSCODE_SNIPPETS_FILE,
};
