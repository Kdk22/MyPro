$(document).ready(function () {
    loadData();
    $("#btnAdd").click(function (e) {
        Add();
    });
});

//Load Data function

function loadData() {
    $.ajax({
        url: "/OrderDetails/List",
        type: "POST",
        //contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            console.log(result);
            console.log("here");
            var html = '';
            var sno = 1;
            html = "<colgroup><col width='5%'/><col width='30%'/><col width='30%'/><col width='30%'/><col width='30%'/><col width='30%'/><col width='30%'/><col width='30%'/><col width='30%'/><col width='30%'/></colgroup><thead><tr><th> S.N. </th><th> OrderDetailId</th><th> ProductId </th><th> OrderId </th><th> ProductPrice </th><th>Quantity</th><th> Discount</th><th> Tax </th><th> Total </th><th>Active </th><th> </th><th> </th></tr></thead>";
            html += "<tbody>";
            $.each(result, function (key, item) {
                html += '<tr>';
                html += "<td>" + sno++ + ".</td>";
                html += '<td> ' + item.OrderDetailId + '</td> ';
                html += '<td> ' + item.ProductId + '</td> ';
                html += '<td> ' + item.OrderId + '</td> ';
                html += '<td> ' + item.ProductPrice + '</td> ';
                html += '<td> ' + item.Quantity + '</td> ';
                html += '<td> ' + item.Discount + '</td> ';
                html += '<td> ' + item.Tax + '</td> ';
                html += '<td> ' + item.Total + '</td> ';
                html += '<td> ' + item.Active + '</td> ';
                html += '<td><a href="#" onclick="return GetbyID(' + item.OrderDetailId + ')">Edit</a> | <a href="#" onclick="Delele(' + item.OrderDetailId + ')">Delete</a></td>';
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
    var Price = (function () {
        var TotalP=0;
        var ProdP = $('#ProductPrice').val();
        var Qua = $('#Quantity').val();
        TotalP = ProdP * Qua;
        return TotalP;
    })();
    console.log(Price);
    var Discount = (function () {
        var DisVal = 0;
        var DisPer = $('#Discount').val();
        DisVal = DisPer / 100;
        return DisVal;
    })();
    console.log(Discount);
    var DisAmt = (function () {
        var DisAmt = 0;
        DisAmt = Price * Discount;
        return DisAmt;
    })();
    console.log(DisAmt);
    var TotalAfterDisc = (function () {
        var Total = Price - DisAmt;
        return Total;
    })();
    console.log(TotalAfterDisc);
    var TaxVal = (function () {
        var TaxVal = 0;
        var TaxPerc = $('#Tax').val();
        TaxVal = TaxPerc / 100;
        return TaxVal;
    })();
    console.log(TaxVal);
    var TaxAmt = (function () {
        var TaxAmount = 0;
        TaxAmount = TaxVal * TotalAfterDisc;
        return TaxAmount;
    })();

    var TotalPrice = (function () {
        var TotalAmount = 0;
        TotalAmount = TotalAfterDisc + TaxAmt;
        return TotalAmount;
    })();
    var OrderDetailsObj = {
        ProductId: $('#ProductId').val(),
        OrderId: $('#OrderId').val(),
        ProductPrice: $('#ProductPrice').val(),
        Quantity: $('#Quantity').val(),
        Discount: DisAmt,       
        Tax: TaxAmt,
        Total: TotalPrice,
        Active: $('#Active').val(),
    };
    console.log(OrderDetailsObj);
    $.ajax({
        url: "/OrderDetails/Add",
        data: JSON.stringify(OrderDetailsObj),
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
function GetbyID(OrderDetailId) {
    $('#HdnOrderDetailId').css('border-Total', 'lightgrey');
    $('#ProductId').css('border-Total', 'lightgrey');
    $('#OrderId').css('border-Total', 'lightgrey');
    $('#ProductPrice').css('border-Total', 'lightgrey');
    $('#Quantity').css('border-Total', 'lightgrey');
    $('#Discount').css('border-Total', 'lightgrey');
    $('#Tax').css('border-Total', 'lightgrey');
    $('#Total').css('border-Total', 'lightgrey');
    $('#Active').css('border-Total', 'lightgrey');

    console.log(OrderDetailId);
    var url = "/OrderDetails/GetbyID?OrderDetailId=" + OrderDetailId;
    $.ajax({
        url: url,
        type: "GET",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            $('#HdnOrderDetailId').val(result.OrderDetailId);
            $('#ProductId').val(result.ProductId);
            $('#OrderId').val(result.OrderId);
            $('#ProductPrice').val(result.ProductPrice);
            $('#Quantity').val(result.Quantity);
            $('#Discount').val(result.Discount);
            $('#Tax').val(result.Tax);
            $('#Total').val(result.Total);
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
    var Price = (function () {
        var TotalP = 0;
        var ProdP = $('#ProductPrice').val();
        var Qua = $('#Quantity').val();
        TotalP = ProdP * Qua;
        return TotalP;
    })();
    console.log(Price);
    var Discount = (function () {
        var DisVal = 0;
        var DisPer = $('#Discount').val();
        DisVal = DisPer / 100;
        return DisVal;
    })();
    console.log(Discount);
    var DisAmt = (function () {
        var DisAmt = 0;
        DisAmt = Price * Discount;
        return DisAmt;
    })();
    console.log(DisAmt);
    var TotalAfterDisc = (function () {
        var Total = Price - DisAmt;
        return Total;
    })();
    console.log(TotalAfterDisc);
    var TaxVal = (function () {
        var TaxVal = 0;
        var TaxPerc = $('#Tax').val();
        TaxVal = TaxPerc / 100;
        return TaxVal;
    })();
    console.log(TaxVal);
    var TaxAmt = (function () {
        var TaxAmount = 0;
        TaxAmount = TaxVal * TotalAfterDisc;
        return TaxAmount;
    })();

    var TotalPrice = (function () {
        var TotalAmount = 0;
        TotalAmount = TotalAfterDisc + TaxAmt;
        return TotalAmount;
    })();

    var OrderDetailObj = {
        OrderDetailId: $('#HdnOrderDetailId').val(),
        ProductId: $('#ProductId').val(),
        OrderId: $('#OrderId').val(),
        ProductPrice: $('#ProductPrice').val(),
        Quantity: $('#Quantity').val(),
        //Discount: $('#Discount').val(),
        //Tax: $('#Tax').val(),
        //Total: $('#Total').val(),
        Discount: DisAmt,
        Tax: TaxAmt,
        Total: TotalPrice,
        Active: $('#Active').val(),
    };
    console.log(OrderDetailObj);
    var url = "/OrderDetails/Update?OrderDetailId=" + OrderDetailObj.OrderDetailId;
    $.ajax({
        url: url,
        data: JSON.stringify(OrderDetailObj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            loadData();
            $('#myModal').modal('hide');
            $('#HdnOrderDetailId').val("");
            $('#ProductId').val("");
            $('#OrderId').val("");
            $('#ProductPrice').val("");
            $('#Quantity').val("");
            $('#Discount').val("");
            $('#Tax').val("");
            $('#Total').val("");
            $('#Active').val("");
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}

function Delele(OrderDetailId) {
    var ans = confirm("Are you sure you want to delete this Record?");
    var url = "/OrderDetails/Delete?OrderDetailId=" + OrderDetailId;
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
function Search() {
    var inp = $("#SearchTxt");
    var OrderDetailObj = {
        OrderDetailId: $('#SearchTxt').val()
    }
    if (inp.val().length > 0) {
        $.ajax({
            url: "/OrderDetails/Search",
            data: JSON.stringify(OrderDetailObj),
            type: "POST",
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            success: function (result) {
                console.log("here");
                var html = '';
                var sno = 1;
                html = "<colgroup><col width='5%'/><col width='20%'/><col width='20%'/></colgroup><thead><tr><th> S.N. </th><th> OrderDetailId</th><th> ProductId </th><th> OrderId </th><th> ProductPrice </th><th>Quantity</th><th> Discount </th><th> Tax </th><th> Total </th><th> Active </th><th> </th><th> </th></tr></thead>";
                html += "<tbody>";
                $.each(result, function (key, item) {
                    html += '<tr>';
                    html += "<td>" + sno++ + ".</td>";
                    html += '<td> ' + item.OrderDetailId + '</td> ';
                    html += '<td> ' + item.ProductId + '</td> ';
                    html += '<td> ' + item.OrderId + '</td> ';
                    html += '<td> ' + item.ProductPrice + '</td> ';
                    html += '<td> ' + item.Quantity + '</td> ';
                    html += '<td> ' + item.Discount + '</td> ';
                    html += '<td> ' + item.Tax + '</td> ';
                    html += '<td> ' + item.Total + '</td> ';
                    html += '<td> ' + item.Active + '</td> ';
                    html += '<td><a href="#" onclick="return GetbyID(' + item.OrderDetailId + ')">Edit</a> | <a href="#" onclick="Delele(' + item.OrderDetailId + ')">Delete</a></td>';
                    html += '</tr> ';
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
    if ($('#OrderId').val().trim() === "") {
        $('#OrderId').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#OrderId').css('border-color', 'lightgrey');
    }
    if ($('#ProductPrice').val().trim() === "") {
        $('#ProductPrice').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#ProductPrice').css('border-color', 'lightgrey');
    }

    if ($('#Quantity').val().trim() === "") {
        $('#Quantity').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#Quantity').css('border-color', 'lightgrey');
    }


    if ($('#Discount').val().trim() === "") {
        $('#Discount').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#Discount').css('border-color', 'lightgrey');
    }
    if ($('#Tax').val().trim() === "") {
        $('#Tax').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#Tax').css('border-color', 'lightgrey');
    }
    //if ($('#Total').val().trim() === "") {
    //    $('#Total').css('border-color', 'Red');
    //    isValid = false;
    //}
    //else {
    //    $('#Total').css('border-color', 'lightgrey');
    //}
    if ($('#Active').val().trim() === "") {
        $('#Active').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#Active').css('border-color', 'lightgrey');
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
    $('#HdnOrderDetailId').val("");
    $('#ProductId').val("");
    $('#OrderId').val("");
    $('#ProductPrice').val("");
    $('#Quantity').val("");
    $('#Discount').val("");
    $('#Tax').val("");
    //$('#Total').val("");
    $('#Active').val("");

    $('#btnUpdate').hide();
    $('#btnAdd').show();

    $('#ProductId').css('border-color', 'lightgrey');
    $('#OrderId').css('border-color', 'lightgrey');
    $('#ProductPrice').css('border-color', 'lightgrey');
    $('#Quantity').css('border-color', 'lightgrey');
    $('#Discount').css('border-color', 'lightgrey');
    $('#Tax').css('border-color', 'lightgrey');
    //$('#Total').css('border-color', 'lightgrey');
    $('#Active').css('border-color', 'lightgrey');

}




