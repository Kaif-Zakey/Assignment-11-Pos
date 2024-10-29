import CustomerModel   from "../model/CustomerModel.js";
import {customer_array,item_array,order_array} from "../db/database.js";

const validateEmai=(email)=>{
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
}

const validateMobile=(mobile)=>{
    const sriLankanMobileRegex = /^(?:\+94|0)?7[0-9]{8}$/;
    return sriLankanMobileRegex.test(mobile);
}

//load customer table
const loadCustomerTable = () => {
    $("#customerTableBody").empty();
    customer_array.map((item, index) => {
        console.log(item);
        let data = `<tr><td>${item.id}</td><td>${item.name}</td><td>${item.mobile}</td><td>${item.email}</td><td>${item.address}</td></tr>`
        $("#customerTableBody").append(data);
    })
}

const cleanCustomerForm = () => {
    $('#cName').val("")
    $('#cEmail').val("");
    $('#cMobile').val("");
    $('#cAddress').val("");
}

let selected_customer_index = null;

$("#customer_save_btn").on("click", function() {
    let name = $('#cName').val();
    let address = $('#cAddress').val();
    let email = $('#cEmail').val();
    let phone = $('#cMobile').val();

    if(name.length===0) {
        Swal.fire({
            icon: "error",
            title: "Invalid Input",
            text: "Invalid Name",
        });
    } else if(!validateEmai(email)) {
        Swal.fire({
            icon: "error",
            title: "Invalid Input",
            text: "Invalid Email",
        });
    } else if(!validateMobile(phone)) {
        Swal.fire({
            icon: "error",
            title: "Invalid Input",
            text: "Invalid Mobile",
        });
    } else {
        let customer = new CustomerModel(customer_array.length + 1, name, phone, email, address);
        customer_array.push(customer);
        loadCustomerTable();
        cleanCustomerForm();
    }
});

$("#customerTableBody").on("click", "tr", function() {
    let index = $(this).index();

    selected_customer_index = $(this).index();

    let customer_obj = customer_array[index];

    let name = customer_obj.name;
    let address = customer_obj.address;
    let email = customer_obj.email;
    let phone = customer_obj.mobile;


    $('#cName').val(name);
    $('#cAddress').val(address);
    $('#cEmail').val(email);
    $('#cMobile').val(phone);



});


$("#customer_update_btn").on("click", function() {
   let index = selected_customer_index;


        let name = $('#cName').val();
        let address = $('#cAddress').val();
        let email = $('#cEmail').val();
        let phone = $('#cMobile').val();

        let customer = new CustomerModel(
            customer_array[index].id,
            name,
            phone,
            email,
            address
        );

        customer_array[selected_customer_index] = customer;

    loadCustomerTable();
    cleanCustomerForm();

});




$("#customer_delete_btn").on("click", function() {

    const  swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
    });
    swalWithBootstrapButtons.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, cancel!',
        reverseButtons: true
    }).then((result) => {
        if (result.isConfirmed) {
            customer_array.splice(selected_customer_index, 1);
            loadCustomerTable();
            cleanCustomerForm();

            swalWithBootstrapButtons.fire({
                title: 'Deleted!',
                text: 'Your file has been deleted.',
                icon: 'success'
            });

        } else if (

            result.dismiss === Swal.DismissReason.cancel
        ) {
            swalWithBootstrapButtons.fire({
                title: 'Cancelled',
                text: 'Your file is safe :)',
                icon: 'error'
            });
        }
    });
});

