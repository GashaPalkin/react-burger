describe('Testing DnD', function () {

  beforeEach(function () {
    cy.intercept('GET', 'ingredients', { fixture: 'fakeIngredients' })
    cy.visit('http://localhost:3000');
  });

  it('should contain ingredients', function () {
    cy.contains('Краторная булка N-200i').should('exist');
    cy.contains('Соус Spicy-X').should('exist');
    cy.contains('Мясо бессмертных моллюсков Protostomia').should('exist');
  });

  it('should drag and drop bun', function () {
    cy.get('[data-testid=ingredients]').contains('Краторная булка N-200i').trigger('dragstart');
    cy.get('[data-testid=dropContainer]').trigger('drop');
    cy.get('[data-testid=dropBunTop]').contains('Краторная булка N-200i').should('exist');
    cy.get('[data-testid=dropBunBottom]').contains('Краторная булка N-200i').should('exist');
  });

  it('should drag and drop ingredient', function () {
    cy.get('[data-testid=ingredients]').contains('Соус Spicy-X').trigger('dragstart');
    cy.get('[data-testid=dropContainer]').trigger('drop');
    cy.get('[data-testid=dropIngredients]').contains('Соус Spicy-X').should('exist');
    cy.get('[data-testid=ingredients]').contains('Мясо бессмертных моллюсков Protostomia').trigger('dragstart');
    cy.get('[data-testid=dropContainer]').trigger('drop');
    cy.get('[data-testid=dropIngredients]').contains('Мясо бессмертных моллюсков Protostomia').should('exist');
  });

}); 
