const fs = require( 'fs' );
const { getSnippetNames } = require( './get-snippet-data' );
const { DOC_FILE, README_FILE } = require( './utils' );

async function generateReadMe() {
	const snippetNames = await getSnippetNames();
	const data = snippetNames.map( ( name ) => {
		const snippet = `wp-${ name }`;
		const url = `https://github.com/WordPress/gutenberg/tree/master/packages/components/src/${ name }`;

		return { snippet, name, url };
	} );

	const docContent = fs.readFileSync( DOC_FILE, 'utf-8' );
	const snippetContent = data.reduce( ( markdown, item ) => {
		const { snippet, name, url } = item;
		return `${ markdown }| \`${ snippet }\` | [@wordpress/components/${ name }](${ url }) |\n`;
	}, `` );

	const snippetTableContent = `
## Snippets

| Snippet | Component |
| --- | --- |
${ snippetContent }
	`;

	const content = `${ docContent }\n${ snippetTableContent }`;

	fs.writeFileSync( README_FILE, content );
}

generateReadMe();
