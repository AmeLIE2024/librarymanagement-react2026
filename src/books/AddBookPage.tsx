import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router';

import type { Book } from './book';
import { bookService } from './book-service';

export function AddBookPage() {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [totalCopies, setTotalCopies] = useState(0);

  function addBook(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const newBook: Book = {
      id: Math.floor(Math.random() * 1000),
      title,
      author,
      availableCopies: totalCopies,
      totalCopies,
    };

    bookService.addBook(newBook);
    setTitle('');
    setAuthor('');
    setTotalCopies(0);
    navigate('/');
  }

  return (
    <>
      <h2>Add Book</h2>

      <form onSubmit={addBook}>
        <label htmlFor="title">
          <span>Title:</span>
          <input
            id="title"
            name="title"
            type="text"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
        </label>

        <label htmlFor="author">
          <span>Author:</span>
          <input
            id="author"
            name="author"
            type="text"
            value={author}
            onChange={(event) => setAuthor(event.target.value)}
          />
        </label>

        <label htmlFor="copies">
          <span>Total Copies:</span>
          <input
            id="copies"
            name="totalCopies"
            type="number"
            value={totalCopies}
            onChange={(event) => setTotalCopies(Number(event.target.value))}
          />
        </label>

        <button type="submit">Add Book</button>
      </form>
    </>
  );
}
