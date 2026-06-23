
import { useState, useEffect, useRef } from 'react';
import { useForm, router, usePage } from '@inertiajs/react';
import EmployeeList from '../Components/EmployeeList';
import EmployeeForm from '../Components/EmployeeForm';
 import AppLayout from '../Layouts/AppLayout';

export default function Employees({ employees, search, flash }) {



    const [editingId, setEditingId] = useState(null);

    const [searchTerm, setSearchTerm] = useState(search || '');

    const isFirstRender = useRef(true);
    const { url } = usePage();

    useEffect(() => {

          if (isFirstRender.current) {
        isFirstRender.current = false;
        return;
    }

    const timeout = setTimeout(() => {
      


        router.get(
    url.split('?')[0],
    {
        search: searchTerm,
    },
            {
                preserveState: true,
                replace: true,
            }
        );
    }, 500);

    return () => clearTimeout(timeout);
}, [searchTerm]);

    

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
            
        {flash.success && (
    <p>{flash.success}</p>
)}

            <input
    type="text"
    placeholder="Search employee..."
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
/>


            <p>Editing ID: {editingId}</p>

            <form onSubmit={submit}>

                <EmployeeForm
                    data={data}
                    setData={setData}
                    errors={errors}
                />
                

                

                

                <button type="submit">
    {editingId ? 'Update Employee' : 'Add Employee'}
</button>
            </form>

            <hr />

            <EmployeeList
                employees={employees}
                destroy={destroy}
                setEditingId={setEditingId}
                setData={setData}
            />

            

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


Employees.layout = (page) => <AppLayout>{page}</AppLayout>;