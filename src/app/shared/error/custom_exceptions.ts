export class DefaultException extends Error {
  constructor(msg: string) {
    super(msg);
    this.name = "DefaultException"
  }
}
