$(document).ready(function () {
    loadData();
    $("#btnAdd").click(function (e) {
        Add();
    });
});

//Load Data function

function loadData() {
    $.ajax({
        url: "/SubCategory/List",
        type: "POST",
        //contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            console.log(result);
            console.log("here");
            var html = '';
            var sno = 1;
            html = "<colgroup><col width='5%'/><col width='0%'/><col width='0%'/></colgroup><thead><tr><th> S.N. </th><<th> SubCategoryId&nbsp </th><th> SubCategoryName&nbsp </th><th> Description </th><th> Image&nbsp </th><th> </th><th> </th></tr></thead>";
            html += "<tbody>";
            $.each(result, function (key, item) {
                html += '<tr>';
                html += "<td>" + sno++ + ".</td>";
                html += '<td> ' + item.SubCategoryId + '</td> ';
                html += '<td> ' + item.SubCatName + '</td> ';
                html += '<td> ' + item.Description + '</td> ';
                html += '<td> ' + item.Image + '</td> ';
                html += '<td><a href="#" onclick="return GetbyID(' + item.SubCategoryId + ')">Edit</a> | <a href="#" onclick="Delele(' + item.SubCategoryId + ')">Delete</a></td>';
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
    var SubCategoryObj = {
        SubCategoryId: $('#SubCategoryId').val(),
        SubCatName: $('#SubCatName').val(),
        Description: $('#Description').val(),
        Image: $('#Image').val(),


    };
    console.log(SubCategoryObj);
    $.ajax({
        url: "/SubCategory/Add",
        data: JSON.stringify(SubCategoryObj),
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
function GetbyID(SubCategoryId) {
    $('#HdnSubCategoryId').css('border-color', 'lightgrey');
    $('#SubCatName').css('border-color', 'lightgrey');
    $('#Description').css('border-color', 'lightgrey');
    $('#Image').css('border-color', 'lightgrey');
    console.log(SubCategoryId);
    var url = "/SubCategory/GetbyID?SubCategoryId=" + SubCategoryId;
    $.ajax({
        url: url,
        type: "GET",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            $('#HdnSubCategoryId').val(result.SubCategoryId);
            $('#SubCatName').val(result.SubCatName);
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
    var SubCategoryObj = {
        SubCategoryId: $('#HdnSubCategoryId').val(),
        SubCatName: $('#SubCatName').val(),
        Description: $('#Description').val(),
        Image: $('#Image').val(),
    };
    console.log(SubCategoryObj);
    var url = "/SubCategory/Update?SubCategoryId=" + SubCategoryObj.SubCategoryId;
    $.ajax({
        url: url,
        data: JSON.stringify(SubCategoryObj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            loadData();
            $('#myModal').modal('hide');
            $('#HdnSubCategoryId').val("");
            $('#SubCatName').val("");
            $('#Description').val("");
            $('#Image').val("");

        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}

function Delele(SubCategoryId) {
    var ans = confirm("Are you sure you want to delete this Record?");
    var url = "/SubCategory/Delete?SubCategoryId=" + SubCategoryId;
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
    var SubCategoryObj = {
        SubCatName: $('#SearchTxt').val()
    }
    if (inp.val().length > 0) {
        $.ajax({
            url: "/SubCategory/Search",
            data: JSON.stringify(SubCategoryObj),
            type: "POST",
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            success: function (result) {
                console.log("here");
                var html = '';
                var sno = 1;
                html = "<colgroup><col width='5%'/><col width='0%'/><col width='0%'/></colgroup><thead><tr><th> S.N. </th><<th> SubCategoryId&nbsp </th><th> SubCategoryName&nbsp </th><th> Description </th><th> Image&nbsp </th><th> </th><th> </th></tr></thead>";
                html += "<tbody>";
                $.each(result, function (key, item) {
                    html += '<tr>';
                    html += "<td>" + sno++ + ".</td>";
                    html += '<td> ' + item.SubCategoryId + '</td> ';
                    html += '<td> ' + item.SubCatName + '</td> ';
                    html += '<td> ' + item.Description + '</td> ';
                    html += '<td> ' + item.Image + '</td> ';
                    html += '<td><a href="#" onclick="return GetbyID(' + item.SubCategoryId + ')">Edit</a> | <a href="#" onclick="Delele(' + item.SubCategoryId + ')">Delete</a></td>';
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
    if ($('#SubCatName').val().trim() === "") {
        $('#SubCatName').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#SubCatName').css('border-color', 'lightgrey');
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
    $('#HdnSubCategoryId').val("");
    $('#SubCatName').val("");
    $('#Description').val("");
    $('#Image').val("");

    $('#btnUpdate').hide();
    $('#btnAdd').show();

    $('#HdnSubCategoryId').css('border-color', 'lightgrey');
    $('#SubCatName').css('border-color', 'lightgrey');
    $('#Description').css('border-color', 'lightgrey');
    $('#Image').css('border-color', 'lightgrey');
}




