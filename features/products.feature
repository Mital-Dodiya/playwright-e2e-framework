Feature: Products Page
  As a logged in user
  I want to browse products
  So that I can add items to my cart

  @smoke @products
  Scenario: Products page loads with all products
    Given the user is logged in as "standard_user"
    Then the products page should be displayed
    And the user should see 6 or more products

  @regression @products
  Scenario: User can add a single product to the cart
    Given the user is logged in as "standard_user"
    When the user adds product number 1 to the cart
    Then the cart badge should show "1"

  @regression @products
  Scenario: User can add multiple products to the cart
    Given the user is logged in as "standard_user"
    When the user adds product number 1 to the cart
    And the user adds product number 2 to the cart
    Then the cart badge should show "2"

  @regression @products
  Scenario Outline: User can sort products by different options
    Given the user is logged in as "standard_user"
    When the user sorts products by "<sortOption>"
    Then the products page should be displayed

    Examples:
      | sortOption |
      | az         |
      | za         |
      | lohi       |
      | hilo       |

  @regression @products
  Scenario: User can logout successfully
    Given the user is logged in as "standard_user"
    When the user logs out
    Then the user should be on the login page
