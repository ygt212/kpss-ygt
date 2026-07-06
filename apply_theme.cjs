const fs = require('fs');
const path = require('path');

const dir = 'c:/Users/Yiğit/Desktop/proje/kpss/src';
const walk = (d) => {
  const files = fs.readdirSync(d);
  let result = [];
  files.forEach(f => {
    const full = path.join(d, f);
    if (fs.statSync(full).isDirectory()) result = result.concat(walk(full));
    else if (full.endsWith('.tsx') || full.endsWith('.ts')) result.push(full);
  });
  return result;
}

const files = walk(dir);
files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let changed = false;

  const originalContent = content;
  
  // 1. & 2. Cards to #fbfcfe
  // Previously we changed bg-white to bg-slate-50. Now change those bg-slate-50 to bg-[#fbfcfe]
  // But wait, the background is bg-slate-100.
  content = content.replace(/bg-slate-50 dark:bg-slate-800/g, 'bg-[#fbfcfe] dark:bg-slate-800');
  
  // 3. Reduce shadow size, increase border visibility
  content = content.replace(/shadow-xl/g, 'shadow-md');
  content = content.replace(/shadow-lg/g, 'shadow-sm');
  content = content.replace(/border-slate-200/g, 'border-slate-300');
  content = content.replace(/border-slate-100/g, 'border-slate-200');

  // 4. Countdown blue to slate
  if (file.includes('Countdown.tsx')) {
    content = content.replace(/blue-600/g, 'slate-600');
    content = content.replace(/blue-500/g, 'slate-500');
    content = content.replace(/blue-400/g, 'slate-400');
    content = content.replace(/blue-100/g, 'slate-200');
    content = content.replace(/blue-50/g, 'slate-100');
    content = content.replace(/blue-900/g, 'slate-700');
    content = content.replace(/blue-800/g, 'slate-600');
    content = content.replace(/blue-300/g, 'slate-400');
  } else {
    // 5. Mavi/cyan/purple aksanların doygunluğunu düşürme
    // We will change standard vibrant colors to softer variants:
    // blue -> indigo
    // cyan -> teal
    // purple -> violet
    // Violet is much softer and more pastel than purple. Teal is more matte than cyan. Indigo is slightly more muted than bright blue.
    content = content.replace(/blue-/g, 'indigo-');
    content = content.replace(/cyan-/g, 'teal-');
    content = content.replace(/purple-/g, 'violet-');
  }

  if (content !== originalContent) {
    fs.writeFileSync(file, content);
    console.log('Updated', file);
  }
});
