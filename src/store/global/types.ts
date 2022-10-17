interface Notification {
  text: string;
  title: string;
  type: string;
}
export interface GlobalState {
  hasSeenModal: boolean;
  notification: Notification;
  showModal: boolean;
  step: number;
}
