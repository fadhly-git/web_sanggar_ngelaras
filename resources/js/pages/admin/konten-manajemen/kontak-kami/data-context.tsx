import axios from 'axios';
import { createContext, useContext, useEffect, useState } from 'react';

export interface Faqs {
    // Define the structure of a FAQ item

    id: number;
    question: string;
    answer: string;
    is_active: number;
}

interface KontakKami {
    judul: string;
    deskripsi: string;
    judul_kontak: string;
    alamat: string;
    email: string;
    telepon: string;
    jam_operasional: string;
    judul_maps: string;
    maps: string;
}

export type typeDataEditFaqs = {
    id: number;
    question: string;
    answer: string;
    is_active: number;
};

interface DataContextType {
    kontakKami: KontakKami;
    editContactUs: boolean;
    addFaqs: boolean;
    disabled: boolean;
    editFaqs: boolean;
    dataEditFaqs: typeDataEditFaqs;
    handlefaqsData: (item: typeDataEditFaqs) => void;
    editFaqsHandler: () => void;
    handleDisabled: () => void;
    handleAddFaqs: () => void;
    handleContactUsEdit: () => void;
    faqs: Faqs[];
    triggerRefetch: () => void;
}

export const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider = ({ children }: { children: React.ReactNode }) => {
    const [refetchTrigger, setRefetchTrigger] = useState(0);
    const [disabled, setDisabled] = useState(false);
    const [editFaqs, setEditFaqs] = useState(false);
    const [editContactUs, setEditContactUs] = useState(false);
    const [addFaqs, setAddFaqs] = useState(false);
    const [faqs, setFaqs] = useState<Faqs[]>([]);
    const [dataEditFaqs, setDataEditFaqs] = useState<typeDataEditFaqs>({
        id: 0,
        question: '',
        answer: '',
        is_active: 0,
    });
    const [kontakKami, setKontakKami] = useState<KontakKami>({
        judul: '',
        deskripsi: '',
        judul_kontak: '',
        alamat: '',
        email: '',
        telepon: '',
        jam_operasional: '',
        judul_maps: '',
        maps: '',
    });

    const handleDisabled = () => {
        setDisabled((prev) => !prev);
    };

    const handleAddFaqs = () => {
        setAddFaqs((prev) => !prev);
    };

    const handlefaqsData = (item: typeDataEditFaqs) => {
        setDataEditFaqs({
            id: item.id,
            question: item.question,
            answer: item.answer,
            is_active: item.is_active,
        });
    };

    const handleContactUsEdit = () => {
        setEditContactUs((prev) => !prev);
    };

    const editFaqsHandler = () => {
        setEditFaqs((prev) => !prev);
    };

    const fetchKontakKami = async () => {
        try {
            const response = await axios.get('/api/contact-us-data');
            setKontakKami(response.data.kontak_kami);
            setFaqs(response.data.faqs);
        } catch (error) {
            console.error('Error fetching kontak kami data:', error);
        }
    };
    useEffect(() => {
        fetchKontakKami();
    }, [refetchTrigger]);

    const triggerRefetch = () => {
        setRefetchTrigger((prev) => prev + 1);
    };

    return (
        <DataContext.Provider
            value={{
                kontakKami,
                faqs,
                triggerRefetch,
                editContactUs,
                handleContactUsEdit,
                addFaqs,
                handleAddFaqs,
                disabled,
                handleDisabled,
                editFaqs,
                editFaqsHandler,
                dataEditFaqs,
                handlefaqsData,
            }}
        >
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
