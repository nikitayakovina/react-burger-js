describe('burgerConstructor', () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should order created", () => {
    cy.get('[data-testid="ingredientCard"]').should('exist');
    cy.get('[data-testid="ingredientCard"]').should('have.length.at.least', 1);

    cy.get('[data-testid="ingredientCard"]')
      .contains('булка')
      .first()
      .trigger('dragstart');

    cy.get('[data-testid="dropBunTop"]')
      .trigger('drop');

    cy.get('[data-testid="ingredientCard"]')
      .not(':contains("булка")')
      .first()
      .trigger('dragstart');

    cy.get('[data-testid="dropIngredient"]')
      .trigger('drop');

    cy.get('[data-testid="constructorIngredient"]')
      .should('have.length.at.least', 1);

    cy.get('[data-testid="createOrderButton"]').click();


    cy.fixture("user.json").then(user => {
      cy.contains('Вход');
      cy.get('[name=email]').type(user.login);
      cy.get('[name=password]').type(user.password);
      cy.contains('button', 'Войти').click();
    })

    cy.get('[data-testid="createOrderButton"]').click();

    cy.get('[data-testid="createdOrder"]', { timeout: 20000 }).should("be.visible");
    cy.get('[data-testid="modalClose"]').click();

    cy.contains('Перетащите ингридиенты');
  });
});
