import bcrypt from "bcryptjs";

export function createFakeUser(overrides = {}) {
  const baseUser = {
    id: 1,
    firstName: "John",
    lastName: "Doe",
    email: "test@example.com",
    password: bcrypt.hashSync("password123", 10),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  return { ...baseUser, ...overrides };
}
