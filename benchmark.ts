import axios from 'axios';

let lockCount = 0;
let lockStartTime = 0;

function checkLock() {
    lockCount -= 1;
    if (lockCount === 0) {
        console.log('total time lock take: ', Date.now() - lockStartTime);
    }
}

let transactionCount = 0;
let transactionStartTime = 0;

function checkTransaction() {
    transactionCount -= 1;
    if (transactionCount === 0) {
        console.log('total time transaction take: ', Date.now() - transactionStartTime);
    }
}

async function putDataLock() {
    const url = 'http://localhost:8181/admin/achievement/1/lock_update'; // Replace with your API endpoint
    const data = {
        "title": "Problem Solving Certificate",
        "description": "Issued by Hackerrank"
    };

    try {
        await axios.put(url, data);
    } catch (error) {
        console.error('Error:', error);
    } finally {
        checkLock();
    }
}

async function putAchievementTitleLock() {
    const url = 'http://localhost:8181/admin/achievement/1/lock_update_title'; // Replace with your API endpoint
    const data = {
        "title": "Problem Solving Certificate",
        "description": "Issued by Hackerrank"
    };

    try {
        await axios.put(url, data);
    } catch (error) {
        console.error('Error:', error);
    } finally {
        checkLock();
    }
}

async function readDataLock() {
    const url = 'http://localhost:8181/achievements_lock'; // Replace with your API endpoint
    try {
        await axios.get(url);
    } catch (error) {
        console.error('Error:', error);
    } finally {
        checkLock();
    }
}

async function putDataTransaction() {
    const url = 'http://localhost:8181/admin/achievement/1/transaction_update'; // Replace with your API endpoint
    const data = {
        "title": "Problem Solving Certificate",
        "description": "Issued by Hackerrank"
    };

    try {
        await axios.put(url, data);
    } catch (error) {
        console.error('Error:', error);
    } finally {
        checkTransaction();
    }
}

async function putAchievementTitleTransaction() {
    const url = 'http://localhost:8181/admin/achievement/1/transaction_update_title'; // Replace with your API endpoint
    const data = {
        "title": "Problem Solving Certificate",
        "description": "Issued by Hackerrank"
    };

    try {
        await axios.put(url, data);
    } catch (error) {
        console.error('Error:', error);
    } finally {
        checkTransaction();
    }
}


async function readData() {
    const url = 'http://localhost:8181/achievements'; // Replace with your API endpoint
    try {
        await axios.get(url);
    } catch (error) {
        console.error('Error:', error);
    } finally {
        checkTransaction();
    }
}

async function benchmarkTransaction(loop: number, readPercentage: number) {
    transactionCount = loop;
    transactionStartTime = Date.now();
    for (let i = 0; i < loop; i+= 1) {
        const random: number = Math.random();
        if (random < readPercentage) {
            readData();
        } else {
            putDataTransaction();
            // putAchievementTitleTransaction();
        }
    }
}

async function benchmarkLock(loop: number, readPercentage: number) {

    lockCount = loop;
    lockStartTime = Date.now();
    for (let i = 0; i < loop; i+= 1) {
        const random: number = Math.random();
        if (random < readPercentage) {
            readDataLock();
        } else {
            putDataLock();
            // putAchievementTitleLock();
        }
    }
}
// Call the function to execute the POST request
(
    async () => {
        // await benchmarkTransaction(100, 0);
        await benchmarkLock(100, 0);
    }
)();