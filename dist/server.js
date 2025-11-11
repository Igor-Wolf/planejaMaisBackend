"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};

// ../../../node_modules/dotenv/package.json
var require_package = __commonJS({
  "../../../node_modules/dotenv/package.json"(exports2, module2) {
    module2.exports = {
      name: "dotenv",
      version: "16.4.5",
      description: "Loads environment variables from .env file",
      main: "lib/main.js",
      types: "lib/main.d.ts",
      exports: {
        ".": {
          types: "./lib/main.d.ts",
          require: "./lib/main.js",
          default: "./lib/main.js"
        },
        "./config": "./config.js",
        "./config.js": "./config.js",
        "./lib/env-options": "./lib/env-options.js",
        "./lib/env-options.js": "./lib/env-options.js",
        "./lib/cli-options": "./lib/cli-options.js",
        "./lib/cli-options.js": "./lib/cli-options.js",
        "./package.json": "./package.json"
      },
      scripts: {
        "dts-check": "tsc --project tests/types/tsconfig.json",
        lint: "standard",
        "lint-readme": "standard-markdown",
        pretest: "npm run lint && npm run dts-check",
        test: "tap tests/*.js --100 -Rspec",
        "test:coverage": "tap --coverage-report=lcov",
        prerelease: "npm test",
        release: "standard-version"
      },
      repository: {
        type: "git",
        url: "git://github.com/motdotla/dotenv.git"
      },
      funding: "https://dotenvx.com",
      keywords: [
        "dotenv",
        "env",
        ".env",
        "environment",
        "variables",
        "config",
        "settings"
      ],
      readmeFilename: "README.md",
      license: "BSD-2-Clause",
      devDependencies: {
        "@definitelytyped/dtslint": "^0.0.133",
        "@types/node": "^18.11.3",
        decache: "^4.6.1",
        sinon: "^14.0.1",
        standard: "^17.0.0",
        "standard-markdown": "^7.1.0",
        "standard-version": "^9.5.0",
        tap: "^16.3.0",
        tar: "^6.1.11",
        typescript: "^4.8.4"
      },
      engines: {
        node: ">=12"
      },
      browser: {
        fs: false
      }
    };
  }
});

// ../../../node_modules/dotenv/lib/main.js
var require_main = __commonJS({
  "../../../node_modules/dotenv/lib/main.js"(exports2, module2) {
    "use strict";
    var fs = require("fs");
    var path = require("path");
    var os = require("os");
    var crypto = require("crypto");
    var packageJson = require_package();
    var version = packageJson.version;
    var LINE = /(?:^|^)\s*(?:export\s+)?([\w.-]+)(?:\s*=\s*?|:\s+?)(\s*'(?:\\'|[^'])*'|\s*"(?:\\"|[^"])*"|\s*`(?:\\`|[^`])*`|[^#\r\n]+)?\s*(?:#.*)?(?:$|$)/mg;
    function parse(src) {
      const obj = {};
      let lines = src.toString();
      lines = lines.replace(/\r\n?/mg, "\n");
      let match;
      while ((match = LINE.exec(lines)) != null) {
        const key = match[1];
        let value = match[2] || "";
        value = value.trim();
        const maybeQuote = value[0];
        value = value.replace(/^(['"`])([\s\S]*)\1$/mg, "$2");
        if (maybeQuote === '"') {
          value = value.replace(/\\n/g, "\n");
          value = value.replace(/\\r/g, "\r");
        }
        obj[key] = value;
      }
      return obj;
    }
    function _parseVault(options) {
      const vaultPath = _vaultPath(options);
      const result = DotenvModule.configDotenv({ path: vaultPath });
      if (!result.parsed) {
        const err = new Error(`MISSING_DATA: Cannot parse ${vaultPath} for an unknown reason`);
        err.code = "MISSING_DATA";
        throw err;
      }
      const keys = _dotenvKey(options).split(",");
      const length = keys.length;
      let decrypted;
      for (let i = 0; i < length; i++) {
        try {
          const key = keys[i].trim();
          const attrs = _instructions(result, key);
          decrypted = DotenvModule.decrypt(attrs.ciphertext, attrs.key);
          break;
        } catch (error) {
          if (i + 1 >= length) {
            throw error;
          }
        }
      }
      return DotenvModule.parse(decrypted);
    }
    function _log(message) {
      console.log(`[dotenv@${version}][INFO] ${message}`);
    }
    function _warn(message) {
      console.log(`[dotenv@${version}][WARN] ${message}`);
    }
    function _debug(message) {
      console.log(`[dotenv@${version}][DEBUG] ${message}`);
    }
    function _dotenvKey(options) {
      if (options && options.DOTENV_KEY && options.DOTENV_KEY.length > 0) {
        return options.DOTENV_KEY;
      }
      if (process.env.DOTENV_KEY && process.env.DOTENV_KEY.length > 0) {
        return process.env.DOTENV_KEY;
      }
      return "";
    }
    function _instructions(result, dotenvKey) {
      let uri2;
      try {
        uri2 = new URL(dotenvKey);
      } catch (error) {
        if (error.code === "ERR_INVALID_URL") {
          const err = new Error("INVALID_DOTENV_KEY: Wrong format. Must be in valid uri format like dotenv://:key_1234@dotenvx.com/vault/.env.vault?environment=development");
          err.code = "INVALID_DOTENV_KEY";
          throw err;
        }
        throw error;
      }
      const key = uri2.password;
      if (!key) {
        const err = new Error("INVALID_DOTENV_KEY: Missing key part");
        err.code = "INVALID_DOTENV_KEY";
        throw err;
      }
      const environment = uri2.searchParams.get("environment");
      if (!environment) {
        const err = new Error("INVALID_DOTENV_KEY: Missing environment part");
        err.code = "INVALID_DOTENV_KEY";
        throw err;
      }
      const environmentKey = `DOTENV_VAULT_${environment.toUpperCase()}`;
      const ciphertext = result.parsed[environmentKey];
      if (!ciphertext) {
        const err = new Error(`NOT_FOUND_DOTENV_ENVIRONMENT: Cannot locate environment ${environmentKey} in your .env.vault file.`);
        err.code = "NOT_FOUND_DOTENV_ENVIRONMENT";
        throw err;
      }
      return { ciphertext, key };
    }
    function _vaultPath(options) {
      let possibleVaultPath = null;
      if (options && options.path && options.path.length > 0) {
        if (Array.isArray(options.path)) {
          for (const filepath of options.path) {
            if (fs.existsSync(filepath)) {
              possibleVaultPath = filepath.endsWith(".vault") ? filepath : `${filepath}.vault`;
            }
          }
        } else {
          possibleVaultPath = options.path.endsWith(".vault") ? options.path : `${options.path}.vault`;
        }
      } else {
        possibleVaultPath = path.resolve(process.cwd(), ".env.vault");
      }
      if (fs.existsSync(possibleVaultPath)) {
        return possibleVaultPath;
      }
      return null;
    }
    function _resolveHome(envPath) {
      return envPath[0] === "~" ? path.join(os.homedir(), envPath.slice(1)) : envPath;
    }
    function _configVault(options) {
      _log("Loading env from encrypted .env.vault");
      const parsed = DotenvModule._parseVault(options);
      let processEnv = process.env;
      if (options && options.processEnv != null) {
        processEnv = options.processEnv;
      }
      DotenvModule.populate(processEnv, parsed, options);
      return { parsed };
    }
    function configDotenv(options) {
      const dotenvPath = path.resolve(process.cwd(), ".env");
      let encoding = "utf8";
      const debug = Boolean(options && options.debug);
      if (options && options.encoding) {
        encoding = options.encoding;
      } else {
        if (debug) {
          _debug("No encoding is specified. UTF-8 is used by default");
        }
      }
      let optionPaths = [dotenvPath];
      if (options && options.path) {
        if (!Array.isArray(options.path)) {
          optionPaths = [_resolveHome(options.path)];
        } else {
          optionPaths = [];
          for (const filepath of options.path) {
            optionPaths.push(_resolveHome(filepath));
          }
        }
      }
      let lastError;
      const parsedAll = {};
      for (const path2 of optionPaths) {
        try {
          const parsed = DotenvModule.parse(fs.readFileSync(path2, { encoding }));
          DotenvModule.populate(parsedAll, parsed, options);
        } catch (e) {
          if (debug) {
            _debug(`Failed to load ${path2} ${e.message}`);
          }
          lastError = e;
        }
      }
      let processEnv = process.env;
      if (options && options.processEnv != null) {
        processEnv = options.processEnv;
      }
      DotenvModule.populate(processEnv, parsedAll, options);
      if (lastError) {
        return { parsed: parsedAll, error: lastError };
      } else {
        return { parsed: parsedAll };
      }
    }
    function config(options) {
      if (_dotenvKey(options).length === 0) {
        return DotenvModule.configDotenv(options);
      }
      const vaultPath = _vaultPath(options);
      if (!vaultPath) {
        _warn(`You set DOTENV_KEY but you are missing a .env.vault file at ${vaultPath}. Did you forget to build it?`);
        return DotenvModule.configDotenv(options);
      }
      return DotenvModule._configVault(options);
    }
    function decrypt(encrypted, keyStr) {
      const key = Buffer.from(keyStr.slice(-64), "hex");
      let ciphertext = Buffer.from(encrypted, "base64");
      const nonce = ciphertext.subarray(0, 12);
      const authTag = ciphertext.subarray(-16);
      ciphertext = ciphertext.subarray(12, -16);
      try {
        const aesgcm = crypto.createDecipheriv("aes-256-gcm", key, nonce);
        aesgcm.setAuthTag(authTag);
        return `${aesgcm.update(ciphertext)}${aesgcm.final()}`;
      } catch (error) {
        const isRange = error instanceof RangeError;
        const invalidKeyLength = error.message === "Invalid key length";
        const decryptionFailed = error.message === "Unsupported state or unable to authenticate data";
        if (isRange || invalidKeyLength) {
          const err = new Error("INVALID_DOTENV_KEY: It must be 64 characters long (or more)");
          err.code = "INVALID_DOTENV_KEY";
          throw err;
        } else if (decryptionFailed) {
          const err = new Error("DECRYPTION_FAILED: Please check your DOTENV_KEY");
          err.code = "DECRYPTION_FAILED";
          throw err;
        } else {
          throw error;
        }
      }
    }
    function populate(processEnv, parsed, options = {}) {
      const debug = Boolean(options && options.debug);
      const override = Boolean(options && options.override);
      if (typeof parsed !== "object") {
        const err = new Error("OBJECT_REQUIRED: Please check the processEnv argument being passed to populate");
        err.code = "OBJECT_REQUIRED";
        throw err;
      }
      for (const key of Object.keys(parsed)) {
        if (Object.prototype.hasOwnProperty.call(processEnv, key)) {
          if (override === true) {
            processEnv[key] = parsed[key];
          }
          if (debug) {
            if (override === true) {
              _debug(`"${key}" is already defined and WAS overwritten`);
            } else {
              _debug(`"${key}" is already defined and was NOT overwritten`);
            }
          }
        } else {
          processEnv[key] = parsed[key];
        }
      }
    }
    var DotenvModule = {
      configDotenv,
      _configVault,
      _parseVault,
      config,
      decrypt,
      parse,
      populate
    };
    module2.exports.configDotenv = DotenvModule.configDotenv;
    module2.exports._configVault = DotenvModule._configVault;
    module2.exports._parseVault = DotenvModule._parseVault;
    module2.exports.config = DotenvModule.config;
    module2.exports.decrypt = DotenvModule.decrypt;
    module2.exports.parse = DotenvModule.parse;
    module2.exports.populate = DotenvModule.populate;
    module2.exports = DotenvModule;
  }
});

// src/app.ts
var import_express2 = __toESM(require("express"));
var import_cors = __toESM(require("cors"));

// src/routes.ts
var import_express = require("express");

// src/utils/http-helper.ts
var ok = (data) => __async(void 0, null, function* () {
  return {
    statusCode: 200,
    body: data
  };
});
var badRequest = () => __async(void 0, null, function* () {
  return {
    statusCode: 400,
    body: null
  };
});
var unauthorized = () => __async(void 0, null, function* () {
  return {
    statusCode: 401,
    body: null
  };
});
var conflict = () => __async(void 0, null, function* () {
  return {
    statusCode: 409,
    body: null
  };
});

// src/repositories/login-repository.ts
var import_mongodb = require("mongodb");
var import_dotenv = __toESM(require_main());
var import_bcrypt2 = __toESM(require("bcrypt"));

// src/utils/hashedPass.ts
var import_bcrypt = __toESM(require("bcrypt"));
var hashedPass = (data) => __async(void 0, null, function* () {
  const saltRounds = 10;
  const hashedPass2 = yield import_bcrypt.default.hash(data, saltRounds);
  return hashedPass2;
});

// src/repositories/login-repository.ts
import_dotenv.default.config();
var uri = process.env.MONGO_URI;
var client = new import_mongodb.MongoClient(uri);
var cachedDb = null;
var connectDatabase = () => __async(void 0, null, function* () {
  if (cachedDb) {
    return cachedDb;
  }
  yield client.connect();
  const database = client.db(process.env.DATABASE);
  cachedDb = database.collection(process.env.COLLECTION);
  return cachedDb;
});
var autenticateUser = (value) => __async(void 0, null, function* () {
  const collection = yield connectDatabase();
  const filter = { user: value.user };
  const result = yield collection.findOne(filter);
  let isMatch = null;
  if (result) {
    isMatch = yield import_bcrypt2.default.compare(value.passwordHash, result.passwordHash);
  }
  if (result && isMatch) {
    return result;
  }
  return;
});
var autenticateUserSimple = (value) => __async(void 0, null, function* () {
  const collection = yield connectDatabase();
  const filter = { user: value };
  const result = yield collection.findOne(filter);
  if (result) {
    return result;
  }
  return;
});
var veryfyEmailDatabase = (email) => __async(void 0, null, function* () {
  const collection = yield connectDatabase();
  const filter = { email };
  const result = yield collection.findOne(filter);
  if (result) {
    return result;
  }
  return;
});
var insertUser = (value) => __async(void 0, null, function* () {
  const collection = yield connectDatabase();
  const filter = { user: value.user };
  const result = yield collection.findOne(filter);
  const filter2 = { email: value.email };
  const result2 = yield collection.findOne(filter2);
  if (!result && !result2) {
    yield collection.insertOne(value);
    return { message: "created" };
  } else {
    return;
  }
});
var deleteUsers = (user) => __async(void 0, null, function* () {
  const collection = yield connectDatabase();
  try {
    const filter = { user };
    const result = yield collection.deleteOne(filter);
    if (result.deletedCount === 1) {
      return { message: "deleted" };
    } else {
      return { message: "not found" };
    }
  } catch (error) {
    console.error("Error deleting food:", error);
    return { message: "error", error: error.message };
  }
});
var findAndModifyUser = (user, body, validEmail) => __async(void 0, null, function* () {
  const collection = yield connectDatabase();
  let result = null;
  try {
    const filter = { user };
    const updatedUser = __spreadProps(__spreadValues({}, body), { user });
    const search = yield collection.findOne(filter);
    if (!validEmail) {
      const filter2 = { email: body.email };
      const search1 = yield collection.findOne(filter2);
      if (!search1) {
        updatedUser.lastEmail = body.email;
        validEmail = true;
      }
    }
    if (search && updatedUser.passwordHash !== search.passwordHash) {
      updatedUser.passwordHash = yield hashedPass(body.passwordHash);
    }
    if (validEmail) {
      result = yield collection.replaceOne(filter, updatedUser);
    }
    if (result && validEmail) {
      return { message: "updated" };
    } else {
      return { message: "erro" };
    }
  } catch (error) {
    console.error("Error updating user:", error);
    return { message: "error", error: error.message };
  }
});
var findAndModifyPassword = (user, body) => __async(void 0, null, function* () {
  const collection = yield connectDatabase();
  let result = null;
  try {
    const filter = { user };
    const search = yield collection.findOne(filter);
    search.passwordHash = body;
    if (search) {
      search.passwordHash = yield hashedPass(search.passwordHash);
      result = yield collection.replaceOne(filter, search);
    }
    if (result) {
      return { message: "updated" };
    } else {
      return { message: "erro" };
    }
  } catch (error) {
    console.error("Error updating password:", error);
    return { message: "error", error: error.message };
  }
});
var findAndModifyActivity = (user) => __async(void 0, null, function* () {
  const collection = yield connectDatabase();
  let result = null;
  try {
    const filter = { user };
    const search = yield collection.findOne(filter);
    search.isActive = true;
    if (search) {
      result = yield collection.replaceOne(filter, search);
    }
    if (result) {
      return { message: "updated" };
    } else {
      return { message: "erro" };
    }
  } catch (error) {
    console.error("Error updating password:", error);
    return { message: "error", error: error.message };
  }
});

// src/services/login-service.ts
var import_jsonwebtoken2 = __toESM(require("jsonwebtoken"));

// src/utils/auth.ts
var import_jsonwebtoken = __toESM(require("jsonwebtoken"));
var auth = (data) => __async(void 0, null, function* () {
  const secret = process.env.SECRET_KEY;
  let decoded;
  if (data && secret) {
    try {
      console.log(data);
      const token = data.split(" ")[1];
      decoded = import_jsonwebtoken.default.verify(token, secret);
      console.log(decoded);
    } catch (e) {
      return null;
    }
    return decoded;
  }
});

// src/utils/forgotPassSender.ts
var import_nodemailer = __toESM(require("nodemailer"));

// src/utils/forgotPassHTML.ts
var getPasswordResetEmail = (userName, resetLink) => `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Recupera\xE7\xE3o de Senha</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }
        .email-container {
            max-width: 600px;
            margin: 20px auto;
            background: #fff;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        .header {
            background-color: #4CAF50;
            color: white;
            padding: 20px;
            text-align: center;
        }
        .content {
            padding: 20px;
            color: #333;
        }
        .button {
            display: inline-block;
            background-color: #4CAF50;
            color: white;
            text-decoration: none;
            padding: 10px 20px;
            border-radius: 4px;
            margin-top: 20px;
        }
        .button:hover {
            background-color: #45a049;
        }
        .footer {
            background-color: #f4f4f4;
            color: #666;
            text-align: center;
            padding: 10px;
            font-size: 14px;
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="header">
            <h1>Recupera\xE7\xE3o de Senha</h1>
        </div>
        <div class="content">
            <p>Ol\xE1, <strong>${userName}</strong>!</p>
            <p>Recebemos uma solicita\xE7\xE3o para redefinir sua senha. Clique no bot\xE3o abaixo para continuar:</p>
            <a href="${resetLink}" class="button">Redefinir Senha</a>
            
            <p>Se voc\xEA n\xE3o solicitou essa altera\xE7\xE3o, ignore este e-mail.</p>
        </div>
        <div class="footer">
            <p>Equipe do Planeja +</p>
        </div>
    </div>
</body>
</html>
`;

// src/utils/forgotPassSender.ts
var transporter = import_nodemailer.default.createTransport({
  service: "gmail",
  // Substitua pelo serviço de e-mail que você utiliza (e.g., Outlook, Yahoo)
  auth: {
    user: "programadorigorrb@gmail.com",
    // Seu endereço de e-mail
    pass: process.env.EMAIL_PASS
    // Sua senha ou App Password
  },
  tls: {
    rejectUnauthorized: false
    // Permitir certificados autoassinados
  }
});
var sendEmail = (to, subject, text, user) => __async(void 0, null, function* () {
  try {
    const mailOptions = {
      from: '"Planeja +" <programadorigorrb@gmail.com>',
      // Remetente
      to,
      // Destinatário
      subject,
      // Assunto
      html: getPasswordResetEmail(user, text)
      //text, // Texto do e-mail (pode adicionar HTML aqui também, com `html` em vez de `text`)
    };
    const info = yield transporter.sendMail(mailOptions);
    return {
      message: `E-mail enviado com sucesso:'`
    };
  } catch (error) {
    return {
      message: `Erro ao enviar e-mail: ${error}`
    };
  }
});

// src/utils/autenticateAccountSender.ts
var import_nodemailer2 = __toESM(require("nodemailer"));

// src/utils/autenticateAccountHTML.ts
var getAutenticateAccount = (userName, resetLink) => `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Autentica\xE7\xE3od e conta</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }
        .email-container {
            max-width: 600px;
            margin: 20px auto;
            background: #fff;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        .header {
            background-color: #4CAF50;
            color: white;
            padding: 20px;
            text-align: center;
        }
        .content {
            padding: 20px;
            color: #333;
        }
        .button {
            display: inline-block;
            background-color: #4CAF50;
            color: white;
            text-decoration: none;
            padding: 10px 20px;
            border-radius: 4px;
            margin-top: 20px;
        }
        .button:hover {
            background-color: #45a049;
        }
        .footer {
            background-color: #f4f4f4;
            color: #666;
            text-align: center;
            padding: 10px;
            font-size: 14px;
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="header">
            <h1>Autentica\xE7\xE3o da conta</h1>
        </div>
        <div class="content">
            <p>Ol\xE1, <strong>${userName}</strong>!</p>
            <p>Recebemos uma solicita\xE7\xE3o para autenticar sua conta. Clique no bot\xE3o abaixo para continuar:</p>
            <a href="${resetLink}" class="button">Autenticar Conta</a>
            <p>Se voc\xEA n\xE3o solicitou isso, ignore este e-mail.</p>
        </div>
        <div class="footer">
            <p>Equipe do Planeja +</p>
        </div>
    </div>
</body>
</html>
`;

// src/utils/autenticateAccountSender.ts
var transporter2 = import_nodemailer2.default.createTransport({
  service: "gmail",
  // Substitua pelo serviço de e-mail que você utiliza (e.g., Outlook, Yahoo)
  auth: {
    user: "programadorigorrb@gmail.com",
    // Seu endereço de e-mail
    pass: process.env.EMAIL_PASS
    // Sua senha ou App Password
  },
  tls: {
    rejectUnauthorized: false
    // Permitir certificados autoassinados
  }
});
var sendEmail2 = (to, subject, text, user) => __async(void 0, null, function* () {
  try {
    const mailOptions = {
      from: '"Planeja +" <programadorigorrb@gmail.com>',
      // Remetente
      to,
      // Destinatário
      subject,
      // Assunto
      html: getAutenticateAccount(user, text)
      //text, // Texto do e-mail (pode adicionar HTML aqui também, com `html` em vez de `text`)
    };
    const info = yield transporter2.sendMail(mailOptions);
    return {
      message: `E-mail enviado com sucesso:'`
    };
  } catch (error) {
    return {
      message: `Erro ao enviar e-mail: ${error}`
    };
  }
});

// src/services/login-service.ts
var getProtegidoService = (bodyValue) => __async(void 0, null, function* () {
  let response = null;
  let data = null;
  data = yield auth(bodyValue);
  if (data) {
    response = yield ok(data);
  } else {
    response = yield badRequest();
  }
  return response;
});
var autenticateAccountByEmailService = (bodyValue) => __async(void 0, null, function* () {
  let response = null;
  let data = null;
  data = yield auth(bodyValue);
  if (data) {
    const database = yield findAndModifyActivity(data.user);
    response = yield ok(database);
  } else {
    response = yield badRequest();
  }
  return response;
});
var forgotPassService = (email) => __async(void 0, null, function* () {
  let response = null;
  const secret = process.env.SECRET_KEY;
  const verifyEmail = yield veryfyEmailDatabase(email);
  if (verifyEmail && secret) {
    const user = verifyEmail.user;
    let token = import_jsonwebtoken2.default.sign({ user }, secret, { expiresIn: "1h" });
    token = encodeURIComponent(token);
    const restEmail = `https://login-model-one.vercel.app/NewPassword/${token}`;
    const data = yield sendEmail(
      verifyEmail.email,
      "Email teste",
      restEmail,
      verifyEmail.user
    );
    response = yield ok(data);
  } else {
    response = yield badRequest();
  }
  return response;
});
var getMyAcountService = (bodyValue) => __async(void 0, null, function* () {
  let response = null;
  let data = null;
  data = yield auth(bodyValue);
  if (data && typeof data !== "string") {
    const fullData = yield autenticateUserSimple(data.user);
    response = yield ok(fullData);
  } else {
    response = yield badRequest();
  }
  return response;
});
var createUserService = (bodyValue) => __async(void 0, null, function* () {
  bodyValue.passwordHash = yield hashedPass(bodyValue.passwordHash);
  const data = yield insertUser(bodyValue);
  let response = null;
  if (data) {
    response = yield ok(data);
  } else {
    response = yield conflict();
  }
  return response;
});
var userAutenticationService = (bodyValue) => __async(void 0, null, function* () {
  const data = yield autenticateUser(bodyValue);
  const secret = process.env.SECRET_KEY;
  let response = null;
  let user = bodyValue.user;
  if (data && secret && data.isActive === true) {
    if (!bodyValue.remember) {
      const token = import_jsonwebtoken2.default.sign({ user }, secret, { expiresIn: "1h" });
      response = yield ok(token);
    } else {
      const token = import_jsonwebtoken2.default.sign({ user }, secret);
      response = yield ok(token);
    }
  } else if (data && secret && data.isActive === false) {
    let token = import_jsonwebtoken2.default.sign({ user }, secret, { expiresIn: "1h" });
    token = encodeURIComponent(token);
    const restEmail = `https://login-model-one.vercel.app/AutenticateAccount/${token}`;
    const mail = yield sendEmail2(data.email, "Email teste", restEmail, user);
    response = yield conflict();
  } else {
    response = yield unauthorized();
  }
  return response;
});
var updateUserService = (user, bodyValue, authHeader) => __async(void 0, null, function* () {
  const validEmail = bodyValue.email === bodyValue.lastEmail ? true : false;
  const decoded = yield auth(authHeader);
  let response = null;
  if (decoded) {
    const data = yield findAndModifyUser(decoded.user, bodyValue, validEmail);
    if (data.message === "updated") {
      response = yield ok(data);
    } else if (data.message === "erro") {
      response = yield conflict();
    } else {
      response = yield badRequest();
    }
  } else {
    response = yield badRequest();
  }
  return response;
});
var newPasswordService = (bodyValue, authHeader) => __async(void 0, null, function* () {
  const decoded = yield auth(authHeader);
  let response = null;
  if (decoded) {
    const data = yield findAndModifyPassword(
      decoded.user,
      bodyValue.passwordHash
    );
    response = yield ok(data);
  } else {
    response = yield badRequest();
  }
  return response;
});
var deleteUserService = (authHeader) => __async(void 0, null, function* () {
  let data = null;
  const validation = yield auth(authHeader);
  if (validation && typeof validation !== "string") {
    data = yield deleteUsers(validation.user);
  }
  let response = null;
  if (data) {
    response = yield ok(data);
  } else {
    response = yield badRequest();
  }
  return response;
});

// src/controllers/login-controller.ts
var getProtegido = (req, res) => __async(void 0, null, function* () {
  const authHeader = req.headers.authorization;
  const response = yield getProtegidoService(authHeader);
  res.status(response.statusCode).json(response.body);
});
var autenticateAccountByEmail = (req, res) => __async(void 0, null, function* () {
  const authHeader = req.headers.authorization;
  const response = yield autenticateAccountByEmailService(authHeader);
  res.status(response.statusCode).json(response.body);
});
var forgotPass = (req, res) => __async(void 0, null, function* () {
  const email = req.params.email;
  const response = yield forgotPassService(email);
  res.status(response.statusCode).json(response.body);
});
var getMyAcount = (req, res) => __async(void 0, null, function* () {
  const authHeader = req.headers.authorization;
  const response = yield getMyAcountService(authHeader);
  res.status(response.statusCode).json(response.body);
});
var createUser = (req, res) => __async(void 0, null, function* () {
  const bodyValue = req.body;
  const response = yield createUserService(bodyValue);
  res.status(response.statusCode).json(response.body);
});
var userAutentication = (req, res) => __async(void 0, null, function* () {
  const bodyValue = req.body;
  const response = yield userAutenticationService(bodyValue);
  res.status(response.statusCode).json(response.body);
});
var updateUser = (req, res) => __async(void 0, null, function* () {
  const authHeader = req.headers.authorization;
  const bodyValue = req.body;
  const user = req.params.user;
  const response = yield updateUserService(user, bodyValue, authHeader);
  res.status(response.statusCode).json(response.body);
});
var newPassword = (req, res) => __async(void 0, null, function* () {
  const authHeader = req.headers.authorization;
  const bodyValue = req.body;
  const response = yield newPasswordService(bodyValue, authHeader);
  res.status(response.statusCode).json(response.body);
});
var deleteUser = (req, res) => __async(void 0, null, function* () {
  const authHeader = req.headers.authorization;
  const response = yield deleteUserService(authHeader);
  res.status(response.statusCode).json(response.body);
});

// src/routes.ts
var router = (0, import_express.Router)();
router.get("/login/protected", getProtegido);
router.get("/login/myAccount", getMyAcount);
router.get("/login/autenticateAccountEmail", autenticateAccountByEmail);
router.get("/login/forgotPassword/:email", forgotPass);
router.post("/login/create", createUser);
router.post("/login/autentication", userAutentication);
router.post("/login/newPassword", newPassword);
router.patch("/login/update/:user", updateUser);
router.delete("/login/delete/:user", deleteUser);
var routes_default = router;

// src/app.ts
function createApp() {
  const app2 = (0, import_express2.default)();
  app2.use(import_express2.default.json());
  app2.use((0, import_cors.default)({
    origin: "*",
    // Permite qualquer origem
    methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
    // Cabeçalhos permitidos
  }));
  app2.use("/api", routes_default);
  app2.options("*", (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    res.status(204).end();
  });
  return app2;
}
var app_default = createApp;

// src/server.ts
var app = app_default();
var port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server is running at port ${port}`);
});
