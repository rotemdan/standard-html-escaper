import { escapeHtml, unescapeHtml } from "./Exports.js";

function test1() {
	const escapedHtml = escapeHtml(`
	Hello "BABA" <YO>! 'Hi'
	`)

	console.log(escapedHtml)
	console.log(unescapeHtml(escapedHtml))

	const unescapedHtml = unescapeHtml(`Hello &#-111; yo`)


	console.log(unescapedHtml)
}

test1()
