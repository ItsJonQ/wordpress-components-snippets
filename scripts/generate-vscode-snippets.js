const fs = require( 'fs' );
const mkdirp = require( 'mkdirp' );
const { getSnippetData } = require( './get-snippet-data' );

const { VSCODE_SNIPPETS_DIR, VSCODE_SNIPPETS_FILE } = require( './utils' );

async function generateVSCodeSnippets() {
	const data = await getSnippetData();
	const snippetData = data.reduce( ( map, item ) => {
		const { name, body, prefix } = item;
		map[ name ] = {
			prefix,
			body,
		};
		return map;
	}, {} );

	const content = JSON.stringify( snippetData, null, 2 );

	mkdirp.sync( VSCODE_SNIPPETS_DIR );

	fs.writeFileSync( VSCODE_SNIPPETS_FILE, content );
}

generateVSCodeSnippets();
