# Admin Panel Təhlükəsizlik Quraşdırması

Bu bələdçi admin panelin təhlükəsiz email doğrulama sistemini quraşdırmaq üçün lazım olan addımları izah edir.

## 🔐 Təhlükəsizlik Xüsusiyyətləri

- **Email Doğrulama**: Giriş üçün e-poçt ünvanına göndərilən 6 rəqəmli kod
- **Email Whitelist**: Yalnız icazə verilən e-poçt ünvanları ilə giriş
- **Rate Limiting**: Hər e-poçt üçün 15 dəqiqədə maksimum 5 cəhd
- **Kod Müddəti**: Doğrulama kodu 10 dəqiqə ərzində etibarlıdır
- **JWT Token**: 24 saatlıq təhlükəsiz token
- **HTTP-Only Cookies**: XSS hücumlarından qorunma

## 📧 Gmail Quraşdırması

### 1. Gmail App Password Yaratmaq

1. Google hesabınıza daxil olun
2. **Google Account** → **Security** → **2-Step Verification** (aktiv olmalıdır)
3. **App passwords** bölməsinə keçin
4. **Select app** → **Mail** seçin
5. **Select device** → **Other (Custom name)** seçin və "SDU Career Admin" yazın
6. **Generate** düyməsinə basın
7. Yaranan 16 rəqəmli parolu qeyd edin

### 2. Environment Dəyişənləri

`.env.local` faylını yaradın və aşağıdakı məlumatları daxil edin:

```env
# Gmail SMTP Configuration
GMAIL_USER=your-email@gmail.com
GMAIL_APP_PASSWORD=your-16-digit-app-password

# Admin Email Whitelist (comma-separated)
ADMIN_EMAILS=admin1@gmail.com,admin2@gmail.com,admin3@gmail.com

# JWT Secret for secure tokens (minimum 32 characters)
JWT_SECRET=your-super-secret-jwt-key-here-make-it-very-long-and-random

# Verification code settings
VERIFICATION_CODE_EXPIRY_MINUTES=10
MAX_ATTEMPTS_PER_EMAIL=5
RATE_LIMIT_WINDOW_MINUTES=15
```

## 🚀 Quraşdırma Addımları

### 1. Dependencies Quraşdırmaq

```bash
npm install nodemailer @types/nodemailer jsonwebtoken @types/jsonwebtoken crypto-js @types/crypto-js
```

### 2. Environment Faylını Yaratmaq

`.env.local` faylını yaradın və yuxarıdakı konfiqurasiyanı daxil edin.

### 3. Server Başlatmaq

```bash
npm run dev
```

## 📝 İstifadə Təlimatı

### Admin Giriş Prosesi

1. `/admin/login` səhifəsinə keçin
2. İcazə verilən e-poçt ünvanınızı daxil edin
3. **"Doğrulama kodu göndər"** düyməsinə basın
4. E-poçt ünvanınıza gələn 6 rəqəmli kodu daxil edin
5. **"Daxil ol"** düyməsinə basın

### Yeni Admin Əlavə Etmək

`.env.local` faylında `ADMIN_EMAILS` dəyişəninə yeni e-poçt ünvanını əlavə edin:

```env
ADMIN_EMAILS=admin1@gmail.com,admin2@gmail.com,newadmin@gmail.com
```

## 🔧 Texniki Detallar

### API Endpoints

- `POST /api/admin/send-verification` - Doğrulama kodu göndər
- `POST /api/admin/verify-code` - Kodu doğrula
- `GET /api/admin/verify-token` - Token doğrula
- `POST /api/admin/logout` - Çıxış et

### Təhlükəsizlik Tədbirləri

1. **Rate Limiting**: Hər e-poçt üçün 15 dəqiqədə maksimum 5 cəhd
2. **Kod Müddəti**: 10 dəqiqə sonra kod avtomatik silinir
3. **Attempt Limiting**: 5 səhv cəhddən sonra yeni kod tələb olunur
4. **JWT Expiry**: Token 24 saat sonra avtomatik bitir
5. **HTTP-Only Cookies**: JavaScript ilə cookie-yə giriş qadağandır

### Email Template

E-poçt şablonu professional görünüşlü və Azərbaycan dilindədir. Kod böyük hərflərlə və ayrı-ayrı rəqəmlərlə göstərilir.

## 🛠️ Troubleshooting

### Gmail Bağlantı Problemləri

1. **2-Step Verification** aktiv olduğundan əmin olun
2. **App Password** düzgün yaradıldığından əmin olun
3. **GMAIL_USER** və **GMAIL_APP_PASSWORD** düzgün təyin edildiyindən əmin olun

### Email Göndərilməsi Problemləri

1. Gmail SMTP limitlərini yoxlayın
2. Network bağlantısını yoxlayın
3. Console loglarını yoxlayın

### Token Problemləri

1. **JWT_SECRET** minimum 32 simvol olmalıdır
2. Token müddətinin bitmədiyini yoxlayın
3. Cookie settings düzgün olduğundan əmin olun

## 📞 Dəstək

Hər hansı problem yaranarsa, aşağıdakı məlumatları yoxlayın:

1. Console logları
2. Network requests
3. Environment variables
4. Gmail account settings

---

**Qeyd**: Bu sistem yüksək təhlükəsizlik standartlarına uyğun olaraq hazırlanmışdır. Mütləq güclü parollar istifadə edin və environment fayllarını git-ə əlavə etməyin.
