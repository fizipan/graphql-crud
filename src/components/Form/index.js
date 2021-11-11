import React from 'react';

import { Link, useNavigate } from 'react-router-dom';

import { NEW_BOOK } from '../../gql/books';

import { useMutation } from '@apollo/client';

export default function Form(props) {
  // Navigate router
  const navigate = useNavigate();

  // Use mutation
  const [addBook, { loading, error }] = useMutation(NEW_BOOK);

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
