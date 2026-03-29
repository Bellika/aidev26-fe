describe('Navigation Tests', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should display the home page', () => {
    cy.contains('h1', 'Welcome!').should('be.visible');
    cy.url().should('eq', Cypress.config().baseUrl + '/');
  });

  it('should navigate to create account page', () => {
    cy.contains('a', 'Create Account').click();
    cy.url().should('include', '/create-account');
    cy.contains('h1', 'Create Account').should('be.visible');
  });

  it('should navigate to login page', () => {
    cy.contains('a', 'Login').click();
    cy.url().should('include', '/login');
    cy.contains('h1', 'Login').should('be.visible');
  });

  it('should navigate back to home from login page', () => {
    cy.contains('a', 'Login').click();
    cy.contains('a', 'My App').click();
    cy.url().should('eq', Cypress.config().baseUrl + '/');
  });
});
