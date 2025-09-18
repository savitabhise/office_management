# Office Management System (Node.js + Express + MongoDB)

This project is a simple **Office Management System** built with **Node.js**, **Express**, **MongoDB**, and **EJS**.  
It allows management of **Departments** and **Employees** with CRUD operations, pagination, search, and dynamic location dropdowns (Country/State/City).

---

## 📌 Assignment Information
- **Assignment started on:** 17 September 2025, 9:00 PM (IST)
- **Tech Stack:** Node.js, Express, MongoDB, Mongoose, EJS, Tailwind CSS
- **Database:** MongoDB (local / MongoDB compass)

---

## 🚀 Features
- Department Management (Add, Edit, Delete, List)
- Employee Management (Add, Edit, Delete, List, View Details)
- Employee Supervisor assignment (self-supervisor prevention)
- Country/State/City dropdowns using external API
- Server-side Pagination, Search & Filters
- MVC folder structure
- Postman Collection for API testing
- EJS layouts with Tailwind styling

---

## 📂 Project Structure
office-management/
├─ controllers/
│ ├─ departmentsController.js
│ └─ employeesController.js
├─ models/
│ ├─ Department.js
│ └─ Employee.js
├─ routes/
│ ├─ departments.js
│ └─ employees.js
├─ views/
│ ├─ layouts/
│ │ └─ main.ejs
│ ├─ departments/
│ │ ├─ index.ejs
│ │ ├─ new.ejs
│ │ └─ edit.ejs
│ └─ employees/
│ ├─ index.ejs
│ ├─ new.ejs
│ ├─ edit.ejs
│ └─ show.ejs
├─ public/
│ ├─ css/
│ │ └─ style.css
│ └─ js/
│ └─ location-dropdowns.js
├─ .env.example
├─ index.js
└─ package.json


### 1. Clone Repository
bash
git clone https://github.com/savitabhise/office-management.git
cd office-management