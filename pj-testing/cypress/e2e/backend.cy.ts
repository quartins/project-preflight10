// before(() => {
//   const url = Cypress.env("BACKEND_URL");
//   cy.request({
//     method: "POST",
//     url: `${url}/todo/all`,
//   });
// });

// describe("Backend", () => {
//   it("checks env", () => {
//     cy.log(JSON.stringify(Cypress.env()));
//   });

//   it("checks CORS disabled", () => {
//     const url = Cypress.env("BACKEND_URL");
//     cy.request({
//       method: "GET",
//       url: `${url}/todo`,
//     }).then((res) => {
//       // cy.log(JSON.stringify(res));
//       expect(res.headers).to.not.have.property("access-control-allow-origin");
//     });
//   });

//   it("checks get response", () => {
//     const url = Cypress.env("BACKEND_URL");
//     cy.request({
//       method: "GET",
//       url: `${url}/todo`,
//     }).then((res) => {
//       expect(res.body).to.be.a("array");
//     });
//   });

//   it("creates todo", () => {
//     const url = Cypress.env("BACKEND_URL");
//     cy.request({
//       method: "PUT",
//       url: `${url}/todo`,
//       body: {
//         todoText: "New Todo",
//       },
//     }).then((res) => {
//       cy.log(JSON.stringify(res.body));
//       expect(res.body).to.have.all.keys("msg", "data");
//       expect(res.body.data).to.all.keys("id", "todoText");
//     });
//   });

//   it("deletes todo", () => {
//     const url = Cypress.env("BACKEND_URL");

//     cy.request({
//       method: "PUT",
//       url: `${url}/todo`,
//       body: {
//         todoText: "New Todo",
//       },
//     }).then((res) => {
//       const todo = res.body.data;
//       cy.request({
//         method: "DELETE",
//         url: `${url}/todo`,
//         body: {
//           id: todo.id,
//         },
//       }).then((res) => {
//         cy.log(JSON.stringify(res.body));
//         expect(res.body).to.have.all.keys("msg", "data");
//         expect(res.body.data).to.all.keys("id");
//       });
//     });
//   });

//   it("updates todo", () => {
//     const url = Cypress.env("BACKEND_URL");

//     cy.request({
//       method: "PUT",
//       url: `${url}/todo`,
//       body: {
//         todoText: "New Todo",
//       },
//     }).then((res) => {
//       const todo = res.body.data;
//       cy.wrap(todo.id).as("currentId"); // Storing id for using later in the chain
//       cy.request({
//         method: "PATCH",
//         url: `${url}/todo`,
//         body: {
//           id: todo.id,
//           todoText: "Updated Text",
//         },
//       }).then((res) => {
//         cy.request({
//           method: "GET",
//           url: `${url}/todo`,
//         }).then(function (res) {
//           // Notice that arrow function is not used here due to "this" issue
//           const currentId = this.currentId; // Get value from context
//           const todos = res.body;
//           const todo = todos.find((el: any) => el.id === currentId);
//           expect(todo.todoText).to.equal("Updated Text");
//         });
//       });
//     });
//   });
// });



// //test pf-pj
// before(() => {
//   const url = Cypress.env("BACKEND_URL");
//   // ล้างข้อมูลทั้งหมด
//   cy.request("POST", `${url}/reset`);
// });

// describe("Backend API", () => {
//   let token: string;
//   let subjectId: number;
//   let taskId: number;

//   it("registers a user", () => {
//     const url = Cypress.env("BACKEND_URL");
//     cy.request("POST", `${url}/auth/signup`, {
//       email: Cypress.env("TEST_USER_EMAIL"),
//       password: Cypress.env("TEST_USER_PASSWORD"),
//     }).its("status").should("eq", 201);
//   });

//   it("logs in a user", () => {
//     const url = Cypress.env("BACKEND_URL");
//     cy.request("POST", `${url}/auth/login`, {
//       email: Cypress.env("TEST_USER_EMAIL"),
//       password: Cypress.env("TEST_USER_PASSWORD"),
//     }).then((res) => {
//       expect(res.status).to.eq(200);
//       token = res.body.token;
//     });
//   });

//   it("creates a subject", () => {
//     const url = Cypress.env("BACKEND_URL");
//     cy.request({
//       method: "POST",
//       url: `${url}/subjects`,
//       headers: { Authorization: `Bearer ${token}` },
//       body: { name: "Math" },
//     }).then((res) => {
//       expect(res.status).to.eq(201);
//       subjectId = res.body.id;
//     });
//   });

//   it("creates a task for the subject", () => {
//     const url = Cypress.env("BACKEND_URL");
//     cy.request({
//       method: "POST",
//       url: `${url}/tasks`,
//       headers: { Authorization: `Bearer ${token}` },
//       body: { subjectId, name: "Homework 1" },
//     }).then((res) => {
//       expect(res.status).to.eq(201);
//       taskId = res.body.id;
//     });
//   });

//   it("updates the task", () => {
//     const url = Cypress.env("BACKEND_URL");
//     cy.request({
//       method: "PATCH",
//       url: `${url}/tasks/${taskId}`,
//       headers: { Authorization: `Bearer ${token}` },
//       body: { name: "Homework 1 Updated" },
//     }).its("status").should("eq", 200);
//   });

//   it("deletes the task", () => {
//     const url = Cypress.env("BACKEND_URL");
//     cy.request({
//       method: "DELETE",
//       url: `${url}/tasks/${taskId}`,
//       headers: { Authorization: `Bearer ${token}` },
//     }).its("status").should("eq", 200);
//   });

//   it("deletes the subject", () => {
//     const url = Cypress.env("BACKEND_URL");
//     cy.request({
//       method: "DELETE",
//       url: `${url}/subjects/${subjectId}`,
//       headers: { Authorization: `Bearer ${token}` },
//     }).its("status").should("eq", 200);
//   });
// });

//test pf-pj

describe("Backend API - StudyPlan", () => {
  const BE = Cypress.env("BACKEND_URL");
  const email = `test${Date.now()}@example.com`;
  const password = "123456";

  before(() => {
    // reset DB
    cy.request("POST", `${BE}/reset`).its("status").should("eq", 200);
  });

  it("signup and login (returns token)", () => {
    cy.request("POST", `${BE}/signup`, { email, password }).its("status").should("eq", 201);

    cy.request("POST", `${BE}/login`, { email, password }).then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body).to.have.property("token");
      Cypress.env("token", res.body.token);
    });
  });

  it("protected endpoints reject no-token", () => {
    cy.request({
      method: "POST",
      url: `${BE}/subjects`,
      body: { name: "NoAuth" },
      failOnStatusCode: false,
    }).then((res) => {
      // adjust expected code if your backend returns 401 or 403
      expect([401, 403]).to.include(res.status);
    });
  });

  it("create / list subject", () => {
    cy.request({
      method: "POST",
      url: `${BE}/subjects`,
      headers: { Authorization: `Bearer ${Cypress.env("token")}` },
      body: { name: "Math" },
    }).then((res) => {
      expect(res.status).to.eq(201);
      expect(res.body).to.have.property("id");
      expect(res.body).to.have.property("name", "Math");
      Cypress.env("subjectId", res.body.id);
    });

    cy.request({
      method: "GET",
      url: `${BE}/subjects`,
      headers: { Authorization: `Bearer ${Cypress.env("token")}` },
    }).then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body).to.be.an("array");
      expect(res.body.some((s: any) => s.name === "Math")).to.be.true;
    });
  });

  it("create / update / delete task", () => {
    const subjectId = Cypress.env("subjectId");

    // create task
    cy.request({
      method: "POST",
      url: `${BE}/tasks`,
      headers: { Authorization: `Bearer ${Cypress.env("token")}` },
      body: { subjectId, name: "Homework" },
    }).then((res) => {
      expect(res.status).to.eq(201);
      expect(res.body).to.have.property("id");
      expect(res.body).to.have.property("name", "Homework");
      expect(res.body).to.have.property("subjectId", subjectId);
      Cypress.env("taskId", res.body.id);
    });

    // update task
    cy.request({
      method: "PATCH",
      url: `${BE}/tasks/${Cypress.env("taskId")}`,
      headers: { Authorization: `Bearer ${Cypress.env("token")}` },
      body: { name: "Homework Updated" },
    }).its("status").should("eq", 200);

    // optional: try create task with invalid subjectId -> expect 400/404
    cy.request({
      method: "POST",
      url: `${BE}/tasks`,
      headers: { Authorization: `Bearer ${Cypress.env("token")}` },
      body: { subjectId: 9999999, name: "Bad" },
      failOnStatusCode: false,
    }).then((res) => {
      // if your backend returns 400 or 404, include them here; otherwise adjust
      expect([400, 404]).to.include(res.status);
    });

    // delete task
    cy.request({
      method: "DELETE",
      url: `${BE}/tasks/${Cypress.env("taskId")}`,
      headers: { Authorization: `Bearer ${Cypress.env("token")}` },
    }).its("status").should("eq", 200);
  });

  it("delete subject", () => {
    cy.request({
      method: "DELETE",
      url: `${BE}/subjects/${Cypress.env("subjectId")}`,
      headers: { Authorization: `Bearer ${Cypress.env("token")}` },
    }).its("status").should("eq", 200);
  });
});
