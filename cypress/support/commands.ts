Cypress.Commands.add('login', (username: string, password: string) => {
  cy.visit('/login');
  cy.get('#username').type(username);
  cy.get('#password').type(password);
  cy.get('button[type="submit"]').click();
  cy.url().should('eq', Cypress.config().baseUrl + '/');
});

Cypress.Commands.add('createAccount', (username: string, password: string) => {
  cy.visit('/create-account');
  cy.get('#username').type(username);
  cy.get('#password').type(password);
  cy.get('button[type="submit"]').click();

  // Wait for redirect to login page
  cy.url().should('include', '/login');

  // Now login with the new account
  cy.get('#username').type(username);
  cy.get('#password').type(password);
  cy.get('button[type="submit"]').click();

  // Wait until we're logged in and redirected home
  cy.url().should('eq', Cypress.config().baseUrl + '/');
});
