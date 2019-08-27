const path = require( 'path' );

const ROOT_DIR = path.resolve( __dirname, '../' );
const DATA_DIR = path.join( ROOT_DIR, '/data' );
const DATA_FILES = path.join( DATA_DIR, '*.snip' );

const PKG_DIR = path.join( ROOT_DIR, '/packages/' );
const VSCODE_SNIPPETS_DIR = path.join( PKG_DIR, '/vscode/snippets' );
const VSCODE_SNIPPETS_FILE = path.join( VSCODE_SNIPPETS_DIR, '/snippets.json' );

const DOC_FILE = path.join( ROOT_DIR, '/docs/README.md' );
const README_FILE = path.join( ROOT_DIR, '/README.md' );

module.exports = {
	ROOT_DIR,
	DATA_DIR,
	DATA_FILES,
	PKG_DIR,
	VSCODE_SNIPPETS_DIR,
	VSCODE_SNIPPETS_FILE,
	DOC_FILE,
	README_FILE,
};
