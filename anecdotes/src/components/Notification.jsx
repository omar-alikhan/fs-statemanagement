import { useNotifications } from "../store";

const Notification = () => {
  const notifications = useNotifications();
  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
    marginBottom: 10,
  };

  return (
    notifications && (
      <div style={style} data-testid="notification">
        {notifications}
      </div>
    )
  );
};

export default Notification;
