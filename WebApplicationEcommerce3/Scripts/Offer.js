$(document).ready(function () {
    loadData();
    $("#btnAdd").click(function (e) {
        Add();
    });
});

//Load Data function

function loadData() {
    $.ajax({
        url: "/Offer/List",
        type: "POST",
        //contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            console.log(result);
            console.log("here");
            var html = '';
            var sno = 1;
            html = "<colgroup><col width='5%'/><col width='0%'/><col width='0%'/></colgroup><thead><tr><th> S.N. </th><th> OfferId </th><<th> ProductId </th><th> Description </th><th> Active </th><th> OfferPrice </th><th> OfferStartDate </th><th> OfferEndDate </th><th> Remaining </th><th> </th><th> </th></tr></thead>";
            html += "<tbody>";
            $.each(result, function (key, item) {
                html += '<tr>';
                html += "<td>" + sno++ + ".</td>";
                html += '<td> ' + item.OfferId + '</td> ';
                html += '<td> ' + item.ProductId + '</td> ';
                html += '<td> ' + item.Description + '</td> ';
                html += '<td> ' + item.Active + '</td> ';
                html += '<td> ' + item.OfferPrice + '</td> ';
                html += '<td> ' + item.OfferStartDate + '</td> ';
                html += '<td> ' + item.OfferEndDate + '</td> ';
                html += '<td> ' + item.Remaining + '</td> ';
                html += '<td><a href="#" onclick="return GetbyID(' + item.OfferId + ')">Edit</a> | <a href="#" onclick="Delele(' + item.OfferId + ')">Delete</a></td>';
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
    var OfferObj = {
        OfferId: $('#OfferId').val(),
        ProductId: $('#ProductId').val(),
        OfferPrice: $('#OfferPrice').val(),
        Description: $('#Description').val(),
        Active: $('#Active').val(),
        OfferStartDate: $('#OfferStartDate').val(),
        OfferEndDate: $('#OfferEndDate').val(),
        Remining: $('#Remaining').val()
    };
    console.log(OfferObj);
    $.ajax({
        url: "/Offer/Add",
        data: JSON.stringify(OfferObj),
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
function GetbyID(OfferId) {
    $('#HdnOfferId').css('border-color', 'lightgrey');
    $('#ProductId').css('border-color', 'lightgrey');
    $('#Description').css('border-color', 'lightgrey');
    $('#Active').css('border-color', 'lightgrey');
    $('#OfferPrice').css('border-color', 'lightgrey');
    $('#OfferStartDate').css('border-color', 'lightgrey');
    $('#OfferEndDate').css('border-color', 'lightgrey');
    $('#Remaining').css('border-color', 'lightgrey');
    console.log(OfferId);
    var url = "/Offer/GetbyID?OfferId=" + OfferId;
    $.ajax({
        url: url,
        type: "GET",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            $('#HdnOfferId').val(result.OfferId);
            $('#ProductId').val(result.ProductId);
            $('#Description').val(result.Description);
            $('#Active').val(result.Active);
            $('#OfferPrice').val(result.OfferPrice);
            $('#OfferStartDate').val(result.OfferStartDate);
            $('#OfferEndDate').val(result.OfferEndDate);
            $('#Remaining').val(result.OfferEndDate);

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
    var OfferObj = {
        OfferId: $('#OfferId').val(),
        ProductId: $('#ProductId').val(),
        OfferPrice: $('#OfferPrice').val(),
        Description: $('#Description').val(),
        Active: $('#Active').val(),
        OfferStartDate: $('#OfferStartDate').val(),
        OfferEndDate: $('#OfferEndDate').val(),
        Remining: $('#Remaining').val()
    };
    console.log(OfferObj);
    var url = "/Offer/Update?OfferId=" + OfferObj.OfferId;
    $.ajax({
        url: url,
        data: JSON.stringify(OfferObj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            loadData();
            $('#myModal').modal('hide');
            $('#HdnOfferId').val("");
            $('#ProdcutId').val("");
            $('#Description').val("");
            $('#Active').val("");
            $('#OfferPrice').val("");
            $('#OfferStartDate').val("");
            $('#OfferEndDate').val("");
            $('#Remaining').val("");

        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}

function Delele(OfferId) {
    var ans = confirm("Are you sure you want to delete this Record?");
    var url = "/Offer/Delete?OfferId=" + OfferId;
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
    var OfferObj = {
        OfferStartDate: $('#SearchTxt').val()
    }
    if (inp.val().length > 0) {
        $.ajax({
            url: "/Offer/Search",
            data: JSON.stringify(OfferObj),
            type: "POST",
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            success: function (result) {
                console.log("here");
                var html = '';
                var sno = 1;
                html = "<colgroup><col width='5%'/><col width='0%'/><col width='0%'/></colgroup><thead><tr><th> S.N. </th><th> OfferId </th><<th> ProductId </th><th> Description </th><th> Active </th><th> OfferPrice </th><th> OfferStartDate </th><th> OfferEndDate </th><th> Remaining </th><th> </th><th> </th></tr></thead>";
                html += "<tbody>";
                $.each(result, function (key, item) {
                    html += '<tr>';
                    html += "<td>" + sno++ + ".</td>";
                    html += '<td> ' + item.OfferId + '</td>';
                    html += '<td> ' + item.ProductId + '</td>';
                    html += '<td> ' + item.Description + '</td>';
                    html += '<td> ' + item.Active + '</td>';
                    html += '<td> ' + item.OfferPrice + '</td> ';
                    html += '<td> ' + item.OfferStartDate + '</td>';
                    html += '<td> ' + item.OfferEndDate + '</td>';
                    html += '<td> ' + item.Remaining + '</td>';
                    html += '<td><a href="#" onclick="return GetbyID(' + item.OfferId + ')">Edit</a> | <a href="#" onclick="Delele(' + item.OfferId + ')">Delete</a></td>';
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
    if ($('#OfferPrice').val().trim() === "") {
        $('#OfferPrice').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#OfferPrice').css('border-color', 'lightgrey');
    }
    
    if ($('#OfferStartDate').val().trim() === "") {
        $('#OfferStartDate').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#OfferStartDate').css('border-color', 'lightgrey');
    }
    if ($('#OfferEndDate').val().trim() === "") {
        $('#OfferEndDate').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#OfferEndDate').css('border-color', 'lightgrey');
    }
    if ($('#Remaining').val().trim() === "") {
        $('#Remaining').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#Remaining').css('border-color', 'lightgrey');
    }

    return isValid;
}

function clearTextBox() {
    $('#HdnOfferId').val("");
    $('#ProdcutId').val("");
    $('#Description').val("");
    $('#Active').val("");
    $('#OfferPrice').val("");
    $('#OfferStartDate').val("");
    $('#OfferEndDate').val("");
    $('#Remaining').val("");

    $('#btnUpdate').hide();
    $('#btnAdd').show();

    $('#ProdcutId').val("");
    $('#Description').val("");
    $('#Active').val("");
    $('#OfferPrice').val("");
    $('#OfferStartDate').val("");
    $('#OfferEndDate').val("");
    $('#Remaining').val("");

    $('#HdnOfferId').css('border-color', 'lightgrey');
    $('#ProductId').css('border-color', 'lightgrey');
    $('#Description').css('border-color', 'lightgrey');
    $('#Active').css('border-color', 'lightgrey');
    $('#OfferStartDate').css('border-color', 'lightgrey');
    $('#OfferEndDate').css('border-color', 'lightgrey');
    $('#Remaining').css('border-color', 'lightgrey');
}




