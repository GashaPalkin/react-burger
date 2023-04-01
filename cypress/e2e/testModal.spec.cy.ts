import { testUrl } from '../../src/utils/constants'
import { testIngredientsEl } from '../../src/utils/constants'
import { testBun } from '../../src/utils/constants'
import { testSauce } from '../../src/utils/constants'

describe('Testing Modal', function () {

    beforeEach(function () {
        cy.intercept('GET', 'ingredients', { fixture: 'fakeIngredients' })
        cy.visit(testUrl);
    });

    it('should open modal by click and show data', function () {
        cy.get(testIngredientsEl).contains(testBun).click()
        cy.get('div[id=modal]').get('[data-testid=modal]').should('exist')
        cy.get('[data-testid=ingredientName]').contains(testBun).should('exist')
    });

    it('should close modal by click on button', function () {
        cy.get(testIngredientsEl).contains(testSauce).click()
        cy.get('[data-testid=closeModal]').click()
        cy.get('[data-testid=modal]').should('not.exist')
    });

    it('should close modal by click on overlay', function () {
        cy.get(testIngredientsEl).contains(testSauce).click()
        cy.get('[data-testid=overlayClose]').click({ force: true })
        cy.get('[data-testid=modal]').should('not.exist')
    });

});

