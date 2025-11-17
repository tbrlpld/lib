interface Props {
  filename?: string,
  content: string,
  mimeType?: string,
}


export function download ({
  content,
  filename = 'file.txt',
  mimeType = 'text/plain',
}: Props): void {
  const downloadLink = document.createElement('a')
  downloadLink.href = `data:${ mimeType },${ encodeURIComponent(content) }`
  downloadLink.download = filename
  downloadLink.click()
}
