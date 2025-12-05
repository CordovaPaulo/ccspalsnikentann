import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

const EXTERNAL_API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export async function GET(request: NextRequest) {
  try {
    // Get the auth token from cookies
    const token = request.cookies.get('MindMateToken')?.value;

    if (!token) {
      return NextResponse.json(
        { authenticated: false, message: 'No token found' },
        { status: 401 }
      );
    }

    // Forward the auth check request to the external API
    const response = await axios.get(`${EXTERNAL_API_URL}/api/auth/check`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Cookie: `MindMateToken=${token}`,
      },
      validateStatus: () => true,
    });

    return NextResponse.json(response.data, {
      status: response.status,
    });
  } catch (error) {
    console.error('Auth check proxy error:', error);
    return NextResponse.json(
      { authenticated: false, message: 'Failed to verify authentication' },
      { status: 500 }
    );
  }
}
