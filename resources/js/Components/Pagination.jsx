import { Link } from '@inertiajs/react';

export default function Pagination({ links }) {
    if (links.length <= 3) return null;

    return (
        <nav className="mt-6 flex flex-wrap justify-center gap-1" aria-label="Pagination">
            {links.map((link, i) => {
                const label = link.label.replace('&laquo;', '«').replace('&raquo;', '»');
                const base = 'rounded-md border px-3 py-1.5 text-sm';

                if (!link.url) {
                    return (
                        <span key={i} className={`${base} border-gray-200 text-gray-400`}>
                            {label}
                        </span>
                    );
                }

                return (
                    <Link
                        key={i}
                        href={link.url}
                        preserveScroll
                        className={`${base} ${
                            link.active
                                ? 'border-indigo-600 bg-indigo-600 text-white'
                                : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
                        }`}
                    >
                        {label}
                    </Link>
                );
            })}
        </nav>
    );
}