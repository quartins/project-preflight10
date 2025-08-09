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
before(() => {
  const url = Cypress.env("BACKEND_URL");
  // ล้างข้อมูลทั้งหมด
  cy.request("POST", `${url}/reset`);
});

describe("Backend API", () => {
  const url = Cypress.env("BACKEND_URL");
  let token: string;
  let subjectId: number;
  let taskId: number;

  it("registers and logs in user", () => {
    const email = `test${Date.now()}@example.com`;
    const password = "123456";

    cy.request("POST", `${url}/signup`, { email, password }).its("status").should("eq", 201);

    cy.request("POST", `${url}/login`, { email, password }).then((res) => {
      expect(res.body).to.have.property("token");
      token = res.body.token;
    });
  });

  it("creates subject", () => {
    cy.request({
      method: "POST",
      url: `${url}/subjects`,
      headers: { Authorization: `Bearer ${token}` },
      body: { name: "Math" },
    }).then((res) => {
      subjectId = res.body.id;
      expect(res.body).to.have.property("name", "Math");
    });
  });

  it("gets subject list", () => {
    cy.request({
      method: "GET",
      url: `${url}/subjects`,
      headers: { Authorization: `Bearer ${token}` },
    }).its("status").should("eq", 200);
  });

  it("creates task", () => {
    cy.request({
      method: "POST",
      url: `${url}/tasks`,
      headers: { Authorization: `Bearer ${token}` },
      body: { subjectId, name: "Homework" },
    }).then((res) => {
      taskId = res.body.id;
      expect(res.body).to.have.property("name", "Homework");
    });
  });

  it("updates task", () => {
    cy.request({
      method: "PATCH",
      url: `${url}/tasks/${taskId}`,
      headers: { Authorization: `Bearer ${token}` },
      body: { name: "Updated Homework" },
    }).its("status").should("eq", 200);
  });

  it("deletes task", () => {
    cy.request({
      method: "DELETE",
      url: `${url}/tasks/${taskId}`,
      headers: { Authorization: `Bearer ${token}` },
    }).its("status").should("eq", 200);
  });
});