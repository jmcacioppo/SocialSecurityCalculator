import $ from 'jquery';
import {inject} from 'aurelia-framework';
import {Data} from './data';
import {Router} from 'aurelia-router';

@inject(Data, Router)
export class Advanced2 {
    constructor(data, router) {
        this.data = data;
        this.router = router;
        this.incomeArray = [];
        this.numRows = 0;
    }

    //You can handle the routing here.  
    next() {
        document.getElementById("advanced1").className="active";
        document.getElementById("advanced2").className="active";
        document.getElementById("advanced3").className="active";
        this.router.navigate('#/advanced-3');
    }
    
    yesnoCheck(that) {
        console.log(that)
        if (that == "yes" || that == "widowed") {
            document.getElementById("ifYes").style.display = "block";
        } else {
            document.getElementById("ifYes").style.display = "none";
        }
        return true;
        }
    totalIncomes(numRows) {

        this.numRows = numRows;
        //Loops through input boxes adds to incomeArray
        for(var i = 0; i < numRows; i++) {
            var input = document.getElementById("income" + i);
            this.incomeArray.push(input.value);
        }
        //Sort income array
        this.incomeArray = this.incomeArray.sort((a, b) => a - b);
        //Totals top 35 incomes
        var sum = (this.incomeArray).reduce((a, b) => parseInt(a) + parseInt(b), 0);
        this.data.thirtyFiveYearIncomeTotal = sum;
        //Need multiplier from CPI (consumer price index, to adjust for inflation)
        this.data.averageIndexedMonthlyEarnings = sum / 420;
    }

    generate(numRows) {
        this.numRows = numRows;
        var container = document.getElementById('container');
        for(var i = 0; i < numRows; i++) {
               // Append a node with a random text
                container.appendChild(document.createTextNode("Income " + (i+1)));
                // Create an <input> element, set its type and name attributes
                var input = document.createElement("input");
                input.type = "text";
                input.id = "income" + i;
                input.className = "form-control";
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

export class UpperValueConverter {
  toView(value) {
    return value && value.toUpperCase();
  }
}
