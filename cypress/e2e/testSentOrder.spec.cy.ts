describe('testing Sent Order', function () {

    beforeEach(function () {
        cy.intercept('GET', 'ingredients', { fixture: 'fakeIngredients' })
        cy.intercept("POST", "api/orders", { fixture: "fakeOrder" });
        cy.intercept("POST", "api/auth/login", { fixture: "fakeLogin" });
        cy.visit('http://localhost:3000');
    });

    it('should open modal and show order number', function () {
        cy.get('[data-testid=ingredients]').contains('Краторная булка N-200i').trigger('dragstart');
        cy.get('[data-testid=dropContainer]').trigger('drop');
        cy.get('[data-testid=ingredients]').contains('Соус Spicy-X').trigger('dragstart');
        cy.get('[data-testid=dropContainer]').trigger('drop');
        cy.get('[data-testid=ingredients]').contains('Соус Spicy-X').trigger('dragstart');
        cy.get('[data-testid=dropContainer]').trigger('drop');
        cy.get('[data-testid=ingredients]').contains('Мясо бессмертных моллюсков Protostomia').trigger('dragstart');
        cy.get('[data-testid=dropContainer]').trigger('drop');
        cy.get('[data-testid=sentOrderButton]').click()
        cy.get('[data-testid=testLogin]').click()
        cy.get('[data-testid=sentOrderButton]').click()
        cy.get("[data-testid=orderNumber]").contains("46624").should("exist");
    });

}); 