import { action, makeObservable } from "mobx";
import AppStore from "./app";

export default class UserStore {
  isAuth : boolean = false;
  constructor(private store: AppStore){
    makeObservable(this);
  }
  @action load(value: boolean) {
    this.isAuth = value;
  }
}