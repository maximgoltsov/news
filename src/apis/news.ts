import AppStore from "../store/app";
import INews from "../types/news";
import AppApi from "./app";

export type NewsApiParams = {
  category: string,
  author: string,
  order: string,
  page: string
}

export default class NewsApi {
  constructor(private api: AppApi, private store: AppStore){}
    getAll(params: NewsApiParams) {
      const data = this.api.getData(params);
      console.log(data, params);
      this.store.news.load(data);
    }
}

