const extractLogTrace = require("../extractLogTrace");

describe("Extract log trace", () => {
  const next = jest.fn();
  const headers = {
    "x-b3-flags": 111,
    "x-b3-parentspanid": 112,
    "x-b3-sampled": 113,
    "x-b3-spanid": 114,
    "x-b3-traceid": 115,
    "x-ot-span-context": 116,
    "x-request-id": 117
  };
  const request = {
    headers
  };

  it("should extract trace headers and keep it request object", () => {
    extractLogTrace(request, {}, next);

    const expectedResult = { ...headers };
    expect(request.logTrace).toEqual(expectedResult);
  });
});
