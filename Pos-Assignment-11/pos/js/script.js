//
// // customer array
// let customer_array = [];
//
//
//
// //load customer table
// const loadCustomerTable = () => {
//     $("#customerTableBody").empty();
//     customer_array.map((item, index) => {
//         console.log(item);
//         let data = `<tr><td>${item.id}</td><td>${item.name}</td><td>${item.phone}</td><td>${item.email}</td><td>${item.address}</td></tr>`
//         $("#customerTableBody").append(data);
//     })
// }
//
//
// // Save Customer Button
// $("#customer_save_btn").on("click", function() {
//     let name = $('#cName').val();
//     let address = $('#cAddress').val();
//     let email = $('#cEmail').val();
//     let phone = $('#cPhone').val();
//
//
//     console.log("first_name: ", name);
//     console.log("address: ", address);
//     console.log("mobile: ", phone);
//     console.log("email: ", email);
//
//     let customer = {
//         id: customer_array.length + 1,
//         name: name,
//         phone: phone,
//         email: email,
//         address: address
//     };
//
//     customer_array.push(customer);
//
//     loadCustomerTable();
//
//     // // create table row
//     // let data = `<tr><td>${first_name}</td><td>${last_name}</td><td>${mobile}</td><td>${email}</td><td>${address}</td></tr>`
//     // $("#customerTableBody").append(data);
// });
//
//
// // item array
// let item_array = [];
//
//
// //load item table
// const loadItemTable = () => {
//     $("#iTable_body").empty();
//     item_array.map((item, index) => {
//         console.log(item);
//         let items = `<tr><td>${item.id}</td><td>${item.iname}</td><td>${item.iQty}</td><td>${item.iprice}</td><td>${item.iDescription}</tr>`
//         $("#iTable_body").append(items);
//     })
// }
//
// $('#iSave_btn').on('click', function() {
//     let iname = $('#iName').val();
//     let iQty = $('#iQty').val();
//     let iprice = $('#iPrice').val();
//     let iDescription = $('#iDescription').val();
//
//     console.log("iname: ", iname);
//     console.log("iQty: ", iQty);
//     console.log("iprice: ", iprice);
//     console.log("iDescription: ", iDescription);
//
//     let items1 = {
//         id: item_array.length + 1,
//         iname: iname,
//         iQty: iQty,
//         iprice: iprice,
//         iDescription: iDescription
//     };
//
//     item_array.push(items1);
//
//     loadItemTable();
// });