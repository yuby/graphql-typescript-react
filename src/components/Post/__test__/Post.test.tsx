import React from 'react';
import { MockedProvider } from 'react-apollo/test-utils';
import {
  render,
  cleanup,
} from '@testing-library/react'
import wait from 'waait';

import Post from '../index';

import { GET_POSTS } from '../../../graphql/queries/post';


afterEach(cleanup)

describe("Post Init", () => {
  test('Init', () => {
    const { getByTestId } = render(
      <MockedProvider mocks={[]}>
        <Post />
      </MockedProvider>,
    );

    getByTestId('loading');
  });
});

describe("Post Normal Run", () => {
  test('Fetch GQ query with Normal data', async () => {
    const mocks = [
      {
        request: {
          query: GET_POSTS,
          variables: null,
        },
        result: {
          data: {
            getPosts: [
              {
                "id": "1",
                "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
                "body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto",
                "writer": {
                  "id": "1",
                  "name": null,
                  "email": null,
                },
                "comments": [
                  {
                    "id": "1",
                    "body": "laudantium enim quasi est quidem magnam voluptate ipsam eos\ntempora quo necessitatibus\ndolor quam autem quasi\nreiciendis et nam sapiente accusantium",
                  },
                  {
                    "id": "2",
                    "body": "est natus enim nihil est dolore omnis voluptatem numquam\net omnis occaecati quod ullam at\nvoluptatem error expedita pariatur\nnihil sint nostrum voluptatem reiciendis et",
                  },
                  {
                    "id": "3",
                    "body": "quia molestiae reprehenderit quasi aspernatur\naut expedita occaecati aliquam eveniet laudantium\nomnis quibusdam delectus saepe quia accusamus maiores nam est\ncum et ducimus et vero voluptates excepturi deleniti ratione",
                  },
                  {
                    "id": "4",
                    "body": "non et atque\noccaecati deserunt quas accusantium unde odit nobis qui voluptatem\nquia voluptas consequuntur itaque dolor\net qui rerum deleniti ut occaecati",
                  },
                  {
                    "id": "5",
                    "body": "harum non quasi et ratione\ntempore iure ex voluptates in ratione\nharum architecto fugit inventore cupiditate\nvoluptates magni quo et",
                  }
                ],
                "__typename": "Post"
              },
            ]
          }
        }
      },
    ];

    const { getByTestId } = render(
      <MockedProvider
        mocks={mocks}
        addTypename={false}
      >
        <Post />
      </MockedProvider>,
    );

    await wait(0);

    const postList = getByTestId('post-list');
    const commentList = getByTestId('comment-list');

    expect(postList.children.length).toBe(1);
    expect(commentList.children.length).toBe(5);
  });

  test('Fetch GQ query with Empty data', async () => {
    const mocks = [
      {
        request: {
          query: GET_POSTS,
          variables: null,
        },
        result: {
          data: {
            getPosts: []
          }
        }
      },
    ];

    const { getByTestId } = render(
      <MockedProvider
        mocks={mocks}
        addTypename={false}
      >
        <Post />
      </MockedProvider>,
    );

    await wait(0);

    const postList = getByTestId('post-list');

    expect(postList.children.length).toBe(0);
  });
});

describe("Post Error", () => {
  test('Fetch GQ query with error', async () => {
    const mocks = [
      {
        request: {
          query: GET_POSTS,
          variables: null,
        },
        result: {
          error: {
            error: [
              {
                "message": "Cannot query field idasd on type Post.",
                "locations": [
                  {
                    "line": 3,
                    "column": 5
                  }
                ],
              },
            ]
          }
        }
      },
    ];

    const { getByTestId } = render(
      <MockedProvider
        mocks={mocks}
        addTypename={false}
      >
        <Post />
      </MockedProvider>,
    );

    await wait(0);

    getByTestId('error');
  });
});


// https://dev.to/bahdcoder_47/testing-react-components-the-right-way-with-react-testing-library-5h8d