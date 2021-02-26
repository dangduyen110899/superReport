const xlsx = require('xlsx');

const workbook = xlsx.readFile('dsgv.xlsx');
const worksheet = workbook.SheetNames;
const sheet = worksheet[0]
const dataExcel = xlsx.utils.sheet_to_json(workbook.Sheets[sheet]);

// // let posts = [];
// // let post = {};

// // for (let cell in worksheet) {
// //     const cellAsString = cell.toString();

// //     if (cellAsString[1] !== 'r' && cellAsString[1] !== 'm' && cellAsString[1] > 1) {
// //         if (cellAsString[0] === 'A') {
// //             post.title = worksheet[cell].v;
// //         }
// //         if (cellAsString[0] === 'B') {
// //             post.author = worksheet[cell].v;
// //         }
// //         if (cellAsString[0] === 'C') {
// //             post.released = worksheet[cell].v;
// //             posts.push(post);
// //             post = {};
// //         }
// //     }
// // }

 console.log(dataExcel[3]);

