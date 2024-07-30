# Expense Tracker

An Expense Tracker web application that allows users to add and delete expenses or incomes, and view their net balance. The application includes a login page that requires a username and user ID to access personalized data.

## Features

1. **Login:**
   - Users can log in with a username and user ID.
   
2. **Add Expense/Income:**
   - Users can add an entry specifying the amount, description, date, and type (income or expense).
   
3. **Delete Expense/Income:**
   - Users can delete any existing entry.
   
4. **Show Net Balance:**
   - The application calculates and displays the net balance: `Net Balance = Total Income - Total Expenses`.

## Prerequisites

- Python 3
- Flask

## Installation

1. **Clone the repository:**

    ```bash
    git clone https://github.com/PawanKhadgi/Expense_tracker.git
    cd Expense_tracker
    ```

2. **Install dependencies:**

    ```bash
    pip install -r requirements.txt
    ```

3. **Ensure directory structure:**

    ```plaintext
    expense-tracker/
    ├── public/
    │   ├── index.html
    │   ├── styles.css
    │   ├── script.js
    ├── data.json
    ├── server1.py
    ├── requirements.txt
    └── README.md
    ```

## Usage

1. **Start the server:**

    ```CLI command
    python server1.py
    ```

2. **Open the application in your browser:**

    Navigate to `http://http://127.0.0.1:5000/`

## Directory Structure

- **public/**: Contains the frontend files (HTML, CSS, JS).
  - `index.html`: The main HTML file with login and expense tracker interfaces.
  - `styles.css`: CSS file for styling the application.
  - `script.js`: JavaScript file for handling frontend logic.
  
- **data.json**: JSON file to store user data (expenses/incomes).
- **server1.py**: Flask server to handle backend operations.
- **requirements.txt**: Lists all the dependencies required to run the application.
- **README.md**: Documentation file.

## Detailed File Descriptions

### `public/index.html`

- Contains two main sections: Login form and Expense Tracker.
- User must log in to access their personalized expense tracker.
- Fields to add an expense or income entry: Amount, Description, Date, Type (Income/Expense).

### `public/styles.css`

- General styles for the application.
- Ensures a clean, responsive, and visually appealing layout.
- Proper padding and margins for input fields and buttons.

### `public/script.js`

- Handles the login form submission and switches to the expense tracker view.
- Manages adding and deleting entries, and updates the net balance.
- Fetches and displays user-specific data from the server.

### `server1.py`

- A Flask server that handles the backend logic.
- Routes:
  - `/`: Serves the main HTML file.
  - `/entries`: GET to fetch entries, POST to add an entry.
  - `/entries/<int:index>`: DELETE to remove an entry.
- Reads from and writes to `data.json` for persistent storage.

