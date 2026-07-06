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
  
  // Replace the main page background colors to a slightly darker slate
  if (content.includes('bg-slate-50 dark:bg-slate-900')) {
    content = content.replace(/bg-slate-50 dark:bg-slate-900/g, 'bg-slate-100 dark:bg-slate-900');
    changed = true;
  }
  
  // Replace pure white cards/headers to the softer slate-50
  if (content.includes('bg-white')) {
    content = content.replace(/bg-white/g, 'bg-slate-50');
    changed = true;
  }

  if (changed) {
    fs.writeFileSync(file, content);
    console.log('Updated', file);
  }
});
