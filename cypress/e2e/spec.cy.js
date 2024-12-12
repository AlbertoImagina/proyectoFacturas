describe('Login tester', () => {
  it('login', () => {
    cy.visit('https://proyecto-facturas.vercel.app/')


    cy.get('input[type=email]').type('botella@botella.com')
    cy.get('input[type=password]').type('botella123')

    cy.get('button').contains('Continuar').click()

    cy.get('button').contains('Agregar Factura').click()

    cy.get('input[name=createdAt]').type('2024-12-12')
    cy.get('input[name=numero]').type('30')
    cy.get('input[name=cliente]').type('Cypress')
    cy.get('input[name=fechaPago]').type('2025-01-16')


    cy.get('button').contains('Submit').click()
    cy.end()
  })
})