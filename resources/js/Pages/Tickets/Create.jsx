import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import TicketForm from '@/Components/TicketForm';
import { Head, useForm } from '@inertiajs/react';

export default function Create({ options }) {
    const form = useForm({
        title: '',
        description: '',
        priority: 'Medium',
        status: 'Open',
        category: '',
    });

    function submit(e) {
        e.preventDefault();
        form.post(route('tickets.store'));
    }

    return (
        <AuthenticatedLayout header={<h2 className="text-xl font-semibold leading-tight text-gray-800">New Ticket</h2>}>
            <Head title="New Ticket" />
            <div className="py-8">
                <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
                    <div className="rounded-lg bg-white p-6 shadow">
                        <TicketForm
                            form={form}
                            options={options}
                            onSubmit={submit}
                            submitLabel="Create Ticket"
                            cancelHref={route('tickets.index')}
                        />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}