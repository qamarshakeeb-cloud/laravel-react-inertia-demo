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
            $query->where('name', 'like', "%{$search}%");
        })
        ->get();

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

        return redirect()->back();
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'name' => 'required',
            'role' => 'required',
        ]);

        $employee = Employee::find($id);
        $employee->update($request->only(['name', 'role']));

        return redirect()->back();
    }

    public function destroy($id)
    {
        $employee = Employee::find($id);
        $employee->delete();

        return redirect()->back();
    }
}
