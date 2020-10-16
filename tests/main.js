import assert from "assert";

describe("phone2action", function () {
    it("package.json has correct name", async function () {
        const { name } = await import("../package.json");
        assert.strictEqual(name, "phone2action");
    })
});
