export async function generateSigningKeyPair() {
	const keyPair = await window.crypto.subtle.generateKey(
		{
			name: "ECDSA",
			namedCurve: "P-384", // Matches SHA-384
		},
		true, // true = keys can be exported (e.g., to save or send the public key)
		["sign", "verify"], // Allowed usages for the keys
	);

	return keyPair; // Returns an object: { publicKey: CryptoKey, privateKey: CryptoKey }
}

export async function signMessage(privateKey: CryptoKey, messageText: string) {
	// 1. Encode the string message into a Uint8Array
	const encoder = new TextEncoder();
	const encodedMessage = encoder.encode(messageText);

	// 2. Sign the encoded message using SubtleCrypto
	const signature = await window.crypto.subtle.sign(
		{
			name: "ECDSA",
			hash: { name: "SHA-384" },
		},
		privateKey,
		encodedMessage,
	);

	return signature; // Returns an ArrayBuffer containing the signature
}

export function bufferToHex(signatureBuffer: ArrayBuffer) {
	return Array.from(new Uint8Array(signatureBuffer))
		.map((b) => b.toString(16).padStart(2, "0"))
		.join("");
}

export async function createToken(message: string, password: string) {
	const enc = new TextEncoder();

	// Turn your password into a CryptoKey
	const key = await crypto.subtle.importKey(
		"raw",
		enc.encode(password),
		{ name: "HMAC", hash: "SHA-256" },
		false,
		["sign"],
	);

	// Sign the message
	const signature = await crypto.subtle.sign("HMAC", key, enc.encode(message));

	// Convert signature to Base64
	const sigBase64 = btoa(String.fromCharCode(...new Uint8Array(signature)));

	// Return combined token: "base64(message).base64(signature)"
	return `${btoa(message)}.${sigBase64}`;
}

export async function verifyToken(token: string, password: string) {
	const [msgBase64, sigBase64] = token.split(".");
	if (!msgBase64 || !sigBase64) return null;

	const enc = new TextEncoder();
	const message = atob(msgBase64);

	// Import the same password
	const key = await crypto.subtle.importKey(
		"raw",
		enc.encode(password),
		{ name: "HMAC", hash: "SHA-256" },
		false,
		["verify"],
	);

	// Convert Base64 signature back to bytes
	const sigBytes = Uint8Array.from(atob(sigBase64), (c) => c.charCodeAt(0));

	// Verify the signature matches the message and password
	const isValid = await crypto.subtle.verify(
		"HMAC",
		key,
		sigBytes,
		enc.encode(message),
	);

	return isValid ? message : null; // Returns original message if valid, or null if tampered/wrong password
}
