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
      let uri5;
      try {
        uri5 = new URL(dotenvKey);
      } catch (error) {
        if (error.code === "ERR_INVALID_URL") {
          const err = new Error("INVALID_DOTENV_KEY: Wrong format. Must be in valid uri format like dotenv://:key_1234@dotenvx.com/vault/.env.vault?environment=development");
          err.code = "INVALID_DOTENV_KEY";
          throw err;
        }
        throw error;
      }
      const key = uri5.password;
      if (!key) {
        const err = new Error("INVALID_DOTENV_KEY: Missing key part");
        err.code = "INVALID_DOTENV_KEY";
        throw err;
      }
      const environment = uri5.searchParams.get("environment");
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
var created = () => __async(void 0, null, function* () {
  return {
    statusCode: 201,
    body: { message: "created" }
  };
});
var deleted = () => __async(void 0, null, function* () {
  return {
    statusCode: 200,
    body: { message: "deleted" }
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

// src/models/user-model.ts
var yup = __toESM(require("yup"));
var userSchema = yup.object({
  name: yup.string().required("O nome \xE9 obrigat\xF3rio"),
  user: yup.string().required("O usu\xE1rio \xE9 obrigat\xF3rio"),
  email: yup.string().email("E-mail inv\xE1lido").required("O e-mail \xE9 obrigat\xF3rio"),
  lastEmail: yup.string().email("\xDAltimo e-mail inv\xE1lido").required("O \xFAltimo e-mail \xE9 obrigat\xF3rio"),
  birthday: yup.date().typeError("Data de nascimento inv\xE1lida").required("A data de nascimento \xE9 obrigat\xF3ria"),
  passwordHash: yup.string().required("O hash da senha \xE9 obrigat\xF3rio"),
  createdAt: yup.string().matches(
    /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{3})?Z$/,
    "Data deve estar no formato ISO 8601"
  ).required("A data \xE9 obrigat\xF3ria"),
  updatedAt: yup.string().matches(
    /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{3})?Z$/,
    "Data deve estar no formato ISO 8601"
  ).required("A data \xE9 obrigat\xF3ria"),
  isActive: yup.boolean().required("O estado 'isActive' \xE9 obrigat\xF3rio")
});
function validateUser(user) {
  return __async(this, null, function* () {
    try {
      yield userSchema.validate(user, {
        abortEarly: false,
        stripUnknown: true
      });
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  });
}

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
      const token = data.split(" ")[1];
      decoded = import_jsonwebtoken.default.verify(token, secret);
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
            background: linear-gradient(90deg, #00dd8f, #007bff);
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
            background: linear-gradient(90deg, #00dd8f, #007bff);
            color: white;
            text-decoration: none;
            padding: 10px 20px;
            border-radius: 4px;
            margin-top: 20px;
        }
        .button:hover {
            background: linear-gradient(90deg, #33f0b0, #3395ff);
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
            background: linear-gradient(90deg, #00dd8f, #007bff);
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
            background: linear-gradient(90deg, #00dd8f, #007bff);
            color: white;
            text-decoration: none;
            padding: 10px 20px;
            border-radius: 4px;
            margin-top: 20px;
        }
        .button:hover {
            background: linear-gradient(90deg, #33f0b0, #3395ff);
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
    const restEmail = `https://planeja-mais-seven.vercel.app/auth/change-password/${token}`;
    const data = yield sendEmail(
      verifyEmail.email,
      "Recupera\xE7\xE3o de Senha",
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
  const isvalid = yield validateUser(bodyValue);
  if (!isvalid) {
    const response2 = yield badRequest();
    return response2;
  }
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
    const restEmail = `https://planeja-mais-seven.vercel.app/auth/confirm-account/${token}`;
    const mail = yield sendEmail2(data.email, "Autenticar Conta", restEmail, user);
    response = yield conflict();
  } else {
    response = yield unauthorized();
  }
  return response;
});
var updateUserService = (bodyValue, authHeader) => __async(void 0, null, function* () {
  const isvalid = yield validateUser(bodyValue);
  if (!isvalid) {
    const response2 = yield badRequest();
    return response2;
  }
  const decoded = yield auth(authHeader);
  let response = null;
  if (decoded) {
    const fullData = yield autenticateUserSimple(decoded.user);
    const validEmail = bodyValue.email === (fullData == null ? void 0 : fullData.email) ? true : false;
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
  const response = yield updateUserService(bodyValue, authHeader);
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

// src/models/goal-model.ts
var yup2 = __toESM(require("yup"));
var goalSchema = yup2.object({
  title: yup2.string().required("T\xEDtulo \xE9 obrigat\xF3rio"),
  month: yup2.number().integer("O valor deve ser um n\xFAmero inteiro").min(0, "Deve ser maior ou igual a zero").required("Campo Obrigat\xF3rio"),
  year: yup2.number().integer("O valor deve ser um n\xFAmero inteiro").positive("O valor deve ser positivo").required("Campo Obrigat\xF3rio"),
  goal: yup2.number().typeError("Deve ser um valor valido").required("Campo Obrigat\xF3rio"),
  updatedAt: yup2.string().matches(
    /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{3})?Z$/,
    "Data deve estar no formato ISO 8601"
  ).required("A data \xE9 obrigat\xF3ria")
});
function validateGoal(goal) {
  return __async(this, null, function* () {
    try {
      yield goalSchema.validate(goal, {
        abortEarly: false,
        stripUnknown: true
      });
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  });
}

// src/repositories/goal-repository.ts
var import_mongodb2 = require("mongodb");
var import_dotenv2 = __toESM(require_main());
import_dotenv2.default.config();
var uri2 = process.env.MONGO_URI;
var client2 = new import_mongodb2.MongoClient(uri2);
var cachedDb2 = null;
var connectDatabase2 = () => __async(void 0, null, function* () {
  if (cachedDb2) {
    return cachedDb2;
  }
  yield client2.connect();
  const database = client2.db(process.env.DATABASE);
  cachedDb2 = database.collection(process.env.COLLECTIONGOAL);
  return cachedDb2;
});
var getMyGoalRepository = (user, skip = 0, limit = 0, order, year, month, startGoal, endGoal, title) => __async(void 0, null, function* () {
  const collection = yield connectDatabase2();
  const sort = order === "asc" ? 1 : -1;
  const filter = {
    user
  };
  if (startGoal || endGoal) {
    filter.goal = {};
    if (startGoal) filter.goal.$gte = parseFloat(startGoal);
    if (endGoal) filter.goal.$lte = parseFloat(endGoal);
  }
  if (year) {
    filter.year = parseInt(year);
  }
  if (month) {
    filter.month = parseInt(month);
  }
  if (title) {
    filter.title = {
      $regex: title,
      // contém
      $options: "i"
      // case-insensitive (opcional)
    };
  }
  try {
    const result = yield collection.find(filter).sort({ updatedAt: sort }).skip(parseInt(skip)).limit(parseInt(limit)).toArray();
    if (result && result.length > 0) {
      return result;
    }
    return [];
  } catch (e) {
    return;
  }
});
var insertGoal = (value) => __async(void 0, null, function* () {
  const collection = yield connectDatabase2();
  const result = yield collection.insertOne(value);
  if (result) {
    return {
      message: "created",
      _id: result.insertedId
    };
  }
  return;
});
var deleteGoalRepository = (user, _id) => __async(void 0, null, function* () {
  const collection = yield connectDatabase2();
  try {
    const filter = {
      user,
      _id: new import_mongodb2.ObjectId(_id)
    };
    const result = yield collection.deleteOne(filter);
    if (result.deletedCount === 1) {
      return { message: "deleted" };
    } else {
      return;
    }
  } catch (error) {
    console.error("Error deleting food:", error);
    return;
  }
});
var updateGoalRepository = (user, year, month, bodyValue, _id) => __async(void 0, null, function* () {
  const collection = yield connectDatabase2();
  try {
    const filter = {
      user,
      _id: new import_mongodb2.ObjectId(_id)
    };
    const result = yield collection.replaceOne(filter, bodyValue);
    if (result.modifiedCount === 1) {
      return { message: "updated" };
    } else {
      return;
    }
  } catch (error) {
    console.error("Error deleting food:", error);
    return;
  }
});

// src/services/goal-service.ts
var getMyGoalService = (authHeader, skip, limit, order, year, month, startGoal, endGoal, title) => __async(void 0, null, function* () {
  let response = null;
  let data = null;
  data = yield auth(authHeader);
  if (data && typeof data !== "string") {
    const fullData = yield getMyGoalRepository(data.user, skip, limit, order, year, month, startGoal, endGoal, title);
    if (fullData) {
      response = yield ok(fullData);
    } else {
      response = yield badRequest();
    }
  } else {
    response = yield badRequest();
  }
  return response;
});
var createGoalService = (bodyValue, authHeader) => __async(void 0, null, function* () {
  const isvalid = yield validateGoal(bodyValue);
  if (!isvalid) {
    const response2 = yield badRequest();
    return response2;
  }
  const decoded = yield auth(authHeader);
  let response = null;
  if (decoded) {
    bodyValue.user = decoded.user;
    const data = yield insertGoal(bodyValue);
    if (data) {
      response = yield created();
    }
  } else {
    response = yield badRequest();
  }
  return response;
});
var updateGoalService = (authHeader, bodyValue, id) => __async(void 0, null, function* () {
  let response = null;
  let data = null;
  const isvalid = yield validateGoal(bodyValue);
  if (!isvalid) {
    const response2 = yield badRequest();
    return response2;
  }
  data = yield auth(authHeader);
  if (data && typeof data !== "string") {
    bodyValue.user = data.user;
    const fullData = yield updateGoalRepository(
      data.user,
      bodyValue.year,
      bodyValue.month,
      bodyValue,
      id
    );
    if (fullData) {
      response = yield ok(fullData);
    } else {
      response = yield badRequest();
    }
  } else {
    response = yield badRequest();
  }
  return response;
});
var deleteGoalService = (authHeader, id) => __async(void 0, null, function* () {
  let response = null;
  let data = null;
  data = yield auth(authHeader);
  if (data && typeof data !== "string") {
    const fullData = yield deleteGoalRepository(data.user, id);
    if (fullData) {
      response = yield deleted();
    } else {
      response = yield badRequest();
    }
  } else {
    response = yield badRequest();
  }
  return response;
});

// src/controllers/goals-controller.ts
var createGoal = (req, res) => __async(void 0, null, function* () {
  const authHeader = req.headers.authorization;
  const bodyValue = req.body;
  const response = yield createGoalService(bodyValue, authHeader);
  res.status(response.statusCode).json(response.body);
});
var getMyGoal = (req, res) => __async(void 0, null, function* () {
  const authHeader = req.headers.authorization;
  const { skip, limit, order, year, month, startGoal, endGoal, title } = req.query;
  const response = yield getMyGoalService(
    authHeader,
    skip,
    limit,
    order,
    year,
    month,
    startGoal,
    endGoal,
    title
  );
  res.status(response.statusCode).json(response.body);
});
var updateGoal = (req, res) => __async(void 0, null, function* () {
  const authHeader = req.headers.authorization;
  const bodyValue = req.body;
  const { id } = req.params;
  const response = yield updateGoalService(
    authHeader,
    bodyValue,
    id
  );
  res.status(response.statusCode).json(response.body);
});
var deleteGoal = (req, res) => __async(void 0, null, function* () {
  const authHeader = req.headers.authorization;
  const { id } = req.params;
  const response = yield deleteGoalService(
    authHeader,
    id
  );
  res.status(response.statusCode).json(response.body);
});

// src/models/expenses.model.ts
var yup3 = __toESM(require("yup"));
var expenseSchema = yup3.object({
  description: yup3.string().required("Descri\xE7\xE3o \xE9 obrigat\xF3ria"),
  value: yup3.number().typeError("Deve ser um valor valido").required("Campo obrigat\xF3rio"),
  category: yup3.string().required("Categoria \xE9 obrigat\xF3ria"),
  date: yup3.date().typeError("Data de nascimento inv\xE1lida").required("A data  \xE9 obrigat\xF3ria"),
  updatedAt: yup3.string().matches(
    /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{3})?Z$/,
    "Data deve estar no formato ISO 8601"
  ).required("A data \xE9 obrigat\xF3ria")
});
function validateExpense(expense) {
  return __async(this, null, function* () {
    try {
      yield expenseSchema.validate(expense, {
        abortEarly: false,
        stripUnknown: true
      });
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  });
}

// src/repositories/expenses-repository.ts
var import_mongodb3 = require("mongodb");
var import_dotenv3 = __toESM(require_main());
import_dotenv3.default.config();
var uri3 = process.env.MONGO_URI;
var client3 = new import_mongodb3.MongoClient(uri3);
var cachedDb3 = null;
var connectDatabase3 = () => __async(void 0, null, function* () {
  if (cachedDb3) {
    return cachedDb3;
  }
  yield client3.connect();
  const database = client3.db(process.env.DATABASE);
  cachedDb3 = database.collection(process.env.COLLECTIONEXPENSES);
  return cachedDb3;
});
var getExpenseByIdRepository = (user, _id) => __async(void 0, null, function* () {
  const collection = yield connectDatabase3();
  if (import_mongodb3.ObjectId.isValid(_id)) {
    const result = yield collection.findOne({
      user,
      _id: new import_mongodb3.ObjectId(_id)
    });
    if (result) {
      return result;
    }
  }
  return;
});
var getExpenseByDescriptionRepository = (user, description) => __async(void 0, null, function* () {
  const collection = yield connectDatabase3();
  const result = yield collection.find({
    user,
    description: {
      $regex: description,
      // contém
      $options: "i"
      // case-insensitive (opcional)
    }
  }).toArray();
  if (result && result.length > 0) {
    return result;
  }
  return [];
});
var getExpenseByCategoryRepository = (user, category) => __async(void 0, null, function* () {
  const collection = yield connectDatabase3();
  const result = yield collection.find({
    user,
    category: {
      $regex: category,
      // contém
      $options: "i"
      // case-insensitive (opcional)
    }
  }).toArray();
  if (result && result.length > 0) {
    return result;
  }
  return [];
});
var getExpenseByDateRepository = (user, date3, skip = 0, limit = 0, order) => __async(void 0, null, function* () {
  const collection = yield connectDatabase3();
  const sort = order === "asc" ? 1 : -1;
  const result = yield collection.find({
    user,
    date: {
      $regex: `^${date3}`,
      // contém
      $options: "i"
      // case-insensitive (opcional)
    }
  }).sort({ date: sort }).skip(parseInt(skip)).limit(parseInt(limit)).toArray();
  if (result && result.length > 0) {
    return result;
  }
  return [];
});
var getExpenseAllRepository = (user, skip = 0, limit = 0, order) => __async(void 0, null, function* () {
  const collection = yield connectDatabase3();
  const sort = order === "asc" ? 1 : -1;
  try {
    const result = yield collection.find({
      user
    }).sort({ updatedAt: sort }).skip(parseInt(skip)).limit(parseInt(limit)).toArray();
    if (result && result.length > 0) {
      return result;
    }
    return [];
  } catch (e) {
    return;
  }
});
var getExpenseByFilterRepository = (user, skip = 0, limit = 0, order, startDate, endDate, category, description, startValue, endValue) => __async(void 0, null, function* () {
  const collection = yield connectDatabase3();
  const sort = order === "asc" ? 1 : -1;
  const filter = {
    user
  };
  if (startDate || endDate) {
    filter.date = {};
    if (startDate) filter.date.$gte = startDate;
    if (endDate) filter.date.$lte = endDate;
  }
  if (startValue || endValue) {
    filter.value = {};
    if (startValue) filter.value.$gte = parseFloat(startValue);
    if (endValue) filter.value.$lte = parseFloat(endValue);
  }
  if (category) {
    filter.category = {
      $regex: category,
      // contém
      $options: "i"
      // case-insensitive (opcional)
    };
  }
  if (description) {
    filter.description = {
      $regex: description,
      // contém
      $options: "i"
      // case-insensitive (opcional)
    };
  }
  try {
    const result = yield collection.find(filter).sort({ date: sort }).skip(parseInt(skip)).limit(parseInt(limit)).toArray();
    if (result && result.length > 0) {
      return result;
    }
    return [];
  } catch (e) {
    return;
  }
});
var insertExpense = (value) => __async(void 0, null, function* () {
  const collection = yield connectDatabase3();
  const result = yield collection.insertOne(value);
  if (result) {
    return {
      message: "created",
      _id: result.insertedId
    };
  }
  return;
});
var updateExpenseRepository = (user, bodyValue, id) => __async(void 0, null, function* () {
  const collection = yield connectDatabase3();
  try {
    const filter = {
      user,
      _id: new import_mongodb3.ObjectId(id)
    };
    const result = yield collection.replaceOne(filter, bodyValue);
    if (result.modifiedCount === 1) {
      return { message: "updated" };
    } else {
      return;
    }
  } catch (error) {
    console.error("Error deleting food:", error);
    return;
  }
});
var deleteExpenseRepository = (user, _id) => __async(void 0, null, function* () {
  const collection = yield connectDatabase3();
  try {
    const filter = {
      user,
      _id: new import_mongodb3.ObjectId(_id)
    };
    const result = yield collection.deleteOne(filter);
    if (result.deletedCount === 1) {
      return { message: "deleted" };
    } else {
      return;
    }
  } catch (error) {
    console.error("Error deleting food:", error);
    return;
  }
});

// src/services/expenses-service.ts
var createExpenseService = (bodyValue, authHeader) => __async(void 0, null, function* () {
  const isvalid = yield validateExpense(bodyValue);
  if (!isvalid) {
    const response2 = yield badRequest();
    return response2;
  }
  const decoded = yield auth(authHeader);
  let response = null;
  if (decoded) {
    bodyValue.user = decoded.user;
    const data = yield insertExpense(bodyValue);
    if (data) {
      response = yield created();
      response.body = data;
    } else {
      response = yield conflict();
    }
  } else {
    response = yield badRequest();
  }
  return response;
});
var getExpenseByIdService = (authHeader, _id) => __async(void 0, null, function* () {
  let response = null;
  let data = null;
  data = yield auth(authHeader);
  if (data && typeof data !== "string") {
    const fullData = yield getExpenseByIdRepository(data.user, _id);
    if (fullData) {
      response = yield ok(fullData);
    } else {
      response = yield badRequest();
    }
  } else {
    response = yield badRequest();
  }
  return response;
});
var getExpenseByDescriptionService = (authHeader, description) => __async(void 0, null, function* () {
  let response = null;
  let data = null;
  data = yield auth(authHeader);
  if (data && typeof data !== "string") {
    const fullData = yield getExpenseByDescriptionRepository(
      data.user,
      description
    );
    if (fullData) {
      response = yield ok(fullData);
    } else {
      response = yield badRequest();
    }
  } else {
    response = yield badRequest();
  }
  return response;
});
var getExpenseByCategoryService = (authHeader, category) => __async(void 0, null, function* () {
  let response = null;
  let data = null;
  data = yield auth(authHeader);
  if (data && typeof data !== "string") {
    const fullData = yield getExpenseByCategoryRepository(data.user, category);
    if (fullData) {
      response = yield ok(fullData);
    } else {
      response = yield badRequest();
    }
  } else {
    response = yield badRequest();
  }
  return response;
});
var getExpenseByDateService = (authHeader, date3, skip, limit, order) => __async(void 0, null, function* () {
  let response = null;
  let data = null;
  data = yield auth(authHeader);
  if (data && typeof data !== "string") {
    const fullData = yield getExpenseByDateRepository(data.user, date3, skip, limit, order);
    if (fullData) {
      response = yield ok(fullData);
    } else {
      response = yield badRequest();
    }
  } else {
    response = yield badRequest();
  }
  return response;
});
var getExpenseAllService = (authHeader, skip, limit, order) => __async(void 0, null, function* () {
  let response = null;
  let data = null;
  data = yield auth(authHeader);
  if (data && typeof data !== "string") {
    const fullData = yield getExpenseAllRepository(data.user, skip, limit, order);
    if (fullData) {
      response = yield ok(fullData);
    } else {
      response = yield badRequest();
    }
  } else {
    response = yield badRequest();
  }
  return response;
});
var getExpenseByFilterService = (authHeader, skip, limit, order, startDate, endDate, category, description, startValue, endValue) => __async(void 0, null, function* () {
  let response = null;
  let data = null;
  data = yield auth(authHeader);
  if (data && typeof data !== "string") {
    const fullData = yield getExpenseByFilterRepository(data.user, skip, limit, order, startDate, endDate, category, description, startValue, endValue);
    if (fullData) {
      response = yield ok(fullData);
    } else {
      response = yield badRequest();
    }
  } else {
    response = yield badRequest();
  }
  return response;
});
var deleteExpenseService = (authHeader, id) => __async(void 0, null, function* () {
  let response = null;
  let data = null;
  data = yield auth(authHeader);
  if (data && typeof data !== "string") {
    const fullData = yield deleteExpenseRepository(data.user, id);
    if (fullData) {
      response = yield ok(fullData);
    } else {
      response = yield badRequest();
    }
  } else {
    response = yield badRequest();
  }
  return response;
});
var updateExpenseService = (authHeader, bodyValue, id) => __async(void 0, null, function* () {
  let response = null;
  let data = null;
  const isvalid = yield validateExpense(bodyValue);
  if (!isvalid) {
    const response2 = yield badRequest();
    return response2;
  }
  data = yield auth(authHeader);
  if (data && typeof data !== "string") {
    bodyValue.user = data.user;
    const fullData = yield updateExpenseRepository(data.user, bodyValue, id);
    if (fullData) {
      response = yield ok(fullData);
    } else {
      response = yield badRequest();
    }
  } else {
    response = yield badRequest();
  }
  return response;
});

// src/controllers/expenses-controller.ts
var createExpense = (req, res) => __async(void 0, null, function* () {
  const authHeader = req.headers.authorization;
  const bodyValue = req.body;
  const response = yield createExpenseService(bodyValue, authHeader);
  res.status(response.statusCode).json(response.body);
});
var getExpenseById = (req, res) => __async(void 0, null, function* () {
  const authHeader = req.headers.authorization;
  const { id } = req.params;
  const response = yield getExpenseByIdService(authHeader, id);
  res.status(response.statusCode).json(response.body);
});
var getExpenseByDescription = (req, res) => __async(void 0, null, function* () {
  const authHeader = req.headers.authorization;
  const { description } = req.params;
  const response = yield getExpenseByDescriptionService(
    authHeader,
    description
  );
  res.status(response.statusCode).json(response.body);
});
var getExpenseByCategory = (req, res) => __async(void 0, null, function* () {
  const authHeader = req.headers.authorization;
  const { category } = req.params;
  const response = yield getExpenseByCategoryService(authHeader, category);
  res.status(response.statusCode).json(response.body);
});
var getExpenseByDate = (req, res) => __async(void 0, null, function* () {
  const authHeader = req.headers.authorization;
  const { date: date3 } = req.params;
  const { skip, limit, order } = req.query;
  const response = yield getExpenseByDateService(authHeader, date3, skip, limit, order);
  res.status(response.statusCode).json(response.body);
});
var getExpenseAll = (req, res) => __async(void 0, null, function* () {
  const authHeader = req.headers.authorization;
  const { skip, limit, order } = req.query;
  const response = yield getExpenseAllService(authHeader, skip, limit, order);
  res.status(response.statusCode).json(response.body);
});
var getExpenseByFilter = (req, res) => __async(void 0, null, function* () {
  const authHeader = req.headers.authorization;
  const { skip, limit, order, startDate, endDate, category, description, startValue, endValue } = req.query;
  const response = yield getExpenseByFilterService(authHeader, skip, limit, order, startDate, endDate, category, description, startValue, endValue);
  res.status(response.statusCode).json(response.body);
});
var deleteExpense = (req, res) => __async(void 0, null, function* () {
  const authHeader = req.headers.authorization;
  const { id } = req.params;
  const response = yield deleteExpenseService(authHeader, id);
  res.status(response.statusCode).json(response.body);
});
var updateExpense = (req, res) => __async(void 0, null, function* () {
  const authHeader = req.headers.authorization;
  const bodyValue = req.body;
  const { id } = req.params;
  const response = yield updateExpenseService(authHeader, bodyValue, id);
  res.status(response.statusCode).json(response.body);
});

// src/repositories/operations-repository.ts
var import_mongodb4 = require("mongodb");
var import_dotenv4 = __toESM(require_main());
import_dotenv4.default.config();
var uri4 = process.env.MONGO_URI;
var client4 = new import_mongodb4.MongoClient(uri4);
var cachedDb4 = null;
var connectDatabase4 = () => __async(void 0, null, function* () {
  if (cachedDb4) {
    return cachedDb4;
  }
  yield client4.connect();
  const database = client4.db(process.env.DATABASE);
  cachedDb4 = database.collection(process.env.COLLECTIONEXPENSES);
  return cachedDb4;
});
var getAllValuesRepository = (user, startDate, endDate, category, description, startValue, endValue) => __async(void 0, null, function* () {
  const collection = yield connectDatabase4();
  const filter = {
    user
  };
  if (startDate || endDate) {
    filter.date = {};
    if (startDate) filter.date.$gte = startDate;
    if (endDate) filter.date.$lte = endDate;
  }
  if (startValue || endValue) {
    filter.value = {};
    if (startValue) filter.value.$gte = parseFloat(startValue);
    if (endValue) filter.value.$lte = parseFloat(endValue);
  }
  if (category) {
    filter.category = {
      $regex: category,
      // contém
      $options: "i"
      // case-insensitive (opcional)
    };
  }
  if (description) {
    filter.description = {
      $regex: description,
      // contém
      $options: "i"
      // case-insensitive (opcional)
    };
  }
  try {
    const result = yield collection.find(filter).toArray();
    if (result && result.length > 0) {
      return result;
    }
    return [];
  } catch (e) {
    return;
  }
});
var getAllDateValuesRepository = (user, date3) => __async(void 0, null, function* () {
  const collection = yield connectDatabase4();
  const result = yield collection.find({
    user,
    date: {
      $regex: `^${date3}`,
      // contém
      $options: "i"
      // case-insensitive (opcional)
    }
  }).toArray();
  if (result && result.length > 0) {
    return result;
  }
  return [];
});

// src/services/operations-service.ts
var getAllValuesService = (authHeader, startDate, endDate, category, description, startValue, endValue) => __async(void 0, null, function* () {
  let response = null;
  let data = null;
  data = yield auth(authHeader);
  if (data && typeof data !== "string") {
    const fullData = yield getAllValuesRepository(data.user, startDate, endDate, category, description, startValue, endValue);
    if (fullData) {
      let values = 0;
      fullData.forEach((element) => {
        values += element.value;
      });
      const returnData = { value: (Math.trunc(values * 100) / 100).toFixed(2) };
      response = yield ok(returnData);
    } else {
      response = yield badRequest();
    }
  } else {
    response = yield badRequest();
  }
  return response;
});
var getAllDateValuesService = (authHeader, date3) => __async(void 0, null, function* () {
  let response = null;
  let data = null;
  data = yield auth(authHeader);
  if (data && typeof data !== "string") {
    const fullData = yield getAllDateValuesRepository(data.user, date3);
    if (fullData) {
      let values = 0;
      fullData.forEach((element) => {
        values += element.value;
      });
      const returnData = { value: (Math.trunc(values * 100) / 100).toFixed(2) };
      response = yield ok(returnData);
    } else {
      response = yield badRequest();
    }
  } else {
    response = yield badRequest();
  }
  return response;
});

// src/controllers/operations-controller.ts
var getAllValues = (req, res) => __async(void 0, null, function* () {
  const authHeader = req.headers.authorization;
  const { startDate, endDate, category, description, startValue, endValue } = req.query;
  const response = yield getAllValuesService(authHeader, startDate, endDate, category, description, startValue, endValue);
  res.status(response.statusCode).json(response.body);
});
var getAllDateValues = (req, res) => __async(void 0, null, function* () {
  const authHeader = req.headers.authorization;
  const { date: date3 } = req.params;
  const response = yield getAllDateValuesService(authHeader, date3);
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
router.patch("/login/update", updateUser);
router.delete("/login/delete", deleteUser);
router.get("/goal/myGoal", getMyGoal);
router.post("/goal/create", createGoal);
router.patch("/goal/update/:id", updateGoal);
router.delete("/goal/delete/:id", deleteGoal);
router.get("/expense/myExpenseById/:id", getExpenseById);
router.get("/expense/myExpenseByDescription/:description", getExpenseByDescription);
router.get("/expense/myExpenseByCategory/:category", getExpenseByCategory);
router.get("/expense/myExpenseByDate/:date", getExpenseByDate);
router.get("/expense/myExpenseAll", getExpenseAll);
router.get("/expense/myExpenseByFilter", getExpenseByFilter);
router.post("/expense/create", createExpense);
router.patch("/expense/update/:id", updateExpense);
router.delete("/expense/delete/:id", deleteExpense);
router.get("/operation/allValues", getAllValues);
router.get("/operation/allDateValues/:date", getAllDateValues);
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
