$(document).ready(function () {
    loadData();
    $("#btnAdd").click(function (e) {
        Add();
    });
});

//Load Data function

function loadData() {
    $.ajax({
        url: "/Category/List",
        type: "POST",
        //contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            console.log(result);
            console.log("here");
            var html = '';
            var sno = 1;
            html = "<colgroup><col width='5%'/><col width='0%'/><col width='0%'/></colgroup><thead><tr><th> S.N. </th><th> CategoryId</th><<th> SubCategoryId&nbsp </th><th> CategoryName&nbsp </th><th> Description </th><th> Image&nbsp </th><th> </th><th> </th></tr></thead>";
            html += "<tbody>";
            $.each(result, function (key, item) {
                html += '<tr>';
                html += "<td>" + sno++ + ".</td>";
                html += '<td> ' + item.CategoryId + '</td> ';
                html += '<td> ' + item.SubCategoryId + '</td> ';
                html += '<td> ' + item.CategoryName + '</td> ';
                html += '<td> ' + item.Description + '</td> ';
                html += '<td> ' + item.Image + '</td> ';
                html += '<td><a href="#" onclick="return GetbyID(' + item.CategoryId + ')">Edit</a> | <a href="#" onclick="Delele(' + item.CategoryId + ')">Delete</a></td>';
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
    var CategoryObj = {
        CategoryId: $('#CategoryId').val(),
        SubCategoryId: $('#SubCategoryId').val(),
        CategoryName: $('#CategoryName').val(),
        Description: $('#Description').val(),
        Image: $('#Image').val(),


    };
    console.log(CategoryObj);
    $.ajax({
        url: "/Category/Add",
        data: JSON.stringify(CategoryObj),
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
function GetbyID(CategoryId) {
    $('#HdnCategoryId').css('border-color', 'lightgrey');
    $('#SubCategoryId').css('border-color', 'lightgrey');
    $('#CategoryName').css('border-color', 'lightgrey');
    $('#Description').css('border-color', 'lightgrey');
    $('#Image').css('border-color', 'lightgrey');
    console.log(CategoryId);
    var url = "/Category/GetbyID?CategoryId=" + CategoryId;
    $.ajax({
        url: url,
        type: "GET",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            $('#HdnCategoryId').val(result.CategoryId);
            $('#SubCategoryId').val(result.SubCategoryId);
            $('#CategoryName').val(result.CategoryName);
            $('#Description').val(result.Description);
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
    var CategoryObj = {
        CategoryId: $('#HdnCategoryId').val(),
        SubCategoryId: $('#SubCategoryId').val(),
        CategoryName: $('#CategoryName').val(),
        Description: $('#Description').val(),
        Image: $('#Image').val(),
    };
    console.log(CategoryObj);
    var url = "/Category/Update?CategoryId=" + CategoryObj.CategoryId;
    $.ajax({
        url: url,
        data: JSON.stringify(CategoryObj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            loadData();
            $('#myModal').modal('hide');
            $('#HdnCategoryId').val("");
            $('#SubCategoryId').val("");
            $('#CategoryName').val("");
            $('#Description').val("");
            $('#Image').val("");

        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}

function Delele(CategoryId) {
    var ans = confirm("Are you sure you want to delete this Record?");
    var url = "/Category/Delete?CategoryId=" + CategoryId;
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
    var CategoryObj = {
        CategoryName: $('#SearchTxt').val()
    }
    if (inp.val().length > 0) {
        $.ajax({
            url: "/Category/Search",
            data: JSON.stringify(CategoryObj),
            type: "POST",
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            success: function (result) {
                console.log("here");
                var html = '';
                var sno = 1;
                html = "<colgroup><col width='5%'/><col width='0%'/><col width='0%'/></colgroup><thead><tr><th> S.N. </th><th> CategoryId &nbsp</th><<th> SubCategoryId&nbsp </th><th> CategoryName&nbsp </th><th> Description </th><th> Image </th><th> </th><th> </th></tr></thead>";
                html += "<tbody>";
                $.each(result, function (key, item) {
                    html += '<tr>';
                    html += "<td>" + sno++ + ".</td>";
                    html += '<td> ' + item.CategoryId + '</td> ';
                    html += '<td> ' + item.SubCategoryId + '</td> ';
                    html += '<td> ' + item.CategoryName + '</td> ';
                    html += '<td> ' + item.Description + '</td> ';
                    html += '<td> ' + item.Image + '</td> ';
                    html += '<td><a href="#" onclick="return GetbyID(' + item.CategoryId + ')">Edit</a> | <a href="#" onclick="Delele(' + item.CategoryId + ')">Delete</a></td>';
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
    if ($('#SubCategoryId').val().trim() === "") {
        $('#SubCategoryId').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#SubCategoryId').css('border-color', 'lightgrey');
    }
    if ($('#CategoryName').val().trim() === "") {
        $('#CategoryName').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#CategoryName').css('border-color', 'lightgrey');
    }
    if ($('#Description').val().trim() === "") {
        $('#Description').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#Description').css('border-color', 'lightgrey');
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
    $('#HdnCategoryId').val("");
    $('#SubCategoryId').val("");
    $('#CategoryName').val("");
    $('#Description').val("");
    $('#Image').val("");

    $('#btnUpdate').hide();
    $('#btnAdd').show();

    $('#HdnCategoryId').css('border-color', 'lightgrey');
    $('#SubCategoryId').css('border-color', 'lightgrey');
    $('#CategoryName').css('border-color', 'lightgrey');
    $('#Description').css('border-color', 'lightgrey');
    $('#Image').css('border-color', 'lightgrey');
}




