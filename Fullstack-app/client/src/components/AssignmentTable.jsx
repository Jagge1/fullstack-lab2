import React, {useState, useEffect} from 'react';

export function AssignmentTable() {

  const [assignments, setAssignment] = useState([]);

  useEffect(()=>{
    async function fetchData() {
      const response = await fetch('/api/project_assignments');
      const data = await response.json();
      setAssignment(data);
    }

    fetchData(); 
  }, []);

  console.log("Rendering AssignmentTable", assignments);

  return (
    <table>
      <thead>
        <tr>
          <th>Employee ID</th>
          <th>Employee Name</th>
          <th>Project Name</th>
          <th>Start Date</th>
        </tr>
      </thead>
     
      <tbody>
        {assignments.map((assignment, assignmentIndex) => {
          return (
            <tr key={assignmentIndex}>
              <td>{assignment.employee_id?.employee_id}</td>
              <td>{assignment.employee_id?.full_name}</td>
              <td>{assignment.project_code?.project_name}</td>
              <td>{new Date(assignment.start_date).toLocaleDateString()}</td>

            </tr>
          )
        })}
      </tbody>
      
    </table>
  ) 
}

