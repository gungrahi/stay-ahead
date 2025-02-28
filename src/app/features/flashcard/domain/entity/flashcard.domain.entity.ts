export enum RevisionStage {
  UNTESTED,
  FORGOTTEN,
  RECALLED_ONCE,
  RECALLED_TWICE
}

abstract class Revisable {
  constructor(private stage: RevisionStage = RevisionStage.UNTESTED) {}

}

export class Cue extends Object {
  constructor(private _cue: string) {
    super();
  }

  override toString(): string {
    return this._cue;
  }
}

export class ShortAnswer extends Object {
  constructor(private _shortAnswer: string) {
    super();
  }

  override toString(): string {
    return this._shortAnswer;
  }
}

export class LongAnswer extends Object {
  constructor(private _longAnswer: string) {
    super();
  }

  override toString(): string {
    return this._longAnswer;
  }
}

export class FlashCard {
  constructor(
    private _cue: Cue,
    private _shortAnswer: ShortAnswer,
    private _longAnswer?: LongAnswer
  ) {}

  public get cue() : Cue {
    return this._cue;
  }

  public set cue(cueText : string) {
    this._cue = new Cue(cueText);
  }

  public get shortAnswer() : ShortAnswer {
    return this._shortAnswer;
  }

  public set shortAnswer(shortAnswerText : string) {
    this._shortAnswer = new ShortAnswer(shortAnswerText);
  }

  public get longAnswer() : LongAnswer {
    return this._longAnswer ?? new LongAnswer("");
  }

  public set longAnswer(longAnswerText : string) {
    this._longAnswer = new LongAnswer(longAnswerText);
  }

}
