import { Injectable } from '@angular/core';
import { saveAs } from 'file-saver/src/FileSaver.js';

@Injectable({
  providedIn: 'root'
})
export class ExportService {

  constructor() { }

  downloadFile(data, fileName) {
    const replacer = (key, value) => value === null ? '' : value; // specify how you want to handle null values here
    const header = Object.keys(data[0]);
    const csv = data.map(row => header.map(fieldName => JSON.stringify(row[fieldName], replacer)).join(','));
    csv.unshift(header.join(','));
    const csvArray = csv.join('\r\n');
    const blob = new Blob([csvArray], {type: 'text/csv' });
    saveAs(blob, fileName + '.csv');
  }
}
