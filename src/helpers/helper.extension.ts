export const extensionSupport = (ext: string): boolean => {
  return ['image/png', 'image/jpeg', 'image/gif', 'image/webp'].includes(ext)
}
