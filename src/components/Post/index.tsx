import React from 'react';
import { Mutation, Query } from 'react-apollo';
import { GET_POSTS, SET_LIKE } from '../../graphql/queries/post';
import './Post.scss';

const Posts = () => (
  <Query query={GET_POSTS} errorPolicy="all">
    {({
      loading, error, data, refetch
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

      const likeButton = (like: any, postId: number) => {
        
        let isActive = false;

        if (like) {
          const { isLike } = like;

          isActive = !!isLike;
        }
        
        return (
          <Mutation
            mutation={SET_LIKE}
            key={postId}
          >
            {(setLike: any, { loading: btnLoading, error: btnError, data: btnData }: any) => {

              if (btnLoading) { console.log('Fetch Loading');
                return <span>Loading</span>;
              }
              if (btnError) { console.log('Fetch Loading', btnError.message); }
              
              if (btnData) {
                refetch();
              }

              return (
                <button
                  className="post-list__like-btn"
                  data-testid="like-button"
                  style={{
                    backgroundColor: isActive ? '#ff0033' : "#dddddd",
                  }}
                  onClick={() => {
                    setLike({variables: {
                      like: {
                        postId: +postId,
                        isLike: !isActive,
                      }
                    }});
                  }}
                >
                  Like
                </button>
              );
            }}
          </Mutation>
        );
      };

      return (
        <div className="post-list">
          <ul
            data-testid="post-list"
          >
            {getPosts.map((item: any) => {
              const { writer, comments, like } = item;

              return (
                <li
                  key={item.id}
                  className="post-list__article"
                >
                  <article>
                    <h3>{item.title}</h3>
                    <p>{item.body}</p>
                    {likeButton(like, item.id)}
                    <div className="post-list__writer"><span>{writer.name}</span></div>
                  </article>
                  {comments && commentList(comments)}
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
