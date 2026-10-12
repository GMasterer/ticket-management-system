import { usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';

export default function FlashMessage() {
    const { flash } = usePage().props;
    const [visible, setVisible] = useState(false);
    const message = flash?.error || flash?.success;
    const isError = Boolean(flash?.error);

    useEffect(() => {
        if (!message) {
            setVisible(false);
            return;
        }
        setVisible(true);
        const timer = setTimeout(() => setVisible(false), 4000);
        return () => clearTimeout(timer);
    }, [flash]);

    if (!visible || !message) return null;

    return (
        <div
            role="alert"
            className={`fixed right-4 top-4 z-50 flex max-w-sm items-start gap-3 rounded-md px-4 py-3 text-sm text-white shadow-lg ${
                isError ? 'bg-red-600' : 'bg-green-600'
            }`}
        >
            <span>{message}</span>
            <button type="button" onClick={() => setVisible(false)} aria-label="Dismiss" className="ml-auto font-bold">
                ×
            </button>
        </div>
    );
}