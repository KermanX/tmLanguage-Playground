import type { GrammarInfo } from "tm-grammars";
import type { Raw } from "vue";

type OptionalGrammarInfoFields = 'sha' | 'displayName' | 'lastUpdate' | 'byteSize' | 'source'
export type Grammar = Raw<Omit<GrammarInfo, OptionalGrammarInfoFields> & Partial<Pick<GrammarInfo, OptionalGrammarInfoFields>> & {
  code: Ref<string | null>
  load: () => Promise<string>,
}>
