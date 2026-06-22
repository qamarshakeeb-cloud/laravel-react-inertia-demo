
import { useState } from 'react';
import { useForm } from '@inertiajs/react';

export default function Employees({ employees }) {
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

            {employees.map((employee) => (
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
        </div>
    );
}