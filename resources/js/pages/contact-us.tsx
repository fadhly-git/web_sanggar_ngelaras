import { Faq } from '@/components/guest/faq';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { GuestLayout } from '@/layouts/guest-layout';
import { Clock8Icon, LocateFixed, Mail, Phone } from 'lucide-react';
import { useRef, useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';

export default function ContactUs() {
    const recaptchaRef = useRef(null);
    const [recaptchaToken, setRecaptchaToken] = useState('');
    return (
        <>
            <GuestLayout titles="Kontak Kami" description="Kontak Sanggar Tari Ngesti Laras Budaya, tempat belajar seni tari tradisional Nusantara.">
                <section className="flex items-center justify-center py-32">
                    <div className="container w-full">
                        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-10 lg:flex-row lg:gap-20">
                            <div className="mx-auto flex max-w-sm flex-col justify-between gap-10">
                                <div className="text-center lg:text-left">
                                    <h1 className="mb-2 text-2xl font-semibold lg:mb-1 lg:text-4xl">Kontak Kami</h1>
                                    <p className="text-muted-foreground">
                                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa provident ex non repellat itaque sequi
                                        blanditiis iusto, eligendi esse nisi voluptate vel praesentium consequatur officia modi quis, quod vitae
                                        ullam!
                                    </p>
                                </div>
                                <div className="mx-auto w-fit lg:mx-0">
                                    <h3 className="mb-6 text-center text-2xl font-semibold lg:text-left">Informasi Kontak</h3>
                                    <ul className="">
                                        <li>
                                            <span className="inline-flex items-center gap-2 font-bold">
                                                <Icon iconNode={LocateFixed} />
                                                Alamat: <span className="font-medium">Jl. Seni Rupa No. 45, Jakarta Selatan</span>
                                            </span>
                                        </li>
                                        <li>
                                            <span className="inline-flex items-center gap-2 font-bold">
                                                <Icon iconNode={Phone} />
                                                Telepon: <span className="font-medium">+62 812 3456 7890</span>
                                            </span>
                                        </li>
                                        <li>
                                            <span className="inline-flex items-center gap-2 font-bold">
                                                <Icon iconNode={Mail} />
                                                Email:{' '}
                                                <a href="mailto:kontak@ngelaras.my.id">
                                                    <span className="font-medium">kontak@ngelaras.my.id</span>
                                                </a>
                                            </span>
                                        </li>
                                        <li>
                                            <span className="inline-flex items-center gap-2 font-bold">
                                                <Icon iconNode={Clock8Icon} />
                                                Jam Operasional: <span className="font-medium">Minggu, 08:00 - selesai</span>
                                            </span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="mx-auto flex max-w-screen-md flex-col gap-6 rounded-lg border p-10">
                                <div className="flex gap-4">
                                    <div className="grid w-full items-center gap-1.5">
                                        <Label htmlFor="firstname">Nama Depan</Label>
                                        <Input type="text" id="firstname" placeholder="Nama Depan" />
                                    </div>
                                    <div className="grid w-full items-center gap-1.5">
                                        <Label htmlFor="lastname">Nama Belakang</Label>
                                        <Input type="text" id="lastname" placeholder="Nama Belakang" />
                                    </div>
                                </div>
                                <div className="grid w-full items-center gap-1.5">
                                    <Label htmlFor="email">Email</Label>
                                    <Input type="email" id="email" placeholder="Email" />
                                </div>
                                <div className="grid w-full items-center gap-1.5">
                                    <Label htmlFor="subject">Subjek</Label>
                                    <Input type="text" id="subject" placeholder="Subjek" />
                                </div>
                                <div className="grid w-full gap-1.5">
                                    <Label htmlFor="message">Pesan</Label>
                                    <Textarea className="max-w-md" placeholder="Ketik pesanmu disini" id="message" />
                                </div>
                                <ReCAPTCHA
                                    ref={recaptchaRef}
                                    onChange={(token) => setRecaptchaToken(token ?? '')}
                                    size='normal'
                                    onExpired={() => setRecaptchaToken('')}
                                    onErrored={() => setRecaptchaToken('')}
                                    className="mb-4"
                                    sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
                                />
                                <Button className="w-full">Kirim Pesan</Button>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="flex items-center justify-center py-12">
                    <div className="container w-full">
                        <div className="mx-auto max-w-6xl flex-col justify-between gap-10 lg:flex-row lg:gap-20">
                            <h2 className="mb-6 text-center text-2xl font-semibold lg:text-left">Lokasi Kami</h2>
                            <EmbeddedMap
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d839.6301244173891!2d110.27196191644695!3d-7.090612624554932!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7063ba76ad3c47%3A0xb8f6192dbdceeea!2sGedung%20Serbaguna%20Desameteseh!5e0!3m2!1sid!2sid!4v1747387980763!5m2!1sid!2sid"
                                title="Lokasi Sanggar Tari Ngesti Laras Budaya"
                            />
                        </div>
                    </div>
                </section>
                <Faq
                    heading="Frequently asked questions"
                    description="Find answers to common questions about our products. Can't find what you're looking for? Contact our support team."
                />
            </GuestLayout>
        </>
    );
}

interface EmbeddedMapProps {
    src: string;
    title?: string;
    width?: string | number;
    height?: string | number;
}

const EmbeddedMap: React.FC<EmbeddedMapProps> = ({ src, title = 'Lokasi Sanggar Tari', width = '100%', height = '450' }) => {
    return (
        <div style={{ width: '100%', overflow: 'hidden', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
            <iframe
                title={title}
                src={src}
                width={width}
                height={height}
                style={{ border: 0, width: '100%', height }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
        </div>
    );
};
export { EmbeddedMap };
