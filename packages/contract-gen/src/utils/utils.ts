import path from 'path';
import fs from 'fs';

export async function checkExport(filePath: string, exportName: string) {
  try {
    // Resolve absolute path for dynamic import
    const absolutePath = path.resolve(filePath);
    
    // Import the module
    const module = await import(absolutePath);
    
    // Check if key exists
    return exportName in module;
  } catch (e) {
    console.error(`Error loading file ${filePath}:`, e);
    return false;
  }
}

export function checkExportSync(filePath: string, exportName: string): boolean {
  const content = fs.readFileSync(filePath, "utf-8");
  
  // Matches: 
  // 1. export const name... 
  // 2. export function name...
  // 3. export { name }
  const regex = new RegExp(
    `export\\s+(const|let|var|function|class|type|interface)\\s+${exportName}\\b|export\\s*{[^}]*\\b${exportName}\\b[^}]*}`,
    'g'
  );

  return regex.test(content);
}

 

// export async function listExportsAsync(filePath: string) {
//   const absolutePath = path.resolve(filePath);
//   const module = await import(absolutePath);
  
//   // module is an object where keys are the export names
//   return Object.keys(module); 
// }

// // Example result: ["query", "body", "response", "UserSchema"]

// import path from 'path';
import { pathToFileURL } from 'url'; // Built-in Node utility

export async function listExportsAsync(filePath: string) {
  try {
    // 1. Get the absolute system path (e.g., C:\Users\...)
    const absolutePath = path.resolve(filePath);

    // 2. Convert to file:// URL (e.g., file:///C:/Users/...)
    const fileUrl = pathToFileURL(absolutePath).href;

    // 3. Import using the valid URL
    const module = await import(fileUrl);
    
    return Object.keys(module); 
  } catch (e) {
    console.error(`Error loading file ${filePath}:`, e);
    return [];
  }
}