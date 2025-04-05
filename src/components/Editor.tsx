import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import type { EditorProps } from '../types';

export function Editor({ content, onChange }: EditorProps) {
  return (
    <CKEditor
      editor={ClassicEditor}
      data={content}
      onChange={(event, editor) => {
        const data = editor.getData();
        onChange(data);
      }}
      config={{
        placeholder: 'Start writing your note...',
        toolbar: {
          items: [
            'heading',
            '|',
            'fontSize',
            'fontFamily',
            '|',
            'bold',
            'italic',
            'underline',
            'strikethrough',
            'subscript',
            'superscript',
            '|',
            'alignment',
            '|',
            'numberedList',
            'bulletedList',
            'indent',
            'outdent',
            '|',
            'link',
            'blockQuote',
            'insertTable',
            'mediaEmbed',
            '|',
            'textColor',
            'backgroundColor',
            '|',
            'code',
            'codeBlock',
            '|',
            'horizontalLine',
            '|',
            'undo',
            'redo'
          ],
          shouldNotGroupWhenFull: true
        },
        table: {
          contentToolbar: [
            'tableColumn',
            'tableRow',
            'mergeTableCells',
            'tableCellProperties',
            'tableProperties'
          ]
        },
        image: {
          toolbar: [
            'imageStyle:inline',
            'imageStyle:block',
            'imageStyle:side',
            '|',
            'toggleImageCaption',
            'imageTextAlternative'
          ]
        },
        heading: {
          options: [
            { model: 'paragraph', title: 'Paragraph', class: 'ck-heading_paragraph' },
            { model: 'heading1', view: 'h1', title: 'Heading 1', class: 'ck-heading_heading1' },
            { model: 'heading2', view: 'h2', title: 'Heading 2', class: 'ck-heading_heading2' },
            { model: 'heading3', view: 'h3', title: 'Heading 3', class: 'ck-heading_heading3' },
            { model: 'heading4', view: 'h4', title: 'Heading 4', class: 'ck-heading_heading4' },
            { model: 'heading5', view: 'h5', title: 'Heading 5', class: 'ck-heading_heading5' },
            { model: 'heading6', view: 'h6', title: 'Heading 6', class: 'ck-heading_heading6' }
          ]
        },
        fontSize: {
          options: [
            'tiny',
            'small',
            'default',
            'big',
            'huge'
          ]
        },
        fontFamily: {
          options: [
            'default',
            'Arial, Helvetica, sans-serif',
            'Courier New, Courier, monospace',
            'Georgia, serif',
            'Lucida Sans Unicode, Lucida Grande, sans-serif',
            'Tahoma, Geneva, sans-serif',
            'Times New Roman, Times, serif',
            'Trebuchet MS, Helvetica, sans-serif',
            'Verdana, Geneva, sans-serif'
          ]
        }
      }}
    />
  );
}