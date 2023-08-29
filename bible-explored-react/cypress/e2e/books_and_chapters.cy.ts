describe('Books and Chapters', () => {
  beforeEach(() => {
    cy.visit('#/books-and-chapters')
  })

  it('Should should redirect to Books and chapters', () => {
    cy.visit('#/home')
    cy.get('.home a[href="#/books-and-chapters"] .menu').click()
    cy.hash().should('eq', '#/books-and-chapters')
  })

  it('Should open the first chapter of Genesis of Free Bible Version', () => {
    cy.intercept('get', '**/bibles', req => {
      delete req.headers['if-none-match']
    }).as('getBibles')
    cy.intercept('get', '**/books').as('getBooks')
    cy.intercept('get', '**/GEN/chapters').as('getChapters')
    cy.intercept('get', '**/chapters/GEN.1').as('getVerses')
    cy.get('.bible-select').click()
    cy.get('.bible-select .spinner').should('exist')
    cy.wait('@getBibles')
    cy.get('.bible-select .options').should('exist')
    cy.get('.bible-group li[data-cy="Free Bible Version"]').click()
    cy.get('[data-cy="bible-select-go"]').click()
    cy.get('.books-and-chapter-navigator [data-cy="menu-title"]').should('exist')
    cy.get('.book-select').should('exist')
  })
})