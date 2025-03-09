FROM oven/bun

WORKDIR /app

COPY package.json .
COPY bun.lock .

# Install required fonts and tools
RUN apt-get update && apt-get install -y \
    fontconfig \
    fonts-liberation \
    curl \
    wget \
    unzip \
    zip \
    python3 \
    python3-pip \
    && rm -rf /var/lib/apt/lists/*


RUN bun install --production

COPY src src
COPY tsconfig.json .

ENV NODE_ENV production

CMD ["bun", "src/index.ts"]

EXPOSE 3000
