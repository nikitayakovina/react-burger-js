describe('burgerConstructor', () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("modal with the ingredient open", () => {
    cy.get('[data-testid="ingredientCard"]').as('ingredientCard');

    cy.get('@ingredientCard').should('exist');

    cy.get('@ingredientCard')
      .contains('булка')
      .first()
      .then((ingredient) => {
        const clickedName = ingredient.text().trim();

        cy.wrap(ingredient).click();

        cy.get('[data-testid="detailsIngredient"]', { timeout: 10000 })
          .should('be.visible')
          .within(() => {
            cy.get('[data-testid="ingredientName"]').should('have.text', clickedName);
          });
      });


    cy.get('[data-testid="detailsIngredient"]', { timeout: 10000 }).should("be.visible");

    cy.get('[data-testid="modalClose"]').click();

    cy.get('[data-testid="modalContainer"]').should('not.exist');
  });

  it("should order created", () => {
    cy.get('[data-testid="ingredientCard"]').as('ingredientCard');

    cy.get('@ingredientCard').should('exist');
    cy.get('@ingredientCard').should('have.length.at.least', 1);

    cy.get('@ingredientCard')
      .contains('булка')
      .first()
      .trigger('dragstart');

    cy.get('[data-testid="dropBunTop"]')
      .trigger('drop');

    cy.get('@ingredientCard')
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

    cy.get('[data-testid="numberOrder"]', { timeout: 20000 }).should('exist');
    cy.get('[data-testid="modalClose"]').click();

    cy.get('[data-testid="modalContainer"]').should('not.exist');
  });
});
