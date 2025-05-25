import { Banners } from '@/components/guest/banners';
import { GuestLayout } from '@/layouts/guest-layout';
import { BatteryCharging, GitPullRequest, Layers, RadioTower, SquareKanban, WandSparkles } from 'lucide-react';

const AboutUs: React.FC = () => {
    return (
        <>
            <GuestLayout titles="Tentang Kami" description="Selamat datang di Ngesti Laras Budaya, tempat belajar seni tari tradisional Nusantara.">
                <Banners />
                <section className="flex w-full items-center justify-center">
                    <div className="mx-auto max-w-5xl py-8">
                        <h1 className="mb-5 text-center text-3xl font-bold text-balance lg:text-center lg:text-4xl">Tentang Kami</h1>
                        <p className="text-muted-foreground mb-4 text-justify text-lg text-wrap" style={{ textIndent: '4em' }}>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam cum vero optio sed, magni cupiditate voluptatum debitis
                            illo consequatur hic pariatur in aperiam aliquam non eos error facilis esse ipsa. Vel nobis animi nihil dolore, assumenda
                            aliquid facilis consequatur excepturi maxime quod tenetur, odio voluptate perspiciatis quisquam. Ea delectus ducimus
                            corporis a! Corrupti doloribus laboriosam ex porro suscipit nulla nostrum. Iste inventore non nihil esse omnis atque culpa
                            veniam laboriosam in, deserunt officia explicabo perspiciatis quis quidem et quibusdam hic cum ad officiis voluptas.
                            Libero repudiandae iste quo ratione. Officia? Sit quas alias deleniti ratione debitis, id necessitatibus repellendus
                            aliquam nulla corporis reiciendis, natus, labore unde soluta! Eligendi a maiores mollitia cum quibusdam eius. Illo aut
                            porro exercitationem magnam voluptates. Nesciunt voluptatem animi natus veniam temporibus officia omnis veritatis ut
                            reprehenderit inventore odio deleniti asperiores cumque rem similique nihil incidunt vero quam quis atque mollitia iure,
                            illum ipsam distinctio. Atque?
                        </p>
                        <h1 className="mb-5 text-center text-3xl font-bold text-balance lg:text-center lg:text-4xl">Sejarah Berdiri</h1>
                        <p className="text-muted-foreground mb-4 text-justify text-lg text-wrap" style={{ textIndent: '4em' }}>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam cum vero optio sed, magni cupiditate voluptatum debitis
                            illo consequatur hic pariatur in aperiam aliquam non eos error facilis esse ipsa. Vel nobis animi nihil dolore, assumenda
                            aliquid facilis consequatur excepturi maxime quod tenetur, odio voluptate perspiciatis quisquam. Ea delectus ducimus
                            corporis a! Corrupti doloribus laboriosam ex porro suscipit nulla nostrum. Iste inventore non nihil esse omnis atque culpa
                            veniam laboriosam in, deserunt officia explicabo perspiciatis quis quidem et quibusdam hic cum ad officiis voluptas.
                            Libero repudiandae iste quo ratione. Officia? Sit quas alias deleniti ratione debitis, id necessitatibus repellendus
                            aliquam nulla corporis reiciendis, natus, labore unde soluta! Eligendi a maiores mollitia cum quibusdam eius. Illo aut
                            porro exercitationem magnam voluptates. Nesciunt voluptatem animi natus veniam temporibus officia omnis veritatis ut
                            reprehenderit inventore odio deleniti asperiores cumque rem similique nihil incidunt vero quam quis atque mollitia iure,
                            illum ipsam distinctio. Atque?
                        </p>
                        <h1 className="mb-5 text-center text-3xl font-bold text-balance lg:text-center lg:text-4xl">Visi dan Misi</h1>
                        <h2 className="mb-5 text-center text-xl font-bold text-balance lg:text-center lg:text-2xl">Visi</h2>
                        <p className="text-muted-foreground mb-4 text-justify text-lg text-wrap" style={{ textIndent: '4em' }}>
                            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Hic eos nostrum rerum! Commodi, provident? Modi illum ratione
                            reiciendis totam veritatis, natus laborum dolorem nisi tempore libero quia necessitatibus minima a?
                        </p>
                        <h2 className="mb-5 text-center text-xl font-bold text-balance lg:text-center lg:text-2xl">Misi</h2>
                        <Feature43 />
                    </div>
                </section>
            </GuestLayout>
        </>
    );
};

export default AboutUs;

interface Reason {
    title: string;
    description: string;
    icon: React.ReactNode;
}

interface Feature43Props {
    heading?: string;
    reasons?: Reason[];
}

const Feature43 = ({
    reasons = [
        {
            title: 'Quality',
            description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Saepe est aliquid exercitationem, quos explicabo repellat?',
            icon: <GitPullRequest className="size-6" />,
        },
        {
            title: 'Experience',
            description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Saepe est aliquid exercitationem, quos explicabo repellat?',
            icon: <SquareKanban className="size-6" />,
        },
        {
            title: 'Support',
            description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Saepe est aliquid exercitationem, quos explicabo repellat?',
            icon: <RadioTower className="size-6" />,
        },
        {
            title: 'Innovation',
            description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Saepe est aliquid exercitationem, quos explicabo repellat?',
            icon: <WandSparkles className="size-6" />,
        },
        {
            title: 'Results',
            description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Saepe est aliquid exercitationem, quos explicabo repellat?',
            icon: <Layers className="size-6" />,
        },
        {
            title: 'Efficiency',
            description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Saepe est aliquid exercitationem, quos explicabo repellat?',
            icon: <BatteryCharging className="size-6" />,
        },
    ],
}: Feature43Props) => {
    return (
        <section className="py-2 pb-12">
            <div className="container">
                <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
                    {reasons.map((reason, i) => (
                        <div key={i} className="flex flex-col items-center">
                            <div className="bg-accent hover:bg-accent/80 text-primary mb-5 flex size-16 items-center justify-center rounded-full p-4">
                                {reason.icon}
                            </div>
                            <h3 className="mb-2 text-xl font-semibold">{reason.title}</h3>
                            <p className="text-muted-foreground text-justify" style={{textIndent: '2em'}}>{reason.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export { Feature43 };
