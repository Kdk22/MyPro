$(document).ready(function () {
    loadData();
    $("#btnAdd").click(function (e) {
        Add();
    });
});

//Load Data function

function loadData() {
    $.ajax({
        url: "/OrderPayment/List",
        type: "POST",
        //contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            console.log(result);
            console.log("here");
            var html = '';
            var sno = 1;
            html = "<colgroup><col width='5%'/><col width='0%'/><col width='0%'/></colgroup><thead><tr><th> S.N. </th><th> OPId </th><<th> Company Name </th><th> ContactNo1 </th><th> ContactNo2 </th><th> Email Id </th><th> Address1 </th><th> Address2 </th><th> City </th><th> State </th><th> Country </th><th> DiscountType </th><th> GoodsType </th><th> DiscountAmount </th><th> CurrentOrder </th><th> PaymentMethod </th><th> AccountNumber </th><th> </th><th> </th></tr></thead>";
            html += "<tbody>";
            $.each(result, function (key, item) {
                html += '<tr>';
                html += "<td>" + sno++ + ".</td>";
                html += '<td> ' + item.OPId + '</td> ';
                html += '<td> ' + item.OrderId + '</td> ';
                html += '<td> ' + item.PaymentId + '</td> ';
                html += '<td> ' + item.PaymentType + '</td> ';
                html += '<td> ' + item.Status + '</td> ';

                html += '<td><a href="#" onclick="return GetbyID(' + item.OPId + ')">Edit</a> | <a href="#" onclick="Delele(' + item.OPId + ')">Delete</a></td>';
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
    var OrderPaymentObj = {
        OPId: $('#OPId').val(),
        OrderId: $('#OrderId').val(),
        PaymentId: $('#PaymentId').val(),
        PaymentType: $('#PaymentType').val(),
        Status: $('#Status').val(),

    };
    console.log(OrderPaymentObj);
    $.ajax({
        url: "/OrderPayment/Add",
        data: JSON.stringify(OrderPaymentObj),
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
function GetbyID(OPId) {
    $('#HdnOPId').css('border-color', 'lightgrey');
    $('#OrderId').css('border-color', 'lightgrey');
    $('#PaymentId').css('border-color', 'lightgrey');
    $('#PaymentType').css('border-color', 'lightgrey');
    $('#Status').css('border-color', 'lightgrey');

    console.log(OPId);
    var url = "/OrderPayment/GetbyID?OPId=" + OPId;
    $.ajax({
        url: url,
        type: "GET",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            $('#HdnOPId').val(result.OPId);
            $('#OrderId').val(result.OrderId);
            $('#PaymentId').val(result.PaymentId);
            $('#PaymentType').val(result.PaymentType);
            $('#Status').val(result.Status);

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
    var OrderPaymentObj = {
        OPId: $('#OPId').val(),
        OrderId: $('#OrderId').val(),
        PaymentId: $('#PaymentId').val(),
        PaymentType: $('#PaymentType').val()
        Status: $('#Status').val(),

    };
    console.log(OrderPaymentObj);
    var url = "/OrderPayment/Update?OPId=" + OrderPaymentObj.OPId;
    $.ajax({
        url: url,
        data: JSON.stringify(OrderPaymentObj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            loadData();
            $('#myModal').modal('hide');
            $('#HdnOPId').val("");
            $('#OrderId').val("");
            $('#PaymentId').val("");
            $('#PaymentType').val("");
            $('#Status').val("");



        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}

function Delete(OPId) {
    var ans = confirm("Are you sure you want to delete this Record?");
    var url = "/OrderPayment/Delete?OPId=" + OPId;
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
    var OrderPaymentObj = {
        Name: $('#SearchTxt').val()
    }
    if (inp.val().length > 0) {
        $.ajax({
            url: "/OrderPayment/Search",
            data: JSON.stringify(OrderPaymentObj),
            type: "POST",
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            success: function (result) {
                console.log("here");
                var html = '';
                var sno = 1;
                html = "<colgroup><col width='5%'/><col width='0%'/><col width='0%'/></colgroup><thead><tr><th> S.N. </th><th> OPId </th><<th> Company Name </th><th> ContactNo1 </th><th> ContactNo2 </th><th> Email Id </th><th> Address1 </th><th> Address2 </th><th> City </th><th> State </th><th> Country </th><th> DiscountType </th><th> GoodsType </th><th> DiscountAmount </th><th> CurrentOrder </th><th> PaymentMethod </th><th> AccountNumber </th><th> </th><th> </th></tr></thead>";
                html += "<tbody>";
                $.each(result, function (key, item) {
                    html += '<tr>';
                    html += "<td>" + sno++ + ".</td>";
                    html += '<td> ' + item.OPId + '</td> ';
                    html += '<td> ' + item.OrderId + '</td> ';
                    html += '<td> ' + item.PaymentId + '</td> ';
                    html += '<td> ' + item.PaymentType + '</td> ';
                    html += '<td> ' + item.Status + '</td> ';
                    html += '<td><a href="#" onclick="return GetbyID(' + item.OPId + ')">Edit</a> | <a href="#" onclick="Delele(' + item.OPId + ')">Delete</a></td>';
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
    if ($('#OrderId').val().trim() === "") {
        $('#OrderId').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#OrderId').css('border-color', 'lightgrey');
    }
    if ($('#PaymentId').val().trim() === "") {
        $('#PaymentId').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#PaymentId').css('border-color', 'lightgrey');
    }
    if ($('#PaymentType').val().trim() === "") {
        $('#PaymentType').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#PaymentType').css('border-color', 'lightgrey');
    }

    if ($('#Status').val().trim() === "") {
        $('#Status').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#Status').css('border-color', 'lightgrey');
    }


    return isValid;
}

function clearTextBox() {
 
    $('#HdnOPId').val("");
    $('#OrderId').val("");
    $('#PaymentId').val("");
    $('#PaymentType').val("");
    $('#Status').val("");

    $('#btnUpdate').hide();
    $('#btnAdd').show();

    $('#HdnOPId').css('border-color', 'lightgrey');
    $('#OrderId').css('border-color', 'lightgrey');
    $('#PaymentId').css('border-color', 'lightgrey');
    $('#PaymentType').css('border-color', 'lightgrey');
    $('#Status').css('border-color', 'lightgrey');
}




