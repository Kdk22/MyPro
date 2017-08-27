$(document).ready(function () {
    loadData();
    $("#btnAdd").click(function (e) {
        Add();
    });
});

//Load Data function
function GetDateTime() {
    var date = new Date();
    var day = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();
    var time = date.toLocaleTimeString();
    if (month < 10) month = "0" + month;
    if (day < 10) day = "0" + day;

    var today = day + "/" + month + "/" + year +" " + time;
    console.log(date);
    console.log(today);

    document.getElementById('InsertDate').value = today;
}


function loadData() {
     

    $.ajax({
        url: "/WishList/List",
        type: "POST",
        //contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            console.log(result.InsertDate);
            console.log(result.CustomerId);
            console.log(result);
            console.log("here");
            var html = '';
            var sno = 1;
            html = "<colgroup><col width='5%'/><col width='0%'/><col width='0%'/></colgroup><thead><tr><th> S.N. </th><th> WishListId </th><<th> CustomerId </th><th> ProductId </th><th> InsertDate </th><th> Image </th><th> </th><th> </th></tr></thead>";
            html += "<tbody>";
            $.each(result, function (key, item) {
                var value = item.InsertDate;
                var myDate = (function (value) {             
                        var pattern = /Date\(([^)]+)\)/;
                        var results = pattern.exec(item.InsertDate);
                        var dt = new Date(parseFloat(results[1]));
                        return (dt.getMonth() + 1) + "/" + dt.getDate() + "/" + dt.getFullYear();                  
                })();
                console.log(myDate);
                html += '<tr>';
                html += "<td>" + sno++ + ".</td>";
                html += '<td> ' + item.WishListId + '</td> ';
                html += '<td> ' + item.CustomerId + '</td> ';
                html += '<td> ' + item.ProductId + '</td> ';
                html += '<td> ' + myDate + '</td> ';
                html += '<td> ' + item.Image + '</td> ';
                html += '<td><a href="#" onclick="return GetbyID(' + item.WishListId + ')">Edit</a> | <a href="#" onclick="return Delete(' + item.WishListId + ')">Delete</a></td>';
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
    var WishListObj = {
        WishListId: $('#WishListId').val(),
        CustomerId: $('#CustomerId').val(),
        ProductId: $('#ProductId').val(),
        InsertDate: $('#InsertDate').val(),
        Image: $('#Image').val(),
    };
    function getDate() {
        var todaydate = new Date();
        var day = todaydate.getDate();
        var month = todaydate.getMonth() + 1;
        var year = todaydate.getFullYear();
        var datestring = day + "/" + month + "/" + year;
        document.getElementById("InsertDate").value = datestring;
    }
    getDate();
    console.log(WishListObj);
    console.log(WishListObj.InsertDate);
    $.ajax({
        url: "/WishList/Add",
        data: JSON.stringify(WishListObj),
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
function GetbyID(WishListId) {
    $('#HdnWishListId').css('border-color', 'lightgrey');
    $('#CustomerId').css('border-color', 'lightgrey');
    $('#ProductId').css('border-color', 'lightgrey');
    $('#InsertDate').css('border-color', 'lightgrey');
    $('#Image').css('border-color', 'lightgrey');
    console.log(WishListId);
    var url = "/WishList/GetbyID?WishListId=" + WishListId;
    $.ajax({
        url: url,
        type: "GET",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            var value = result.InsertDate;
            var myDate = (function (value) {
                var pattern = /Date\(([^)]+)\)/;
                var results = pattern.exec(result.InsertDate);
                var dt = new Date(parseFloat(results[1]));
                return (dt.getMonth() + 1) + "/" + dt.getDate() + "/" + dt.getFullYear();

            })();
            console.log(myDate);
            $('#HdnWishListId').val(result.WishListId);
            $('#CustomerId').val(result.CustomerId);
            $('#ProductId').val(result.ProductId);
            $('#InsertDate').val(myDate);
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
    var WishListObj = {
        WishListId: $('#WishListId').val(),
        CustomerId: $('#CustomerId').val(),
        ProductId: $('#ProductId').val(),
        InsertDate: $('#InsertDate').val(),
        Image: $('#Image').val(),
    };
    console.log(WishListObj);
    console.log(WishListObj.InsertDate);
    var url = "/WishList/Update?WishListId=" + WishListObj.WishListId;
    $.ajax({
        url: url,
        data: JSON.stringify(WishListObj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            loadData();
            $('#myModal').modal('hide');
            $('#HdnWishListId').val("");
            $('#CustomerId').val("");
            $('#ProductId').val("");
            $('#InsertDate').val("");
            $('#Image').val("");


        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}

function Delete(WishListId) {
    var ans = confirm("Are you sure you want to delete this Record?");
    var url = "/WishList/Delete?WishListId=" + WishListId;
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
function SearchWishList() {
    var inp = $("#SearchTxt");
    var WishListObj = {
        InsertDate: $('#SearchTxt').val()
    }
    if (inp.val().length > 0) {
        $.ajax({
            url: "/WishList/Search",
            data: JSON.stringify(WishListObj),
            type: "POST",
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            success: function (result) {
                console.log("here");
                var html = '';
                var sno = 1;
                html = "<colgroup><col width='5%'/><col width='0%'/><col width='0%'/></colgroup><thead><tr><th> S.N. </th><th> WishListId </th><<th> CustomerId </th><th> ProductId </th><th> InsertDate </th><th> Image </th><th> </th><th> </th></tr></thead>";
                html += "<tbody>";
                $.each(result, function (key, item) {
                    var value = item.InsertDate;
                    var myDate = (function (value) {
                        var pattern = /Date\(([^)]+)\)/;
                        var results = pattern.exec(item.InsertDate);
                        var dt = new Date(parseFloat(results[1]));
                        return (dt.getMonth() + 1) + "/" + dt.getDate() + "/" + dt.getFullYear();
                    })();
                    console.log(myDate);
                    html += '<tr>';
                    html += "<td>" + sno++ + ".</td>";
                    html += '<td> ' + item.WishListId + '</td> ';
                    html += '<td> ' + item.CustomerId + '</td> ';
                    html += '<td> ' + item.ProductId + '</td> ';
                    html += '<td> ' + myDate + '</td> ';
                    html += '<td> ' + item.Image + '</td> ';
                    html += '<td><a href="#" onclick="return GetbyID(' + item.WishListId + ')">Edit</a> | <a href="#" onclick="return Delete(' + item.WishListId + ')">Delete</a></td>';
                    html += '</tr > ';
                });
                $('.tbody').html(html);                //  html += "</tbody>";
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
    if ($('#ProductId').val().trim() === "") {
        $('#ProductId').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#ProductId').css('border-color', 'lightgrey');
    }
    //if ($('#InsertDate').val().trim() === "") {
    //    $('#InsertDate').css('border-color', 'Red');
    //    isValid = false;
    //}
    //else {
    //    $('#InsertDate').css('border-color', 'lightgrey');
    //}
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
    $('#HdnWishListId').val("");

    $('#CustomerId').val("");
    $('#ProductId').val("");
    //$('#InsertDate').val("");
    $('#Image').val("");

    $('#btnUpdate').hide();
    $('#btnAdd').show();

    $('#HdnWishListId').css('border-color', 'lightgrey');
    $('#CustomerId').css('border-color', 'lightgrey');
    $('#ProductId').css('border-color', 'lightgrey');
    $('#InsertDate').css('border-color', 'lightgrey');
    $('#Image').css('border-color', 'lightgrey');
}




