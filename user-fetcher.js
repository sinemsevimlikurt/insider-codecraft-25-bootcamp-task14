(function() {
    'use strict';
    
    const htmlContent = `
    <!DOCTYPE html>
    <html lang="tr">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Kullanıcı Yönetim Sistemi</title>
        
        <style id="app-styles">
            * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
            }
            
            body {
                background-color: #f5f6fa;
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                min-height: 100vh;
            }
            
            .user-management-container {
                max-width: 1200px;
                margin: 0 auto;
                padding: 20px;
                min-height: 100vh;
            }
            
            .header {
                text-align: center;
                margin-bottom: 30px;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                padding: 30px;
                border-radius: 10px;
                box-shadow: 0 4px 15px rgba(0,0,0,0.1);
            }
            
            .header h1 {
                margin-bottom: 10px;
                font-size: 2.5em;
            }
            
            .refresh-btn {
                background-color: #3498db;
                color: white;
                border: none;
                padding: 12px 24px;
                border-radius: 6px;
                cursor: pointer;
                font-size: 1em;
                margin-top: 15px;
                transition: all 0.3s ease;
            }
            
            .refresh-btn:hover {
                background-color: #2980b9;
                transform: translateY(-2px);
                box-shadow: 0 4px 8px rgba(0,0,0,0.2);
            }
            
            .loading {
                text-align: center;
                padding: 40px;
                color: #666;
                font-size: 1.2em;
            }
            
            .loading::after {
                content: '';
                display: inline-block;
                width: 20px;
                height: 20px;
                border: 3px solid #f3f3f3;
                border-top: 3px solid #3498db;
                border-radius: 50%;
                animation: spin 1s linear infinite;
                margin-left: 10px;
            }
            
            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
            
            .error {
                background-color: #f8d7da;
                color: #721c24;
                padding: 20px;
                border-radius: 8px;
                margin: 20px 0;
                border: 1px solid #f5c6cb;
                text-align: center;
            }
            
            .user-grid {
                display: grid;
                grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
                gap: 20px;
                margin-top: 20px;
            }
            
            .user-card {
                background: white;
                border: 1px solid #ddd;
                border-radius: 12px;
                padding: 25px;
                box-shadow: 0 4px 6px rgba(0,0,0,0.1);
                transition: all 0.3s ease;
                position: relative;
                overflow: hidden;
            }
            
            .user-card::before {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                height: 4px;
                background: linear-gradient(90deg, #3498db, #2ecc71);
            }
            
            .user-card:hover {
                transform: translateY(-5px);
                box-shadow: 0 8px 25px rgba(0,0,0,0.15);
            }
            
            .user-name {
                font-size: 1.3em;
                font-weight: bold;
                color: #2c3e50;
                margin-bottom: 12px;
                display: flex;
                align-items: center;
            }
            
            .user-name::before {
                content: '👤';
                margin-right: 8px;
            }
            
            .user-email {
                color: #3498db;
                margin-bottom: 10px;
                font-size: 1.1em;
                display: flex;
                align-items: center;
            }
            
            .user-email::before {
                content: '📧';
                margin-right: 8px;
            }
            
            .user-address {
                color: #666;
                font-size: 0.95em;
                margin-bottom: 20px;
                line-height: 1.5;
                display: flex;
                align-items: flex-start;
            }
            
            .user-address::before {
                content: '📍';
                margin-right: 8px;
                margin-top: 2px;
            }
            
            .delete-btn {
                background-color: #e74c3c;
                color: white;
                border: none;
                padding: 10px 20px;
                border-radius: 6px;
                cursor: pointer;
                font-size: 0.9em;
                transition: all 0.3s ease;
                width: 100%;
            }
            
            .delete-btn:hover {
                background-color: #c0392b;
                transform: translateY(-1px);
            }
            
            .empty-state {
                text-align: center;
                padding: 60px 20px;
                color: #666;
                background: white;
                border-radius: 12px;
                margin: 20px 0;
                box-shadow: 0 4px 6px rgba(0,0,0,0.1);
            }
            
            .empty-state h2 {
                font-size: 2em;
                margin-bottom: 15px;
                color: #95a5a6;
            }
            
            .empty-state p {
                font-size: 1.1em;
                margin-bottom: 25px;
                line-height: 1.6;
            }
            
            .restore-btn {
                background-color: #27ae60;
                color: white;
                border: none;
                padding: 15px 30px;
                border-radius: 8px;
                cursor: pointer;
                font-size: 1.1em;
                margin: 20px auto;
                display: block;
                animation: pulse 2s infinite;
                transition: all 0.3s ease;
            }
            
            .restore-btn:hover {
                background-color: #229954;
                transform: scale(1.05);
            }
            
            @keyframes pulse {
                0% { transform: scale(1); }
                50% { transform: scale(1.05); }
                100% { transform: scale(1); }
            }
            
            @keyframes fadeIn {
                from {
                    opacity: 0;
                    transform: translateY(20px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
            
            .user-card {
                animation: fadeIn 0.5s ease-out;
            }
            
            @media (max-width: 768px) {
                .user-management-container {
                    padding: 10px;
                }
                
                .header h1 {
                    font-size: 2em;
                }
                
                .user-grid {
                    grid-template-columns: 1fr;
                }
            }
        </style>
    </head>
    <body>
        <div class="ins-api-users"></div>
    </body>
    </html>
    `;

    function initializeApp() {
        document.open();
        document.write(htmlContent);
        document.close();

        const checkDOM = setInterval(function() {
            if (document.body && document.querySelector('.ins-api-users')) {
                clearInterval(checkDOM);
                startApplication();
            }
        }, 100);
    }

    function startApplication() {
        let usersData = [];
        let observer = null;
        
        const STORAGE_KEY = 'ins-user-fetcher-data';
        const SESSION_KEY = 'ins-user-fetcher-button-used';
        const CACHE_DURATION = 24 * 60 * 60 * 1000;
        
        function getMainContainer() {
            return document.querySelector('.ins-api-users');
        }
        function getFromStorage() {
            try {
                const stored = localStorage.getItem(STORAGE_KEY);
                if (stored) {
                    const data = JSON.parse(stored);
                    const now = new Date().getTime();
                    
                    if (data.expiry && now < data.expiry) {
                        return data.users;
                    } else {
                        localStorage.removeItem(STORAGE_KEY);
                    }
                }
            } catch (error) {
                console.error('localStorage okuma hatası:', error);
                localStorage.removeItem(STORAGE_KEY);
            }
            return null;
        }
        
        function saveToStorage(users) {
            try {
                const data = {
                    users: users,
                    expiry: new Date().getTime() + CACHE_DURATION
                };
                localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
            } catch (error) {
                console.error('localStorage kaydetme hatası:', error);
            }
        }
        
        function isButtonUsedInSession() {
            return sessionStorage.getItem(SESSION_KEY) === 'true';
        }
        
        function markButtonAsUsed() {
            sessionStorage.setItem(SESSION_KEY, 'true');
        }
        async function fetchUsers() {
            try {
                const response = await fetch('https://jsonplaceholder.typicode.com/users');
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                return data;
            } catch (error) {
                throw new Error(`API hatası: ${error.message}`);
            }
        }
        
        function createUserCard(user) {
            const address = `${user.address.street}, ${user.address.suite}, ${user.address.city} - ${user.address.zipcode}`;
            
            return `
                <div class="user-card" data-user-id="${user.id}">
                    <div class="user-name">${user.name}</div>
                    <div class="user-email">${user.email}</div>
                    <div class="user-address">${address}</div>
                    <button class="delete-btn" onclick="window.userFetcher.deleteUser(${user.id})">
                        🗑️ Kullanıcıyı Sil
                    </button>
                </div>
            `;
        }
        
        function displayUsers(users) {
            const targetElement = getMainContainer();
            if (!targetElement) {
                console.error('Ana container oluşturulamadı');
                return;
            }
            
            const userCards = users.map(user => createUserCard(user)).join('');
            
            const html = `
                <div class="user-management-container">
                    <div class="header">
                        <h1>👥 Kullanıcı Yönetim Sistemi</h1>
                        <button class="refresh-btn" onclick="window.userFetcher.refreshUsers()">
                            🔄 Verileri Yenile
                        </button>
                    </div>
                    <div class="user-grid">
                        ${userCards}
                    </div>
                </div>
            `;
            
            targetElement.innerHTML = html;
        }
        
        function showError(message) {
            const targetElement = getMainContainer();
            if (!targetElement) {
                console.error('Ana container oluşturulamadı');
                return;
            }
            
            const html = `
                <div class="user-management-container">
                    <div class="header">
                        <h1>👥 Kullanıcı Yönetim Sistemi</h1>
                        <button class="refresh-btn" onclick="window.userFetcher.refreshUsers()">
                            🔄 Tekrar Dene
                        </button>
                    </div>
                    <div class="error">
                        ❌ ${message}
                    </div>
                </div>
            `;
            targetElement.innerHTML = html;
        }
        
        function showLoading() {
            const targetElement = getMainContainer();
            if (!targetElement) {
                console.error('Ana container oluşturulamadı');
                return;
            }
            
            targetElement.innerHTML = `
                <div class="user-management-container">
                    <div class="header">
                        <h1>👥 Kullanıcı Yönetim Sistemi</h1>
                    </div>
                    <div class="loading">
                        ⏳ Kullanıcı verileri yükleniyor...
                    </div>
                </div>
            `;
        }
        
        function showEmptyState() {
            const targetElement = getMainContainer();
            if (!targetElement) return;
            
            const buttonUsed = isButtonUsedInSession();
            const restoreButtonHtml = buttonUsed ? '' : `
                <button class="restore-btn" onclick="window.userFetcher.restoreUsers()">
                    🔄 Kullanıcıları Tekrar Getir
                </button>
            `;
            
            const html = `
                <div class="user-management-container">
                    <div class="header">
                        <h1>👥 Kullanıcı Yönetim Sistemi</h1>
                    </div>
                    <div class="empty-state">
                        <h2>😔 Hiç kullanıcı kalmadı</h2>
                        <p>Tüm kullanıcılar silindi. ${buttonUsed ? 'Bu oturumda tekrar getir butonunu zaten kullandınız.' : 'Kullanıcıları tekrar getirmek için aşağıdaki butona tıklayın.'}</p>
                        ${restoreButtonHtml}
                    </div>
                </div>
            `;
            
            targetElement.innerHTML = html;
        }
        
        function setupMutationObserver() {
            const targetElement = getMainContainer();
            if (!targetElement) return;
            
            observer = new MutationObserver(function(mutations) {
                mutations.forEach(function(mutation) {
                    const userCards = targetElement.querySelectorAll('.user-card');
                    
                    if (userCards.length === 0 && usersData.length === 0) {
                        showEmptyState();
                    }
                });
            });
            
            observer.observe(targetElement, {
                childList: true,
                subtree: true
            });
        }
        
        function deleteUser(userId) {
            if (confirm('Bu kullanıcıyı silmek istediğinizden emin misiniz?')) {
                usersData = usersData.filter(user => user.id !== userId);
                
                saveToStorage(usersData);
                
                if (usersData.length === 0) {
                    showEmptyState();
                } else {
                    displayUsers(usersData);
                }
                
                console.log(`Kullanıcı ${userId} silindi`);
            }
        }
        
        function refreshUsers() {
            localStorage.removeItem(STORAGE_KEY);
            loadUsers();
        }
        
        function restoreUsers() {
            if (isButtonUsedInSession()) {
                alert('Bu oturumda bu butonu zaten kullandınız!');
                return;
            }
            
            markButtonAsUsed();
            
            refreshUsers();
        }
        async function loadUsers() {
            showLoading();
            
            const cachedUsers = getFromStorage();
            
            if (cachedUsers && cachedUsers.length > 0) {
                console.log('Veriler localStorage\'dan yüklendi');
                usersData = cachedUsers;
                displayUsers(usersData);
            } else {
                console.log('API\'den veri çekiliyor...');
                
                try {
                    const users = await fetchUsers();
                    console.log('API\'den veri başarıyla alındı');
                    usersData = users;
                    
                    saveToStorage(users);
                    
                    displayUsers(users);
                } catch (error) {
                    console.error('Veri çekme hatası:', error);
                    showError('Kullanıcı verileri yüklenirken bir hata oluştu. Lütfen internet bağlantınızı kontrol edin ve tekrar deneyin.');
                }
            }
        }
        
        window.userFetcher = {
            deleteUser: deleteUser,
            refreshUsers: refreshUsers,
            restoreUsers: restoreUsers,
            loadUsers: loadUsers
        };
        
        setupMutationObserver();
        
        loadUsers();

    }
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeApp);
    } else {
        initializeApp();
    }

})();
