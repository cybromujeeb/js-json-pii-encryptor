# 🔐 JSON PII Transformer

A lightweight and dependency-free JavaScript utility for **encoding and decoding Personally Identifiable Information (PII)** fields inside JSON objects.  
It uses a reversible character mapping technique to **obfuscate** sensitive data before storage or transmission — and decode it back when needed.

This library is ideal for:
- Hiding PII in logs
- Sanitizing API responses
- Obfuscating data for QA, analytics, or local testing

---

## 🚀 Features

✅ Simple reversible obfuscation for JSON data  
✅ Works for any field (selective PII masking)  
✅ 100% deterministic (same input → same output)  
✅ No dependencies, works in browser and Node.js  
✅ Fully customizable mapping  
✅ Lightweight (~3KB)  

---
## 💡 Example Usage

```
const piiKeys = ['email', 'phone', 'address'];

const userData = {
  name: 'Mujeeb Khan',
  email: 'mujeeb@enfintechnologies.com',
  phone: '1234567890',
  address: '123 Tech Street, City, Country',
  dateOfBirth: '1990-01-01'
};

// Encrypt sensitive fields
const encrypted = transformDataWithEncryption(userData, piiKeys);
console.log('🔐 Encrypted:', encrypted);

// Decrypt back to original
const decrypted = decodeDataWithDecryption(encrypted, piiKeys);
console.log('🔓 Decrypted:', decrypted);
