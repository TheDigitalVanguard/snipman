#!/usr/bin/env node

import { CommandHandler } from "./commandHandler";

const commandHandler = new CommandHandler();

commandHandler.parseArgs(process.argv);
