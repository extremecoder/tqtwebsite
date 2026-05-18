# ThinkQuantum Technologies Website

A static one-page website for ThinkQuantum Technologies. It uses plain HTML,
CSS, and JavaScript, so it can be published on Cloudflare Pages without a build
command.

## Local preview

```bash
python3 -m http.server 8787
```

Then open `http://localhost:8787`.

## Cloudflare Pages

1. Push this folder to a GitHub or GitLab repository.
2. In Cloudflare, open **Workers & Pages** and create a Pages project.
3. Connect the repository.
4. Use these settings:
   - Build command: leave blank
   - Build output directory: `/`
5. Add your custom domain in the Pages project domain settings.

Before publishing, update the email and phone number in `index.html` if needed.
