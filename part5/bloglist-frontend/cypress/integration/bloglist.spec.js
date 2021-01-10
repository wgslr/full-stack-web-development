describe("Blog app", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3001/api/testing/reset");
    const user = {
      name: "Testing Tester",
      username: "tester",
      password: "password",
    };
    cy.request("POST", "http://localhost:3001/api/users/", user);
    cy.visit("http://localhost:3000");
  });

  it("Login form is shown", function () {
    cy.contains("username");
    cy.contains("password");
  });

  describe("Login", function () {
    it("succeeds with correct credentials", function () {
      cy.get("#username").type("tester");
      cy.get("#password").type("password");
      cy.get("#login-button").click();
      cy.contains("Logged in as Testing Tester");
    });

    it("fails with wrong username", function () {
      cy.get("#username").type("not tester");
      cy.get("#password").type("password");
      cy.get("#login-button").click();
      cy.get("html").should("not.contain", "Logged in");
    });
  });
});
