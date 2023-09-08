describe('Verse of the Day', () => {
  beforeEach(() => {
    cy.visit('#/verse-of-the-day')
  })

  it('Should redirect to Verse of the Day', () => {
    cy.visit('/#home')
    cy.get('.home a[href="#/verse-of-the-day"] .menu').click()
    cy.hash().should('eq', '#/verse-of-the-day')
  })

  it('Should display verse of the day', () => {
    cy.intercept('get', '**/passages**', req => {
      delete req.headers['if-none-match']
    }).as('getVerseOfTheDay')
    cy.get('.verse-of-the-day-container .spinner-wrapper').should('exist')
    // cy.wait('@getVerseOfTheDay')
    cy.get('.verse-viewer .scripture-styles').should('exist')
  })

  it('Should Open one of the Problem Cards when clicked', () => {
    cy.intercept('get', '**/passages/PHP.4.6**', req => {
      delete req.headers['if-none-match']
    }).as('getPassageFromProblemCard')
    cy.get('.problem-card-parent[data-cy="Anxious"]').click()
    cy.get('.problem-card-parent[data-cy="Anxious"] .spinner').should('exist')
    // cy.wait('@getPassageFromProblemCard')
    cy.get('.problem-card-parent[data-cy="Anxious"] .guidance-passages').should('exist')
    cy.get('.problem-card-parent[data-cy="Anxious"] .guidance-passages').should('have.css', 'opacity', '1')
  })
})