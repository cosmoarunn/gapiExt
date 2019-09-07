# gapiExt
**A jQuery plugin for gapi to draw both Chart and Table for supplied (Google Visualization) data**
![google chart](https://github.com/cosmoarunn/gapiExt/blob/master/gChart.png)

## [Live Demo](https://www.gsunitedtechnologies.com/analytics/) | [Documentation](https://https://www.gsunitedtechnologies.com/analytics/docs/)

gapiExt is a custom widget library to draw chart and table for supplied (Google Visualization) data. Any option can be customized before the chart is actually drawn. More options that are available in google chart library can be added to the widget.

Step 1: 
Load google visualization on your page,
```html
<script type="text/javascript" src="https://www.google.com/jsapi?autoload={'modules':[{'name':'visualization','version':'1.1','packages':['corechart', 'bar']}]}"></script>
```

Step: 2
Usage : 
```javascript
$("#chart-container").gChart ({ 
    type:"ComboChart",   // A combo chart 
    chart_id: "custom_chart_id", 
    class: "custom_chart_class",   
    data: data,  // Data must be in google visualization data format
    table:false, // Set to true to view TABLE right after the chart
    title: "Chart Title", 
    subtitle: "Chart Subtitle", 
    seriesType: "line", 
    series: {7: {type: 'bars'}},  // A combo chart with default line series and series #7 is set to bars. 
    colors: ['#F7F70E', '#BAD3F3', '#116A2C', '#0D2153', '#DB57F3', '#DAF0D6','#F4C1A1', '#A7A7A7'], 
});
```       
 To show the chart data on the table, use     
 ```
 table: true,
 ```
      
        
## License (MIT)
Copyright (c) 2017 cosmoarunn, https://github.com/cosmoarunn/gapiExt

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.        
