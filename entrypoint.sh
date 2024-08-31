#!/bin/sh

node ace migration:run --force

node bin/server.js
