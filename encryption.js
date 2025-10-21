// --- same character maps as before ---
const fullCharMap = JSON.parse(atob('eyJBIjoidmZyZXMiLCJCIjoieHpocnciLCJDIjoibGR2b2giLCJEIjoicG53cWkiLCJFIjoieXVxam0iLCJGIjoiYWhzbHAiLCJHIjoiZHpvdGMiLCJIIjoia3hhb3IiLCJJIjoidHZ1cGUiLCJKIjoic252eGwiLCJLIjoianBlb2QiLCJMIjoiaG1rd2kiLCJNIjoiY3FscnoiLCJOIjoid2Jna3QiLCJPIjoieHJqemYiLCJQIjoieXB0bXMiLCJRIjoidnp3YWgiLCJSIjoiZGhqa3QiLCJTIjoia29xdmwiLCJUIjoibnN5YmEiLCJVIjoibHJqd3YiLCJWIjoidHBrcWkiLCJXIjoicGh6b2EiLCJYIjoiaGJmZ2wiLCJZIjoiZWpybmMiLCJaIjoibnh2dGwiLCJhIjoiZ2t6cmYiLCJiIjoiaHFzanAiLCJjIjoieWZ0dmEiLCJkIjoiZHZsenAiLCJlIjoic3dsdG4iLCJmIjoiem13dm8iLCJnIjoibmJ4bHkiLCJoIjoicmN0a20iLCJpIjoianpreHUiLCJqIjoidnd0YWwiLCJrIjoiaWZtcXAiLCJsIjoiZXV4c2QiLCJtIjoiY2dic3kiLCJuIjoicGt3eWEiLCJvIjoidHZyaHgiLCJwIjoidXdpbWYiLCJxIjoiaHNvYmsiLCJyIjoianBkYWMiLCJzIjoiZmlxdnciLCJ0Ijoiem1ub3IiLCJ1IjoibHlqYnAiLCJ2Ijoid3FreGYiLCJ3Ijoibmhya2QiLCJ4Ijoiamx0ZmkiLCJ5IjoiYmdsem0iLCJ6Ijoia3BlYXkiLCIrIjoic2Fld3IiLCIwIjoibGJud2oiLCIxIjoiamtoYWYiLCIyIjoicGJ0cW0iLCIzIjoiZnl3dm8iLCI0IjoibGRrcHgiLCI1IjoiY296cm4iLCI2IjoiaWx1eXQiLCI3IjoieGpoa3EiLCI4IjoienJuYmMiLCI5Ijoic2x5dnAiLCIuIjoieHl6YXEiLCJAIjoic2xrZHciLCIjIjoicHdsZW0iLCIkIjoibWRjdHkiLCIlIjoiYndxcmwiLCJeIjoia3pxZ3MiLCImIjoiam9xd3UiLCIqIjoidWZ6cGEiLCIoIjoiaHR5d3YiLCIpIjoicWRzYWYifQ'));



// Reverse map
const reverseFullCharMap = {};
for (let key in fullCharMap) {
  reverseFullCharMap[fullCharMap[key]] = key;
}

// Encode
function fullTransform(inputString) {
  let result = '';
  for (let char of inputString) {
    result += fullCharMap[char] || char; // Encode or leave unchanged
  }
  return result;
}

// --- FIXED DECODER ---
function fullDecode(transformedString) {
  let decodedResult = '';
  let i = 0;
  while (i < transformedString.length) {
    const chunk = transformedString.slice(i, i + 5);
    if (reverseFullCharMap[chunk]) {
      decodedResult += reverseFullCharMap[chunk];
      i += 5; // skip 5 when decoded
    } else {
      decodedResult += transformedString[i]; // keep non-encoded symbol
      i += 1; // move 1 step
    }
  }
  return decodedResult;
}

// Wrap into your PII transform/decode
function transformDataWithEncryption(data, piiKeys) {
  const output = {};
  for (const key in data) {
    output[key] = piiKeys.includes(key)
      ? fullTransform(data[key])
      : data[key];
  }
  return output;
}

function decodeDataWithDecryption(data, piiKeys) {
  const output = {};
  for (const key in data) {
    output[key] = piiKeys.includes(key)
      ? fullDecode(data[key])
      : data[key];
  }
  return output;
}

// Example
const piiKeys = ['email', 'phone', 'address'];
const userData = {
  name: 'Mujeeb Rahman',
  email: 'mujeeb@rahman.com',
  phone: '1234567890',
  address: '123 Tech Street, City, Country',
  dateOfBirth: '1990-01-01'
};

const encrypted = transformDataWithEncryption(userData, piiKeys);
console.log('🔐 Encrypted:', encrypted);

const decrypted = decodeDataWithDecryption(encrypted, piiKeys);
console.log('🔓 Decrypted:', decrypted);
