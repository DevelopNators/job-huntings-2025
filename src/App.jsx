// App.js
import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setDecodedData } from "./store/actions/TokenAction";
import PushNotificationService from "./services/PushNotificationService";
import PrivateRoute from "./routes/PrivateRoute";
import { routesConfig } from "./routes/routes";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setDecodedData());
    PushNotificationService.initialize();
    const unsubscribe = PushNotificationService.startListening(dispatch, null);
    return () => unsubscribe();
  }, [dispatch]);

  return (
    <Router>
      <Routes>
        {routesConfig.map(({ path, element, isPrivate }, index) => (
          <Route
            key={index}
            path={path}
            element={isPrivate ? <PrivateRoute element={element} /> : element}
          />
        ))}
      </Routes>
    </Router>
  );
}

export default App;
