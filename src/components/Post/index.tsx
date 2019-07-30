import React from 'react';
import { Query } from 'react-apollo';
import { GET_POSTS } from '../../graphql/queries/post';
import './Post.scss';

const Posts = () => (
  <Query query={GET_POSTS} errorPolicy="all">
    {({
      loading, error, data,
    }: any) => {

      if (loading) {return <div data-testid="loading">Loading</div>;}
      if (error) {return <div data-testid="error">{error.message}</div>;}

      const { getPosts } = data;
      const commentList = (commentData: any) => {
        const comment = commentData.map((comm: any) => (
          <li
            key={comm.id}
          >
            {comm.body}
          </li>
        ));

        return (
          <ul
            className="post-list__comments"
            data-testid="comment-list"
          >
            {comment}
          </ul>
        );
      };

      return (
        <div className="post-list">
          <ul
            data-testid="post-list"
          >
            {getPosts.map((item: any) => {
              const { writer, comments } = item;

              return (
                <li
                  key={item.id}
                  className="post-list__article"
                >
                  <article>
                    <h3>{item.title}</h3>
                    <p>{item.body}</p>
                    <div className="post-list__writer"><span>{writer.name}</span></div>
                  </article>
                  {commentList(comments)}
                </li>
              );
            })
            }
          </ul>
        </div>
      );
    }}
  </Query>
);

export default Posts;
