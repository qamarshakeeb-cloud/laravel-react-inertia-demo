
import { useState } from 'react';
import { useForm, router } from '@inertiajs/react';

export default function Employees({ employees, search }) {

        console.log(employees.links);

    const [editingId, setEditingId] = useState(null);

    const { data, setData, post, patch, delete: destroy, errors, reset } = useForm({
        name: '',
        role: '',
    });

    function submit(e) {
    e.preventDefault();

    if (editingId) {

        patch(`/employees/${editingId}`, {
            data,
            onSuccess: () => {
                reset();
                setEditingId(null);
            },
        });

    } else {

        post('/employees', {
            data,
            onSuccess: () => reset(),
        });

    }
}

    return (
        <div>
            <h1>Employee List</h1>
            <input
    type="text"
    placeholder="Search employee..."
    defaultValue={search}
    onChange={(e) =>
        router.get(
            '/employees',
            { search: e.target.value },
            {
                preserveState: true,
                replace: true,
            }
        )
    }
/>
            <p>Editing ID: {editingId}</p>

            <form onSubmit={submit}>
                <input
                    type="text"
                    placeholder="Name"
                    value={data.name}
                    onChange={(e) => setData('name', e.target.value)}
                />

                {errors.name && (
                    <p>{errors.name}</p>
                )}

                <br />

                <input
                    type="text"
                    placeholder="Role"
                    value={data.role}
                    onChange={(e) => setData('role', e.target.value)}
                />

                {errors.role && (
                    <p>{errors.role}</p>
                )}

                <br />

                <button type="submit">
    {editingId ? 'Update Employee' : 'Add Employee'}
</button>
            </form>

            <hr />

            {employees.data.map((employee) => (
    <div key={employee.id}>
        <p>Name: {employee.name}</p>
        <p>Role: {employee.role}</p>

        <button
            onClick={() => {
                setEditingId(employee.id);

                setData({
                    name: employee.name,
                    role: employee.role,
                });
            }}
        >
            Edit
        </button>

        <button
            onClick={() => {
                destroy(`/employees/${employee.id}`);
            }}
        >
            Delete
        </button>

        <hr />
    </div>
))}

<div style={{ marginTop: '20px' }}>
    {employees.links.map((link, index) => (
        <button
            key={index}
            onClick={() => link.url && router.visit(link.url)}
            disabled={!link.url}
            style={{
                margin: '5px',
                fontWeight: link.active ? 'bold' : 'normal',
            }}
        >
            {link.label.replace(/&laquo;|&raquo;/g, '')}
        </button>
    ))}
</div>

</div>
    );
}