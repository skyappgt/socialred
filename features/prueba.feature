Feature: Usuario registrado?
  El usuario esta registrado?

  Scenario: User isn't register
    Given go to login page and fill inputs "romeo100" and "romeo100"
    When I click in the login button 
    Then I should go to "/perfil" status 200


