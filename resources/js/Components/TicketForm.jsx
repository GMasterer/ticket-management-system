import { Link } from '@inertiajs/react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';

const fieldClass =
    'mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500';

function SelectField({ id, label, value, onChange, error, choices, placeholder }) {
    return (
        <div>
            <InputLabel htmlFor={id} value={label} />
            <select id={id} value={value} onChange={onChange} className={fieldClass}>
                {placeholder && <option value="">{placeholder}</option>}
                {choices.map((choice) => (
                    <option key={choice} value={choice}>
                        {choice}
                    </option>
                ))}
            </select>
            <InputError message={error} className="mt-2" />
        </div>
    );
}

export default function TicketForm({ form, options, onSubmit, submitLabel, cancelHref }) {
    const { data, setData, errors, processing } = form;
    const hasErrors = Object.keys(errors).length > 0;

    return (
        <form onSubmit={onSubmit} className="space-y-6">
            {hasErrors && (
                <div role="alert" className="rounded-md bg-red-50 p-3 text-sm text-red-700">
                    Please fix the highlighted fields and try again.
                </div>
            )}

            <div>
                <InputLabel htmlFor="title" value="Title" />
                <TextInput
                    id="title"
                    className="mt-1 block w-full"
                    value={data.title}
                    onChange={(e) => setData('title', e.target.value)}
                    isFocused
                />
                <InputError message={errors.title} className="mt-2" />
            </div>

            <div>
                <InputLabel htmlFor="description" value="Description" />
                <textarea
                    id="description"
                    rows={5}
                    className={fieldClass}
                    value={data.description}
                    onChange={(e) => setData('description', e.target.value)}
                />
                <InputError message={errors.description} className="mt-2" />
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
                <SelectField
                    id="priority"
                    label="Priority"
                    value={data.priority}
                    onChange={(e) => setData('priority', e.target.value)}
                    error={errors.priority}
                    choices={options.priorities}
                />
                <SelectField
                    id="status"
                    label="Status"
                    value={data.status}
                    onChange={(e) => setData('status', e.target.value)}
                    error={errors.status}
                    choices={options.statuses}
                />
                <SelectField
                    id="category"
                    label="Category"
                    value={data.category}
                    onChange={(e) => setData('category', e.target.value)}
                    error={errors.category}
                    choices={options.categories}
                    placeholder="Select a category"
                />
            </div>

            <div className="flex items-center gap-4">
                <PrimaryButton disabled={processing}>{processing ? 'Saving...' : submitLabel}</PrimaryButton>
                <Link href={cancelHref} className="text-sm text-gray-600 underline hover:text-gray-900">
                    Cancel
                </Link>
            </div>
        </form>
    );
}