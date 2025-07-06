"use client";

import { useState } from "react";
import { ReclaimProofRequest } from "@reclaimprotocol/js-sdk";

const BASE_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : "https://your-domain.com";

function StartReclaimVerification() {
  const [proofs, setProofs] = useState<unknown>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleVerification = async () => {
    try {
      setIsLoading(true);

      const response = await fetch(`${BASE_URL}/api/reclaim/generate-config`);

      if (!response.ok) {
        throw new Error("Failed to fetch configuration");
      }

      const { reclaimProofRequestConfig } = await response.json();

      const reclaimProofRequest = await ReclaimProofRequest.fromJsonString(
        reclaimProofRequestConfig
      );

      await reclaimProofRequest.triggerReclaimFlow();

      await reclaimProofRequest.startSession({
        onSuccess: (proofs) => {
          console.log("Successfully created proof", proofs);
          setProofs(proofs);
          setIsLoading(false);
        },
        onError: (error) => {
          console.error("Verification failed", error);
          setIsLoading(false);
        },
      });
    } catch (error) {
      console.error("Error initializing Reclaim:", error);
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-center mb-6">
        Reclaim Verification
      </h1>

      <button
        onClick={handleVerification}
        disabled={isLoading}
        className="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white font-medium py-2 px-4 rounded-md transition-colors"
      >
        {isLoading ? "Verifying..." : "Start Verification"}
      </button>

      {proofs !== null && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold text-green-600 mb-4">
            Verification Successful!
          </h2>
          <div className="bg-gray-100 p-4 rounded-md overflow-x-auto">
            <pre className="text-sm text-gray-800">
              {JSON.stringify(proofs, null, 2)}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
}

export default StartReclaimVerification;
