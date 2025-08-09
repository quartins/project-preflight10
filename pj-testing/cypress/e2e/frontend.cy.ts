// before(() => {
//   const url = Cypress.env("BACKEND_URL");
//   cy.request({
//     method: "POST",
//     url: `${url}/todo/all`,
//   });
// });

// describe("Frontend", () => {
//   it("connects", () => {
//     const url = Cypress.env("FRONTEND_URL");
//     cy.visit(url);
//   });
//   it("creates todo", () => {
//     const url = Cypress.env("FRONTEND_URL");
//     const text = new Date().getTime().toString();
//     cy.visit(url);
//     cy.get("[data-cy='input-text']").type(text);
//     cy.get("[data-cy='submit']").click();
//     cy.contains(text);
//   });

//   it("deletes todo", () => {
//     const url = Cypress.env("FRONTEND_URL");

//     const text = new Date().getTime().toString();
//     cy.visit(url);
//     cy.get("[data-cy='input-text']").type(text);
//     cy.get("[data-cy='submit']").click();
//     cy.get("[data-cy='todo-item-wrapper']")
//       .contains(text)
//       .parent()
//       .within(() => {
//         cy.get("[data-cy='todo-item-delete']").click();
//       });
//     cy.contains(text).should("not.exist");
//   });

//   it("updates todo", () => {
//     const url = Cypress.env("FRONTEND_URL");

//     const text = new Date().getTime().toString();
//     const textUpdated = "123456";
//     cy.visit(url);
//     cy.get("[data-cy='input-text']").type(text);
//     cy.get("[data-cy='submit']").click();
//     cy.get("[data-cy='todo-item-wrapper']")
//       .contains(text)
//       .parent()
//       .within(() => {
//         cy.get("[data-cy='todo-item-update']").click();
//       });
//     cy.get("[data-cy='input-text']").clear().type(textUpdated);
//     cy.get("[data-cy='submit']").click();
//     cy.contains(textUpdated);
//     cy.contains(text).should("not.exist");
//   });
// });


describe("Frontend UI", () => {
  const FE = Cypress.env("FRONTEND_URL");
  const email = `test${Date.now()}@example.com`;
  const password = "123456";

  it("registers and logs in", () => {
    cy.visit(Cypress.env("FRONTEND_URL"));
    cy.contains("Signup").click();
    cy.get("[data-cy='signup-email']").type(email);
    cy.get("[data-cy='signup-password']").type(password);
    cy.get("[data-cy='signup-submit']").click();
    cy.contains("Logout"); // หมายถึง login สำเร็จ
  });

  it("creates a subject", () => {
    cy.get("[data-cy='subject-input']").type("Math");
    cy.get("[data-cy='subject-submit']").click();
    cy.contains("Math");
  });

  it("creates a task", () => {
    cy.get("[data-cy='task-input']").type("Homework 1");
    cy.get("[data-cy='task-submit']").click();
    cy.contains("Homework 1");
  });

  it("updates a task", () => {
    cy.contains("Homework 1").parent().find("[data-cy='task-edit']").click();
    cy.get("[data-cy='task-input']").clear().type("Homework 1 Updated");
    cy.get("[data-cy='task-submit']").click();
    cy.contains("Homework 1 Updated");
  });

  it("deletes a task", () => {
    cy.contains("Homework 1 Updated").parent().find("[data-cy='task-delete']").click();
    cy.contains("Homework 1 Updated").should("not.exist");
  });

  it("deletes a subject", () => {
    cy.contains("Math").parent().find("[data-cy='subject-delete']").click();
    cy.contains("Math").should("not.exist");
  });
});
