import { customer_array } from "../db/database.js";
import { item_array } from "../db/database.js";
import { order_array } from "../db/database.js";


var row_index = null;






$('#oCustomer_id').on('click', () => {
    customer_array.forEach(customer => {
        // Check if an option with the same customer_id already exists
        const isCustomerAdded = Array.from(document.getElementById('oCustomer_id').options).some(option => {
            const existingCustomer = JSON.parse(option.value);
            return existingCustomer._id === customer._id;
        });

        if (!isCustomerAdded) {
            // If the customer with the same customer_id doesn't exist, add a new option
            const option = document.createElement("option");
            option.value = JSON.stringify(customer);
            option.text = customer._id;
            document.getElementById('oCustomer_id').appendChild(option);
        }
    });
});

$('#oCustomer_id').on('change', () => {
    const selectedOption = $('#oCustomer_id option:selected');

    if (selectedOption.length > 0) {
        const selectedCustomer = JSON.parse(selectedOption.val());
        let name = selectedCustomer._name;


        $('#oCustomerName').val(name);


    } else {
        console.log('No option selected');
    }
});


$('#order_item_id').on('click', () => {
    item_array.forEach(item => {
        // Check if an option with the same customer_id already exists
        const isItemAdded = Array.from(document.getElementById('order_item_id').options).some(option => {
            const existingCustomer = JSON.parse(option.value);
            return existingCustomer._id === item._id;
        });

        if (!isItemAdded) {
            // If the customer with the same customer_id doesn't exist, add a new option
            const option = document.createElement("option");
            option.value = JSON.stringify(item);
            option.text = item._id;
            document.getElementById('order_item_id').appendChild(option);
        }
    });
});