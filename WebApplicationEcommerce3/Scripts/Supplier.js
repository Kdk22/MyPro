$(document).ready(function () {
    loadData();
    $("#btnAdd").click(function (e) {
        Add();
    });
});

//Load Data function

function loadData() {
    $.ajax({
        url: "/Supplier/List",
        type: "POST",
        //contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            console.log(result);
            console.log("here");
            var html = '';
            var sno = 1;
            html = "<colgroup><col width='5%'/><col width='0%'/><col width='0%'/></colgroup><thead><tr><th> S.N. </th><th> SupplierId </th><<th> Company Name </th><th> ContactNo1 </th><th> ContactNo2 </th><th> Email Id </th><th> Address1 </th><th> Address2 </th><th> City </th><th> State </th><th> Country </th><th> DiscountType </th><th> GoodsType </th><th> DiscountAmount </th><th> CurrentOrder </th><th> PaymentMethod </th><th> AccountNumber </th><th> </th><th> </th></tr></thead>";
            html += "<tbody>";
            $.each(result, function (key, item) {
                html += '<tr>';
                html += "<td>" + sno++ + ".</td>";
                html += '<td> ' + item.SupplierId + '</td> ';
                html += '<td> ' + item.CompanyName + '</td> ';
                html += '<td> ' + item.ContactNo1 + '</td> ';
                html += '<td> ' + item.ContactNo2 + '</td> ';
                html += '<td> ' + item.EmailId + '</td> ';
                html += '<td> ' + item.Address1 + '</td> ';
                html += '<td> ' + item.Address2 + '</td> ';
                html += '<td> ' + item.City + '</td> ';
                html += '<td> ' + item.State + '</td> ';
                html += '<td> ' + item.Country + '</td> ';
                html += '<td> ' + item.DiscountType + '</td> ';
                html += '<td> ' + item.GoodsType + '</td> ';
                html += '<td> ' + item.DiscountAmount + '</td> ';
                html += '<td>' + item.CurrentOrder + '</td>';
                html += '<td>' + item.PaymentMethod + '</td>';
                html += '<td> ' + item.AccountNumber + '</td> ';
                html += '<td><a href="#" onclick="return GetbyID(' + item.SupplierId + ')">Edit</a> | <a href="#" onclick="Delele(' + item.SupplierId + ')">Delete</a></td>';
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
    var SupplierObj = {
        CompanyName: $('#CompanyName').val(),
        ContactNo1: $('#ContactNo1').val(),
        ContactNo2: $('#ContactNo2').val(),
        EmailId: $('#EmailId').val(),
        Address1: $('#Address1').val(),
        Address2: $('#Address2').val(),
        City: $('#City').val(),
        State: $('#State').val(),
        Country: $('#Country').val(),
        DiscountType: $('#DiscountType').val(),
        GoodsType: $('#GoodsType').val(),
        DiscountAmount: $('#DiscountAmount').val(),
        CurrentOrder: $('#CurrentOrder').val(),
        PaymentMethod: $('#PaymentMethod').val(),
        AccountNumber: $('#AccountNumber').val()
    };
    console.log(SupplierObj);
    $.ajax({
        url: "/Supplier/Add",
        data: JSON.stringify(SupplierObj),
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
function GetbyID(SupplierId) {
    $('#HdnSupplierId').css('border-color', 'lightgrey');
    $('#CompanyName').css('border-color', 'lightgrey');
    $('#ContactNo1').css('border-color', 'lightgrey');
    $('#ContactNo2').css('border-color', 'lightgrey');
    $('#EmailId').css('border-color', 'lightgrey');
    $('#Address1').css('border-color', 'lightgrey');
    $('#Address2').css('border-color', 'lightgrey');
    $('#City').css('border-color', 'lightgrey');
    $('#State').css('border-color', 'lightgrey');
    $('#Country').css('border-color', 'lightgrey');
    $('#DiscountType').css('border-color', 'lightgrey');
    $('#GoodsType').css('border-color', 'lightgrey');
    $('#DiscountAmount').css('border-color', 'lightgrey');
    $('#CurrentOrder').css('border-color', 'lightgrey');
    $('#PaymentMethod').css('border-color', 'lightgrey');
    $('#AccountNumber').css('border-color', 'lightgrey');
    console.log(SupplierId);
    var url = "/Supplier/GetbyID?SupplierId=" + SupplierId;
    $.ajax({
        url: url,
        type: "GET",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            $('#HdnSupplierId').val(result.SupplierId);
            $('#CompanyName').val(result.CompanyName);
            $('#ContactNo1').val(result.ContactNo1);
            $('#ContactNo2').val(result.ContactNo2);
            $('#EmailId').val(result.EmailId);
            $('#Address1').val(result.Address1);
            $('#Address2').val(result.Address2);
            $('#City').val(result.City);
            $('#State').val(result.State);
            $('#Country').val(result.Country);
            $('#DiscountType').val(result.DiscountType);
            $('#GoodsType').val(result.GoodsType);
            $('#DiscountAmount').val(result.DiscountAmount);
            $('#CurrentOrder').val(result.CurrentOrder);
            $('#PaymentMethod').val(result.PaymentMethod);
            $('#AccountNumber').val(result.AccountNumber);


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
    var SupplierObj = {
        SupplierId: $('#HdnSupplierId').val(),
        CompanyName: $('#CompanyName').val(),
        ContactNo1: $('#ContactNo1').val(),
        ContactNo2: $('#ContactNo2').val(),
        EmailId: $('#EmailId').val(),
        Address1: $('#Address1').val(),
        Address2: $('#Address2').val(),
        City: $('#City').val(),
        State: $('#State').val(),
        Country: $('#Country').val(),
        DiscountType: $('#DiscountType').val(),
        GoodsType: $('#GoodsType').val(),
        DiscountAmount: $('#DiscountAmount').val(),
        CurrentOrder: $('#CurrentOrder').val(),
        PaymentMethod: $('#PaymentMethod').val(),
        AccountNumber: $('#AccountNumber').val(),
    };
    console.log(SupplierObj);
    var url = "/Supplier/Update?SupplierId=" + SupplierObj.SupplierId;
    $.ajax({
        url: url,
        data: JSON.stringify(SupplierObj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            loadData();
            $('#myModal').modal('hide');
            $('#HdnSupplierId').val("");
            $('#CompanyName').val("");
            $('#ContactNo1').val("");
            $('#ContactNo2').val("");
            $('#EmailId').val("");
            $('#Address1').val("");
            $('#Address2').val("");
            $('#City').val("");
            $('#State').val("");
            $('#Country').val("");
            $('#DiscountType').val("");
            $('#GoodsType').val("");
            $('#DiscountAmount').val("");
            $('#CurrentOrder').val("");
            $('#PaymentMethod').val("");
            $('#AccountNumber').val("");

        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}

function Delele(SupplierId) {
    var ans = confirm("Are you sure you want to delete this Record?");
    var url = "/Supplier/Delete?SupplierId=" + SupplierId;
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
function SearchByName()
{
    var inp = $("#SearchTxt");
    var SupplierObj = {
        CompanyName: $('#SearchTxt').val()
    }
    if (inp.val().length > 0) {
        $.ajax({
            url: "/Supplier/Search",
            data: JSON.stringify(SupplierObj),
            type: "POST",
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            success: function (result) {
                console.log("here");
                var html = '';
                var sno = 1;
                html = "<colgroup><col width='5%'/><col width='0%'/><col width='0%'/></colgroup><thead><tr><th> S.N. </th><th> SupplierId </th><<th> Company Name </th><th> ContactNo1 </th><th> ContactNo2 </th><th> Email Id </th><th> Address1 </th><th> Address2 </th><th> City </th><th> State </th><th> Country </th><th> DiscountType </th><th> GoodsType </th><th> DiscountAmount </th><th> CurrentOrder </th><th> PaymentMethod </th><th> AccountNumber </th><th> </th><th> </th></tr></thead>";
                html += "<tbody>";
                $.each(result, function (key, item) {
                    html += '<tr>';
                    html += "<td>" + sno++ + ".</td>";
                    html += '<td> ' + item.SupplierId + '</td> ';
                    html += '<td> ' + item.CompanyName + '</td> ';
                    html += '<td> ' + item.ContactNo1 + '</td> ';
                    html += '<td> ' + item.ContactNo2 + '</td> ';
                    html += '<td> ' + item.EmailId + '</td> ';
                    html += '<td> ' + item.Address1 + '</td> ';
                    html += '<td> ' + item.Address2 + '</td> ';
                    html += '<td> ' + item.City + '</td> ';
                    html += '<td> ' + item.State + '</td> ';
                    html += '<td> ' + item.Country + '</td> ';
                    html += '<td> ' + item.DiscountType + '</td> ';
                    html += '<td> ' + item.GoodsType + '</td> ';
                    html += '<td> ' + item.DiscountAmount + '</td> ';
                    html += '<td>' + item.CurrentOrder + '</td>';
                    html += '<td>' + item.PaymentMethod + '</td>';
                    html += '<td> ' + item.AccountNumber + '</td> ';
                    html += '<td><a href="#" onclick="return GetbyID(' + item.SupplierId + ')">Edit</a> | <a href="#" onclick="Delele(' + item.SupplierId + ')">Delete</a></td>';
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
    if ($('#CompanyName').val().trim() === "") {
        $('#CompanyName').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#CompanyName').css('border-color', 'lightgrey');
    }
    if ($('#ContactNo1').val().trim() === "") {
        $('#ContactNo1').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#ContactNo1').css('border-color', 'lightgrey');
    }
    if ($('#ContactNo2').val().trim() === "") {
        $('#ContactNo2').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#ContactNo2').css('border-color', 'lightgrey');
    }
    if ($('#EmailId').val().trim() === "") {
        $('#EmailId').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#EmailId').css('border-color', 'lightgrey');
    }
    if ($('#Address1').val().trim() === "") {
        $('#Address1').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#Address1').css('border-color', 'lightgrey');
    }
    if ($('#Address2').val().trim() === "") {
        $('#Address2').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#Address2').css('border-color', 'lightgrey');
    }
    if ($('#City').val().trim() === "") {
        $('#City').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#City').css('border-color', 'lightgrey');
    }
    if ($('#State').val().trim() === "") {
        $('#State').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#State').css('border-color', 'lightgrey');
    }
    if ($('#Country').val().trim() === "") {
        $('#Country').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#Country').css('border-color', 'lightgrey');
    }
    if ($('#DiscountType').val().trim() === "") {
        $('#DiscountType').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#DiscountType').css('border-color', 'lightgrey');
    }
    if ($('#GoodsType').val().trim() === "") {
        $('#GoodsType').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#GoodsType').css('border-color', 'lightgrey');
    }
    if ($('#DiscountAmount').val().trim() === "") {
        $('#DiscountAmount').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#DiscountAmount').css('border-color', 'lightgrey');
    }
    if ($('#CurrentOrder').val().trim() === "") {
        $('#CurrentOrder').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#CurrentOrder').css('border-color', 'lightgrey');
    }
    if ($('#PaymentMethod').val().trim() === "") {
        $('#PaymentMethod').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#PaymentMethod').css('border-color', 'lightgrey');
    }
    if ($('#AccountNumber').val().trim() === "") {
        $('#AccountNumber').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#AccountNumber').css('border-color', 'lightgrey');
    }

    return isValid;
}

function clearTextBox() {
    $('#HdnSupplierId').val("");
    $('#CompanyName').val("");
    $('#ContactNo1').val("");
    $('#ContactNo2').val("");
    $('#EmailId').val("");
    $('#Address1').val("");
    $('#Address2').val("");
    $('#City').val("");
    $('#State').val("");
    $('#Country').val("");
    $('#DiscountType').val("");
    $('#GoodsType').val("");
    $('#DiscountAmount').val("");
    $('#CurrentOrder').val("");
    $('#PaymentMethod').val("");
    $('#AccountNumber').val("");

    $('#btnUpdate').hide();
    $('#btnAdd').show();

    $('#CompanyName').css('border-color', 'lightgrey');
    $('#ContactNo1').css('border-color', 'lightgrey');
    $('#ContactNo2').css('border-color', 'lightgrey');
    $('#EmailId').css('border-color', 'lightgrey');
    $('#Address1').css('border-color', 'lightgrey');
    $('#Address2').css('border-color', 'lightgrey');
    $('#City').css('border-color', 'lightgrey');
    $('#State').css('border-color', 'lightgrey');
    $('#Country').css('border-color', 'lightgrey');
    $('#DiscountType').css('border-color', 'lightgrey');
    $('#GoodsType').css('border-color', 'lightgrey');
    $('#DiscountAmount').css('border-color', 'lightgrey');
    $('#CurrentOrder').css('border-color', 'lightgrey');
    $('#PaymentMethod').css('border-color', 'lightgrey');
    $('#PaymentMethod').css('border-color', 'lightgrey');
    $('#AccountNumber').css('border-color', 'lightgrey');
}




