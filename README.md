# shorty
A URL shortener built with node.js.

## Example usage
* you can visit `localhost:PORT/` to get a simple to use webpage for shortening.
* a `GET` request to `localhost:PORT/create/http://www.google.com/` will return an object like this
  ```
    {
      "link": "http://www.google.com/",
      "short": "EkfX7PQag"
    }
  ```
* a `GET` request to `localhost:PORT/go/EkfX7PQag` will redirect you to `http://www.google.com/`.

## Installation
1. Clone the repo using `git clone https://github.com/Demon000/shorty.git`.
2. `cd` into the `shorty directory`
3. Run `npm install` to install the dependencies.
4. Edit the `.env` file to specify the PORT you want to run the shortener on. 
5. Run `node shoty.js` to start the shortener.
