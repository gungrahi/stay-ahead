import { DefaultException } from "../../../../shared/error/custom_exceptions";
import { DefaultFailure, InfraFailure } from "../../../../shared/error/custom_failures";
import { Either, Left } from "../../../../shared/error/either_left_right";
import { Deck, DeckParam } from "../../domain/entity/deck.domain.entity";
import { IDeckDataSource } from "../datasource/deck.infra.datasource";
import { DeckRepository } from "./deck.infra.repository";

class MockDeckDataSource implements IDeckDataSource {
  constructor() {}
  getDeckData(param: DeckParam): Promise<Deck> {
    return Promise.resolve(new Deck("deckID", []));
  }
}
describe("DeckRepository tests:", () => {
  let dataSource: IDeckDataSource;
  let repository: DeckRepository;

  beforeEach(() => {
    dataSource = new MockDeckDataSource();
    repository = new DeckRepository(dataSource);
  });

  it("should create repository", () => {
    expect(repository).not.toBeNull();
  });

  it("should call getDeckData() method to get Deck", async () => {
    // arrange
    let param = new DeckParam("deckID");
    spyOn(dataSource, "getDeckData").and.callThrough();
    spyOn(repository, "getDeckData").and.callThrough();
    // act
    let resultEither = await repository.getDeckData(param);
    // assert
    expect(repository.getDeckData).toHaveBeenCalledWith(param);
    expect(dataSource.getDeckData).toHaveBeenCalledWith(param);
    resultEither.unwrap((failure) => {}, (result) => {
      expect(result instanceof Deck).toBeTrue();
      expect(result.deckId).toEqual("deckID");
    });
  });

  it("call to getDeckData() method should throw exception", async () => {
    // arrange
    spyOn(dataSource, "getDeckData").and.callFake((param) => {
      throw new DefaultException("test error");
    });
    spyOn(repository, "getDeckData").and.callThrough();
    let param = new DeckParam("deckID");
    // act
    let resultEither = await repository.getDeckData(param);
    // assert
    expect(repository.getDeckData).toHaveBeenCalledWith(param);
    expect(dataSource.getDeckData).toHaveBeenCalledWith(param);
    resultEither.unwrap((failure) => {
      expect(failure.message).toEqual("test error");
    }, (result) => {});
  });
});
