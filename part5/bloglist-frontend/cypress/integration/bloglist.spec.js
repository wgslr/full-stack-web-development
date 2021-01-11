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

  describe("When logged in", function () {
    beforeEach(function () {
      cy.request("POST", "http://localhost:3001/api/login", {
        username: "tester",
        password: "password",
      }).then((response) => {
        const user = response.body;
        localStorage.setItem("user", JSON.stringify(user));
        cy.request({
          method: "POST",
          url: "http://localhost:3001/api/blogs",
          body: {
            title: "Old Blog",
            author: "Old Author",
            likes: 3,
            url: "/old/url",
          },
          auth: { bearer: user.token },
        });
      });

      cy.visit("http://localhost:3000");
    });

    it("A blog can be created", function () {
      cy.contains("Add blog").click();
      cy.get("#titleInput").type("new title");
      cy.get("#authorInput").type("new author");
      cy.get("#urlInput").type("/new/url");
      cy.contains("Create").click();
      cy.get("#blog-list").contains("new title new author");
    });

    it("A blog can be liked", function () {
      cy.contains("View").click();
      cy.contains("3 likes");
      cy.contains("Like").click();
      cy.contains("4 likes");
    });
  });
});
