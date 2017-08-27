$(document).ready(function () {
    loadData();
    $("#btnAdd").click(function (e) {
        Add();
    });
});

//Load Data function

function loadData() {
    $.ajax({
        url: "/Country/List",
        type: "POST",
        //contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            console.log(result);
            console.log("here");
            var html = '';
            var sno = 1;
            html = "<colgroup><col width='5%'/><col width='0%'/><col width='0%'/></colgroup><thead><tr><th> S.N. </th><<th> CountryId </th><th> Name </th><th> Description</th><th> </th><th> </th></tr></thead>";
            html += "<tbody>";
            $.each(result, function (key, item) {
                html += '<tr>';
                html += "<td>" + sno++ + ".</td>";
                html += '<td> ' + item.CountryId + '</td> ';
                html += '<td> ' + item.Name + '</td> ';
                html += '<td> ' + item.Description + '</td> ';
                html += '<td><a href="#" onclick="return GetbyID(' + item.CountryId + ')">Edit</a> | <a href="#" onclick="Delele(' + item.CountryId + ')">Delete</a></td>';
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
    var CountryObj = {
        Name: $('#Name').val(),
        Description: $('#Description').val(),
        
    };
    console.log(CountryObj);
    $.ajax({
        url: "/Country/Add",
        data: JSON.stringify(CountryObj),
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
function GetbyID(CountryId) {
    $('#HdnCountryId').css('border-color', 'lightgrey');
   $('#Name').css('border-color', 'lightgrey');
    $('#Description').css('border-color', 'lightgrey');
    
    console.log(CountryId);
    var url = "/Country/GetbyID?CountryId=" + CountryId;
    $.ajax({
        url: url,
        type: "GET",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            $('#HdnCountryId').val(result.CountryId);
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
    var CountryObj = {
        CountryId: $('#HdnCountryId').val(),
        Name: $('#Name').val(),
        Description: $('#Description').val(),
    };
    console.log(CountryObj);
    var url = "/Country/Update?CountryId=" + CountryObj.CountryId;
    $.ajax({
        url: url,
        data: JSON.stringify(CountryObj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            loadData();
            $('#myModal').modal('hide');
            $('#HdnCountryId').val("");
           $('#Name').val("");
            $('#Description').val("");

        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}

function Delele(CountryId) {
    var ans = confirm("Are you sure you want to delete this Record?");
    var url = "/Country/Delete?CountryId=" + CountryId;
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
    var CountryObj = {
        Name: $('#SearchTxt').val()
    }
    if (inp.val().length > 0) {
        $.ajax({
            url: "/Country/Search",
            data: JSON.stringify(CountryObj),
            type: "POST",
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            success: function (result) {
                console.log("here");
                var html = '';
                var sno = 1;
                html = "<colgroup><col width='5%'/><col width='0%'/><col width='0%'/></colgroup><thead><tr><th> S.N. </th><th> Name </th><th> Description</th><th> </th><th> </th></tr></thead>";
                html += "<tbody>";
                $.each(result, function (key, item) {
                    html += '<tr>';
                    html += "<td>" + sno++ + ".</td>";
                    html += "<td>" + item.CountryId +"</td>"
                    html += '<td> ' + item.Name + '</td> ';
                    html += '<td> ' + item.Description + '</td> ';                    
                    html += '<td><a href="#" onclick="return GetbyID(' + item.CountryId + ')">Edit</a> | <a href="#" onclick="Delele(' + item.CountryId + ')">Delete</a></td>';
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
    $('#HdnCountryId').val("");

    $('#Name').val("");

    $('#Description').val("");




    $('#btnUpdate').hide();
    $('#btnAdd').show();


    $('#Name').css('border-Total', 'lightgrey');
    $('#Description').css('border-Total', 'lightgrey');



}
