import { InfraFailure } from "../../../../shared/error/custom_failures";
import { Either } from "../../../../shared/error/either_left_right";
import { Deck, DeckParam } from "../entity/deck.domain.entity";

export interface IDeckRepository {
  getDeckData(param: DeckParam): Promise<Either<InfraFailure, Deck>>;
}
