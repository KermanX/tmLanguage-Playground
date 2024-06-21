import { grammars } from 'tm-grammars'
import type { Grammar } from '~/types'

const builtinGrammars: Grammar[] = grammars.map(info => {
  const project = reactive({
    ...info,
    code: null,
    load: async () => {
      return project.code ??= (await import(`../node_modules/tm-grammars/grammars/${info.name}.json?raw`)).default
    },
    isBuiltin: true,
  })
  return project
})

export const useGrammarsStore = defineStore('grammars', {
  state: () => ({
    projects: [] as Grammar[],
    builtins: builtinGrammars,
    active: builtinGrammars.find(g => g.name === 'javascript')!
  }),
  actions: {
    createProject() {
      const id = this.projects.filter(p => /^test\d$/i.test(p.name)).length + 1
      const code = JSON.stringify({
        name: `test${id}`,
        scopeName: `source.test${id}`,
        patterns: [
        ]
      }, null, 2)
      const project = {
        name: `test${id}`,
        displayName: `Test ${id}`,
        scopeName: `source.test${id}`,
        code,
        load: async () => code,
        isBuiltin: false,
      }
      this.projects.push(project)
      this.active = project
    },
    deleteProject(toDelete: Grammar) {
      this.projects = this.projects.filter(p => p !== toDelete)
    },
    deleteAllProjects() {
      if (confirm('Are you sure you want to delete all projects?'))
        this.projects = []
    },
  }
})
