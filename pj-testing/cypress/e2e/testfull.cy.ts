// cypress/e2e/testfull.cy.ts
describe("Fullstack: API -> UI -> API verification", () => {
  const BE = Cypress.env("BACKEND_URL");
  const FE = Cypress.env("FRONTEND_URL");
  const email = `full${Date.now()}@example.com`;
  const password = "123456";

  const backendSubject = "BE-Subject";
  const backendTask = "BE-Task";

  before(() => {
    // start clean
    cy.request("POST", `${BE}/reset`).its("status").should("eq", 200);

    // create user & login by API
    cy.request("POST", `${BE}/signup`, { email, password }).its("status").should("eq", 201);
    cy.request("POST", `${BE}/login`, { email, password }).then((res) => {
      expect(res.body).to.have.property("token");
      Cypress.env("token", res.body.token);
    });

    // create subject & task on backend
    cy.request({
      method: "POST",
      url: `${BE}/subjects`,
      headers: { Authorization: `Bearer ${Cypress.env("token")}` },
      body: { name: backendSubject },
    }).then((res) => {
      Cypress.env("subjectIdBE", res.body.id);
      expect(res.status).to.eq(201);
    });

    cy.request({
      method: "POST",
      url: `${BE}/tasks`,
      headers: { Authorization: `Bearer ${Cypress.env("token")}` },
      body: { subjectId: Cypress.env("subjectIdBE"), name: backendTask },
    }).its("status").should("eq", 201);
  });

  it("UI shows items created by API", () => {
    cy.visit(FE);

    // login via UI
    cy.get("[data-cy='login-email']").type(email);
    cy.get("[data-cy='login-password']").type(password);
    cy.get("[data-cy='login-submit']").click();
    cy.contains("Logout", { timeout: 5000 }).should("be.visible");

    // confirm subject & task from backend present on UI
    cy.contains(backendSubject, { timeout: 3000 }).should("be.visible");
    cy.contains(backendTask, { timeout: 3000 }).should("be.visible");
  });

  it("UI create subject/task -> verify by API", () => {
    const uiSubject = `UI-Subject-${Date.now()}`;
    const uiTask = `UI-Task-${Date.now()}`;

    // create subject via UI
    cy.get("[data-cy='subject-input']").clear().type(uiSubject);
    cy.get("[data-cy='subject-submit']").click();
    cy.contains(uiSubject, { timeout: 3000 }).should("be.visible");

    // create task via UI under that subject
    cy.contains(uiSubject).parent().within(() => {
      cy.get("[data-cy='task-input']").clear().type(uiTask);
      cy.get("[data-cy='task-submit']").click();
    });
    cy.contains(uiTask, { timeout: 3000 }).should("be.visible");

    // verify via API - subjects list contains uiSubject
    cy.request({
      method: "GET",
      url: `${BE}/subjects`,
      headers: { Authorization: `Bearer ${Cypress.env("token")}` },
    }).then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body.some((s: any) => s.name === uiSubject)).to.be.true;
    });

    // verify via API - tasks list contains uiTask (adjust endpoint if your API filters by subject)
    cy.request({
      method: "GET",
      url: `${BE}/tasks`,
      headers: { Authorization: `Bearer ${Cypress.env("token")}` },
    }).then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body.some((t: any) => t.name === uiTask)).to.be.true;
    });
  });

  it("UI delete -> verify removed via API", () => {
    const deletable = "TempToDelete";
    // create via UI
    cy.get("[data-cy='subject-input']").clear().type(deletable);
    cy.get("[data-cy='subject-submit']").click();
    cy.contains(deletable).should("be.visible");

    // delete via UI
    cy.contains(deletable).parent().find("[data-cy='subject-delete']").click();
    cy.contains(deletable).should("not.exist");

    // verify via API subjects list no longer contains it
    cy.request({
      method: "GET",
      url: `${BE}/subjects`,
      headers: { Authorization: `Bearer ${Cypress.env("token")}` },
    }).then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body.some((s: any) => s.name === deletable)).to.be.false;
    });
  });
});
