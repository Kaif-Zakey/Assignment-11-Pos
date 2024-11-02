import { customer_array } from "../db/database.js";
import CustomerModel from "../model/CustomerModel.js";


const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const phoneRegex = /^(?:\+94|0)?7[0-9]{8}$/;


let selectedCustomerId = null;

// Load customer table data
const loadCustomerTable = () => {
    $("#customerTableBody").empty();
    customer_array.forEach((customer) => {
        const row = `
<tr>
<td>${customer.id}</td>
<td>${customer.name}</td>
<td>${customer.mobile}</td>
<td>${customer.email}</td>
<td>${customer.address}</td>
<td>
    <button class="btn btn-sm btn-primary me-2" onclick="editCustomer('${customer.id}')">
        <i class="fas fa-edit"></i> update
    </button>
    <button class="btn btn-sm btn-danger" onclick="deleteCustomer('${customer.id}')">
        <i class="fas fa-trash"></i> Delete
    </button>
</td>
</tr>`;
        $("#customerTableBody").append(row);
    });
};

// Generate new customer ID
function generateCustomerId() {
    let maxId = 0;
    customer_array.forEach(customer => {
        const idNumber = parseInt(customer.id.replace('C', ''));
        if (idNumber > maxId) maxId = idNumber;
    });
    return `C${maxId + 1}`;
}


$("#customer_save_btn").on('click', function() {
    // Get form data
    const customerData = {
        name: $("#cName").val().trim(),
        mobile: $("#cMobile").val().trim(),
        email: $("#cEmail").val().trim(),
        address: $("#cAddress").val().trim()
    };

    if (!validateFields(customerData)) return;

    if ($(this).text() === "Add Customer") {
        if (isDuplicateEmail(customerData.email)) {
            showError('Duplicate Email', 'This email address is already registered');
            return;
        }
        if (isDuplicatePhone(customerData.mobile)) {
            showError('Duplicate Phone', 'This phone number is already registered');
            return;
        }

        const newCustomer = new CustomerModel(
            generateCustomerId(),
            customerData.name,
            customerData.mobile,
            customerData.email,
            customerData.address
        );

        customer_array.push(newCustomer);
        showSuccess('Success', 'Customer added successfully!');
        orderController.loadCustomers()

    } else {
        if (isDuplicateEmail(customerData.email, selectedCustomerId)) {
            showError('Duplicate Email', 'This email address is already registered');
            return;
        }
        if (isDuplicatePhone(customerData.mobile, selectedCustomerId)) {
            showError('Duplicate Phone', 'This phone number is already registered');
            return;
        }

        const index = customer_array.findIndex(c => c.id === selectedCustomerId);
        if (index !== -1) {
            customer_array[index] = new CustomerModel(
                selectedCustomerId,
                customerData.name,
                customerData.mobile,
                customerData.email,
                customerData.address
            );
            showSuccess('Success', 'Customer updated successfully!');
            orderController.loadCustomers();
            $(this).text("Add Customer");
        }
    }

    loadCustomerTable();
    clearForm();
});

window.editCustomer = function(id) {
    selectedCustomerId = id;
    const customer = customer_array.find(c => c.id === id);

    if (customer) {
        $("#cName").val(customer.name);
        $("#cMobile").val(customer.mobile);
        $("#cEmail").val(customer.email);
        $("#cAddress").val(customer.address);
        $("#customer_save_btn").text("Update Customer");

        showToast('Edit Mode', `Now editing ${customer.name}'s details`);
    }
};

window.deleteCustomer = function(id) {
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
        if (result.isConfirmed) {
            const index = customer_array.findIndex(c => c.id === id);
            if (index !== -1) {
                customer_array.splice(index, 1);
                loadCustomerTable();
                if (selectedCustomerId === id) {
                    clearForm();
                }
                showSuccess('Deleted!', 'Customer has been deleted.');
            }
        }
    });
};

function validateFields(data) {

    if (!data.name) {
        showError('Validation Error', 'Please enter last name');
        return false;
    }
    if (!data.email) {
        showError('Validation Error', 'Please enter email');
        return false;
    }
    if (!emailRegex.test(data.email)) {
        showError('Validation Error', 'Please enter a valid email address');
        return false;
    }
    if (!data.mobile) {
        showError('Validation Error', 'Please enter phone number');
        return false;
    }
    if (!phoneRegex.test(data.mobile)) {
        showError('Validation Error', 'Please enter a valid Sri Lankan phone number (e.g., 0771234567)');
        return false;
    }
    if (!data.address) {
        showError('Validation Error', 'Please enter address');
        return false;
    }
    return true;
}

function isDuplicateEmail(email, excludeId = null) {
    return customer_array.some(c =>
        c.id !== excludeId && c.email.toLowerCase() === email.toLowerCase()
    );
}

function isDuplicatePhone(phone, excludeId = null) {
    return customer_array.some(c =>
        c.id !== excludeId && c.mobile === phone
    );
}

function showError(title, text) {
    Swal.fire({
        icon: 'error',
        title,
        text,
        confirmButtonColor: '#3085d6'
    });
}

function showSuccess(title, text) {
    Swal.fire({
        icon: 'success',
        title,
        text,
        timer: 1500,
        showConfirmButton: false
    });
}

function showToast(title, text) {
    Swal.fire({
        icon: 'info',
        title,
        text,
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000
    });
}

function clearForm() {
    $("#frm-customer")[0].reset();
    selectedCustomerId = null;
    $("#customer_save_btn").text("Add Customer");
}

$(document).ready(function() {
    loadCustomerTable();
});
