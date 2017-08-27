$(document).ready(function () {
    loadData();
    $("#btnAdd").click(function (e) {
        Add();
    });
});

//Load Data function

function loadData() {
    $.ajax({
        url: "/OrderStatus/List",
        type: "POST",
        //contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            console.log(result);
            console.log("here");
            var html = '';
            var sno = 1;
            html = "<colgroup><col width='5%'/><col width='0%'/><col width='0%'/></colgroup><thead><tr><th> S.N. </th><th> StatusId </th><<th> OrderId </th><th> Order Status Name </th><th> Description </th><th> Active </th><th> </th><th> </th></tr></thead>";
            html += "<tbody>";
            $.each(result, function (key, item) {
                html += '<tr>';
                html += '<td>' + sno++ + '</td>';
                html += '<td>' + item.StatusId + '</td> ';
                html += '<td>' + item.OrderId + '</td>';
                html += '<td>' + item.OSName + '</td> ';
                html += '<td>' + item.Description + '</td> ';
                html += '<td>' + item.Active + '</td> ';

                html += '<td><a href="#" onclick="return GetbyID(' + item.StatusId + ')">Edit</a> | <a href="#" onclick="Delele(' + item.StatusId + ')">Delete</a></td>';
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
    var OrderStatusObj = {
        StatusId: $('#StatusId').val(),
        OrderId: $('#OrderId').val(),
        OSName: $('#OSName').val(),
        Description: $('#Description').val(),
        Active: $('#Active').val(),
    };
    console.log(OrderStatusObj);
    $.ajax({
        url: "/OrderStatus/Add",
        data: JSON.stringify(OrderStatusObj),
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
function GetbyID(StatusId) {
    $('#HdnStatusId').css('border-color', 'lightgrey');
    $('#OrderId').css('border-color', 'lightgrey');
    $('#OSName').css('border-color', 'lightgrey');
    $('#Description').css('border-color', 'lightgrey');
    $('#Active').css('border-color', 'lightgrey');

    console.log(StatusId);
    var url = "/OrderStatus/GetbyID?StatusId=" + StatusId;
    $.ajax({
        url: url,
        type: "GET",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            $('#HdnStatusId').val(result.StatusId);
            $('#OrderId').val(result.OrderId);
            $('#OSName').val(result.CustomerId);
            $('#Description').val(result.ProductId);
            $('#Active').val(result.InsertDate);

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
    var OrderStatusObj = {
        StatusId: $('#StatusId').val(),
        OrderId: $('#OrderId').val(),
        OSName: $('#OSName').val(),
        Description: $('#Description').val(),
        Active: $('#Active').val(),

    };
    console.log(OrderStatusObj);
    var url = "/OrderStatus/Update?StatusId=" + OrderStatusObj.StatusId;
    $.ajax({
        url: url,
        data: JSON.stringify(OrderStatusObj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            loadData();
            $('#myModal').modal('hide');
            $('#HdnStatusId').val("");
            $('#OSName').val("");
            $('#Description').val("");
            $('#Active').val("");



        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}

function Delete(StatusId) {
    var ans = confirm("Are you sure you want to delete this Record?");
    var url = "/OrderStatus/Delete?StatusId=" + StatusId;
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
    var OrderStatusObj = {
        OSName: $('#SearchTxt').val()
    }
    if (inp.val().length > 0) {
        $.ajax({
            url: "/OrderStatus/Search",
            data: JSON.stringify(OrderStatusObj),
            type: "POST",
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            success: function (result) {
                console.log("here");
                var html = '';
                var sno = 1;
                html = "<colgroup><col width='5%'/><col width='0%'/><col width='0%'/></colgroup><thead><tr><th> S.N. </th><th> StatusId </th><<th> Order Id </th><th> Order Status Name </th><th> Description </th><th> Active </th><th> </th><th> </th></tr></thead>";
                html += "<tbody>";
                $.each(result, function (key, item) {
                    html += '<tr>';
                    html += "<td>" + sno++ + ".</td>";
                    html += '<td> ' + item.StatusId + '</td> ';
                    html += '<td> ' + item.OrderId + '</td> ';
                    html += '<td> ' + item.OSName + '</td> ';
                    html += '<td> ' + item.Description + '</td> ';
                    html += '<td> ' + item.Active + '</td> ';
                    html += '<td><a href="#" onclick="return GetbyID(' + item.StatusId + ')">Edit</a> | <a href="#" onclick="Delele(' + item.StatusId + ')">Delete</a></td>';
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
    if ($('#OSName').val().trim() === "") {
        $('#OSName').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#OSName').css('border-color', 'lightgrey');
    }
    if ($('#Description').val().trim() === "") {
        $('#Description').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#Description').css('border-color', 'lightgrey');
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

    $('#HdnStatusId').val("");
    $('#Name').val("");
    $('#Description').val("");
    $('#Active').val("");

    $('#btnUpdate').hide();
    $('#btnAdd').show();

    $('#Name').css('border-color', 'lightgrey');
    $('#Description').css('border-color', 'lightgrey');
    $('#Active').css('border-color', 'lightgrey');
}




