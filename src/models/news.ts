import { makeObservable } from "mobx";
import AppStore from "../store/app";
import INews from "../types/news";

export default class News implements INews {
  id: number;
  category: string;
  author: string;
  date: string;

  constructor(private store: AppStore, news: INews){
    this.id = news.id;
    this.category = news.category;
    this.author = news.author;
    this.date = news.date;

    // makeObservable(this);
  }
}