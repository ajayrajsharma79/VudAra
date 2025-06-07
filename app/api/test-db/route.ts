import { NextResponse } from 'next/server';
import { testDatabaseConnection } from '@/lib/test-db';

export async function GET() {
  try {
    const result = await testDatabaseConnection();
    
    return NextResponse.json({
      success: result.success,
      message: result.message,
      timestamp: new Date().toISOString()
    }, {
      status: result.success ? 200 : 500
    });
    
  } catch (error) {
    console.error('API route error:', error);
    return NextResponse.json({
      success: false,
      message: 'Failed to test database connection',
      error: error.message
    }, {
      status: 500
    });
  }
}