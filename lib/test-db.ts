import { db, sql } from './db';
import { users } from './schema';

export async function testDatabaseConnection() {
  try {
    console.log('🔍 Testing database connection...');
    
    // Test 1: Basic connection test
    console.log('1. Testing basic connection...');
    const result = await sql`SELECT 1 as test`;
    console.log('✅ Basic connection successful:', result);
    
    // Test 2: Test schema access
    console.log('2. Testing schema access...');
    const tableCheck = await sql`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      AND table_name = 'users'
    `;
    console.log('✅ Schema check result:', tableCheck);
    
    // Test 3: Test Drizzle ORM
    console.log('3. Testing Drizzle ORM...');
    try {
      const userCount = await db.select().from(users).limit(1);
      console.log('✅ Drizzle ORM working, sample query result:', userCount);
    } catch (error) {
      console.log('⚠️  Drizzle query failed (tables might not exist yet):', error.message);
    }
    
    // Test 4: Check environment variables
    console.log('4. Checking environment variables...');
    console.log('DATABASE_URL exists:', !!process.env.DATABASE_URL);
    console.log('DATABASE_URL format:', process.env.DATABASE_URL?.substring(0, 20) + '...');
    
    return {
      success: true,
      message: 'Database connection test completed successfully'
    };
    
  } catch (error) {
    console.error('❌ Database connection test failed:', error);
    return {
      success: false,
      message: error.message,
      error
    };
  }
}

// Export for use in API routes or other modules
export default testDatabaseConnection;