describe('Testing Modal', function () {

    beforeEach(function () {
        cy.intercept('GET', 'ingredients', { fixture: 'fakeIngredients' })
        cy.visit('http://localhost:3000');
    });

    it('should open modal by click and show data', function () {
        cy.get('[data-testid=ingredients]').contains('Краторная булка N-200i').click()
        cy.get('div[id=modal]').get('[data-testid=modal]').should('exist')
        cy.get('[data-testid=ingredientName]').contains('Краторная булка N-200i').should('exist')
    });

    it('should close modal by click on button', function () {
        cy.get('[data-testid=ingredients]').contains('Соус Spicy-X').click()
        cy.get('[data-testid=closeModal]').click()
        cy.get('[data-testid=modal]').should('not.exist')
    });

    it('should close modal by click on overlay', function () {
        cy.get('[data-testid=ingredients]').contains('Соус Spicy-X').click()
        cy.get('[data-testid=overlayClose]').click({ force: true })
        cy.get('[data-testid=modal]').should('not.exist')
    });

});

