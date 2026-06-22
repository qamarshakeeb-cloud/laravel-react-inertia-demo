<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Employee;
use Inertia\Inertia;

class EmployeeController extends Controller
{
    public function index(Request $request)
{
    $search = $request->search;

    $employees = Employee::query()
        ->when($search, function ($query) use ($search) {
    $query->where(function ($q) use ($search) {
        $q->where('name', 'like', "%{$search}%")
          ->orWhere('role', 'like', "%{$search}%");
    });
})
        ->paginate(10)
        ->withQueryString();

    return Inertia::render('Employees', [
        'employees' => $employees,
        'search' => $search,
    ]);
}

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'role' => 'required',
        ]);

        Employee::create($request->only(['name', 'role']));

return redirect()->back()->with(
    'success',
    'Employee created successfully.'
);
    }

    public function update(Request $request, Employee $employee)
    {
        $request->validate([
            'name' => 'required',
            'role' => 'required',
        ]);

        
        $employee->update($request->only(['name', 'role']));

        return redirect()->back()->with(
    'success',
    'Employee updated successfully.'
);
    }

    public function destroy(Employee $employee)
    {
        
        $employee->delete();

        return redirect()->back()->with(
    'success',
    'Employee deleted successfully.'
);
    }
}
