import * as XLSX from "xlsx";
import * as FileSaver from "file-saver";

export const saveToXlsx = (input, filename) => {
    const ws = XLSX.utils.json_to_sheet(input);
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8" });
    FileSaver.saveAs(data, filename + ".xlsx");
}

export const saveToTxt = (input, filename) => {
    const lines = input.join("\n");
    const data = new Blob([lines], { type: "text/plain" });
    FileSaver.saveAs(data, filename + ".txt");
}


export const getFileBlob = async file => {
    const res = await fetch(file).catch();
    if (res) {
        return res.blob().catch();
    }
    return null;
};

/**
 * @param {Blob} blob okunacak dosya.
 * @description Blob formatındaki dosyayı okur ve içeriğini döndürür. Asenkrondur ve beklenmelidir.
 * */
export const readBlobAsTxt = async (blob) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
            resolve(reader.result);
        }
        reader.readAsText(blob, "utf-8");
    })
}

export const readBlobAsXlsx = async (blob) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
            const workbook = XLSX.read(reader.result, {
                type: 'binary'
            });
            let result = [];
            workbook.SheetNames.forEach(function (sheetName) {
                result.push(XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]));
            })
            resolve(result);
        }
        reader.readAsBinaryString(blob);
    })
}

export const readTxtAndConvertToArray = (file) => {
    return new Promise(async (resolve, reject) => {
        const txt = await readBlobAsTxt(file).catch(reject);
        resolve(txt.split("\n"));
    })
    if (!file) return false;
}