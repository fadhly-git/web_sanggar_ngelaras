/* eslint-disable @typescript-eslint/no-unused-vars */
import InputError from '@/components/input-error';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import { toast } from 'sonner';
import { useDataContext } from './data-context';
import { DialogEditFaqs } from './edit-faq';
import { LoaderCircle } from 'lucide-react';

interface FaqsFormData {
    [key: string]: string | number | boolean;
    question: string;
    answer: string;
    is_active: number;
}

export const AddFaqs = () => {
    const { addFaqs, handleAddFaqs, faqs, triggerRefetch, editFaqsHandler, handlefaqsData } = useDataContext();
    const { data, setData, post, errors, processing } = useForm<FaqsFormData>({
        question: '',
        answer: '',
        is_active: 1,
    });

    // console.log('AddFaqs', Array.isfaqs);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        if (!data.question || !data.answer) {
            toast.error('Pertanyaan dan jawaban tidak boleh kosong');
            return;
        }

        post(route('atmin.konten-manajemen.kontak-kami.store-faqs'), {
            onSuccess: () => {
                toast.success('FAQ berhasil ditambahkan');
                triggerRefetch();
                setData({
                    question: '',
                    answer: '',
                    is_active: 1,
                });
            },
            onError: () => {
                toast.error('Terjadi kesalahan saat menambahkan FAQ');
                console.error('Error adding FAQ:', errors);
            },
        });
    };

    return (
        <>
        <DialogEditFaqs />
            {addFaqs ? (
                <form className="grid gap-4" onSubmit={submit}>
                    <div className="grid gap-2">
                        <Label htmlFor="question" className="text-sm font-medium">
                            Pertanyaan
                        </Label>
                        <Input
                            id="question"
                            type="text"
                            placeholder="Pertanyaan yang sering diajukan"
                            className="w-full rounded border p-2"
                            value={data.question}
                            onChange={(e) => setData('question', e.target.value)}
                        />
                        <InputError message={errors.question} className="mt-2" />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="answer" className="text-sm font-medium">
                            Jawaban
                        </Label>
                        <Input
                            id="answer"
                            type="text"
                            placeholder="Jawaban untuk pertanyaan"
                            className="w-full rounded border p-2"
                            value={data.answer}
                            onChange={(e) => setData('answer', e.target.value)}
                        />
                        <InputError message={errors.answer} className="mt-2" />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="is_active" className="text-sm font-medium">
                            Aktif
                        </Label>
                        <Switch id="is_active" checked={data.is_active === 1} onCheckedChange={(checked) => setData('is_active', checked ? 1 : 0)} />
                        <InputError message={errors.is_active} className="mt-2" />
                    </div>
                    <div className="flex justify-end">
                        <Button type="button" variant="secondary" onClick={handleAddFaqs} className="mr-2">
                            Batal
                        </Button>
                        <Button type="submit"> {processing && <LoaderCircle className="mr-2 size-4 animate-spin" />}Simpan</Button>
                    </div>
                </form>
            ) : (
                <Accordion type="single" collapsible className="mx-auto w-full">
                    {faqs.map((item) => (
                        <AccordionItem key={item.id} value={item.id.toString()}>
                            <AccordionTrigger className="transition-opacity duration-200 hover:no-underline hover:opacity-60">
                                <div className={`font-medium sm:py-1 lg:py-2 lg:text-lg ${item.is_active ? 'text-primary' : 'text-red-500'}`}>{item.question}</div>
                            </AccordionTrigger>
                            <AccordionContent className="sm:mb-1 lg:mb-2">
                                <div className="text-muted-foreground lg:text-lg">{item.answer}</div>
                                <p className="text-sm text-gray-500">Status: {item.is_active ? 'Aktif' : 'Tidak Aktif'}</p>
                                <Button className='w-full mt-2' size={'sm'} variant={'outline'} onClick={() => {
                                    editFaqsHandler();
                                    handlefaqsData({
                                        id: item.id,
                                        question: item.question,
                                        answer: item.answer,
                                        is_active: item.is_active,
                                    });
                                }}>Edit</Button>
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            )}
        </>
    );
};
