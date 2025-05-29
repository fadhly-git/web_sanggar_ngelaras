/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import axios from 'axios';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'DEv',
        href: '/atmin/developing',
    },
];

export default function DEv() {
    const [open, setOpen] = useState(true);
    const [uri, setUri] = useState<string>('');
    const [data, setData] = useState<any>([]);
    const [type, setType] = useState<string>('get');
    const HandleSubmit = async () => {
        setData([]);
        if (type === 'get') {
            try {
                await axios.get('/sanctum/csrf-cookie');
                axios
                    .get(uri)
                    .then((res) => {
                        toast.success('Fetch data success');
                        setData(res.data);
                    })
                    .catch((err) => {
                        setData(err.response.data.message);
                    });
            } catch (error) {
                console.error('Error fetching CSRF token:', error);
                toast.error('Failed to fetch CSRF token');
            }
        } else if (type === 'post') {
            try {
                await axios.get('/sanctum/csrf-cookie');
                axios
                .post(uri)
                .then((res) => {
                    toast.success('Fetch data success');
                    setData(res.data);
                })
                .catch((err) => {
                    setData(err.response.data.message);
                });
            } catch (error) {
                console.error('Error fetching CSRF token:', error);
                toast.error('Failed to fetch CSRF token');
                return;
            }
        }
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.ctrlKey && event.key === 'Enter') {
            event.preventDefault();
            HandleSubmit();
        }
    };

    return (
        <AppLayout title="DEv" breadcrumbs={breadcrumbs}>
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="grid auto-rows-min gap-4 md:grid-cols-1">
                    <div className="border-sidebar-border/70 dark:border-sidebar-border relative h-fit place-content-start rounded-xl border">
                        <div className="mx-auto gap-2 p-4">
                            <h2 className="text-xl font-black">Fetch Data Api Json</h2>
                            <Input type="link" value={uri} onChange={(e) => setUri(e.target.value)} placeholder="masukkan uri" onKeyDown={handleKeyDown} />
                            <div className="mt-2 grid gap-2">
                                <Label htmlFor="type">Type</Label>
                                <Select value={type} onValueChange={setType}>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select a type route" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectLabel>type route</SelectLabel>
                                            <SelectItem value="post">post</SelectItem>
                                            <SelectItem value="get">get</SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="mt-5 flex w-full justify-end">
                                <Button type="submit" size={'sm'} onClick={HandleSubmit}>
                                    Fetch
                                </Button>
                            </div>
                        </div>
                    </div>
                    <div className="border-sidebar-border/70 dark:border-sidebar-border relative h-fit place-content-center rounded-xl border">
                        <div className="p-4">
                            <Collapsible open={open} onOpenChange={setOpen}>
                                <div className="flex items-center justify-between">
                                    <CollapsibleTrigger asChild>
                                        <button className="mb-2 flex items-center gap-2 justify-between w-full">
                                            <span className="font-bold">Lihat Hasil Data JSON</span>
                                            <ChevronDown className={`transition-transform ${open ? 'rotate-180' : ''}`} />
                                        </button>
                                    </CollapsibleTrigger>
                                </div>
                                <CollapsibleContent>
                                    <pre className="text-pretty break-words whitespace-pre-wrap">{JSON.stringify(data, null, 2)}</pre>
                                </CollapsibleContent>
                            </Collapsible>
                        </div>
                    </div>
                    <div className="border-sidebar-border/70 dark:border-sidebar-border relative h-fit place-content-center rounded-xl border">
                        <div className="p-4">
                            <CodeRunner data={data} />
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}

interface CodeRunnerWithDataProps {
    data: any;
}

export function CodeRunner({ data }: CodeRunnerWithDataProps) {
    const [code, setCode] = useState<string>('');
    const [output, setOutput] = useState<string>('');

    const handleRun = () => {
        try {
            // Membuat fungsi baru dengan variabel 'data' tersedia di scope
            // Kode yang diinput user harus return sesuatu atau gunakan 'data' langsung
            const fn = new Function('data', `"use strict";\n${code}`);
            const result = fn(data);
            if (typeof result === 'object') {
                setOutput(JSON.stringify(result, null, 2));
            } else {
                setOutput(String(result));
            }
        } catch (e: any) {
            setOutput('Error: ' + e.message);
        }
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (event.ctrlKey && event.key === 'Enter') {
            event.preventDefault();
            handleRun();
        }
    };

    return (
        <div className="my-4">
            <h2 className="mb-2 font-bold">Kode Editor (JS)</h2>
            <Textarea
                rows={8}
                className="mb-2"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={`Contoh: return data.length;\natau: return data[0]?.title;`}
            />
            <Button
                size={'sm'}
                onClick={handleRun}
            >
                Run
            </Button>
            <div className="mt-2">
                <label className="font-bold">Output:</label>
                <div className="border-sidebar-border/70 dark:border-sidebar-border relative h-fit place-content-center rounded-xl border">
                    <div className="p-4">
                        <pre className="bg-muted mt-1 rounded p-2 text-pretty break-words whitespace-pre-wrap">{output}</pre>
                    </div>
                </div>
            </div>
        </div>
    );
}


