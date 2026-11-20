// PostToolUse hook: formatea con Prettier los archivos de frontend/ que Claude edita o crea.
import { spawnSync } from 'node:child_process'
import { existsSync } from 'node:fs'
import { extname, relative, resolve, sep } from 'node:path'

const EXTENSIONS = new Set(['.ts', '.tsx', '.js', '.jsx', '.mjs', '.json', '.css', '.html', '.md'])

let raw = ''
for await (const chunk of process.stdin) raw += chunk

let input
try {
  input = JSON.parse(raw)
} catch {
  process.exit(0)
}

const filePath = input?.tool_input?.file_path
if (!filePath) process.exit(0)

const projectDir = resolve(process.env.CLAUDE_PROJECT_DIR ?? input.cwd ?? process.cwd())
const frontendDir = resolve(projectDir, 'frontend')
const target = resolve(filePath)
const rel = relative(frontendDir, target)

// Solo archivos dentro de frontend/ (y no en node_modules/dist), con extensión soportada
if (rel.startsWith('..') || resolve(rel) === rel) process.exit(0)
if (rel.split(sep).some((p) => p === 'node_modules' || p === 'dist')) process.exit(0)
if (!EXTENSIONS.has(extname(target)) || !existsSync(target)) process.exit(0)

const bin = resolve(frontendDir, 'node_modules', 'prettier', 'bin', 'prettier.cjs')
if (!existsSync(bin)) {
  console.error('format-frontend: prettier no está instalado (cd frontend && npm install)')
  process.exit(0)
}

const result = spawnSync(process.execPath, [bin, '--write', '--log-level', 'warn', target], {
  cwd: frontendDir,
  encoding: 'utf8',
})
if (result.status !== 0) {
  // Código 2: el stderr vuelve a Claude para que corrija el error de sintaxis
  console.error(result.stderr || result.stdout)
  process.exit(2)
}
