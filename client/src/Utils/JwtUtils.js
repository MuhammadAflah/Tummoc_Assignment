export const parseToken = (token) => {
  try {
    // Split the token into its three parts: header, payload, and signature
    // const [headerBase64, payloadBase64, signature] = token.split(".");
    const payloadBase64 = token.split(".")[1];

    // Decode the payload from Base64
    const payload = JSON.parse(atob(payloadBase64));

    return payload;
  } catch (error) {
    // Handle any errors that occur during parsing
    console.error("Failed to parse token:", error);
    return null;
  }
};
