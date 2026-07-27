# Security Specification

## 1. Data Invariants
- A Book belongs to a specific user and must be stored in the `users/{userId}/books` subcollection.
- Only the authenticated user matching `userId` can read, create, update, or delete their books.
- The `userId` field on a Book must match the authenticated user's ID.
- `title`, `author`, `status`, `coverColor`, `id` must be strings.
- `totalPages`, `currentPage` must be numbers.
- `favorite` must be boolean.
- `status` must be 'reading', 'to_read', or 'finished'.

## 2. The "Dirty Dozen" Payloads
1. **Unauthenticated Write**: Missing `request.auth`
2. **Identity Spoofing (Create)**: `userId` does not match `request.auth.uid`
3. **Identity Spoofing (Path)**: Writing to `users/OTHER_ID/books/my_book`
4. **Missing Required Fields**: Creating a book without `title` or `author`
5. **Type Poisoning**: `totalPages` is a string instead of a number
6. **Value Poisoning**: `status` is 'dropped' (invalid enum)
7. **Shadow Field Injection**: Adding an unmapped field like `isAdmin: true`
8. **Size/Length DoS**: `notes` exceeds reasonable size (e.g., 10KB string)
9. **Update Gap**: Updating a book to change its `userId`
10. **Unauthorized Read**: Reading from another user's books collection
11. **List Query Trust**: Listing books without where clause matching auth.uid (Though in subcollections, path is restricted)
12. **Id Poisoning**: `bookId` is not a valid ID format.

## 3. Test Runner
Will be implemented in `firestore.rules.test.ts`.
