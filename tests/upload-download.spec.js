const ExcelJs = require('exceljs');
const { test, expect } = require('@playwright/test');
const path = require('path');

async function writeExcelTest(searchText, replaceText, change, filePath) {
  const workbook = new ExcelJs.Workbook();
  await workbook.xlsx.readFile(filePath);
  const worksheet = workbook.getWorksheet('Sheet1');

  const pos = await readExcel(worksheet, searchText);
  if (pos.row === -1 || pos.column === -1) {
    throw new Error(`Text "${searchText}" not found in worksheet`);
  }

  const cell = worksheet.getCell(pos.row, pos.column + change.colChange);
  cell.value = replaceText;
  await workbook.xlsx.writeFile(filePath);
}

async function readExcel(worksheet, searchText) {
  let output = { row: -1, column: -1 };
  worksheet.eachRow((row, rowNumber) => {
    row.eachCell((cell, colNumber) => {
      if (cell.value === searchText) {
        output = { row: rowNumber, column: colNumber };
      }
    });
  });
  return output;
}

test('Upload download excel validation', async ({ page }, testInfo) => {
  const textSearch = 'Mango';
  const updateValue = '350';

  await page.goto('https://rahulshettyacademy.com/upload-download-test/index.html');

  // 1) Download and save to a deterministic, test-scoped path
  const downloadPromise = page.waitForEvent('download');
  await page.getByRole('button', { name: 'Download' }).click();
  const download = await downloadPromise;

  const excelPath = testInfo.outputPath('download.xlsx');
  await download.saveAs(excelPath); // works across browsers

  // 2) Edit the downloaded file (await the async function!)
  await writeExcelTest(textSearch, updateValue, { rowChange: 0, colChange: 2 }, excelPath);

  // 3) Upload the modified file
  await page.locator('#fileinput').setInputFiles(excelPath);

  // 4) Validate UI reflects new value
  const rowWithFruit = page.getByRole('row').filter({ has: page.getByText(textSearch) });
  await expect(rowWithFruit).toContainText(updateValue);
});
