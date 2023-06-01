export interface Stock{
  SC_CODE: number,
  SC_NAME: string,
  SC_GROUP: string,
  SC_TYPE: string,
  OPEN: number,
  HIGH: number,
  LOW: number,
  CLOSE: number,
  LAST: number,
  PREVCLOSE: number,
  NO_TRADES: number,
  NO_OF_SHRS: number,
  NET_TURNOV: number
}

export interface Response{
  data:{
    stocks: Stock[]
  },
  status: string
}


export interface StockUpdate{
  code:number,
  name: string,
  previous:number,
  price:number
}
