import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { useDataContext } from './DataContext';
import { useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler } from 'react';
import { toast } from 'sonner';

type Props = {
    heading: string;
    sub_heading: string;
    link: string;
};


export const HeadingForm = () => {
    const { triggerRefetch } = useDataContext();
    const { data, setData, processing, errors, post } = useForm<Required<Props>>({
        heading: '',
        sub_heading: '',
        link: '',
    });
    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('atmin.konten-manajemen.banner.store.any',{any:'heading'}), {
            onSuccess: () =>{
                triggerRefetch();
                toast.success('Berhasil memperbarui heading');
            }, onError: () => {
                toast.error('Gagal memperbarui heading',{
                    description: String(errors.link || errors.heading || errors.sub_heading),
                });
                console.error('Error updating heading:', errors);
            }
        });
    };

    return (
        <div className="bg-background flex flex-col items-center justify-center gap-4 px-6 md:p-5">
            <div className="w-full max-w-sm">
                <h1 className="mb-2 text-center text-xl font-extrabold">Judul untuk halaman beranda</h1>
                <Separator className="mb-4 bg-primary" />
                <form className="flex flex-col gap-6" onSubmit={submit}>
                    <div className="grid gap-6">
                        <div className="grid gap-2">
                            <Label htmlFor="heading">Heading</Label>
                            <Input
                                id="heading"
                                type="text"
                                required
                                autoFocus
                                tabIndex={1}
                                autoComplete="heading"
                                value={data.heading}
                                onChange={(e) => setData('heading', e.target.value)}
                                placeholder="Heading"
                            />
                            <InputError message={errors.heading} />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="sub_heading">Sub Heading</Label>
                            <Input
                                id="sub_heading"
                                type="text"
                                required
                                autoFocus
                                tabIndex={1}
                                autoComplete="sub_heading"
                                value={data.sub_heading}
                                onChange={(e) => setData('sub_heading', e.target.value)}
                                placeholder="sub heading"
                            />
                            <InputError message={errors.sub_heading} />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="sub_heading">Link</Label>
                            <Input
                                id="Link"
                                type="link"
                                required
                                autoFocus
                                tabIndex={1}
                                autoComplete="link"
                                value={data.link}
                                onChange={(e) => setData('link', e.target.value)}
                                placeholder="link untuk bergabung"
                            />
                            <InputError message={errors.sub_heading} />
                        </div>

                        <Button type="submit" className="mt-4 w-full" tabIndex={4} disabled={processing}>
                            {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                            Simpan
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};
