const axios = require('axios');
const base64url = require('base64url');
const crypto = require("crypto");
const jwt_decode = require('jwt-decode');
const canonicalize = require("canonicalize");
const qs = require("querystring");
const jwkThumbprint = require("jwk-thumbprint")


class IonDidObject {
  constructor() {

  }

  async siop() {

  }

  // private

  publicKeyJwkToIonDid(publicKeyJwk) {
    const id = "signingKey";
    const contentBuffer = canonicalizeAsBuffer(publicKeyJwk);
    const intermediateHashBuffer = hashAsNonMultihashBuffer(contentBuffer);
    const multihashBuffer = multihash(intermediateHashBuffer);
    const commitment_hash = base64url(multihashBuffer);
  
    const patches = [
      {
        action: "replace",
        document: {
          publicKeys: [
            {
              id,
              type: "EcdsaSecp256k1VerificationKey2019",
              publicKeyJwk: publicKeyJwk,
              purposes: ["authentication", "assertionMethod"],
            },
          ],
        },
      },
    ];
    const delta = {
      updateCommitment: commitment_hash,
      patches,
    };
    const canonical_delta = canonicalizeAsBuffer({
      updateCommitment: commitment_hash,
      patches,
    });
    const deltaHash = base64url(multihash(canonical_delta));
  
    const suffixData = {
      deltaHash,
      recoveryCommitment: commitment_hash,
    };
    const canonicalizedStringBuffer = canonicalizeAsBuffer(
      suffixData
    );
    const multihashed = multihash(canonicalizedStringBuffer);
    const didUniqueSuffix = base64url(multihashed);
    const shortFormDid = `did:ion:${didUniqueSuffix}`;
    const initialState = {
      suffixData,
      delta,
    };
    const canonicalizedInitialStateBuffer = canonicalizeAsBuffer(
      initialState
    );
    const encodedCanonicalizedInitialStateString = base64url(
      canonicalizedInitialStateBuffer
    );
    const longFormDid = `${shortFormDid}:${encodedCanonicalizedInitialStateString}`;
    return longFormDid;
  };
  
  privateKeyToJwk(privateKey) {
    const privateKeyBuffer = Buffer.from(privateKey, "hex");
    const ecdh = crypto.createECDH("secp256k1");
    ecdh.setPrivateKey(privateKeyBuffer);
    const pub = ecdh.getPublicKey();
    const publicKeyJwk = {
      kty: "EC",
      crv: "P-256K",
      x: base64url(pub.slice(1, 32 + 1)),
      y: base64url(pub.slice(32 + 1)),
    };
    const privateKeyJwk = {
      d: base64url(privateKeyBuffer),
      ...publicKeyJwk,
    };
    return { publicKeyJwk, privateKeyJwk };
  };
  
  canonicalizeAsBuffer(content) {
    const canonicalizedString = canonicalize(content);
    const contentBuffer = Buffer.from(canonicalizedString);
    return contentBuffer;
  }
  
  multihash(data) {
    const digest = crypto.createHash("sha256").update(data).digest();
    const prefix = Buffer.from([0x12, digest.length]);
    return Buffer.concat([prefix, digest]);
  }
  
  privateKeyToPem(privateKey) {
    const asn1 = `302e0201010420${privateKey}${"a00706052b8104000a"}`;
    const asn1Base64 = Buffer.from(asn1, "hex").toString("base64");
    const pem = `${"-----BEGIN EC PRIVATE KEY-----\n"}${asn1Base64}${"\n-----END EC PRIVATE KEY-----"}`;
    return pem;
  };
  
  sign(privateKey, header, payload) {
    const pem = privateKeyToPem(privateKey);
    const encodedHeader = base64url(JSON.stringify(header));
    const encodedPayload = base64url(JSON.stringify(payload));
    const message = `${encodedHeader}.${encodedPayload}`;
    const signature = base64url(
      crypto.createSign("sha256").update(message).sign(pem)
    );
    const result = `${encodedHeader}.${encodedPayload}.${signature}`;
    return result;
  }
  
  hashAsNonMultihashBuffer(data) {
    const hash = crypto.createHash("sha256").update(data).digest();
    return hash;
  };
  
  
  generateSub(myJwk) {
    console.log(myJwk)
    let jwktp = jwkThumbprint.jwkThumbprintByEncoding(myJwk, 'SHA-256', 'base64url');
    console.log(jwktp)
    return jwktp;
  }


}

module.exports.IonDidObject = IonDidObject;