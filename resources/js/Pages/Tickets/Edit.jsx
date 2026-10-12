import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import TicketForm from '@/Components/TicketForm';
import { Head, useForm } from '@inertiajs/react';

export default function Edit({ ticket, options }) {
    const form = useForm({
        title: ticket.title,
        description: ticket.description,
        priority: ticket.priority,
        status: ticket.status,
        category: ticket.category,
    });

    function submit(e) {
        e.preventDefault();
        form.put(route('tickets.update', ticket.id));
    }

    return (
        <AuthenticatedLayout
            header={<h2 className="text-xl font-semibold leading-tight text-gray-800">Edit Ticket #{ticket.id}</h2>}
        >
            <Head title="Edit Ticket" />
            <div className="py-8">
                <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
                    <div className="rounded-lg bg-white p-6 shadow">
                        <TicketForm
                            form={form}
                            options={options}
                            onSubmit={submit}
                            submitLabel="Save Changes"
                            cancelHref={route('tickets.show', ticket.id)}
                        />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}