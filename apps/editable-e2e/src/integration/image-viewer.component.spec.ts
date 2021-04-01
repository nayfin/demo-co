describe('editable', () => {
  beforeEach(() => cy.visit('/iframe.html?id=imageviewercomponent--primary&knob-imageUrl&knob-imageDescription'));

  it('should render the component', () => {
    cy.get('editable-image-viewer').should('exist');
  });
});
