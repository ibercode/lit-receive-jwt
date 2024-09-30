// src/main.ts
import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('my-app')
export class MyApp extends LitElement {
  @property() jwt: string = '';

  // Render method to display the JWT
  render() {
    return html`
      <h1>Vite-LIT App</h1>
      <p>Waiting for JWT...</p>
      ${this.jwt ? html`<p>Received JWT: ${this.jwt}</p>` : ''}
    `;
  }

  // Lifecycle hook to signal readiness and listen for JWT
  connectedCallback() {
    super.connectedCallback();

    // Send a message back to the Angular app to indicate readiness
    window.opener?.postMessage('ready-for-jwt', 'http://localhost:4200');

    // Listen for incoming JWT from the Angular app
    window.addEventListener('message', (event) => {
      if (event.origin !== 'http://localhost:4200') return; // Ensure it's from the Angular app

      const jwtToken = event.data.jwt;
      if (jwtToken) {
        console.log('Received JWT via postMessage:', jwtToken);
        this.jwt = jwtToken; // Store the received JWT and update the view
        this.requestUpdate();
      }
    });
  }
}
