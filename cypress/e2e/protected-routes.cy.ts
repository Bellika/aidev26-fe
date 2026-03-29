describe('Protected Routes', () => {
  const testPassword = Cypress.env('testPassword');

  beforeEach(() => {
    cy.visit('/');
  });

  it('should redirect when accessing secret page without login', () => {
    cy.visit('/secret');
    cy.url().should('not.include', '/secret');
  });

  it('should allow access to secret page when logged in', () => {
    const username = `protecteduser${Date.now()}`;
    cy.createAccount(username, testPassword);
    cy.contains('a', 'Secret Page').click();

    cy.url().should('include', '/secret');
    cy.contains('h1', 'Secret Page').should('be.visible');
  });

  it('should redirect after logout when on protected page', () => {
    const username = `protecteduser${Date.now()}`;
    cy.createAccount(username, testPassword);
    cy.contains('a', 'Secret Page').click();
    cy.url().should('include', '/secret');

    cy.contains('button', 'Logout').click();
    cy.contains('a', 'Secret Page').should('not.exist');
  });
});
