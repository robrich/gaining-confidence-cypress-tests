/// <reference path="../support/commands.d.ts" />

const SITE_URL = 'https://todomvc.com/examples/angularjs/#/';
//const SITE_URL = 'https://todomvc.com/examples/backbone/';
//const SITE_URL = 'https://todomvc.com/examples/vue/';

const siteName = SITE_URL.split('/').filter(p => p && p !== '#').pop();

describe(`todomvc: ${siteName}`, () => {

  beforeEach(() => {
    // arrange
    cy.visit(SITE_URL);
  });

  it('should visit page', () => {

    // assert
    cy.url().should('equal', SITE_URL);

  });

  it('should have no todo items before we start', () => {

    // assert
    cy.get('.todo-list>li')
      .should('not.exist');

  });

  it('should add a todo', () => {

    // arrange
    const newTodo = 'write Cypress test';

    // act
    cy.get('.new-todo').type(`${newTodo}{enter}`);

    // assert
    cy.get('.todo-list>li')
      .should('contain', newTodo);
    cy.get('.new-todo').should('have.value', '');

  });

  it('should mark a todo completed', () => {

    // arrange
    const newTodo = 'finish cypress test';

    // act
    cy.get('.new-todo').type(`irrelevant todo{enter}`);
    cy.get('.new-todo').type(`${newTodo}{enter}`);
    cy.contains('.view', newTodo).children('.toggle').click();

    // assert
    cy.contains('.todo-list>li', newTodo).should('have.class', 'completed');

  });

  it('should delete a todo', () => {

    // arrange
    const newTodo = 'finish cypress test';
    const irrelevant = 'irrelevant todo';

    // act
    cy.get('.new-todo').type(`${irrelevant}{enter}`);
    cy.get('.new-todo').type(`${newTodo}{enter}`);
    cy.contains('.view', newTodo).children('.destroy').click({force:true}); // force because it's not visible until hover

    // assert
    cy.get('.todo-list>li:visible').should('have.length', 1);
    cy.get('.todo-list').should('contain', irrelevant);

  });

  it('should show only active tasks', () => {

    // arrange
    const newTodo = 'completed task';

    // act
    //cy.get('.new-todo').type(`some active todo{enter}`);
    //cy.get('.new-todo').type(`second active todo{enter}`);
    //cy.get('.new-todo').type(`${newTodo}{enter}`);
    cy.todoAdd('some active todo');
    cy.todoAdd('second active todod');
    cy.todoAdd(newTodo);
    cy.todoComplete(newTodo);
    cy.contains('.filters a', 'Active').click();

    // assert
    cy.get('.todo-list>li:visible').should('have.length', 2);

  });

  it('should show only completed tasks', () => {

    // arrange
    const newTodo = 'completed task';

    // act
    cy.todoAdd('some active todo');
    cy.todoAdd('second active todod');
    cy.todoAdd(newTodo);
    cy.todoComplete(newTodo);
    cy.contains('.filters a', 'Completed').click();
    //cy.get('[data-cy="completed"]').click();

    // assert
    cy.get('.todo-list>li:visible').should('have.length', 1);

  });

  it('should clear completed tasks', () => {

    // arrange
    const newTodo = 'completed task';

    // act
    cy.todoAdd(newTodo);
    cy.todoComplete(newTodo);
    cy.get('.clear-completed').click();

    // assert
    cy.get('.todo-list>li:visible').should('have.length', 0);

  });

});
