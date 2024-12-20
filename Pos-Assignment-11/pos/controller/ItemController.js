import { item_array } from "../db/database.js";
import ItemModel from "../model/ItemModel.js";

let selectedItemId = null;


const loadItemTable = () => {
    $("#iTable_body").empty();
    item_array.forEach((item) => {
        const row = `
        <tr>
        <td>${item.id}</td>
        <td>${item.name}</td>
        <td>${item.qty}</td>
        <td>Rs. ${parseFloat(item.price).toFixed(2)}</td>
        <td>${item.description}</td>
        <td>
            <button class="btn btn-sm btn-primary me-2" onclick="editItem('${item.id}')">
                <i class="fas fa-edit"></i> Update
            </button>
            <button class="btn btn-sm btn-danger" onclick="deleteItem('${item.id}')">
                <i class="fas fa-trash"></i> Delete
            </button>
        </td>
        </tr>`;
        $("#iTable_body").append(row);
    });
};


function generateItemId() {
    let maxId = 0;
    item_array.forEach(item => {
        const idNumber = parseInt(item.id.replace('I', ''));
        if (idNumber > maxId) maxId = idNumber;
    });
    return `I${maxId + 1}`;
}


$("#iSave_btn").on('click', function() {

    const itemData = {
        name: $("#iName").val().trim(),
        price: parseFloat($("#iPrice").val()),
        qty: parseInt($("#iQty").val()),
        description: $("#iDescription").val().trim()
    };


    if (!validateFields(itemData)) return;

    if ($(this).text() === "Add Item") {
        if (isDuplicateName(itemData.name)) {
            showError('Duplicate Name', 'This item name is already registered');
            return;
        }


        const newItem = new ItemModel(
            generateItemId(),
            itemData.name,
            itemData.price,
            itemData.qty,
            itemData.description
        );

        item_array.push(newItem);
        showSuccess('Success', 'Item added successfully!');
        orderController.loadItems();
    } else {
        if (isDuplicateName(itemData.name, selectedItemId)) {
            showError('Duplicate Name', 'This item name is already registered');
            return;
        }

        const index = item_array.findIndex(i => i.id === selectedItemId);
        if (index !== -1) {
            item_array[index] = new ItemModel(
                selectedItemId,
                itemData.name,
                itemData.price,
                itemData.qty,
                itemData.description
            );
            showSuccess('Success', 'Item updated successfully!');
            orderController.loadItems();
            $(this).text("Add Item");
        }
    }

    loadItemTable();
    clearForm();
});


window.editItem = function(id) {
    selectedItemId = id;
    const item = item_array.find(i => i.id === id);

    if (item) {
        $("#iName").val(item.name);
        $("#iPrice").val(item.price);
        $("#iQty").val(item.qty);
        $("#iDescription").val(item.description);
        $("#iSave_btn").text("Update Item");

        showToast('Edit Mode', `Now editing ${item.name}`);
    }
};


window.deleteItem = function(id) {
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
            const index = item_array.findIndex(i => i.id === id);
            if (index !== -1) {
                item_array.splice(index, 1);
                loadItemTable();
                if (selectedItemId === id) {
                    clearForm();
                }
                showSuccess('Deleted!', 'Item has been deleted.');
            }
        }
    });
};


function validateFields(data) {
    if (!data.name) {
        showError('Validation Error', 'Please enter item name');
        return false;
    }
    if (!data.price || isNaN(data.price)) {
        showError('Validation Error', 'Please enter a valid price');
        return false;
    }
    if (data.price <= 0) {
        showError('Validation Error', 'Price must be greater than 0');
        return false;
    }
    if (!data.qty || isNaN(data.qty)) {
        showError('Validation Error', 'Please enter a valid quantity');
        return false;
    }
    if (data.qty < 0) {
        showError('Validation Error', 'Quantity cannot be negative');
        return false;
    }
    if (!data.description) {
        showError('Validation Error', 'Please enter category');
        return false;
    }
    return true;
}

function isDuplicateName(name, excludeId = null) {
    return item_array.some(i =>
        i.id !== excludeId && i.name.toLowerCase() === name.toLowerCase()
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
    $("#frm-item")[0].reset();
    selectedItemId = null;
    $("#btn-save-item").text("Add Item");
}


$(document).ready(function() {
    loadItemTable();
});