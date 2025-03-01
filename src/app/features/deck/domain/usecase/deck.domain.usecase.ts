import { Equatable } from "../../../../shared/equatable";
import { InfraFailure } from "../../../../shared/error/custom_failures";
import { Either } from "../../../../shared/error/either_left_right";
import { Usecase } from "../../../../shared/usecase";
import { IDeckRepository } from "../contract/deck.domain.contract";
import { Deck, DeckParam } from "../entity/deck.domain.entity";

export class GettingDeckUsecase implements Usecase<Deck, DeckParam> {
  private readonly deckRepositoryContract: IDeckRepository;

  constructor(deckRepository: IDeckRepository) {
    this.deckRepositoryContract = deckRepository;
  }

  async execute(param: DeckParam): Promise<Either<InfraFailure, Deck>> {
    return await this.deckRepositoryContract.getDeckData(param);
  }
}
