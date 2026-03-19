const fetch = require('node-fetch');

async function testAPI() {
  try {
    console.log('Testing simple API...');
    const response = await fetch('http://localhost:3000/api/test');
    const data = await response.json();
    console.log('Status:', response.status);
    console.log('Data:', JSON.stringify(data, null, 2));

    console.log('\nTesting customers API...');
    const customersResponse = await fetch('http://localhost:3000/api/customers');
    const customersData = await customersResponse.json();
    console.log('Customers Status:', customersResponse.status);
    console.log('Customers Data:', JSON.stringify(customersData, null, 2));
  } catch (error) {
    console.error('Error:', error.message);
  }
}

testAPI();