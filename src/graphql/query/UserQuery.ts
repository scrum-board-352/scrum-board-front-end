const loginQuery = `
  query login($username: String!, $password: String!) {
    login(selectionInput: {
      userInput: {
        username: $username
        password: $password
      }
    }) {
      id
      name: username
      email
      avatar: icon
    }
  }
`;

const logoutQuery = `
  query logout($username: String!) {
  	logout(username: $username) {
      success: susses
  	  message
  	}
  }
`;

export default {loginQuery, logoutQuery};