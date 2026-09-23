import { beforeEach, describe, expect, it } from 'vitest';

import type { Book } from './book';
import { BookService } from './book-service';
import {resume} from "react-dom/server";

describe('BookService', () => {
  let service: BookService;

  beforeEach(() => {
    service = new BookService();
  });

  it('should add a book correctly', () => {
    const book: Book = {
      id: 10,
      title: 'Test Book',
      author: 'Author',
      availableCopies: 1,
      totalCopies: 1,
    };

    const result = service.addBook(book);

    expect(result).toBe(true);
  });

  // Test : L'ajout d'un livre sans titre ne doit pas fonctionner
  it('should not add a book without a title', () => {
    const book: Book = {
      id: 11,
      title: '',
      author: 'Author',
      availableCopies: 1,
      totalCopies: 1,
    };

    const result = service.addBook(book);

    expect(result).toBe(false);
  });

  // Test : L'ajout d'un livre ayant totalCopies à 0 ou négatif ne doit pas fonctionner
  it('should not add a book with totalCopies less than or equal to 0', () => {
    const book: Book = {
      id: 12,
      title: 'Test Book',
      author: 'Author',
      availableCopies: 1,
      totalCopies: 0,
    }

    const result = service.addBook(book);
    expect(result).toBe(false);
  });
  // Test : Emprunter un livre doit décrémenter availableCopies
  it('should decrement availableCopies when borrowing a book', () => {
    const book: Book = {
      id: 13,
      title: 'Test Book',
      author: "Author",
      availableCopies: 1,
      totalCopies: 1,
    }
    //initialisation du livre dans le service
    const addedBook = service.addBook(book);
    expect(addedBook).toBe(true);
    const result = service.borrowBook(book.id);
    expect(result).toBe(true);
    const borrowedBook = service.getBooks().find(b => b.id === book.id);
    expect(borrowedBook?.availableCopies).toBe(0);
  });

  // Test : Ne pas emprunter un livre dont availableCopies est égal à 0
  it('should not borrow a book with availableCopies equal to 0', () => {
    const book: Book = {
      id: 13,
      title: 'Test Book',
      author: "Author",
      availableCopies: 0,
      totalCopies: 1,
    }

    const addedBook = service.addBook(book);
    expect(addedBook).toBe(true);
    const result = service.borrowBook(book.id);
    expect(result).toBe(false);

  });
  // Test : Ne pas emprunter un livre qui n'existe pas
  it('should not borrow a book that does not exist', () => {
    const result = service.borrowBook(999);
    expect(result).toBe(false);
  });
  // Test : Retourner un livre doit incrémenter availableCopies
  it('should increment availableCopies when returning a book', () => {
    const book: Book = {
      id: 14,
      title: 'Test Book',
      author: "Author",
      availableCopies: 0,
      totalCopies: 1,
    }

    const addedBook = service.addBook(book);
    expect(addedBook).toBe(true);
    const result = service.returnBook(book.id);
    expect(result).toBe(true);
    const returnedBook = service.getBooks().find(b => b.id === book.id);
    expect(returnedBook?.availableCopies).toBe(1);
  });
  // Test : Ne pas retourner un livre qui n'existe pas
  it('should not return a book that does not exist', () => {
    const result = service.returnBook(999);
    expect(result).toBe(false);
  });
  // Test : Ne pas retourner un livre dont toutes les copies ont déjà été rendues
  it('should not return a book if all copies are already returned', () => {
    const book: Book = {
      id: 15,
      title: 'Test Book',
      author: "Author",
      availableCopies: 3,
      totalCopies: 3,
    }
    const addedBook = service.addBook(book);
    expect(addedBook).toBe(true);
    const result = service.returnBook(book.id);
    expect(result).toBe(false);
  });

  // Test : Supprimer un livre doit le retirer de la liste
  it('should remove a book from the list when deleted', () => {
    const book: Book = {
      id: 16,
      title: 'Test Book',
      author: "Author",
      availableCopies: 3,
      totalCopies: 3,
    };
    const addedBook = service.addBook(book);
    expect(addedBook).toBe(true);
    const result = service.deleteBook(book.id);
    expect(result).toBe(true);
    const deletedBook = service.getBooks().find(b => b.id === book.id);
    expect(deletedBook).toBeUndefined();
  });

  // Test : Ne pas supprimer un livre avec un id invalide
  it('should not delete a book with an invalid id', () => {
    const result = service.deleteBook(null as unknown as number);
    expect(result).toBe(false);
  });

});
