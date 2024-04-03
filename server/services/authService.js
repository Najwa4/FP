const sendEmail = require("../utils/sendEmail");

async function initiateForgotPasswordEmail(email, session) {
  const otp = generateForgetPasswordEmail();
  const otpExpiryTime = Date.now() + 2 * 60 * 1000;
  const text = `You are receiving this email because you (or someone else) has requested the reset of a password for your account. Please verify this OTP and proceed with the steps: ${otp}`;
  await sendEmail({
    email,
    subject: "Password reset OTP",
    text,
  });
  session.otp = otp;
  session.otpExpiryTime = otpExpiryTime;
}

// Function to verify OTP
function verifyOTP(otp, storedOTP) {
  return otp === storedOTP;
}

module.exports = {
  initiateForgotPasswordEmail,
  verifyOTP,
};
