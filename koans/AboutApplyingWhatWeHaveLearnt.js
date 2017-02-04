var _; // globals

describe("About Applying What We Have Learnt", function() {
  var products;

  beforeEach(function () { 
    products = [
       { name: "Sonoma", ingredients: ["artichoke", "sundried tomatoes", "mushrooms"], containsNuts: false },
       { name: "Pizza Primavera", ingredients: ["roma", "sundried tomatoes", "goats cheese", "rosemary"], containsNuts: false },
       { name: "South Of The Border", ingredients: ["black beans", "jalapenos", "mushrooms"], containsNuts: false },
       { name: "Blue Moon", ingredients: ["blue cheese", "garlic", "walnuts"], containsNuts: true },
       { name: "Taste Of Athens", ingredients: ["spinach", "kalamata olives", "sesame seeds"], containsNuts: true }
    ];
  });

  /*********************************************************************************/

  it("given I'm allergic to nuts and hate mushrooms, it should find a pizza I can eat (imperative)", function () {
    var i,j,hasMushrooms, productsICanEat = [];

    for (i = 0; i < products.length; i+=1) {
        if (products[i].containsNuts === false) {
            hasMushrooms = false;
            for (j = 0; j < products[i].ingredients.length; j+=1) {
               if (products[i].ingredients[j] === "mushrooms") {
                  hasMushrooms = true;
               }
            }
            if (!hasMushrooms) productsICanEat.push(products[i]);
        }
    }

    expect(productsICanEat.length).toBe(1);
  });

  it("given I'm allergic to nuts and hate mushrooms, it should find a pizza I can eat (functional)", function () {
      var productsICanEat = [];

      /* solve using filter() & all() / any() */
      productsICanEat = _.filter(products, function(object) {
        // Why doesn't _.any work?
        // Have to use _.all!
        return !object.containsNuts && _.all(object.ingredients, function(ingredient) {
          //console.log(ingredient);
          return ingredient !== 'mushrooms';
        });
      });

      expect(productsICanEat.length).toBe(1);
  });

  /*********************************************************************************/

  it("should add all the natural numbers below 1000 that are multiples of 3 or 5 (imperative)", function () {
    var sum = 0;

    for(var i=1; i<1000; i+=1) {
      if (i % 3 === 0 || i % 5 === 0) {
        sum += i;
      }
    }
    
    expect(sum).toBe(233168);
  });

  it("should add all the natural numbers below 1000 that are multiples of 3 or 5 (functional)", function () {
    var sum = _.reduce(_.range(1, 1000), function(accumulator, current) {
      if (current % 3 == 0 || current % 5 == 0) {
        return accumulator + current;
      }
      return accumulator;
    }, 0);

    /* try chaining range() and reduce() */

    //console.log(sum);

    expect(233168).toBe(sum);
  });

  /*********************************************************************************/
   it("should count the ingredient occurrence (imperative)", function () {
    var ingredientCount = { "{ingredient name}": 0 };

    for (i = 0; i < products.length; i+=1) {
        for (j = 0; j < products[i].ingredients.length; j+=1) {
            ingredientCount[products[i].ingredients[j]] = (ingredientCount[products[i].ingredients[j]] || 0) + 1;
        }
    }

    expect(ingredientCount['mushrooms']).toBe(2);
  });

  it("should count the ingredient occurrence (functional)", function () {
    var ingredientCount = { "{ingredient name}": 0 };

    /* chain() together map(), flatten() and reduce() */

    ingredientCount = _.chain(products)
      .map(function(object) { return object.ingredients; })
      .flatten()
      .reduce(function(accumulator, current){
        if (accumulator[current]) {
          accumulator[current] += 1;
          return accumulator;
        }
        accumulator[current] = 1;
        return accumulator;
      }, {})
      .value();

    //console.log(ingredientCount);

    expect(ingredientCount['mushrooms']).toBe(2);
  });

  /*********************************************************************************/
  /* UNCOMMENT FOR EXTRA CREDIT */

  it("should find the largest prime factor of a composite number", function () {
    var largestPrimeFactor = function(number) {
      // prime = only divisible by itself and 1

      var isPrime = function(number) {
        for (var j = 2; j < number; j++) {
          if (number % j == 0) {
            return false;
          }
        }
        return true;
      }

      /*var primeFactor = 0;

      for (var i = 0; i < number; i++) {
        // check if factor
        if (number % i == 0) {
          // check if i is prime
          if(isPrime(i)) {
            //console.log(i);
            primeFactor = i;
          }
        }
      }
      return primeFactor;*/

      var range = _.range(1, number);

      var largestPrimeFactor = _.chain(range)
        .filter(function(element) {
          return number % element == 0 && isPrime(element);
        })
        .last()
        .value();

      return largestPrimeFactor;
    }

    expect(largestPrimeFactor(398)).toBe(199);
  });

  it("should find the largest palindrome made from the product of two 3 digit numbers", function () {
    
    var threeDigitNumbers = _.range(100, 1000);

    var products = [];

    function isPalindrome(number) {
      return number == JSON.stringify(number).split('').reverse().join('');
    }

    _.each(threeDigitNumbers, function(element1) {
      _.each(threeDigitNumbers, function(element2) {
        //products.push([element1, element2, element1 * element2]);
        products.push({
          number1: element1,
          number2: element2,
          product: element1 * element2
        });
      });
    })

    var largestPalindrome = _.chain(products)
      // map: multiply array by each element in array
      // filter palindromes
      // return largest element
      .filter(function(object) {
        return isPalindrome(object.product);
      })
      .reduce(function(accumulator, current) {
        return current.product > accumulator.product ? current : accumulator;
      })
      .value();

      // console.log(largestPalindrome);

      expect(largestPalindrome.product).toBe(906609);

  });

  it("should find the smallest number divisible by each of the numbers 1 to 20", function () {
      
    
  });

  it("should find the difference between the sum of the squares and the square of the sums", function () {
    
  });

  it("should find the 10001st prime", function () {

  });

});
