# **User Management App**

A React-based User Management application using **Material-UI** and **Reqres API**. The app includes authentication, user listing with pagination, search, filtering, user editing and user deletion

## Technologies Used
- React.js
- Material-UI for UI components and styling
- Material-UI DataGrid for displaying user data in table formate
- Material-UI Icons for edit and delete actions
- Axios for handling API requests
- React Router for navigation
- Reqres API for mock user data


## Features
- User Authentication: Login with email and password.
- Token Persistence: Stores authentication token in local storage.
- User List with Pagination: Displays users in a paginated table using Material-UI DataGrid.
- Search & Filtering: Allows users to search by First Name, Last Name and Email.
- Edit & Delete Users:
  - Edit: Users can modify details through a modal with API integration.
  - Delete: Users can be removed with a confirmation alert and API call.

- Error Handling: Handles API errors and invalid inputs.


## Installation & Setup
- Clone the repository.
- Install dependencies using npm.
   npm install
- Run the development server
   npm start
- Open the app
  The app runs at: http://localhost:3000


##  Project Structure
### The app consists of multiple components including:
- LoginForm: Handles user login with validation.
- UserList: Displays paginated user data.
- UserEditModal: Allows users to edit user details.
- UserList.css: Provides custom styling for the user table search, and filter.
- API service functions are managed in a dedicated service file.
- Routing is configured in the main application file.


## Login Form Implementation
- The LoginForm component is implemented using Material-UI.
- It includes input fields for Email and Password.
- On successful login, users are redirected to the User List page.

  ### Form Validation
   - Email validation is applied using a regular expression to ensure a proper format.
   - Error messages are displayed for invalid inputs.
   - The Login button is disabled if:
   - The email or password fields are empty.
   - The input fields have validation errors.

  ### API Integration
   - On form submission, a POST request is sent to the Reqres API for authentication.
   - If the login is successful, the user is navigated to the User List page.
   - The authentication token is stored in local storage.
   - API errors are handled gracefully with error messages displayed to the user.

## User List Table
- Users are displayed in a Material-UI DataGrid.
 ### Features include:
  - Pagination with different page sizes
  - Search functionality
  - Editable user details
  - Avatar display
  - Edit and Delete actions using Material-UI Icons

## User Edit Modal
- Clicking the edit icon opens a modal with user details.
- Users can update their First Name, Last Name, and Email.
- A PUT API request is sent to update the user information.

## User Delete Confirmation
- Clicking the delete icon prompts a confirmation message.
- On confirmation, a DELETE API request removes the user
- UI update by filtering out the deleted user from the setFilteredUsers state

## API Integration
- Login: Sends a POST request to /api/login with email and password.
- Fetch Users: Retrieves paginated users from /api/users?page={page}.
- Edit User: Updates user details using /api/users/:id.
- Delete User: Deletes a user using /api/users/:id