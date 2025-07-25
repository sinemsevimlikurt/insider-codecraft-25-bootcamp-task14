# Kullanıcı Yönetim Sistemi

JSONPlaceholder API'sinden kullanıcı verilerini çeken ve yöneten tek dosya JavaScript uygulaması. Live Server ile doğrudan açılabilir veya tarayıcı konsoluna yapıştırılarak çalıştırılabilir.

## Özellikler

- **Tek Dosya Çözümü**: HTML, CSS ve JavaScript tek dosyada
- **Live Server Desteği**: Doğrudan `.js` dosyasını Live Server ile açabilirsiniz
- **LocalStorage Cache**: 24 saatlik otomatik önbellekleme
- **Kullanıcı Silme**: Onay ile kullanıcı silme işlemi
- **Geri Getirme**: Tüm kullanıcılar silindiğinde tek seferlik geri getirme
- **Session Kontrolü**: Geri getirme butonu session başına bir kez kullanılabilir
- **Modern Tasarım**: Gradient header, animasyonlar, responsive layout
- **MutationObserver**: Otomatik boş durum tespiti

## Kullanım Yöntemleri

### Yöntem 1: Live Server ile Direkt Açma 

1. `user-fetcher.js` dosyasını Live Server ile açın
2. Otomatik olarak tam HTML sayfası oluşturulacak
3. Kullanıcı yönetim arayüzü görüntülenecek

### Yöntem 2: Tarayıcı Konsolunda Çalıştırma

1. Herhangi bir web sayfasını açın
2. Developer Tools'u açın (F12)
3. Console sekmesine geçin
4. `user-fetcher.js` dosyasının tüm içeriğini kopyalayın
5. Console'a yapıştırın ve Enter'a basın
## Teknik Detaylar

### Dosya Yapısı
- **IIFE Pattern**: Kod `(function() { ... })()` formatında sarılmıştır
- **HTML Template**: Tam HTML yapısı string olarak saklanır
- **document.write**: HTML içeriği `document.write()` ile sayfaya yazılır
- **Async/Await**: Modern JavaScript özellikleri kullanılır

### Veri Yönetimi
- **API**: `https://jsonplaceholder.typicode.com/users`
- **LocalStorage**: `ins-user-fetcher-data` anahtarı ile 24 saatlik cache
- **SessionStorage**: `ins-user-fetcher-button-used` ile tek kullanımlık kontrol

### Fonksiyonlar
Kod çalıştırıldıktan sonra `window.userFetcher` objesi altında:
- `loadUsers()` - Kullanıcıları yükle
- `refreshUsers()` - Cache'i temizle ve yenile
- `deleteUser(id)` - Kullanıcı sil
- `restoreUsers()` - Silinen kullanıcıları geri getir

## Özellik Detayları

### Session Kontrolü
- Tüm kullanıcılar silindiğinde "Kullanıcıları Tekrar Getir" butonu görünür
- Bu buton her browser session'ında sadece **bir kez** kullanılabilir
- Buton kullanıldıktan sonra sessionStorage'a işaretlenir
- Sayfa yenilendiğinde session sıfırlanır

### MutationObserver
- DOM değişikliklerini otomatik izler
- Kullanıcı kartları silindiğinde boş durum ekranını gösterir
- Performanslı ve otomatik çalışır

### Cache Sistemi
- 24 saatlik otomatik expire
- Expire süresi localStorage'da saklanır
- Süre dolduğunda otomatik temizlenir

## Tarayıcı Uyumluluğu
- Chrome 51+
- Firefox 14+
- Safari 10+
- Edge 12+

## Sorun Giderme

### Live Server ile Açılmıyor
- Dosya uzantısının `.js` olduğundan emin olun
- Live Server'ın düzgün çalıştığını kontrol edin

### Veriler Yüklenmiyor
- İnternet bağlantınızı kontrol edin
- Browser console'da hata mesajlarına bakın
- API endpoint'inin erişilebilir olduğunu doğrulayın

### Geri Getir Butonu Çalışmıyor
- Session'da daha önce kullanılmış olabilir
- Sayfayı yenileyerek session'ı sıfırlayın

## Lisans
Bu proje eğitim amaçlı geliştirilmiştir.
```

## Fonksiyonlar

Kod çalıştırıldıktan sonra aşağıdaki fonksiyonlar `window.userFetcher` objesi altında kullanılabilir:

- `window.userFetcher.loadUsers()` - Kullanıcıları yükle
- `window.userFetcher.refreshUsers()` - Verileri yenile (cache'i temizle)
- `window.userFetcher.deleteUser(id)` - Belirli kullanıcıyı sil
- `window.userFetcher.restoreUsers()` - Silinen kullanıcıları geri getir

## Veri Yönetimi

### LocalStorage
- **Anahtar**: `ins-user-fetcher-data`
- **İçerik**: Kullanıcı verileri + expire zamanı
- **Süre**: 24 saat

### SessionStorage
- **Anahtar**: `ins-user-fetcher-button-used`
- **Amaç**: "Tekrar Getir" butonunun session'da sadece bir kez kullanılmasını sağlar

## Özellik Detayları

### MutationObserver
DOM değişikliklerini izler ve tüm kullanıcı kartları silindiğinde otomatik olarak "Tekrar Getir" butonu gösterir.

### Session Kontrolü
"Tekrar Getir" butonu:
- Her browser session'ında sadece bir kez kullanılabilir
- Kullanıldıktan sonra sessionStorage'a işaretlenir
- Sayfa yenilendiğinde tekrar kullanılabilir hale gelir

### Hata Yönetimi
- API bağlantı hataları
- LocalStorage okuma/yazma hataları
- Hedef element bulunamama durumları

## API

Uygulama [JSONPlaceholder](https://jsonplaceholder.typicode.com/) API'sini kullanır:
- **Endpoint**: `https://jsonplaceholder.typicode.com/users`
- **Method**: GET
- **Response**: 10 kullanıcı verisi

## Tarayıcı Uyumluluğu

- Chrome 51+
- Firefox 14+
- Safari 10+
- Edge 12+

## Geliştirici Notları

- Kod IIFE (Immediately Invoked Function Expression) pattern'i kullanır
- Global namespace kirliliğini önlemek için tüm fonksiyonlar `window.userFetcher` altında toplanır
- CSS sınıfları `user-fetcher-` prefix'i ile namespace'lenir
- Modern JavaScript (ES6+) özellikleri kullanılır (async/await, arrow functions)

## Sorun Giderme

### "Hedef element bulunamadı" Hatası
- `appendLocation` değişkenindeki CSS selector'ının doğru olduğundan emin olun
- Element'in DOM'da mevcut olduğunu kontrol edin

### Veriler Yüklenmiyor
- İnternet bağlantınızı kontrol edin
- Browser console'da hata mesajları olup olmadığına bakın
- API endpoint'inin erişilebilir olduğunu doğrulayın

### "Tekrar Getir" Butonu Çalışmıyor
- Session'da daha önce kullanılmış olabilir
- Sayfayı yenileyerek session'ı sıfırlayın

## Lisans

Bu proje eğitim amaçlı geliştirilmiştir.