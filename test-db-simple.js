const mysql = require('mysql2/promise');

async function testConnection() {
  try {
    console.log('Testing database connection...');
    
    const connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '', // empty password
      database: 'job_applications',
      port: 3306
    });
    
    console.log('✅ Database connected successfully!');
    
    // Test a simple query
    const [rows] = await connection.execute('SELECT 1 as test');
    console.log('✅ Query test:', rows);
    
    await connection.end();
    
  } catch (error) {
    console.log('❌ Database error:', error.message);
    console.log('Error code:', error.code);
  }
}

testConnection();