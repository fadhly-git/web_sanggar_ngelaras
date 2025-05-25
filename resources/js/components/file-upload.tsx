import axios from 'axios';
import { ChangeEvent, useCallback, useRef, useState } from 'react';

interface UploadedFile {
    id: string;
    name: string;
    progress: number;
    status: 'pending' | 'uploading' | 'completed' | 'failed';
    file: File;
}

const FileUploader = () => {
    const [files, setFiles] = useState<UploadedFile[]>([]);
    const [isDragging, setIsDragging] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Generate unique ID untuk setiap file
    const generateId = () => Math.random().toString(36).substring(2, 9);

    // Handle ketika file dipilih via input biasa
    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const newFiles = Array.from(e.target.files).map((file) => ({
                id: generateId(),
                name: file.name,
                progress: 0,
                status: 'pending' as const,
                file,
            }));
            setFiles((prev) => [...prev, ...newFiles]);
        }
    };

    // Handle drag events
    const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(true);
    };

    const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
    };

    // Handle ketika file di-drop
    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);

        if (e.dataTransfer.files) {
            const newFiles = Array.from(e.dataTransfer.files).map((file) => ({
                id: generateId(),
                name: file.name,
                progress: 0,
                status: 'pending' as const,
                file,
            }));
            setFiles((prev) => [...prev, ...newFiles]);
        }
    };

    // Upload file ke backend Laravel
    const uploadFile = useCallback(async (fileData: UploadedFile) => {
        const formData = new FormData();
        formData.append('file', fileData.file);
        // Anda bisa menambahkan field lain jika diperlukan
        // formData.append('additional_field', 'value');

        try {
            setFiles((prev) => prev.map((f) => (f.id === fileData.id ? { ...f, status: 'uploading' } : f)));

            const response = await axios.post('/api/upload', formData, {
                onUploadProgress: (progressEvent) => {
                    if (progressEvent.total) {
                        const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                        setFiles((prev) => prev.map((f) => (f.id === fileData.id ? { ...f, progress } : f)));
                    }
                },
                headers: {
                    'Content-Type': 'multipart/form-data',
                    // 'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content'),
                },
            });

            setFiles((prev) => prev.map((f) => (f.id === fileData.id ? { ...f, status: 'completed', progress: 100 } : f)));

            return response.data;
        } catch (error) {
            setFiles((prev) => prev.map((f) => (f.id === fileData.id ? { ...f, status: 'failed' } : f)));
            console.error('Upload error:', error);
            throw error;
        }
    }, []);

    // Handle upload semua file
    const handleUploadAll = async () => {
        const pendingFiles = files.filter((f) => f.status === 'pending');
        for (const file of pendingFiles) {
            await uploadFile(file);
        }
    };

    // Hapus file dari list
    const handleRemoveFile = (id: string) => {
        setFiles((prev) => prev.filter((f) => f.id !== id));
    };

    // Trigger click pada input file yang tersembunyi
    const handleButtonClick = () => {
        fileInputRef.current?.click();
    };

    return (
        <div className="mx-auto max-w-2xl p-6">
            <h2 className="mb-4 text-xl font-semibold">Upload Files</h2>

            {/* Drop Zone */}
            <div
                className={`mb-4 rounded-lg border-2 border-dashed p-8 text-center transition-colors ${
                    isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-400'
                }`}
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
            >
                <div className="flex flex-col items-center justify-center space-y-2">
                    <svg className="h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                        ></path>
                    </svg>
                    <p className="text-gray-600">{isDragging ? 'Drop files here' : 'Drag & drop files here or'}</p>
                    <button type="button" onClick={handleButtonClick} className="font-medium text-blue-600 hover:text-blue-800">
                        browse files
                    </button>
                    <p className="text-sm text-gray-500">Supports multiple files</p>
                </div>
                <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" multiple />
            </div>

            {/* File List */}
            {files.length > 0 && (
                <div className="mb-4 space-y-3">
                    <div className="flex items-center justify-between">
                        <h3 className="font-medium">Selected Files ({files.length})</h3>
                        <button
                            onClick={handleUploadAll}
                            disabled={files.every((f) => f.status !== 'pending')}
                            className={`rounded-md px-4 py-2 text-white ${
                                files.every((f) => f.status !== 'pending') ? 'cursor-not-allowed bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'
                            }`}
                        >
                            Upload All
                        </button>
                    </div>

                    <ul className="divide-y divide-gray-200 rounded-lg border">
                        {files.map((file) => (
                            <li key={file.id} className="p-3">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-3 truncate">
                                        <div>
                                            {file.status === 'completed' ? (
                                                <svg className="h-5 w-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                                </svg>
                                            ) : file.status === 'failed' ? (
                                                <svg className="h-5 w-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                                </svg>
                                            ) : (
                                                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth="2"
                                                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                                    />
                                                </svg>
                                            )}
                                        </div>
                                        <span className="truncate">{file.name}</span>
                                    </div>
                                    <div className="flex items-center space-x-3">
                                        {file.status === 'uploading' && <span className="text-sm text-gray-500">{file.progress}%</span>}
                                        <button onClick={() => handleRemoveFile(file.id)} className="text-red-500 hover:text-red-700">
                                            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                                />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                                {file.status === 'uploading' && (
                                    <div className="mt-2 h-2.5 w-full rounded-full bg-gray-200">
                                        <div className="h-2.5 rounded-full bg-blue-600" style={{ width: `${file.progress}%` }}></div>
                                    </div>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default FileUploader;
