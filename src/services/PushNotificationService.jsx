import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { toast } from "react-toastify";
import { subscribeToTopics } from "../services/notification-service";
import { messaging, requestNotificationPermission } from "../firebase";
const apikey = import.meta.env.VITE_APP_VAPID_KEY;

const PushNotificationService = {
  async initialize() {
    try {
      const permission = await Notification.requestPermission();
      if (permission === "granted") {
        let token = await requestNotificationPermission();
        if (token) {
          console.log("current token for client: ", token);
          // if (!localStorage.getItem("fcm")) {
            PushNotificationService.subscribeTokenToTopic("jobhuntings");
          // }
          localStorage.setItem("fcm", token);

          return token;
        } else {
          alert(
            "No registration token available. Request permission to generate one."
          );
          return "";
        }
      } else if (permission === "denied") {
        //notifications are blocked
        alert("You denied for the notification");
      }
    } catch (error) {
      console.error("Error initializing notification service:", error);
      throw error;
    }
  },
  subscribeTokenToTopic(topic = null) {
    const token = localStorage.getItem("fcm");
    if (!token) {
      console.error("FCM token is not available");
      return;
    }

    if (!topic) {
      console.error("Topic name is required");
      return;
    }
    subscribeToTopics([topic])
      .then((response) => {
        console.log("Successfully subscribed to topic:", response);
      })
      .catch((error) => {
        console.log("Error subscribing to topic:", error);
      });
  },

  startListening(dispatch, decodedToken) {
    return onMessage(messaging, (payload) => {
        debugger
      console.log("FCM Payload received:", payload);
  
      // If it's a data message, get the data
      const { title, body, image, redirectUrl, ...rest } = {
        title: payload?.notification?.title || payload?.data?.Title,
        body: payload?.notification?.body || payload?.data?.Description,
        image: payload?.data?.Image,
        redirectUrl: payload?.data?.RedirectUrl,
      };
  
      toast.info(
        <div
          onClick={() => {
            if (redirectUrl) window.open(redirectUrl, "_blank");
          }}
          className="cursor-pointer"
        >
          <p className="font-bold">{title}</p>
          <p>{body}</p>
          {image && (
            <img
              src={image}
              alt="Notification"
              className="w-full mt-2 rounded"
            />
          )}
        </div>,
        {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        }
      );
    });
  },
  
};

export default PushNotificationService;
