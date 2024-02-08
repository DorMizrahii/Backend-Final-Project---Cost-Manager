// tests/costRoutes.test.js
const request = require("supertest");
const app = require("../app"); // Import your Express app

describe("POST /api/addcost", () => {
  it("should add a new cost item and return the added item", async () => {
    const newCostItem = {
      user_id: 123, // Ensure this matches an existing user in your test database
      year: 2024,
      month: "February",
      day: 15,
      description: "Lunch at a restaurant",
      category: "food",
      sum: 30,
    };

    const response = await request(app)
      .post("/api/addcost")
      .send(newCostItem)
      .expect(201);

    // Test to check if the response body has the properties you expect
    expect(response.body.data).toHaveProperty("user_id", newCostItem.user_id);
    expect(response.body.data).toHaveProperty(
      "description",
      newCostItem.description
    );
    expect(response.body).toHaveProperty(
      "message",
      "Cost item added successfully"
    );
  });
});
