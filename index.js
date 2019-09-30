'use strict'


const selectUrl = 'https://openapi.etsy.com/v2/listings/active.js';
const apiKey = 'hwox3uujwstcvm3eibnbf9rf';

function formatQueryParams(params) {
  const queryItems = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
  return queryItems.join('&');
}

function displayResults(responseJson) {

  let htmlStr=''
  for(let i=0; i<responseJson.results.length; i++){
    let r=responseJson.results[i]
    htmlStr+=`<a target"_blank" href="${r.url}"><h2>${r.title}</h2><div>${r.price}</div></a>`
  }

$('#root').html(htmlStr);
    
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

  $.ajax({
    url: url, 
    jsonp: "callback",
    dataType: "jsonp",
    data: {
      format: "json"
    }, 
    success: function( response ) {
      displayResults(response);
      console.log( response );
    },
    error:function(xhr,status,error){
      console.log(xhr,status,error)
    },
    complete:function(){
      console.log('complete ')
    },


  })
}

function watchForm() {
  $('form').submit(event => {
    getEtsyInfo(($('select').val()))
    if($('select').val() === "Select Heels")

{ alert("Please select heels"); return; }

    event.preventDefault();
    console.log($('select').val())
  });
}

$(watchForm);
