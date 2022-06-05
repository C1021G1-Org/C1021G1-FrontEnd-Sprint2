import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import * as Highcharts from "highcharts";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {StatisticServiceService} from "../statistic-service.service";
import {Statistic} from "../model/statistic";
import {Price} from "../model/price";
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';
import {newArray} from "@angular/compiler/src/util";
import { MinmaxYear } from '../model/minmax-year';


@Component({
  selector: 'app-statistic',
  templateUrl: './statistic.component.html',
  styleUrls: ['./statistic.component.css']
})
export class StatisticComponent implements OnInit {
  private option: any;
  private  chart: any;
  statisticType: string;
  isQuarterChecked = false;
  isYearChecked = false;
  listPrice: Price[] = [];
  minMaxYear: MinmaxYear={};
  yearArr: number[] = [];

  @ViewChild('pdfTable') pdfTable: ElementRef;
  constructor(
    private service:StatisticServiceService
  ) {}
  ngOnInit(): void {
    this.getReport();
    this.setMinmaxYear();
  }

setMinmaxYear(){
    this.service.minmax().subscribe(data=>{
      this.minMaxYear = data;
      console.log(this.minMaxYear);
      for(let i =0;i<=data.max-data.min;i++){
        this.yearArr.push(data.min+i);
      }
    })
}

  generatePDF() {
    var data = document.getElementById('contentToConvert');
    html2canvas(data).then(canvas => {
      var imgWidth = 208;
      var imgHeight = canvas.height * imgWidth / canvas.width;
      const contentDataURL = canvas.toDataURL('image/png')
      let pdf = new jspdf('p', 'mm', 'a4');
      var position = 0;
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)
      pdf.save('newPDF.pdf');
    });
  }
  setStatistic(quarter,year) {
    console.log(quarter.value,year.value);
    if(quarter.value!=""){
      this.isQuarterChecked = true;
    }else this.isQuarterChecked = false;
    if(year.value!=""){
      this.isYearChecked = true;
    }else this.isYearChecked = false
  }

  statistic(quarter,year){
    let x = quarter.value;
    let y = year.value;
    let statistic: Statistic = {
    }
    statistic.year = y;
    statistic.quarter = x;
    this.service.statistic(statistic).subscribe(data =>{
      console.log(data);
      this.listPrice = data;
      this.getReport();
    });

  }
  getReport(){
    // Create the chart
    this.chart = {
      chart: {
        type: 'column'
      },
      title: {
        align: 'left',
        text: 'Browser market shares. January, 2018'
      },
      subtitle: {
        align: 'left',
        text: 'Click the columns to view versions. Source: <a href="http://statcounter.com" target="_blank">statcounter.com</a>'
      },
      accessibility: {
        announceNewData: {
          enabled: true
        }
      },
      xAxis: {
        type: 'category'
      },
      yAxis: {
        title: {
          text: 'Total percent market share'
        }

      },
      legend: {
        enabled: false
      },
      plotOptions: {
        series: {
          borderWidth: 0,
          dataLabels: {
            enabled: true,
            format: '{point.y:.1f}%'
          }
        }
      },

      tooltip: {
        headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
        pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b> of total<br/>'
      },

      series: [
        {
          name: "Browsers",
          colorByPoint: true,
          data: [
          ]
        }
      ],
      drilldown: {
        breadcrumbs: {
          position: {
            align: 'right'
          }
        },
        series: [
          {
            name: "Chrome",
            id: "Chrome",
            data: [
            ]
          },
        ]
      }
    };
    for(let i = 0;i<this.listPrice.length;i++){
      let data: any = {
        name: this.listPrice[i].time,
        y: this.listPrice[i].sumPrice,
        drilldown: this.listPrice[i].time
      }
      this.chart.series[0].data[i]={
        name: this.listPrice[i].time,
        y: this.listPrice[i].sumPrice/100,
        drilldown: this.listPrice[i].time
      };
    }
    Highcharts.chart('container', this.chart);
  }



  // getAllReportPrice(){
  //     this.option = {
  //       chart: {
  //         plotBackgroundColor: null,
  //         plotBorderWidth: null,
  //         plotShadow: false,
  //         type: 'pie'
  //       },
  //       title: {
  //         text: 'Danh thu vé máy bay tháng'
  //       },
  //       tooltip: {
  //         pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
  //       },
  //       accessibility: {
  //         point: {
  //           valueSuffix: '%'
  //         }
  //       },
  //       plotOptions: {
  //         pie: {
  //           allowPointSelect: true,
  //           cursor: 'pointer',
  //           dataLabels: {
  //             enabled: true,
  //             format: '<b>{point.name}</b>: {point.percentage:.1f} %'
  //           }
  //         }
  //       },
  //       series: [{
  //         name: 'Doanh thu',
  //         colorByPoint: true,
  //         data: [
  //           {
  //           }
  //           , {
  //
  //           }
  //
  //         ]
  //       }]
  //     };
  //     Highcharts.chart('container', this.option);
  //   }
  // }
  //
  // // getAllReportEmployee(){
  // //   this.checkNullData = true;
  // //   this.reportServiceService.getAllReportEmployee(this.startMonth).subscribe(value => {
  // //     this.iReportEmployee = value;
  // //     console.log(this.iReportEmployee);
  // //
  // //     this.chart = {
  // //       chart: {
  // //         type: 'column'
  // //       },
  // //       title: {
  // //         text: 'Top nhân viên bán được nhiều vé nhất'
  // //       },
  // //       xAxis: {
  // //         categories: [
  // //
  // //         ]
  // //       },
  // //
  // //       yAxis: {
  // //         allowDecimals: false,
  // //         min: 0,
  // //         title: {
  // //           text: 'Thống kê theo điểm dặt vé'
  // //         }
  // //       },
  // //       tooltip: {
  // //         formatter: function () {
  // //           return '<b>' + this.x + '</b><br/>' +
  // //             this.series.name + ': ' + this.y + '<br/>';
  // //         }
  // //       },
  // //       plotOptions: {
  // //         column: {
  // //           stacking: 'normal'
  // //         }
  // //       },
  // //       series: [
  //         {
  //           name: 'Điểm đặt vé',
  //           data: this.arrayEmployee
  //         }
  //       ]
  //     };
  //     for (let i = 0; i < value.length; i++) {
  //       this.nameEmployee[i] = value[i].name_employee;
  //       this.arrayEmployee[i] = Number(value[i].sumPoint);
  //       this.chart.xAxis.categories.push(this.nameEmployee[i]);
  //     }
  //     Highcharts.chart('chart', this.chart);
  //   }, error => {
  //     this.checkNullData = false;
  //     console.log('Không có dữ liệu ở database !!!')
  //     this.errorBadRequest = 'Không có dữ liệu ở database!!';
  //   }) ;
  //
  // }
  //
  // getAllReportAirline(){
  //   this.checkNullData = true;
  //   this.reportServiceService.getAllReportAirline(this.fromDateAirline,this.toDateAirline).subscribe(result=> {
  //     this.iReportAirline = result;
  //     this.lineShape = {
  //       chart: {
  //         type: 'areaspline'
  //       },
  //       title: {
  //         text: 'Doanh thu của các hãng bay'
  //       },
  //       legend: {
  //         layout: 'vertical',
  //         align: 'left',
  //         verticalAlign: 'top',
  //         x: 150,
  //         y: 100,
  //         floating: true,
  //         borderWidth: 1,
  //         backgroundColor:
  //           Highcharts.defaultOptions.legend.backgroundColor || '#FFFFFF'
  //       },
  //       xAxis: {
  //         categories: [
  //         ],
  //         plotBands: [{
  //           from: 4.5,
  //           to: 6.5,
  //           color: 'rgba(68, 170, 213, .2)'
  //         }]
  //       },
  //       yAxis: {
  //         title: {
  //           text: 'Số lượng đặt vé của các hãng bay'
  //         }
  //       },
  //       tooltip: {
  //         shared: true,
  //         valueSuffix: ':Firm revenue'
  //       },
  //       credits: {
  //         enabled: false
  //       },
  //       plotOptions: {
  //         areaspline: {
  //           fillOpacity: 0.5
  //         }
  //       },
  //       series: [
  //         {
  //           name: 'Số lượng đặt vé của các hãng',
  //           data: this.countAirline
  //         }
  //       ]
  //     };
  //     for (let i = 0; i < result.length; i++) {
  //       this.nameAirline[i] = result[i].name_airline;
  //       this.countAirline[i] = Number(result[i].countAirline);
  //       this.lineShape.xAxis.categories.push(result[i].name_airline);
  //     }
  //     Highcharts.chart('charts', this.lineShape);
  //   },error => {
  //     this.checkNullData = false;
  //     console.log('Không có dữ liệu ở database');
  //     this.errorBadRequest = 'Không có dữ liệu ở database';
  //
  //   });
  //
  // }
  //
  //
  // setSelectShape(shape: HTMLSelectElement) {
  //   if (shape.value == '1'){
  //     this.checkDisable();
  //     this.selectShape = Number(shape.value);
  //   }else {
  //     this.checkDisableSelect1();
  //     this.selectShape = Number(shape.value);
  //   }
  //   this.selectShape = Number(shape.value);
  // }
  //
  // setSelectRevenue(revenue: HTMLSelectElement) {
  //   this.checkDisable();
  //   this.selectRevenue = Number(revenue.value);
  // }
  //
  // setFromDateAirline(fromDate: HTMLInputElement) {
  //   this.checkDisableInput();
  //   this.fromDateAirline = fromDate.value;
  // }
  //
  // setToDateAirline(toDate: HTMLInputElement) {
  //   this.checkDisableInput();
  //   this.toDateAirline = toDate.value;
  // }
  //
  // checkDisable(){
  //   if (this.selectShape == 1){
  //     let shape = !this.createReportForm.get('chart').errors?.required;
  //     let revenue = !this.createReportForm.get('revenue').errors?.required;
  //     let select1 = !this.createReportForm.get('select1').errors?.required;
  //     let select2 = !this.createReportForm.get('select2').errors?.required;
  //     this.checkModal = shape&&revenue&&select1&&select2;
  //   }else {
  //     this.checkDisableSelect1();
  //   }
  //
  // }
  //
  // checkDisableInput(){
  //   let shape = !this.createReportForm.get('chart').errors?.required;
  //   let revenue = !this.createReportForm.get('revenue').errors?.required;
  //   let startDate = !this.createReportForm.get('startDate').errors?.required;
  //   let endtDate = !this.createReportForm.get('endtDate').errors?.required;
  //   this.checkModal = shape&&revenue&&startDate&&endtDate;
  // }
  //
  // checkDisableSelect1(){
  //   let shape = !this.createReportForm.get('chart').errors?.required;
  //   let revenue = !this.createReportForm.get('revenue').errors?.required;
  //   let select1 = !this.createReportForm.get('select1').errors?.required;
  //   this.checkModal = shape&&revenue&&select1;
  // }


}
