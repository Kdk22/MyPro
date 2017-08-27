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
            html = "<colgroup><col width='5%'/><col width='0%'/><col width='0%'/></colgroup><thead><tr><th> S.N. </th><th> ProductRatingId </th><<th> CustomerId </th><th> Name </th><th> ContactNo2 </th><th> Image </th><th> Description </th><th> Active </th><th> </th><th> </th></tr></thead>";
            html += "<tbody>";
            $.each(result, function (key, item) {
                html += '<tr>';
                html += "<td>" + sno++ + ".</td>";
                html += '<td> ' + item.ProductRatingId + '</td> ';
                html += '<td> ' + item.CustomerId + '</td> ';
                html += '<td> ' + item.Name + '</td> ';
                html += '<td> ' + item.Image + '</td> ';
                html += '<td> ' + item.Description + '</td> ';
                html += '<td> ' + item.Active + '</td> ';

                html += '<td><a href="#" onclick="return GetbyID(' + item.ProductRatingId + ')">Edit</a> | <a href="#" onclick="Delele(' + item.ProductRatingId + ')">Delete</a></td>';
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
    var ProductRatingObj = {
        CustomerId: $('#CustomerId').val(),
        Name: $('#Name').val(),
        Image: $('#Image').val(),
        Description: $('#Description').val(),
        Active: $('#Active').val(),

    };
    console.log(ProductRatingObj);
    $.ajax({
        url: "/Supplier/Add",
        data: JSON.stringify(ProductRatingObj),
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
function GetbyID(ProductRatingId) {
    $('#HdnProductRatingId').css('border-color', 'lightgrey');
    $('#CustomerId').css('border-color', 'lightgrey');
    $('#Name').css('border-color', 'lightgrey');
    $('#Image').css('border-color', 'lightgrey');
    $('#Description').css('border-color', 'lightgrey');
    $('#Active').css('border-color', 'lightgrey');

    console.log(ProductRatingId);
    var url = "/Supplier/GetbyID?ProductRatingId=" + ProductRatingId;
    $.ajax({
        url: url,
        type: "GET",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            $('#HdnProductRatingId').val(result.ProductRatingId);
            $('#CustomerId').val(result.CustomerId);
            $('#Name').val(result.Name);
            $('#Image').val(result.Image);
            $('#Description').val(result.Description);
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
    var ProductRatingObj = {
        ProductRatingId: $('#HdnProductRatingId').val(),
        CustomerId: $('#CustomerID').val(),
        Name: $('#Name').val(),
        Iamge: $('#Image').val(),
        Description: $('#Description').val(),
        Active: $('#Active').val(),
    };
    console.log(ProductRatingObj);
    var url = "/Supplier/Update?ProductRatingId=" + ProductRatingObj.ProductRatingId;
    $.ajax({
        url: url,
        data: JSON.stringify(ProductRatingObj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            loadData();
            $('#myModal').modal('hide');
            $('#HdnProductRatingId').val("");
            $('#CustomerId').val("");
            $('#Name').val("");
            $('#Image').val("");
            $('#Description').val("");
            $('#Active').val("");


        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}

function Delele(ProductRatingId) {
    var ans = confirm("Are you sure you want to delete this Record?");
    var url = "/Supplier/Delete?ProductRatingId=" + ProductRatingId;
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
    var ProductRatingObj = {
        Name: $('#SearchTxt').val()
    }
    if (inp.val().length > 0) {
        $.ajax({
            url: "/ProductRating/Search",
            data: JSON.stringify(ProductRatingObj),
            type: "POST",
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            success: function (result) {
                console.log("here");
                var html = '';
                var sno = 1;
                html = "<colgroup><col width='5%'/><col width='0%'/><col width='0%'/></colgroup><thead><tr><th> S.N. </th><th> ProductRatingId </th><<th> CustomerId </th><th> Name </th><th> Image </th><th> Description </th><th> Active </th><th> </th><th> </th></tr></thead>";
                html += "<tbody>";
                $.each(result, function (key, item) {
                    html += '<tr>';
                    html += "<td>" + sno++ + ".</td>";
                    html += '<td> ' + item.ProductRatingId + '</td> ';
                    html += '<td> ' + item.CustomerId + '</td> ';
                    html += '<td> ' + item.Name + '</td> ';
                    html += '<td> ' + item.Image + '</td> ';
                    html += '<td> ' + item.Description + '</td> ';
                    html += '<td> ' + item.Active + '</td> ';
                    html += '<td><a href="#" onclick="return GetbyID(' + item.ProductRatingId + ')">Edit</a> | <a href="#" onclick="Delele(' + item.ProductRatingId + ')">Delete</a></td>';
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
    if ($('#Name').val().trim() === "") {
        $('#Name').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#Name').css('border-color', 'lightgrey');
    }
    if ($('#Image').val().trim() === "") {
        $('#Image').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#Image').css('border-color', 'lightgrey');
    }
    if ($('#Desciption').val().trim() === "") {
        $('#Desciption').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#Desciption').css('border-color', 'lightgrey');
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
    $('#HdnProductRatingId').val("");
    $('#CustomerId').val("");
    $('#Name').val("");
    $('#Image').val("");
    $('#Description').val("");
    $('#Active').val("");

    $('#btnUpdate').hide();
    $('#btnAdd').show();


    $('#CustomerId').css('border-color', 'lightgrey');
    $('#Name').css('border-color', 'lightgrey');
    $('#Image').css('border-color', 'lightgrey');
    $('#Description').css('border-color', 'lightgrey');
    $('#Active').css('border-color', 'lightgrey');
}




