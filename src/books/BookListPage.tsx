import { useState } from 'react';

import { bookService } from './book-service';

export function BookListPage() {
  const [books, setBooks] = useState(() => [...bookService.getBooks()]);

  function refreshBooks() {
    setBooks([...bookService.getBooks()]);
  }

  function borrowBook(id: number) {
    const success = bookService.borrowBook(id);
    if (!success) {
      alert('No copies available to borrow.');
    }
    refreshBooks();
  }

  function returnBook(id: number) {
    const success = bookService.returnBook(id);
    if (!success) {
      alert('All copies are already returned.');
    }
    refreshBooks();
  }

  function deleteBook(id: number) {
    bookService.deleteBook(id);
    refreshBooks();
  }

  return (
    <>
      <h2>Book List</h2>

      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Available Copies</th>
            <th>Total Copies</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book.id}>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>{book.availableCopies}</td>
              <td>{book.totalCopies}</td>
              <td>
                <button type="button" onClick={() => borrowBook(book.id)}>
                  Borrow
                </button>
                <button type="button" onClick={() => returnBook(book.id)}>
                  Return
                </button>
                <button type="button" onClick={() => deleteBook(book.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
