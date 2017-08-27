$(document).ready(function () {
    loadData();
    $("#btnAdd").click(function (e) {
        Add();
    });
});

//Load Data function

function loadData() {
    $.ajax({
        url: "/ShoppingCart/List",
        type: "POST",
        //contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            console.log(result);
            console.log("here");
            var html = '';
            var sno = 1;
            html = "<colgroup><col width='5%'/><col width='0%'/><col width='0%'/></colgroup><thead><tr><th> S.N. </th><th> CartId </th><<th> ProductId </th><th> CustomerId </th><th> CategoryId </th><th> SubCategoryId Id </th><th> Date </th><th> Quantiry </th><th> Price </th><th> </th><th> </th></tr></thead>";
            html += "<tbody>";
            $.each(result, function (key, item) {
                html += '<tr>';
                html += "<td>" + sno++ + ".</td>";
                html += '<td> ' + item.CartId + '</td> ';
                html += '<td> ' + item.ProductId + '</td> ';
                html += '<td> ' + item.CustomerId + '</td> ';
                html += '<td> ' + item.CategoryId + '</td> ';
                html += '<td> ' + item.SubCategoryId + '</td>';
                html += '<td> ' + item.Date + '</td> ';
                html += '<td> ' + item.Quantity + '</td> ';
                html += '<td> ' + item.Price + '</td> ';
                html += '<td><a href="#" onclick="return GetbyID(' + item.CartId + ')">Edit</a> | <a href="#" onclick="Delele(' + item.CartId + ')">Delete</a></td>';
                html += '</tr > ';
            });
            $('.tbody').html(html);
            //  html += "</tbody>";
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}
function Add() {
    var res = validate();
    if (res === false) {
        alert("nOT VALID");
        return false;

    }
    console.log("Here");
    var ShoppingCartObj = {
        ProductId: $('#ProductId').val(),
        CustomerId: $('#CustomerId').val(),
        CategoryId: $('#CategoryId').val(),
        SubCategoryId: $('#SubCategoryId').val(),
        Date: $('#Date').val(),
        Quantity: $('#Quantity').val(),
        Price: $('#Price').val(),

    };
    console.log(ShoppingCartObj);
    $.ajax({
        url: "/ShoppingCart/Add",
        data: JSON.stringify(ShoppingCartObj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            loadData();
            console.log(result);
            $('#myModal').modal('hide');
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}
function GetbyID(CartId) {
    $('#HdnCartId').css('border-color', 'lightgrey');
    $('#ProductId').css('border-color', 'lightgrey');
    $('#CustomerId').css('border-color', 'lightgrey');
    $('#CategoryId').css('border-color', 'lightgrey');
    $('#SubCategoryId').css('border-color', 'lightgrey');
    $('#Date').css('border-color', 'lightgrey');
    $('#Quantity').css('border-color', 'lightgrey');
    $('#Price').css('border-color', 'lightgrey');
    
    console.log(CartId);
    var url = "/ShoppingCart/GetbyID?CartId=" + CartId;
    $.ajax({
        url: url,
        type: "GET",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            $('#HdnCartId').val(result.CartId),
            $('#ProductId').val(result.ProductId),
            $('#CustomerId').val(result.CustomerId),
            $('#CategoryId').val(),
            $('#SubCategoryId').val(),
            $('#Date').val(),
            $('#Quantity').val(),
            $('#Price').val(),
            
            $('#myModal').modal('show');
            $('#btnUpdate').show();
            $('#btnAdd').hide();
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
    return false;
}

function Update() {
    var res = validate();
    if (res === false) {
        return false;
    }
    var ShoppingCartObj = {
        CartId: $('#HdnCartId').val(),
        ProductId: $('#ProductId').val(),
        CustomerId: $('#CustomerId').val(),
        CategoryId: $('#CategoryId').val(),
        SubCategoryId: $('#SubCategoryId').val(),
        Date: $('#Date').val(),
        Quantity: $('#Quantity').val(),
        Price: $('#Price').val(),
    };
    console.log(ShoppingCartObj);
    var url = "/ShoppingCart/Update?CartId=" + ShoppingCartObj.CartId;
    $.ajax({
        url: url,
        data: JSON.stringify(ShoppingCartObj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            loadData();
            $('#myModal').modal('hide');
            $('#HdnCartId').val("");
            $('#ProductId').val("");
            $('#CustomerId').val("");
            $('#CategoryId').val("");
            $('#SubCategoryId').val("");
            $('#Date').val("");
            $('#Quantity').val("");
            $('#Price').val("");

        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}

function Delele(CartId) {
    var ans = confirm("Are you sure you want to delete this Record?");
    var url = "/ShoppingCart/Delete?CartId=" + CartId;
    if (ans) {
        $.ajax({
            url: url,
            type: "POST",
            contentType: "application/json;charset=UTF-8",
            dataType: "json",
            success: function (result) {
                loadData();
            },
            error: function (errormessage) {
                alert(errormessage.responseText);
            }
        });
    }
}
function SearchByName() {
    var inp = $("#SearchTxt");
    var ShoppingCartObj = {
        Date: $('#SearchTxt').val()
    }
    if (inp.val().length > 0) {
        $.ajax({
            url: "/ShoppingCart/Search",
            data: JSON.stringify(ShoppingCartObj),
            type: "POST",
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            success: function (result) {
                console.log("here");
                var html = '';
                var sno = 1;
                html = "<colgroup><col width='5%'/><col width='0%'/><col width='0%'/></colgroup><thead><tr><th> S.N. </th><th> CartId </th><<th> ProductId </th><th> CustomerId </th><th> CategoryId </th><th> SubCategoryId </th><th> Date </th><th> Quantity </th><th> Price </th><th> </th><th> </th></tr></thead>";
                html += "<tbody>";
                $.each(result, function (key, item) {
                    html += '<tr>';
                    html += "<td>" + sno++ + ".</td>";
                    html += '<td> ' + item.CartId + '</td> ';
                    html += '<td> ' + item.ProductId + '</td> ';
                    html += '<td> ' + item.CustomerId + '</td> ';
                    html += '<td> ' + item.CategoryId + '</td> ';
                    html += '<td> ' + item.SubCategoryId + '</td> ';
                    html += '<td> ' + item.Date + '</td> ';
                    html += '<td> ' + item.Quantity + '</td> ';
                    html += '<td> ' + item.Price + '</td> ';
                    html += '<td><a href="#" onclick="return GetbyID(' + item.CartId + ')">Edit</a> | <a href="#" onclick="Delele(' + item.CartId + ')">Delete</a></td>';
                    html += '</tr > ';
                });
                $('.tbody').html(html);
                //  html += "</tbody>";
            },
        });
    }
}

function validate() {
    var isValid = true;
    if ($('#ProductId').val().trim() === "") {
        $('#ProductId').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#ProductId').css('border-color', 'lightgrey');
    }
    if ($('#CustomerId').val().trim() === "") {
        $('#CustomerId').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#CustomerId').css('border-color', 'lightgrey');
    }
    if ($('#CategoryId').val().trim() === "") {
        $('#CategoryId').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#CategoryId').css('border-color', 'lightgrey');
    }
    if ($('#SubCategoryId').val().trim() === "") {
        $('#SubCategoryId').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#SubCategoryId').css('border-color', 'lightgrey');
    }
    if ($('#Date').val().trim() === "") {
        $('#Date').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#Date').css('border-color', 'lightgrey');
    }
    if ($('#Quantity').val().trim() === "") {
        $('#Quantity').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#Quantity').css('border-color', 'lightgrey');
    }
    if ($('#Price').val().trim() === "") {
        $('#Price').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#Price').css('border-color', 'lightgrey');
    }

    return isValid;
}

function clearTextBox() {
    $('#HdnCartId').val("");
    $('#ProductId').val("");
    $('#CustomerId').val("");
    $('#CategoryId').val("");
    $('#SubCategoryId').val("");
    $('#Date').val("");
    $('#Quantity').val("");
    $('#Price').val("");

    $('#btnUpdate').hide();
    $('#btnAdd').show();


    $('#ProductId').css('border-color', 'lightgrey');
    $('#CustomerId').css('border-color', 'lightgrey');
    $('#CategoryId').css('border-color', 'lightgrey');
    $('#SubCategoryId').css('border-color', 'lightgrey');
    $('#Date').css('border-color', 'lightgrey');
    $('#Quantity').css('border-color', 'lightgrey');
    $('#Price').css('border-color', 'lightgrey');
}




