/*
 * gapiExt.gChart - A jquery widget for both Chart and Table for the data
 * Author : Arun Panneerselvam
 */

    $.widget("gapiExt.gChart", {

        options: {
            id : null,
            chart_id: null,
            class: "",
            thisChart: null,
            type : "line",
            width: 300,
            height: 350,
            title : "gChart GAPI Data",
            data: { },
            drawChart: true,
            table: false,
            inverse: false,
            legend: { position: 'bottom' },
            hAxis : { textStyle : { fontSize: 10} },
            vAxis : { textStyle : { fontSize: 10} },
            chartArea: {'width': '90%', 'height': '60%'},
            bar: {groupWidth: "95%"},
            //colors: ['#F7F70E', '#BAD3F3', '#116A2C', '#0D2153', '#DB57F3', '#DAF0D6','#F4C1A1', '#F0F0F0'],
        },

        _setOption: function( key, value ) {
            this.options[ key ] = value;
            this._update();
        },
        id: function(id) {
            if(id === "undefined") {
                return this.id;
            }else {
                this.options.id = this._isNumeric(id);
                var c_id = this.options + this.options.id;
            }
        },
        //Add data to the chart
        data: function(data) {
            if(data === undefined) {  //no value passed, its a getter
                return this.options.data;
            } else {
                this.options.data = this._validate( data);
                var data = this.options.data;
                //draw the chart again here when the data changed
            }
        },

        _validate: function(data) {   //Check data for google chart accepted values
            return data.every(function(row) { if(row instanceof Array) return true; });
        },

        getChartData: function(id) {
            return this.data();
        },

        //Private methods
        _create: function() {

            this.element.addClass(this.options.class);
            this.options.id = $(this.element[0]).attr("id");
            try {
              google.charts.load('current', {'packages':['corechart', 'bar']});
              if(this.options.drawChart) thisChart = google.charts.setOnLoadCallback(this._drawChart()); else $("#"+this.options.id).css({"display":"none"});
            }catch(e) { console.log(e); }
            if(this.options.table) this._drawTable();
        },
        _exists: function(o) {
            return $(o).length > 0;
        },
        _isNumeric: function(n) {
            return (!isNaN(parseInt(n)) && isFinite(n))?n:0;
        },

        _sortdata: function() {
            var uData = rData = this.options.data;
            var months = "JanFebMarAprMayJunJulAugSepOctNovDec";
            if(uData.length > 2) {
                var h = uData[0];
                for(var i=1; i<=uData.length;i++) {
                    var tm = months.indexOf(uData[i][0])/3 + 1;
                    var nm = months.indexOf(uData[i+1][0])/3 + 1;

                }
            }
        },
        _inverse: function() {
            var grid = this.options.data;
            var grid2 = grid[0].map(function(col, i) {
                return grid.map(function(row) {
                    return row[i];
                });
            });
            return grid2;
        },
        _reload: function() {
             var container = $(this.element[0]).attr("id");
             $(".tit-"+container).each( function() { $(this).remove(); });
             $(".tbl-"+container).each( function() { $(this).remove(); });
        },
        _update: function() {
           if(this.options.drawChart) this._drawChart();
           if(this.options.table) this._drawTable();
        },
        _destroy: function(){
          this.element.removeClass(this.options.class);
          $.Widget.prototype.destroy.call(this);

        },
        _drawChart: function() {
            var container = $(this.element[0]).attr("id");

            var chartOptions = {
                title : this.options.title,
                subtitle : this.options.subtitle,
                width : this.width,
                height : this.height,
                legend : this.options.legend,
                isStacked: true,
                hAxis : this.options.hAxis,
                vAxis : this.options.vAxis,
                colors: this.options.colors,
                chartArea: this.options.chartArea,
                bar: this.options.bar,
            };
            var target = document.getElementById(this.options.id);
            switch(this.options.type) { 
                case 'ComboChart':
                        chartOptions.seriesType = this.options.seriesType;
                        chartOptions.series = this.options.series;
                        var thisChart = new google.visualization.ComboChart(target);
                    break;
                case 'BarChart':
                    var thisChart = new google.visualization.BarChart(target);
                    break;
                case 'ColumnChart':
                        chartOptions.bar = { groupWidth: '75%' };
                        chartOptions.isStacked = true;
                        var thisChart = new google.visualization.ColumnChart(target);
                    break;
                case 'PieChart':
                        chartOptions.bar = { groupWidth: '75%' };
                        chartOptions.isStacked = true;
                        var thisChart = new google.visualization.PieChart(target);
                    break;
                default:  var thisChart = new google.visualization.LineChart(target);
            }
            try {
                var cd = google.visualization.arrayToDataTable(this.options.data);
                if(this.options.drawChart) thisChart.draw(cd, chartOptions);
            } catch(e) {  console.log("Failed drawing charts using data. Detailed Error : " + e );  }
        },

        _drawTable: function() {
            //Draw table code to be added
            var container = $(this.element[0]).attr("id");
            var inverse = this.options.inverse;
            try {     //console.log(this.options.data);
                var tData =  (this.options.inverse)?this._inverse(this.options.data):this.options.data;
                var tH = tData[0]; var tblname = 'tbl-'+container;
                var table = $('<table class="table table-condensed table-striped tbl-'+container+' mt20"></table>').css({'overflow':'scroll'});
                var title = $('<div class="tit-'+container+' mt20"></div>').html('<h2><i class="cursor-pointer toggler fa fa-chevron-circle-down" onclick="$(\'.tbl-'+container+'\').slideToggle(); return false;"></i>'+this.options.title+'</h2>');
                //btn = $('<a class="btn btn-small btn-default" href="#" onclick="$(\'.'+tblname+'\').toggle();return false;">Show Table </a>');
                if(("undefined" !== typeof(tData)) && (tData.length > 0)) {
                    $.each(tData, function(k, v) {
                        if(k == 0) {  var thStr = "";
                            $.each(v, function(index, value) {
                              var _cl = ""; if(!index || value ==="month" && !inverse) { _cl = ''; value = " Month"; }
                              if(Object.keys(value).length > 0 ) { thStr += '<th class="strong'+_cl+'" text-align="center" style="background: #3e70e0; color: #fff">'+value+'</th>'; }
                            });
                            table.append('<thead><tr class="h-row">'+thStr+'</tr></thead>');
                        } else { var tdStr = "";
                            $.each(v, function(index, value) {
                              var _cl = ""; if(!index  && ! inverse ) { _cl = "headcol strong" }
                              if(Object !== typeof value) tdStr += '<td class="'+ _cl +'" text-align="center">'+value+'</td>'  });
                            table.append('<tr>'+tdStr+'</tr>');
                        }
                    });
                    this._reload();  // May be removed
                    $("#tbl-"+container).append(table);
                }
        }catch(e) {  console.log(e); }
        },

    });
