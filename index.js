'use strict'


const selectUrl = 'https://openapi.etsy.com/v2/listings/active';
const apiKey = 'hwox3uujwstcvm3eibnbf9rf';

function formatQueryParams(params) {
  const queryItems = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
  return queryItems.join('&');
}

function displayResults(responseJson) {


    
}

function getEtsyInfo(query,limit=10) {
  const params = {
    api_key: apiKey,
    keywords: query,
    limit: limit,
  };
  const queryString = formatQueryParams(params)
  const url = selectUrl + '?' + queryString;
  console.log(url);

  fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson))
    .catch(err => {
      alert ("Something went wrong. Please check input")
    });
}

function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    console.log($('select').val())
  });
}

$(watchForm);