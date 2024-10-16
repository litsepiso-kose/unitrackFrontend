import { createBrowserRouter } from "react-router-dom";
import { ROUTES } from "./common";
import Signin from "../routes/Signin";
import Signup from "../routes/Signup";
import AuthGuard from "../routes/AuthGuard";
// import ErrorPage from "../routes/error-page";
import Welcome from "../routes/Welcome";
import Meeting from "../routes/Meeting";
import Settings from "../routes/Setting";
import Forgot_Password from "../routes/Forgot_Password";
import Add_Payment_Method from "../routes/Add_Payment_Method";
import About_Us from "../routes/About_Us";
import Privacy_Policy from "../routes/PrivacyPolicy";
import Terms_Of_Use from "../routes/Terms_Of_Use";
import Notifications from "../routes/Notifications";
import Support from "../routes/Support";
import Layout from "../Layout";
import SubmitApplication from "../routes/SubmitApplication";
import ViewApplications from "../routes/ViewApplications";
import ViewApplications_copy from "../routes/ViewApplications_copy";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <AuthGuard>
        <Layout />
      </AuthGuard>
    ),
    // errorElement: <ErrorPage />,
    children: [
      {
        path: ROUTES.HOME,
        element: <Welcome />,
      },
      {
        path: ROUTES.NOTIFICATION,
        element: <Notifications />,
      },
      {
        path: ROUTES.SUPPORT,
        element: <Support />,
      },
      {
        path: ROUTES.SETTING,
        element: <Settings />,
      },
      {
        path: ROUTES.ADD_A_PAYMENT_METHOD,

        element: <Add_Payment_Method />,
      },
      {
        path: ROUTES.ABOUT_US,
        element: <About_Us />,
      },
      {
        path: ROUTES.PRIVACY_POLICY,
        element: <Privacy_Policy />,
      },
      {
        path: ROUTES.TERMS_OF_USE,
        element: <Terms_Of_Use />,
      },
      {
        path: `${ROUTES.MEETING}:roomId`,
        element: <Meeting />,
      },  
      {
        path: ROUTES.SUBMIT_APPLICATION,
        element: <SubmitApplication />,
      },
      {
        path: ROUTES.VIEW_APPLICATIONS,
        element: <ViewApplications />,
      },
      {
        path: ROUTES.VIEW_APPLICATIONS_COPY,
        element: <ViewApplications_copy/>,
      },

    ],
  },
  {
    path: ROUTES.SIGNIN,
    element: <Signin />,
  },
  {
    path: ROUTES.SIGNUP,
    element: <Signup />,
  },
  {
    path: ROUTES.FORGOT_PASSWORD,
    element: <Forgot_Password />,
  }
]);
