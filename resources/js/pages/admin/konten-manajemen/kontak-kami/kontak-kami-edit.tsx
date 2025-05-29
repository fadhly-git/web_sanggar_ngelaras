/* eslint-disable @typescript-eslint/no-unused-vars */

import { useForm } from "@inertiajs/react";
import { useDataContext } from "./data-context";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FormEventHandler, useEffect } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import InputError from "@/components/input-error";
import { formatJamOperasionalForSubmit, JamOperasionalInput } from "./btn-edit";
import { LoaderCircle } from "lucide-react";

interface KontakKamiEditFormData {
    [key: string]: string;
    judul: string;
    deskripsi: string;
    judul_kontak: string;
    alamat: string;
    email: string;
    telepon: string;
    jam_operasional: string;
    judul_maps: string;
    maps: string;
}

export const KontakKamiEditForm = () => {
    const { kontakKami, editContactUs, triggerRefetch, handleDisabled } = useDataContext();
    const {data, setData, processing, errors, post} = useForm<KontakKamiEditFormData>({
        judul: '',
        deskripsi: '',
        judul_kontak: '',
        alamat: '',
        email: '',
        telepon: '',
        jam_operasional: '',
        judul_maps: '',
        maps: '',
    });

    useEffect(() => {
        setData({
            judul: kontakKami.judul,
            deskripsi: kontakKami.deskripsi,
            judul_kontak: kontakKami.judul_kontak,
            alamat: kontakKami.alamat,
            email: kontakKami.email,
            telepon: kontakKami.telepon,
            jam_operasional: kontakKami.jam_operasional,
            judul_maps: kontakKami.judul_maps,
            maps: kontakKami.maps,
        })
    }, [kontakKami, setData])

// atmin.konten-manajemen.kontak-kami.update
    const submit : FormEventHandler = (e) => {
        e.preventDefault();
        handleDisabled();
        data.jam_operasional = formatJamOperasionalForSubmit(data.jam_operasional);
        if (data.jam_operasional.length <= 13 ) return toast.error('Format Jam operasional tidak valid');
        post(route('atmin.konten-manajemen.kontak-kami.update'), {
            onSuccess: (res) => {
                toast.success('Data kontak kami berhasil diperbarui');
                triggerRefetch();
            },
            onError: (errors) => {
                Object.values(errors).forEach((error) => {
                    toast.error(error);
                });
            },
        });
    };

    return (
        <form className="grid gap-4" onSubmit={submit}>
            <div className="grid gap-2">
                <Label htmlFor="judul" className="text-sm font-medium">
                    Judul
                </Label>
                <Input
                    id="judul"
                    type="text"
                    disabled={!editContactUs}
                    placeholder="Judul Kontak Kami"
                    className="w-full border rounded p-2"
                    value={data.judul}
                    onChange={(e) => setData('judul', e.target.value)}
                />
                <InputError message={errors.judul} className="mt-2" />
            </div>
            <div className="grid gap-2">
                <Label htmlFor="deskripsi" className="text-sm font-medium">
                    Deskripsi
                </Label>
                <Textarea
                    id="deskripsi"
                    placeholder="Deskripsi Kontak Kami"
                    disabled={!editContactUs}
                    className="w-full border rounded p-2"
                    value={data.deskripsi}
                    onChange={(e) => setData('deskripsi', e.target.value)}
                />
                <InputError message={errors.deskripsi} className="mt-2" />
            </div>
            <div className="grid gap-2">
                <Label htmlFor="judul_kontak" className="text-sm font-medium">
                    Judul Kontak
                </Label>
                <Input
                    id="judul_kontak"
                    type="text"
                    disabled={!editContactUs}
                    placeholder="Judul Kontak Kami"
                    className="w-full border rounded p-2"
                    value={data.judul_kontak}
                    onChange={(e) => setData('judul_kontak', e.target.value)}
                />
                <InputError message={errors.judul_kontak} className="mt-2" />
            </div>
            <div className="grid gap-2">
                <Label htmlFor="alamat" className="text-sm font-medium">
                    Alamat
                </Label>
                <Input
                    id="alamat"
                    type="text"
                    disabled={!editContactUs}
                    placeholder="Alamat Kontak Kami"
                    className="w-full border rounded p-2"
                    value={data.alamat}
                    onChange={(e) => setData('alamat', e.target.value)}
                />
                <InputError message={errors.alamat} className="mt-2" />
            </div>
            <div className="grid gap-2">
                <Label htmlFor="email" className="text-sm font-medium">
                    Email
                </Label>
                <Input
                    id="email"
                    type="email"
                    placeholder="Email Kontak Kami"
                    disabled={!editContactUs}
                    className="w-full border rounded p-2"
                    value={data.email}
                    onChange={(e) => setData('email', e.target.value)}
                />
                <InputError message={errors.email} className="mt-2" />
            </div>
            <div className="grid gap-2">
                <Label htmlFor="telepon" className="text-sm font-medium">
                    Telepon
                </Label>
                <Input
                    id="telepon"
                    type="text"
                    inputMode="tel"
                    disabled={!editContactUs}
                    placeholder="Telepon Kontak Kami"
                    className="w-full border rounded p-2"
                    value={data.telepon}
                    onChange={(e) => setData('telepon', e.target.value)}
                />
                <InputError message={errors.telepon} className="mt-2" />
            </div>
            <div className="grid gap-2">
                <Label htmlFor="jam_operasional" className="text-sm font-medium">
                    Jam Operasional
                </Label>
                <JamOperasionalInput
                    onChange={(val) => {
                        console.log('Jam Operasional:', typeof data.jam_operasional);
                        setData('jam_operasional', val);
                    }}
                    value={data.jam_operasional}
                    disabled={!editContactUs}
                />
                <InputError message={errors.jam_operasional} className="mt-2" />
            </div>
            <div className="grid gap-2">
                <Label htmlFor="judul_maps" className="text-sm font-medium">
                    Judul Map
                </Label>
                <Input
                    id="judul_maps"
                    type="text"
                    disabled={!editContactUs}
                    placeholder="Judul Map Kontak Kami"
                    className="w-full border rounded p-2"
                    value={data.judul_maps}
                    onChange={(e) => setData('judul_maps', e.target.value)}
                />
                <InputError message={errors.judul_map} className="mt-2" />
            </div>
            <div className="grid gap-2">
                <Label htmlFor="maps" className="text-sm font-medium">
                    Maps
                </Label>
                <Textarea
                    id="maps"
                    placeholder="Maps Kontak Kami"
                    disabled={!editContactUs}
                    className="w-full border rounded p-2"
                    value={data.maps}
                    onChange={(e) => setData('maps', e.target.value)}
                />
                <InputError message={errors.maps} className="mt-2" />
            </div>
            <div className="flex justify-end mt-4">
                <Button
                    type="submit"
                    className="px-4 py-2  disabled:opacity-50"
                    disabled={processing || !editContactUs}
                >
                    {processing && <LoaderCircle className="mr-2 size-4 animate-spin" />}
                    Simpan
                </Button>
            </div>
        </form>
    )
}
