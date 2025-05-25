import { GuestLayout } from '@/layouts/guest-layout';
import { NewsBlog } from '@/components/guest/news';

export default function BeritaKegiatan() {
    return (
        <>
            <GuestLayout titles='Berita Kegiatan' description='Berita Kegiatan Sanggar Tari Ngesti Laras Budaya, tempat belajar seni tari tradisional Nusantara.'>
                <NewsBlog />
            </GuestLayout>
        </>
    );
}
