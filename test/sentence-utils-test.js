import assert from "power-assert";
import splitSentences from "../src/sentence-splitter";
describe("sentence-utils", function () {
    it("should return array", function () {
        let sentences = splitSentences("text");
        assert.equal(sentences.length, 1);
        let sentence = sentences[0];
        assert.strictEqual(sentence.raw, "text");
        assert.deepEqual(sentences[0].loc.start, {line: 1, column: 0});
        assert.deepEqual(sentences[0].loc.end, {line: 1, column: 4});
    });
    it("should return sentences split by line break*2", function () {
        let sentences = splitSentences("text\n\ntext");
        assert.equal(sentences.length, 2);
        var sentence0 = sentences[0];
        assert.strictEqual(sentence0.raw, "text\n\n");
        assert.deepEqual(sentence0.loc.start, {line: 1, column: 0});
        assert.deepEqual(sentence0.loc.end, {line: 3, column: 0});
        var sentence1 = sentences[1];
        assert.strictEqual(sentence1.raw, "text");
        assert.deepEqual(sentence1.loc.start, {line: 3, column: 0});
        assert.deepEqual(sentence1.loc.end, {line: 3, column: 4});
    });
    it("should return sentences split by 。", function () {
        let sentences = splitSentences("text。。text");
        assert.equal(sentences.length, 2);
        var sentence0 = sentences[0];
        assert.strictEqual(sentence0.raw, "text。。");
        assert.deepEqual(sentence0.loc.start, {line: 1, column: 0});
        assert.deepEqual(sentence0.loc.end, {line: 1, column: 6});
        var sentence1 = sentences[1];
        assert.strictEqual(sentence1.raw, "text");
        assert.deepEqual(sentence1.loc.start, {line: 1, column: 6});
        assert.deepEqual(sentence1.loc.end, {line: 1, column: 10});
    });
    it("should return sentences split by 。 and linebreak", function () {
        let sentences = splitSentences("text。\ntext");
        assert.equal(sentences.length, 2);
        var sentence0 = sentences[0];
        assert.strictEqual(sentence0.raw, "text。\n");
        assert.deepEqual(sentence0.loc.start, {line: 1, column: 0});
        assert.deepEqual(sentence0.loc.end, {line: 2, column: 0});
        var sentence1 = sentences[1];
        assert.strictEqual(sentence1.raw, "text");
        assert.deepEqual(sentence1.loc.start, {line: 2, column: 0});
        assert.deepEqual(sentence1.loc.end, {line: 2, column: 4});
    });
    it("should return sentences split by !?", function () {
        let sentences = splitSentences("text!?text");
        assert.equal(sentences.length, 2);
        var sentence0 = sentences[0];
        assert.strictEqual(sentence0.raw, "text!?");
        assert.deepEqual(sentence0.loc.start, {line: 1, column: 0});
        assert.deepEqual(sentence0.loc.end, {line: 1, column: 6});
        var sentence1 = sentences[1];
        assert.strictEqual(sentence1.raw, "text");
        assert.deepEqual(sentence1.loc.start, {line: 1, column: 6});
        assert.deepEqual(sentence1.loc.end, {line: 1, column: 10});
    });
});