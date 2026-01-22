// ==========================================
// ASSET MANAGER - Mobile & PC Assets
// ==========================================

// Mobile assets (current/default)
import mobileBackground from "@/assets/mb/background.png";
import mobileMascotRed from "@/assets/mb/mascot-red.png";
import mobileMascotGreen from "@/assets/mb/mascot-green.png";
import mobileMascotBlue from "@/assets/mb/mascot-blue.png";
import mobileQuestionFrame from "@/assets/mb/question-frame.png";
import mobileAnswerButton from "@/assets/mb/answer-button.png";
import mobileStartLine from "@/assets/mb/start-line.png";
import mobileFinishLine from "@/assets/mb/finish-line.png";
import mobileBanhChung from "@/assets/mb/banh-chung.png";
import mobileSubmitButton from "@/assets/mb/submit-button.png";
import mobileContinueButton from "@/assets/mb/continue-button.png";

// PC assets
// NOTE: use a versioned filename to avoid browser caching when assets are replaced
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
