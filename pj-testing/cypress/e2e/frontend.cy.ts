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


// cypress/e2e/frontend.cy.ts
// cypress/e2e/frontend.cy.ts

describe("Frontend UI - Study Plan App", () => {
  const FE = Cypress.env("FRONTEND_URL");
  const email = `test${Date.now()}@example.com`;
  const password = "123456";

  before(() => {
    // เข้าเว็บก่อนเริ่มเทส
    cy.visit(FE);
  });

  it("should allow user signup and login", () => {
    cy.contains("Signup").click();

    cy.get("[data-cy='signup-email']").should("be.visible").type(email);
    cy.get("[data-cy='signup-password']").should("be.visible").type(password);
    cy.get("[data-cy='signup-submit']").click();

    // รอจนเห็นปุ่ม Logout แสดงว่าล็อกอินสำเร็จ
    cy.contains("Logout", { timeout: 5000 }).should("be.visible");
  });

  it("should create a subject", () => {
    cy.get("[data-cy='subject-input']").should("be.visible").type("Math");
    cy.get("[data-cy='subject-submit']").click();

    cy.contains("Math").should("exist");
  });

  it("should create a task under the subject", () => {
    cy.get("[data-cy='task-input']").should("be.visible").type("Homework 1");
    cy.get("[data-cy='task-submit']").click();

    cy.contains("Homework 1").should("exist");
  });

  it("should update a task", () => {
    cy.contains("Homework 1").parent().find("[data-cy='task-edit']").click();

    cy.get("[data-cy='task-input']").clear().type("Homework 1 Updated");
    cy.get("[data-cy='task-submit']").click();

    cy.contains("Homework 1 Updated").should("exist");
  });

  it("should delete a task", () => {
    cy.contains("Homework 1 Updated")
      .parent()
      .find("[data-cy='task-delete']")
      .click();

    cy.contains("Homework 1 Updated").should("not.exist");
  });

  it("should delete a subject", () => {
    cy.contains("Math")
      .parent()
      .find("[data-cy='subject-delete']")
      .click();

    cy.contains("Math").should("not.exist");
  });

  it("should logout successfully", () => {
    cy.contains("Logout").click();
    cy.contains("Login").should("be.visible");
  });
});
