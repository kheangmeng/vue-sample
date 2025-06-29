import { createPinia, setActivePinia } from 'pinia'
import { useAuthStore } from '../../src/stores/auth'

describe('product spec', () => {
  beforeEach(() => {
    const pinia = createPinia()
    setActivePinia(pinia)

    const auth = useAuthStore()
    auth.setAuthenticated(true)
  })
  it('create product', () => {
    cy.visit('localhost:4173/products')
    /* ==== Generated with Cypress Studio ==== */
    cy.get('.v-table > .v-toolbar > .v-toolbar__content > .v-btn > .v-btn__content').click()
    cy.get('#input-v-5').clear('I')
    cy.get('#input-v-5').type('iPhone')
    cy.get(
      ':nth-child(2) > .v-input > .v-input__control > .v-field > .v-field__field > .v-field__input',
    ).click()
    cy.get(':nth-child(2) > .v-list-item__content > .v-list-item-subtitle').click()
    cy.get('#input-v-11').clear('appple')
    cy.get('#input-v-11').type('appple')
    cy.get('#input-v-13').clear('1')
    cy.get('#input-v-13').type('112233')
    cy.get('#input-v-15').clear('1')
    cy.get('#input-v-15').type('1150')
    cy.get('#input-v-17').click()
    cy.get(
      '.v-overlay__content > .v-list > :nth-child(2) > .v-list-item__content > .v-list-item-title',
    ).click()
    cy.get('#input-v-47').check()
    cy.get('#input-v-20').click()
    cy.get(
      ':nth-child(7) > .v-input > .v-input__control > .v-field > .v-field__append-inner > .v-number-input__control > [data-testid="increment"]',
    ).click()
    cy.get(
      ':nth-child(7) > .v-input > .v-input__control > .v-field > .v-field__append-inner > .v-number-input__control > [data-testid="increment"] > .v-btn__content > .mdi-chevron-up',
    ).click()
    cy.get(
      ':nth-child(7) > .v-input > .v-input__control > .v-field > .v-field__append-inner > .v-number-input__control > [data-testid="increment"] > .v-btn__content > .mdi-chevron-up',
    ).click()
    cy.get(
      ':nth-child(7) > .v-input > .v-input__control > .v-field > .v-field__append-inner > .v-number-input__control > [data-testid="increment"]',
    ).click()
    cy.get(
      ':nth-child(7) > .v-input > .v-input__control > .v-field > .v-field__append-inner > .v-number-input__control > [data-testid="increment"]',
    ).click()
    cy.get(
      ':nth-child(7) > .v-input > .v-input__control > .v-field > .v-field__append-inner > .v-number-input__control > [data-testid="increment"] > .v-btn__content > .mdi-chevron-up',
    ).click()
    cy.get(
      ':nth-child(7) > .v-input > .v-input__control > .v-field > .v-field__append-inner > .v-number-input__control > [data-testid="increment"]',
    ).click()
    cy.get(
      ':nth-child(7) > .v-input > .v-input__control > .v-field > .v-field__append-inner > .v-number-input__control > [data-testid="increment"]',
    ).click()
    cy.get(
      ':nth-child(7) > .v-input > .v-input__control > .v-field > .v-field__append-inner > .v-number-input__control > [data-testid="increment"]',
    ).click()
    cy.get('#input-v-24').clear('2')
    cy.get('#input-v-24').type('2')
    cy.get('#input-v-28').click()
    cy.get('#input-v-28').type('apple product')
    cy.get('#switch-v-36').check()
    cy.get(
      ':nth-child(11) > .v-input > .v-input__control > .v-field > .v-field__field > .v-field__input',
    ).click()
    cy.get('.text-center > .v-btn > .v-btn__content').click()
    /* ==== End Cypress Studio ==== */
  })

  it('create category in create product', () => {
    cy.visit('localhost:4173/products')
    /* ==== Generated with Cypress Studio ==== */
    cy.get('.v-table > .v-toolbar > .v-toolbar__content > .v-btn > .v-btn__content').click()
    cy.get('#input-v-5').clear('g')
    cy.get('#input-v-5').type('galaxy tab')
    cy.get(
      ':nth-child(2) > .v-input > .v-input__control > .v-field > .v-field__field > .v-field__input',
    ).click()
    cy.get('.v-card').click()
    cy.get('.mdi-plus').click()
    cy.get('#input-v-42').clear('t')
    cy.get('#input-v-42').type('Tablet')
    cy.get('#input-v-44').click()
    cy.get('#input-v-44').type('Tablet device')
    cy.get('.v-form > .v-btn').click()
    cy.get(
      ':nth-child(2) > .v-input > .v-input__control > .v-field > .v-field__field > .v-field__input',
    ).click()
    cy.get(':nth-child(12) > .v-list-item__content > .v-list-item-title').click()
    cy.get('#input-v-11').clear('a')
    cy.get('#input-v-11').type('android')
    cy.get('#input-v-13').clear('5')
    cy.get('#input-v-13').type('5564679')
    cy.get('#input-v-15').clear('9')
    cy.get('#input-v-15').type('900')
    cy.get('#input-v-17').click()
    cy.get('#input-v-50').check()
    cy.get('#input-v-53').check()
    cy.get('#input-v-20').clear('2')
    cy.get('#input-v-20').type('22')
    cy.get('#input-v-24').click()
    cy.get(
      ':nth-child(8) > .v-input > .v-input__control > .v-field > .v-field__append-inner > .v-number-input__control > [data-testid="increment"]',
    ).click()
    cy.get(
      ':nth-child(8) > .v-input > .v-input__control > .v-field > .v-field__append-inner > .v-number-input__control > [data-testid="increment"] > .v-btn__content > .mdi-chevron-up',
    ).click()
    cy.get(
      ':nth-child(8) > .v-input > .v-input__control > .v-field > .v-field__append-inner > .v-number-input__control > [data-testid="increment"] > .v-btn__content > .mdi-chevron-up',
    ).click()
    cy.get('.v-footer').click()
    cy.get('#input-v-28').click()
    cy.get('#input-v-28').type('Android Tablet')
    cy.get('#switch-v-36').check()
    cy.get('.text-center > .v-btn > .v-btn__content').click()
    /* ==== End Cypress Studio ==== */
  })
})
