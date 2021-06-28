import NewsStore from "./news";
import UserStore from "./user";

export default class AppStore {
  news = new NewsStore(this);
  user = new UserStore(this);
}