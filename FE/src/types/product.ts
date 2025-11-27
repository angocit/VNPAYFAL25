export interface IProduct {
  _id: string;
  name: string;
  image: string;
  price: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
export interface IData{
  status:boolean,
  data:IProduct[]
}