import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useWallet } from "@solana/wallet-adapter-react";
import {
  Connection,
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
  Transaction,
} from "@solana/web3.js";
import { useState } from "react";

export default function Tipping() {
  const { publicKey, sendTransaction } = useWallet();
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");
  const [status, setStatus] = useState("");
  const [blinkUrl, setBlinkUrl] = useState(""); // New state to store Blink URL

  const handleTip = async () => {
    if (!publicKey || !recipient || !amount) return;

    try {
      const connection = new Connection("https://api.devnet.solana.com", "confirmed");
      const recipientPubKey = new PublicKey(recipient);
      const lamports = parseFloat(amount) * LAMPORTS_PER_SOL;

      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: publicKey,
          toPubkey: recipientPubKey,
          lamports,
        })
      );

      const signature = await sendTransaction(transaction, connection);
      await connection.confirmTransaction(signature, "confirmed");
      setStatus(`✅ Tip sent! Signature: ${signature}`);
    } catch (err) {
      console.error(err);
      setStatus("❌ Failed to send tip.");
    }
  };

  const handleBlink = async () => {
    if (!recipient || !amount) return;

    try {
      const response = await fetch("http://localhost:5000/api/blink", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ recipient, amount }),
      });

      const data = await response.json();

      if (data.blinkUrl) {
        setBlinkUrl(data.blinkUrl); // Update the state with the Blink URL
        window.open(data.blinkUrl, "_blank"); // Open the Blink URL in a new tab
      } else {
        console.error("No blinkUrl returned");
      }
    } catch (err) {
      console.error("Blink error:", err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black text-white px-4 py-10">
      <div className="w-full max-w-md bg-gray-800/70 backdrop-blur-md p-6 rounded-2xl shadow-xl">
        <h1 className="text-3xl font-bold text-center mb-6">Tip a Creator</h1>
        <div className="mb-4 flex justify-center">
          <WalletMultiButton className="!bg-purple-600 hover:!bg-purple-700 transition" />
        </div>

        <input
          className="w-full mb-4 p-3 bg-gray-900 rounded-lg border border-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
          placeholder="Creator Wallet Address"
          value={recipient}
          onChange={(e) => setRecipient(e.target.value)}
        />

        <input
          className="w-full mb-4 p-3 bg-gray-900 rounded-lg border border-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
          placeholder="Amount (SOL)"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <button
          onClick={handleTip}
          className="w-full py-3 bg-green-500 hover:bg-green-600 rounded-lg text-lg font-semibold transition"
        >
          Send Tip
        </button>
        <button
          onClick={handleBlink}
           className="w-full py-3 mt-3 bg-green-500 hover:bg-green-600 rounded-lg text-lg font-semibold transition"
        >
          Send via Blink
        </button>

        {status && (
          <p className="mt-4 text-sm text-center text-gray-300 break-words">
            {status}
          </p>
        )}

        {blinkUrl && (
          <p className="mt-4 text-sm text-center text-gray-300 break-words">
            <a href={blinkUrl} target="_blank" rel="noopener noreferrer">
              Click here to view the Blink URL
            </a>
          </p>
        )}
      </div>
    </div>
  );
}
