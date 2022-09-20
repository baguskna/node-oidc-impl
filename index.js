const express = require("express");
const { Provider } = require("oidc-provider");
const path = require("path");

const app = express();

//Middlewares
app.use(express.static(__dirname + "/public"));

const configuration = {
  clients: [
    {
      client_id: "oidcCLIENT",
      client_secret: "Some_super_secret",
      grant_types: ["authorization_code"],
      redirect_uris: [
        "http://localhost:8080/auth/login/callback",
        "https://oidcdebugger.com/debug",
      ],
      response_types: ["code"],

      //other configurations if needed
    },
  ],
  pkce: {
    required: () => false,
  },
};

const oidc = new Provider("http://localhost:3000", configuration);

app.use("/oidc", oidc.callback());

app.listen(4200, function () {
  console.log("OIDC is listening on port 4200!");
});
