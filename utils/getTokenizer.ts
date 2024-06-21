import { getHighlighter } from 'shiki'
import type { Grammar } from '~/types'

export default async function (grammar: Grammar, dark: boolean) {
  const theme = dark ? 'vitesse-dark' : 'vitesse-light'
  const parsed = JSON.parse(grammar.code.value!)
  parsed.name = grammar.name
  const highlighter = await getHighlighter({
    themes: [theme],
    langs: [parsed],
  })

  return (code: string) => highlighter.codeToTokensBase(code, {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    lang: grammar.name as any,
    theme: theme,
    includeExplanation: true,
  })
}
