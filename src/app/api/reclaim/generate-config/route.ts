import { NextResponse } from "next/server";
import { ReclaimProofRequest } from "@reclaimprotocol/js-sdk";

const BASE_URL = process.env.BASE_URL!;

// Handle GET requests
export async function GET() {
  const APP_ID: string = process.env.RECLAIM_APP_ID!;
  const APP_SECRET: string = process.env.RECLAIM_APP_SECRET!;
  const PROVIDER_ID: string = process.env.RECLAIM_PROVIDER_ID!;

  try {
    const reclaimProofRequest = await ReclaimProofRequest.init(
      APP_ID,
      APP_SECRET,
      PROVIDER_ID
    );

    reclaimProofRequest.setAppCallbackUrl(`${BASE_URL}/api/reclaim/callback`);

    const reclaimProofRequestConfig = reclaimProofRequest.toJsonString();

    return NextResponse.json({
      message: "Reclaim Proof Request created successfully",
      reclaimProofRequestConfig,
    });
  } catch (error) {
    console.error("Error creating Reclaim Proof Request:", error);
    return NextResponse.json(
      { error: "Failed to create Reclaim Proof Request" },
      { status: 500 }
    );
  }
}
