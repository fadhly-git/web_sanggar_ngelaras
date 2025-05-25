import axios from 'axios';
import { createContext, useContext, useEffect, useState } from 'react';
import { toast } from 'sonner';

interface GalleryItem {
    id: number;
    galeri_model_id: number;
    item_title: string | null;
    img_path: string;
    created_at: string;
    updated_at: string;
}

interface Gallery {
    id: number;
    title: string;
    deskripsi: string;
    created_at: string;
    updated_at: string;
    items: GalleryItem[];
}

interface DataContextType {
    gallery: Gallery[]; // Update to array
    handleIsTrue: (id_title: number) => void;
    handleIsFalse: () => void;
    uploadtrue: {
        is_true: boolean;
        id_title: number;
    };
    trigerRefetch: () => void;
}

export const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider = ({ children }: { children: React.ReactNode }) => {
    const [gallery, setGallery] = useState<Gallery[]>([]); // Initialize as an empty array

    const fetchData = async () => {
        try {
            const response = await axios.get('/api/gallery-data');
            toast.success('Berhasil mengambil data galeri');
            setGallery(response.data); // Expect the response to be an array
        } catch (error) {
            toast.error('Gagal mengambil data galeri');
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const trigerRefetch = () => {
        fetchData();
    };

    const [uploadtrue, setUploadTrue] = useState({
        is_true: false,
        id_title: 0,
    });

    const handleIsTrue = (id_title: number) => {
        setUploadTrue({
            is_true: true,
            id_title: id_title,
        });
    };
    const handleIsFalse = () => {
        setUploadTrue({
            is_true: false,
            id_title: 0,
        });
    };

    return (
        <DataContext.Provider value={{ gallery, uploadtrue, trigerRefetch, handleIsTrue, handleIsFalse }}>
            {children}
        </DataContext.Provider>
    );
};

export const useDataContext = () => {
    const context = useContext(DataContext);
    if (!context) {
        throw new Error('useDataContext must be used within a DataProvider');
    }
    return context;
};
