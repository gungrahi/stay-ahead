import { Deck, DeckParam } from "../../domain/entity/deck.domain.entity";

export interface IDeckDataSource {
  getDeckData(param: DeckParam): Promise<Deck>
}
