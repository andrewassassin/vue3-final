/**
 * Vite 不支援 require()，改用 import.meta.glob 取得靜態資源 URL
 * 供動態檔名（如 @/assets/img/xxx.jpg）使用
 */
const imgModules = import.meta.glob('@/assets/img/*', { eager: true, import: 'default' })

export function getImgUrl(filename) {
  const entry = Object.entries(imgModules).find(([path]) => path.endsWith('/' + filename))
  return entry ? entry[1] : ''
}
