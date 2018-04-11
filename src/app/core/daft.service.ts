import { Injectable } from '@angular/core';
import { SOAPService, Client } from 'ngx-soap';
import { Http, Headers, RequestOptions } from '@angular/http';

export class HolidayCode {
  code: any;
  description: any;
}

@Injectable()
export class DaftService {

  intA: string;
  intB: string;
  jsonResponse: any;
  xmlResponse: string;
  message: string;
  loading: boolean;
  resultLabel: string;
  showDiagnostic: boolean = false;

  private client: Client;
  private _options: RequestOptions = null;

  result: any;

  constructor(private http: Http, private soap: SOAPService) {   
  }

  getData() {
    return this.http.get("api/test")
      .map(result => result.json());
  }

  /*getHolidayCodes(): Promise<HolidayCode[]> {
    return this.http.get('api/test')
      .toPromise()
      .then(response => response.json().data as HolidayCode[])
      .catch(this.handleError);
  }*/

  private handleError(error: any): Promise<HolidayCode[]> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
}


  /*sum() {
    this.clear();
    this.loading = true;
    this.checkNumbers()

    this.resultLabel = 'A + B';
    let body = {
      intA: this.intA,
      intB: this.intB
    };

    debugger;
    this.client.operation('Add', body)
      .then(operation => {
        if (operation.error) {
          console.log('Operation error', operation.error);
          return;
        }

        let url = operation.url.replace("http://www.dneonline.com", "/calculator");
        this.http.post(url, operation.xml, { headers: operation.headers }).subscribe(
          response => {
            this.xmlResponse = response.text();
            this.jsonResponse = this.client.parseResponseBody(response.text());
            try {
              this.message = this.jsonResponse.Body.AddResponse.AddResult;
            } catch (error) { }
            this.loading = false;
          },
          err => {
            console.log("Error calling ws", err);
            this.loading = false;
          }
        );
      })
      .catch(err => console.log('Error', err));
  }

  checkNumbers() {
    if (!+this.intA) this.intA = '0';
    if (!+this.intB) this.intB = '0';
  }

  clear() {
    this.message = undefined;
    this.jsonResponse = undefined;
    this.xmlResponse = undefined;
  }*/

}
