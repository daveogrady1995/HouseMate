import { Component, OnInit } from '@angular/core';
import { DaftService } from "../core/daft.service";

interface Flat {
  area: string;
  county: string;
  large_thumbnail_url: string;
  price: number;
}


@Component({
  selector: 'app-browse-flats',
  templateUrl: './browse-flats.component.html',
  styleUrls: ['./browse-flats.component.css']
})
export class BrowseFlatsComponent implements OnInit {

  properties: Flat[];

  constructor(private daft: DaftService) { }

  ngOnInit() {
    // retrieve data from Daft Api
    this.daft.getData().subscribe(prop => {
      this.properties = prop.data.results.ads;
      debugger;
      console.log(this.properties);
    });
  }

}
