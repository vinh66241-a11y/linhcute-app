/* ===============================
   DATABASE (ADMIN QUẢN LÝ)
================================ */

const DATA = [
    {
        phone: "0868748858",
        account: "0868748858",
        bank: "MB Bank",
        name: "Nguyễn Công Vinh",
        score: 100,
        level: "safe",
        note: "Admin Web nhận giao dịch trung gian"
    },
    {
        phone: "0325822569",
        account: "0325822569",
        bank: "MB Bank",
        name: "Nguyễn Vinh Quang",
        score: 100,
        level: "safe",
        note: "Bán iphone Uy Tín"
    },
    {
        phone: "2000",
        account: "66668888",
        bank: "Techcombank",
        name: "Test",
        score: 20,
        level: "danger",
        note: "Nhiều báo cáo rủi ro"
    }
];

/* ===============================
   CORE FUNCTION
================================ */

function TrustApp(input){
    const box = document.getElementById("r");

    if(!input){
        alert("Vui lòng nhập SĐT hoặc STK");
        return;
    }

    const data = DATA.find(item =>
        item.phone === input || item.account === input
    );

    if(!data){
        box.style.display = "block";
        box.className = "result warn";
        box.innerHTML = "Không có dữ liệu cho đối tượng này";
        return;
    }

    const levelText = {
        safe: "Uy tín cao",
        warn: "Cần thận trọng",
        danger: "Rủi ro cao"
    };

    box.style.display = "block";
    box.className = "result " + data.level;

    box.innerHTML = `
        <b>Kết quả tra cứu</b><br><br>
        SĐT: <b>${data.phone || "—"}</b><br>
        STK: <b>${data.account || "—"}</b><br>
        Ngân hàng: <b>${data.bank || "—"}</b><br>
        Tên: <b>${data.name}</b><br>
        Điểm: <b>${data.score}/100</b><br>
        Mức độ: <b>${levelText[data.level]}</b><br>
        Ghi chú: <b>${data.note}</b>
    `;
}
