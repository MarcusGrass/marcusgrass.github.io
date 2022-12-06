/// More or less straight copied from https://github.com/wooorm/starry-night, see that license here https://github.com/wooorm/starry-night/blob/c73aac7b8bff41ada86747f668dd932a791b851b/notice
import fs from 'node:fs/promises'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import rehypeStringify from 'rehype-stringify'
import {unified} from 'unified'
/**
 * @typedef {import('hast').Root} Root
 * @typedef {import('hast').ElementContent} ElementContent
 * @typedef {import('@wooorm/starry-night').Grammar} Grammar
 *
 * @typedef Options
 *   Configuration (optional)
 * @property {Array<Grammar>} [grammars]
 *   Grammars to support (defaults: `common`).
 */
import {common, createStarryNight} from '@wooorm/starry-night'
import {visit} from 'unist-util-visit'
import {toString} from 'hast-util-to-string'

/**
 * Plugin to highlight code with `starry-night`.
 *
 * @type {import('unified').Plugin<[Options?], Root>}
 */
function rehypeStarryNight(options = {}) {
    const grammars = options.grammars || common
    const starryNightPromise = createStarryNight(grammars)
    const prefix = 'language-'

    return async function (tree) {
        const starryNight = await starryNightPromise

        visit(tree, 'element', function (node, index, parent) {
            if (!parent || index === null || node.tagName !== 'pre') {
                return
            }

            const head = node.children[0]

            if (
                !head ||
                head.type !== 'element' ||
                head.tagName !== 'code' ||
                !head.properties
            ) {
                return
            }

            const classes = head.properties.className

            if (!Array.isArray(classes)) return

            const language = classes.find(
                (d) => typeof d === 'string' && d.startsWith(prefix)
            )

            if (typeof language !== 'string') return

            const scope = starryNight.flagToScope(language.slice(prefix.length))

            // Maybe warn?
            if (!scope) return

            const fragment = starryNight.highlight(toString(head), scope)
            const children = /** @type {Array<ElementContent>} */ (fragment.children)

            parent.children.splice(index, 1, {
                type: 'element',
                tagName: 'div',
                properties: {
                    className: [
                        'highlight',
                        'highlight-' + scope.replace(/^source\./, '').replace(/\./g, '-')
                    ]
                },
                children: [{type: 'element', tagName: 'pre', properties: {}, children}]
            })
        })
    }
}

const file_path = process.argv[2];
const file = await unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(rehypeStarryNight)
    .use(rehypeStringify)
    .process(await fs.readFile(file_path))
console.log(String(file));