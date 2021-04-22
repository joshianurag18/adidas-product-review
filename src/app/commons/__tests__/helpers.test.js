const { getAuditInfo, connectionCheck } = require("../helpers");

const entity = { audit: { createdBy: "user", updatedBy: "user" } };

describe("CITY Service", () => {
  test("getCities should give transformed response", async () => {
    const response = await getAuditInfo(entity);
    expect(response.createdBy).toEqual("user");
    expect(response.updatedBy).toEqual("user");
  });
});

describe("db connection", () => {
  test("connectionCheck should give transformed response", async () => {
    const raw = () => 2;
    const response = await connectionCheck({ raw });
    expect(response).toEqual(2);
  });
});
