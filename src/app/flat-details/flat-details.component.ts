import { Component, OnInit } from '@angular/core';
import { DaftService } from "../core/daft.service";
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Params } from '@angular/router/src/shared';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';

interface Flat {
  uid: number;
  area: string;
  county: string;
  large_thumbnail_url: string;
  price: number;
  description: string;
  phone1: string;
}

@Component({
  selector: 'app-flat-details',
  templateUrl: './flat-details.component.html',
  styleUrls: ['./flat-details.component.css']
})
export class FlatDetailsComponent implements OnInit {

  properties: Flat[];

  selectedFlatID: number;
  teamUid: string;

  selectedFlat: Flat;

  private shareFlatSent: boolean = false;

  private flatCollection: AngularFirestoreCollection<Flat>;
  private observableFlats: Observable<Flat[]>;

  constructor(private daft: DaftService, private route: ActivatedRoute,
    private afs: AngularFirestore ) { }

  ngOnInit() {
    // get flat uid from passed parameters passed in
    this.route.params.subscribe((params: Params) => {
      this.selectedFlatID = params['flatUid'];
      this.teamUid = params['teamUid'];
    });

    this.flatCollection = this.afs.collection('flats');
    this.observableFlats = this.flatCollection.valueChanges(); // observable of flat data  

    // subscribe to observable and retrieve flats
    this.observableFlats.subscribe((flats: any[]) => {
      this.properties = flats[0].properties;

      // find selected using uid
      this.properties.forEach(flat => {
        if(flat.uid == this.selectedFlatID) {
          this.selectedFlat = flat;
        }
      });
    });
  }

}
