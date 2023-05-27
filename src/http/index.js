import http from "http";

export const app_with_http_server = () => {
  const html_header = { "Content-Type": "text/html" };

  http.createServer((req, res) => {
    // res.writeHead(200, html_header);
    res.end("<h1>hola!</h1>");
    console.log("req:", req.url);
  }).listen(process.env.PORT || 3000, () => {
    console.log("started listening on:", 3000);
  });
};
