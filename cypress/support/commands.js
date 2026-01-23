Cypress.Commands.add('login', (email, password) => {
  cy.request({
    method: 'POST',
    url: `${Cypress.env('apiUrl')}/auth/login`,
    body: { email, password },
    failOnStatusCode: false,
  }).then((response) => {
    expect(response.status).to.eq(200);
  });
});

Cypress.Commands.add('logout', () => {
  cy.request({
    method: 'POST',
    url: `${Cypress.env('apiUrl')}/auth/logout`,
    failOnStatusCode: false,
  });
  cy.clearCookies();
  cy.clearLocalStorage();
});

Cypress.Commands.add('register', (userData) => {
  return cy.request({
    method: 'POST',
    url: `${Cypress.env('apiUrl')}/auth/register`,
    body: userData,
  });
});

Cypress.Commands.add('clearCart', () => {
  cy.clearLocalStorage('cart');
});

Cypress.Commands.add('addToCart', (partId) => {
  cy.visit(`/catalog/item/${partId}`);
  cy.contains('button', 'Add to cart').click();
  cy.get('[role="status"]').contains('Added to your cart!').should('be.visible');
});

Cypress.Commands.add('setCart', (items) => {
  cy.window().then((win) => {
    const cartData = items.map(item => ({
      id: item.id,
      quantity: item.quantity || 1
    }));
    win.localStorage.setItem('cart', JSON.stringify(cartData));
  });
});

Cypress.Commands.add('fillCheckoutForm', (formData) => {
  cy.get('input[id="email"]').clear().type(formData.email);
  cy.get('input[id="forename"]').clear().type(formData.forename);
  cy.get('input[id="surname"]').clear().type(formData.surname);
  cy.get('input[id="houseNumber"]').clear().type(formData.houseNumber);
  cy.get('input[id="street"]').clear().type(formData.street);
  cy.get('input[id="city"]').clear().type(formData.city);
  cy.get('input[id="state"]').clear().type(formData.state);
  cy.get('input[id="postalCode"]').clear().type(formData.postalCode);
  cy.get('input[id="country"]').clear().type(formData.country);
});

Cypress.Commands.add('waitForStripeRedirect', () => {
  cy.url({ timeout: 20000 }).should('include', 'checkout.stripe.com');
});

Cypress.Commands.add('completeStripePayment', () => {
  cy.origin('https://checkout.stripe.com', () => {
    cy.contains('button', 'Card', { timeout: 15000 }).click();
    
    cy.get('input[name="number"]', { timeout: 10000 }).type('4242424242424242');
    cy.get('input[name="expiry"]').type('1228');
    cy.get('input[name="cvc"]').type('123');
    cy.get('input[name="billingName"]').type('Test User');
    cy.get('input[name="billingPostalCode"]').type('12345');
    
    cy.get('button[type="submit"]').click();
  });
});

Cypress.Commands.add('assertToast', (message) => {
  cy.get('[role="status"]').contains(message, { timeout: 5000 }).should('be.visible');
});

Cypress.Commands.add('completeCheckoutWithStripeCLI', () => {
  return cy.exec(
      'stripe trigger checkout.session.completed',
      {
        failOnNonZeroExit: false,
        timeout: 30000,
        env: {
          STRIPE_API_KEY: Cypress.env('stripeSecretKey')
        }
      }
  ).then((result) => {
    cy.log('Stripe CLI output:', result.stdout);
    cy.wait(2000);
    return result;
  });
});