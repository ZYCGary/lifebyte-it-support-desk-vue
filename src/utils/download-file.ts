const downloadFile = (file: BlobPart, filename: string) => {
  const url = window.URL.createObjectURL(new Blob([file]))
  const a = document.createElement('a')
  a.href = url
  a.setAttribute('download', filename)
  document.body.appendChild(a)
  a.click()
  a.remove()
}

export default downloadFile
