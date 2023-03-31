import { testUrl } from '../../src/utils/constants'
import { testIngredientsEl } from '../../src/utils/constants'
import { testdropContainerEl } from '../../src/utils/constants'
import { testdropIngredientsEl } from '../../src/utils/constants'
import { testBun } from '../../src/utils/constants'
import { testSauce } from '../../src/utils/constants'
import { testMainIngredient } from '../../src/utils/constants'


describe('Testing DnD', function () {

  beforeEach(function () {
    cy.intercept('GET', 'ingredients', { fixture: 'fakeIngredients' })
    cy.visit(testUrl);
  });

  it('should contain ingredients', function () {
    cy.contains(testBun).should('exist');
    cy.contains(testSauce).should('exist');
    cy.contains(testMainIngredient).should('exist');
  });

  it('should drag and drop bun', function () {
    cy.get(testIngredientsEl).contains(testBun).trigger('dragstart');
    cy.get(testdropContainerEl).trigger('drop');
    cy.get('[data-testid=dropBunTop]').contains(testBun).should('exist');
    cy.get('[data-testid=dropBunBottom]').contains(testBun).should('exist');
  });

  it('should drag and drop ingredient', function () {
    cy.get(testIngredientsEl).contains(testSauce).trigger('dragstart');
    cy.get(testdropContainerEl).trigger('drop');
    cy.get(testdropIngredientsEl).contains(testSauce).should('exist');
    cy.get(testIngredientsEl).contains(testMainIngredient).trigger('dragstart');
    cy.get(testdropContainerEl).trigger('drop');
    cy.get(testdropIngredientsEl).contains(testMainIngredient).should('exist');
  });

}); 
