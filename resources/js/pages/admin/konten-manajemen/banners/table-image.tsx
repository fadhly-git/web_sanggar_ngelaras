import { Button } from '@/components/ui/button';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { useDataContext } from './DataContext';

// Tipe untuk Image
interface ImageItem {
    id: number;
    name: string;
    path: string;
    created_at: string;
    updated_at: string;
}

export function ImageActionTable() {
    const { images, triggerRefetch } = useDataContext();
    const { openEditDialogI } = useDataContext();
    const [data, setData] = useState<ImageItem[]>([]);
    useEffect(() => {
        setData(images);
    }, [images]);
    const handleDelete = (id: number) => {
        axios
            .delete(`/atmin/konten-manajemen/banner/destroy/image/${id}`)
            .then((response) => {
                triggerRefetch();
                toast.success('Image deleted successfully' + response.data.message);
            })
            .catch((error) => {
                toast.error('Failed to delete image');
                console.error('Error deleting image:', error);
            });
    };
    return (
        <div className="bg-background flex flex-col items-center justify-center gap-4 overflow-auto px-6 md:p-5">
            <div className="w-full">
                <h1 className="mb-2 text-center text-xl font-extrabold">Tabel Data Gambar</h1>
                <Separator className="bg-primary mb-4" />
                <ScrollArea>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[150px]">Image</TableHead>
                                <TableHead>Nama</TableHead>
                                <TableHead className="w-[120px] text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {data.map((item) => (
                                <TableRow
                                    key={item.id}
                                    aria-label="row"
                                    className="hover:bg-muted cursor-pointer "
                                >
                                    <TableCell className=" gap-3">
                                        <div className="relative aspect-video h-12 w-12 overflow-hidden">
                                            <img src={`/${item.path}`} alt={item.name} className="aspect-video object-cover" />
                                        </div>
                                    </TableCell>

                                    <TableCell>
                                        <p className="text-sm font-medium">{item.name}</p>
                                    </TableCell>

                                    <TableCell className="space-x-2 text-right">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => openEditDialogI(item)}
                                            className="cursor-pointer hover:bg-blue-500"
                                        >
                                            Edit
                                        </Button>
                                        <Button
                                            variant="destructive"
                                            size="sm"
                                            onClick={() => handleDelete(item.id)}
                                            className="cursor-pointer hover:bg-red-500"
                                        >
                                            Delete
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    <ScrollBar className="bg-background" orientation="horizontal" />
                </ScrollArea>
            </div>
        </div>
    );
}
