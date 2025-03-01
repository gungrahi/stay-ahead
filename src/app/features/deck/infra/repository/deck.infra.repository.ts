import { DefaultException } from "../../../../shared/error/custom_exceptions";
import { DefaultFailure, InfraFailure } from "../../../../shared/error/custom_failures";
import { Either, Left, Right } from "../../../../shared/error/either_left_right";
import { IDeckRepository } from "../../domain/contract/deck.domain.contract";
import { Deck, DeckParam } from "../../domain/entity/deck.domain.entity";
import { IDeckDataSource } from "../datasource/deck.infra.datasource";

export class DeckRepository implements IDeckRepository {
  private readonly deckDataSourceContract: IDeckDataSource;

  constructor(deckDataSource: IDeckDataSource) {
    this.deckDataSourceContract = deckDataSource;
  }

  async getDeckData(param: DeckParam): Promise<Either<InfraFailure, Deck>> {
    try {
      let deck = await this.deckDataSourceContract.getDeckData(param);
      return new Right(deck);
    } catch (error) {
      if (error instanceof DefaultException) {
        return new Left(new DefaultFailure(error));
      }
      else {
        return new Left(new DefaultFailure(error as Error));
      }
    }
  }
}
