const fs = require( 'fs' );
const { getSnippetNames } = require( './get-snippet-data' );
const { README_FILE } = require( './utils' );

const TOKEN_START = '<!-- SNIPPET-TABLE -->';
const TOKEN_END = '<!-- /SNIPPET-TABLE -->';
const TOKEN_REGEX = /(\<\!-- SNIPPET-TABLE --\>)([\s\S]*)(\<\!-- \/SNIPPET-TABLE --\>)/g;

async function generateReadMe() {
	const content = fs.readFileSync( README_FILE, 'utf-8' );
	const snippetTableContent = await generateSnippetTable();
	const enhancedContent = await updateContentWithSnippetTable( content, snippetTableContent );

	fs.writeFileSync( README_FILE, enhancedContent );
}

async function generateSnippetTable() {
	const snippetNames = await getSnippetNames();
	const data = snippetNames.map( ( name ) => {
		const snippet = `wp-${ name }`;
		const url = `https://github.com/WordPress/gutenberg/tree/master/packages/components/src/${ name }`;

		return { snippet, name, url };
	} );

	const snippetContent = data.reduce( ( markdown, item ) => {
		const { snippet, name, url } = item;
		return `${ markdown }| \`${ snippet }\` | [@wordpress/components/${ name }](${ url }) |\n`;
	}, `` );

	const snippetTableContent = `
\n
${ TOKEN_START }
<!-- This table was automatically generated -->

## Snippets

| Snippet | Component |
| --- | --- |
${ snippetContent }
${ TOKEN_END }
	`;

	return snippetTableContent.trim();
}

async function updateContentWithSnippetTable( content, snippetTableContent ) {
	let nextContent = content;
	const [ match ] = nextContent.match( TOKEN_REGEX );

	if ( ! match ) {
		nextContent += snippetTableContent;
	} else {
		nextContent = nextContent.replace( match, snippetTableContent );
	}

	return nextContent;
}

generateReadMe();
