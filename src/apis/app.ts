import AppStore from "../store/app";
import INews from "../types/news";
import NewsApi, { NewsApiParams } from "./news";

export default class AppApi {
  getData = (params: NewsApiParams) => {
    let res = [...data];
    if(params.category !== "") res = res.filter(x => x.category === params.category);
    if(params.author && params.author !== "") res = res.filter(x => x.author === params.author);
    return res;
  } 

  news: NewsApi;
  constructor(store: AppStore){
    this.news = new NewsApi(this, store);
  }
}

const data: INews[] = [
  {id: 1, category: 'Radio', author: 'Mark', date: '2020'},
  {id: 2, category: 'Radio', author: 'Gordon', date: '2020'},
  {id: 3, category: 'Mix', author: 'Mark', date: '2020'},
  {id: 4, category: 'Mix', author: 'Max', date: '2020'}
]