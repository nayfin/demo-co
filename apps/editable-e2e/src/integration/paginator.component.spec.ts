describe('editable', () => {
  beforeEach(() => cy.visit('/iframe.html?id=paginatorcomponent--primary&knob-totalPages&knob-currentPage&knob-size=md'));

  it('should render the component', () => {
    cy.get('editable-paginator').should('exist');
  });
});
