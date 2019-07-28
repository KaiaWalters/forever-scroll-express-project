// main.js
var update = document.getElementById('update')
var quotes = document.getElementsByClassName("quote")
var trash = document.getElementsByClassName("fas fa-trash")
var upvote = document.getElementsByClassName("fas fa-vote-yea")


var del = document.getElementById('delete')

del.addEventListener('click', function () {
  alert("working")
  const name = this.parentNode.parentNode.childNodes[1].innerText
  fetch('quotes', {
    method: 'delete',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      'name': name
    })
  })
  .then(res => {
    if (res.ok) return res.json()
  }).
  then(data => {
    console.log(data)
    window.location.reload()
  })
})

// change class name of clicked item and mark it for deletion
// Array.from(quotes).forEach(function(element) {
// element.addEventListener('click', function (){
//   alert("working")
//   quotes.classList.add("deleteNow")
//   //quotes.classList.remove("selected")
// })
//
// });


Array.from(upvote).forEach(function(element) {
      element.addEventListener('click', function(){
        alert("alert")
        const name = element.getAttribute("data-name")
        const msg = element.getAttribute("data-quotes")
        //const thumbUp = parseFloat(this.parentNode.parentNode.childNodes[5].innerText)
        //TODO: am getting toom any request error when i send the fetch. Can not prevent check bx from being red for the put
        console.log('NAME HERE', name, 'MESSAGE HERE', msg)
        fetch('quotes', {
          method: 'put',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            'name': name,
            'msg': msg,
          })
        })
        .then(response => {
          if (response.ok) return response.json()
        })
        .then(data => {
          console.log(data)
          window.location.reload(true)
        })
      });
});



Array.from(trash).forEach(function(element) {
      element.addEventListener('click', function(){
        alert("Node")
        const name = this.parentNode.parentNode.childNodes[1].innerText
        const quote = this.parentNode.parentNode.childNodes[3].innerText
        console.log(name,quote)
        fetch('quotes', {
          method: 'delete',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ //turns data into a sJSON object to be sent back and fort
            'quote': quote,
            'name': name
          })
        }).then(function (response) {
          window.location.reload()
        })
      });
});
