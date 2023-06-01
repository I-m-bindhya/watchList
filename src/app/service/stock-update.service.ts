import { Injectable } from '@angular/core';
import { BehaviorSubject} from 'rxjs';
import { io } from "socket.io-client";
import { StockUpdate } from '../model/stock';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StockUpdateService {

  public stockUpdate$: BehaviorSubject<StockUpdate> = new BehaviorSubject({name:'', code:0, previous:0, price:0});
  constructor() {}

  socket = io(environment.apiUrl);

  public getUpdatedStocks = () => {
    this.socket.on('stock_update', (message) =>{
      this.stockUpdate$.next(message);
    });

    return this.stockUpdate$.asObservable();
  };
}
