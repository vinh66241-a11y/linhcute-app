/* ============================================
   iOS 26 - ENHANCED DATABASE SYSTEM v2.0
   Features: AI Scoring, Dynamic Updates, Encryption
============================================ */

'use strict';

// ==================== ENCRYPTION MODULE ====================
class SecurityEngine {
	constructor() {
		this.SALT = 'ios26_secure_salt_2024';
	}

	hashInput(input) {
		// Simple hash for demo (use SHA-256 in production)
		let hash = 0;
		for (let i = 0; i < input.length; i++) {
			const char = input.charCodeAt(i);
			hash = ((hash << 5) - hash) + char;
			hash = hash & hash;
		}
		return Math.abs(hash).toString(16).substring(0, 8);
	}

	encryptNote(note) {
		// Base64 encoding for demo
		return btoa(unescape(encodeURIComponent(note)));
	}

	decryptNote(encrypted) {
		try {
			return decodeURIComponent(escape(atob(encrypted)));
		} catch {
			return encrypted;
		}
	}
}

// ==================== AI SCORING ENGINE ====================
class AIScoringEngine {
	constructor() {
		this.patterns = {
			scams: [
				'lừa đảo', 'scam', 'lừa', 'đảo', 'mất tiền',
				'không trả', 'trốn', 'fake', 'giả mạo', 'hack'
			],
			trustSignals: [
				'uy tín', 'chính chủ', 'đảm bảo', 'top', 'tốt',
				'nhiều năm', 'verified', 'xác minh', 'chất lượng'
			]
		};
	}

	analyzeNote(note) {
		let score = 50; // Base score
		const noteLower = note.toLowerCase();

		// Negative patterns
		this.patterns.scams.forEach(word => {
			if (noteLower.includes(word)) {
				score -= 15;
			}
		});

		// Positive patterns
		this.patterns.trustSignals.forEach(word => {
			if (noteLower.includes(word)) {
				score += 10;
			}
		});

		// Length factor
		if (note.length > 100) score += 5;
		if (note.length < 20) score -= 5;

		return Math.max(0, Math.min(100, score));
	}

	determineLevel(score) {
		if (score >= 80) return 'safe';
		if (score >= 50) return 'warn';
		return 'danger';
	}

	generateInsight(record) {
		const insights = [];

		if (record.score >= 90) {
			insights.push('⭐ Hồ sơ xuất sắc');
		}

		if (record.reports && record.reports.length > 2) {
			insights.push(`⚠️ ${record.reports.length} báo cáo`);
		}

		if (record.ageYears && record.ageYears > 2) {
			insights.push(`📅 ${record.ageYears} năm hoạt động`);
		}

		if (record.transactionCount && record.transactionCount > 50) {
			insights.push(`💎 ${record.transactionCount}+ giao dịch`);
		}

		return insights.length > 0 ? insights.join(' • ') : 'Thông tin cơ bản';
	}
}

// ==================== ENHANCED DATABASE ====================
const ENHANCED_DB = {
	security: new SecurityEngine(),
	aiEngine: new AIScoringEngine(),

	// Main Database with richer data
	records: [{
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
			encryptedNote: null,
			category: "admin",
			reports: [],
			transactionCount: 0,
			ageYears: 0,
			verified: true,
			lastUpdated: "2024-03-15",
			tags: ["admin", "verified", "premium"],
			location: "Hải Phòng",
			socialLinks: ["t.me/@linhcuteditmevng"],
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
			encryptedNote: null,
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
			score: 20,
			level: "danger",
			note: "Nhiều báo cáo rủi ro • Lừa đảo qua điện thoại",
			encryptedNote: null,
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
			phone: "0912345678",
			phones: ["0912345678"],
			account: "1234567890",
			accounts: ["1234567890"],
			bank: "VietinBank",
			banks: ["VietinBank"],
			name: "Trần Thận Trọng",
			aliases: ["Trong TT"],
			score: 65,
			level: "warn",
			note: "Giao dịch chậm trễ đôi lúc • Cần theo dõi thêm",
			encryptedNote: null,
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

	// Dynamic data (can be updated via admin)
	statistics: {
		totalRecords: 0,
		safeCount: 0,
		warnCount: 0,
		dangerCount: 0,
		lastScan: new Date().toISOString()
	},

	// Search methods
	findRecord(input) {
		const searchTerm = input.trim();
		if (!searchTerm) return null;

		// Try exact matches first
		let record = this.records.find(item =>
			item.phone === searchTerm ||
			item.account === searchTerm ||
			item.phones?.includes(searchTerm) ||
			item.accounts?.includes(searchTerm)
		);

		// Try partial matches
		if (!record) {
			record = this.records.find(item =>
				item.phone.includes(searchTerm) ||
				item.account.includes(searchTerm) ||
				item.name.toLowerCase().includes(searchTerm.toLowerCase())
			);
		}

		// Try bank account pattern
		if (!record && /^\d{9,14}$/.test(searchTerm)) {
			record = this.records.find(item =>
				item.account === searchTerm ||
				item.accounts?.some(acc => acc.includes(searchTerm))
			);
		}

		return record || null;
	},

	// Generate insights
	generateRecordInsights(record) {
		const insights = [];

		// Score insights
		if (record.score >= 90) {
			insights.push({ type: 'excellent', text: 'Hồ sơ xuất sắc', icon: '⭐' });
		} else if (record.score <= 30) {
			insights.push({ type: 'critical', text: 'Rủi ro rất cao', icon: '🚨' });
		}

		// Report insights
		if (record.reports && record.reports.length > 0) {
			const scamReports = record.reports.filter(r => r.type === 'scam').length;
			if (scamReports > 0) {
				insights.push({
					type: 'scam',
					text: `${scamReports} báo cáo lừa đảo`,
					icon: '⚠️'
				});
			}
		}

		// Age insights
		if (record.ageYears >= 3) {
			insights.push({
				type: 'experience',
				text: `${record.ageYears} năm hoạt động`,
				icon: '📅'
			});
		}

		// Verification insights
		if (record.verified) {
			insights.push({ type: 'verified', text: 'Đã xác minh', icon: '✅' });
		}

		// Transaction insights
		if (record.transactionCount > 50) {
			insights.push({
				type: 'volume',
				text: `${record.transactionCount}+ giao dịch`,
				icon: '💎'
			});
		}

		return insights;
	},

	// Update statistics
	updateStats() {
		this.statistics.totalRecords = this.records.length;
		this.statistics.safeCount = this.records.filter(r => r.level === 'safe').length;
		this.statistics.warnCount = this.records.filter(r => r.level === 'warn').length;
		this.statistics.dangerCount = this.records.filter(r => r.level === 'danger').length;
		this.statistics.lastScan = new Date().toISOString();
	},

	// Initialize
	init() {
		// Encrypt notes
		this.records.forEach(record => {
			if (record.note && !record.encryptedNote) {
				record.encryptedNote = this.security.encryptNote(record.note);
			}

			// Ensure score is calculated
			if (!record.score && record.note) {
				record.score = this.aiEngine.analyzeNote(record.note);
				record.level = this.aiEngine.determineLevel(record.score);
			}
		});

		this.updateStats();
		console.log(`📊 iOS 26 Database loaded: ${this.records.length} records`);
		return this;
	}
};

// ==================== UI RENDER ENGINE ====================
class UIRenderEngine {
	constructor() {
		this.levelConfig = {
			safe: {
				title: "✅ Uy Tín Cao",
				color: "#34C759",
				bgColor: "rgba(52, 199, 89, 0.15)",
				icon: "",
				gradient: "linear-gradient(135deg, #34C759, #30D158)"
			},
			warn: {
				title: "⚠️ Cần Thận Trọng",
				color: "#FF9500",
				bgColor: "rgba(255, 149, 0, 0.15)",

				gradient: "linear-gradient(135deg, #FF9500, #FF9F0A)"
			},
			danger: {
				title: "🚨 Nguy Hiểm",
				color: "#FF3B30",
				bgColor: "rgba(255, 59, 48, 0.15)",

				gradient: "linear-gradient(135deg, #FF3B30, #FF453A)"
			},
			neutral: {
				title: "ℹ️ Không Tìm Thấy",
				color: "#8E8E93",
				bgColor: "rgba(142, 142, 147, 0.15)",

				gradient: "linear-gradient(135deg, #8E8E93, #AEAEB2)"
			}
		};
	}

	createRecordCard(record, searchTerm = '') {
		const config = this.levelConfig[record.level] || this.levelConfig.neutral;

		// Format phone/account with highlighting
		const formatWithHighlight = (value) => {
			if (!value) return '—';
			if (searchTerm && value.includes(searchTerm)) {
				return value.replace(
					new RegExp(searchTerm, 'gi'),
					match => `<span class="highlight">${match}</span>`
				);
			}
			return value;
		};

		// Generate insights
		const insights = ENHANCED_DB.generateRecordInsights(record);

		// Create HTML
		return `
            <div class="record-card" data-level="${record.level}" data-id="${record.id}">
                <div class="record-header" style="background: ${config.gradient}">
                    <div class="record-icon">${config.icon}</div>
                    <div class="record-title">
                        <h3>${config.title}</h3>
                        <p>${record.name}</p>
                    </div>
                    <div class="record-score">
                        <div class="score-circle" style="border-color: ${config.color}">
                            <span>${record.score}</span>
                        </div>
                        <small>điểm</small>
                    </div>
                </div>
                
                <div class="record-body">
                    ${record.warning ? `
                    <div class="warning-banner">
                        <strong>${record.warningMessage || 'CẢNH BÁO'}</strong>
                    </div>
                    ` : ''}
                    
                    <div class="record-info">
                        <div class="info-row">
                            <span class="label">📞 SĐT:</span>
                            <span class="value">${formatWithHighlight(record.phone)}</span>
                        </div>
                        <div class="info-row">
                            <span class="label">🏦 STK:</span>
                            <span class="value">${formatWithHighlight(record.account)}</span>
                        </div>
                        <div class="info-row">
                            <span class="label">💳 Ngân hàng:</span>
                            <span class="value">${record.bank || '—'}</span>
                        </div>
                        ${record.location ? `
                        <div class="info-row">
                            <span class="label">📍 Khu vực:</span>
                            <span class="value">${record.location}</span>
                        </div>
                        ` : ''}
                    </div>
                    
                    ${insights.length > 0 ? `
                    <div class="insights-section">
                        <h4>📊 Thông tin chi tiết</h4>
                        <div class="insights-grid">
                            ${insights.map(insight => `
                                <div class="insight-chip" data-type="${insight.type}">
                                    ${insight.icon} ${insight.text}
                                </div>
                            `).join('')}
                        </div>
                    </div>
                    ` : ''}
                    
                    <div class="note-section">
                        <h4>📝 Ghi chú:</h4>
                        <p>${record.note || 'Không có ghi chú'}</p>
                    </div>
                    
                    ${record.reports && record.reports.length > 0 ? `
                    <div class="reports-section">
                        <h4>📋 Lịch sử báo cáo (${record.reports.length})</h4>
                        <div class="reports-list">
                            ${record.reports.slice(0, 3).map(report => `
                                <div class="report-item">
                                    <span class="report-date">${report.date}</span>
                                    <span class="report-type ${report.type}">${report.type}</span>
                                    <p>${report.note}</p>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                    ` : ''}
                    
                    <div class="record-footer">
                        <div class="metadata">
                            <span>🆔 ${record.id}</span>
                            <span>🔄 ${record.lastUpdated}</span>
                            ${record.verified ? '<span class="verified-badge">✅ Đã xác minh</span>' : ''}
                        </div>
                    </div>
                </div>
            </div>
        `;
	}

	createNotFoundCard(searchTerm) {
		const config = this.levelConfig.neutral;

		return `
            <div class="record-card" data-level="neutral">
                <div class="record-header" style="background: ${config.gradient}">
                    <div class="record-icon">${config.icon}</div>
                    <div class="record-title">
                        <h3>${config.title}</h3>
                        <p>Không tìm thấy kết quả</p>
                    </div>
                </div>
                
                <div class="record-body">
                    <div class="empty-state">
                        <div class="empty-icon">🔍</div>
                        <h4>Không tìm thấy thông tin cho "${searchTerm}"</h4>
                        <p>Thông tin bạn tìm kiếm chưa có trong cơ sở dữ liệu.</p>
                        <div class="suggestions">
                            <p><strong>Gợi ý:</strong></p>
                            <ul>
                                <li>Kiểm tra lại số điện thoại/STK</li>
                                <li>Thử tìm với từ khóa ngắn hơn</li>
                                <li>Đây có thể là tài khoản mới</li>
                            </ul>
                        </div>
                    </div>
                    
                    <div class="stats-preview">
                        <p>📊 Hiện có <strong>${ENHANCED_DB.statistics.totalRecords}</strong> hồ sơ trong hệ thống:</p>
                        <div class="stats-grid">
                            <div class="stat safe">✅ ${ENHANCED_DB.statistics.safeCount} Uy tín</div>
                            <div class="stat warn">⚠️ ${ENHANCED_DB.statistics.warnCount} Cần thận trọng</div>
                            <div class="stat danger">🚨 ${ENHANCED_DB.statistics.dangerCount} Rủi ro</div>
                        </div>
                    </div>
                </div>
            </div>
        `;
	}

	createErrorCard(message) {
		return `
            <div class="record-card" data-level="danger">
                <div class="record-header" style="background: linear-gradient(135deg, #FF3B30, #FF453A)">
                    <div class="record-icon">❌</div>
                    <div class="record-title">
                        <h3>Lỗi hệ thống</h3>
                        <p>Không thể xử lý yêu cầu</p>
                    </div>
                </div>
                <div class="record-body">
                    <div class="error-message">
                        <p>${message}</p>
                    </div>
                </div>
            </div>
        `;
	}
}

// ==================== MAIN TRUST APP ====================
class TrustApp26 {
	constructor() {
		this.db = ENHANCED_DB.init();
		this.ui = new UIRenderEngine();
		this.lastSearch = '';

		// DOM elements (will be set by init)
		this.resultContainer = null;
		this.loadingSpinner = null;
		this.checkButton = null;
		this.queryInput = null;
	}

	init(elements) {
		// Store DOM references
		this.resultContainer = elements.resultContainer;
		this.loadingSpinner = elements.loadingSpinner;
		this.checkButton = elements.checkButton;
		this.queryInput = elements.queryInput;

		// Add CSS for new components
		this.injectStyles();

		console.log('✅ TrustApp iOS 26 initialized');
		return this;
	}

	injectStyles() {
		const styles = `
            /* iOS 26 Record Cards */
            .record-card {
                background: var(--glass-light);
                backdrop-filter: blur(20px);
                border-radius: var(--radius-lg);
                border: 1px solid rgba(255,255,255,0.1);
                overflow: hidden;
                margin-bottom: var(--space-md);
                animation: slideUp 0.5s var(--curve-spring);
                transform: translateZ(0);
            }
            
            @media (prefers-color-scheme: dark) {
                .record-card {
                    background: var(--glass-dark);
                }
            }
            
            .record-header {
                padding: var(--space-lg);
                color: white;
                display: flex;
                align-items: center;
                gap: var(--space-md);
            }
            
            .record-icon {
                font-size: 24px;
                filter: drop-shadow(0 2px 4px rgba(0,0,0,0.2));
            }
            
            .record-title h3 {
                margin: 0;
                font-size: 18px;
                font-weight: 700;
            }
            
            .record-title p {
                margin: var(--space-xs) 0 0;
                opacity: 0.9;
                font-size: 14px;
            }
            
            .record-score {
                margin-left: auto;
                text-align: center;
            }
            
            .score-circle {
                width: 50px;
                height: 50px;
                border-radius: 50%;
                border: 3px solid;
                display: flex;
                align-items: center;
                justify-content: center;
                background: rgba(255,255,255,0.1);
            }
            
            .score-circle span {
                font-size: 18px;
                font-weight: 800;
                color: white;
            }
            
            .record-score small {
                display: block;
                margin-top: 4px;
                font-size: 11px;
                opacity: 0.8;
            }
            
            .record-body {
                padding: var(--space-lg);
            }
            
            .warning-banner {
                background: rgba(255, 59, 48, 0.15);
                border: 1px solid rgba(255, 59, 48, 0.3);
                border-radius: var(--radius-md);
                padding: var(--space-md);
                margin-bottom: var(--space-lg);
                text-align: center;
                animation: pulse 2s infinite;
            }
            
            .info-row {
                display: flex;
                justify-content: space-between;
                padding: var(--space-sm) 0;
                border-bottom: 1px solid rgba(142,142,147,0.1);
            }
            
            .info-row:last-child {
                border-bottom: none;
            }
            
            .info-row .label {
                color: var(--text-secondary);
                font-weight: 500;
            }
            
            .info-row .value {
                font-weight: 600;
                text-align: right;
                max-width: 60%;
                word-break: break-all;
            }
            
            .highlight {
                background: rgba(255, 204, 0, 0.3);
                padding: 0 2px;
                border-radius: 4px;
                font-weight: 800;
            }
            
            .insights-section {
                margin: var(--space-lg) 0;
                padding: var(--space-md);
                background: rgba(142,142,147,0.05);
                border-radius: var(--radius-md);
            }
            
            .insights-section h4 {
                margin: 0 0 var(--space-md);
                font-size: 15px;
                color: var(--text-secondary);
            }
            
            .insights-grid {
                display: grid;
                grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
                gap: var(--space-sm);
            }
            
            .insight-chip {
                padding: var(--space-sm) var(--space-md);
                background: rgba(255,255,255,0.1);
                border-radius: var(--radius-pill);
                font-size: 12px;
                text-align: center;
                border: 1px solid rgba(255,255,255,0.1);
            }
            
            .insight-chip[data-type="excellent"] {
                background: rgba(52, 199, 89, 0.15);
                border-color: rgba(52, 199, 89, 0.3);
            }
            
            .insight-chip[data-type="critical"] {
                background: rgba(255, 59, 48, 0.15);
                border-color: rgba(255, 59, 48, 0.3);
                animation: pulse 2s infinite;
            }
            
            .note-section {
                margin: var(--space-lg) 0;
                padding: var(--space-md);
                background: rgba(10, 132, 255, 0.05);
                border-radius: var(--radius-md);
                border-left: 4px solid var(--ios-blue);
            }
            
            .note-section h4 {
                margin: 0 0 var(--space-sm);
                color: var(--ios-blue);
            }
            
            .note-section p {
                margin: 0;
                line-height: 1.6;
            }
            
            .reports-section {
                margin: var(--space-lg) 0;
            }
            
            .reports-section h4 {
                margin: 0 0 var(--space-md);
                font-size: 15px;
                color: var(--text-secondary);
            }
            
            .reports-list {
                display: grid;
                gap: var(--space-sm);
            }
            
            .report-item {
                padding: var(--space-sm) var(--space-md);
                background: rgba(142,142,147,0.05);
                border-radius: var(--radius-md);
                font-size: 13px;
            }
            
            .report-date {
                display: inline-block;
                background: rgba(142,142,147,0.1);
                padding: 2px 8px;
                border-radius: var(--radius-pill);
                font-size: 11px;
                margin-right: var(--space-sm);
            }
            
            .report-type {
                display: inline-block;
                padding: 2px 8px;
                border-radius: var(--radius-pill);
                font-size: 11px;
                font-weight: 600;
                text-transform: uppercase;
            }
            
            .report-type.scam {
                background: rgba(255, 59, 48, 0.15);
                color: #FF3B30;
            }
            
            .report-type.positive {
                background: rgba(52, 199, 89, 0.15);
                color: #34C759;
            }
            
            .record-footer {
                margin-top: var(--space-lg);
                padding-top: var(--space-md);
                border-top: 1px solid rgba(142,142,147,0.1);
                font-size: 11px;
                color: var(--text-tertiary);
            }
            
            .metadata {
                display: flex;
                justify-content: space-between;
                flex-wrap: wrap;
                gap: var(--space-sm);
            }
            
            .verified-badge {
                background: rgba(52, 199, 89, 0.15);
                color: #34C759;
                padding: 2px 8px;
                border-radius: var(--radius-pill);
                font-weight: 600;
            }
            
            .empty-state {
                text-align: center;
                padding: var(--space-xl) var(--space-lg);
            }
            
            .empty-icon {
                font-size: 48px;
                margin-bottom: var(--space-md);
                opacity: 0.5;
            }
            
            .empty-state h4 {
                margin: 0 0 var(--space-sm);
                color: var(--text-primary);
            }
            
            .empty-state p {
                color: var(--text-secondary);
                margin-bottom: var(--space-lg);
            }
            
            .suggestions {
                text-align: left;
                background: rgba(142,142,147,0.05);
                padding: var(--space-md);
                border-radius: var(--radius-md);
                margin-top: var(--space-lg);
            }
            
            .suggestions ul {
                margin: var(--space-sm) 0 0;
                padding-left: var(--space-lg);
            }
            
            .suggestions li {
                margin-bottom: var(--space-xs);
            }
            
            .stats-preview {
                margin-top: var(--space-xl);
                padding: var(--space-md);
                background: rgba(10, 132, 255, 0.05);
                border-radius: var(--radius-md);
            }
            
            .stats-grid {
                display: grid;
                grid-template-columns: repeat(3, 1fr);
                gap: var(--space-sm);
                margin-top: var(--space-md);
            }
            
            .stat {
                padding: var(--space-sm);
                text-align: center;
                border-radius: var(--radius-md);
                font-size: 12px;
                font-weight: 600;
            }
            
            .stat.safe {
                background: rgba(52, 199, 89, 0.15);
                color: #34C759;
            }
            
            .stat.warn {
                background: rgba(255, 149, 0, 0.15);
                color: #FF9500;
            }
            
            .stat.danger {
                background: rgba(255, 59, 48, 0.15);
                color: #FF3B30;
            }
            
            /* Animations */
            @keyframes slideUp {
                from {
                    opacity: 0;
                    transform: translateY(30px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
            
            @keyframes pulse {
                0%, 100% { opacity: 1; }
                50% { opacity: 0.7; }
            }
        `;

		const styleSheet = document.createElement("style");
		styleSheet.textContent = styles;
		document.head.appendChild(styleSheet);
	}

	async search(input) {
		this.lastSearch = input;

		// Validate input
		if (!input || input.trim() === '') {
			this.showError('Vui lòng nhập thông tin cần tra cứu');
			return;
		}

		// Show loading
		this.showLoading(true);

		// Simulate API delay
		await new Promise(resolve => setTimeout(resolve, 800));

		try {
			// Search in database
			const record = this.db.findRecord(input);

			// Hide loading
			this.showLoading(false);

			// Display result
			if (record) {
				this.displayRecord(record, input);
			} else {
				this.displayNotFound(input);
			}

			// Log search
			this.logSearch(input, !!record);

		} catch (error) {
			this.showLoading(false);
			this.showError('Lỗi khi xử lý yêu cầu: ' + error.message);
		}
	}

	displayRecord(record, searchTerm) {
		if (!this.resultContainer) return;

		const html = this.ui.createRecordCard(record, searchTerm);
		this.resultContainer.innerHTML = html;
		this.resultContainer.classList.remove('hidden');

		// Add 3D effect
		this.animateCardAppearance();
	}

	displayNotFound(searchTerm) {
		if (!this.resultContainer) return;

		const html = this.ui.createNotFoundCard(searchTerm);
		this.resultContainer.innerHTML = html;
		this.resultContainer.classList.remove('hidden');

		this.animateCardAppearance();
	}

	showError(message) {
		if (!this.resultContainer) return;

		const html = this.ui.createErrorCard(message);
		this.resultContainer.innerHTML = html;
		this.resultContainer.classList.remove('hidden');
	}

	showLoading(show) {
		if (this.loadingSpinner) {
			this.loadingSpinner.classList.toggle('hidden', !show);
		}

		if (this.checkButton) {
			this.checkButton.disabled = show;
			this.checkButton.textContent = show ? 'Đang kiểm tra...' : 'Kiểm tra ngay';
		}
	}

	animateCardAppearance() {
		const card = this.resultContainer.querySelector('.record-card');
		if (card) {
			card.style.animation = 'none';
			setTimeout(() => {
				card.style.animation = 'slideUp 0.5s var(--curve-spring)';
			}, 10);
		}
	}

	logSearch(query, found) {
		const log = {
			timestamp: new Date().toISOString(),
			query: this.db.security.hashInput(query),
			found: found,
			userAgent: navigator.userAgent.substring(0, 50)
		};

		// In production, send to analytics
		console.log('🔍 Search Log:', log);

		// Save to localStorage (limited)
		try {
			const searches = JSON.parse(localStorage.getItem('recentSearches') || '[]');
			searches.unshift({
				query: query.substring(0, 3) + '...',
				time: new Date().toLocaleTimeString(),
				found: found
			});

			// Keep only last 10
			localStorage.setItem('recentSearches', JSON.stringify(searches.slice(0, 10)));
		} catch (e) {
			// Ignore storage errors
		}
	}

	// Backward compatibility
	TrustApp(input) {
		this.search(input);
	}
}

// ==================== GLOBAL INITIALIZATION ====================
// Create global instance
const TrustApp26Instance = new TrustApp26();

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
	// Get DOM elements
	const elements = {
		resultContainer: document.getElementById('resultContainer'),
		loadingSpinner: document.getElementById('loadingSpinner'),
		checkButton: document.getElementById('checkButton'),
		queryInput: document.getElementById('queryInput')
	};

	// Initialize if elements exist
	if (elements.resultContainer) {
		TrustApp26Instance.init(elements);

		// Connect button
		if (elements.checkButton) {
			elements.checkButton.addEventListener('click', () => {
				const query = elements.queryInput ? elements.queryInput.value : '';
				TrustApp26Instance.search(query);
			});
		}

		// Connect Enter key
		if (elements.queryInput) {
			elements.queryInput.addEventListener('keypress', (e) => {
				if (e.key === 'Enter') {
					TrustApp26Instance.search(elements.queryInput.value);
				}
			});
		}
	}

	console.log('🚀 TrustApp iOS 26 đã sẵn sàng!');
});

// Global function for backward compatibility
window.TrustApp = function(input) {
	TrustApp26Instance.TrustApp(input);
};

// Export for module systems
/*
if (typeof module !== 'undefined' && module.exports) {
	module.exports = { TrustApp26, ENHANCED_DB };
}

*/
