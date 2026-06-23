

import { Link, usePage } from '@inertiajs/react';
export default function AppLayout({ children }) {
     const { url } = usePage();
     

     return (
        <div>
            <header>
                <h2>Employee Manager</h2>

                <nav>
                    <Link
    href="/employees"
    style={{
        fontWeight: url === '/employees' ? 'bold' : 'normal',
    }}
>
    Employees
</Link>

                    {" | "}

                    <Link
    href="/dashboard"
    style={{
        fontWeight: url === '/dashboard' ? 'bold' : 'normal',
    }}
>
    Dashboard
</Link>

                    {" | "}

                    <Link
    href="/reports"
    style={{
        fontWeight: url === '/reports' ? 'bold' : 'normal',
    }}
>
    Reports
</Link>
                </nav>
            </header>

            <hr />

            {children}
        </div>
    );
}