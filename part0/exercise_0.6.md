# New note in Single page app diagram

```mermaid
sequenceDiagram
  participant browser
  participant server

  browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
  activate server
  server-->>browser: {"message":"note created"}
  deactivate server

  Note right to the browser: The content of html has been altered without the need of redirecting
```