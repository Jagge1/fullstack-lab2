import React, {useState, useEffect} from 'react';

export function AssignmentTable() {

  const [assignments, setAssignment] = useState([]);
  const [sortColumn, setSortColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState('asc');

  useEffect(()=>{
    async function fetchData() {
      const response = await fetch('http://localhost:5000/api/project_assignments');
      const data = await response.json();
      setAssignment(data);
    }

    fetchData(); 

    const updateInterval = setInterval(fetchData, 60000);
    return ()=> clearInterval(updateInterval);

  }, []);

  function sortHandler(column){
    let direction

    if (sortColumn === column && sortDirection === 'asc') {
      direction = 'desc';
    } else {
      direction = 'asc';
    }


    const sorted = [...assignments].sort((a, b) => {

      const aValue = extractValue(a, column);
      const bValue = extractValue(b, column);

      if (aValue < bValue){
        return direction === 'asc' ? -1 : 1;}

      if (aValue > bValue){
        return direction === 'asc' ? 1 : -1;}

      return 0;
    })

    setAssignment(sorted);
    setSortColumn(column);
    setSortDirection(direction);
  }

  function extractValue(item, column) {
    switch(column) {
      case 'employee_id': return item.employee_id?.employee_id ?? '';
      case 'full_name': return item.employee_id?.full_name ?? '';
      case 'project_name': return item.project_code?.project_name ?? '';
      case 'start_date': return item.start_date ?? '';
      default: return '';
    }
  }


  return (
    <table className="project-table">
      <thead>
        <tr>
        <th onClick={() => sortHandler('employee_id')}>Employee ID</th>
          <th onClick={() => sortHandler('full_name')}>Employee Name</th>
          <th onClick={() => sortHandler('project_name')}>Project Name</th>
          <th onClick={() => sortHandler('start_date')}>Start Date</th>
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

