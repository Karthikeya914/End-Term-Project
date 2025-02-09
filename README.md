# End-Term-Project
EXPENSE TRACKER 
This is a simple Expense Tracker web application that allows users to log expenses, categorize them, and convert them into different currencies using an exchange rate API. It also 
provides a visual representation of expenses using a Pie Chart.

FEATURES:

  * Add expenses with name, amount, category, and currency.

  * Store expenses in local storage so data is retained even after page refresh.

  * Delete specific expenses from the list.

  * Convert expenses to a selected currency using real-time exchange rates.

  * Display expenses in a tabular format.

  * Visualize spending by category using a Pie Chart.

TECHNOLOGIES USED :

  * HTML - Structure of the application.

  * CSS - Styling for a clean and modern UI.

  * JavaScript - Handles all logic, interactions, and API calls.

  * Chart.js - Used for generating the Pie Chart.

  * Open Exchange Rates API - Fetches real-time currency exchange rates.

USAGE

  1.Adding an Expense

   * Enter the expense name, amount, category, and select a currency.

   * Click the "Add Expense" button to save it.

  2.Viewing Expenses

   * All expenses are listed in a table.

   * The chart updates dynamically based on expenses added.

  3.Deleting an Expense

   * Click the Delete button next to an expense to remove it.

   * Converting Expenses to Another Currency

Select a new currency from the dropdown.

Click "Convert" to update all expenses.

API Key Configuration

This code is already written with my personal API_KEY but if you want to use your own API_KEY you can just change the 
   const API_KEY = "your-api-key-here";  you just have to replace your-api-key-here with your actual API_KEY.
