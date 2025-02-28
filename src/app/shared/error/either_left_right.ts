export interface Either<F, S> {
  unwrap(
    onFailure: (failure: F) => void,
    onSuccess: (result: S) => void
  ): void;
}

export class Right<T, S> implements Either<T, S> {
  private _val: S;
  constructor(val: S) {
    this._val = val;
  }
  unwrap(onFailure: (failure: T) => void, onSuccess: (result: S) => void): void {
    onSuccess(this._val);
  }
}

export class Left<F, S> implements Either<F, S> {
  private _val: F;
  constructor(val: F) {
    this._val = val;
  }
  unwrap(onFailure: (failure: F) => void, onSuccess: (result: S) => void): void {
      onFailure(this._val);
  }
}

export class Unit {}
