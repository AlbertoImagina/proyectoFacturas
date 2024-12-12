describe('Login tester', () => {
  it('login', () => {
    cy.visit('https://proyecto-facturas.vercel.app/')


    cy.get('input[type=email]').type('botella@botella.com')
    cy.get('input[type=password]').type('botella123')

    cy.get('button').contains('Continuar').click()
  })
})