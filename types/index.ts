import type { GrammarInfo } from "tm-grammars"

type OptionalGrammarInfoFields = 'sha' | 'displayName' | 'lastUpdate' | 'byteSize' | 'source'
export type Grammar = Omit<GrammarInfo, OptionalGrammarInfoFields> & Partial<Pick<GrammarInfo, OptionalGrammarInfoFields>> & {
  code: string | null
  load: () => Promise<string> 
  isBuiltin: boolean
}
