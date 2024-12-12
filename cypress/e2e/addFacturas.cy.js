describe('Add factura', () => {
    it('login', () => {
        cy.visit('http://localhost:5173/facturas')
  
  
        cy.get('button').contains('Agregar Factura').click()

    })
  })