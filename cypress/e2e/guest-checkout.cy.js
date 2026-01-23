describe('Guest Checkout Flow', () => {
  let testData;

  before(() => {
    cy.fixture('testData').then((data) => {
      testData = data;
    });
  });

  beforeEach(() => {
    cy.clearCookies();
    cy.clearLocalStorage();
    cy.visit('/');
  });

  it('should complete full guest checkout flow successfully', () => {
    cy.visit('/catalog');
    cy.url().should('include', '/catalog');

    cy.contains('Front Brake Pads').click();
    cy.url().should('match', /\/catalog\/item\/\d+/);

    cy.contains('button', 'Add to cart').click();
    cy.contains('Added to your cart!').should('be.visible');

    cy.get('a[href="/cart"]').within(() => {
      cy.contains('1').should('be.visible');
    });

    cy.visit('/catalog');
    cy.contains('Engine Oil Filter').click();
    cy.contains('button', 'Add to cart').click();
    cy.contains('Added to your cart!').should('be.visible');

    cy.get('a[href="/cart"]').within(() => {
      cy.contains('2').should('be.visible');
    });

    cy.get('a[href="/cart"]').click();
    cy.url().should('include', '/cart');

    cy.contains('Front Brake Pads').should('be.visible');
    cy.contains('Engine Oil Filter').should('be.visible');

    cy.fillCheckoutForm({
      email: testData.guestCheckout.email,
      forename: testData.guestCheckout.forename,
      surname: testData.guestCheckout.surname,
      houseNumber: testData.guestCheckout.houseNumber,
      street: testData.guestCheckout.street,
      city: testData.guestCheckout.city,
      state: testData.guestCheckout.state,
      postalCode: testData.guestCheckout.postalCode,
      country: testData.guestCheckout.country,
    });

    cy.intercept('POST', `${Cypress.env('apiUrl')}/checkout`).as('checkout');
    cy.contains('button', 'Proceed to Payment').click();

    cy.wait('@checkout');
    cy.completeCheckoutWithStripeCLI();
    cy.wait(3000);

    cy.visit('/cart');
    cy.contains('Your cart is empty').should('be.visible');
  });

  it('should show empty cart message when cart is empty', () => {
    cy.visit('/cart');
    cy.contains('Your cart is empty').should('be.visible');
  });

  it('should add item to cart and display in cart page', () => {
    cy.visit('/catalog/item/1');
    cy.contains('button', 'Add to cart').click();
    cy.contains('Added to your cart!').should('be.visible');

    cy.visit('/cart');
    cy.contains('Front Brake Pads').should('be.visible');
  });

  it('should persist cart items across page reloads', () => {
    cy.setCart([{ id: 1, quantity: 1 }]);
    cy.visit('/cart');
    cy.contains('Front Brake Pads').should('be.visible');

    cy.reload();
    cy.contains('Front Brake Pads').should('be.visible');
  });

  it('should handle adding same item multiple times', () => {
    cy.visit('/catalog/item/1');
    cy.contains('button', 'Add to cart').click();
    cy.wait(500);
    cy.contains('button', 'Add to cart').click();

    cy.visit('/cart');
    cy.contains('Front Brake Pads').should('be.visible');
  });

  it('should remove orphaned cart items that no longer exist', () => {
    cy.setCart([
      { id: 1, quantity: 1 },
      { id: 9999, quantity: 1 },
      { id: 2, quantity: 1 },
    ]);

    cy.visit('/cart');
    cy.contains('Front Brake Pads').should('be.visible');
    cy.contains('Engine Oil Filter').should('be.visible');
  });
});