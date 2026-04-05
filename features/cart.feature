Feature: Shopping Cart
  As a logged in user
  I want to manage my cart
  So that I can review items before checkout

  Background:
    Given the user is logged in as "standard_user"

  @smoke @cart
  Scenario: Cart page loads after adding a product
    When the user adds product number 1 to the cart
    And the user goes to the cart
    Then the cart page should be displayed
    And the cart should contain 1 items

  @regression @cart
  Scenario: User can add multiple items and view them in cart
    When the user adds product number 1 to the cart
    And the user adds product number 2 to the cart
    And the user goes to the cart
    Then the cart should contain 2 items

  @regression @cart
  Scenario: User can remove an item from the cart
    When the user adds product number 1 to the cart
    And the user goes to the cart
    And the user removes item number 1 from the cart
    Then the cart should be empty

  @regression @cart
  Scenario: User can continue shopping from cart
    When the user adds product number 1 to the cart
    And the user goes to the cart
    And the user clicks continue shopping
    Then the products page should be displayed
