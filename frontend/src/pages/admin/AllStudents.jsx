import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AllStudents = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;
  
  const generateDummyStudents = () => {
    const courses = ['BBOSE 10th', 'NIOS 12th', 'Medical Admission', 'UG Admission', 'BBOSE 12th', 'PG Admission', 'BOSSE 10th'];
    const statuses = ['Active', 'Pending', 'Inactive'];
    const names = ['Rahul', 'Priya', 'Amit', 'Neha', 'Vikram', 'Sonia', 'Deepak', 'Aisha', 'Karan', 'Pooja', 'Rohan', 'Sneha', 'Arjun', 'Anjali', 'Manish'];
    const surnames = ['Sharma', 'Singh', 'Kumar', 'Gupta', 'Patel', 'Kapoor', 'Verma', 'Reddy', 'Das', 'Joshi'];
    
    let dummyData = [];
    for (let i = 1; i <= 35; i++) {
      dummyData.push({
        id: `#STU-${1023 + i}`,
        name: `${names[i % names.length]} ${surnames[i % surnames.length]}`,
        email: `student${i}@example.com`,
        phone: `+91 9876543${(200 + i).toString().slice(0, 3)}`,
        course: courses[i % courses.length],
        status: statuses[i % statuses.length],
        joined: `Oct ${max(1, (31 - (i % 30)))}, 2026`
      });
    }
    return dummyData;
  };

  const max = (a, b) => a > b ? a : b;
  const students = generateDummyStudents();

  // Search & Pagination Logic
  const filteredStudents = students.filter(student => 
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    student.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredStudents.length / itemsPerPage);
  const currentStudents = filteredStudents.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h2 className="text-3xl font-black text-slate-800">All Students</h2>
          <p className="text-slate-500 font-semibold mt-1">Manage and view all enrolled students</p>
        </div>
        <button onClick={() => navigate('/admin/students/new')} className="btn-glow-primary px-6 py-2.5 rounded-full font-bold flex items-center gap-2">
          <i className="fas fa-plus"></i> Add New Student
        </button>
      </div>

      <div className="nested-card overflow-hidden">
        {/* Toolbar */}
        <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-50/50">
          <div className="flex items-center bg-white border border-slate-200 rounded-xl px-4 py-2 w-full sm:w-80 focus-within:border-indigo-400 focus-within:ring-2 focus-within:ring-indigo-100 transition-all">
            <i className="fas fa-search text-slate-400"></i>
            <input 
              type="text" 
              placeholder="Search by name, ID, or email..." 
              value={searchTerm}
              onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
              className="bg-transparent border-none outline-none ml-3 w-full text-sm text-slate-700 placeholder-slate-400" 
            />
          </div>
          
          <div className="flex gap-3">
            <select className="bg-white border border-slate-200 rounded-xl px-4 py-2 text-sm text-slate-600 font-semibold outline-none focus:border-indigo-400">
              <option>All Courses</option>
              <option>BBOSE</option>
              <option>NIOS</option>
              <option>Medical</option>
            </select>
            <select className="bg-white border border-slate-200 rounded-xl px-4 py-2 text-sm text-slate-600 font-semibold outline-none focus:border-indigo-400">
              <option>All Status</option>
              <option>Active</option>
              <option>Pending</option>
              <option>Inactive</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider">
                <th className="p-5 font-bold border-b border-slate-100">Student Info</th>
                <th className="p-5 font-bold border-b border-slate-100">Contact</th>
                <th className="p-5 font-bold border-b border-slate-100">Course</th>
                <th className="p-5 font-bold border-b border-slate-100">Status</th>
                <th className="p-5 font-bold border-b border-slate-100">Joined</th>
                <th className="p-5 font-bold border-b border-slate-100 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {currentStudents.length > 0 ? currentStudents.map((student) => (
                <tr key={student.id} className="hover:bg-indigo-50/30 transition-colors border-b border-slate-50 last:border-0 group">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-lg shrink-0">
                        {student.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-bold text-slate-800">{student.name}</p>
                        <p className="text-xs font-semibold text-slate-500">{student.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-5">
                    <p className="font-semibold text-slate-700">{student.email}</p>
                    <p className="text-xs text-slate-500">{student.phone}</p>
                  </td>
                  <td className="p-5">
                    <span className="bg-slate-100 text-slate-700 px-3 py-1 rounded-full text-xs font-bold">
                      {student.course}
                    </span>
                  </td>
                  <td className="p-5">
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${
                      student.status === 'Active' ? 'bg-emerald-100 text-emerald-700' :
                      student.status === 'Pending' ? 'bg-amber-100 text-amber-700' :
                      'bg-rose-100 text-rose-700'
                    }`}>
                      {student.status}
                    </span>
                  </td>
                  <td className="p-5 font-semibold text-slate-600">{student.joined}</td>
                  <td className="p-5 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button 
                        onClick={() => navigate(`/admin/students/${student.id.replace('#', '')}`)}
                        className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 hover:bg-indigo-600 hover:text-white flex items-center justify-center transition-colors tooltip" title="View Details"
                      >
                        <i className="fas fa-eye"></i>
                      </button>
                      <button className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 hover:bg-emerald-600 hover:text-white flex items-center justify-center transition-colors tooltip" title="Edit">
                        <i className="fas fa-edit"></i>
                      </button>
                      <button className="w-8 h-8 rounded-lg bg-rose-50 text-rose-600 hover:bg-rose-600 hover:text-white flex items-center justify-center transition-colors tooltip" title="Delete">
                        <i className="fas fa-trash-alt"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="6" className="p-8 text-center text-slate-500 font-semibold">
                    <i className="fas fa-search text-3xl mb-3 text-slate-300 block"></i>
                    No students found matching your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        <div className="p-4 border-t border-slate-100 flex items-center justify-between bg-slate-50/50">
          <p className="text-xs font-bold text-slate-500">
            Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, filteredStudents.length)} of {filteredStudents.length} entries
          </p>
          
          {totalPages > 1 && (
            <div className="flex gap-1">
              <button 
                onClick={handlePrevPage}
                disabled={currentPage === 1}
                className={`px-3 py-1.5 rounded-md border text-sm font-semibold transition-colors ${currentPage === 1 ? 'border-slate-200 text-slate-400 bg-slate-50 cursor-not-allowed' : 'border-slate-200 text-slate-600 bg-white hover:bg-slate-50'}`}
              >
                Prev
              </button>
              
              {[...Array(totalPages)].map((_, i) => (
                <button 
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`px-3 py-1.5 rounded-md border text-sm font-semibold transition-colors ${currentPage === i + 1 ? 'border-indigo-600 bg-indigo-600 text-white shadow-sm' : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-600'}`}
                >
                  {i + 1}
                </button>
              ))}
              
              <button 
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                className={`px-3 py-1.5 rounded-md border text-sm font-semibold transition-colors ${currentPage === totalPages ? 'border-slate-200 text-slate-400 bg-slate-50 cursor-not-allowed' : 'border-slate-200 text-slate-600 bg-white hover:bg-slate-50'}`}
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllStudents;
