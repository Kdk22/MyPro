$(document).ready(function () {
    loadData();
    $("#btnAdd").click(function (e) {
        Add();
    });
});

//Load Data function

function loadData() {
    $.ajax({
        url: "/State/List",
        type: "POST",
        //contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            console.log(result);
            console.log("here");
            var html = '';
            var sno = 1;
            html = "<colgroup><col width='5%'/><col width='0%'/><col width='0%'/></colgroup><thead><tr><th> S.N. </th><th>StateId </th<th> </th><th>CountryId </th><th>StateName </th><th> Description </th><th> </th><th> </th></tr></thead>";
            html += "<tbody>";
            $.each(result, function (key, item) {
                html += '<tr>';
                html +="<td>"+ sno++ + ".</td>";
                html += '<td> ' + item.StateId + '</td> ';
                html += '<td> ' + item.CountryId + '</td> ';
                html += '<td> ' + item.StateName + '</td> ';
                html += '<td> ' + item.Description + '</td> ';
                html += '<td><a href="#" onclick="return GetbyID(' + item.StateId + ')">Edit</a> | <a href="#" onclick="Delele(' + item.StateId + ')">Delete</a></td>';
                html += '</tr> ';
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
    var StateObj = {
        CountryId: $('#CountryId').val(),
        StateName: $("#StateName").val(),
        Description: $('#Description').val(),
    };
    console.log(StateObj);
    $.ajax({
        url: "/State/Add",
        data: JSON.stringify(StateObj),
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
function GetbyID(StateId) {
    $('#HdnStateId').css('border-Total', 'lightgrey');
    $('#CountryId').css('border-Total', 'lightgrey');
    $('#StateName').css('border-Total', 'lightgrey');
    $('#Description').css('border-Total', 'lightgrey');
    console.log(StateId);
    var url = "/State/GetbyID?StateId=" + StateId;
    $.ajax({
        url: url,
        type: "GET",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            $('#HdnStateId').val(result.StateId);
            $('#CountryId').val(result.CountryId);
            $('#StateName').val(result.StateName);
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
    var StateObj = {
        StateId: $('#HdnStateId').val(),
        CountryId: $('#CountryId').val(),
        StateName: $("#StateName").val(),
        Description: $('#Description').val(),
    };
    console.log(StateObj);
    var url = "/State/Update?StateId=" + StateObj.StateId;
    $.ajax({
        url: url,
        data: JSON.stringify(StateObj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            loadData();
            $('#myModal').modal('hide');
            $('#HdnStateId').val("");
            $('#CountryId').val("");
            $('#StateName').val("");
            $('#Description').val("");
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}

function Delele(StateId) {
    var ans = confirm("Are you sure you want to delete this Record?");
    var url = "/State/Delete?StateId=" + StateId;
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
    var StateObj = {
        StateName: $('#SearchTxt').val()
    }
    if (inp.val().length > 0) {
        $.ajax({
            url: "/State/Search",
            data: JSON.stringify(StateObj),
            type: "POST",
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            success: function (result) {
                console.log("here");
                var html = '';
                var sno = 1;
                html = "<colgroup><col width='5%'/><col width='0%'/><col width='0%'/></colgroup><thead><tr><th> S.N. </th><th> StateId </th><th> CountryId </th><th> State Name </th><th> Description</th><th> </th><th> </th><th> </th></tr></thead>";
                html += "<tbody>";
                $.each(result, function (key, item) {
                    html += '<tr>';
                    html += "<td>" + sno++ + ".</td>";
                    html += '<td> ' + item.StateId + '</td> ';
                    html += '<td> ' + item.CountryId + '</td> ';
                    html += '<td>' + item.StateName + '</td>';
                    html += '<td> ' + item.Description + '</td> ';
                    html += '<td><a href="#" onclick="return GetbyID(' + item.StateId + ')">Edit</a> | <a href="#" onclick="Delele(' + item.StateId + ')">Delete</a></td>';
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

    if ($('#CountryId').val().trim() === "") {
        $('#CountryId').css('border-Color', 'Red');
        isValid = false;
    }
    else {
        $('#CountryId').css('border-Color', 'lightgrey');
    }
    if ($('#StateName').val().trim() === "") {
        $('#StateName').css('border-Color', 'Red');
        isValid = false;
    }
    else {
        $('#StateName').css('border-Color', 'lightgrey');
    }


    if ($('#Description').val().trim() === "") {
        $('#Description').css('border-Color', 'Red');
        isValid = false;
    }
    else {
        $('#Description').css('border-Color', 'lightgrey');
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
    $('#HdnStateId').val("");
    $('#CountryId').val("");
    $('#StateName').val("");
    $('#Description').val("");

    $('#btnUpdate').hide();
    $('#btnAdd').show();

    $('#CountryId').css('border-color', 'lightgrey');
    $('#StateName').css('border-color', 'lightgrey');
    $('#Description').css('border-color', 'lightgrey');
}




