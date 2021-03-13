import server from "./server";

const PORT = 3000 || process.env.PORT;

// eslint-disable-next-line no-console
server.listen(PORT, () => console.log(`Server listening at port ${PORT}`));
