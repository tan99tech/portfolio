import axios from 'axios';

async function putDataLock() {
    const url = 'http://localhost:8181/admin/achievement/9/lock_update'; // Replace with your API endpoint
    const data = {
        "title": "Problem Solving Certificate",
        "description": "Issued by Hackerrank"
    };

    try {
        const response = await axios.put(url, data);
        console.log('Response:', response.data);
    } catch (error) {
        console.error('Error:', error);
    }
}

async function readDataLock() {
    const url = 'http://localhost:8181/achievements_lock'; // Replace with your API endpoint
    try {
        const response = await axios.get(url);
        console.log('Response:', response.data);
    } catch (error) {
        console.error('Error:', error);
    }
}

async function putDataTransaction() {
    const url = 'http://localhost:8181/admin/achievement/9/update'; // Replace with your API endpoint
    const data = {
        "title": "Problem Solving Certificate",
        "description": "Issued by Hackerrank"
    };

    try {
        const response = await axios.put(url, data);
        console.log('Response:', response.data);
    } catch (error) {
        console.error('Error:', error);
    }
}


async function readData() {
    const url = 'http://localhost:8181/achievements'; // Replace with your API endpoint
    try {
        const response = await axios.get(url);
        console.log('Response:', response.data);
    } catch (error) {
        console.error('Error:', error);
    }
}

async function execute_transaction_flow(loop: number, readPercentage: number) {
    const totalTime = 0;
    for (let i = 0; i < loop; i+= 1) {
        const random: number = Math.random();
        if (random < readPercentage) {
            readData();
        } else {
            putDataTransaction();
        }
    }
}

async function benchmark(loop: number, readPercentage: number) {


    for (let i = 0; i < loop; i+= 1) {
        const random: number = Math.random();
        if (random < readPercentage) {
            readDataLock();
        } else {
            putDataTransaction();
        }
    }
}

// Call the function to execute the POST request
(
    async () => {
        await benchmark(10, 0.2);
    }
)();