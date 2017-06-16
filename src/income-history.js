import 'bootstrap';
import $ from 'jquery';
import {inject} from 'aurelia-framework';
import {Data} from './data';
import {Router} from 'aurelia-router';

@inject(Data, Router)
export class IncomeHistory {
    incomeArray;
    numRows;

    constructor(data, router) {
        this.data = data;
        this.router = router;
        this.incomeArray = [];
        this.numRows = 0;
    }

    totalIncomes() {
        var total = 0;
        for(var i = 0; i < numRows; i++) {
            var inputs = document.getElementsByName("income" + i);
            total += input[i].value;
        }
        console.log(total);
        this.incomeArray.sort();
        console.log(this.incomeArray.length);
        for(var i = 0; i < 35 && i < this.incomeArray.length; i++) {
            total += this.incomeArray[this.incomeArray.length - i];
            console.log(total);
        }
        this.data.thirtyFiveYearIncomeTotal = total;
        this.data.AIME = total / 420;
        this.router.navigate('#/advanced-2');
        console.log(this.data.AIME);
        console.log(this.data.thirtyFiveYearIncomeTotal);
    }

    generate(numRows) {
        this.numRows = numRows;
        console.log(numRows);
        console.log(this.numRows);
        var container = document.getElementById('container');
        for(var i = 0; i < numRows; i++) {
               // Append a node with a random text
                container.appendChild(document.createTextNode("Income " + (i+1)));
                // Create an <input> element, set its type and name attributes
                var input = document.createElement("input");
                input.type = "text";
                input.name = "income" + i;
                container.appendChild(input);
                // Append a line break 
                container.appendChild(document.createElement("br"));
        }
    }

    attached() {
        $(document).ready(function () {
    var counter = 0;

    $("#addrow").on("click", function () {

        counter = $('#myTable tr').length - 2;

        var newRow = $("<tr>");
        var cols = "";

        cols += '<td><input type="text" class="form-control" name="name' + counter + '"/></td>';
        cols += '<td><input type="text" class="form-control" name="mail' + counter + '"/></td>';

        cols += '<td><input type="button" class="ibtnDel btn btn-md btn-danger "  value="Delete"></td>';
        newRow.append(cols);
        if (counter == 50) $('#addrow').attr('disabled', true).prop('value', "You've reached the limit");
        $("table.order-list").append(newRow);
        counter++;
    });

    $("table.order-list").on("change", 'input[name^="price"]', function (event) {
        calculateRow($(this).closest("tr"));
        calculateGrandTotal();                
    });


    $("table.order-list").on("click", ".ibtnDel", function (event) {
        $(this).closest("tr").remove();
        calculateGrandTotal();
        
        counter -= 1
        $('#addrow').attr('disabled', false).prop('value', "Add Row");
    });


});

    }
}