/// <reference types="Cypress" />
import '@testing-library/cypress/add-commands';

describe('Youtube', () => {
  beforeEach(() => {
    cy.intercept('GET', /(mostPopular)/g, {
      fixture: 'popular.json',
    }).as('getMostPopular');
    cy.visit('/');
  });

  it('renders', () => {
    cy.findByText('Youtube').should('exist');
  });

  it('display most popular videos first', () => {
    cy.findByText('my message to mojang.').should('exist');
  });
});
