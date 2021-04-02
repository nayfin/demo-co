describe('editable', () => {
  beforeEach(() => cy.visit('/iframe.html?id=paginatorcomponent--primary&knob-totalPages&knob-currentPage'));

  it('should render the component', () => {
    cy.get('editable-paginator').should('exist');
  });
});
