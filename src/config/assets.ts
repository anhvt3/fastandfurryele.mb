// ==========================================
// ASSET MANAGER - Mobile & PC Assets
// ==========================================

// Mobile assets (current/default)
import mobileBackground from "@/assets/background.png";
import mobileMascotRed from "@/assets/mascot-red.png";
import mobileMascotGreen from "@/assets/mascot-green.png";
import mobileMascotBlue from "@/assets/mascot-blue.png";
import mobileQuestionFrame from "@/assets/question-frame.png";
import mobileAnswerButton from "@/assets/answer-button.png";
import mobileStartLine from "@/assets/start-line.png";
import mobileFinishLine from "@/assets/finish-line.png";
import mobileBanhChung from "@/assets/banh-chung.png";
import mobileSubmitButton from "@/assets/submit-button.png";
import mobileContinueButton from "@/assets/continue-button.png";

// PC assets
import pcBackground from "@/assets/pc/background.png";
import pcMascotRed from "@/assets/pc/mascot-red.png";
import pcMascotGreen from "@/assets/pc/mascot-green.png";
import pcMascotBlue from "@/assets/pc/mascot-blue.png";
import pcQuestionFrame from "@/assets/pc/question-frame.png";
import pcAnswerButton from "@/assets/pc/answer-button.png";
import pcStartLine from "@/assets/pc/start-line.png";
import pcFinishLine from "@/assets/pc/finish-line.png";
import pcBanhChung from "@/assets/pc/banh-chung.png";

export const ASSETS = {
  mobile: {
    background: mobileBackground,
    mascotRed: mobileMascotRed,
    mascotGreen: mobileMascotGreen,
    mascotBlue: mobileMascotBlue,
    questionFrame: mobileQuestionFrame,
    answerButton: mobileAnswerButton,
    startLine: mobileStartLine,
    finishLine: mobileFinishLine,
    banhChung: mobileBanhChung,
    submitButton: mobileSubmitButton,
    continueButton: mobileContinueButton,
  },
  desktop: {
    background: pcBackground,
    mascotRed: pcMascotRed,
    mascotGreen: pcMascotGreen,
    mascotBlue: pcMascotBlue,
    questionFrame: pcQuestionFrame,
    answerButton: pcAnswerButton,
    startLine: pcStartLine,
    finishLine: pcFinishLine,
    banhChung: pcBanhChung,
    // PC uses same submit/continue buttons as mobile for now
    submitButton: mobileSubmitButton,
    continueButton: mobileContinueButton,
  }
};

export type AssetSet = typeof ASSETS.mobile;

export const getAssets = (deviceType: 'mobile' | 'desktop'): AssetSet => ASSETS[deviceType];
