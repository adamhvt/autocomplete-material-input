# autocomplete-material-input
An autocomplete input built with Angular, RxJS and Material design using asynchronous REST API and TypeScript generics.

The main idea behind this component is to find a proper solution for an optimized and user friendly autocomplete input.
The autocomplete input currently uses GitHub's user search API for querying users based on the given input.

**The execution of a query is the following**
1. The component gets subscribed to the input's value changes. It could have been solved by some other ways, i.e. by creating an RxJS Subject for search terms on which the subsciption could be made and the subject could emit new terms on keyup event.

2. filter( (term: string) => term.length > 0) will ensure that the stream emits only search terms with lengths greater than 0. You can actually use a higher value here if you want to eliminate short searches.

3. debounceTime throttles the request, i.e. we make the request only after the user has paused typing for a given time.

4. distinctUntilChanged() will ensure that only distinct data passes through. If the user types something, erases a character quickly, and then types back the same character, distinctUntilChanged will only send the data once.

5. Using the tap operator a variable for the loader is set to true, so we can display a loading indicator for the user

6. We use the switchMap operator to abort previous calls, it will unsubscribe from the previous observable.

7. With the take(1) operator we ensure we unsubscribe from the stream created for each term. Another solution could have been to use async pipe in the template in the ngFor directive, which unsubscribes automatically when the component gets destroyed.

8. finalize operator is used to set the loading indicator to false when the request gets answered

**Further improvements/ still working on**
- Isolating the autocomplete component from app component
- Making the isolated autocomplete component reusable with generics
