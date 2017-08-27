$(document).ready(function () {
    loadData();
    $("#btnAdd").click(function (e) {
        Add();
    });
});

//Load Data function

function loadData() {
    $.ajax({
        url: "/CustomerAccount/List",
        type: "POST",
        //contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            console.log(result);
            console.log("here");
            var html = '';
            var sno = 1;
            html = "<colgroup><col width='5%'/><col width='0%'/><col width='0%'/></colgroup><thead><tr><th> S.N. </th><th> CustomerAccountId </th><<th> CustomerId </th><th> Username </th><th> Password </th><th> HintQue </th><th> Answer </th><th> Active </th><th> </th><th> </th></tr></thead>";
            html += "<tbody>";
            $.each(result, function (key, item) {
                html += '<tr>';
                html += "<td>" + sno++ + ".</td>";
                html += '<td> ' + item.CustomerAccId + '</td> ';
                html += '<td> ' + item.CustomerId + '</td> ';
                html += '<td> ' + item.Username + '</td> ';
                html += '<td> ' + item.Password + '</td> ';
                html += '<td> ' + item.HintQue + '</td> ';
                html += '<td> ' + item.Answer + '</td> ';
                html += '<td> ' + item.Active + '</td> ';
                html += '<td><a href="#" onclick="return GetbyID(' + item.CustomerAccId + ')">Edit</a> | <a href="#" onclick="Delele(' + item.CustomerAccId + ')">Delete</a></td>';
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
    var CustomerAccountObj = {
        CustomerId: $('#CustomerId').val(),
        Username: $('#Username').val(),
        Password: $('#Password').val(),
        HintQue: $('#HintQue').val(),
        Answer: $('#Answer').val(),
        Active: $('#Active').val()
    };
    console.log(CustomerAccountObj);
    $.ajax({
        url: "/CustomerAccount/Add",
        data: JSON.stringify(CustomerAccountObj),
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
function GetbyID(CustomerAccId) {
    $('#HdnCustomerAccId').css('border-color', 'lightgrey');
    $('#CustomerId').css('border-color', 'lightgrey');
    $('#Username').css('border-color', 'lightgrey');
    $('#Password').css('border-color', 'lightgrey');
    $('#HintQue').css('border-color', 'lightgrey');
    $('#Answer').css('border-color', 'lightgrey');
    $('#Active').css('border-color', 'lightgrey');
    console.log(CustomerAccId);
    var url = "/CustomerAccount/GetbyID?CustomerAccId=" + CustomerAccId;
    $.ajax({
        url: url,
        type: "GET",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            $('#HdnCustomerAccId').val(result.CustomerAccId);
            $('#CustomerId').val(result.CustomerId);
            $('#Username').val(result.Username);
            $('#Password').val(result.Password);
            $('#HintQue').val(result.HintQue);
            $('#Answer').val(result.Answer);
            $('#Active').val(result.Active);

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
    var CustomerAccountObj = {
        CustomerAccId: $('#HdnCustomerAccId').val(),
        CustomerId: $('#CustomerId').val(),
        Username: $('#Username').val(),
        Password: $('#Password').val(),
        HintQue: $('#HintQue').val(),
        Answer: $('#Answer').val(),
        Active: $('#Active').val(),
    };
    console.log(CustomerAccountObj);

    var url = "/CustomerAccount/Update?CustomerAccId=" + CustomerAccountObj.CustomerAccId;
    $.ajax({
        url: url,
        data: JSON.stringify(CustomerAccountObj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            loadData();
            $('#myModal').modal('hide');
            $('#HdnCustomerAccId').val("");
            $('#CustomerId').val("");
            $('#Username').val("");
            $('#Password').val("");
            $('#HintQue').val("");
            $('#Answer').val("");
            $('#Active').val("");
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}

function Delele(CustomerAccId) {
    var ans = confirm("Are you sure you want to delete this Record?");
    var url = "/CustomerAccount/Delete?CustomerAccId=" + CustomerAccId;
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
    var CustomerAccountObj = {
        Username: $('#SearchTxt').val()
    }
    if (inp.val().length > 0) {
        $.ajax({
            url: "/CustomerAccount/Search",
            data: JSON.stringify(CustomerAccountObj),
            type: "POST",
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            success: function (result) {
                console.log("here");
                var html = '';
                var sno = 1;
                html = "<colgroup><col width='5%'/><col width='0%'/><col width='0%'/></colgroup><thead><tr><th> S.N. </th><th> CustomerAccId </th><<th> CustomerId </th><th> Username </th><th> Password </th><th> HintQue </th><th> Answer </th><th> Active </th><th> Description </th><th> </th><th> </th></tr></thead>";
                html += "<tbody>";
                $.each(result, function (key, item) {
                    html += '<tr>';
                    html += "<td>" + sno++ + ".</td>";
                    html += '<td> ' + item.CustomerAccId + '</td> ';
                    html += '<td> ' + item.CustomerId + '</td> ';
                    html += '<td> ' + item.Username + '</td> ';
                    html += '<td> ' + item.Password + '</td> ';
                    html += '<td> ' + item.HintQue + '</td> ';
                    html += '<td> ' + item.Answer + '</td> ';
                    html += '<td> ' + item.Active + '</td> ';
                    html += '<td><a href="#" onclick="return GetbyID(' + item.CustomerAccId + ')">Edit</a> | <a href="#" onclick="Delele(' + item.CustomerAccId + ')">Delete</a></td>';
                    html += '</tr > ';
                });
                $('.tbody').html(html);
                //  html += "</tbody>";
            },
        });
    }
}

function validate()
{
    var isValid = true;
    if ($('#CustomerId').val().trim() === "") {
        $('#CustomerId').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#CustomerId').css('border-color', 'lightgrey');
    }
    if ($('#Username').val().trim() === "") {
        $('#Username').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#Username').css('border-color', 'lightgrey');
    }
    if ($('#Password').val().trim() === "") {
        $('#Password').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#Password').css('border-color', 'lightgrey');
    }
    if ($('#HintQue').val().trim() === "") {
        $('#HintQue').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#HintQue').css('border-color', 'lightgrey');
    }
    if ($('#Answer').val().trim() === "") {
        $('#Answer').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#Answer').css('border-color', 'lightgrey');
    }
    if ($('#Active').val().trim() === "") {
        $('#Active').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#Active').css('border-color', 'lightgrey');
    }
    return isValid;
}

function clearTextBox() {
    $('#HdnCustomerAccId').val("");
    $('#CustomerId').val("");
    $('#Username').val("");
    $('#Password').val("");
    $('#HintQue').val("");
    $('#Answer').val("");
    $('#Active').val("");

    $('#btnUpdate').hide();
    $('#btnAdd').show();

    $('#CustomerId').css('border-color', 'lightgrey');
    $('#Username').css('border-color', 'lightgrey');
    $('#Password').css('border-color', 'lightgrey');
    $('#HintQue').css('border-color', 'lightgrey');
    $('#Answer').css('border-color', 'lightgrey');
    $('#Active').css('border-color', 'lightgrey');
}




