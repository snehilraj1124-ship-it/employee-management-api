const express = require("express");

const app = express();
const PORT = 3000;

app.use(express.json());

let employees = [
  {
    id: 1,
    name: "Rahul Sharma",
    department: "HR",
    salary: 45000
  },
  {
    id: 2,
    name: "Priya Singh",
    department: "Finance",
    salary: 60000
  }
];

// Home Route
app.get("/", (req, res) => {
  res.send("Employee Management API is Running...");
});

// Get All Employees
app.get("/employees", (req, res) => {
  res.json(employees);
});

// Add Employee
app.post("/employees", (req, res) => {
  const employee = req.body;
  employees.push(employee);
  res.status(201).json({
    message: "Employee Added Successfully",
    employee
  });
});

// Update Employee
app.put("/employees/:id", (req, res) => {
  const id = parseInt(req.params.id);

  const employee = employees.find(emp => emp.id === id);

  if (!employee) {
    return res.status(404).json({
      message: "Employee Not Found"
    });
  }

  employee.name = req.body.name || employee.name;
  employee.department = req.body.department || employee.department;
  employee.salary = req.body.salary || employee.salary;

  res.json({
    message: "Employee Updated Successfully",
    employee
  });
});

// Delete Employee
app.delete("/employees/:id", (req, res) => {
  const id = parseInt(req.params.id);

  employees = employees.filter(emp => emp.id !== id);

  res.json({
    message: "Employee Deleted Successfully"
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
