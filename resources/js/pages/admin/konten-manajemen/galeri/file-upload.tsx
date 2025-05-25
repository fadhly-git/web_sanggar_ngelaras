import { ChangeEvent, useRef, useState } from 'react';

interface FileUploaderProps {
    supportedFiles?: string[]; // ['image/*', '.pdf', '.docx']
    multiple?: boolean;
    maxFiles?: number;
    maxSize?: number; // dalam bytes
    onFilesChange?: (files: UploadedFile[]) => void;
}

export interface UploadedFile {
    id: string;
    name: string;
    size: number;
    type: string;
    progress: number;
    status: 'pending' | 'uploading' | 'completed' | 'failed';
    file: File;
    error?: string;
}

const FileUploader = ({
    supportedFiles = [],
    multiple = false,
    maxFiles = 10,
    maxSize = 10 * 1024 * 1024, // 10MB
    onFilesChange,
}: FileUploaderProps) => {
    const [files, setFiles] = useState<UploadedFile[]>([]);
    const [isDragging, setIsDragging] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const generateId = () => Math.random().toString(36).substring(2, 9);

    // Validasi file
    const validateFile = (file: File): { valid: boolean; error?: string } => {
        if (file.size > maxSize) {
            return {
                valid: false,
                error: `File terlalu besar (maksimal ${maxSize / 1024 / 1024}MB)`,
            };
        }

        if (supportedFiles.length > 0) {
            const isSupported = supportedFiles.some((pattern) => {
                if (pattern.startsWith('.')) {
                    return file.name.toLowerCase().endsWith(pattern.toLowerCase());
                }
                return new RegExp(`^${pattern.replace(/\*/g, '.*').replace(/\./g, '\\.')}$`, 'i').test(file.type);
            });

            if (!isSupported) {
                return {
                    valid: false,
                    error: `Tipe file tidak didukung. Harus: ${supportedFiles.join(', ')}`,
                };
            }
        }

        return { valid: true };
    };

    // Tambah file ke state dengan type yang tepat
    const addFiles = (newFiles: File[]) => {
        const validatedFiles = newFiles.map((file) => {
            const validation = validateFile(file);
            const status: 'pending' | 'failed' = validation.valid ? 'pending' : 'failed';

            return {
                id: generateId(),
                name: file.name,
                size: file.size,
                type: file.type,
                progress: 0,
                status,
                file,
                error: validation.error,
            };
        });

        setFiles((prev) => {
            const updatedFiles = multiple ? [...prev, ...validatedFiles] : [validatedFiles[0]];
            const limitedFiles = updatedFiles.slice(0, maxFiles);

            if (onFilesChange) {
                onFilesChange(limitedFiles);
            }

            return limitedFiles;
        });
    };

    // Handle file input change
    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            addFiles(Array.from(e.target.files));
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

    // Handle file drop
    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);

        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            addFiles(Array.from(e.dataTransfer.files));
        }
    };

    // Hapus file dari list
    const handleRemoveFile = (id: string) => {
        setFiles((prev) => {
            const updatedFiles = prev.filter((f) => f.id !== id);
            if (onFilesChange) {
                onFilesChange(updatedFiles);
            }
            return updatedFiles;
        });
    };

    // Trigger click pada input file
    const handleButtonClick = () => {
        fileInputRef.current?.click();
    };

    return (
        <div className="mx-auto w-full p-6 cursor-pointer">
            {/* Drop Zone */}
            <div
                className={`mb-4 rounded-lg border-2 border-dashed p-8 text-center transition-colors ${
                    isDragging ? 'border-primary bg-blue-50' : 'border-gray-300 hover:border-primary'
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
                        />
                    </svg>
                    <p className="text-gray-600">{isDragging ? 'Drop files here' : 'Drag & drop files here or'}</p>
                    <button type="button" onClick={handleButtonClick} className="font-medium text-primary hover:text-primary-foreground cursor-pointer">
                        browse files
                    </button>
                    <p className="text-sm text-gray-500">
                        {supportedFiles.length > 0 ? `Supported files: ${supportedFiles.join(', ')}` : 'All files supported'}
                        {maxSize && ` (Max ${maxSize / 1024 / 1024}MB each)`}
                    </p>
                    {multiple && maxFiles > 1 && <p className="text-sm text-gray-500">Max {maxFiles} files</p>}
                </div>
                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    className="hidden"
                    multiple={multiple}
                    accept={supportedFiles.join(',')}
                />
            </div>

            {/* File List */}
            {files.length > 0 && (
                <div className="mb-4 space-y-3">
                    <div className="">
                        <div className="flex items-center justify-between">
                            <h3 className="font-medium">
                                Selected Files ({files.length} {maxFiles > 1 ? `of ${maxFiles}` : ''})
                            </h3>
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
                                                ) : file.status === 'uploading' ? (
                                                    <svg
                                                        className="h-5 w-5 animate-spin text-blue-500"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth="2"
                                                            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                                                        />
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
                                            <div className="min-w-0">
                                                <p className="truncate">{file.name}</p>
                                                <p className="text-xs text-gray-500">
                                                    {(file.size / 1024).toFixed(2)} KB • {file.type}
                                                </p>
                                                {file.error && <p className="text-xs text-red-500">{file.error}</p>}
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => handleRemoveFile(file.id)}
                                            className="text-red-500 hover:text-red-700"
                                            disabled={file.status === 'uploading'}
                                        >
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
                                    {file.status === 'uploading' && (
                                        <div className="mt-2 h-2.5 w-full rounded-full bg-gray-200">
                                            <div className="h-2.5 rounded-full bg-blue-600" style={{ width: `${file.progress}%` }} />
                                        </div>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
};

export {FileUploader};
