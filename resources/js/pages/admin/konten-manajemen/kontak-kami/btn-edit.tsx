import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useDataContext } from './data-context';

export const BtnAdd = () => {
    const { addFaqs, handleAddFaqs, disabled } = useDataContext();

    return (
        <Button type="button" className="btn btn-primary" onClick={handleAddFaqs} disabled={disabled}>
            {addFaqs ? 'Batal' : 'Tambah FAQ'}
        </Button>
    );
};

export const BtnEdit = () => {
    const { editContactUs, handleContactUsEdit, disabled } = useDataContext();

    const handleClick = () => {
        if (editContactUs) {
            handleContactUsEdit();
        } else {
            handleContactUsEdit();
        }
    };

    return (
        <Button type="button" className="btn btn-primary" onClick={handleClick} disabled={disabled}>
            {editContactUs ? 'Kembali' : 'Edit'}
        </Button>
    );
};

interface JamOperasional {
    value: string;
    onChange: (val: string) => void;
    disabled?: boolean;
}

/**
 * Format input to HH:MM - HH:MM or HH:MM - selesai
 * - Only allow numeric input, auto add ":" and " - " as needed
 */
export const formatJamOperasional = (input: string) => {
    // Hanya angka
    const numbers = input.replace(/\D/g, '');
    if (!numbers) return '';

    if (numbers.length <= 2) {
        return numbers;
    }
    if (numbers.length <= 4) {
        return `${numbers.slice(0, 2)}:${numbers.slice(2)}`;
    }
    // Jika lebih dari 4 digit, misal 10001100 -> 10:00 - 11:00
    if (numbers.length <= 8) {
        const start = `${numbers.slice(0, 2)}:${numbers.slice(2, 4)}`;
        const rest = numbers.slice(4);
        if (rest.length === 0) {
            return `${start} - `;
        }
        if (rest.length <= 2) {
            return `${start} - ${rest}`;
        }
        return `${start} - ${rest.slice(0, 2)}:${rest.slice(2)}`;
    }
    return input;
};

export const JamOperasionalInput: React.FC<JamOperasional> = ({ value, onChange, disabled }) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const formatted = formatJamOperasional(e.target.value);
        if (formatted.length > 13) return;
        onChange(formatted);
    };

    return (
        <>
            <Input
                id="jam_operasional"
                type="text"
                disabled={disabled}
                placeholder="Jam Operasional Kontak Kami"
                className="w-full rounded border p-2"
                value={value}
                onChange={handleChange}
                autoComplete="off"
            />
            <p className="text-primary mt-1 text-xs">
                Input hanya <span className="font-extrabold">Angka</span>. Format: HH:mm - HH:mm (contoh: 08:00 - 17:00). leave blank untuk jam
                selesai.
            </p>
        </>
    );
};

export function formatJamOperasionalForSubmit(jam: string): string {
    const trimmed = jam.trim();
    // Jika hanya HH:MM, tambahkan " - selesai"
    if (/^\d{2}:\d{2}$/.test(trimmed)) {
        return trimmed + ' - selesai';
    }
    // Jika format "hh:mm -", tambahkan "selesai"
    if (/^\d{2}:\d{2} -$/.test(trimmed) || /^\d{2}:\d{2} - $/.test(trimmed)) {
        return trimmed + 'selesai';
    }
    // Jika format sudah benar, return seperti apa adanya
    if (/^\d{2}:\d{2} - (\d{2}:\d{2}|selesai)$/.test(trimmed)) {
        return trimmed;
    }
    // Tambahkan validasi lain sesuai kebutuhan
    return trimmed;
}
