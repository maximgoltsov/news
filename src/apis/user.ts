import AppStore from "../store/app";
import AppApi from "./app";

export default class UserApi {
  constructor(private api: AppApi, private store: AppStore){}
  login(user: string, password: string) {
    const data = this.api.getFakeUser(user, password);
    this.store.user.load(data);
    return data;
  }
}