import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { CalendarRangeIcon, MapPinnedIcon, Banknote } from 'lucide-react';
import { Icon } from '../ui/icon';

const ScheduleActivities = () => {
    return (
        <section className="flex w-full items-center justify-center">
            <div className="container flex flex-col items-center gap-16">
                <div className="max-w-5xl bg-muted-2 grid items-center gap-8 lg:grid-cols-2">
                    <div className="flex flex-col items-center text-start lg:items-start lg:text-left">
                        {/* <p>New Release</p> */}
                        <h1 className="my-6 text-3xl font-bold text-pretty lg:text-4xl">Jadwal Kegiatan</h1>
                        <div className="mb-8">
                            <p className="text-muted-foreground max-w-xl mb-2 lg:text-lg text-wrap">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                            <div className="flex items-center space-x-4">
                                <Icon iconNode={CalendarRangeIcon} className="text-muted-foreground" />
                                <p className="text-muted-foreground max-w-xl lg:text-lg">Setiap Minggu pukul 08:00 A.M - selesai</p>
                            </div>
                            <div className="flex items-center space-x-4">
                                <Icon iconNode={MapPinnedIcon} className="text-muted-foreground" />
                                <p className="text-muted-foreground max-w-xl lg:text-lg">GSG Desa Meteseh</p>
                            </div>
                            <div className="flex items-center space-x-4">
                                <Icon iconNode={Banknote} className="text-muted-foreground" />
                                <p className="text-muted-foreground max-w-xl lg:text-lg">Rp10.000</p>
                            </div>
                        </div>
                        <div className="flex w-full flex-col justify-center gap-2 sm:flex-row lg:justify-start">
                            <Button size={'sm'} className='text-center w-fit'>
                                Maps <ArrowRight className="size-4" />
                            </Button>
                        </div>
                    </div>
                    <img
                        src='https://shadcnblocks.com/images/block/placeholder-dark-1.svg'
                        className="h-full w-full object-cover rounded-2xl "
                    />
                </div>
            </div>
        </section>
    );
};

export { ScheduleActivities };
