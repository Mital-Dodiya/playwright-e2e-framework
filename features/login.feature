Feature: User Login
  As a registered user
  I want to log into the Sauce Demo application
  So that I can access the products

  Background:
    Given the user is on the login page

  @smoke @login
  Scenario: Successful login with valid credentials
    When the user logs in with username "standard_user" and password "secret_sauce"
    Then the user should be redirected to the products page

  @regression @login
  Scenario: Login fails with invalid password
    When the user logs in with username "standard_user" and password "wrong_password"
    Then the user should see an error message "Username and password do not match"

  @regression @login
  Scenario: Login fails with locked out user
    When the user logs in with username "locked_out_user" and password "secret_sauce"
    Then the user should see an error message "Sorry, this user has been locked out"

  @regression @login
  Scenario: Login fails with empty credentials
    When the user logs in with username "" and password ""
    Then the user should see an error message "Username is required"
