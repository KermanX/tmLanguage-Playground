import type { Grammar } from "~/types";

export default function (): Grammar {
  const code = JSON.stringify({
    "$schema": "https://raw.githubusercontent.com/martinring/tmlanguage/master/tmlanguage.json",
    "name": "Test",
    "scopeName": "source.test",
    "patterns": [
    ]
  }, null, 2)
  return {
    name: 'Test',
    displayName: 'Test',
    scopeName: 'source.Test',
    code: ref(code),
    load: async () => code,
  }
}
