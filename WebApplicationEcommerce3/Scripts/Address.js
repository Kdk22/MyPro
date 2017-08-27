$(document).ready(function () {
    loadData();
    $("#btnAdd").click(function (e) {
        Add();
    });
});

//Load Data function

function loadData() {
    $.ajax({
        url: "/Address/List",
        type: "POST",
        //contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            console.log(result);
            console.log("here");
            var html = '';
            var sno = 1;
            html = "<colgroup><col width='5%'/><col width='0%'/><col width='0%'/></colgroup><thead><tr><th> S.N. </th><th> AddressId </th><th> CityId</th><th> StateId </th><th>CountryId</th><th> HouseNo</th><th> Long </th><th> Lati </th><th>ZipCode </th>";
            html += "<tbody>";
            $.each(result, function (key, item) {
                html += '<tr>';
                html += "<td>" + sno++ + ".</td>";
                html += '<td> ' + item.AddressId + '</td> ';
                html += '<td> ' + item.CityId + '</td> ';
                html += '<td> ' + item.StateId + '</td> ';
                html += '<td> ' + item.CountryId + '</td> ';
                html += '<td> ' + item.HouseNo + '</td> ';
                html += '<td> ' + item.Long + '</td> ';
                html += '<td> ' + item.Lati + '</td> ';
                html += '<td> ' + item.ZipCode + '</td> ';
                html += '<td><a href="#" onclick="return GetbyID(' + item.AddressId + ')">Edit</a> | <a href="#" onclick="Delele(' + item.AddressId + ')">Delete</a></td>';
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
    var AddressObj = {
        CityId: $('#CityId').val(),
        StateId: $('#StateId').val(),
        CountryId: $('#CountryId').val(),
        HouseNo: $('#HouseNo').val(),
        Long: $('#Long').val(),
        Lati: $('#Lati').val(),
        ZipCode: $('#ZipCode').val(),
    };
    console.log(AddressObj);
    $.ajax({
        url: "/Address/Add",
        data: JSON.stringify(AddressObj),
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
function GetbyID(AddressId) {
    $('#HdnAddressId').css('border-Lati', 'lightgrey');
    $('#CityId').css('border-Lati', 'lightgrey');
    $('#StateId').css('border-Lati', 'lightgrey');
    $('#CountryId').css('border-Lati', 'lightgrey');
    $('#HouseNo').css('border-Lati', 'lightgrey');
    $('#Long').css('border-Lati', 'lightgrey');
    $('#Lati').css('border-Lati', 'lightgrey');
    $('#ZipCode').css('border-Lati', 'lightgrey');

    console.log(AddressId);
    var url = "/Address/GetbyID?AddressId=" + AddressId;
    $.ajax({
        url: url,
        type: "GET",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            $('#HdnAddressId').val(result.AddressId);
            $('#CityId').val(result.CityId);
            $('#StateId').val(result.StateId);
            $('#CountryId').val(result.CountryId);
            $('#HouseNo').val(result.HouseNo);
            $('#Long').val(result.Long);
            $('#Lati').val(result.Lati);
            $('#ZipCode').val(result.ZipCode);

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
    var AddressObj = {
        AddressId: $('#HdnAddressId').val(),
        CityId: $('#CityId').val(),
        StateId: $('#StateId').val(),
        CountryId: $('#CountryId').val(),
        HouseNo: $('#HouseNo').val(),
        Long: $('#Long').val(),
        Lati: $('#Lati').val(),
        ZipCode: $('#ZipCode').val(),
    };
    console.log(AddressObj);
    var url = "/Products/Update?AddressId=" + AddressObj.AddressId;
    $.ajax({
        url: url,
        data: JSON.stringify(AddressObj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            loadData();
            $('#myModal').modal('hide');
            $('#HdnAddressId').val("");
            $('#CityId').val("");
            $('#StateId').val("");
            $('#CountryId').val("");
            $('#HouseNo').val("");
            $('#Long').val("");
            $('#Lati').val("");
            $('#ZipCode').val("");
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}

function Delele(AddressId) {
    var ans = confirm("Are you sure you want to delete this Record?");
    var url = "/Address/Delete?AddressId=" + AddressId;
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
    var AddressObj = {
        AddressId: $('#SearchTxt').val()
    }
    console.log(AddressObj);
    if (inp.val().length > 0) {
        $.ajax({
            url: "/Address/Search",
            data: JSON.stringify(AddressObj),
            type: "POST",
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            success: function (result) {
                console.log("here");
                var html = '';
                var sno = 1;
                html = "<colgroup><col width='5%'/><col width='0%'/><col width='0%'/></colgroup><thead><tr><th> S.N. </th><th> AddressId </th><<th> CityId </th><th> StateId </th><th> CountryId </th><th> HouseNo</th><th> Long </th><th> Lati </th><th> ZipCode </th><th> ReorderLevel </th><th> HouseNo</th><th> Long </th><th> Lati </th><th> ZipCode </th><th></th><th></th></thead>";
                html += "<tbody>";
                $.each(result, function (key, item) {
                    html += '<tr>';
                    html += "<td>" + sno++ + "</td>";
                    html += '<td> ' + item.AddressId + '</td> ';
                    html += '<td> ' + item.CityId + '</td> ';
                    html += '<td> ' + item.StateId + '</td> ';
                    html += '<td> ' + item.CountryId + '</td> ';
                    html += '<td> ' + item.HouseNo + '</td> ';
                    html += '<td> ' + item.Long + '</td> ';
                    html += '<td> ' + item.Lati + '</td> ';
                    html += '<td> ' + item.ZipCode + '</td> ';
                    html += '<td><a href="#" onclick="return GetbyID(' + item.AddressId + ')">Edit</a> | <a href="#" onclick="Delele(' + item.AddressId + ')">Delete</a></td>';
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
    if ($('#CityId').val().trim() === "") {
        $('#CityId').css('border-Lati', 'Red');
        isValid = false;
    }
    else {
        $('#CityId').css('border-Lati', 'lightgrey');
    }
    if ($('#StateId').val().trim() === "") {
        $('#StateId').css('border-Lati', 'Red');
        isValid = false;
    }
    else {
        $('#StateId').css('border-Lati', 'lightgrey');
    }
    if ($('#CountryId').val().trim() === "") {
        $('#CountryId').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#CountryId').css('border-color', 'lightgrey');
    }
    if ($('#HouseNo').val().trim() === "") {
        $('#HouseNo').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#HouseNo').css('border-color', 'lightgrey');
    }
    if ($('#Long').val().trim() === "") {
        $('#Long').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#Long').css('border-color', 'lightgrey');
    }
    if ($('#Lati').val().trim() === "") {
        $('#Lati').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#Lati').css('border-color', 'lightgrey');
    }
    if ($('#ZipCode').val().trim() === "") {
        $('#ZipCode').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#ZipCode').css('border-color', 'lightgrey');
    }

    //if ($('#Image').val().trim() === "") {
    //    $('#Image').css('border-Lati', 'Red');
    //    isValid = false;
    //}
    //else {
    //    $('#Image').css('border-Lati', 'lightgrey');
    //}

    return isValid;
}

function clearTextBox() {
    $('#HdnAddressId').val("");
    $('#CityId').val("");
    $('#StateId').val("");
    $('#CountryId').val("");
    $('#HouseNo').val("");
    $('#Long').val("");
    $('#Lati').val("");
    $('#ZipCode').val("");

    $('#btnUpdate').hide();
    $('#btnAdd').show();

    $('#CityId').css('border-color', 'lightgrey');
    $('#StateId').css('border-color', 'lightgrey');
    $('#CountryId').css('border-color', 'lightgrey');
    $('#HouseNo').css('border-color', 'lightgrey');
    $('#Long').css('border-color', 'lightgrey');
    $('#Lati').css('border-color', 'lightgrey');
    $('#ZipCode').css('border-color', 'lightgrey');

}




