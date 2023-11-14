## Usage and API docs

Refer to [API Documentation](docs.md)

## Development

Ensure you have all dependencies:

```bash
npm install
```

### To start dev environment

```bash
npm run dev
```

### To compile for "prod" environment:

```bash
npm run build
```

This will generate a `./output` folder.

### To use the folder.

1. Copy the folder (self-contained to your prod environment).

2. Adjust `serverconfig.json`, to your needs.

3. Install necessary packages. Perform `npm install --omit=dev`

4. Perform `npm start` alternative directly via `node main.js`.

# Small HTTPS note:

Certificate must not be normal .pem format but instead certificate must be CRT format.

### Transform PEM to CRT (using key)

```bash
openssl x509 -req -days 365 -in csr.pem -signkey key.pem -out server.crt
```
