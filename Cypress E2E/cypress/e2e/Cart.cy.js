describe('Shopping Cart', () => {
  
  beforeEach(() => {
    cy.Login();
  });

  
  it('TC01 - Add item to shopping cart', () => {
    
    // Add "Sauce Labs Backpack" to cart
    cy.xpath("//div[@class='inventory_list']//div[1]//div[3]//button[1]").click();

    // Checks shopping cart has "1" counter
    cy.get('.fa-layers-counter').should('have.text', '1');
  }) 


  it('TC02 - Remove item from shopping cart', () => {
    
    // Add "Sauce Labs Backpack" to cart
    cy.xpath("//div[@class='inventory_list']//div[1]//div[3]//button[1]").click();

    // Click "Shopping cart" button
    cy.xpath("//*[name()='path' and contains(@fill,'currentCol')]").click();

    // Click "Remove" button
    cy.xpath("//button[@class='btn_secondary cart_button']").click();

    // Checks shopping cart has no counters
    cy.get('.fa-layers-counter').should('not.exist');
  }) 


  it('TC03 - "Continue shopping" button', () => {
    
    // Add "Sauce Labs Backpack" to cart
    cy.xpath("//div[@class='inventory_list']//div[1]//div[3]//button[1]").click();

    // Click "Shopping cart" button
    cy.xpath("//*[name()='path' and contains(@fill,'currentCol')]").click();

    // Click "Continue shopping" button
    cy.xpath("//a[@class='btn_secondary']").click();

    // Successfully navigates to inventory page and shopping cart keeps 1 item
    cy.url().should("eq", "https://www.saucedemo.com/v1/inventory.html");
    cy.get('.fa-layers-counter').should('have.text', '1');
  })


  it('TC04 - Successful checkout 1 item', () => {
    
    // Add "Sauce Labs Backpack" to cart
    cy.xpath("//div[@class='inventory_list']//div[1]//div[3]//button[1]").click();

    // Click "Shopping cart" button
    cy.xpath("//*[name()='path' and contains(@fill,'currentCol')]").click();

    // Click "Checkout" button
    cy.xpath("//a[@class='btn_action checkout_button']").click();

    // Fill information fields
    cy.xpath("//input[@id='first-name']").type('first');
    cy.xpath("//input[@id='last-name']").type('last');
    cy.xpath("//input[@id='postal-code']").type('1234-567');

    // Click "Continue" button
    cy.xpath("//input[@value='CONTINUE']").click();

    // Click "Finish" button
    cy.xpath("//a[@class='btn_action cart_button']").click();

    // Successfully checks out and confirm URL
    cy.url().should("eq", "https://www.saucedemo.com/v1/checkout-complete.html");
  })


  it('TC05 - Checkout without filling personal information fields', () => {
    
    // Add "Sauce Labs Backpack" to cart
    cy.xpath("//div[@class='inventory_list']//div[1]//div[3]//button[1]").click();

    // Click "Shopping cart" button
    cy.xpath("//*[name()='path' and contains(@fill,'currentCol')]").click();

    // Click "Checkout" button
    cy.xpath("//a[@class='btn_action checkout_button']").click();

    // Click "Continue" button
    cy.xpath("//input[@value='CONTINUE']").click();

    // Failed checkout and error message
    cy.xpath("//h3[@data-test='error']").should('be.visible');
  })
})