import path from 'path'

const UNKNOWN_PATH = 'UNKNOWN'
const INDEX_FILENAME = 'index.ts'

export function getModuleLabel(module: NodeModule) {
  const parts = module.filename.split(path.sep)
  const filename = parts[parts.length - 1] ?? UNKNOWN_PATH
  const dir = parts[parts.length - 2] ?? UNKNOWN_PATH
  const fullName = `${dir}/${filename}`
  return filename === INDEX_FILENAME ? dir : fullName
}
