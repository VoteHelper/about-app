# 1. Use the specific Node.js version as the base image
FROM node:20.11.0 AS builder

# 2. Set working directory inside the container
WORKDIR /app

# 3. Copy package.json and package-lock.json
COPY package*.json ./

# 4. Install dependencies using the specified npm version
RUN npm install -g npm@10.2.4 && npm install

# 5. Copy all application files
COPY . .

ARG NEXT_PUBLIC_SERVER_URI
ARG NEXT_PUBLIC_NEXTAUTH_URL
ARG NEXTAUTH_URL
ARG NEXT_PUBLIC_KAKAO_CLIENT_ID
ARG NEXT_PUBLIC_KAKAO_JS
ARG NEXT_PUBLIC_KAKAO_JS_KEY
ARG NEXT_PUBLIC_PWA_KEY
ARG NEXT_PUBLIC_GA_MEASUREMENT_ID

# 6. Build the Next.js app
RUN NEXT_PUBLIC_SERVER_URI=$NEXT_PUBLIC_SERVER_URI \
    NEXTAUTH_URL=$NEXTAUTH_URL \
    NEXT_PUBLIC_NEXTAUTH_URL=$NEXT_PUBLIC_NEXTAUTH_URL \
    NEXT_PUBLIC_KAKAO_CLIENT_ID=$NEXT_PUBLIC_KAKAO_CLIENT_ID \
    NEXT_PUBLIC_KAKAO_JS=$NEXT_PUBLIC_KAKAO_JS \
    NEXT_PUBLIC_KAKAO_JS_KEY=$NEXT_PUBLIC_KAKAO_JS_KEY \
    NEXT_PUBLIC_PWA_KEY=$NEXT_PUBLIC_PWA_KEY \
    NEXT_PUBLIC_GA_MEASUREMENT_ID=$NEXT_PUBLIC_GA_MEASUREMENT_ID \
    npm run build

# 7. Production image
FROM node:20.11.0 AS production

# 8. Set working directory inside the production container
WORKDIR /app

# 9. Copy only the necessary files from the builder stage
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules

# 10. Environment variable for production
ENV NODE_ENV=production
ENV NEXT_PUBLIC_SERVER_URI=$NEXT_PUBLIC_SERVER_URI
ENV NEXTAUTH_URL=$NEXTAUTH_URL
ENV NEXT_PUBLIC_NEXTAUTH_URL=$NEXT_PUBLIC_NEXTAUTH_URL
ENV NEXT_PUBLIC_KAKAO_CLIENT_ID=$NEXT_PUBLIC_KAKAO_CLIENT_ID
ENV NEXT_PUBLIC_KAKAO_JS=$NEXT_PUBLIC_KAKAO_JS
ENV NEXT_PUBLIC_KAKAO_JS_KEY=$NEXT_PUBLIC_KAKAO_JS_KEY
ENV NEXT_PUBLIC_PWA_KEY=$NEXT_PUBLIC_PWA_KEY
ENV NEXT_PUBLIC_GA_MEASUREMENT_ID=$NEXT_PUBLIC_GA_MEASUREMENT_ID

# 11. Expose the port
EXPOSE 3000

# 12. Start the Next.js app
CMD ["npm", "start"]