// path/to/DataContext.tsx
import axios from 'axios';
import { createContext, useContext, useEffect, useState } from 'react';
import { toast } from 'sonner';

// Tipe untuk Banner
interface Banner {
    id: number;
    heading: string;
    sub_heading: string;
    link: string;
    is_active: number;
    created_at: string;
    updated_at: string;
}

// Tipe untuk Image
interface Image {
    id: number;
    name: string;
    path: string;
    created_at: string;
    updated_at: string;
}

// Tipe untuk DataContext
interface DataContextType {
    banners: Banner[];
    images: Image[];
    triggerRefetch: () => void;
    openEditDialogB: (banner: Banner) => void; // Fungsi untuk membuka dialog
    openEditDialogI: (img: Image) => void;
    dialogStateI: {
        openImg: boolean;
        selectedImg: Image | null;
    };
    dialogStateB: {
        openBnr: boolean;
        selectedBanner: Banner | null;
    };
    closeDialogB: () => void; // Fungsi untuk menutup dialog
    closeDialogI: () => void; // Fungsi untuk menutup dialog
}

// Buat context
export const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider = ({ children }: { children: React.ReactNode }) => {
    const [banners, setBanners] = useState<Banner[]>([]);
    const [images, setImages] = useState<Image[]>([]);
    const [refetchTrigger, setRefetchTrigger] = useState(0);
    const [dialogStateI, setDialogStateI] = useState<{
        openImg: boolean;
        selectedImg: Image | null;
    }>({ openImg: false, selectedImg: null });
    const [dialogStateB, setDialogStateB] = useState<{
        openBnr: boolean;
        selectedBanner: Banner | null;
    }>({ openBnr: false, selectedBanner: null });

    // Fetch data
    const fetchData = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_APP_API_URL}/hero-data`);
            setBanners(response.data.banners);
            setImages(response.data.images);
        } catch (error) {
            toast.error('Failed to fetch data');
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, [refetchTrigger]);

    const triggerRefetch = () => {
        setRefetchTrigger((prev) => prev + 1);
    };

    // Fungsi untuk membuka dialog
    const openEditDialogI = (img: Image) => {
        setDialogStateI({ openImg: true, selectedImg: img });
    };

    // Fungsi untuk membuka dialog
    const openEditDialogB = (banner: Banner) => {
        setDialogStateB({ openBnr: true, selectedBanner: banner });
    };

    // Fungsi untuk menutup dialog
    const closeDialogI = () => {
        setDialogStateI({ openImg: false, selectedImg: null });
    };

    // Fungsi untuk menutup dialog
    const closeDialogB = () => {
        setDialogStateB({ openBnr: false, selectedBanner: null });
    };

    return (
        <DataContext.Provider value={{ banners, images, triggerRefetch, openEditDialogB, openEditDialogI, dialogStateI, dialogStateB, closeDialogI, closeDialogB }}>{children}</DataContext.Provider>
    );
};

// Custom hook
export const useDataContext = () => {
    const context = useContext(DataContext);
    if (!context) {
        throw new Error('useDataContext must be used within a DataProvider');
    }
    return context;
};
