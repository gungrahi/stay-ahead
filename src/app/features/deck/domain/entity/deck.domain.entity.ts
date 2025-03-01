import { Equatable } from "../../../../shared/equatable";
import { FlashCard } from "../../../flashcard/domain/entity/flashcard.domain.entity";

/**
 * POTO Class that represents data of a Deck, which essentially abstracts a
 * collection of flashcards. The data is closely coupled with
 * the api response.
 */
export class Deck extends Equatable {
  constructor(public readonly deckId: string, public readonly flashcards: Array<FlashCard>) {
    super();
  }
  override equals(o: Object): boolean {
    return super.equals(o);
  }
}

// utility classes
export class DeckParam extends Equatable {
  constructor(public readonly deckId: string) {
    super();
  }
}
