import NewsStore from "./news";

export default class AppStore {
  news = new NewsStore(this);
}