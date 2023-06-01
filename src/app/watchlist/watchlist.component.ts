import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { StocksService } from '../service/stocks.service';
import { Stock, StockUpdate } from '../model/stock';
import { StockUpdateService } from '../service/stock-update.service';

@Component({
  selector: 'app-watchlist',
  templateUrl: './watchlist.component.html',
  styleUrls: ['./watchlist.component.scss']
})
export class WatchlistComponent implements OnInit, AfterViewInit{

  public inputFormControl: FormControl = new FormControl();

  public quantity: FormControl = new FormControl(10);

  public modelOpenBuy: boolean = false;

  public stocks: Stock[] = [];

  public stocksAll: Stock[] = [];

  public selectedRow!: Stock;

  public data!: {
    type: string,
    message: string
  } | null;


  public stockUpdates!: StockUpdate;

  constructor(
    private stocksService: StocksService,
    private stockUpdateService: StockUpdateService
  ) {  }

  ngOnInit(): void {
    this.getAllStocks();
    this.getUpdatedStocks();
  }

  getUpdatedStocks(){

    this.stockUpdateService.getUpdatedStocks().subscribe((message: StockUpdate) => {
      this.stockUpdates = message;
    });

  }


  ngAfterViewInit(){
    this.inputFormControl?.valueChanges.subscribe(
      value =>{
        this.stocks = this.stocksAll.filter(item=> {
          return item.SC_NAME.toLowerCase().includes(value.toLowerCase())? item: null
        });
      }
    )
  }

  getAllStocks(){
    this.stocksService.getStocks().subscribe(
      res =>{
        this.stocks = res;
        this.stocksAll = this.stocks;
      },
      err =>{
        this.data={
          type: "alert-danger",
          message: err
        }
      }
    )
  }

  openDialog(stock: Stock){
    this.selectedRow = stock;
    this.quantity.reset(10);
  }

}
