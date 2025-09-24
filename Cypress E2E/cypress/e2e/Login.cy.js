describe('Login page', () => {
  
  beforeEach(() => {
    cy.loginPage();
  });

  
  it('TC01 - Login with valid credentials', () => {
    
    // Type valid username and password
    cy.get('[data-test="username"]').type('standard_user');
    cy.get('[data-test="password"]').type('secret_sauce');

    // Click "login" button
    cy.get('#login-button').click();

    // Successful login and confirm navigation to inventory page
    cy.url().should("eq", "https://www.saucedemo.com/v1/inventory.html")
  })


  it('TC02 - Login with invalid username', () => {

    // Type invalid username and valid password
    cy.get('[data-test="username"]').type('testUser');
    cy.get('[data-test="password"]').type('secret_sauce');

    // Click "login" button
    cy.get('#login-button').click();

    // Failed login and visible error message
    cy.get('[data-test="error"]').should('be.visible');
  })


  it('TC03 - Login with invalid password', () => {

    // Type valid username and invalid password
    cy.get('[data-test="username"]').type('standard_user');
    cy.get('[data-test="password"]').type('testPassword');

    // Click "login" button
    cy.get('#login-button').click();

    // Failed login and visible error message
    cy.get('[data-test="error"]').should('be.visible');
  })


  it('TC04 - Login without username', () => {

    // Type valid password
    cy.xpath("//input[@id='password']").type('secret_sauce');

    // Click "login" button
    cy.xpath("//input[@id='login-button']").click();

    // Failed login and visible error message
    cy.xpath("//h3[@data-test='error']").should('be.visible');
  })


it('TC05 - Login without password', () => {

    // Type valid username
    cy.xpath("//input[@id='user-name']").type('standar_user');
    
    // Click "login" button
    cy.xpath("//input[@id='login-button']").click();

    // Failed login and visible error message
    cy.xpath("//h3[@data-test='error']").should('be.visible');
  })
})