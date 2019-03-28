const APIResponse = require("../index");
describe("API Response", () => {
  test("Should be able to format the error", async () => {
    let apiResponse = new APIResponse();
    let err = new Error();
    apiResponse.addError(err);
    let resp = apiResponse.serialize();
    expect(resp.errors.length).toEqual(1);
    expect(resp.errors).toContainEqual({
      code: "UNKNOWN",
      message: err.stack
    });

    apiResponse.addError({
      code: "test",
      message: "test"
    });
    expect(resp.errors.length).toEqual(2);
    expect(resp.errors).toContainEqual({
      code: "UNKNOWN",
      message: err.stack
    });
    expect(resp.errors).toContainEqual({
      code: "test",
      message: "test"
    });
  });

  test("Should be able to format success response", async () => {
    let apiResponse = new APIResponse();
    apiResponse.data = {
      test: true
    };
    let resp = apiResponse.serialize();
    expect(resp.item).toEqual({
      test: true
    });

    apiResponse.data = [{ test: true }, { test: false }];
    resp = apiResponse.serialize();
    expect(resp.items.length).toEqual(2);
    expect(resp.items).toContainEqual({ test: true });
    expect(resp.items).toContainEqual({ test: false });
  });

  test("Should be able to format api gateway response", async () => {
    let apiResponse = new APIResponse();
    apiResponse.data = {
      test: true
    };
    let resp = apiResponse.apiGateway().serialize(200, { headers: "true" });
    expect(resp).toEqual({
      statusCode: 200,
      headers: { headers: "true" },
      body: JSON.stringify({
        item: {
          test: true
        }
      })
    });
  });
});
