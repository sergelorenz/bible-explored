describe('Books and Chapters', () => {
  beforeEach(() => {
    cy.visit('#/books-and-chapters')
  })

  it('Should redirect to Books and chapters', () => {
    cy.visit('#/home')
    cy.get('.home a[href="#/books-and-chapters"] .menu').click()
    cy.hash().should('eq', '#/books-and-chapters')
  })

  it('Should open the fifth chapter of John of Free Bible Version', () => {
    cy.intercept('get', '**/bibles', req => {
      delete req.headers['if-none-match']
    }).as('getBibles')
    cy.intercept('get', '**/books', req => {
      delete req.headers['if-none-match']
    }).as('getBooks')
    cy.intercept('get', '**/JHN/chapters', req => {
      delete req.headers['if-none-match']
    }).as('getChapters')
    cy.intercept('get', '**/chapters/JHN.5**', req => {
      delete req.headers['if-none-match']
    }).as('getVerses')
    cy.get('.bible-select').click()
    cy.get('.bible-select .spinner').should('exist')
    cy.wait('@getBibles')
    cy.get('.bible-select .options').should('exist')
    cy.get('.bible-group li[data-cy="Free Bible Version"]').click()
    cy.get('[data-cy="bible-select-go"]').click()
    cy.get('.books-and-chapter-navigator [data-cy="menu-title"]').should('exist')
    cy.get('.book-select').should('exist')
    cy.get('.book-select .spinner').should('exist')
    cy.wait('@getBooks')
    cy.get('.book-select').click()
    cy.get('.book-select .options').should('exist')
    cy.get('.book-select li[data-cy="John"]').click()
    cy.get('.number-grid-spinner').should('exist')
    cy.wait('@getChapters')
    cy.get('.number-cell[data-key="5"]').should('exist').click()
    cy.wait('@getVerses')
    cy.get('.bible-viewer [data-cy="verses"]').should('exist')
  })
})