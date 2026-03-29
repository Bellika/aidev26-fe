describe('Authentication Flow', () => {
  const testPassword = 'password123';

  beforeEach(() => {
    cy.visit('/');
  });

  describe('Create Account', () => {
    it('should create a new account successfully', () => {
      const username = `testuser${Date.now()}`;

      cy.visit('/create-account');
      cy.get('#username').type(username);
      cy.get('#password').type(testPassword);
      cy.get('button[type="submit"]').click();

      cy.url().should('include', '/login');
      cy.contains('h1', 'Login').should('be.visible');
    });

    it('should show validation error for short username', () => {
      cy.visit('/create-account');
      cy.get('#username').type('ab');
      cy.get('#password').type('password123');
      cy.get('button[type="submit"]').click();

      cy.contains('Username must be between 3 and 50 characters').should('be.visible');
    });

    it('should show validation error for short password', () => {
      cy.visit('/create-account');
      cy.get('#username').type('validuser');
      cy.get('#password').type('12345');
      cy.get('button[type="submit"]').click();

      cy.contains('Password must be at least 6 characters').should('be.visible');
    });
  });

  describe('Login', () => {
    it('should login successfully with valid credentials', () => {
      const username = `testuser${Date.now()}`;
      cy.createAccount(username, testPassword);

      cy.contains('.welcome', `Welcome, ${username}`).should('be.visible');
      cy.contains('button', 'Logout').should('be.visible');
      cy.contains(`You are logged in as:`).should('be.visible');
      cy.contains('strong', username).should('be.visible');
    });

    it('should show error for invalid credentials', () => {
      cy.visit('/login');
      cy.get('#username').type('nonexistentuser');
      cy.get('#password').type('wrongpassword');
      cy.get('button[type="submit"]').click();

      cy.contains('Invalid username or password').should('be.visible');
    });
  });

  describe('Logout', () => {
    it('should logout successfully', () => {
      const username = `testuser${Date.now()}`;
      cy.createAccount(username, testPassword);
      cy.contains('button', 'Logout').click();

      cy.contains('a', 'Login').should('be.visible');
      cy.contains('a', 'Create Account').should('be.visible');
      cy.contains('button', 'Logout').should('not.exist');

      cy.visit('/');
      cy.contains('Welcome! Please create an account or login to continue.').should('be.visible');
    });
  });
});
