import React from 'react';

import { Link } from 'react-router-dom';

import { GET_BOOKS, DELETE_BOOK } from '../../gql/books';

import { useMutation, useQuery } from '@apollo/client';

export default function List(props) {
  // useState
  const [id, setId] = React.useState(null);

  const { loading, error, data } = useQuery(GET_BOOKS, {
    fetchPolicy: 'no-cache',
  });

  const [deleteBook, { loading: loadingDeleteBook, error: errorDeleteBook }] =
    useMutation(DELETE_BOOK, {
      refetchQueries: [GET_BOOKS],
      onerror: (res) => {
        console.log(res.networkError);
      },
    });

  function handleDeleteBook(_id) {
    setId(_id);
    deleteBook({
      variables: { _id },
    });
  }

  if (loading) return <p>Loading...</p>;

  if (error) {
    return error?.graphQLErrors.map(((message) => error) ?? error.networkError);
  }

  if (data.getAllBooks.length === 0) {
    return (
      <p>
        No books found <Link to="/books/new">Add Book</Link>
      </p>
    );
  }

  return (
    <div>
      <h1>
        List Buku
        <Link to="/books/new" style={{ fontSize: 12 }}>
          Buat Buku
        </Link>
      </h1>
      {data.getAllBooks.map((book) => (
        <div key={book._id}>
          {book.title} (<Link to={`/books/${book._id}/edit`}>Edit</Link>) (
          <span
            style={{
              textDecoration: 'underline',
              cursor: 'pointer',
              color: 'blue',
            }}
            onClick={() => handleDeleteBook(book._id)}
          >
            {id === book._id && loadingDeleteBook ? 'Deleting...' : 'Delete'}
          </span>
          )
        </div>
      ))}
    </div>
  );
}
