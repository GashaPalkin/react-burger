import { testUrl } from '../../src/utils/constants'
import { testIngredientsEl } from '../../src/utils/constants'
import { testdropContainerEl } from '../../src/utils/constants'
import { testBun } from '../../src/utils/constants'
import { testSauce } from '../../src/utils/constants'
import { testMainIngredient } from '../../src/utils/constants'

describe('testing Sent Order', function () {

    beforeEach(function () {
        cy.intercept('GET', 'ingredients', { fixture: 'fakeIngredients' })
        cy.intercept("POST", "api/orders", { fixture: "fakeOrder" });
        cy.intercept("POST", "api/auth/login", { fixture: "fakeLogin" });
        cy.visit(testUrl);
    });

    it('should open modal and show order number', function () {
        cy.get(testIngredientsEl).contains(testBun).trigger('dragstart');
        cy.get(testdropContainerEl).trigger('drop');
        cy.get(testIngredientsEl).contains(testSauce).trigger('dragstart');
        cy.get(testdropContainerEl).trigger('drop');
        cy.get(testIngredientsEl).contains(testSauce).trigger('dragstart');
        cy.get(testdropContainerEl).trigger('drop');
        cy.get(testIngredientsEl).contains(testMainIngredient).trigger('dragstart');
        cy.get(testdropContainerEl).trigger('drop');
        cy.get('[data-testid=sentOrderButton]').click()
        cy.get('[data-testid=testLogin]').click()
        cy.get('[data-testid=sentOrderButton]').click()
        cy.get("[data-testid=orderNumber]").contains("46624").should("exist");
    });

}); 