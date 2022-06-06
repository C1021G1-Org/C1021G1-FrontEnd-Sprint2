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

  isDisplayContainer: boolean = false;

  @ViewChild('pdfTable') pdfTable: ElementRef;
  constructor(
    private service:StatisticServiceService
  ) {}
  ngOnInit(): void {
    // this.getReport();
    this.setMinmaxYear();
  }

  setMinmaxYear(){
    this.service.minmax().subscribe(data=>{
      this.minMaxYear = data;
      console.log(this.minMaxYear);
      for(let i =0;i<=data.max-data.min;i++){
        this.yearArr.push(data.min+i);
        console.log(this.yearArr[i]);
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

    if(y.length==4){
      this.isDisplayContainer = true;
      this.service.statistic(statistic).subscribe(data =>{
        console.log(data);
        this.listPrice = data;
        this.getReport();
      });
    }else this.isDisplayContainer = false;

    }

  getReport(){
    // Create the chart
    this.chart = {
      chart: {
        type: 'column'
      },
      title: {
        align: 'left',

        text: 'Bảng thống kê doanh thu'
      },
      subtitle: {
        align: 'left',
        text: 'Biểu đồ doanh thu của công ty</a>'
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
          text: 'Ti lệ theo từng phần'
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

  hidden() {
    this.isDisplayContainer = false;

  }
}
