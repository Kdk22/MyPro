$(document).ready(function () {
    loadData();
    $("#btnAdd").click(function (e) {
        Add();
    });
});

//Load Data function

function loadData() {
    $.ajax({
        url: "/Products/List",
        type: "POST",
        //contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            console.log(result);
            console.log("here");
            var html = '';
            var sno = 1;
            html = "<colgroup><col width='5%'/><col width='0%'/><col width='0%'/></colgroup><thead><tr><th> S.N. </th><th> ProductId </th><<th> CategoryId </th><th> SubCategoryId </th><th> SupplierId </th><th> Product Name </th><th> Purchase Price </th><th> Sales Price </th><th> Quantity </th><th> ReorderLevel </th><th> Discount Available </th><th> Stock </th><th> Color </th><th> Size </th><th> Other1 </th><th> Other2 </th><th> Image </th><th> </th><th> </th></tr></thead>";
                html += "<tbody>";
            $.each(result, function (key, item) {
                html += '<tr>';
                html += "<td>" + sno++ + ".</td>";
                html += '<td> ' + item.ProductId + '</td> ';
                html += '<td> ' + item.CategoryId + '</td> ';
                html += '<td> ' + item.SubCategoryId + '</td> ';
                html += '<td> ' + item.SupplierId + '</td> ';
                html += '<td> ' + item.ProductName + '</td> ';
                html += '<td> ' + item.PurchasePrice + '</td> ';
                html += '<td> ' + item.SalesPrice + '</td> ';
                html += '<td> ' + item.Quantity + '</td> ';
                html += '<td> ' + item.ReorderLevel + '</td> ';
                html += '<td> ' + item.DiscountAvailable + '</td> ';
                html += '<td> ' + item.Stock + '</td> ';
                html += '<td> ' + item.Color + '</td> ';
                html += '<td> ' + item.Size + '</td> ';
                html += '<td>' + item.Other1 + '</td>';
                html += '<td>' + item.Other2 + '</td>';
                html += '<td> ' + item.Image + '</td> ';
                html += '<td><a href="#" onclick="return GetbyID(' + item.ProductId + ')">Edit</a> | <a href="#" onclick="Delele(' + item.ProductId + ')">Delete</a></td>';
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
    var ProductObj = {
        CategoryId: $('#CategoryId').val(),
        SubCategoryId: $('#SubCategoryId').val(),
        SupplierId: $('#SupplierId').val(),
        ProductName: $('#ProductName').val(),
        PurchasePrice: $('#PurchasePrice').val(),
        SalesPrice: $('#SalesPrice').val(),
        Quantity: $('#Quantity').val(),
        ReorderLevel: $('#ReorderLevel').val(),
        DiscountAvailable: $('#DiscountAvailable').val(),
        Stock: $('#Stock').val(),
        Color: $('#Color').val(),
        Size: $('#Size').val(),
        Other1: $('#Other1').val(),
        Other2: $('#Other2').val(),
        Image: $('#Image').val(),


    };
    console.log(ProductObj);
    $.ajax({
        url: "/Products/Add",
        data: JSON.stringify(ProductObj),
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
function GetbyID(ProductId) {
    $('#HdnProductId').css('border-color', 'lightgrey');
    $('#CategoryId').css('border-color', 'lightgrey');
    $('#SubCategoryId').css('border-color', 'lightgrey');
    $('#SupplierId').css('border-color', 'lightgrey');
    $('#ProductName').css('border-color', 'lightgrey');
    $('#PurchasePrice').css('border-color', 'lightgrey');
    $('#SalesPrice').css('border-color', 'lightgrey');
    $('#Quantity').css('border-color', 'lightgrey');
    $('#ReorderLevel').css('border-color', 'lightgrey');
    $('#DiscountAvailable').css('border-color', 'lightgrey');
    $('#Stock').css('border-color', 'lightgrey');
    $('#Color').css('border-color', 'lightgrey');
    $('#Size').css('border-color', 'lightgrey');
    $('#Other1').css('border-color', 'lightgrey');
    $('#Other2').css('border-color', 'lightgrey');
    $('#Image').css('border-color', 'lightgrey');
    console.log(ProductId);
    var url = "/Products/GetbyID?ProductId=" + ProductId;
    $.ajax({
        url: url,
        type: "GET",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            $('#HdnProductId').val(result.ProductId);
            $('#CategoryId').val(result.CategoryId);
            $('#SubCategoryId').val(result.SubCategoryId);
            $('#SupplierId').val(result.SupplierId);
            $('#ProductName').val(result.ProductName);
            $('#PurchasePrice').val(result.PurchasePrice);
            $('#SalesPrice').val(result.SalesPrice);
            $('#Quantity').val(result.Quantity);
            $('#ReorderLevel').val(result.ReorderLevel);
            $('#DiscountAvailable').val(result.DiscountAvailable);
            $('#Stock').val(result.Stock);
            $('#Color').val(result.Color);
            $('#Size').val(result.Size);
            $('#Other1').val(result.Other1);
            $('#Other2').val(result.Other2);
            $('#Image').val(result.Image);
            

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
    var ProductObj = {
        ProductId: $('#HdnProductId').val(),
        CategoryId: $('#CategoryId').val(),
        SubCategoryId: $('#SubCategoryId').val(),
        SupplierId: $('#SupplierId').val(),
        ProductName: $('#ProductName').val(),
        PurchasePrice: $('#PurchasePrice').val(),
        SalesPrice: $('#SalesPrice').val(),
        Quantity: $('#Quantity').val(),
        ReorderLevel: $('#ReorderLevel').val(),
        DiscountAvailable: $('#DiscountAvailable').val(),
        Stock: $('#Stock').val(),
        Color: $('#Color').val(),
        Size: $('#Size').val(),
        Other1: $('#Other1').val(),
        Other2: $('#Other2').val(),
        Image: $('#Image').val(),
    };
    console.log(ProductObj);
    var url = "/Products/Update?ProductId=" + ProductObj.ProductId;
    $.ajax({
        url: url,
        data: JSON.stringify(ProductObj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            loadData();
            $('#myModal').modal('hide');
            $('#HdnProductId').val("");
            $('#CategoryId').val("");
            $('#SubCategoryId').val("");
            $('#SupplierId').val("");
            $('#ProductName').val("");
            $('#PurchasePrice').val("");
            $('#SalesPrice').val("");
            $('#Quantity').val("");
            $('#ReorderLevel').val("");
            $('#DiscountAvailable').val("");
            $('#Stock').val("");
            $('#Color').val("");
            $('#Size').val("");
            $('#Other1').val("");
            $('#Other2').val("");
            $('#Image').val("");

        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}

function Delele(ProductId) {
    var ans = confirm("Are you sure you want to delete this Record?");
    var url = "Products/Delete?ProductId=" + ProductId;
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
    var ProductObj = {
        ProductName: $('#SearchTxt').val()
    }
    if (inp.val().length > 0) {
        $.ajax({
            url: "/Products/Search",
            data: JSON.stringify(ProductObj),
            type: "POST",
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            success: function (result) {
                console.log("here");
                var html = '';
                var sno = 1;
                html = "<colgroup><col width='5%'/><col width='0%'/><col width='0%'/></colgroup><thead><tr><th> S.N. </th><th> ProductId </th><<th> CategoryId </th><th> SubCategoryId </th><th> SupplierId </th><th> Product Name </th><th> Purchase Price </th><th> Sales Price </th><th> Quantity </th><th> ReorderLevel </th><th> Discount Available </th><th> Stock </th><th> Color </th><th> Size </th><th> Other1 </th><th> Other2 </th><th> Image </th><th> </th><th> </th></tr></thead>";
                html += "<tbody>";
                $.each(result, function (key, item) {
                    html += '<tr>';
                    html += "<td>" + sno++ + ".</td>";
                    html += '<td> ' + item.ProductId + '</td> ';
                    html += '<td> ' + item.CategoryId + '</td> ';
                    html += '<td> ' + item.SubCategoryId + '</td> ';
                    html += '<td> ' + item.SupplierId + '</td> ';
                    html += '<td> ' + item.ProductName + '</td> ';
                    html += '<td> ' + item.PurchasePrice + '</td> ';
                    html += '<td> ' + item.SalesPrice + '</td> ';
                    html += '<td> ' + item.Quantity + '</td> ';
                    html += '<td> ' + item.ReorderLevel + '</td> ';
                    html += '<td> ' + item.DiscountAvailable + '</td> ';
                    html += '<td> ' + item.Stock + '</td> ';
                    html += '<td> ' + item.Color + '</td> ';
                    html += '<td> ' + item.Size + '</td> ';
                    html += '<td>' + item.Other1 + '</td>';
                    html += '<td>' + item.Other2 + '</td>';
                    html += '<td> ' + item.Image + '</td> ';
                    html += '<td><a href="#" onclick="return GetbyID(' + item.ProductId + ')">Edit</a> | <a href="#" onclick="Delele(' + item.ProductId + ')">Delete</a></td>';
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
    if ($('#SupplierId').val().trim() === "") {
        $('#SupplierId').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#SupplierId').css('border-color', 'lightgrey');
    }
    if ($('#ProductName').val().trim() === "") {
        $('#ProductName').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#ProductName').css('border-color', 'lightgrey');
    }
    if ($('#PurchasePrice').val().trim() === "") {
        $('#PurchasePrice').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#PurchasePrice').css('border-color', 'lightgrey');
    }
    if ($('#SalesPrice').val().trim() === "") {
        $('#SalesPrice').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#SalesPrice').css('border-color', 'lightgrey');
    }
    if ($('#Quantity').val().trim() === "") {
        $('#Quantity').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#Quantity').css('border-color', 'lightgrey');
    }
    if ($('#ReorderLevel').val().trim() === "") {
        $('#ReorderLevel').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#ReorderLevel').css('border-color', 'lightgrey');
    }
    if ($('#DiscountAvailable').val().trim() === "") {
        $('#DiscountAvailable').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#DiscountAvailable').css('border-color', 'lightgrey');
    }
    if ($('#Stock').val().trim() === "") {
        $('#Stock').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#Stock').css('border-color', 'lightgrey');
    }
    if ($('#Color').val().trim() === "") {
        $('#Color').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#Color').css('border-color', 'lightgrey');
    }
    if ($('#Size').val().trim() === "") {
        $('#Size').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#Size').css('border-color', 'lightgrey');
    }
    if ($('#Other1').val().trim() === "") {
        $('#Other1').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#Other1').css('border-color', 'lightgrey');
    }
    if ($('#Other2').val().trim() === "") {
        $('#Other2').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#Other2').css('border-color', 'lightgrey');
    }
    //if ($('#Image').val().trim() === "") {
    //    $('#Image').css('border-color', 'Red');
    //    isValid = false;
    //}
    //else {
    //    $('#Image').css('border-color', 'lightgrey');
    //}

    return isValid;
}

function clearTextBox() {
    $('#HdnProductId').val("");
    $('#CategoryId').val("");
    $('#SubCategoryId').val("");
    $('#SupplierId').val("");
    $('#ProductName').val("");
    $('#PurchasePrice').val("");
    $('#SalesPrice').val("");
    $('#Quantity').val("");
    $('#ReorderLevel').val("");
    $('#DiscountAvailable').val("");
    $('#Stock').val("");
    $('#Color').val("");
    $('#Size').val("");
    $('#Other1').val("");
    $('#Other2').val("");
    $('#Image').val("");

    $('#btnUpdate').hide();
    $('#btnAdd').show();

    $('#CategoryId').css('border-color', 'lightgrey');
    $('#SubCategoryId').css('border-color', 'lightgrey');
    $('#SupplierId').css('border-color', 'lightgrey');
    $('#ProductName').css('border-color', 'lightgrey');
    $('#PurchasePrice').css('border-color', 'lightgrey');
    $('#SalesPrice').css('border-color', 'lightgrey');
    $('#Quantity').css('border-color', 'lightgrey');
    $('#ReorderLevel').css('border-color', 'lightgrey');
    $('#DiscountAvailable').css('border-color', 'lightgrey');
    $('#Stock').css('border-color', 'lightgrey');
    $('#Color').css('border-color', 'lightgrey');
    $('#Size').css('border-color', 'lightgrey');
    $('#Other1').css('border-color', 'lightgrey');
    $('#Other2').css('border-color', 'lightgrey');
    $('#Image').css('border-color', 'lightgrey');
}




