import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { PriorityBadge, StatusBadge } from '@/Components/Badges';
import Pagination from '@/Components/Pagination';
import { Head, Link, router } from '@inertiajs/react';

const selectClass = 'rounded-md border-gray-300 text-sm shadow-sm focus:border-indigo-500 focus:ring-indigo-500';

export default function Index({ tickets, filters, options }) {
    const hasFilters = Boolean(filters.status || filters.priority);

    function applyFilter(name, value) {
        const next = { ...filters, [name]: value };
        const params = Object.fromEntries(Object.entries(next).filter(([, v]) => v));
        router.get(route('tickets.index'), params, { preserveState: true, replace: true });
    }

    function handleDelete(ticket) {
        if (window.confirm(`Delete ticket "${ticket.title}"? This cannot be undone.`)) {
            router.delete(route('tickets.destroy', ticket.id), { preserveScroll: true });
        }
    }

    const formatDate = (value) => new Date(value).toLocaleDateString();

    function Actions({ ticket }) {
        return (
            <div className="flex gap-3 text-sm">
                <Link href={route('tickets.edit', ticket.id)} className="text-indigo-600 hover:underline">
                    Edit
                </Link>
                <button type="button" onClick={() => handleDelete(ticket)} className="text-red-600 hover:underline">
                    Delete
                </button>
            </div>
        );
    }

    return (
        <AuthenticatedLayout header={<h2 className="text-xl font-semibold leading-tight text-gray-800">My Tickets</h2>}>
            <Head title="Tickets" />
            <div className="py-8">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="mb-4 flex flex-wrap items-center gap-3">
                        <select
                            aria-label="Filter by status"
                            className={selectClass}
                            value={filters.status ?? ''}
                            onChange={(e) => applyFilter('status', e.target.value)}
                        >
                            <option value="">All statuses</option>
                            {options.statuses.map((s) => (
                                <option key={s} value={s}>
                                    {s}
                                </option>
                            ))}
                        </select>
                        <select
                            aria-label="Filter by priority"
                            className={selectClass}
                            value={filters.priority ?? ''}
                            onChange={(e) => applyFilter('priority', e.target.value)}
                        >
                            <option value="">All priorities</option>
                            {options.priorities.map((p) => (
                                <option key={p} value={p}>
                                    {p}
                                </option>
                            ))}
                        </select>
                        <span className="text-sm text-gray-500">{tickets.total} ticket(s)</span>
                    </div>

                    {tickets.data.length === 0 ? (
                        <div className="rounded-lg bg-white p-10 text-center shadow">
                            <p className="text-lg font-medium text-gray-900">
                                {hasFilters ? 'No tickets match your filters.' : 'No tickets yet.'}
                            </p>
                            <p className="mt-1 text-sm text-gray-500">
                                {hasFilters ? 'Try clearing a filter.' : 'Create your first ticket to get started.'}
                            </p>
                            {!hasFilters && (
                                <Link
                                    href={route('tickets.create')}
                                    className="mt-4 inline-block rounded-md bg-indigo-600 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white hover:bg-indigo-500"
                                >
                                    New Ticket
                                </Link>
                            )}
                        </div>
                    ) : (
                        <>
                            {/* Desktop: table */}
                            <div className="hidden overflow-hidden rounded-lg bg-white shadow md:block">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-4 py-3 text-left text-xs font-medium uppercase text-gray-500">Title</th>
                                            <th className="px-4 py-3 text-left text-xs font-medium uppercase text-gray-500">Category</th>
                                            <th className="px-4 py-3 text-left text-xs font-medium uppercase text-gray-500">Priority</th>
                                            <th className="px-4 py-3 text-left text-xs font-medium uppercase text-gray-500">Status</th>
                                            <th className="px-4 py-3 text-left text-xs font-medium uppercase text-gray-500">Created</th>
                                            <th className="px-4 py-3"></th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200">
                                        {tickets.data.map((ticket) => (
                                            <tr key={ticket.id}>
                                                <td className="px-4 py-3">
                                                    <Link
                                                        href={route('tickets.show', ticket.id)}
                                                        className="font-medium text-indigo-600 hover:underline"
                                                    >
                                                        {ticket.title}
                                                    </Link>
                                                </td>
                                                <td className="px-4 py-3 text-sm text-gray-700">{ticket.category}</td>
                                                <td className="px-4 py-3"><PriorityBadge value={ticket.priority} /></td>
                                                <td className="px-4 py-3"><StatusBadge value={ticket.status} /></td>
                                                <td className="px-4 py-3 text-sm text-gray-500">{formatDate(ticket.created_at)}</td>
                                                <td className="px-4 py-3"><Actions ticket={ticket} /></td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* Phone: stacked cards */}
                            <div className="space-y-3 md:hidden">
                                {tickets.data.map((ticket) => (
                                    <div key={ticket.id} className="rounded-lg bg-white p-4 shadow">
                                        <Link
                                            href={route('tickets.show', ticket.id)}
                                            className="break-words font-semibold text-indigo-600"
                                        >
                                            {ticket.title}
                                        </Link>
                                        <div className="mt-2 flex flex-wrap gap-2">
                                            <PriorityBadge value={ticket.priority} />
                                            <StatusBadge value={ticket.status} />
                                        </div>
                                        <p className="mt-2 text-sm text-gray-500">
                                            {ticket.category} · {formatDate(ticket.created_at)}
                                        </p>
                                        <div className="mt-3">
                                        npm run build      <Actions ticket={ticket} />
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <Pagination links={tickets.links} />
                        </>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}