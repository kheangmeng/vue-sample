import { ref, onUnmounted, watch } from 'vue'

export function useSingleUploadFile() {
  const file = ref<File | null>(null)
  const objUrl = ref<string>()
  const error = ref<Error | null>(null)
  const status = ref<'idle' | 'uploading' | 'finished'>('idle')

  onUnmounted(() => {
    if (objUrl.value) {
      URL.revokeObjectURL(objUrl.value)
    }
  })

  watch(file, (newFile) => {
    if (newFile) {
      objUrl.value = URL.createObjectURL(newFile)
    } else {
      objUrl.value = undefined
    }
  })

  const handleFileChange = (event: Event) => {
    const target = event.target as HTMLInputElement
    if (target.files && target.files.length > 0) {
      file.value = target.files[0]
    }
  }

  const uploadFile = async (uploadUrl: string) => {
    if (!file.value) {
      error.value = new Error('No file selected')
      return
    }

    status.value = 'uploading'
    const formData = new FormData()
    formData.append('file', file.value)

    try {
      const response = await fetch(uploadUrl, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: formData,
      })
      if (!response.ok) {
        throw new Error(`Upload failed with status ${response.status}`)
      }
      status.value = 'finished'
      await response.json()
    } catch (err) {
      error.value = err as Error
      status.value = 'idle'
    }
  }

  return {
    file,
    objUrl,
    error,
    status,
    handleFileChange,
    uploadFile,
  }
}

export function useMultiUploadFiles() {
  const files = ref<File[]>([])
  const objUrls = ref<string[]>([])
  const error = ref<Error | null>(null)
  const status = ref<'idle' | 'uploading' | 'finished'>('idle')

  onUnmounted(() => {
    if (objUrls.value) {
      objUrls.value.forEach((url) => URL.revokeObjectURL(url))
    }
  })

  watch(files, (newFiles) => {
    if (newFiles) {
      objUrls.value = newFiles.map((f) => URL.createObjectURL(f))
    } else {
      objUrls.value = []
    }
  })

  const handleFilesChange = (event: Event) => {
    const target = event.target as HTMLInputElement
    if (target.files && target.files.length > 0) {
      files.value = Array.from(target.files)
    }
  }

  const uploadFiles = async (uploadUrl: string) => {
    if (files.value.length === 0) {
      error.value = new Error('No files selected')
      return
    }

    status.value = 'uploading'
    const formData = new FormData()
    files.value.forEach((file) => {
      formData.append('files', file)
    })

    try {
      const response = await fetch(uploadUrl, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: formData,
      })

      if (!response.ok) {
        throw new Error(`Upload failed with status ${response.status}`)
      }

      status.value = 'finished'
      await response.json()
    } catch (err) {
      error.value = err as Error
      status.value = 'idle'
    }
  }

  return {
    files,
    objUrls,
    error,
    status,
    handleFilesChange,
    uploadFiles,
  }
}
