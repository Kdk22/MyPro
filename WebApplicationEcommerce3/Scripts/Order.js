$(document).ready(function () {
    loadData();
    $("#btnAdd").click(function (e) {
        Add();
    });
});

//Load Data function

function loadData() {
    $.ajax({
        url: "/Order/List",
        type: "POST",
        //contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            console.log(result);
            console.log("here");
            var html = '';
            var sno = 1;
            html = "<colgroup><col width='5%'/><col width='0%'/><col width='0%'/></colgroup><thead><tr><th> S.N. </th><th> OrderId </th><<th> CustomerId </th><th> AddressId </th><th> DeliveryCharge </th><th> Discount </th><th> TaxAmount </th><th> NetAmount </th><th> OrderDate </th><th> </th><th> </th></tr></thead>";
            html += "<tbody>";
            $.each(result, function (key, item) {
                html += '<tr>';
                html += "<td>" + sno++ + ".</td>";
                html += '<td> ' + item.OrderId + '</td> ';
                html += '<td> ' + item.CustomerId + '</td> ';
                html += '<td> ' + item.AddressId + '</td> ';
                html += '<td> ' + item.DeliveryCharge + '</td> ';
                html += '<td> ' + item.Discount + '</td> ';
                html += '<td> ' + item.TaxAmount + '</td> ';
                html += '<td> ' + item.NetAmount + '</td> ';
                html += '<td> ' + item.OrderDate + '</td> ';
                html += '<td><a href="#" onclick="return GetbyID(' + item.OrderId + ')">Edit</a> | <a href="#" onclick="Delele(' + item.OrderId + ')">Delete</a></td>';
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
    var OrderObj = {
        CustomerId: $('#CustomerId').val(),
        AddressId: $('#AddressId').val(),
        DeliveryCharge: $('#DeliveryCharge').val(),
        Discount: $('#Discount').val(),
        TaxAmount: $('#TaxAmount').val(),
        NetAmount: $('#NetAmount').val(),
        OrderDate: $('#OrderDate').val()
    };
    console.log(OrderObj);
    $.ajax({
        url: "/Order/Add",
        data: JSON.stringify(OrderObj),
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
function GetbyID(OrderId) {
    $('#HdnOrderId').css('border-color', 'lightgrey');
    $('#CustomerId').css('border-color', 'lightgrey');
    $('#AddressId').css('border-color', 'lightgrey');
    $('#DeliveryCharge').css('border-color', 'lightgrey');
    $('#Discount').css('border-color', 'lightgrey');
    $('#TaxAmount').css('border-color', 'lightgrey');
    $('#NetAmount').css('border-color', 'lightgrey');
    $('#OrderDate').css('border-color', 'lightgrey');
    console.log(OrderId);
    var url = "/Order/GetbyID?OrderId=" + OrderId;
    $.ajax({
        url: url,
        type: "GET",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            $('#HdnOrderId').val(result.OrderId);
            $('#CustomerId').val(result.CustomerId);
            $('#AddressId').val(result.AddressId);
            $('#DeliveryCharge').val(result.DeliveryCharge);
            $('#Discount').val(result.Discount);
            $('#TaxAmount').val(result.TaxAmount);
            $('#NetAmount').val(result.NetAmount);
            $('#OrderDate').val(result.OrderDate);

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
    var OrderObj = {
        OrderId: $('#HdnOrderId').val(),
        CustomerId: $('#CustomerId').val(),
        AddressId: $('#AddressId').val(),
        DeliveryCharge: $('#DeliveryCharge').val(),
        Discount: $('#Discount').val(),
        TaxAmount: $('#TaxAmount').val(),
        NetAmount: $('#NetAmount').val(),
        OrderDate: $('#OrderDate').val(),
    };
    console.log(OrderObj);
    var url = "/Order/Update?OrderId=" + OrderObj.OrderId;
    $.ajax({
        url: url,
        data: JSON.stringify(OrderObj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            loadData();
            $('#myModal').modal('hide');
            $('#HdnOrderId').val("");
            $('#CustomerId').val("");
            $('#AddressId').val("");
            $('#DeliveryCharge').val("");
            $('#Discount').val("");
            $('#TaxAmount').val("");
            $('#NetAmount').val("");
            $('#OrderDate').val("");

        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}

function Delele(OrderId) {
    var ans = confirm("Are you sure you want to delete this Record?");
    var url = "/Order/Delete?OrderId=" + OrderId;
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
    var OrderObj = {
        OrderDate: $('#SearchTxt').val()
    }
    if (inp.val().length > 0) {
        $.ajax({
            url: "/Order/Search",
            data: JSON.stringify(OrderObj),
            type: "POST",
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            success: function (result) {
                console.log("here");
                var html = '';
                var sno = 1;
                html = "<colgroup><col width='5%'/><col width='0%'/><col width='0%'/></colgroup><thead><tr><th> S.N. </th><th> OrderId </th><<th> CustomerId </th><th> AddressId </th><th> DeliveryCharge </th><th> Discount </th><th> TaxAmount </th><th> NetAmount </th><th> OrderDate </th><th> </th><th> </th></tr></thead>";
                html += "<tbody>";
                $.each(result, function (key, item) {
                    html += '<tr>';
                    html += "<td>" + sno++ + ".</td>";
                    html += '<td> ' + item.OrderId + '</td> ';
                    html += '<td> ' + item.CustomerId + '</td> ';
                    html += '<td> ' + item.AddressId + '</td> ';
                    html += '<td> ' + item.DeliveryCharge + '</td> ';
                    html += '<td> ' + item.Discount + '</td> ';
                    html += '<td> ' + item.TaxAmount + '</td> ';
                    html += '<td> ' + item.NetAmount + '</td> ';
                    html += '<td> ' + item.OrderDate + '</td> ';
                    html += '<td><a href="#" onclick="return GetbyID(' + item.OrderId + ')">Edit</a> | <a href="#" onclick="Delele(' + item.OrderId + ')">Delete</a></td>';
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
    if ($('#CustomerId').val().trim() === "") {
        $('#CustomerId').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#CustomerId').css('border-color', 'lightgrey');
    }
    if ($('#AddressId').val().trim() === "") {
        $('#AddressId').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#AddressId').css('border-color', 'lightgrey');
    }
    if ($('#DeliveryCharge').val().trim() === "") {
        $('#DeliveryCharge').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#DeliveryCharge').css('border-color', 'lightgrey');
    }
    if ($('#Discount').val().trim() === "") {
        $('#Discount').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#Discount').css('border-color', 'lightgrey');
    }
    if ($('#TaxAmount').val().trim() === "") {
        $('#TaxAmount').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#TaxAmount').css('border-color', 'lightgrey');
    }
    if ($('#NetAmount').val().trim() === "") {
        $('#NetAmount').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#NetAmount').css('border-color', 'lightgrey');
    }
    if ($('#OrderDate').val().trim() === "") {
        $('#OrderDate').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#OrderDate').css('border-color', 'lightgrey');
    }

    return isValid;
}

function clearTextBox() {
    $('#HdnOrderId').val("");
    $('#CustomerId').val("");
    $('#AddressId').val("");
    $('#DeliveryCharge').val("");
    $('#Discount').val("");
    $('#TaxAmount').val("");
    $('#NetAmount').val("");
    $('#OrderDate').val("");

    $('#btnUpdate').hide();
    $('#btnAdd').show();

    $('#HdnOrderId').css('border-color', 'lightgrey');
    $('#CustomerId').css('border-color', 'lightgrey');
    $('#AddressId').css('border-color', 'lightgrey');
    $('#DeliveryCharge').css('border-color', 'lightgrey');
    $('#Discount').css('border-color', 'lightgrey');
    $('#TaxAmount').css('border-color', 'lightgrey');
    $('#NetAmount').css('border-color', 'lightgrey');
    $('#OrderDate').css('border-color', 'lightgrey');
}




