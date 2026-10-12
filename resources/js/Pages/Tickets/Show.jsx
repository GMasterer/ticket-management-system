import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { PriorityBadge, StatusBadge } from '@/Components/Badges';
import { Head, Link, router } from '@inertiajs/react';

export default function Show({ ticket }) {
    function handleDelete() {
        if (window.confirm('Delete this ticket? This cannot be undone.')) {
            router.delete(route('tickets.destroy', ticket.id));
        }
    }

    return (
        <AuthenticatedLayout
            header={<h2 className="text-xl font-semibold leading-tight text-gray-800">Ticket #{ticket.id}</h2>}
        >
            <Head title={ticket.title} />
            <div className="py-8">
                <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
                    <div className="rounded-lg bg-white p-6 shadow">
                        <h1 className="break-words text-2xl font-bold text-gray-900">{ticket.title}</h1>

                        <div className="mt-3 flex flex-wrap items-center gap-2">
                            <PriorityBadge value={ticket.priority} />
                            <StatusBadge value={ticket.status} />
                            <span className="rounded-full bg-gray-100 px-2.5 py-0.5 text-xs text-gray-700">
                                {ticket.category}
                            </span>
                        </div>

                        <p className="mt-6 whitespace-pre-wrap break-words text-gray-700">{ticket.description}</p>

                        <p className="mt-6 text-xs text-gray-500">
                            Created {new Date(ticket.created_at).toLocaleString()} · Updated{' '}
                            {new Date(ticket.updated_at).toLocaleString()}
                        </p>

                        <div className="mt-6 flex flex-wrap gap-3">
                            <Link
                                href={route('tickets.index')}
                                className="rounded-md border border-gray-300 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-gray-700 hover:bg-gray-50"
                            >
                                Back
                            </Link>
                            <Link
                                href={route('tickets.edit', ticket.id)}
                                className="rounded-md bg-indigo-600 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white hover:bg-indigo-500"
                            >
                                Edit
                            </Link>
                            <button
                                type="button"
                                onClick={handleDelete}
                                className="rounded-md bg-red-600 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white hover:bg-red-500"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}