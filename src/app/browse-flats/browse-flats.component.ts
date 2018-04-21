import { Component, OnInit } from '@angular/core';
import { DaftService } from "../core/daft.service";
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';
import { Params } from '@angular/router/src/shared';
import { ActivatedRoute, ParamMap } from '@angular/router';

interface Flat {
  uid: number;
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

  teamUid: string;

  properties: Flat[] = [];
  idCount = 1;

  private flatCollection: AngularFirestoreCollection<Flat>;
  private observableFlats: Observable<Flat[]>;

  constructor(private daft: DaftService, private afs: AngularFirestore
  ,private route: ActivatedRoute) { }

  ngOnInit() {

    // retrieve flats for current teamUid
    this.route.params.subscribe((params: Params) => {
      debugger;
      this.teamUid = params['teamUid'];
    });

    // first lets check if we have already have flats in the database
    // if not populate new ones using Daft API

    this.flatCollection = this.afs.collection('flats');
    this.observableFlats = this.flatCollection.valueChanges(); // observable of flat data  

    // subscribe to observable and retrieve flats
    this.observableFlats.subscribe((flats: any[]) => {
      debugger;
      // clear exisitng data
      this.properties = null;
      this.properties = flats[0].properties;
      console.log(this.properties);

      // if there is no properties rerieve data from api and populate db
      if (this.properties.length == 0) {
        debugger;
        // retrieve data from Daft Api
        this.daft.getData().subscribe(prop => {
          this.properties = prop.data.results.ads;
          console.log(this.properties);

          // change rent figures
          // give each unique id
          this.properties.forEach(flat => {
            flat.price = this.genRandomRent();
            flat.uid = this.idCount;
            this.idCount++;
          });

          const propertyData = {
            properties: this.properties
          }

          // populate db with new flats
          const flatsRef = this.afs.collection(`flats`);
          flatsRef.add(propertyData);

        });

      }
    });

  }

  // daft rent figures are focused on sales so use a sensible figure
  genRandomRent(): number {

    // random num between 300 and 900
    return Math.floor(Math.random() * 900) + 300;

  }

}
