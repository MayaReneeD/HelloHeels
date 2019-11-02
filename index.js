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
  if($('select').val() === "Pump Heels"){ 
    htmlStr+=`
    <img class="pumps" alt="Pump Heels" src="https://www.neimanmarcus.com/product_assets/X/4/T/G/B/NMX4TGB_mk.jpg">
    `
  }
    if($('select').val() === "Glitter Heels"){ 
      htmlStr+=`
      <img class="glitter" alt="Glitter Heels" src="https://www.wittner.com.au/media/catalog/product/cache/1/image/391x/040ec09b1e35df139433887a97daa66f/d/e/delores_silver_2_2.jpg">
      `
  }
  if($('select').val() === "Kitten Heels"){ 
    htmlStr+=`
    <img class="kitten" alt="Kitten Heels" src="http://www.narsuitespera.com/images/447/722195_9511.jpg">
    `

  }
  if($('select').val() === "Lace Up Heels"){ 
    htmlStr+=`
    <img class="lace" alt="Lace Heels" src="https://img-static.tradesy.com/item/25089364/pink-nude-lace-up-heel-sandals-size-us-9-regular-m-b-0-1-960-960.jpg">
    `

  }
  if($('select').val() === "Low Heels"){ 
    htmlStr+=`
    <img class="low" alt="Low Heels" src="https://cdn-images.farfetch-contents.com/14/15/29/28/14152928_21067865_600.jpg">
    `

  }
  if($('select').val() === "Mid Heels"){ 
    htmlStr+=`
    <img class="mid" alt="Mid Heels" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvxT0Pn1pZYE4LXdVlha7P9bCz5sU1gMUJkTGhCVwPsLwOTZDG&s">
    `
  }

  if($('select').val() === "High Heels"){ 
  htmlStr+=`
  <img class="high" alt="High Heels" src="https://www.nooshoes.co.uk/wp-content/uploads/2016/06/js_IMG_7611.jpg">
  `

}

if($('select').val() === "Wedge Heels"){ 
htmlStr+=`
<img class="wedge" alt="Wedge Heels" src="http://www.jcwntech.co.za/images/cate_4/640/Back-Zip-Cut-Out-Sandals-Platform-Peep-Toe-High-Wedge-Heel-Womens-Shoes-Stylish-Pink-VWOUqvgd63-hvl0.jpg">
`

}

if($('select').val() === "Sandal Heels"){ 
htmlStr+=`
<img class="sandal" alt="Sandal Heels" src="https://images.prod.meredith.com/product/25c2753b615ae1433daba5c3ec9bed10/1551573449509/l/ellie-85mm-ankle-strap-sandal-654-heeled-sandals-pink-tory-burch-heels">
`

}

if($('select').val() === "Mule Heels"){ 
htmlStr+=`
<img class="mule" alt="Mule Heels" src="http://www.fbcnevadacity.org/images/category_5/Dune%20Megg%20Block%20Heeled%20Mule%20Sandals%20Pink%20RK57908_4.jpg">
`

}

if($('select').val() === "Block Heels"){ 
htmlStr+=`
<img class="block" alt="Block Heels" src="https://img.cools.com/?h=300&trim=19&url=https://cdn-images.farfetch-contents.com/12/90/06/54/12900654_13216695_1000.jpg">
`

}


  for(let i=0; i<responseJson.results.length; i++){
    let r=responseJson.results[i]
    htmlStr+=`<section class="heels-card">
    <a class="heels-link" target="_blank"href="${r.url}"><h2>${r.title}</h2><div>$${r.price}</div><div>${r.materials[0]?r.materials[0]:""}</div><div>${r.when_made}</div></a>
</section>`
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
    
    event.preventDefault();
    
    if($('select').val() === "Select Heels"){ 
      alert("Please select heels"); 
      return; 
    }

    
    getEtsyInfo(($('select').val()))
    console.log($('select').val())
  });
}

$(watchForm);
