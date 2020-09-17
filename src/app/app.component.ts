import { Component } from '@angular/core';
import * as Highcharts from 'highcharts';
import { Options } from "highcharts/highstock";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public options: any = {

    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      type: 'pie'
    },
    title: {
      text: 'Market Qtr Report'
    },
    tooltip: {
      pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
    },
    accessibility: {
      point: {
        valueSuffix: '%'
      }
    },
    plotOptions: {
      pie: {
        colors:[],
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: {
          enabled: true,
          format: '<b>{point.name}</b>: {point.percentage:.1f} %'
        }
      }
    },
    series: [{
      name: 'Revenue',
      colorByPoint: true,
      data: []
    }]

  };
  public barChartOptions:any = {
    chart: {
      type: 'column'
    },
    title: {
      text: 'Market Qtr Report'
    },
    colors: [],
    xAxis: {
      categories: [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec'
      ],
      crosshair: true
    },
    yAxis: {
      min: 0,
      title: {
        text: 'Revenue in (Rs)'
      }
    },
    tooltip: {
      headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
      pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
        '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
      footerFormat: '</table>',
      shared: false,
      useHTML: true
    },
    plotOptions: {
      column: {
        pointPadding: 0.2,
        borderWidth: 0,
        colorByPoint: true
      },
    },
    series: [{name:"Revenue",data:[]}]
  };

  lineChartOptions :any = {
    chart: {
        type: 'line'
    },
    title: {
        text: 'Market Qtr Report'
    },
    xAxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    },
    yAxis: {
        title: {
            text: 'Revenue in Rs'
        }
    },
    plotOptions: {
        line: {
            dataLabels: {
                enabled: true
            },
            enableMouseTracking: false
        }
    },
    series: [{
        name: 'Revenue',
        data: []
    }]
}

  Highcharts: typeof Highcharts = Highcharts;

  chartOptions: Options = {};

  loading: boolean = false;

  constructor() { }


  colors: any = [
    {
      "color": "Red",
      "colorKey": 1
    },
    {
      "color": "Green",
      "colorKey": 2
    },
    {
      "color": "Purple",
      "colorKey": 3
    },
    {
      "color": "Yellow",
      "colorKey": 4
    },
    {
      "color": "Blue",
      "colorKey": 5
    },
    {
      "color": "Grey",
      "colorKey": 6
    },
    {
      "color": "Orange",
      "colorKey": 7
    }
  ];

  chartType: string = 'pie'; //default chart

  selectedOptions: any = [{
    "revenue": 10,
    "color": "Green",
    "label": "January"
  }, {
    "revenue": 20,
    "color": "Blue",
    "label": "Feburary"
  },
  {
    "revenue": 30,
    "color": "Yellow",
    "label": "March"
  }]

  chartTypes = [
    {
      name: 'Pie',
      value: 'pie'
    },
    {
      name: 'Bar',
      value: 'bar'
    },
    {
      name: 'Line',
      value: 'line'
    }
  ]

  
  ngOnInit() {
  this.OnSelectedChart("pie");
  }

  OnSelectedChart(_type) {
    this.chartType = _type;
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
      if(_type.toLowerCase() === 'pie'){
        this.getPieChartOptions();
        this.chartOptions = this.options;
      }else if(_type.toLowerCase() === 'bar'){
        this.getBarChartOptions();
        this.chartOptions = this.barChartOptions;
      }else if(_type.toLowerCase() === 'line'){
        this.getLineChartOptions();
        this.chartOptions = this.lineChartOptions;
      }
      
    }, 2000);
  }

  getPieChartOptions() {

    let _data = [];
    this.selectedOptions.map(function (value, index) {
      let obj = {
        "name": "",
        "y": 0
      }
      obj.name = value.label;
      obj.y = parseInt(value.revenue)
      _data.push(obj);
    });
    this.options.plotOptions.pie.colors = [];
    this.options.plotOptions.pie.colors =  this.selectedOptions.map(function (value, index) {
      return value.color;
    });
    this.options.series[0].data = [];
    this.options.series[0].data = _data;
  } // pie

  getBarChartOptions(){
    let _data = [];
    console.log(this.selectedOptions);
    this.selectedOptions.map(function (value, index) {
      _data.push(parseInt(value.revenue));
    });
    this.barChartOptions.colors = [];
    this.barChartOptions.colors =  this.selectedOptions.map(function (value, index) {
      return value.color;
    });
   
    this.barChartOptions.series[0].data = [];
    this.barChartOptions.series[0].data = _data;

  }

  getLineChartOptions(){
    let _data = [];
    console.log(this.selectedOptions);
    this.selectedOptions.map(function (value, index) {
      let obj = {
        "name": "",
        "y": 0
      }
      obj.name = value.label;
      obj.y = parseInt(value.revenue)
      _data.push(obj);
    });
    this.lineChartOptions.series[0].data = [];
    this.lineChartOptions.series[0].data = _data;

  }
}
