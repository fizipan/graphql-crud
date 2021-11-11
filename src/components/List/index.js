import React from 'react';

import { Link } from 'react-router-dom';

import { GET_BOOKS } from '../../gql/books';

import { useQuery } from '@apollo/client';

export default function List(props) {
  const { loading, error, data } = useQuery(GET_BOOKS);

  if (loading) return <p>Loading...</p>;

  if (error) {
    return error?.graphQLErrors.map(((message) => error) ?? error.networkError);
  }

  if (data.getAllBooks.length === 0) {
    return <p>No books found</p>;
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
        <div key={book.id}>
          <Link to={`/books/${book._id}`}>{book.title}</Link>
        </div>
      ))}
    </div>
  );
}
