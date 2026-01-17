/* ============================================
   TRUST DATABASE v2.1 - Data Storage
   ============================================ */

'use strict';

// Trust Database
const trustDatabase = {
    // Statistics
    stats: {
        totalRecords: 4,
        lastUpdated: '2024-03-15',
        version: '2.1'
    },
    
    // Records Database
    records: [
        {
            id: 'UYTIN_001',
            phone: "0868748858",
            phones: ["0868748858", "0987654321"],
            account: "0868748858",
            accounts: ["0868748858", "1122334455"],
            bank: "MB Bank",
            banks: ["MB Bank", "Vietcombank"],
            name: "Nguyễn Công Vinh",
            aliases: ["Vinh NC", "Nguyen Cong Vinh"],
            score: 100,
            level: "safe",
            note: "Admin Web nhận giao dịch trung gian",
            category: "admin",
            reports: [],
            transactionCount: 0,
            ageYears: 0,
            verified: true,
            lastUpdated: "2024-03-15",
            tags: ["admin", "verified", "premium"],
            location: "Hải Phòng",
            socialLinks: [],
            warning: false
        },
        {
            id: 'UYTIN_002',
            phone: "0325822569",
            phones: ["0325822569"],
            account: "0325822569",
            accounts: ["0325822569"],
            bank: "MB Bank",
            banks: ["MB Bank"],
            name: "Nguyễn Vinh Quang",
            aliases: ["Nguyen Vinh Quang"],
            score: 100,
            level: "safe",
            note: "Bán iphone Uy Tín • Chuyên Apple chính hãng",
            category: "seller",
            reports: [{
                date: "2024-02-01",
                type: "positive",
                note: "Giao dịch tốt, đúng hẹn"
            }],
            transactionCount: 0,
            ageYears: 0,
            verified: true,
            lastUpdated: "2024-03-10",
            tags: ["electronics", "apple", "reliable"],
            location: "Hải Phòng",
            socialLinks: [],
            warning: false
        },
        {
            id: 'RISK_001',
            phone: "2000",
            phones: ["2000", "0900111222"],
            account: "66668888",
            accounts: ["66668888", "99990000"],
            bank: "Techcombank",
            banks: ["Techcombank", "VPBank"],
            name: "NamGay",
            aliases: ["NamGay"],
            score: -99,
            level: "danger",
            note: "Nhiều báo cáo rủi ro • Lừa đảo qua điện thoại",
            category: "scammer",
            reports: [
                { date: "2024-01-15", type: "scam", note: "Lừa tiền đặt cọc" },
                { date: "2024-02-20", type: "scam", note: "Hàng giả, không giao" },
                { date: "2024-03-01", type: "warning", note: "SĐT đã bị tố cáo" }
            ],
            transactionCount: 12,
            ageYears: 0.5,
            verified: false,
            lastUpdated: "2024-03-05",
            tags: ["scam", "warning", "blocked"],
            location: "Không xác định",
            socialLinks: [],
            warning: true,
            warningMessage: "⚠️ CẢNH BÁO: Tài khoản này đang bị điều tra"
        },
        {
            id: 'CAUTION_001',
            phone: "1234567890",
            phones: ["1234567890"],
            account: "1234567890",
            accounts: ["1234567890"],
            bank: "VietinBank",
            banks: ["VietinBank"],
            name: "Nguyễn Phú Trọng",
            aliases: ["Nguyễn Phú Trọng"],
            score: 65,
            level: "warn",
            note: "Giao dịch chậm trễ đôi lúc • Cần theo dõi thêm",
            category: "normal",
            reports: [
                { date: "2024-02-28", type: "delay", note: "Giao hàng trễ 3 ngày" }
            ],
            transactionCount: 24,
            ageYears: 1,
            verified: true,
            lastUpdated: "2024-03-12",
            tags: ["new", "monitoring"],
            location: "Đà Nẵng",
            socialLinks: [],
            warning: false
        }
    ],
    
    // Helper Methods
    getRecordById(id) {
        return this.records.find(record => record.id === id);
    },
    
    getRecordsByLevel(level) {
        return this.records.filter(record => record.level === level);
    },
    
    getRecordsByPhone(phone) {
        return this.records.filter(record => 
            record.phone === phone || 
            (record.phones && record.phones.includes(phone))
        );
    },
    
    getRecordsByBank(bank) {
        return this.records.filter(record => 
            record.bank === bank || 
            (record.banks && record.banks.includes(bank))
        );
    },
    
    addRecord(record) {
        // Generate ID if not provided
        if (!record.id) {
            record.id = 'REC_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
        }
        
        // Set default values
        record.score = record.score || 50;
        record.level = record.level || 'neutral';
        record.lastUpdated = new Date().toISOString().split('T')[0];
        
        // Add to records
        this.records.push(record);
        
        // Update stats
        this.updateStats();
        
        return record.id;
    },
    
    updateStats() {
        this.stats.totalRecords = this.records.length;
        this.stats.lastUpdated = new Date().toISOString();
    },
    
    // Search Methods
    search(query) {
        const searchTerm = query.toLowerCase().trim();
        
        // Return all records that match the search term
        return this.records.filter(record => {
            // Check phone
            if (record.phone && record.phone.includes(searchTerm)) return true;
            
            // Check phones array
            if (record.phones && record.phones.some(phone => 
                phone && phone.includes(searchTerm))) return true;
            
            // Check account
            if (record.account && record.account.includes(searchTerm)) return true;
            
            // Check accounts array
            if (record.accounts && record.accounts.some(account => 
                account && account.includes(searchTerm))) return true;
            
            // Check name
            if (record.name && record.name.toLowerCase().includes(searchTerm)) return true;
            
            // Check aliases
            if (record.aliases && record.aliases.some(alias => 
                alias && alias.toLowerCase().includes(searchTerm))) return true;
            
            // Check bank
            if (record.bank && record.bank.toLowerCase().includes(searchTerm)) return true;
            
            // Check location
            if (record.location && record.location.toLowerCase().includes(searchTerm)) return true;
            
            return false;
        });
    },
    
    // Export data (for backup)
    exportData() {
        return {
            stats: this.stats,
            records: this.records,
            exportedAt: new Date().toISOString()
        };
    },
    
    // Import data (for restore)
    importData(data) {
        if (data.records && Array.isArray(data.records)) {
            this.records = data.records;
            this.updateStats();
            return true;
        }
        return false;
    }
};

// Initialize database
trustDatabase.updateStats();

// Export for global use
window.trustDatabase = trustDatabase;

// Console log for debugging
console.log(`📊 Trust Database loaded: ${trustDatabase.stats.totalRecords} records, v${trustDatabase.stats.version}`);
