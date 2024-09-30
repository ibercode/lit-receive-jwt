window.addEventListener('message', (event) => {
  // Ensure the message is from the Angular app on localhost:4200
  if (event.origin !== 'http://localhost:4200') return;

  const jwtToken = event.data.jwt;
  if (jwtToken) {
    console.log('Received JWT:', jwtToken);
    const tokenDisplay = document.createElement('p');
    tokenDisplay.innerText = `Received JWT: ${jwtToken}`;
    document.body.appendChild(tokenDisplay);
  }
});
