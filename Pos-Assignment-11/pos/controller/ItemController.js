import ItemModel   from "../model/ItemModel.js";
import {customer_array,item_array,order_array} from "../db/database.js";

const loadItemTable = () => {
    $("#iTable_body").empty();
    item_array.map((item,index)=> {
        console.log(item);
        let data = `<tr><td>${item.id}</td><td>${item.name}</td><td>${item.quantity}</td><td>${item.price}</td><td>${item.description}</td></tr>`
        $("#iTable_body").append(data);
        })
}

const cleanItemForm = () => {
    $('#iName').val("");
    $('#iQty').val("");
    $('#iPrice').val("");
    $('#iDescription').val("");
}

let selected_item_index = null;

$("#iSave_btn").on('click',function(){
    let iName = $('#iName').val();
    let iQuantity = $('#iQty').val();
    let iPrice = $('#iPrice').val();
    let iDescription = $('#iDescription').val();

    console.log("iname: ", iName);

    if(iName.length ===0) {
        swal.fire({
            icon: "error",
            title: "Invalid Input",
            text: "Invalid Name"
        });

    }else if (iQuantity.length ===0) {
        swal.fire({
            icon: "error",
            title: "Invalid Input",
            text: "Invalid Quantity"
        });
    }else if (iPrice.length ===0) {
            swal.fire({
            icon: "error",
            title: "Invalid Input",
            text: "Invalid Price"
        });
    }else {
        let  item = new ItemModel(
            item_array.length + 1,
            iName,
            iQuantity,
            iPrice,
            iDescription);

        item_array.push(item);
        loadItemTable();
        cleanItemForm();
    }


});

$('#iTable_body').on('click','tr',function(){
   let index =$(this).index();

   selected_item_index=$(this).index();

   let  item_obj = item_array[index];

   let iName = item_obj.name;
    let iQuantity = item_obj.quantity;
    let iPrice = item_obj.price;
    let iDescription = item_obj.description;

    $('#iName').val(iName);
    $('#iQty').val(iQuantity);
    $('#iPrice').val(iPrice);
    $('#iDescription').val(iDescription);


});

$('#iUpdate_btn').on('click',function(){
   let index = selected_item_index;

    let iName = $('#iName').val();
     let iQuantity = $('#iQty').val();
     let iPrice = $('#iPrice').val();
     let iDescription = $('#iDescription').val();

     let item = new ItemModel(
         item_array[index].id,
         iName,
         iQuantity,
         iPrice,
         iDescription
     );

     item_array[selected_item_index]=item;
     loadItemTable();
     cleanItemForm();

});

$('#iDelete_btn').on('click',function(){

    const swalWithBootstrapButtons = Swal.mixin({
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
        if(result.isConfirmed) {
            item_array.splice(selected_item_index,1);
            loadItemTable();
            cleanItemForm();

            swalWithBootstrapButtons.fire({
                title: 'Deleted!',
                text: 'Your file has been deleted.',
                icon: 'success',

            });

        }else if (
            result.dismiss === Swal.DismissReason.cancel

        ){
            swalWithBootstrapButtons.fire({
                title: 'Cancelled',
                text: 'Your file is safe :)',
                icon: 'error'
            });
        }
    });

});

