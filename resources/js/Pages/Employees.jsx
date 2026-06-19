export default function Employees({ employees }) {
    return (
        <div>
            <h1>Employee List</h1>

            {employees.map((employee) => (
                <div key={employee.id}>
                    <p>Name: {employee.name}</p>
                    <p>Role: {employee.role}</p>
                    <hr />
                </div>
            ))}
        </div>
    );
}