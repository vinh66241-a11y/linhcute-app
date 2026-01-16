/* ===============================
   CHECK UY TÍN - iOS 26
   FILE: trust.js
   VERSION: 1.0
================================ */

// Database gốc từ yêu cầu ban đầu
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
   CORE FUNCTION - ĐƠN GIẢN
================================ */

function TrustApp(input) {
    // Lấy các phần tử DOM
    const box = document.getElementById("resultContainer");
    const loading = document.getElementById("loadingSpinner");
    const button = document.getElementById("checkButton");
    const inputField = document.getElementById("queryInput");
    
    // Nếu không có input từ tham số, lấy từ ô nhập
    if (!input && inputField) {
        input = inputField.value.trim();
    }
    
    if (!input) {
        showAlert("Vui lòng nhập SĐT hoặc STK", "error");
        return;
    }
    
    // Hiển thị loading
    if (loading) loading.classList.remove("hidden");
    if (button) {
        button.disabled = true;
        button.textContent = "Đang kiểm tra...";
    }
    
    // Giả lập delay
    setTimeout(() => {
        // Tìm kiếm trong database
        const data = DATA.find(item =>
            item.phone === input || item.account === input
        );
        
        // Ẩn loading
        if (loading) loading.classList.add("hidden");
        if (button) {
            button.disabled = false;
            button.textContent = "Kiểm tra ngay";
        }
        
        // Hiển thị kết quả
        if (box) {
            if (!data) {
                // Không tìm thấy
                box.innerHTML = `
                    <div class="record-card" data-level="neutral">
                        <div class="record-header" style="background: linear-gradient(135deg, #8E8E93, #AEAEB2)">
                            <div class="record-icon">🔍</div>
                            <div class="record-title">
                                <h3>Không tìm thấy</h3>
                                <p>Không có dữ liệu cho "${input}"</p>
                            </div>
                        </div>
                        <div class="record-body">
                            <div class="empty-state">
                                <div class="empty-icon">🔍</div>
                                <h4>Thông tin chưa có trong hệ thống</h4>
                                <p>Số điện thoại/STK bạn tìm kiếm chưa được ghi nhận.</p>
                            </div>
                        </div>
                    </div>
                `;
            } else {
                // Tìm thấy - hiển thị chi tiết
                const levelText = {
                    safe: { title: "✅ Uy Tín Cao", color: "#34C759", icon: "✅" },
                    warn: { title: "⚠️ Cần Thận Trọng", color: "#FF9500", icon: "⚠️" },
                    danger: { title: "🚨 Rủi Ro Cao", color: "#FF3B30", icon: "🚨" }
                };
                
                const config = levelText[data.level] || levelText.safe;
                
                box.innerHTML = `
                    <div class="record-card" data-level="${data.level}">
                        <div class="record-header" style="background: linear-gradient(135deg, ${config.color}, ${config.color}99)">
                            <div class="record-icon">${config.icon}</div>
                            <div class="record-title">
                                <h3>${config.title}</h3>
                                <p>${data.name}</p>
                            </div>
                            <div class="record-score">
                                <div class="score-circle" style="border-color: ${config.color}">
                                    <span>${data.score}</span>
                                </div>
                                <small>điểm</small>
                            </div>
                        </div>
                        <div class="record-body">
                            <div class="record-info">
                                <div class="info-row">
                                    <span class="label">📞 SĐT:</span>
                                    <span class="value">${data.phone || "—"}</span>
                                </div>
                                <div class="info-row">
                                    <span class="label">🏦 STK:</span>
                                    <span class="value">${data.account || "—"}</span>
                                </div>
                                <div class="info-row">
                                    <span class="label">💳 Ngân hàng:</span>
                                    <span class="value">${data.bank || "—"}</span>
                                </div>
                                <div class="info-row">
                                    <span class="label">📊 Điểm:</span>
                                    <span class="value">${data.score}/100</span>
                                </div>
                            </div>
                            <div class="note-section">
                                <h4>📝 Ghi chú:</h4>
                                <p>${data.note || "Không có ghi chú"}</p>
                            </div>
                        </div>
                    </div>
                `;
            }
            
            // Hiển thị kết quả
            box.classList.remove("hidden");
        }
    }, 800);
}

/* ===============================
   HELPER FUNCTIONS
================================ */

function showAlert(message, type = "info") {
    // Tạo thông báo
    const alert = document.createElement("div");
    alert.style.cssText = `
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: ${type === "error" ? "#FF3B30" : "#007AFF"};
        color: white;
        padding: 12px 20px;
        border-radius: 10px;
        z-index: 10000;
        font-size: 14px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    `;
    alert.textContent = message;
    document.body.appendChild(alert);
    
    // Tự động xóa sau 3s
    setTimeout(() => {
        alert.style.opacity = "0";
        alert.style.transition = "opacity 0.3s";
        setTimeout(() => alert.remove(), 300);
    }, 3000);
}

/* ===============================
   INITIALIZATION
================================ */

// Chờ DOM load xong
document.addEventListener("DOMContentLoaded", function() {
    console.log("✅ trust.js loaded");
    
    // Lấy các phần tử
    const checkButton = document.getElementById("checkButton");
    const queryInput = document.getElementById("queryInput");
    
    // Gắn sự kiện cho nút kiểm tra
    if (checkButton) {
        checkButton.addEventListener("click", function() {
            TrustApp();
        });
    }
    
    // Gắn sự kiện Enter cho ô input
    if (queryInput) {
        queryInput.addEventListener("keypress", function(e) {
            if (e.key === "Enter") {
                TrustApp();
            }
        });
    }
    
    // Phát hiện iOS cho A2HS
    const isIOS = /iphone|ipad|ipod/i.test(navigator.userAgent);
    const isStandalone = window.navigator.standalone === true;
    const a2hsBanner = document.getElementById("a2hsBanner");
    
    if (isIOS && !isStandalone && a2hsBanner) {
        setTimeout(() => {
            a2hsBanner.classList.remove("hidden");
        }, 3000);
    }
});

// Xuất hàm ra global
window.TrustApp = TrustApp;
