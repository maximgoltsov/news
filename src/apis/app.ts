import AppStore from "../store/app";
import INews from "../types/news";
import NewsApi, { NewsApiParams } from "./news";
import UserApi from "./user";

export default class AppApi {
  getFakeData = (params: NewsApiParams) => {
    let res = [...data];
    if(params.category !== "") res = res.filter(x => x.category === params.category);
    if(params.author && params.author !== "") res = res.filter(x => x.author === params.author);
    return {res, count: 22};
  } 
  getFakeUser = (login: string, password: string) => {
    return true;
  }

  news: NewsApi;
  user: UserApi;
  constructor(store: AppStore){
    this.news = new NewsApi(this, store);
    this.user = new UserApi(this, store);
  }
}

const data: INews[] = [
  {id: 1, category: 'Radio', author: 'Mark', date: '2020'},
  {id: 2, category: 'Radio', author: 'Gordon', date: '2020'},
  {id: 3, category: 'Mix', author: 'Mark', date: '2020'},
  {id: 4, category: 'Mix', author: 'Max', date: '2020'}
]