/* eslint-disable @typescript-eslint/no-unused-vars */
import axios from "axios";

import { createContext, useContext, useEffect, useState } from "react";

export interface NewsData {
    id: number;
    title: string;
    summary: string;
    content: string;
    author: string;
    published_at: string;
    image: string;
    is_active: number;
    tags: string[];
    slug: string;
    created_at: string;
    updated_at: string;
}

interface NewsContextType {
    news: NewsData[];
    triggerRefetch: () => void;
}
export const NewsContext = createContext<NewsContextType | undefined>(undefined);

export const NewsProvider = ({ children }: { children: React.ReactNode }) => {
    const [news, setNews] = useState<NewsData[]>([]);
    const [refetchTrigger, setRefetchTrigger] = useState(0);

    const fetchNews = async () => {
        try {
            const response = await axios.get('/api/news-items-data');
            setNews(response.data);
        } catch (error) {
            console.error('Error fetching news:', error);
        }
    };

    useEffect(() => {
        fetchNews();
    }, [refetchTrigger]);

    const triggerRefetch = () => {
        setRefetchTrigger(prev => prev + 1);
    };

    return (
        <NewsContext.Provider value={{ news, triggerRefetch }}>
            {children}
        </NewsContext.Provider>
    );
};
