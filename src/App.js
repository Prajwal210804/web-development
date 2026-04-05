import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {

  const [employees, setEmployees] = useState([]);
  const [search, setSearch] = useState("");
  const [employeeId, setEmployeeId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [department, setDepartment] = useState("");
  const [designation, setDesignation] = useState("");
  const [salary, setSalary] = useState("");
  const [joiningDate, setJoiningDate] = useState("");
  const [editId, setEditId] = useState(null);
  const [sortField, setSortField] = useState("");
  const [view, setView] = useState("table");

  const API = "http://localhost:5000/api/employees";

  // FETCH
  const fetchEmployees = async () => {
    try {
      const res = await axios.get(API);
      setEmployees(res.data);
    } catch (error) {
      console.log("Fetch Error:", error.response || error.message);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  // ADD / UPDATE
  const handleAdd = async () => {
    if (!employeeId || !name || !email || !phone) {
  alert("Please fill all required fields");
  return;
}

if (!email.includes("@")) {
  alert("Invalid email");
  return;
}

if (!/^\d{10}$/.test(phone)) {
  alert("Phone must be exactly 10 digits and only numbers");
  return;
}
if (isNaN(salary)) {
  alert("Salary must be a number");
  return;
}
    console.log("BUTTON CLICKED");

    if (!employeeId || !name) {
      alert("Employee ID and Name required");
      return;
    }
    if (employees.some(emp => emp.employeeId === employeeId)) {
  alert("Employee ID already exists");
  return;
}

    const newEmployee = {
      employeeId,
      name,
      email,
      phone,
      department,
      designation,
      salary,
      joiningDate
    };

    try {
      if (editId) {
        await axios.put(`${API}/${editId}`, newEmployee);
        setEditId(null);
      } else {
        await axios.post(API, newEmployee);
      }

      // Clear form
      setEmployeeId("");
      setName("");
      setEmail("");
      setPhone("");
      setDepartment("");
      setDesignation("");
      setSalary("");
      setJoiningDate("");

      fetchEmployees();

    } catch (error) {
      console.log("FULL ERROR:", error.response || error.message);

      if (error.response?.data?.error?.includes("duplicate")) {
        alert("Employee ID already exists!");
      }
    }
  };

  // DELETE
  const handleDelete = async (id) => {
  if (!window.confirm("Are you sure you want to delete?")) return;

  try {
    await axios.delete(`${API}/${id}`);
    fetchEmployees();
  } catch (error) {
    console.error("Error deleting employee:", error);
  }
};

  // EDIT
  const handleEdit = (emp) => {
    setEmployeeId(emp.employeeId);
    setName(emp.name);
    setEmail(emp.email);
    setPhone(emp.phone);
    setDepartment(emp.department);
    setDesignation(emp.designation);
    setSalary(emp.salary);
    setJoiningDate(emp.joiningDate);
    setEditId(emp._id);
  };

  // FILTER
  const filteredEmployees = employees.filter(emp =>
  emp.name?.toLowerCase().includes(search.toLowerCase()) ||
  emp.employeeId?.toLowerCase().includes(search.toLowerCase()) ||
  emp.department?.toLowerCase().includes(search.toLowerCase())
);
const sortedEmployees = [...filteredEmployees].sort((a, b) => {
  if (!sortField) return 0;
  return a[sortField] > b[sortField] ? 1 : -1;
});

  return (
    <div style={{
  padding: "20px",
  maxWidth: "1200px",
  margin: "auto"
}}>
      <h1 style={{
  textAlign: "center",
  color: "#2c3e50",
  marginBottom: "20px"
}}>
  Employee Management System
</h1>
      

      {/* SEARCH */}
<div style={{
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
  gap: "10px",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "15px"
}}>
  <input
    type="text"
    placeholder="Search..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    style={{
      flex: "1 1 250px",
      padding: "10px",
      borderRadius: "6px",
      border: "1px solid #ccc"
    }}
  />

  <select
    onChange={(e) => setSortField(e.target.value)}
    style={{ padding: "10px", borderRadius: "6px" }}
  >
    <option value="">Sort By</option>
    <option value="name">Name</option>
    <option value="salary">Salary</option>
  </select>

  <button onClick={() => setView("table")}>
    Table
  </button>

  <button onClick={() => setView("card")}>
    Card
  </button>
</div>

      <br /><br />

      {/* INPUTS */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
        gap: "10px"
}}>
      <input
        type="text"
        placeholder="Employee ID"
        value={employeeId}
        onChange={(e) => setEmployeeId(e.target.value)}
        style={{
    flex: "1 1 200px",
    padding: "8px",
    border: "1px solid #ccc",
    borderRadius: "5px"
  }}
      />
      <input style={{ flex: "1 1 200px", padding: "8px", border: "1px solid #ccc",borderRadius: "5px" }} value={name} placeholder="Name" onChange={(e) => setName(e.target.value)}  />
      <input style={{ flex: "1 1 200px", padding: "8px", border: "1px solid #ccc",borderRadius: "5px" }} value={email} placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <input style={{ flex: "1 1 200px", padding: "8px", border: "1px solid #ccc",borderRadius: "5px" }} value={phone} placeholder="Phone" onChange={(e) => setPhone(e.target.value)} />
      <input style={{ flex: "1 1 200px", padding: "8px", border: "1px solid #ccc",borderRadius: "5px" }} value={department} placeholder="Department" onChange={(e) => setDepartment(e.target.value)} />
      <input style={{ flex: "1 1 200px", padding: "8px", border: "1px solid #ccc",borderRadius: "5px" }} value={designation} placeholder="Designation" onChange={(e) => setDesignation(e.target.value)} />
      <input style={{ flex: "1 1 200px", padding: "8px", border: "1px solid #ccc",borderRadius: "5px" }} value={salary} placeholder="Salary" onChange={(e) => setSalary(e.target.value)} />
      <input style={{ flex: "1 1 200px", padding: "8px", border: "1px solid #ccc",borderRadius: "5px" }} type="date" value={joiningDate} onChange={(e) => setJoiningDate(e.target.value)} />
      </div>
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
        gap: "10px",
        marginTop: "10px"
}}>
  <button
    style={{
    padding: "8px",
    flex: "1 1 150px",
    background: "linear-gradient(135deg, #27ae60, #2ecc71)",
    fontWeight: "bold",
    transition: "0.2s",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer"
  }}
  onMouseOver={(e) => e.target.style.opacity = 0.8}
  onMouseOut={(e) => e.target.style.opacity = 1}
    onClick={handleAdd}
  >
    {editId ? "Update Employee" : "Add Employee"}
  </button>

  <button
    style={{
    padding: "8px",
    flex: "1 1 150px",
    background: "linear-gradient(135deg, #e74c3c, #ff6b6b)",
    fontWeight: "bold",
    transition: "0.2s",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer"
  }}
  onMouseOver={(e) => e.target.style.opacity = 0.8}
  onMouseOut={(e) => e.target.style.opacity = 1}
    onClick={() => {
      setEmployeeId("");
      setName("");
      setEmail("");
      setPhone("");
      setDepartment("");
      setDesignation("");
      setSalary("");
      setJoiningDate("");
    }}
  >
    Clear
  </button>
</div>

      <br /><br />
<h3>Total Employees: {sortedEmployees.length}</h3>
      {/* TABLE */}
      {view === "table" ? (
  <div style={{ overflowX: "auto" }}>
  <table style={{
  width: "100%",
  borderCollapse: "collapse",
  backgroundColor: "#ffffff",
  minWidth: "900px",
}} border="1">
        <thead>
          <tr>
            <th
              style={{
                fontSize: "14px",
                backgroundColor: "#2c3e50",
                color: "white",
                padding: "10px"
              }}>
              ID
              </th>
            <th
              style={{
                fontSize: "14px",
                backgroundColor: "#2c3e50",
                color: "white",
                padding: "10px"
              }}>
              Name
              </th>
            <th
              style={{
                fontSize: "14px",
                backgroundColor: "#2c3e50",
                color: "white",
                padding: "10px"
              }}>
              Email
              </th>
            <th
              style={{
                fontSize: "14px",
                backgroundColor: "#2c3e50",
                color: "white",
                padding: "10px"
              }}>
              Phone
              </th>
            <th
              style={{
                fontSize: "14px",
                backgroundColor: "#2c3e50",
                color: "white",
                padding: "10px"
              }}>
              Department
              </th>
            <th
              style={{
                fontSize: "14px",
                backgroundColor: "#2c3e50",
                color: "white",
                padding: "10px"
              }}>
              Designation
              </th>
            <th
              style={{
                fontSize: "14px",
                backgroundColor: "#2c3e50",
                color: "white",
                padding: "10px"
              }}>
              Salary
              </th>
            <th
              style={{
                fontSize: "14px",
                backgroundColor: "#2c3e50",
                color: "white",
                padding: "10px"
              }}>
              Joining Date
              </th>
            <th
              style={{
                fontSize: "14px",
                backgroundColor: "#2c3e50",
                color: "white",
                padding: "10px"
              }}>
              Action
              </th>
          </tr>
        </thead>

        <tbody>
          {sortedEmployees.length > 0 ? (
            sortedEmployees.map((emp) => (
              <tr 
                key={emp._id}
                style={{ cursor: "pointer" }}
                onMouseEnter={(e) => e.currentTarget.style.background = "#f2f2f2"}
                onMouseLeave={(e) => e.currentTarget.style.background = "white"}
                >
                <td
                  style={{
                    padding: "12px",
                    textAlign: "center",
                    borderBottom: "1px solid #ddd"
                  }}>
                  {emp.employeeId}
                  </td>
                <td
                  style={{
                    padding: "12px",
                    textAlign: "center",
                    borderBottom: "1px solid #ddd"
                  }}>
                  {emp.name}
                  </td>
                <td
                  style={{
                    padding: "12px",
                    textAlign: "center",
                    borderBottom: "1px solid #ddd"
                  }}>
                  {emp.email}
                  </td>
                <td
                  style={{
                    padding: "12px",
                    textAlign: "center",
                    borderBottom: "1px solid #ddd"
                  }}>
                  {emp.phone}
                  </td>
                <td
                  style={{
                    padding: "12px",
                    textAlign: "center",
                    borderBottom: "1px solid #ddd"
                  }}>
                  {emp.department}
                  </td>
                <td
                  style={{
                    padding: "12px",
                    textAlign: "center",
                    borderBottom: "1px solid #ddd"
                  }}>
                  {emp.designation}
                  </td>
                <td
                  style={{
                    padding: "12px",
                    textAlign: "center",
                    borderBottom: "1px solid #ddd"
                  }}>
                  {emp.salary}
                  </td>
                <td
                  style={{
                    padding: "12px",
                    textAlign: "center",
                    borderBottom: "1px solid #ddd"
                  }}>
                  {emp.joiningDate?.split("T")[0]}
                  </td>
                <td>
                  <button
                  style={{
                    backgroundColor: "#3498db",
                    color: "white",
                    border: "none",
                    padding: "5px",
                    marginRight: "5px",
                    borderRadius: "4px",
                    cursor: "pointer"
                    }} 
                  onClick={() => handleEdit(emp)}
                  >
                    Edit
                    </button>
                  <button
                  style={{
                    backgroundColor: "#e74c3c",
                    color: "white",
                    border: "none",
                    padding: "5px",
                    borderRadius: "4px",
                    cursor: "pointer"
                  }} 
                  onClick={() => handleDelete(emp._id)}
                  >
                    Delete
                    </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="9" style={{ textAlign: "center" }}>
                No Employees Found
              </td>
            </tr>
          )}
        </tbody>
      </table>
      </div>
      ) : (
  <div style={{
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
  gap: "10px",
  justifyContent: "center"
}}>
    {sortedEmployees.map((emp) => (
      <div
  key={emp._id}
  style={{
  borderRadius: "12px",
  padding: "15px",
  width: "100%",
  maxWidth: "260px",
  background: "#ffffff",
  boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
  transition: "0.2s",
  cursor: "pointer"
}}
onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.03)"}
onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
>
        <p><strong>ID:</strong> {emp.employeeId}</p>
        <p><strong>Name:</strong> {emp.name}</p>
        <p><strong>Email:</strong> {emp.email}</p>
        <p><strong>Phone:</strong> {emp.phone}</p>
        <p><strong>Department:</strong> {emp.department}</p>
        <p><strong>Designation:</strong> {emp.designation}</p>
        <p><strong>Salary:</strong> {emp.salary}</p>

        <button
  style={{
    marginRight: "5px",
    padding: "5px",
    backgroundColor: "#3498db",
    color: "white",
    border: "none",
    borderRadius: "4px"
  }}
  onClick={() => handleEdit(emp)}
>
  Edit
</button>

<button
  style={{
    padding: "5px",
    backgroundColor: "#e74c3c",
    color: "white",
    border: "none",
    borderRadius: "4px"
  }}
  onClick={() => handleDelete(emp._id)}
>
  Delete
</button>
      </div>
    ))}
  </div>
)}
    </div>
  );
}

export default App;