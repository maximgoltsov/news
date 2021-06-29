import { action, computed, makeObservable, observable } from "mobx";
import News from "../models/news";
import INews from "../types/news";
import AppStore from "./app";

export default class NewsStore {
  byId = observable.map<number, News>();
  count = 0;
  constructor(private store: AppStore) {
    makeObservable(this);
  }
  @action load(news: INews[]) {
    this.byId.clear();
    news.forEach((x) => this.byId.set(x.id, new News(this.store, x)));
  }
  @action setCount(value: number) {
    this.count = value;
  }
  @computed get getCount(){
    return this.count;
  }
  @computed get all() {
    return Array.from(this.byId.values());
  }
}