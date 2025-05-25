import axios from 'axios';
import { createContext, useContext, useEffect, useState } from 'react';
import { toast } from 'sonner';

interface Misi {
    id: number;
    about_id: number;
    icon: string;
    deskripsi: string;
    urutan: number;
    created_at: string;
    updated_at: string;
}

interface AboutUs{
    id: number;
    img_banner: string;
    tentang_kami: string;
    summary: string;
    sejarah: string;
    visi: string;
    misi: Misi[];
    created_at: string;
    updated_at: string;
}

interface DataContextType {
    aboutUs: AboutUs;
    closeDialog: () => void;
    openDialogHandlerImg: (img: string) => void;
    DialogState:{
        open: boolean;
        selectedImg: string;
    }
    triggerRefetch: () => void;
}

export const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider = ({ children }: { children: React.ReactNode }) => {

    const [DialogState, setDialogState] = useState({
        open: false,
        selectedImg: '',
    });
    const closeDialog = () => {
        setDialogState({
            open: false,
            selectedImg: '',
        });
    };
    const openDialogHandlerImg = (img: string) => {
        setDialogState({
            open: true,
            selectedImg: img,
        });
    };
    const [aboutUs, setAboutUs] = useState<AboutUs>({
        id: 0,
        img_banner: '',
        tentang_kami: '',
        summary: '',
        sejarah: '',
        visi: '',
        misi: [],
        created_at: '',
        updated_at: '',
    });
    const [refetchTrigger, setRefetchTrigger] = useState(0);
    //fetch data
    const fetchData = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_APP_API_URL}/about-us-data`);
            setAboutUs(response.data.aboutUs);
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

    return (
        <DataContext.Provider value={{ aboutUs, DialogState, openDialogHandlerImg, closeDialog, triggerRefetch }}>
            {children}
        </DataContext.Provider>
    );
}

export const useDataContext = () => {
    const context = useContext(DataContext);
    if (!context) {
        throw new Error('useDataContext must be used within a DataProvider');
    }
    return context;
};
