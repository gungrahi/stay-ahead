import { InfraFailure } from "../../../../shared/error/custom_failures";
import { Either } from "../../../../shared/error/either_left_right";
import { IDeckRepository } from "../../domain/contract/deck.domain.contract";
import { Deck } from "../../domain/entity/deck.domain.entity";

class DeckRepository implements IDeckRepository {
  constructor() {
    //
  }

  async getDeckData(deckId: string): Promise<Either<InfraFailure, Deck>> {
    throw new Error("Method not implemented.");
  }
}
