describe('Side By Side', () => {
  beforeEach(() => {
    cy.visit('#/side-by-side')
  })

  it('Should redirect to Side By Side', () => {
    cy.visit('/#home')
    cy.get('.home a[href="#/side-by-side"] .menu').click()
    cy.hash().should('eq', '#/side-by-side')
  })

  it('Should display Verse Selector', () => {
    cy.intercept('get', '**/books', req => {
      delete req.headers['if-none-match']
    }).as('getBooks')
    cy.intercept('get', '**/books/**/chapters', req => {
      delete req.headers['if-none-match']
    }).as('getChapters')
    cy.intercept('get', '**/chapters/**/verses', req => {
      delete req.headers['if-none-match']
    }).as('getVerses')
    // cy.wait('@getBooks')
    cy.get('.verse-select-area .book-select').should('exist')
    // cy.wait('@getChapters')
    cy.get('.verse-select-area .chapter-select').should('exist')
    // cy.wait('@getVerses')
    cy.get('.verse-select-area .verse-select').should('exist')
  })

  it('Should display only one Version Selector Initially', () => {
    cy.get('.version-viewer').should('have.length', 1)
  })

  it('Should add Version Selector When Clicking Add Version.', () => {
    cy.get('.add-version').should('exist').click()
    cy.get('.version-viewer').should('have.length', 2)
    cy.get('.add-version').click()
    cy.get('.version-viewer').should('have.length', 3)
  })

  it('Should remove Add Version Button when there are already 3 version viewer', () => {
    cy.get('.add-version').click()
    cy.get('.add-version').click()
    cy.get('.add-version').should('not.exist')
  })

  it('Should be able to remove Version Viewer when clicking close, until only one is left', () => {
    cy.get('.add-version').click()
    cy.get('.add-version').click()
    cy.get('.version-viewer').should('have.length', 3)
    cy.get('.close-version-viewer').first().click()
    cy.get('.version-viewer').should('have.length', 2)
    cy.get('.close-version-viewer').first().click()
    cy.get('.version-viewer').should('have.length', 1)
    cy.get('.close-version-viewer').first().click()
    cy.get('.version-viewer').should('have.length', 1)
  })
})