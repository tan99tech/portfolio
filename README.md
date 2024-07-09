# portfolio

## **Prerequisites**

- You have Redis server and MySQL server (root account doesn't have) installed in your local machine.

## **Set up steps**

- Connect to your MySQL and run command on your `tutorial_sequelize` schema:

```bash
  CREATE TABLE achievement (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description VARCHAR(255),
    achievedDate DATE,
    imagePath VARCHAR(255)
  );
```

- Clone the source code and run:

```bash
  yarn install
  yarn start
```

- To benchmark, run the server at 8181 and run:

```bash
  ts-node benchmark.ts
```

- To test API, use postman
