import { beforeEach, describe, expect, it } from 'vitest';

import type { Book } from './book';
import { BookService } from './book-service';

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

  // Test : L'ajout d'un livre ayant totalCopies à 0 ou négatif ne doit pas fonctionner

  // Test : Emprunter un livre doit décrémenter availableCopies

  // Test : Ne pas emprunter un livre dont availableCopies est égal à 0

  // Test : Ne pas emprunter un livre qui n'existe pas

  // Test : Retourner un livre doit incrémenter availableCopies

  // Test : Ne pas retourner un livre qui n'existe pas

  // Test : Ne pas retourner un livre dont toutes les copies ont déjà été rendues

  // Ajoute des tests de ton choix pour les autres méthodes
});
