import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Stock, Response } from '../model/stock';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StocksService {

  baseUrl = 'stocks';

  constructor(private httpClient: HttpClient) { }

  getStocks() {
    return this.httpClient
      .get<Response>(`${environment.apiUrl}${this.baseUrl}`)
      .pipe(map((response): Stock[] => response.data.stocks));
  }
}

