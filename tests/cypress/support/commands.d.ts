/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    todoAdd(text: string): Chainable<Element>;
    todoComplete(text: string): Chainable<Element>;
  }
}
