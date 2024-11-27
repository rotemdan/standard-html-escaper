import { htmlEntitiesTable } from './HtmlEntitiesTable.js'

export function escapeHtml(text: string) {
	return text.replaceAll(
		/[&<>"']/g,
		(char) => htmlEscapeLookup[char]
	)
}

const htmlEscapeLookup: Record<string, string> = {
	'&': '&amp;',
	'<': '&lt;',
	'>': '&gt;',
	"'": '&#39;',
	'"': '&quot;'
}

export function unescapeHtml(escapedText: string, options?: UnescapeHtmlOptions) {
	function replacer(escapeCode: string) {
		if (escapeCode.startsWith('&#')) {
			const nextChar = escapeCode[2]

			let codepoint: number

			if (nextChar === 'x' || nextChar === 'X') {
				// Parse as hexadecimal character string
				const hexString = escapeCode.substring(3, escapeCode.length - 1)

				codepoint = parseInt(hexString, 16)
			} else {
				// Parse as decimal character string
				const decimalString = escapeCode.substring(2, escapeCode.length - 1)

				codepoint = parseInt(decimalString)
			}

			if (isNaN(codepoint)) {
				if (options?.strict) {
					throw new Error(`Couldn't unescape invalid numeric escape code '${escapeCode}'`)
				} else {
					return escapeCode
				}
			}

			if (codepoint < 0 || codepoint > 1114111) {
				if (options?.strict) {
					throw new Error(`Codepoint ${codepoint} is outside the accepted range of 0 to 1114111 (inclusive)`)
				} else {
					return escapeCode
				}
			}

			return String.fromCodePoint(codepoint)
		} else {
			const matchingChars = htmlEntitiesTable[escapeCode]?.characters

			if (matchingChars === undefined) {
				if (options?.strict) {
					throw new Error(`Couldn't unescape unrecognized escape code '${escapeCode}'`)
				} else {
					return escapeCode
				}
			}

			return matchingChars
		}
	}

	let regExp: RegExp

	if (options?.strict) {
		regExp = /&.*?;/g
	} else {
		regExp = /&(?:[a-zA-Z0-9]+|#[0]*[0-9]{1,7}|#[xX][0]*[0-9a-fA-F]{1,6});/g
	}

	return escapedText.replaceAll(
		regExp,
		replacer
	)
}

export { htmlEntitiesTable } from './HtmlEntitiesTable.js'

interface UnescapeHtmlOptions {
	strict?: boolean
}
