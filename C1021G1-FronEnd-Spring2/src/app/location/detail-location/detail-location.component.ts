import { Component, OnInit } from '@angular/core';
import {LocationService} from '../location.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-detail-location',
  templateUrl: './detail-location.component.html',
  styleUrls: ['./detail-location.component.css']
})
export class DetailLocationComponent implements OnInit {
  id: number;
  locationDetail: any;

  constructor(private service: LocationService,
              private router : Router,
              private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.id = Number(this.activatedRoute.snapshot.paramMap.get('id'))
    this.service.getDetailLocationById(this.id).subscribe(data=>{
      this.locationDetail =data
    })
  }

}
