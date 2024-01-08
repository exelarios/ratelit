
# ratelit
A mobile application where users can collaboratively rank, rate and share their list.

## How to build
Install dependencies:
```bash
bun install
```

Generate Prisma types:
```bash
bun db:gen
```

Run the server:
```bash
bun server:start
```

Generate GraphQL Schema based on Prisma's schema:
```bash
bun gql:gen
```

## Run

Start the server, if it's not running.
```bash
bun server:start
```

Start the client:
```bash
bun mobile:start
```

## Technologies Used
- Bun
- React Native (expo)
	- React-Relay
- GraphQL 
	- Pothos
	- Graphql-Yoga
- Prisma
- mySQL via PlanetScale