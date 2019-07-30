import gql from 'graphql-tag';

export const GET_POSTS = gql`
  query {
    getPosts {
      id
      title
      body
      writer {
        id
        name
        email
      }
      comments {
        id
        body
      }
    }
  }
`;
