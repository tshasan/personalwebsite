document.addEventListener('DOMContentLoaded', function() {
  // Using a CORS Anywhere proxy
  const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
  const targetUrl = 'https://zenquotes.io/api/random';
  
  fetch(proxyUrl + targetUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
      }
      return response.json();
    })
    .then(data => {
      if (data && data.length > 0) {
        const quote = data[0].q;
        const author = data[0].a;
        displayQuote(quote, author);
      }
    })
    .catch(error => {
      console.error('There has been a problem with your fetch operation:', error);
    });
});

function displayQuote(quote, author) {
  const quoteElement = document.getElementById('quoteoftheday');
  if (quoteElement) {
    quoteElement.innerHTML = `"${quote}"<br>— ${author}`;
  } else {
    console.error('No element with ID `quoteoftheday` found.');
  }
}
