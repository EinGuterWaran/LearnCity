document.addEventListener('DOMContentLoaded',(event) => {
   const pTag =  document.createElement('p');
   pTag.innerText = 'Hello World'
   const body = document.getElementById('app');
   body.appendChild(pTag);
   console.log(event)
})