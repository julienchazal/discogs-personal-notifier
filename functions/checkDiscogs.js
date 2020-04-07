// exports.handler = async function(event, context, callback) {
//     let q = await fetch('https://api.discogs.com/releases/2387793');
//     let res = await q.json();
//     console.log(res);
//     callback(null, {
//         statusCode: 200,
//         body: "Hello, World"
//     });
// }
const fetch = require('node-fetch');

exports.handler =  event => {
    // setInterval(async () => {
    //     let q = await fetch('https://api.discogs.com/releases/2387793');
    //     let res = await q.json();
    //     return {
    //         statusCode: 200,
    //         body: JSON.stringify({"en vente" : res.num_for_sale}),
    //     }
    // }, 5000)
}