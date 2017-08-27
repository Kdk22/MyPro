$(document).ready(function () {
    loadData();
    $("#btnAdd").click(function (e) {
        Add();
    });
});

//Load Data function

function loadData() {
    $.ajax({
        url: "/City/List",
        type: "POST",
        //contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            console.log(result);
            console.log("here");
            var html = '';
            var sno = 1;
            html = "<colgroup><col width='5%'/><col width='0%'/><col width='0%'/></colgroup><thead><tr><th> S.N. </th><th> CityId </th><th> StateId </th><th> Name </th><th> Description</th><th> </th><th> </th></tr></thead>";
            html += "<tbody>";
            $.each(result, function (key, item) {
                html += '<tr>';
                html += "<td>" + sno++ + ".</td>";
                html += '<td> ' + item.CityId + '</td> ';
                html += "<td>" + item.StateId + "</td>";
                html += '<td> ' + item.Name + '</td> ';
                html += '<td> ' + item.Description + '</td> ';
                html += '<td><a href="#" onclick="return GetbyID(' + item.CityId + ')">Edit</a> | <a href="#" onclick="Delele(' + item.CityId + ')">Delete</a></td>';
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
    var CityObj = {
        CityId: $('#CityId').val(),
        StateId: $('#StateId').val(),
        Name: $('#Name').val(),
        Description: $('#Description').val(),
        
    };
    console.log(CityObj);
    $.ajax({
        url: "/City/Add",
        data: JSON.stringify(CityObj),
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
function GetbyID(CityId) {
    $('#HdnCityId').css('border-Total', 'lightgrey');
    $('#StateId').css('border-Total', 'lightgrey');
    $('#Name').css('border-Total', 'lightgrey');
    $('#Description').css('border-Total', 'lightgrey');
    console.log(CityId);
    var url = "/City/GetbyID?CityId=" + CityId;
    $.ajax({
        url: url,
        type: "GET",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            $('#HdnCityId').val(result.CityId);
            $('#StateId').val(result.StateId);
            $('#Name').val(result.Name);
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
    var CityObj = {
        CityId: $('#HdnCityId').val(),
        StateId: $('#StateId').val(),
        Name: $('#Name').val(),
        Description: $('#Description').val(),
        
    };
    console.log(CityObj);
    var url = "/City/Update?CityId=" + CityObj.CityId;
    $.ajax({
        url: url,
        data: JSON.stringify(CityObj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            loadData();
            $('#myModal').modal('hide');
            $('#HdnCityId').val("");
            $('#StateId').val("");
            $('#Name').val("");
            $('#Description').val("");
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}

function Delele(CityId) {
    var ans = confirm("Are you sure you want to delete this Record?");
    var url = "/City/Delete?CityId=" + CityId;
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
    var CityObj = {
        Name: $('#SearchTxt').val()
    }
    if (inp.val().length > 0) {
        $.ajax({
            url: "/City/Search",
            data: JSON.stringify(CityObj),
            type: "POST",
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            success: function (result) {
                console.log("here");
                var html = '';
                var sno = 1;
                html = "<colgroup><col width='5%'/><col width='0%'/><col width='0%'/></colgroup><thead><tr><th> S.N. </th><th> CityId </th><th> StateId </th><th> Name </th><th> Description</th><th> </th><th> </th></tr></thead>";
                html += "<tbody>";
                $.each(result, function (key, item) {
                    html += '<tr>';
                    html += '<td>' + sno++ + '.</td>';
                    html += '<td>' + item.CityId + '</td>';
                    html += '<td>' + item.StateId + '</td>';
                    html += '<td>' + item.Name + '</td>';
                    html += '<td>' + item.Description + '</td>';
                    html += '<td><a href="#" onclick="return GetbyID(' + item.CityId + ')">Edit</a> | <a href="#" onclick="Delele(' + item.CityId + ')">Delete</a></td>';
                    html += '</tr>';
                });
                $('.tbody').html(html);
                //  html += "</tbody>";
            },
        });
    }
}

function validate() {
    var isValid = true;
    if ($('#StateId').val().trim() === "") {
        $('#StateId').css('border-Total', 'Red');
        isValid = false;
    }
    else {
        $('#StateId').css('border-Total', 'lightgrey');
    }
    if ($('#Name').val().trim() === "") {
        $('#Name').css('border-Total', 'Red');
        isValid = false;
    }
    else {
        $('#Name').css('border-Total', 'lightgrey');
    }
   


    if ($('#Description').val().trim() === "") {
        $('#Description').css('border-Total', 'Red');
        isValid = false;
    }
    else {
        $('#Description').css('border-Total', 'lightgrey');
    }



    //if ($('#Image').val().trim() === "") {
    //    $('#Image').css('border-Total', 'Red');
    //    isValid = false;
    //}
    //else {
    //    $('#Image').css('border-Total', 'lightgrey');
    //}

    return isValid;
}

function clearTextBox() {
    $('#HdnCityId').val("");
    $('#StateId').val("");
    $('#Name').val("");
    $('#Description').val("");

    $('#btnUpdate').hide();
    $('#btnAdd').show();

    $('#StateId').css('border-Total', 'lightgrey');
    $('#Name').css('border-Total', 'lightgrey');
    $('#Description').css('border-Total', 'lightgrey');



}




