import { Card, DeckModel } from "./deck.infra.model";
import deckJson from "../../../../../sa-assets/data/deckmodel.json";

describe("DeckModel tests:", () => {
  let cards: Array<Card>;
  let model: DeckModel;

  beforeEach(async () => {
    cards = [];
    cards.push(
      {
        cardId: "testCardID01",
        content: {cueText: "testCue01", shortAnswerText: "testShortAnswer01"}
      },
      {
        cardId: "testCardID02",
        content: {cueText: "testCue02", shortAnswerText: "testShortAnswer02", longAnswerText: "testLongAnswer02"}
      }
    );
    model = new DeckModel("testDeckID", cards);
  });

  it("should return a valid DeckModel from given JSON", () => {
    // arrange
    let model = DeckModel.jsonToDeckModel(JSON.stringify(deckJson));
    spyOn(model, "toEntity").and.callThrough();
    // act
    let deck = model.toEntity();
    // assert
    expect(model).toBeDefined();
    expect(model instanceof DeckModel).toBeTrue();
    expect(model.deckID).toEqual("abc");
    expect(deck.deckId).toEqual("abc");
  });
  it("should return a valid JSON from given DeckModel", () => {
    // arrange
    // act
    let jsonStr = DeckModel.deckModelToJson(model);
    let resultJson = JSON.parse(jsonStr);
    // assert
    expect(resultJson).toBeDefined();
    expect("deckId" in resultJson).toBeTrue();
    expect("cards" in resultJson).toBeTrue();
    (resultJson.cards as Card[]).forEach(card => {
      expect("cardId" in card).toBeTrue();
      expect("content" in card).toBeTrue();
      expect("cueText" in card.content).toBeTrue();
      expect("shortAnswerText" in card.content).toBeTrue();
      // expect("longAnswerText" in card.details).toBeTrue(); // longAnswerText is optional
    });
  });
});
