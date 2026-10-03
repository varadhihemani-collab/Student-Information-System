
const sampleStudents = [
    {
        studentId: "STU001",
        name: "Rahul Kumar",
        dob: "2005-05-15",
        gender: "Male",
        nationality: "Indian",
        bloodGroup: "B+",
        contact: "9876543210",
        email: "rahul@example.com",
        permanentAddress: "Visakhapatnam",
        currentAddress: "Visakhapatnam",
        city: "Visakhapatnam",
        state: "Andhra Pradesh",
        pinCode: "530001",
        country: "India",
        department: "Computer Science",
        year: "3rd Year",
        enrollmentDate: "2024-06-10",
        academicStatus: "Active",
        gpa: 8.5,
        fatherName: "Ramesh Kumar",
        motherName: "Lakshmi Kumar",
        guardianContact: "9876500001",
        guardianEmail: "guardian1@example.com",
        relation: "Father"
    },
    {
        studentId: "STU002",
        name: "Priya Sharma",
        dob: "2006-02-20",
        gender: "Female",
        nationality: "Indian",
        bloodGroup: "A+",
        contact: "9876543211",
        email: "priya@example.com",
        permanentAddress: "Vijayawada",
        currentAddress: "Vijayawada",
        city: "Vijayawada",
        state: "Andhra Pradesh",
        pinCode: "520001",
        country: "India",
        department: "Business Administration",
        year: "2nd Year",
        enrollmentDate: "2025-06-12",
        academicStatus: "Active",
        gpa: 9.0,
        fatherName: "Suresh Sharma",
        motherName: "Anita Sharma",
        guardianContact: "9876500002",
        guardianEmail: "guardian2@example.com",
        relation: "Father"
    },
    {
        studentId: "STU003",
        name: "Anjali Reddy",
        dob: "2007-08-12",
        gender: "Female",
        nationality: "Indian",
        bloodGroup: "O+",
        contact: "9876543212",
        email: "anjali@example.com",
        permanentAddress: "Hyderabad",
        currentAddress: "Hyderabad",
        city: "Hyderabad",
        state: "Telangana",
        pinCode: "500001",
        country: "India",
        department: "Information Technology",
        year: "1st Year",
        enrollmentDate: "2026-06-15",
        academicStatus: "Active",
        gpa: 8.8,
        fatherName: "Ravi Reddy",
        motherName: "Meena Reddy",
        guardianContact: "9876500003",
        guardianEmail: "guardian3@example.com",
        relation: "Father"
    }
];
/* ================= LOAD DATA ================= */
let students =
    JSON.parse(localStorage.getItem("studentInformationSystem_students")) ||
    sampleStudents;
let academicRecords =
    JSON.parse(localStorage.getItem("studentInformationSystem_academic")) ||
    [
        {
            studentId: "STU001",
            subject: "Data Structures",
            marks: 88,
            credits: 4
        },
        {
            studentId: "STU002",
            subject: "Business Management",
            marks: 92,
            credits: 3
        },
        {
            studentId: "STU003",
            subject: "Web Technologies",
            marks: 86,
            credits: 4
        }
    ];

let attendanceRecords =
    JSON.parse(localStorage.getItem("studentInformationSystem_attendance")) ||
    [
        {
            studentId: "STU001",
            date: "2026-09-01",
            status: "Present"
        },
        {
            studentId: "STU001",
            date: "2026-09-02",
            status: "Present"
        },
        {
            studentId: "STU002",
            date: "2026-09-01",
            status: "Present"
        },
        {
            studentId: "STU002",
            date: "2026-09-02",
            status: "Absent"
        },
        {
            studentId: "STU003",
            date: "2026-09-01",
            status: "Present"
        }
    ];

let feeRecords =
    JSON.parse(localStorage.getItem("studentInformationSystem_fees")) ||
    [
        {
            studentId: "STU001",
            total: 60000,
            paid: 50000,
            status: "Partial"
        },
        {
            studentId: "STU002",
            total: 55000,
            paid: 55000,
            status: "Paid"
        },
        {
            studentId: "STU003",
            total: 50000,
            paid: 20000,
            status: "Partial"
        }
    ];
/* ================= SAVE DATA ================= */

function saveData() {
    localStorage.setItem(
        "studentInformationSystem_students",
        JSON.stringify(students)
    );

    localStorage.setItem(
        "studentInformationSystem_academic",
        JSON.stringify(academicRecords)
    );

    localStorage.setItem(
        "studentInformationSystem_attendance",
        JSON.stringify(attendanceRecords)
    );

    localStorage.setItem(
        "studentInformationSystem_fees",
        JSON.stringify(feeRecords)
    );
}
/* ================= UTILITY ================= */

function getStudentById(id) {
    return students.find(student => student.studentId === id);
}

function getInitials(name) {
    return name
        .split(" ")
        .map(word => word[0])
        .join("")
        .substring(0, 2)
        .toUpperCase();
}
function showMessage(elementId, message, type = "success") {
    const element = document.getElementById(elementId);
    if (!element) return;
    element.textContent = message;
    element.className = "message-box";
    if (type === "success") {
        element.classList.add("message-success");
    } else {
        element.classList.add("message-error");
    }
}
/* ================= DASHBOARD ================= */
function updateDashboard() {
    const total = students.length;
    const active = students.filter(
        student => student.academicStatus === "Active"
    ).length;
    const departments = new Set(
        students.map(student => student.department)
    ).size;
    const totalGPA = students.reduce(
        (sum, student) => sum + Number(student.gpa || 0),
        0
    );
    const averageGPA =
        total > 0 ? (totalGPA / total).toFixed(2) : "0.00";
    document.getElementById("totalStudents").textContent = total;
    document.getElementById("activeStudents").textContent = active;
    document.getElementById("totalDepartments").textContent = departments;
    document.getElementById("averageGPA").textContent = averageGPA;
    document.getElementById("enrollmentProgress").style.width =
        Math.min(total * 10, 100) + "%";
    updateAttendancePercentage();
}
function updateAttendancePercentage() {
    const total = attendanceRecords.length;
    const present = attendanceRecords.filter(
        record => record.status === "Present"
    ).length;
    const percentage =
        total > 0
            ? Math.round((present / total) * 100)
            : 0;
    document.getElementById("attendancePercentage").textContent =
        percentage + "%";
}
/* ================= STUDENT LIST ================= */
function displayStudents() {
    const container = document.getElementById("studentList");
    if (!container) return;
    const search =
        document.getElementById("searchStudent").value
            .toLowerCase()
            .trim();
    const department =
        document.getElementById("departmentFilter").value;
    const year =
        document.getElementById("yearFilter").value;
    const status =
        document.getElementById("statusFilter").value;
    const filteredStudents = students.filter(student => {
        const matchesSearch =
            student.name.toLowerCase().includes(search) ||
            student.studentId.toLowerCase().includes(search);
        const matchesDepartment =
            !department ||
            student.department === department;
        const matchesYear =
            !year ||
            student.year === year;
        const matchesStatus =
            !status ||
            student.academicStatus === status;
        return (
            matchesSearch &&
            matchesDepartment &&
            matchesYear &&
            matchesStatus
        );
    });
    if (filteredStudents.length === 0) {
        container.innerHTML = `
            <div class="dashboard-card">
                <h3>No Students Found</h3>
                <p>Try changing the search or filter options.</p>
            </div>
        `;
        return;
    }
    container.innerHTML = filteredStudents.map(student => `
        <div class="student-card">
            <div class="student-avatar">
                ${getInitials(student.name)}
            </div>
            <h3>${student.name}</h3>
            <p><strong>ID:</strong> ${student.studentId}</p>
            <p><strong>Department:</strong> ${student.department}</p>
            <p><strong>Year:</strong> ${student.year}</p>
            <p><strong>GPA:</strong> ${student.gpa || "N/A"}</p>
            <span class="status-badge">
                ${student.academicStatus}
            </span>
            <div class="student-actions">
                <button
                    class="small-btn"
                    onclick="viewStudent('${student.studentId}')"
                >
                    View
                </button>
                <button
                    class="secondary-btn"
                    onclick="editStudent('${student.studentId}')"
                >
                    Edit
                </button>
                <button
                    class="danger-btn"
                    onclick="deleteStudent('${student.studentId}')"
                >
                    Delete
                </button>
            </div>
        </div>
    `).join("");
}
/* ================= STUDENT PROFILE ================= */

function viewStudent(studentId) {
    const student = getStudentById(studentId);
    if (!student) return;
    const panel = document.getElementById("studentProfile");
    panel.innerHTML = `
        <div class="profile-header">
            <div>
                <h2>👤 Student Profile</h2>
                <p>Complete student information</p>
            </div>
            <button
                class="danger-btn"
                onclick="closeStudentProfile()"
            >
                Close
            </button>
        </div>
        <div class="profile-details">
            <div class="detail-box">
                <strong>Student ID</strong><br>
                ${student.studentId}
            </div>
            <div class="detail-box">
                <strong>Full Name</strong><br>
                ${student.name}
            </div>
            <div class="detail-box">
                <strong>Date of Birth</strong><br>
                ${student.dob || "N/A"}
            </div>
            <div class="detail-box">
                <strong>Gender</strong><br>
                ${student.gender || "N/A"}
            </div>
            <div class="detail-box">
                <strong>Nationality</strong><br>
                ${student.nationality || "N/A"}
            </div>
            <div class="detail-box">
                <strong>Blood Group</strong><br>
                ${student.bloodGroup || "N/A"}
            </div>
            <div class="detail-box">
                <strong>Contact</strong><br>
                ${student.contact || "N/A"}
            </div>
            <div class="detail-box">
                <strong>Email</strong><br>
                ${student.email || "N/A"}
            </div>
            <div class="detail-box">
                <strong>Permanent Address</strong><br>
                ${student.permanentAddress || "N/A"}
            </div>
            <div class="detail-box">
                <strong>Current Address</strong><br>
                ${student.currentAddress || "N/A"}
            </div>
            <div class="detail-box">
                <strong>City / State</strong><br>
                ${student.city || "N/A"} / ${student.state || "N/A"}
            </div>
            <div class="detail-box">
                <strong>Department</strong><br>
                ${student.department}
            </div>
            <div class="detail-box">
                <strong>Year</strong><br>
                ${student.year}
            </div>
            <div class="detail-box">
                <strong>Enrollment Date</strong><br>
                ${student.enrollmentDate || "N/A"}
            </div>
            <div class="detail-box">
                <strong>GPA / CGPA</strong><br>
                ${student.gpa || "N/A"}
            </div>
            <div class="detail-box">
                <strong>Academic Status</strong><br>
                ${student.academicStatus}
            </div>
            <div class="detail-box">
                <strong>Father's Name</strong><br>
                ${student.fatherName || "N/A"}
            </div>
            <div class="detail-box">
                <strong>Mother's Name</strong><br>
                ${student.motherName || "N/A"}
            </div>
            <div class="detail-box">
                <strong>Guardian Contact</strong><br>
                ${student.guardianContact || "N/A"}
            </div>
            <div class="detail-box">
                <strong>Guardian Email</strong><br>
                ${student.guardianEmail || "N/A"}
            </div>
        </div>
    `;
    panel.classList.add("show");
    panel.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });
}
function closeStudentProfile() {
    document
        .getElementById("studentProfile")
        .classList.remove("show");
}
/* ================= EDIT STUDENT ================= */

function editStudent(studentId) {
    const student = getStudentById(studentId);
    if (!student) return;
    const newName = prompt(
        "Enter student name:",
        student.name
    );
    if (newName === null || newName.trim() === "") {
        return;
    }
    const newGPA = prompt(
        "Enter GPA / CGPA:",
        student.gpa
    );
    student.name = newName.trim();
    if (newGPA !== null && newGPA !== "") {
        student.gpa = Number(newGPA);
    }
    saveData();
    displayStudents();
    updateDashboard();
    alert("Student information updated successfully!");
}
/* ================= DELETE STUDENT ================= */
function deleteStudent(studentId) {
    const student = getStudentById(studentId);
    if (!student) return;
    const confirmDelete = confirm(
        `Delete ${student.name} from the system?`
    );
    if (!confirmDelete) return;
    students = students.filter(
        student => student.studentId !== studentId
    );
    academicRecords = academicRecords.filter(
        record => record.studentId !== studentId
    );
    attendanceRecords = attendanceRecords.filter(
        record => record.studentId !== studentId
    );
    feeRecords = feeRecords.filter(
        record => record.studentId !== studentId
    );
    saveData();
    displayStudents();
    updateDashboard();
    updateStudentDropdowns();
    alert("Student deleted successfully!");
}
function nextRegistrationStep(stepNumber) {
    if (stepNumber > 1) {
        const previousStep =
            document.getElementById(
                `registrationStep${stepNumber - 1}`
            );
        if (previousStep) {
            const requiredFields =
                previousStep.querySelectorAll("[required]");
            for (const field of requiredFields) {
                if (!field.checkValidity()) {
                    field.reportValidity();
                    return;
                }
            }
        }
    }
    document
        .querySelectorAll(".registration-step")
        .forEach(step => {
            step.classList.remove("active");
        });
    document
        .querySelectorAll(".step")
        .forEach(step => {
            step.classList.remove("active");
        });
    const target =
        document.getElementById(
            `registrationStep${stepNumber}`
        );
    const indicator =
        document.getElementById(
            `stepIndicator${stepNumber}`
        );
    if (target) {
        target.classList.add("active");
    }
    if (indicator) {
        indicator.classList.add("active");
    }
}
function registerStudent(event) {
    event.preventDefault();
    const studentId =
        document.getElementById("studentId").value.trim();
    if (
        students.some(
            student => student.studentId === studentId
        )
    ) {
        showMessage(
            "registrationMessage",
            "Student ID already exists.",
            "error"
        );
        nextRegistrationStep(1);
        return;
    }
    const newStudent = {
        studentId: studentId,
        name:
            document.getElementById("studentName").value.trim(),
        dob:
            document.getElementById("dob").value,
        gender:
            document.getElementById("gender").value,
        nationality:
            document.getElementById("nationality").value,
        bloodGroup:
            document.getElementById("bloodGroup").value,
        contact:
            document.getElementById("contact").value,
        email:
            document.getElementById("email").value,
        permanentAddress:
            document.getElementById("permanentAddress").value,
        currentAddress:
            document.getElementById("currentAddress").value,
        city:
            document.getElementById("city").value,
        state:
            document.getElementById("state").value,
        pinCode:
            document.getElementById("pinCode").value,
        country:
            document.getElementById("country").value,
        department:
            document.getElementById("department").value,
        year:
            document.getElementById("year").value,
        enrollmentDate:
            document.getElementById("enrollmentDate").value,
        academicStatus:
            document.getElementById("academicStatus").value,
        gpa:
            Number(document.getElementById("gpa").value) || 0,
        fatherName:
            document.getElementById("fatherName").value,
        motherName:
            document.getElementById("motherName").value,
        guardianContact:
            document.getElementById("guardianContact").value,
        guardianEmail:
            document.getElementById("guardianEmail").value,
        relation:
            document.getElementById("relation").value
    };
    students.push(newStudent);
    saveData();
    displayStudents();
    updateDashboard();
    updateStudentDropdowns();
    showMessage(
        "registrationMessage",
        "✅ Student registered successfully!",
        "success"
    );
    document.getElementById("studentForm").reset();
    document.getElementById("country").value = "India";
    document.getElementById("nationality").value = "Indian";
    nextRegistrationStep(1);
    document
        .getElementById("registrationMessage")
        .scrollIntoView({
            behavior: "smooth",
            block: "center"
        });
}
function updateStudentDropdowns() {
    const dropdownIds = [
        "academicStudent",
        "attendanceStudent",
        "feeStudent",
        "documentStudent",
        "idCardStudent"
    ];
    dropdownIds.forEach(id => {
        const dropdown = document.getElementById(id);
        if (!dropdown) return;
        const currentValue = dropdown.value;
        dropdown.innerHTML = `
            <option value="">Select Student</option>
        `;
        students.forEach(student => {
            const option =
                document.createElement("option");
            option.value = student.studentId;
            option.textContent =
                `${student.studentId} - ${student.name}`;
            dropdown.appendChild(option);
        });
        dropdown.value = currentValue;
    });
    updateDepartmentFilter();
}
function updateDepartmentFilter() {
    const dropdown =
        document.getElementById("departmentFilter");
    if (!dropdown) return;
    const currentValue = dropdown.value;
    const departments =
        [...new Set(
            students.map(student => student.department)
        )].sort();
    dropdown.innerHTML =
        `<option value="">All Departments</option>`;
    departments.forEach(department => {
        const option =
            document.createElement("option");
        option.value = department;
        option.textContent = department;
        dropdown.appendChild(option);
    });
    dropdown.value = currentValue;
}
function addAcademicRecord() {
    const studentId =
        document.getElementById("academicStudent").value;
    const subject =
        document.getElementById("subjectName").value.trim();
    const marks =
        Number(document.getElementById("subjectMarks").value);
    const credits =
        Number(document.getElementById("subjectCredits").value);
    if (!studentId || !subject || isNaN(marks)) {
        alert("Please fill student, subject and marks.");
        return;
    }
    academicRecords.push({
        studentId,
        subject,
        marks,
        credits: credits || 0
    });
    saveData();
    displayAcademicRecords();
    document.getElementById("subjectName").value = "";
    document.getElementById("subjectMarks").value = "";
    document.getElementById("subjectCredits").value = "";
    alert("Academic record added successfully!");
}
function getGrade(marks) {
    if (marks >= 90) return "A+";
    if (marks >= 80) return "A";
    if (marks >= 70) return "B";
    if (marks >= 60) return "C";
    if (marks >= 50) return "D";
    return "F";
}
function displayAcademicRecords() {
    const container =
        document.getElementById("academicRecords");
    if (!container) return;
    if (academicRecords.length === 0) {
        container.innerHTML =
            "<p>No academic records available.</p>";
        return;
    }
    container.innerHTML =
        academicRecords.map((record, index) => {
            const student =
                getStudentById(record.studentId);
            return `
                <div class="record-item">
                    <div>
                        <strong>
                            ${student ? student.name : "Unknown Student"}
                        </strong>
                        <br>
                        <small>
                            ${record.subject}
                            |
                            Marks: ${record.marks}
                            |
                            Credits: ${record.credits}
                            |
                            Grade: ${getGrade(record.marks)}
                        </small>
                    </div>
                    <button
                        class="danger-btn"
                        onclick="deleteAcademicRecord(${index})"
                    >
                        Delete
                    </button>

                </div>
            `;
        }).join("");
}
function deleteAcademicRecord(index) {
    academicRecords.splice(index, 1);
    saveData();
    displayAcademicRecords();
}
function addAttendance() {
    const studentId =
        document.getElementById("attendanceStudent").value;
    const date =
        document.getElementById("attendanceDate").value;
    const status =
        document.getElementById("attendanceStatus").value;
    if (!studentId || !date) {
        alert("Please select student and date.");
        return;
    }
    attendanceRecords.push({
        studentId,
        date,
        status
    });
    saveData();
    displayAttendanceRecords();
    updateDashboard();
    document.getElementById("attendanceDate").value = "";
    alert("Attendance record added successfully!");
}
function displayAttendanceRecords() {
    const container =
        document.getElementById("attendanceRecords");
    if (!container) return;
    if (attendanceRecords.length === 0) {
        container.innerHTML =
            "<p>No attendance records available.</p>";
        return;
    }
    container.innerHTML =
        attendanceRecords
            .slice()
            .reverse()
            .map((record, index) => {
                const student =
                    getStudentById(record.studentId);
                const actualIndex =
                    attendanceRecords.length - 1 - index;
                return `
                    <div class="record-item">
                        <div>
                            <strong>
                                ${student ? student.name : "Unknown Student"}
                            </strong>
                            <br>
                            <small>
                                Date: ${record.date}
                                |
                                Status: ${record.status}
                            </small>
                        </div>
                        <button
                            class="danger-btn"
                            onclick="deleteAttendance(${actualIndex})"
                        >
                            Delete
                        </button>

                    </div>
                `;
            }).join("");
}
function deleteAttendance(index) {
    attendanceRecords.splice(index, 1);
    saveData();
    displayAttendanceRecords();
    updateDashboard();
}
function addFeeRecord() {
    const studentId =
        document.getElementById("feeStudent").value;
    const total =
        Number(document.getElementById("totalFee").value);
    const paid =
        Number(document.getElementById("paidFee").value);
    const status =
        document.getElementById("feeStatus").value;
    if (!studentId || isNaN(total) || isNaN(paid)) {
        alert("Please enter student, total fee and paid fee.");
        return;
    }
    feeRecords.push({
        studentId,
        total,
        paid,
        status
    });
    saveData();
    displayFeeRecords();
    document.getElementById("totalFee").value = "";
    document.getElementById("paidFee").value = "";
    alert("Fee record added successfully!");
}
function displayFeeRecords() {
    const container =
        document.getElementById("feeRecords");
    if (!container) return;
    if (feeRecords.length === 0) {
        container.innerHTML =
            "<p>No fee records available.</p>";
        return;
    }
    container.innerHTML =
        feeRecords.map((record, index) => {
            const student =
                getStudentById(record.studentId);
            const pending =
                Math.max(
                    Number(record.total) - Number(record.paid),
                    0
                );
            return `
                <div class="record-item">
                    <div>
                        <strong>
                            ${student ? student.name : "Unknown Student"}
                        </strong>
                        <br>
                        <small>
                            Total: ₹${record.total}
                            |
                            Paid: ₹${record.paid}
                            |
                            Pending: ₹${pending}
                            |
                            Status: ${record.status}
                        </small>
                    </div>
                    <button
                        class="danger-btn"
                        onclick="deleteFeeRecord(${index})"
                    >
                        Delete
                    </button>
                </div>
            `;
        }).join("");
}
function deleteFeeRecord(index) {
    feeRecords.splice(index, 1);
    saveData();
    displayFeeRecords();
}
function handleDocumentSelection() {
    const fileInput =
        document.getElementById("studentDocument");
    const student =
        document.getElementById("documentStudent").value;
    const file =
        fileInput.files[0];
    if (!student) {
        showMessage(
            "documentMessage",
            "Please select a student first.",
            "error"
        );
        fileInput.value = "";
        return;
    }
    if (!file) return;
    showMessage(
        "documentMessage",
        `📁 ${file.name} selected successfully for ${student}.`,
        "success"
    );
}
function generateIDCard() {
    const studentId =
        document.getElementById("idCardStudent").value;
    const student =
        getStudentById(studentId);
    if (!student) {
        alert("Please select a student.");
        return;
    }
    document.getElementById("idCardResult").innerHTML = `
        <div class="id-card">
            <div class="id-card-top">
                <h2>🎓 Student ID Card</h2>
                <p>Student Information System</p>
            </div>
            <div class="id-card-body">
                <div class="id-avatar">
                    ${getInitials(student.name)}
                </div>
                <h3>${student.name}</h3>
                <div class="id-info">
                    <p>
                        <strong>Student ID:</strong>
                        ${student.studentId}
                    </p>
                    <p>
                        <strong>Department:</strong>
                        ${student.department}
                    </p>
                    <p>
                        <strong>Year:</strong>
                        ${student.year}
                    </p>
                    <p>
                        <strong>GPA:</strong>
                        ${student.gpa}
                    </p>
                    <p>
                        <strong>Contact:</strong>
                        ${student.contact}
                    </p>
                    <p>
                        <strong>Status:</strong>
                        ${student.academicStatus}
                    </p>
                </div>
            </div>
        </div>
    `;
}
function generateReport() {
    const totalStudents =
        students.length;
    const activeStudents =
        students.filter(
            student => student.academicStatus === "Active"
        ).length;
    const departments =
        new Set(
            students.map(student => student.department)
        ).size;
    const averageGPA =
        totalStudents > 0
            ? (
                students.reduce(
                    (sum, student) =>
                        sum + Number(student.gpa || 0),
                    0
                ) / totalStudents
            ).toFixed(2)
            : "0.00";
    const reportHTML = `
        <div class="report-summary">
            <div class="report-box">
                <strong>Total Students</strong>
                <h2>${totalStudents}</h2>
            </div>
            <div class="report-box">
                <strong>Active Students</strong>
                <h2>${activeStudents}</h2>
            </div>
            <div class="report-box">
                <strong>Departments</strong>
                <h2>${departments}</h2>
            </div>
            <div class="report-box">
                <strong>Average GPA</strong>
                <h2>${averageGPA}</h2>
            </div>
        </div>
        <div class="report-table-wrapper">
            <table class="report-table">
                <thead>
                    <tr>
                        <th>Student ID</th>
                        <th>Name</th>
                        <th>Department</th>
                        <th>Year</th>
                        <th>GPA</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    ${students.map(student => `
                        <tr>
                            <td>${student.studentId}</td>
                            <td>${student.name}</td>
                            <td>${student.department}</td>
                            <td>${student.year}</td>
                            <td>${student.gpa}</td>
                            <td>${student.academicStatus}</td>
                        </tr>
                    `).join("")}
                </tbody>
            </table>
        </div>
    `;
    document.getElementById("reportResult").innerHTML =
        reportHTML;
}
function exportStudentsCSV() {
    if (students.length === 0) {
        alert("No students available to export.");
        return;
    }
    const headers = [
        "Student ID",
        "Name",
        "Department",
        "Year",
        "GPA",
        "Status",
        "Contact",
        "Email"
    ];
    const rows = students.map(student => [
        student.studentId,
        student.name,
        student.department,
        student.year,
        student.gpa,
        student.academicStatus,
        student.contact,
        student.email
    ]);
    const csvContent = [
        headers,
        ...rows
    ]
        .map(row =>
            row.map(value =>
                `"${String(value).replace(/"/g, '""')}"`
            ).join(",")
        )
        .join("\n");
    const blob =
        new Blob([csvContent], {
            type: "text/csv;charset=utf-8;"
        });
    const url =
        URL.createObjectURL(blob);
    const link =
        document.createElement("a");
    link.href = url;
    link.download =
        "student-information-report.csv";
    link.click();
    URL.revokeObjectURL(url);
}
function registerUser() {
    const email =
        document.getElementById("registerEmail").value.trim();
    const password =
        document.getElementById("registerPassword").value;
    if (!email || !password) {
        showMessage(
            "loginMessage",
            "Please enter email and password.",
            "error"
        );
        return;
    }
    const users =
        JSON.parse(
            localStorage.getItem("studentSystemUsers")
        ) || [];
    if (
        users.some(
            user => user.email === email
        )
    ) {
        showMessage(
            "loginMessage",
            "Account already exists.",
            "error"
        );
        return;
    }
    users.push({
        email,
        password
    });
    localStorage.setItem(
        "studentSystemUsers",
        JSON.stringify(users)
    );
    showMessage(
        "loginMessage",
        "✅ Account created successfully. You can now login.",
        "success"
    );
    document.getElementById("registerEmail").value = "";
    document.getElementById("registerPassword").value = "";
}
function loginUser() {
    const email =
        document.getElementById("loginEmail").value.trim();
    const password =
        document.getElementById("loginPassword").value;
    const users =
        JSON.parse(
            localStorage.getItem("studentSystemUsers")
        ) || [];
    const user =
        users.find(
            account =>
                account.email === email &&
                account.password === password
        );
    if (user) {
        showMessage(
            "loginMessage",
            "✅ Login successful! Welcome to Student Information System.",
            "success"
        );
    } else {
        showMessage(
            "loginMessage",
            "❌ Invalid email or password.",
            "error"
        );
    }
}
function toggleDarkMode() {
    document.body.classList.toggle("dark-mode");
    const darkMode =
        document.body.classList.contains("dark-mode");
    localStorage.setItem(
        "studentSystemDarkMode",
        darkMode
    );
    document.getElementById("darkModeBtn").textContent =
        darkMode
            ? "☀️ Light Mode"
            : "🌙 Dark Mode";
}
function loadDarkMode() {
    const darkMode =
        localStorage.getItem(
            "studentSystemDarkMode"
        ) === "true";
    if (darkMode) {
        document.body.classList.add("dark-mode");
        document.getElementById("darkModeBtn").textContent =
            "☀️ Light Mode";
    }
}
document.addEventListener("DOMContentLoaded", function () {
    console.log(
        "Student Information System loaded successfully."
    );
    document
        .getElementById("studentForm")
        .addEventListener(
            "submit",
            registerStudent
        );
    document
        .getElementById("searchStudent")
        .addEventListener(
            "input",
            displayStudents
        );
    document
        .getElementById("departmentFilter")
        .addEventListener(
            "change",
            displayStudents
        );
    document
        .getElementById("yearFilter")
        .addEventListener(
            "change",
            displayStudents
        );
    document
        .getElementById("statusFilter")
        .addEventListener(
            "change",
            displayStudents
        );
    const attendanceDate =
        document.getElementById("attendanceDate");
    if (attendanceDate) {
        attendanceDate.value =
            new Date()
                .toISOString()
                .split("T")[0];
    }
    updateStudentDropdowns();
    displayStudents();
    displayAcademicRecords();
    displayAttendanceRecords();
    displayFeeRecords();
    updateDashboard();
    loadDarkMode();
});