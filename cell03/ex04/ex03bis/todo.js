// โหลด To-Do List เมื่อหน้าเว็บโหลดเสร็จ
window.onload = () => {
    loadToDo(); // เรียกฟังก์ชัน loadToDo() เพื่อโหลดรายการที่บันทึกไว้ในคุกกี้
};

// การเพิ่ม To-Do ใหม่
document.getElementById("newBtn").onclick = () => {
    const todoText = prompt("Enter your TO DO:").trim(); // ใช้ trim() เพื่อลบช่องว่างหน้าและหลังข้อความ
    if (todoText) { // ตรวจสอบว่าผู้ใช้ป้อนข้อความจริงหรือไม่
        addToDo(todoText); // เพิ่ม To-Do ใหม่
        saveToDo(); // บันทึก To-Do ลงคุกกี้
    }
};

// ฟังก์ชันเพิ่ม To-Do ใหม่
function addToDo(text) {
    const toDoDiv = document.createElement("div"); // สร้าง div ใหม่สำหรับ To-Do
    toDoDiv.textContent = text; // กำหนดข้อความของ To-Do
    toDoDiv.onclick = () => deleteToDo(toDoDiv); // กำหนดฟังก์ชันลบเมื่อคลิกที่ To-Do
    const list = document.getElementById("ft_list"); // ดึงรายการ To-Do จาก DOM

    // เพิ่ม To-Do ที่ตำแหน่งบนสุดของรายการ
    if (list.firstChild) {
        list.insertBefore(toDoDiv, list.firstChild); // ถ้ามี To-Do อื่นอยู่แล้ว ให้เพิ่มที่ด้านบน
    } else {
        list.appendChild(toDoDiv); // ถ้ายังไม่มี To-Do ให้เพิ่มรายการแรก
    }
}

// ฟังก์ชันลบ To-Do
function deleteToDo(toDoDiv) {
    if (confirm("Do you really want to delete this TO DO?")) { // แสดงข้อความยืนยันการลบ
        toDoDiv.remove(); // ลบ To-Do ออกจาก DOM
        saveToDo(); // บันทึกสถานะใหม่ลงคุกกี้หลังการลบ
    }
}

// ฟังก์ชันบันทึก To-Do List ลงในคุกกี้
function saveToDo() {
    const list = document.querySelectorAll("#ft_list div"); // ดึงรายการ To-Do ทั้งหมด
    const toDoArray = []; // อาร์เรย์สำหรับเก็บข้อความของ To-Do
    list.forEach(item => toDoArray.push(item.textContent)); // เพิ่มข้อความของแต่ละ To-Do ลงในอาร์เรย์
    document.cookie = "todo=" + encodeURIComponent(JSON.stringify(toDoArray)) + ";path=/"; 
    // บันทึกอาร์เรย์ลงในคุกกี้ โดยแปลงเป็น JSON และเข้ารหัส
}

// ฟังก์ชันโหลด To-Do จากคุกกี้
function loadToDo() {
    const cookie = document.cookie.split("; ").find(row => row.startsWith("todo=")); 
    // ดึงข้อมูลคุกกี้ที่ชื่อ "todo"
    if (cookie) {
        const toDoArray = JSON.parse(decodeURIComponent(cookie.split("=")[1])); 
        // แปลงข้อมูลจาก JSON ที่เข้ารหัสกลับมาเป็นอาร์เรย์
        toDoArray.reverse().forEach(item => addToDo(item)); 
        // เพิ่ม To-Do แต่ละรายการกลับ (เพิ่มในลำดับจากบนลงล่าง)
    }
}
