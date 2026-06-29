import { useState, useRef } from 'react'
import { Upload, X, Loader } from 'lucide-react'
import api, { imgUrl } from '../api/axios'

export default function ImageUpload({ value, onChange }) {
  const [uploading, setUploading] = useState(false)
  const inputRef = useRef(null)

  const handleFile = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    try {
      const form = new FormData()
      form.append('file', file)
      const res = await api.post('/api/admin/upload', form)
      onChange(res.data.url)
    } catch {
      alert('Upload failed')
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="flex items-center gap-3">
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFile}
      />
      {value ? (
        <div className="relative">
          <img src={imgUrl(value)} alt="preview" className="w-20 h-20 rounded-lg object-cover border" />
          <button
            type="button"
            onClick={() => onChange('')}
            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-0.5"
          >
            <X size={14} />
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className="flex items-center gap-2 px-4 py-2 border border-dashed border-gray-300 rounded-lg text-sm text-gray-500 hover:border-amber-500 hover:text-amber-600 transition-colors disabled:opacity-50"
        >
          {uploading ? <Loader size={16} className="animate-spin" /> : <Upload size={16} />}
          {uploading ? 'Uploading...' : 'Upload Image'}
        </button>
      )}
    </div>
  )
}
