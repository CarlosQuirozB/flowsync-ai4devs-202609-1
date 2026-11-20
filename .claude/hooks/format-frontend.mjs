// PostToolUse hook: formatea con Prettier los archivos de frontend/ que Claude edita o crea.
import { spawnSync } from 'node:child_process'
import { existsSync, realpathSync } from 'node:fs'
import { basename, extname, relative, resolve, sep } from 'node:path'

const EXTENSIONS = new Set(['.ts', '.tsx', '.js', '.jsx', '.mjs', '.css'])
// Archivos de configuración de Prettier: nunca se formatean ni se cargan desde el archivo editado
const CONFIG_NAME = /^(\.prettierrc.*|prettier\.config\..*)$/

let raw = ''
for await (const chunk of process.stdin) raw += chunk

let input
try {
  input = JSON.parse(raw)
} catch {
  process.exit(0)
}

const filePath = input?.tool_input?.file_path
if (typeof filePath !== 'string' || !filePath) process.exit(0)

const projectDir = resolve(process.env.CLAUDE_PROJECT_DIR ?? input.cwd ?? process.cwd())
const frontendDir = resolve(projectDir, 'frontend')

if (!existsSync(filePath)) process.exit(0)
// realpath resuelve symlinks: un enlace dentro de frontend/ hacia fuera no pasa el filtro
const target = realpathSync(filePath)
const rel = relative(realpathSync(frontendDir), target)

const outside = rel === '..' || rel.startsWith('..' + sep) || resolve(rel) === rel
if (outside) process.exit(0)
if (rel.split(sep).some((p) => p === 'node_modules' || p === 'dist')) process.exit(0)
if (!EXTENSIONS.has(extname(target).toLowerCase()) || CONFIG_NAME.test(basename(target))) {
  process.exit(0)
}

const bin = resolve(frontendDir, 'node_modules', 'prettier', 'bin', 'prettier.cjs')
if (!existsSync(bin)) {
  console.error('format-frontend: prettier no está instalado (cd frontend && npm install)')
  process.exit(0)
}

// Config fija: evita que un prettier.config.* o .prettierrc creado junto al archivo ejecute código
const result = spawnSync(
  process.execPath,
  [
    bin,
    '--write',
    '--no-color',
    '--log-level',
    'warn',
    '--config',
    resolve(frontendDir, '.prettierrc.json'),
    '--no-editorconfig',
    target,
  ],
  { cwd: frontendDir, encoding: 'utf8', timeout: 20000 },
)

if (result.error || result.status !== 0) {
  // Código 2: el stderr vuelve a Claude para que corrija el problema
  console.error(
    result.error?.message || result.stderr || result.stdout || 'format-frontend: Prettier falló',
  )
  process.exit(2)
}
