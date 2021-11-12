import React from 'react';

import { Link, useNavigate, useParams } from 'react-router-dom';

import { NEW_BOOK, GET_BOOK, UPDATE_BOOK } from '../../gql/books';

import { useMutation, useLazyQuery } from '@apollo/client';

export default function Form(props) {
  // Navigate router
  const navigate = useNavigate();

  // Get params
  const params = useParams();

  // Use mutation create
  const [addBook, { loading: loadingAddBook, error: errorAddBook }] =
    useMutation(NEW_BOOK);

  // use LazyQuery get book
  const [getBook, { data: dataBook, loading: loadingBook, error: errorBook }] =
    useLazyQuery(GET_BOOK, {
      variables: { _id: params.id },
    });

  // update book
  const [updateBook, { loading: loadingUpdateBook, error: errorUpdateBook }] =
    useMutation(UPDATE_BOOK);

  // check if params is available and get book
  React.useEffect(() => {
    if (params.id) {
      getBook();
    }
  }, [params.id, getBook]);

  // enter getbook to input
  React.useEffect(() => {
    if (dataBook) {
      const form = document.getElementById('form-book');
      for (let i = 0; i < form.length; i++) {
        const data = form[i];

        if (data.nodeName === 'INPUT') {
          data.value = dataBook.getBook[data.name];
        }
      }
    }
  }, [dataBook]);

  // Handle Submit
  async function handleOnSubmit(e) {
    e.preventDefault();

    const target = e.target;

    let formData = {};

    for (let i = 0; i < target.length; i++) {
      const data = target[i];
      if (data.nodeName === 'INPUT') {
        formData[data.name] = data.value;
      }
    }

    if (params.id) {
      try {
        const res = await updateBook({
          variables: {
            ...formData,
            _id: params.id,
            release_year: parseInt(formData.release_year),
          },
        });

        if (res) {
          navigate('/books');
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        const res = await addBook({
          variables: {
            ...formData,
            release_year: parseInt(formData.release_year),
          },
        });

        if (res) {
          navigate('/books');
        }
      } catch (error) {
        console.log(error);
      }
    }
  }

  // Check error
  if (params.id && loadingBook) return 'loading....';

  if (errorAddBook || errorBook) return 'Network error';

  return (
    <div>
      <h1>
        <Link to="/books" style={{ fontSize: 12 }}>{`(<= Back)`}</Link>
        Formulir Penambahan Buku
      </h1>

      {/* Form */}
      <form id="form-book" style={{ maxWidth: 500 }} onSubmit={handleOnSubmit}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <label htmlFor="title">Title</label>
          <input type="text" id="title" name="title" />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <label htmlFor="author">Author</label>
          <input type="text" id="author" name="author" />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <label htmlFor="description">Description</label>
          <input type="text" id="description" name="description" />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <label htmlFor="release_year">Release Year</label>
          <input type="number" id="release_year" name="release_year" />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <label htmlFor="genre">genre</label>
          <input type="text" id="genre" name="genre" />
        </div>

        <button type="button" onClick={() => navigate('/books')}>
          Back
        </button>

        <button type="submit">Save Book</button>
      </form>
    </div>
  );
}
