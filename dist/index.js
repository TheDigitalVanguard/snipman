#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const commandHandler_1 = require("./commandHandler");
const commandHandler = new commandHandler_1.CommandHandler();
commandHandler.parseArgs(process.argv);
