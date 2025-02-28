import { InfraFailure } from "../../../../shared/error/custom_failures";
import { Either } from "../../../../shared/error/either_left_right";
import { Deck } from "../entity/deck.domain.entity";

export interface IDeckRepository {
  getDeckData(deckId: string): Promise<Either<InfraFailure, Deck>>;
}
