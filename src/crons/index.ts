import { removeOldTokens } from "./remove-old-token.cron";
// import { sendNotificationToOldVisitors } from "./send-notification-to-old-visitors";

export const cronRunner = () => {
  removeOldTokens.start();
  // sendNotificationToOldVisitors.start();
};
