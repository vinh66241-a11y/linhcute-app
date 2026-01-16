/* ============================================
   TRUST APP v2.3 - Show Full Phone Number
   ============================================ */

'use strict';

class TrustApp {
	constructor() {
		// DOM Elements
		this.queryInput = document.getElementById('queryInput');
		this.checkButton = document.getElementById('checkButton');
		this.resultContainer = document.getElementById('resultContainer');
		this.loadingSpinner = document.getElementById('loadingSpinner');

		// Database reference
		this.database = window.trustDatabase || null;

		// Initialize
		this.init();
	}

	init() {
		console.log('✅ TrustApp initialized');

		// Check if database is loaded
		if (!this.database) {
			console.warn('⚠️ Database not loaded. Using fallback data.');
			this.database = this.getFallbackData();
		}

		// Check if DOM elements exist
		if (!this.checkButton) {
			console.error('❌ Button not found! Check HTML ID');
			return;
		}

		if (!this.resultContainer) {
			console.error('❌ Result container not found! Check HTML ID');
			return;
		}

		// Setup event listeners
		this.setupEventListeners();

		console.log('✅ DOM Elements found:', {
			button: !!this.checkButton,
			input: !!this.queryInput,
			resultContainer: !!this.resultContainer,
			loadingSpinner: !!this.loadingSpinner
		});

		return this;
	}

	setupEventListeners() {
		// Button click
		this.checkButton.addEventListener('click', (e) => {
			e.preventDefault();
			this.performCheck();
		});

		// Enter key in input
		this.queryInput.addEventListener('keypress', (e) => {
			if (e.key === 'Enter') {
				e.preventDefault();
				this.performCheck();
			}
		});
	}

	async performCheck() {
		console.log('🔍 performCheck() called');

		const query = this.queryInput.value.trim();
		console.log('Query:', query);

		// Validate input
		if (!query) {
			this.showAlert('Vui lòng nhập thông tin cần kiểm tra');
			this.queryInput.focus();
			return;
		}

		// Show loading
		this.showLoading(true);

		// Clear previous results
		this.resultContainer.classList.add('hidden');
		this.resultContainer.innerHTML = '';

		// Simulate API delay
		await new Promise(resolve => setTimeout(resolve, 800));

		try {
			// Search in database
			console.log('Searching for:', query);
			const result = this.searchInDatabase(query);
			console.log('Search result:', result);

			// Hide loading
			this.showLoading(false);

			// Display result
			if (result) {
				console.log('Displaying result...');
				this.displayResult(result, query);
			} else {
				console.log('Displaying not found...');
				this.displayNotFound(query);
			}

		} catch (error) {
			console.error('Error:', error);
			this.showLoading(false);
			this.displayError('Lỗi khi xử lý yêu cầu: ' + error.message);
		}
	}

	searchInDatabase(query) {
		if (!this.database || !this.database.records) {
			console.warn('No database found');
			return null;
		}

		const searchTerm = query.toLowerCase().trim();
		console.log('Searching for term:', searchTerm);

		// Search in all records
		for (const record of this.database.records) {
			console.log('Checking record:', record.id, 'phone:', record.phone);

			// Exact phone match
			if (record.phone === searchTerm) {
				console.log('✅ Exact phone match found:', record.id);
				return record;
			}

			// Partial phone match
			if (record.phone && record.phone.includes(searchTerm)) {
				console.log('✅ Partial phone match found:', record.id);
				return record;
			}

			// Check in phones array
			if (record.phones) {
				for (const phone of record.phones) {
					if (phone && phone.includes(searchTerm)) {
						console.log('✅ Phone array match found:', record.id);
						return record;
					}
				}
			}

			// Check account
			if (record.account && record.account.includes(searchTerm)) {
				console.log('✅ Account match found:', record.id);
				return record;
			}

			// Check name (case insensitive)
			if (record.name && record.name.toLowerCase().includes(searchTerm)) {
				console.log('✅ Name match found:', record.id);
				return record;
			}
		}

		console.log('❌ No match found');
		return null;
	}

	displayResult(record, searchTerm) {
		console.log('displayResult called with:', record.id);

		// Clear and show container
		this.resultContainer.innerHTML = '';
		this.resultContainer.classList.remove('hidden');

		// Determine card type
		const cardType = record.level || 'neutral';
		const score = record.score || 50;

		// Create HTML
		const html = this.createResultHTML(record, cardType, score, searchTerm);

		// Insert into DOM
		this.resultContainer.innerHTML = html;

		// Force reflow for animation
		this.resultContainer.style.display = 'block';

		console.log('✅ Result displayed');
	}

	createResultHTML(record, cardType, score, searchTerm) {
		// Get level config
		const levelConfig = this.getLevelConfig(cardType);

		// HIỂN THỊ TOÀN BỘ SỐ ĐIỆN THOẠI
		const displayPhone = (phone) => {
			if (!phone) return '—';
			return phone;
		};

		// Format phone with spacing (optional)
		const formatPhonePretty = (phone) => {
			if (!phone) return '—';

			// Clean the phone number
			const cleanPhone = phone.replace(/\D/g, '');

			// Format Vietnamese phone numbers
			if (cleanPhone.length === 10) {
				// Format: 0868 748 858
				return cleanPhone.replace(/(\d{4})(\d{3})(\d{3})/, '$1 $2 $3');
			} else if (cleanPhone.length === 11) {
				// Format: 0162 345 6789
				return cleanPhone.replace(/(\d{4})(\d{3})(\d{4})/, '$1 $2 $3');
			} else {
				return phone;
			}
		};

		// Highlight search term in phone
		const highlightPhone = (phone) => {
			if (!phone) return '—';
			if (searchTerm && phone.includes(searchTerm)) {
				return phone.replace(
					new RegExp(searchTerm, 'gi'),
					match => `<mark>${match}</mark>`
				);
			}
			return phone;
		};

		// Format account
		const formatAccount = (account) => {
			if (!account) return '—';
			if (searchTerm && account.includes(searchTerm)) {
				return account.replace(
					new RegExp(searchTerm, 'gi'),
					match => `<mark>${match}</mark>`
				);
			}
			return account;
		};

		return `
            <div class="result-card result-${cardType}">
                <div class="result-header">
                    <div class="result-icon">${levelConfig.icon}</div>
                    <div class="result-title">
                        <h3>${levelConfig.title}</h3>
                        <p>${record.name || 'Không có tên'}</p>
                    </div>
                    <div class="result-score">${score} điểm</div>
                </div>
                
                <div class="result-body">
                    <p class="result-message">${record.note || 'Không có ghi chú'}</p>
                    
                    <div class="result-details">
                        <h4>Thông tin chi tiết</h4>
                        
                        <!-- HIỂN THỊ SỐ ĐIỆN THOẠI ĐẦY ĐỦ -->
                        <div class="detail-item">
                            <span class="detail-label">📞 Số điện thoại</span>
                            <span class="detail-value phone-number">
                                ${highlightPhone(displayPhone(record.phone))}
                            </span>
                        </div>
                        
                        <!-- HIỂN THỊ STK -->
                        <div class="detail-item">
                            <span class="detail-label">🏦 Số tài khoản</span>
                            <span class="detail-value">
                                ${formatAccount(record.account || '—')}
                            </span>
                        </div>
                        
                        <!-- NGÂN HÀNG -->
                        ${record.bank ? `
                        <div class="detail-item">
                            <span class="detail-label">💳 Ngân hàng</span>
                            <span class="detail-value">${record.bank}</span>
                        </div>
                        ` : ''}
                        
                        <!-- KHU VỰC -->
                        ${record.location ? `
                        <div class="detail-item">
                            <span class="detail-label">📍 Khu vực</span>
                            <span class="detail-value">${record.location}</span>
                        </div>
                        ` : ''}
                        
                        <!-- TRẠNG THÁI -->
                        <div class="detail-item">
                            <span class="detail-label">📊 Trạng thái</span>
                            <span class="detail-value">
                                ${cardType === 'safe' ? '✅ Uy tín' : 
                                  cardType === 'warn' ? '⚠️ Cần thận trọng' : 
                                  cardType === 'danger' ? '🚨 Nguy hiểm' : 'ℹ️ Trung lập'}
                            </span>
                        </div>
                        
                        <!-- ID HỒ SƠ -->
                        <div class="detail-item">
                            <span class="detail-label">🆔 ID hồ sơ</span>
                            <span class="detail-value">${record.id}</span>
                        </div>
                        
                        <!-- CẬP NHẬT -->
                        ${record.lastUpdated ? `
                        <div class="detail-item">
                            <span class="detail-label">🕐 Cập nhật</span>
                            <span class="detail-value">${record.lastUpdated}</span>
                        </div>
                        ` : ''}
                        
                        <!-- VERIFIED STATUS -->
                        ${record.verified !== undefined ? `
                        <div class="detail-item">
                            <span class="detail-label">🔐 Xác minh</span>
                            <span class="detail-value">
                                ${record.verified ? '✅ Đã xác minh' : '❌ Chưa xác minh'}
                            </span>
                        </div>
                        ` : ''}
                    </div>
                    
                    <!-- NẾU CÓ CẢNH BÁO -->
                    ${record.warning ? `
                    <div class="warning-box" style="
                        background: rgba(255, 59, 48, 0.1);
                        border-left: 4px solid #FF3B30;
                        padding: 12px;
                        margin: 16px 0;
                        border-radius: 0 8px 8px 0;
                    ">
                        <strong>⚠️ CẢNH BÁO:</strong> ${record.warningMessage || 'Tài khoản có vấn đề cần lưu ý'}
                    </div>
                    ` : ''}
                    
                    <!-- NẾU CÓ REPORTS -->
                    ${record.reports && record.reports.length > 0 ? `
                    <div class="reports-section" style="margin-top: 20px;">
                        <h4 style="font-size: 14px; color: var(--text-secondary); margin-bottom: 10px;">
                            📋 Báo cáo (${record.reports.length})
                        </h4>
                        <div style="background: rgba(142,142,147,0.05); padding: 12px; border-radius: 8px;">
                            ${record.reports.slice(0, 3).map(report => `
                                <div style="margin-bottom: 8px; padding-bottom: 8px; border-bottom: 1px solid rgba(142,142,147,0.1);">
                                    <div style="display: flex; justify-content: space-between;">
                                        <span style="font-size: 12px; color: var(--text-secondary);">
                                            ${report.date || 'Không có ngày'}
                                        </span>
                                        <span style="
                                            font-size: 11px;
                                            font-weight: 600;
                                            padding: 2px 8px;
                                            border-radius: 12px;
                                            background: ${report.type === 'scam' ? 'rgba(255, 59, 48, 0.15)' : 
                                                       report.type === 'positive' ? 'rgba(52, 199, 89, 0.15)' : 
                                                       'rgba(255, 149, 0, 0.15)'};
                                            color: ${report.type === 'scam' ? '#FF3B30' : 
                                                    report.type === 'positive' ? '#34C759' : '#FF9500'};
                                        ">
                                            ${report.type === 'scam' ? 'Lừa đảo' : 
                                             report.type === 'positive' ? 'Tích cực' : 
                                             report.type === 'delay' ? 'Trễ' : 'Cảnh báo'}
                                        </span>
                                    </div>
                                    <p style="margin-top: 4px; font-size: 13px;">${report.note || ''}</p>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                    ` : ''}
                    
                    <!-- ACTION BUTTONS -->
                    <div class="result-actions">
                        <button class="action-button" onclick="window.trustApp.searchAgain()">
                            <span>🔍</span> Tra cứu khác
                        </button>
                        <button class="action-button primary" onclick="window.trustApp.shareResult()">
                            <span>📤</span> Chia sẻ
                        </button>
                    </div>
                </div>
            </div>
        `;
	}

	displayNotFound(query) {
		console.log('displayNotFound called');

		// Clear and show container
		this.resultContainer.innerHTML = '';
		this.resultContainer.classList.remove('hidden');

		const html = `
            <div class="result-card result-neutral">
                <div class="result-header">
                    <div class="result-icon">🔍</div>
                    <div class="result-title">
                        <h3>Không tìm thấy</h3>
                        <p>Thông tin chưa có trong hệ thống</p>
                    </div>
                </div>
                
                <div class="result-body">
                    <p class="result-message">
                        Không tìm thấy thông tin cho "<strong>${this.escapeHtml(query)}</strong>".
                        Đây có thể là tài khoản mới hoặc thông tin chưa được cập nhật.
                    </p>
                    
                    <div class="result-details">
                        <h4>Một số số điện thoại để test:</h4>
                        <div class="detail-item">
                            <span class="detail-label">📞 0868748858</span>
                            <span class="detail-value" style="color: var(--ios-green);">✅ Uy tín cao</span>
                        </div>
                        <div class="detail-item">
                            <span class="detail-label">📞 0325822569</span>
                            <span class="detail-value" style="color: var(--ios-green);">✅ Bán iPhone</span>
                        </div>
                        <div class="detail-item">
                            <span class="detail-label">📞 2000</span>
                            <span class="detail-value" style="color: var(--ios-red);">🚨 Cảnh báo</span>
                        </div>
                        <div class="detail-item">
                            <span class="detail-label">📞 0912345678</span>
                            <span class="detail-value" style="color: var(--ios-orange);">⚠️ Cần thận trọng</span>
                        </div>
                    </div>
                    
                    <div class="result-actions">
                        <button class="action-button primary" onclick="window.trustApp.searchAgain()">
                            <span>↻</span> Thử lại
                        </button>
                    </div>
                </div>
            </div>
        `;

		this.resultContainer.innerHTML = html;
		console.log('✅ Not found displayed');
	}

	displayError(message) {
		console.log('displayError called:', message);

		this.resultContainer.innerHTML = '';
		this.resultContainer.classList.remove('hidden');

		const html = `
            <div class="result-card result-danger">
                <div class="result-header">
                    <div class="result-icon">❌</div>
                    <div class="result-title">
                        <h3>Lỗi hệ thống</h3>
                        <p>Không thể xử lý yêu cầu</p>
                    </div>
                </div>
                <div class="result-body">
                    <p class="result-message">${this.escapeHtml(message)}</p>
                    <div class="result-actions">
                        <button class="action-button primary" onclick="window.trustApp.searchAgain()">
                            <span>↻</span> Thử lại
                        </button>
                    </div>
                </div>
            </div>
        `;

		this.resultContainer.innerHTML = html;
	}

	showLoading(show) {
		console.log('showLoading:', show);

		if (this.loadingSpinner) {
			if (show) {
				this.loadingSpinner.style.display = 'block';
				this.loadingSpinner.classList.remove('hidden');
			} else {
				this.loadingSpinner.style.display = 'none';
				this.loadingSpinner.classList.add('hidden');
			}
		}

		if (this.checkButton) {
			this.checkButton.disabled = show;
			this.checkButton.innerHTML = show ?
				'<span>Đang kiểm tra...</span><span class="button-icon">⌛</span>' :
				'<span>Kiểm tra ngay</span><span class="button-icon">→</span>';
		}
	}

	showAlert(message) {
		alert(message);
	}

	searchAgain() {
		console.log('searchAgain called');

		// Clear input
		this.queryInput.value = '';
		this.queryInput.focus();

		// Hide result
		this.resultContainer.classList.add('hidden');
		this.resultContainer.innerHTML = '';
	}

	shareResult() {
		const query = this.queryInput.value.trim();
		const shareText = `Tôi vừa tra cứu thông tin "${query}" trên Check Uy Tín`;

		if (navigator.share) {
			navigator.share({
				title: 'Kết quả tra cứu uy tín',
				text: shareText,
				url: window.location.href
			});
		} else {
			// Copy to clipboard fallback
			navigator.clipboard.writeText(shareText + '\n' + window.location.href)
				.then(() => alert('Đã copy liên kết vào clipboard!'))
				.catch(() => prompt('Chia sẻ:', window.location.href));
		}
	}

	getLevelConfig(level) {
		const configs = {
			safe: { title: '✅ Uy Tín Cao', icon: '✅', color: '#34C759' },
			warn: { title: '⚠️ Cần Thận Trọng', icon: '⚠️', color: '#FF9500' },
			danger: { title: '🚨 Nguy Hiểm', icon: '🚨', color: '#FF3B30' },
			neutral: { title: 'ℹ️ Không Tìm Thấy', icon: 'ℹ️', color: '#8E8E93' }
		};

		return configs[level] || configs.neutral;
	}

	escapeHtml(text) {
		const div = document.createElement('div');
		div.textContent = text;
		return div.innerHTML;
	}

	getFallbackData() {
		return {
			records: [{
					id: 'TEST_001',
					phone: '0868748858',
					name: 'Nguyễn Công Vinh',
					score: 95,
					level: 'safe',
					note: 'Admin Web nhận giao dịch trung gian',
					bank: 'MB Bank',
					location: 'Hải Phòng',
					account: '0868748858',
					verified: true,
					lastUpdated: '2024-03-15'
				},
				{
					id: 'TEST_002',
					phone: '0325822569',
					name: 'Nguyễn Vinh Quang',
					score: 90,
					level: 'safe',
					note: 'Bán iPhone Uy Tín • Chuyên Apple chính hãng',
					bank: 'MB Bank',
					location: 'Hải Phòng',
					account: '0325822569',
					verified: true,
					lastUpdated: '2024-03-10'
				}
			]
		};
	}
}

// Create global instance
let trustApp = null;

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
	console.log('🔄 DOM loaded, initializing TrustApp...');

	setTimeout(() => {
		try {
			trustApp = new TrustApp();
			window.trustApp = trustApp;
			console.log('🚀 TrustApp đã sẵn sàng!');

			// Test với số điện thoại từ URL
			const urlParams = new URLSearchParams(window.location.search);
			const query = urlParams.get('q');
			if (query && trustApp.queryInput) {
				trustApp.queryInput.value = query;
				setTimeout(() => trustApp.performCheck(), 300);
			}

		} catch (error) {
			console.error('❌ Error initializing TrustApp:', error);
		}
	}, 100);
});

// Global function
window.TrustApp = function(query) {
	if (window.trustApp && window.trustApp.queryInput) {
		window.trustApp.queryInput.value = query;
		window.trustApp.performCheck();
	}
};