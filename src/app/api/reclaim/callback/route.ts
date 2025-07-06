import {verifyProof} from '@reclaimprotocol/js-sdk';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.text();
    
    const decodedBody = decodeURIComponent(body);
    const proof = JSON.parse(decodedBody);
    
    const result = await verifyProof(proof);
    
    if (!result) {
      return NextResponse.json(
        { error: 'Invalid proofs data' },
        { status: 400 }
      );
    }
    
    console.log('Received proofs:', proof);
    
    return NextResponse.json(
      { message: 'Proof verified successfully', verified: true },
      { status: 200 }
    );
    
  } catch (error) {
    console.error('Error processing proof:', error);
    return NextResponse.json(
      { error: 'Failed to process proof' },
      { status: 500 }
    );
  }
}