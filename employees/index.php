<?php
include '../api/database.php';
include '../class/DbTest.php';
$database = new Database();
$conn = $database->getConnection();
$test = new DbTest($conn);
$connectionStatus = $test->checkConnection();
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Employee Management System</title>
    <link rel="stylesheet" href="../style/styles.css">
</head>
<body>
    <div class="header">
        <div class="navbar">
            <div class="logo">Employee Management System</div>
        </div>
    </div>
    
    <div class="status-container">
        Database Connection Status:
        <span class="status <?= $connectionStatus['status'] == 'success' ? 'success' : 'error' ?>">
            <?= $connectionStatus['message'] ?>
        </span>
    </div>

    <div class="container">
        <div class="table-container">
            <div class="page-header">
                <h2>Employee List</h2>
                <button class="add-btn" onclick="openAddEmployeeModal()">Add Employee</button>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>ID</th><th>First Name</th><th>M.I.</th><th>Last Name</th>
                        <th>Mobile</th><th>Email</th><th>Sex</th><th>Job Title</th><th>Actions</th>
                    </tr>
                </thead>
                <tbody id="employeeTableBody">
                </tbody>
            </table>
        </div>
    </div>

<!--Add-->
    <div id="addEmployeeModal" class="modal" style="display:none;">
        <div class="modal-content">
            <span class="close" onclick="closeAddEmployeeModal()">&times;</span>
            <h3>Enter Employee Details</h3>
            <input type="text" id="first_name" placeholder="First Name">
            <input type="text" id="middle_initial" placeholder="M.I.">
            <input type="text" id="last_name" placeholder="Last Name">
            <input type="text" id="mobile_number" placeholder="Mobile Number">
            <input type="email" id="email" placeholder="Email">
            <select id="sex">
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
            </select>
            <select id="job_title">
                <option value="">Select Job Title</option>
                <option value="Project Manager">Project Manager</option>
                <option value="Business Analyst">Business Analyst</option>
                <option value="Front End Developer">Front End Developer</option>
            </select>
            <button onclick="addEmployee()">Save Employee Details</button>
        </div>
    </div>

<!--Edit-->
    <div id="editModal" class="modal" style="display:none;">
        <div class="modal-content">
            <span class="close" onclick="closeModal()">&times;</span>
            <h3>Update Employee</h3>
            <input type="hidden" id="editId">
            <input type="text" id="editFirstName" placeholder="First Name">
            <input type="text" id="editMiddleInitial" placeholder="M.I.">
            <input type="text" id="editLastName" placeholder="Last Name">
            <input type="text" id="editMobileNumber" placeholder="Mobile Number">
            <input type="email" id="editEmail" placeholder="Email">
            <select id="editSex">
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
            </select>
            <select id="editJobTitle">
                <option value="">Select Job Title</option>
                <option value="Project Manager">Project Manager</option>
                <option value="Business Analyst">Business Analyst</option>
                <option value="Front End Developer">Front End Developer</option>
            </select>
            <button onclick="updateEmployee()">Save Changes</button>
        </div>
    </div>

    <div id="deleteModal" class="modal" style="display:none;">
        <div class="modal-content" style="text-align: center; width: 350px;">
            <span class="close" onclick="closeDeleteModal()">&times;</span>
            <h3 style="margin-bottom: 10px;">Delete Employee</h3>
            <p style="color: #666; font-size: 0.9rem; margin-bottom: 20px;">Are you sure you want to delete this employee?</p>
            <input type="hidden" id="deleteId">
            <div style="display: flex; gap: 10px;">
                <button onclick="closeDeleteModal()" style="background-color: #f1f3f5; color: #333; border: 1px solid #ddd; width: 50%;">Cancel</button>
                <button onclick="confirmDelete()" style="background-color: #dc3545; color: #fff; width: 50%;">Delete</button>
            </div>
        </div>
    </div>

    <div id="messageModal" class="modal" style="display:none;">
        <div class="modal-content" style="text-align: center; width: 350px;">
            <h3 id="msgTitle" style="margin-bottom: 10px;">Notification</h3>
            <p id="msgText" style="color: #666; font-size: 0.9rem; margin-bottom: 20px;"></p>
            <button onclick="closeMessageModal()" style="background-color: #111; color: #fff; width: 100%;">OK</button>
        </div>
    </div>
    
    <script src="employee.js"></script>
</body>
</html>