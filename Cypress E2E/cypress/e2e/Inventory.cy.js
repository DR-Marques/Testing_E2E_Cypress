describe('Inventory page', () => {
  
  beforeEach(() => {
    cy.Login();
  });

 
  it('TC01 - Open item', () => {
    
    // Select and click "Sauce Labs Backpack" item
    cy.xpath("//div[normalize-space()='Sauce Labs Backpack']").click();

    // Successfully open item by checking URL
    cy.url().should("eq", "https://www.saucedemo.com/v1/inventory-item.html?id=4");
  })


  it('TC02 - Back button', () => {
    
    // Select and click "Sauce Labs Backpack" item
    cy.xpath("//div[normalize-space()='Sauce Labs Backpack']").click();

    // Successfully open item and check URL
    cy.url().should("eq", "https://www.saucedemo.com/v1/inventory-item.html?id=4")

    //Click "Back" button
    cy.xpath("//button[@class='inventory_details_back_button']").click({force:true});

    //Navigate to inventory page by checking URL
    cy.url().should("eq", "https://www.saucedemo.com/v1/inventory.html");
  })


  it('TC03 - Item has correct info', () => {
    
    // Select and click "Sauce Labs Backpack" item
    cy.xpath("//div[normalize-space()='Sauce Labs Backpack']").click();

    // Successfully open item and check URL
    cy.url().should("eq", "https://www.saucedemo.com/v1/inventory-item.html?id=4");

    // Check name and price are correct
    cy.xpath("//div[@class='inventory_details_name']").should('contain', 'Sauce Labs Backpack')
    cy.xpath("//div[@class='inventory_details_price']").should('contain', '29.99')
  })


  it('TC04 - "Z-A" filter reorders items ', () => {
    
    // Click dropdown menu and choose "Name (Z-A) filter"
    cy.xpath("//select[@class='product_sort_container']").select('Name (Z to A)');

    // Check reordered items
    cy.xpath("//div[normalize-space()='Test.allTheThings() T-Shirt (Red)']").first().should('have.text', 'Test.allTheThings() T-Shirt (Red)');  
  })


  it('TC05 - "Low to high" filter reorders items', () => {
    
    // Click dropdown menu and choose "Price (low to high)"
    cy.xpath("//select[@class='product_sort_container']").select('Price (low to high)');

    // Check reordered items
    cy.xpath("//div[normalize-space()='Sauce Labs Onesie']").first().should('have.text', 'Sauce Labs Onesie');
  })
})