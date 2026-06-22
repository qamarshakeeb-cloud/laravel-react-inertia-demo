export default function EmployeeList({
    employees,
    destroy,
    setEditingId,
    setData
}) {
    return (
        <div>
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
        </div>
    );
}