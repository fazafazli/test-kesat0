const fs = require('fs');  
const buf = fs.readFileSync('public\\dokumentasi\\nala.webp');  
  console.error('Not a WebP file');  
  process.exit(1);  
}  
let offset = 12;  
let hasAlpha = false;  
  const chunk = buf.slice(offset, offset+4).toString();  
  const size = buf.readUInt32LE(offset+4);  
  if (chunk === 'VP8X') {  
    const flags = buf[offset+8];  
    console.log('chunk', chunk, 'size', size, 'flags', flags.toString(2).padStart(8,'0'), 'hasAlpha', hasAlpha);  
    break;  
  }  
  offset += 8 + size + (size % 2);  
}  
if (!hasAlpha) console.log('Alpha not found in VP8X chunk or VP8X chunk missing');  
const data = buf.slice(0, 16);  
console.log('header', data.toString('hex'));  
