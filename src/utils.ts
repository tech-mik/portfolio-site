export function removeIndentation(code: string) {
  const lines = code.split('\n')

  if (lines.length <= 0) return lines

  const minIndent = Math.min(
    ...lines
      .filter((line) => line.trim())
      .map((line) => {
        const match = line.match(/^(\s*)/)
        return match ? match[0].length : 0
      }),
  )

  return lines
    .map((line) => line.slice(minIndent))
    .join('\n')
    .trim()
}
