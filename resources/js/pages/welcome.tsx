import { Hero7 } from '@/components/hero7';
import { BlogAbout } from '@/components/guest/blog-about';
import { ScheduleActivities } from '@/components/guest/schedule-activities';
import { NewsBlog } from '@/components/guest/news';
import { GuestLayout } from '@/layouts/guest-layout';

export default function Welcome() {
    // const { auth } = usePage<SharedData>().props;

    return (
        <>
            <GuestLayout titles='Beranda' description='Selamat datang di Ngesti Laras Budaya, tempat belajar seni tari tradisional Nusantara.'>
                <Hero7 />
                <BlogAbout />
                <ScheduleActivities />
                <NewsBlog />
            </GuestLayout>
        </>
    );
}
