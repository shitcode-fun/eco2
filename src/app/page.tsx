'use client';

import { useAccount, useReadContract } from 'wagmi';
import tokenAbi from '../abis/Token.json';
import { TOKEN_ADDRESS } from '../constants';

export default function Home() {
  const { address, isConnected } = useAccount();
  const {
    data: balance,
    isLoading: isBalanceLoading,
    isError: isBalanceError,
  } = useReadContract({
    address: TOKEN_ADDRESS,
    abi: tokenAbi,
    functionName: 'balanceOf',
    args: address ? [address] : undefined,
    query: { enabled: Boolean(isConnected && address) },
  });

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-8 space-y-6 bg-background">
      <h1 className="text-4xl font-bold">Welcome to EcoCoin Space</h1>
      <p className="max-w-prose text-center">
        EcoCoin Space encourages eco-friendly practices through a fun, blockchain-powered game. Cultivate virtual trees in your eco-domain to earn EcoCoins and support environmental projects.
      </p>
      <a
        href="/onboarding"
        className="px-4 py-2 text-white bg-green-600 rounded hover:bg-green-700"
      >
        Get Started
      </a>
      {isConnected && (
        <div className="text-center mt-4">
          <p>Your EcoCoin Balance:</p>
          {isBalanceLoading
            ? 'Loading...'
            : isBalanceError
            ? 'Error fetching balance'
            : `${balance?.toString() ?? '0'} ECOOO`}
        </div>
      )}
    </main>
  );
}
