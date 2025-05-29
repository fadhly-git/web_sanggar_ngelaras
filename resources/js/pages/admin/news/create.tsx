export const Create = () => {
    return (
        <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
            <div className="border-sidebar-border/70 dark:border-sidebar-border rounded-xl border">
                <div className="border-sidebar-border/70 dark:border-sidebar-border relative m-2 h-fit place-content-start rounded-xl border">
                    <div className="mx-auto flex w-full flex-row gap-2 p-4">
                        <div className="flex w-full items-center justify-start">
                            <h2 className="text-xl font-black">Tambah Berita</h2>
                        </div>
                    </div>
                </div>
                <div className="border-sidebar-border/70 dark:border-sidebar-border relative m-2 h-fit place-content-start rounded-xl border">
                    <div className="mx-auto flex w-full flex-col gap-2 p-4">{/* Form to create news item will go here */}</div>
                </div>
            </div>
        </div>
    );
};
