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

  describe.only("When logged in", function () {
    beforeEach(function () {
      cy.request("POST", "http://localhost:3001/api/login", {
        username: "tester",
        password: "password",
      }).then((response) => {
        localStorage.setItem("user", JSON.stringify(response.body));
        cy.visit("http://localhost:3000");
      });
    });

    it("A blog can be created", function () {
      cy.contains("Add blog").click();
      cy.get("#titleInput").type("new title");
      cy.get("#authorInput").type("new author");
      cy.get("#urlInput").type("/new/url");
      cy.contains("Create").click();
      cy.get("#blog-list").contains("new title new author");
    });
  });
});
