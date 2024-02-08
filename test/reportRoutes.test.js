// tests/reportRoutes.test.js
const request = require("supertest");
const app = require("../app"); // Make sure this path is correct

describe("GET /api/report", () => {
  it("should return a report with all categories for a specific user, month, and year", async () => {
    const queryParams = {
      user_id: 123, // Ensure this matches an existing user in your test database
      month: "February",
      year: 2024,
    };

    const response = await request(app)
      .get("/api/report")
      .query(queryParams)
      .expect(200);

    // Check for the structure of the report
    expect(response.body).toHaveProperty("food");
    expect(response.body).toHaveProperty("health");
    expect(response.body).toHaveProperty("housing");
    expect(response.body).toHaveProperty("sport");
    expect(response.body).toHaveProperty("education");
    expect(response.body).toHaveProperty("transportation");
    expect(response.body).toHaveProperty("other");

    // Optionally, check if the 'food' category contains expected items
    // This assumes you have pre-populated the database with known test data
    expect(response.body.food).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          day: 21,
          description: "chocolate in ikea",
          sum: 20,
        }),
        expect.objectContaining({ day: 5, description: "milk", sum: 6 }),
      ])
    );
  });
});
