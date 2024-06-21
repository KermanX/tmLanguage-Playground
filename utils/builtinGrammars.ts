import { grammars } from 'tm-grammars'
import type { Grammar } from '~/types'

const builtinGrammars: Grammar[] = grammars.map(info => {
  const code = ref<string | null>(null)
  return markRaw({
    ...info,
    code,
    load: async () => {
      return code.value ??= (await import(`../node_modules/tm-grammars/grammars/${info.name}.json?raw`)).default
    },
  })
})

export default builtinGrammars
