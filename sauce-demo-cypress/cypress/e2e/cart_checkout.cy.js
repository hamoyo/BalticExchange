describe('Sauce Demo - Cart and Checkout', () => {
  const baseUrl = 'https://www.saucedemo.com/';

  beforeEach(() => {
    cy.visit(baseUrl);
    cy.get('[data-test="username"]').type('standard_user');
    cy.get('[data-test="password"]').type('secret_sauce');
    cy.get('[data-test="login-button"]').click();
    cy.url().should('include', '/inventory.html');
  });




// Add to Cart & Remove from Cart Test

  it('should add a product to the cart and verify it in the cart page', () => {
    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    cy.get('.shopping_cart_badge').should('contain', '1');
    cy.get('.shopping_cart_link').click();
    cy.url().should('include', '/cart.html');
    cy.get('.cart_item').should('have.length', 1);
    cy.get('.inventory_item_name').should('contain', 'Sauce Labs Backpack');
  });

  it('should remove a product from the cart', () => {
    cy.get('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
    cy.get('.shopping_cart_link').click();
    cy.get('[data-test="remove-sauce-labs-bike-light"]').click();
    cy.get('.cart_item').should('not.exist');
  });




// Complete Checkout – Happy Path

  it('should complete the checkout process successfully', () => {
    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    cy.get('.shopping_cart_link').click();
    cy.get('[data-test="checkout"]').click();

    // Step 1: Customer Info
    cy.get('[data-test="firstName"]').type('John');
    cy.get('[data-test="lastName"]').type('Doe');
    cy.get('[data-test="postalCode"]').type('12345');
    cy.get('[data-test="continue"]').click();

    // Step 2: Overview and Finish
    cy.get('.summary_total_label').should('contain', 'Total');
    cy.get('[data-test="finish"]').click();

    // Confirmation
    cy.get('.complete-header').should('contain', 'Thank you for your order!');
  });




// Checkout with Missing Information

  it('should show error when trying to checkout with missing information', () => {
    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    cy.get('.shopping_cart_link').click();
    cy.get('[data-test="checkout"]').click();

    // Leave all fields empty
    cy.get('[data-test="continue"]').click();
    cy.get('[data-test="error"]').should('contain', 'First Name is required');
  });
  
// Checkout with Missing Items

  it('should show error when trying to checkout with missing items', () => {
    cy.get('.shopping_cart_link').click();
    cy.get('[data-test="checkout"]').click();

    // Step 1: Customer Info
    cy.get('[data-test="firstName"]').type('John');
    cy.get('[data-test="lastName"]').type('Doe');
    cy.get('[data-test="postalCode"]').type('12345');
    cy.get('[data-test="continue"]').click();

    // Step 2: Ensure Total = 0 and click Finish
    cy.get('.summary_total_label').should('contain', 'Total: $0.00');
    cy.get('[data-test="finish"]').click();

    // Confirmation
    cy.get('.complete-header').should('contain', 'No items found in cart to checkout!');

  });

});

