FROM oven/bun:latest

WORKDIR /f1racepanel

COPY package.json bun.lock /f1racepanel/

RUN bun install --frozen-lockfile

COPY . .

