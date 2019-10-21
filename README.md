# Dot Five Dev Test

This project is in two parts:

1. `front-end` - React/MobX front-end
2. `test-project` -  Node/Sails.js back-end (Blueprint API)

To run the project, first build the front-end:

### `cd front-end`
### `npm i`
### `npm run build`

Now to run the back-end:

### `cd ../test-project`
### `npm i sails -g`
### `npm i`
### `sails lift`

Web app will be available on `http://localhost:1337`

### Trouble shooting

For some permissions reason, I had to run this command before I could install sails globally.

`sudo chown -R $(whoami) $(npm config get prefix)/{lib/node_modules,bin,share}`

### My answers to the questions can be found below

1. What is the difference between ++$a and $a++?

> While both increment the value of $a, the first expression is a pre-increment and evaluates to $a + 1,
the second is a post-increment and evaluates to $a

2. Can you explain the importance of late static binding? What is it, when would you use it, why do we care?

> If this is referring to the PHP feature, see (https://www.php.net/manual/en/language.oop5.late-static-bindings.php)
> If this a more general question, it's a bit of a confusing one because static binding is not late binding, it is early binding:
> > *"Static Binding (also known as Early Binding).*
> > *Dynamic Binding (also known as Late Binding)."*
> from (https://www.javatpoint.com/static-binding-and-dynamic-binding)
>
> Late binding on the other hand, is a very useful concept allowing the binding between code and functions to occur at runtime.

3. What is the difference between a closure, a callback, a lambda, and a promise?

> A callback is function that's passed to another function to be called later. 
> A closure is the scope, and execution context of a function and a lambda is a pure function.
A promise is an object that encapsulates an asynchronous operation, and can either produce a result 
or a failure, asynchronously or synchronously.

4. Explain logic short-circuiting, and how it can affect the code you write.

> Logical expressions are evaluated from left to right, only continuning as long as true (or a 'truthy' value) is returned by the expressions:
> example `a && b && c===foo()`, foo will only be called if `a && b` evaluates to `true`.

5. What is eager loading, and what are the pros and cons?

> Loading everything up front rather than as-needed, faster if there's not too much data and won't be in the future, but slower otherwise.

6. What is your opinion about where and when you should use protected versus private in class member 
definition?

> Use protected when other instances of the same class need access to the member.

7. When would you use a trait (or mixin) instead of classical inheritance, and why?

> When it's more convenient to mix and match properties than to define a hierarchy of types.

8. Can you give an example of when you would use two different sorting algorithms on the same data set, 
and why?

> Not sure if this referring to sort algorithm (heap/bubble etc.) - eg an insertion sort would be fastest  if the data is almost sorted already - or perhaps an alphabetical sort on eg a name property vs a date based sort..

9. When is it good to use a bitmask/bitset? Describe the advantages and disadvantages.

> Generally when working with raw data (eg parsing or writing files) and with colours. It can also be used to store a set of binary settings. A disadvantage of this is that it may be more difficult to query if it is in a database. An advantage might be faster processing of the data if it is stored and processed in a custom way.

10. When would you use a regular expression, a parser, and a simple string search?
Give examples.

> A regular expression is good for a simple search which needs to pull data out of a larger body of text.
> eg extract urls from text
> A parser is good for parsing a well defined type of data, which can map to an object stucture or stream of events. eg xml
> A simple string search would be good for a simple scenario where regular expressions are not needed.
> eg checking if a string contains a substring.

11. When is it appropriate to write unit tests, and when would you mock?

> Unit tests are primarily useful when it would be difficult to know if a unit of functionality is working correctly without having a set of tests to verify this on an ongoing basis. 
> Mocking is useful as tests should not depend on externalities, these can be mocked.

12. Give an example of how you would use defensive programming techniques to ensure robustness.

> Avoiding complexity and being very careful with state are two key techniques that I use.
> Writing pure functions with a single clear purpose is another one.

13. How can you tell quickly and simply whether MySQL is available on a remote server, and whether a 
local means of connecting to it exists?

> `which mysqld` will give the path if installed or `command not found `otherwise.

14. Do you think it is good or bad to commit “built” files? (E.g. the output of SCSS, etc.) Explain why.

> Bad, but if I saw it, I wouldn't make a fuss about it. Sometimes there is a 'reason'. It's bad because SCM are for *source* code. Built files are not source, and comparing and versioning them is also pretty meaningless.

15. What do you think about leaving out the closing tag in a PHP file?

> Not cool, I suppose. 

16. When would you use fully-normalised form, and when would you use JSON columns?

> Normalised is better if the data is highly interrelated and queries need to be run across that data.
> JSON columns could be a short cut for data that does not need to be related together or queried, perhaps data that is only used at the client side.

17. What is the difference between strict and schemaless data, and when would you use each?

> If the relationships and fields are well defined and interrelated, relational may be more appropriate.
> However, it is not unusual to use both, as they both have advantages.

18. What are the pros and cons of tabular polymorphism, and when would you use it or advise not to use it?

> I googled "tabular polymorphism", as it did not sound like a term I had heard before. I got 2 results: 
> 
> 1. *"haloperidol price philippines. | Công ty cổ phần Giấy Việt Hoa"*
> 2. *"View Combinatorial Properties Of The Hilbert Series Of Macdonald"*

19. When would you use a stored procedure and why?

> For a custom query, batch insert or something that an ORM has trouble with, for performance reasons.

20. What is your opinion about modelling relationships using foreign keys versus letting an ORM handle them?

> If using an ORM then I think it's best to let the ORM handle them. ORMs use foreign keys to do this.

21. When is ORM bad?

> When performance suffers, though may not always be the ORM's fault.

22. What is your pet hate coding smell, and why?

> using `=== true `or `=== false` to check if a boolean expression is equal to `true` or `false`  
> 
> e.g.
> 
> `(a && b === true )` instead of just `(a && b)`
> 
> Why? Because it shows a lack of understanding of basic concepts, and is common even with quite advanced programmers. 
> I am quite sure you have never done this. But I would not mention it if I saw it...

23. What was the most useful feature that was added to the latest version of your chosen language?
 Please include a snippet of code that shows how you've used it.

> Set. Now I can do `new Set([1,2,3])` instead of using `.reduce`. `.reduce` is one of my favourites too, although it has been around forever. I use it a lot more these days though. But for the very common operation of turning an array into a fast lookup, this is a cleaner, more explicit syntax.

24. Have you watched Mr Robot? (The dev team want to know!)

> No! But I will have to check it out after reading this question! 

25. Please describe yourself using JSON.
```

    {
      name: "tom",
      cats: ['Majari'],
      timeRemaining: 0
    }

```

# More questions!

● How long did you spend on the coding test?

Over 2 hours!

● Did you manage to cover everything that you wanted to?

Yes!

● What would you add to your solution if you had more time?

Tagging, images.

● Would you choose different technologies if this were to become a reliable
enterprise system? Why? Or, why not?

Would not use Sails disk provider as this is only meant for development.




