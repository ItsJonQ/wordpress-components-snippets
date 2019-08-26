const fs = require( 'fs' );
const glob = require( 'glob' );
const matter = require( 'gray-matter' );

const { DATA_FILES } = require( './utils' );

async function getSnippetData() {
	const files = glob.sync( DATA_FILES );
	const data = files.map( getDataFromFile );

	return data;
}

function getDataFromFile( file ) {
	const fileContent = fs.readFileSync( file, 'utf-8' );
	const markdownData = matter( fileContent );
	const { content: originalContent, data } = markdownData;
	const { slug } = data;
	const content = transformContent( originalContent );
	const body = content.split( '\n' );
	const prefix = `wp-${ slug }`;

	const name = `wordpress-components-${ slug }`;

	return {
		...markdownData,
		...data,
		name,
		content,
		prefix,
		command: prefix,
		body,
	};
}

function transformContent( content ) {
	return content.trim();
}

exports.getSnippetData = getSnippetData;
