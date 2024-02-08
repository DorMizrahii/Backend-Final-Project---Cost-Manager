const request = require("supertest");
const app = require("./app");
const { MongoMemoryServer } = require("mongodb-memory-server");

let mongoServer;

beforeAll(async () => {
  mongoServer = new MongoMemoryServer();
  const mongoUri = await mongoServer.getUri();
  process.env.MONGO_URI = mongoUri;
});

afterAll(async () => {
  await mongoServer.stop();
});

beforeEach(async () => {
  const db = await mongoServer.getDb();
  // Add logic to reset the database or perform other setup tasks
  // For example, you can delete all documents from your collections
  await db.collection("yourCollectionName").deleteMany({});
});

describe("GET /api/get-report", () => {
  test("gets the report successfully", async () => {
    // Your test logic
  });

  test("returns an error for missing parameters", async () => {
    // Your test logic
  });
});
