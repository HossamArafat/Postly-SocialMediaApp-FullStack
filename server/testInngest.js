import { inngest } from './inngest/index.js'; // path to your Inngest client

async function testUserCreation() {
  const event = {
    name: 'clerk/user.created', // must match your function's event name
    data: {
      id: 'user_test_001',
      first_name: 'John',
      last_name: 'Doe',
      email_addresses: [{ email_address: 'john.doe@example.com' }],
      image_url: 'https://example.com/avatar.png',
    }
  };

  await inngest.send(event);
  console.log('Test event sent!');
}

testUserCreation();
