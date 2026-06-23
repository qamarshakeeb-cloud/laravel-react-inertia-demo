import AppLayout from '../Layouts/AppLayout';

export default function Reports() {
    return (
        <div>
            <h1>Reports</h1>

            <p>This is the reports page.</p>
        </div>
    );
}

Reports.layout = (page) => (
    <AppLayout>{page}</AppLayout>
);