import { Equatable } from "../equatable";
import { DefaultException } from "./custom_exceptions";

export abstract class InfraFailure extends Equatable {
  constructor(e: Error) {
    super();
  }
  abstract get message(): string;
}

// Failures from Infrastructure
export class DefaultFailure extends InfraFailure {
  private readonly _message: string;
  private readonly _name: string;
  constructor(de: DefaultException) {
    super(de);
    this._message = de.message;
    this._name = `DefaultFailure originated from ${de.name}`;
  }
  override get message(): string {
    return this._message;
  }
}

// Failures from Validation
