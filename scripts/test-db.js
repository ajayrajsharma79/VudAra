const { testDatabaseConnection } = require('../lib/test-db.ts');

async function runTest() {
  console.log('🚀 Starting database connection test...\n');
  
  try {
    const result = await testDatabaseConnection();
    
    if (result.success) {
      console.log('\n🎉 Database connection test PASSED!');
      process.exit(0);
    } else {
      console.log('\n❌ Database connection test FAILED!');
      console.log('Error:', result.message);
      process.exit(1);
    }
  } catch (error) {
    console.error('\n💥 Unexpected error during test:', error);
    process.exit(1);
  }
}

runTest();