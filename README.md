# project-preflight10

# floder "db-pj"
-- docker up
$ cd pj-db 
$ docker compose up -

-- Setting up Drizzle

$ npm init es6
$ pnpm install dotenv drizzle-orm postgres
$ pnpm install -D drizzle-kit typescript tsx @types/node @tsconfig/node-lts @tsconfig/node-ts cross-env
