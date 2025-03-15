//import styling
import "antd/dist/reset.css"; // Ensures the latest version styles are applied

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { Outlet } from 'react-router-dom';
//import Ant Design's Layout component
import { Layout } from 'antd'; // Import Ant Design's Layout components

import Header from './components/Header';
import Footer from './components/Footer';
import Navbar from './components/NavBar';

// Construct our main GraphQL API endpoint
const httpLink = createHttpLink({
  uri: "/graphql",
});

// Construct request middleware that will attach the JWT token to every request as an `authorization` header
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('id_token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
  },
};
});

const client = new ApolloClient({
  // Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Layout style={{ minHeight: "100vh" }}>
        <Layout.Header>
          <Header />
          <Navbar />
        </Layout.Header>

        <Layout.Content style={{ padding: "20px", maxWidth: "1200px", margin: "auto" }}>
          <Outlet />
        </Layout.Content>

        <Layout.Footer style={{ textAlign: "center" }}>
          <Footer />
        </Layout.Footer>
      </Layout>
    </ApolloProvider>
  );
}

export default App;
