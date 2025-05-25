import { useState } from 'react';
import axios from 'axios';
import  { FileUploader, UploadedFile } from './file-upload';
import { useDataContext } from './data-context';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { XIcon } from 'lucide-react';

const FileUploadPage = () => {
    const {uploadtrue} = useDataContext();
    const {is_true, id_title} = uploadtrue;
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  console.log('is_true', is_true);
    console.log('id_title', id_title);

  // Handle upload ke backend Laravel
  const handleUpload = async () => {
    if (uploadedFiles.length === 0) return;

    setIsUploading(true);
    setUploadProgress(0);

    try {
      const formData = new FormData();

      // Tambahkan semua file ke FormData
      uploadedFiles.forEach((file) => {
        formData.append('files[]', file.file);
      });

      // Tambahkan data tambahan jika diperlukan
        formData.append('id_title', String(id_title));

      // Update status file menjadi uploading
      setUploadedFiles(prev =>
        prev.map(f => ({
          ...f,
          status: 'uploading'
        }))
      );

      const response = await axios.post(`/atmin/konten-manajemen/galeri/${id_title}/upload-files`, formData, {
        onUploadProgress: (progressEvent) => {
          if (progressEvent.total) {
            const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            setUploadProgress(progress);

            // Update progress per file
            setUploadedFiles(prev =>
              prev.map(f => ({
                ...f,
                progress: progress
              }))
            );
          }
        },
        headers: {
          'Content-Type': 'multipart/form-data',
          'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content'),
        },
      });

      // Update status file menjadi completed
      setUploadedFiles(prev =>
        prev.map(f => ({
          ...f,
          status: 'completed',
          progress: 100
        }))
      );

      toast.success('File berhasil diupload!',{
        description: response.data.message,
      });
    } catch (error) {
      console.error('Upload gagal:', error);

      // Update status file menjadi failed
      setUploadedFiles(prev =>
        prev.map(f => ({
          ...f,
          status: 'failed',
          error: 'Gagal mengupload file'
        }))
      );

      toast.error('Terjadi kesalahan saat mengupload file');
    } finally {
      setIsUploading(false);
    }
  };

  // Hapus file yang sudah diupload
  const handleRemoveUploaded = (id: string) => {
    setUploadedFiles(prev => prev.filter(f => f.id !== id));
  };

  return (
    <div className="container mx-auto p-6" aria-disabled>

      {/* Komponen File Uploader */}
      <FileUploader
        supportedFiles={['image/jpeg', 'image/png', 'image/jpg' ]}
        multiple={true}
        maxFiles={5}
        maxSize={10 * 1024 * 1024} // 10MB
        onFilesChange={setUploadedFiles}
      />

      {/* Tombol Upload */}
      <div className="mt-2 flex justify-between items-center">
        <div>
          {isUploading && (
            <span className="text-blue-600">
              Mengupload... {uploadProgress}%
            </span>
          )}
        </div>

        <Button
          onClick={handleUpload}
          size={'sm'}
          disabled={isUploading || uploadedFiles.length === 0 || is_true === false}
          className={`${
            isUploading || uploadedFiles.length === 0 || is_true === false
              ? 'bg-gray-500 cursor-not-allowed text-primary'
              : ' hover:bg-primary/80'
          }`}
        >
          {isUploading ? 'Uploading...' : 'Upload Files'}
        </Button>
      </div>

      {/* Preview File yang Sudah Diupload */}
      {uploadedFiles.some(f => f.status === 'completed') && (
        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-4">File Terupload</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {uploadedFiles
              .filter(f => f.status === 'completed')
              .map(file => (
                <div key={file.id} className="border p-4 rounded-lg flex justify-between items-center w-full">
                  <div className="flex items-center space-x-3">
                    <FileIcon type={file.type} />
                    <span className="truncate text-sm">{file.name}</span>
                  </div>
                  <Button
                  size={'icon'}
                    onClick={() => handleRemoveUploaded(file.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <XIcon />
                  </Button>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

// Komponen kecil untuk menampilkan icon berdasarkan tipe file
const FileIcon = ({ type }: { type: string }) => {
  const iconClass = "w-6 h-6";

  if (type.startsWith('image/')) {
    return (
      <svg className={`${iconClass} text-blue-500`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    );
  }

  if (type.includes('pdf')) {
    return (
      <svg className={`${iconClass} text-red-500`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    );
  }

  if (type.includes('word') || type.includes('document')) {
    return (
      <svg className={`${iconClass} text-blue-600`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    );
  }

  if (type.includes('excel') || type.includes('spreadsheet')) {
    return (
      <svg className={`${iconClass} text-green-600`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    );
  }

  return (
    <svg className={`${iconClass} text-gray-500`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
  );
};

export default FileUploadPage;
