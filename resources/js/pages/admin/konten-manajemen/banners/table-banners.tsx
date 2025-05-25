import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { CheckCircle2Icon, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useDataContext } from './DataContext';
import axios from 'axios';
import { toast } from 'sonner';

type bannersItem = {
    id: number;
    heading: string;
    sub_heading: string;
    link: string;
    is_active: number;
    created_at: string;
    updated_at: string;
};

export function BannersActionTable() {
    const { banners, openEditDialogB, triggerRefetch } = useDataContext();

    const [data, setData] = useState<bannersItem[]>([]);
    useEffect(() => {
        setData(banners);
    }, [banners]);

    const handleDelete = (id: number) => {
        // Implement delete logic here
        axios.delete(`/atmin/konten-manajemen/banner/destroy/heading/${id}`)
            .then(() => {
                triggerRefetch();
                toast.success('Heading deleted successfully' );
            }).catch((error) => {
                toast.error('Failed to delete heading');
                console.error('Error deleting heading:', error);
            })
    };
    return (
        <div className="bg-background flex flex-col items-center justify-center gap-4 overflow-auto px-6 md:p-5">
            <div className="w-full">
                <h1 className="mb-2 text-center text-xl font-extrabold">Tabel Data Heading</h1>
                <Separator className="bg-primary mb-4" />
                <ScrollArea>
                    <Table className="w-full table-auto overflow-x-auto">
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[150px]">Heading</TableHead>
                                <TableHead>Sub Heading</TableHead>
                                <TableHead>Link</TableHead>
                                <TableHead className="w-[120px] text-center">Aktif</TableHead>
                                <TableHead className="w-[120px] text-center">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {data.map((item) => (
                                <TableRow key={item.id} aria-label="row" className="hover:bg-muted" >
                                    <TableCell>
                                        <p className="text-sm font-medium">{item.heading}</p>
                                    </TableCell>

                                    <TableCell>
                                        <p className="text-sm font-medium">{item.sub_heading}</p>
                                    </TableCell>

                                    <TableCell>
                                        <p className="text-sm font-medium">{item.link}</p>
                                    </TableCell>

                                    <TableCell className="space-x-2 text-center">
                                        {item.is_active === 1 ? (
                                            <Badge variant={'outline'} className="text-sm font-medium">
                                                <Icon iconNode={CheckCircle2Icon} className="mr-2 h-4 w-4 text-green-500" />
                                                Aktif
                                            </Badge>
                                        ) : (
                                            <Badge variant={'outline'} className="text-sm font-medium">
                                                <Icon iconNode={X} className="mr-2 h-4 w-4 text-red-500" />
                                                Tidak Aktif
                                            </Badge>
                                        )}
                                    </TableCell>

                                    <TableCell className="space-x-2 text-right">
                                        <Button variant="outline" size="sm" onClick={() => openEditDialogB(item)}>
                                            Edit
                                        </Button>
                                        <Button variant="destructive" size="sm" onClick={() => handleDelete(item.id)}>
                                            Delete
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    <ScrollBar orientation="horizontal" />
                </ScrollArea>
            </div>
        </div>
    );
}
