import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';

@Injectable()
export class CounterActions {
  static INCREMENT = 'INCREMENT';
  static DECREMENT = 'DECREMENT';

  constructor() {
  }

  increment() {
    return { type: CounterActions.INCREMENT, payload: CounterActions}
    //return { type: CounterActions.INCREMENT, };
  }

  decrement() {
    return { type: CounterActions.DECREMENT };
  }
}
