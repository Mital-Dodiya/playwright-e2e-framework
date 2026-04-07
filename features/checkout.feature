Feature: Checkout
  As a logged in user
  I want to complete a purchase
  So that I can order products successfully

  Background:
    Given the user is logged in as "standard_user"
    And the user adds product number 1 to the cart
    And the user goes to the cart
    And the user proceeds to checkout

  @smoke @checkout
  Scenario: User can complete checkout successfully
    Then the checkout page should be displayed
    When the user fills in checkout info with first name "Mital" last name "Dodiya" and postal code "400001"
    And the user clicks continue
    Then the checkout overview page should be displayed
    And the order summary should contain 1 item(s)
    And the order summary should display subtotal
    And the order summary should display tax
    And the order summary should display total amount
    When the user clicks finish
    Then the order confirmation should be displayed

  @regression @checkout
  Scenario: Checkout fails with missing first name
    Then the checkout page should be displayed
    When the user fills in checkout info with first name "" last name "Dodiya" and postal code "400001"
    And the user clicks continue
    Then the checkout error message "First Name is required" should be displayed

  @regression @checkout
  Scenario: Checkout fails with missing last name
    Then the checkout page should be displayed
    When the user fills in checkout info with first name "Mital" last name "" and postal code "400001"
    And the user clicks continue
    Then the checkout error message "Last Name is required" should be displayed

  @regression @checkout
  Scenario: Checkout fails with missing postal code
    Then the checkout page should be displayed
    When the user fills in checkout info with first name "Mital" last name "Dodiya" and postal code ""
    And the user clicks continue
    Then the checkout error message "Postal Code is required" should be displayed
