describe('template spec', () => {
  it('passes', () => {
    cy.visit('/login')
  })

  /* ==== Test Created with Cypress Studio ==== */
  it('login', function() {
    /* ==== Generated with Cypress Studio ==== */
    cy.visit('localhost:4173');
    cy.get('.text-primary > .v-btn__content').click();
    cy.get('#input-v-8').clear('s');
    cy.get('#input-v-8').type('vue.sample@gmail.com');
    cy.get('#input-v-10').clear();
    cy.get('#input-v-10').type('secret{enter}');
    cy.get('.v-form > .v-btn').click();
    /* ==== End Cypress Studio ==== */
  });
})
