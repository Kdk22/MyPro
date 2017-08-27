$(document).ready(function () {
    loadData();
    $("#btnAdd").click(function (e) {
        Add();
    });
});

//Load Data function

function loadData() {
    $.ajax({
        url: "/Customers/List",
        type: "POST",
        //contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            console.log(result);
            console.log("here");
            var html = '';
            var sno = 1;
            html = "<colgroup><col width='5%'/><col width='0%'/><col width='0%'/></colgroup><thead><tr><th> S.N. </th><th> CustomersId </th><<th> AddressId </th><th> FirstName </th><th> MiddleName </th><th> LastName </th><th> MobileNo </th><th> Phone </th><th> Gender </th><th> EmailId </th><th> Description </th><th> </th><th> </th></tr></thead>";
            html += "<tbody>";
            $.each(result, function (key, item) {
                html += '<tr>';
                html += "<td>" + sno++ + ".</td>";
                html += '<td> ' + item.CustomerId + '</td> ';
                html += '<td> ' + item.AddressId + '</td> ';
                html += '<td> ' + item.FirstName + '</td> ';
                html += '<td> ' + item.MiddleName + '</td> ';
                html += '<td> ' + item.LastName + '</td> ';
                html += '<td> ' + item.MobileNo + '</td> ';
                html += '<td> ' + item.Phone + '</td> ';
                html += '<td> ' + item.Gender + '</td> ';
                html += '<td> ' + item.EmailId + '</td> ';
                html += '<td> ' + item.Description + '</td> ';
                html += '<td><a href="#" onclick="return GetbyID(' + item.CustomerId + ')">Edit</a> | <a href="#" onclick="Delele(' + item.CustomerId + ')">Delete</a></td>';
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
    var CustomersObj = {
        AddressId: $('#AddressId').val(),
        FirstName: $('#FirstName').val(),
        MiddleName: $('#MiddleName').val(),
        LastName: $('#LastName').val(),
        MobileNo: $('#MobileNo').val(),
        Phone: $('#Phone').val(),
        Gender: $('#Gender').val(),
        EmailId: $('#EmailId').val(),
        Description: $('#Description').val()
    };
    console.log(CustomersObj);
    console.log(CustomersObj.MobileNo);
    $.ajax({
        url: "/Customers/Add",
        data: JSON.stringify(CustomersObj),
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
function GetbyID(CustomerId) {
    $('#HdnCustomerId').css('border-color', 'lightgrey');
    $('#AddressId').css('border-color', 'lightgrey');
    $('#FirstName').css('border-color', 'lightgrey');
    $('#MiddleName').css('border-color', 'lightgrey');
    $('#LastName').css('border-color', 'lightgrey');
    $('#MobileNo').css('border-color', 'lightgrey');
    $('#Phone').css('border-color', 'lightgrey');
    $('#Gender').css('border-color', 'lightgrey');
    $('#EmailId').css('border-color', 'lightgrey');
    $('#Description').css('border-color', 'lightgrey');
    console.log(CustomerId);
    var url = "/Customers/GetbyID?CustomerId=" + CustomerId;
    $.ajax({
        url: url,
        type: "GET",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            $('#HdnCustomerId').val(result.CustomerId);
            $('#AddressId').val(result.AddressId);
            $('#FirstName').val(result.FirstName);
            $('#MiddleName').val(result.MiddleName);
            $('#LastName').val(result.LastName);
            $('#MobileNo').val(result.MobileNo);
            $('#Phone').val(result.Phone);
            $('#Gender').val(result.Gender);
            $('#EmailId').val(result.EmailId);
            $('#Description').val(result.Description);

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
    var CustomersObj = {
        CustomerId: $('#HdnCustomerId').val(),
        AddressId: $('#AddressId').val(),
        FirstName: $('#FirstName').val(),
        MiddleName: $('#MiddleName').val(),
        LastName: $('#LastName').val(),
        MobileNo: $('#MobileNo').val(),
        Phone: $('#Phone').val(),
        Gender: $('#Gender').val(),
        EmailId: $('#EmailId').val(),
        Description: $('#Description').val(),
    };
    console.log(CustomersObj);
    
    var url = "/Customers/Update?CustomerId=" + CustomersObj.CustomerId;
    $.ajax({
        url: url,
        data: JSON.stringify(CustomersObj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            loadData();
            $('#myModal').modal('hide');
            $('#HdnCustomerId').val("");
            $('#AddressId').val("");
            $('#FirstName').val("");
            $('#MiddleName').val("");
            $('#LastName').val("");
            $('#MobileNo').val("");
            $('#Phone').val("");
            $('#Gender').val("");
            $('#EmailId').val("");
            $('#Description').val("");
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}

function Delele(CustomerId) {
    var ans = confirm("Are you sure you want to delete this Record?");
    var url = "/Customers/Delete?CustomerId=" + CustomerId;
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
    var CustomersObj = {
        FirstName: $('#SearchTxt').val()
    }
    if (inp.val().length > 0) {
        $.ajax({
            url: "/Customers/Search",
            data: JSON.stringify(CustomersObj),
            type: "POST",
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            success: function (result) {
                console.log("here");
                var html = '';
                var sno = 1;
                html = "<colgroup><col width='5%'/><col width='0%'/><col width='0%'/></colgroup><thead><tr><th> S.N. </th><th> CustomerId </th><<th> AddressId </th><th> FirstName </th><th> MiddleName </th><th> LastName </th><th> MobileNo </th><th> Phone </th><th> Gender </th><th> EmailId </th><th> Description </th><th> </th><th> </th></tr></thead>";
                html += "<tbody>";
                $.each(result, function (key, item) {
                    html += '<tr>';
                    html += "<td>" + sno++ + ".</td>";
                    html += '<td> ' + item.CustomerId + '</td> ';
                    html += '<td> ' + item.AddressId + '</td> ';
                    html += '<td> ' + item.FirstName + '</td> ';
                    html += '<td> ' + item.MiddleName + '</td> ';
                    html += '<td> ' + item.LastName + '</td> ';
                    html += '<td> ' + item.MobileNo + '</td> ';
                    html += '<td> ' + item.Phone + '</td> ';
                    html += '<td> ' + item.Gender + '</td> ';
                    html += '<td> ' + item.EmailId + '</td> ';
                    html += '<td> ' + item.Description + '</td> ';
                    html += '<td><a href="#" onclick="return GetbyID(' + item.CustomerId + ')">Edit</a> | <a href="#" onclick="Delele(' + item.CustomerId + ')">Delete</a></td>';
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
    if ($('#AddressId').val().trim() === "") {
        $('#AddressId').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#AddressId').css('border-color', 'lightgrey');
    }
    if ($('#FirstName').val().trim() === "") {
        $('#FirstName').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#FirstName').css('border-color', 'lightgrey');
    }
    if ($('#MiddleName').val().trim() === "") {
        $('#MiddleName').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#MiddleName').css('border-color', 'lightgrey');
    }
    if ($('#LastName').val().trim() === "") {
        $('#LastName').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#LastName').css('border-color', 'lightgrey');
    }
    if ($('#MobileNo').val().trim() === "") {
        $('#MobileNo').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#MobileNo').css('border-color', 'lightgrey');
    }
    if ($('#Phone').val().trim() === "") {
        $('#Phone').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#Phone').css('border-color', 'lightgrey');
    }
    if ($('#Gender').val().trim() === "") {
        $('#Gender').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#Gender').css('border-color', 'lightgrey');
    }
    if ($('#EmailId').val().trim() === "") {
        $('#EmailId').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#EmailId').css('border-color', 'lightgrey');
    }
    if ($('#Description').val().trim() === "") {
        $('#Description').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#Description').css('border-color', 'lightgrey');
    }
    
    return isValid;
}

function clearTextBox() {
    $('#HdnCustomerId').val("");
    $('#AddressId').val("");
    $('#FirstName').val("");
    $('#MiddleName').val("");
    $('#LastName').val("");
    $('#MobileNo').val("");
    $('#Phone').val("");
    $('#Gender').val("");
    $('#EmailId').val("");
    $('#Description').val("");

    $('#btnUpdate').hide();
    $('#btnAdd').show();

    $('#AddressId').css('border-color', 'lightgrey');
    $('#FirstName').css('border-color', 'lightgrey');
    $('#MiddleName').css('border-color', 'lightgrey');
    $('#LastName').css('border-color', 'lightgrey');
    $('#MobileNo').css('border-color', 'lightgrey');
    $('#Phone').css('border-color', 'lightgrey');
    $('#Gender').css('border-color', 'lightgrey');
    $('#EmailId').css('border-color', 'lightgrey');
    $('#Description').css('border-color', 'lightgrey');
}




