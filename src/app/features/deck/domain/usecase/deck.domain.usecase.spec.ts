import { DefaultException } from "../../../../shared/error/custom_exceptions";
import { DefaultFailure, InfraFailure } from "../../../../shared/error/custom_failures";
import { Either, Right, Left } from "../../../../shared/error/either_left_right";
import { FlashCard } from "../../../flashcard/domain/entity/flashcard.domain.entity";
import { IDeckRepository } from "../contract/deck.domain.contract";
import { Deck, DeckParam } from "../entity/deck.domain.entity";
import { GettingDeckUsecase } from "./deck.domain.usecase";

class MockDeckRepository implements IDeckRepository {
  constructor() {}
  async getDeckData(param: DeckParam): Promise<Either<InfraFailure, Deck>> {
    let cards: Array<FlashCard> = [];
    return new Right(new Deck("testID", cards));
  }
}

describe("GettingDeckUsecase tests:", () => {
  let usecase: GettingDeckUsecase;
  let repository: IDeckRepository;

  beforeEach(async () => {
    repository = new MockDeckRepository();
    usecase = new GettingDeckUsecase(repository);
  });

  it("should create usecase", () => {
    expect(usecase).not.toBeNull();
  });

  it("should execute itself to get Deck", async () => {
    // arrange
    spyOn(usecase, "execute").and.callThrough();
    spyOn(repository, "getDeckData").and.callThrough();
    let param = new DeckParam("id");
    // act
    const resultEither = await usecase.execute(param);
    // assert
    expect(usecase.execute).toHaveBeenCalledWith(param);
    expect(repository.getDeckData).toHaveBeenCalledWith(param);
    resultEither.unwrap(() => {}, (result) => {
      expect(result instanceof Deck ).toBeTrue();
      expect(result.deckId).toEqual("testID");
    });
  });

  it("should execute itself to get InfraFailure", async () => {
    // arrange
    spyOn(usecase, "execute").and.callThrough();
    spyOn(repository, "getDeckData").and.callFake((id) => {
      return Promise.resolve<Either<InfraFailure, Deck>>(new Left(new DefaultFailure(new DefaultException("test error"))));
    });
    let param = new DeckParam("id");
    // act
    const resultEither = await usecase.execute(param);
    // assert
    expect(usecase.execute).toHaveBeenCalledWith(param);
    expect(repository.getDeckData).toHaveBeenCalledWith(param);
    resultEither.unwrap((failure) => {
      expect(failure.message).toBe("test error");
    }, (result) => {});
  });
});
