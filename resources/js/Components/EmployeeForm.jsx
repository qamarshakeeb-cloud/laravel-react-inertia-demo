export default function EmployeeForm({ data, setData, errors }) {
    return (
        <div>
            <input
                type="text"
                placeholder="Name"
                value={data.name}
                onChange={(e) => setData('name', e.target.value)}
            />
            {errors.name && <p>{errors.name}</p>}

            <br />
            

            <input
                type="text"
                placeholder="Role"
                value={data.role}
                onChange={(e) => setData('role', e.target.value)}
            />
            {errors.role && <p>{errors.role}</p>}

        </div>
    );
}