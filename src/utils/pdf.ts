import html2pdf from 'html2pdf.js';
import type { Note } from '../types';

export function exportNoteToPDF(note: Note) {
  const element = document.createElement('div');
  element.innerHTML = `
    <style>
      body { font-family: Arial, sans-serif; }
      h1 { font-size: 24px; margin-bottom: 16px; }
      ul, ol { padding-left: 40px; margin: 16px 0; }
      li { margin: 8px 0; }
      p { margin: 16px 0; }
      table { border-collapse: collapse; width: 100%; margin: 16px 0; }
      th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
      blockquote { border-left: 4px solid #ddd; margin: 16px 0; padding-left: 16px; }
      pre { background: #f5f5f5; padding: 16px; border-radius: 4px; }
      code { font-family: monospace; background: #f5f5f5; padding: 2px 4px; border-radius: 2px; }
    </style>
    <h1>${note.title}</h1>
    ${note.content}
  `;

  const opt = {
    margin: 1,
    filename: `${note.title.toLowerCase().replace(/\s+/g, '-')}.pdf`,
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { 
      scale: 2,
      useCORS: true,
      logging: false
    },
    jsPDF: { 
      unit: 'in', 
      format: 'letter', 
      orientation: 'portrait'
    }
  };

  html2pdf().set(opt).from(element).save();
}