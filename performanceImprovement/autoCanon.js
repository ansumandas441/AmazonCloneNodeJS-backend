// const autocannon = require('autocannon');

// // Specify the URL to test
// const url = 'http://localhost:3001/product/api/getById?id=65957ed0cfc288ffcca248e2';

// const test = async () => {
//     const instance = autocannon({
//         title:'Autocannon test for database efficiency, for product read api',
//         url:'http://localhost:3001',
//         connections:100,
//         duration:10,
//         pipelining:1,
//         workers:2,
//         requests: [
//             {
//                 method: 'GET',
//                 path:'/product/api/getById?id=65a9acf346611ac10aea9790'
//             }
//         ]
//     },console.log);
//     autocannon.track(instance, { renderProgressBar: false });
// }

// const test2 = async () => {
//     const instance = autocannon({
//         title:'Autocannon test for database efficiency, for product read api',
//         url:'http://localhost:3001',
//         connections:1000,
//         duration:25,
//         pipelining:1,
//         workers:2,
//         requests: [
//             {
//                 method: 'GET',
//                 path:'/product/api/getByName?name=Mixer'
//             }
//         ]
//     },console.log);
//     autocannon.track(instance, { renderProgressBar: false });
// }

// test2();

//start the server and then run this script to see latency
// starting 859.5 ms, 789ms -> not much improvement with lean
//without indexing for test2->4584,4508,4801
//with indexing->4981,4787,4563,4486
