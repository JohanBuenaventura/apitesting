document.addEventListener("DOMContentLoaded", loadEmployees);

function loadEmployees() {
    fetch("../api/employee_api.php")
    .then(res => res.json())
    .then(data => {
        let tbody = document.getElementById("employeeTableBody");
        tbody.innerHTML = "";

        if (data.status === "success") {
            data.employee.forEach(emp => {
                tbody.innerHTML += `
                <tr>
                    <td>${emp.id}</td>
                    <td>${emp.first_name}</td>
                    <td>${emp.middle_initial}</td>
                    <td>${emp.last_name}</td>
                    <td>${emp.mobile_number}</td>
                    <td>${emp.email}</td>
                    <td>${emp.sex}</td>
                    <td>${emp.job_title}</td>
                    <td class="actions">
                        <button onclick="openEditModal(${emp.id}, '${emp.first_name}', '${emp.middle_initial}', '${emp.last_name}', '${emp.mobile_number}', '${emp.email}', '${emp.sex}', '${emp.job_title}')">Edit</button>
                        <button onclick="deleteEmployee(${emp.id})">Delete</button>
                    </td>
                </tr>`;
            });
        }
    });
}


function openAddEmployeeModal() { document.getElementById("addEmployeeModal").style.display = "flex"; }
function closeAddEmployeeModal() { document.getElementById("addEmployeeModal").style.display = "none"; }

function addEmployee() {
    let payload = {
        first_name: document.getElementById("first_name").value,
        middle_initial: document.getElementById("middle_initial").value,
        last_name: document.getElementById("last_name").value,
        email: document.getElementById("email").value,
        mobile_number: document.getElementById("mobile_number").value,
        sex: document.getElementById("sex").value,
        job_title: document.getElementById("job_title").value
    };

    fetch("../api/employee_api.php", {
        method: "POST",
        body: JSON.stringify(payload),
        headers: { "Content-Type": "application/json" }
    })
    .then(res => res.json())
    .then(data => {
    closeAddEmployeeModal();
    if (data.status === "success") {
        showMessage("Success", data.message);
        document.getElementById("first_name").value = "";
        document.getElementById("middle_initial").value = "";
        document.getElementById("last_name").value = "";
        document.getElementById("email").value = "";
        document.getElementById("mobile_number").value = "";
        document.getElementById("sex").value = "";
        document.getElementById("job_title").value = "";
    } else {
        showMessage("Error", data.message);
    }
});
}

// Edit
function openEditModal(id, fname, mi, lname, mobile, email, sex, job) {
    document.getElementById("editId").value = id;
    document.getElementById("editFirstName").value = fname;
    document.getElementById("editMiddleInitial").value = mi;
    document.getElementById("editLastName").value = lname;
    document.getElementById("editMobileNumber").value = mobile;
    document.getElementById("editEmail").value = email;
    document.getElementById("editSex").value = sex;
    document.getElementById("editJobTitle").value = job;
    
    document.getElementById("editModal").style.display = "flex";
}
function closeModal() { document.getElementById("editModal").style.display = "none"; }

// Update
function updateEmployee() {
    let payload = {
        id: document.getElementById("editId").value,
        first_name: document.getElementById("editFirstName").value,
        middle_initial: document.getElementById("editMiddleInitial").value,
        last_name: document.getElementById("editLastName").value,
        email: document.getElementById("editEmail").value,
        mobile_number: document.getElementById("editMobileNumber").value,
        sex: document.getElementById("editSex").value,
        job_title: document.getElementById("editJobTitle").value
    };
    fetch("../api/employee_api.php", {
        method: "PUT",
        body: JSON.stringify(payload),
        headers: { "Content-Type": "application/json" }
    })
    .then(res => res.json())
    .then(data => {
    closeModal();
    if (data.status === "success") {
        showMessage("Success", data.message);
    } else {
        showMessage("Error", data.message);
    }
});
}

// Delete  
function deleteEmployee(id) {
    document.getElementById("deleteId").value = id;
    document.getElementById("deleteModal").style.display = "flex";
}
function closeDeleteModal() {
    document.getElementById("deleteModal").style.display = "none";
}
function confirmDelete() {
    let id = document.getElementById("deleteId").value;

    fetch(`../api/employee_api.php?id=${id}`, { method: "DELETE" })
    .then(res => res.json())
    .then(data => {
    closeDeleteModal();
    if (data.status === "success") {
        showMessage("Success", data.message);
    } else {
        showMessage("Error", data.message);
    }
});
}


function showMessage(title, text) {
    document.getElementById("msgTitle").innerText = title;
    document.getElementById("msgText").innerText = text;
    document.getElementById("messageModal").style.display = "flex";
}

function closeMessageModal() {
    document.getElementById("messageModal").style.display = "none";
    loadEmployees();
}