import type { SuiClient } from '../client/index.js';
import type { Keypair } from '../cryptography/keypair.js';
import type { SerializedSignature } from '../cryptography/signature.js';
import { SignerWithProvider } from './signer-with-provider.js';
export declare class RawSigner extends SignerWithProvider {
    private readonly keypair;
    constructor(keypair: Keypair, client: SuiClient);
    getAddress(): Promise<string>;
    signData(data: Uint8Array): Promise<SerializedSignature>;
    connect(client: SuiClient): SignerWithProvider;
}
