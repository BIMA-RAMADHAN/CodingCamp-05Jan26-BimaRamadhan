// Mengambil elemen dari HTML
const taskInput = document.getElementById('taskInput');
const dateInput = document.getElementById('dateInput');
const tableBody = document.getElementById('todoTableBody');
const emptyMessage = document.getElementById('emptyMessage');
const filterOption = document.getElementById('filterOption');

// Fungsi Menambah Tugas (Add)
function addTask() {
    const taskValue = taskInput.value;
    const dateValue = dateInput.value;

    // 1. Validasi Input Form (Wajib ada sesuai instruksi)
    if (taskValue === '' || dateValue === '') {
        alert("Please fill in both the task and the date!");
        return;
    }

    // Hilangkan pesan "No task found" jika ada
    if (emptyMessage) {
        emptyMessage.style.display = 'none';
    }

    // Buat Baris Tabel Baru (tr)
    const row = document.createElement('tr');
    row.classList.add('todo-item'); // Class untuk filter

    // Isi Baris dengan data
    row.innerHTML = `
        <td class="task-text">${taskValue}</td>
        <td>${dateValue}</td>
        <td><span class="status-badge pending">Pending</span></td>
        <td>
            <button class="action-btn check-btn" onclick="toggleComplete(this)">✔</button>
            <button class="action-btn delete-btn" onclick="deleteTask(this)">🗑</button>
        </td>
    `;

    // Masukkan ke dalam tabel
    tableBody.appendChild(row);

    // Reset form input
    taskInput.value = '';
    dateInput.value = '';
}

// Fungsi Menandai Selesai (Update Status)
function toggleComplete(button) {
    const row = button.parentElement.parentElement;
    const taskText = row.querySelector('.task-text');
    const statusBadge = row.querySelector('.status-badge');

    // Ubah tampilan jika sudah selesai atau belum
    if (statusBadge.innerText === 'Pending') {
        statusBadge.innerText = 'Completed';
        statusBadge.classList.remove('pending');
        statusBadge.classList.add('completed');
        taskText.classList.add('completed-task');
    } else {
        statusBadge.innerText = 'Pending';
        statusBadge.classList.remove('completed');
        statusBadge.classList.add('pending');
        taskText.classList.remove('completed-task');
    }
    
    // Refresh filter agar tampilan langsung update jika sedang difilter
    filterTasks(); 
}

// Fungsi Menghapus Satu Tugas (Delete)
function deleteTask(button) {
    const row = button.parentElement.parentElement;
    row.remove();
    checkEmpty();
}

// Fungsi Menghapus Semua (Delete All)
function deleteAll() {
    // Menghapus semua baris yang memiliki class 'todo-item'
    const rows = document.querySelectorAll('.todo-item');
    rows.forEach(row => row.remove());
    checkEmpty();
}

// Fungsi Filter (All, Completed, Uncompleted)
function filterTasks() {
    const filterValue = filterOption.value;
    const rows = document.querySelectorAll('.todo-item');

    rows.forEach(row => {
        const statusText = row.querySelector('.status-badge').innerText;
        
        if (filterValue === 'all') {
            row.style.display = '';
        } else if (filterValue === 'completed' && statusText === 'Completed') {
            row.style.display = '';
        } else if (filterValue === 'uncompleted' && statusText === 'Pending') {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });
}

// Fungsi Cek apakah tabel kosong (untuk menampilkan "No task found")
function checkEmpty() {
    const rows = document.querySelectorAll('.todo-item');
    if (rows.length === 0) {
        emptyMessage.style.display = '';
    }
}