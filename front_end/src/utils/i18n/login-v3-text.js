import React from 'react';
import {Link} from 'react-router-dom';

const today = new Date();

export const loginV3Text = {
    "en-US": {
        "App description": "Bookkeeping made easy.",
        "Invalid email or password.": "Invalid email or password.",
        "Email not verified": "The email address for this account has not been verified. Please follow the instructions in your verification email to verify this account.",
        "Click here to send a new verification email.": "Click here to send a new verification email.",
        "Verification email sent!": "Verification email sent!",
        "Email Address": "Email Address",
        "Password": "Password",
        "Sign me in": "Sign me in",
        "Not a member": <div>Not a member yet? Click <Link to="/user/register" className="text-primary">here</Link> to register.</div>,
        "Copyright text": `\u00a9 ${today.getFullYear()} myEasyLedger.com All Rights Reserved.`,

        "Forgot Password?": "Forgot Password?",
        "Find Your Account": "Find Your Account",
        "Please enter your email to search for your account.": "Please enter your email to search for your account.",
        "Could not find an account registered with this email address.": "Could not find an account registered with this email address.",
        "Go Back": "Go Back",
        "Submit": "Submit",

        "Reset Password Code" : "Reset Password Code",
        "Incorrect password reset code." : "Incorrect password reset code.",
        "Expired code." : "Expired code",
        "Verify Your Email": "Verify Your Email",
        "Please enter the six-digit code we have sent to your email.": "Please enter the six-digit code we have sent to your email.",
        "Click here to send a new code.": "Click here to send a new code.",
        "A new code has been sent to your email!": "A new code has been sent to your email!",

        "Confirm Password": "Confirm Password",
        "Passwords do not match.": "Passwords do not match.",
        "Something went wrong. Please try again later.": "Something went wrong. Please try again later.",
        "Reset Your Password": "Reset Your Password",
        "Please enter your new password below.": "Please enter your new password below.",
        "This session has expired.": "This session has expired.",
        "Please click here to restart this process.": "Please click here to restart this process.",
        "Password Reset Successful!": "Password Reset Successful!",
        "Please click here to log in.": "Please click here to log in.",


    },
    "zh-TW": {
        "App description": "易記帳。",
        "Invalid email or password.": "輸入的電郵或密碼有誤。",
        "Email not verified": "您使用的電郵還未經確認，請檢視寄到該電郵的確認信，依指示以完成確認程序。",
        "Click here to send a new verification email.": "如還未收到確認信，請點此要求系統再次寄出一封確認電郵指示到你的電郵箱。",
        "Verification email sent!": "確認電郵已寄出！",
        "Email Address": "電郵",
        "Password": "密碼",
        "Sign me in": "登入",
        "Not a member": <div>還没有帳號嗎？請點擊 <Link to="/user/register" className="text-primary">這個連結</Link> 建立一個使用帳號。</div>,
        "Copyright text": `\u00a9 ${today.getFullYear()} myEasyLedger.com 版權所有。`,

        "Forgot Password?": "忘了你的密碼嗎？",
        "Find Your Account": "搜尋你的帳戶",
        "Please enter your email to search for your account.": "忘了密碼嗎？請輸入你的電郵來找你的記帳用戶帳號。",
        "Could not find an account registered with this email address.": "找不到用該電郵註册的帳號。",
        "Go Back": "返回",
        "Submit": "送出",

        "Reset Password Code" : "確認碼",
        "Incorrect password reset code." : "確認碼有誤",
        "Expired code." : "確認碼已過期。",
        "Verify Your Email": "確認你的電郵",
        "Please enter the six-digit code we have sent to your email.": "請輸入我們寄到你電郵箱的「確認碼」（6碼）。",
        "Click here to send a new code.": "或點選這個連結重寄一個新的「確認碼」到你的電郵箱。",
        "A new code has been sent to your email!": "一個新的確認碼已經寄出到你的電郵了！",

        "Confirm Password": "確認密碼",
        "Passwords do not match.": "密碼不符。",
        "Something went wrong. Please try again later.": "出了點問題，請稍後再試。",
        "Reset Your Password": "重設你的密碼",
        "Please enter your new password below.": "請在下方輸入你的密碼。",
        "This session has expired.": "登入逾時",
        "Please click here to restart this process.": "請點選這個連結再重試一次。",
        "Password Reset Successful!": "密碼重設成功！",
        "Please click here to log in.": "請點選這個連結登入。",

    }

}