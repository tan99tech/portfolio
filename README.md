# portfolio

## **Prerequisites**

- You have Redis server and MySQL server (root account doesn't have) installed in your local machine.

## **Set up steps**

- Connect to your MySQL and run command on your `tutorial_sequelize` schema:

```bash
  CREATE TABLE achievement (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description VARCHAR(255),
    "achievedDate" DATE,
    "imagePath" VARCHAR(255)
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

## **Conclusion**

- Sequence lock is suitable for critical data and when read command percentage is high.
- We need to take the isolation level into account when design a solution related to transaction.

## **Explanation**

- PostgreSQL Work using CTID (Content Tuple IDentifier - the physical location)

CTID  id  title   description  achievedDate
A     3   title3  
B     2   title2  
C     1   title1  

index on title -> sort id increasing  => 

id        CTID
title1    C
title2    B
title3    A

Suppose we have a uncommitted active transaction X: that updated title3 to title 4

REF     CTID  id  title     description     achievedDate
null    A     3   title3    description3    achievedDate3   (The other normal commands or transaction will see this data)
null    B     2   title2    description2    achievedDate2
null    C     1   title1    description1    achievedDate1
A       D     3   title4    description4    achievedDate4   (This can be seen only by that uncommitted active transaction X)

index on title -> sort id increasing  => 

id        CTID
title1    C
title2    B
title3    A
title4    D

## **Diving deeper**

PostgreSQL supports several transaction isolation levels, each providing different guarantees about the visibility of data changes made by concurrent transactions. The isolation levels in PostgreSQL are:

Read Uncommitted
* Description: This level allows transactions to see uncommitted changes made by other transactions. However, PostgreSQL does not support Read Uncommitted explicitly. In PostgreSQL, even at the Read Uncommitted level, transactions behave like Read Committed.
* Dirty Reads: Possible in theory, but not in PostgreSQL.
* Non-Repeatable Reads: Possible.
* Phantom Reads: Possible.

Read Committed (Default)Each transaction could see the updated balance after the other transaction commits, leading to potential non-repeatable reads.

* Dirty Reads: Not possible.
* Non-Repeatable Reads: Possible. If a row is updated or deleted by another transaction after the first read, subsequent reads in the same transaction will see the new data.
* Phantom Reads: Possible. New rows added by other transactions can be seen if a query is re-executed.

Repeatable Read: Each transaction will not see changes made by the other transaction within the same transaction, avoiding non-repeatable reads but allowing phantom reads.

* Description: Ensures that if a row is read twice in the same transaction, the same data is seen each time. It provides a consistent snapshot of the database for the entire transaction duration. No changes made by other transactions are visible until the current transaction completes.
* Dirty Reads: Not possible.
* Non-Repeatable Reads: Not possible. Once a row is read, it will not change.
* Phantom Reads: Possible. New rows can be inserted by other transactions and can appear in subsequent queries within the same transaction.

Serializable: PostgreSQL will ensure that the transactions are executed in a serial order, preventing anomalies and ensuring complete isolation.

* Dirty Reads: Not possible.
* Non-Repeatable Reads: Not possible.
* Phantom Reads: Not possible.
* Serializable Anomalies: Prevents anomalies by ensuring that transactions are executed in a way that is equivalent to some serial order.

Note: We can set Isolation Levels