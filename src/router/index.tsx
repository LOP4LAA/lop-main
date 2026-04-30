// import { Outlet, createBrowserRouter, Navigate } from "react-router-dom"
// import LoginPage from "../pages/auth/login/Login"
// import ErrorBoundary from "../pages/error-boundary/Error-Boundary"
// import AuthLayout from "../components/layouts/AuthLayout/AuthLayout"
// import DashboardLayout from "../components/layouts/DashboardLayout/DashboardLayout"
// import Dashboard from "../pages/dashboard/dashboard"
// import NotFound from "../pages/not-found/NotFound"
// import RegisterPage from "../pages/auth/register/Register"
// import ForgotPasswordPage from "../pages/auth/forgot-password/ForgotPassword"
// import EnterOtpPage from "../pages/auth/enter-otp/ResetPassword"
// import ChangePassword from "../pages/auth/change-password/ChangePassword"
// import Achievements from "../pages/achievements/Achievements"
// import MyProfile from "../pages/my-profile/MyProfile"
// import ProfileSettings from "../pages/profile-settings/ProfileSettings"
// import HumanBooks from "../pages/human-books/HumanBooks"
// import Activity from "../pages/activity/Activity"
// import Events from "../pages/events/Events"
// import SingleEvent from "../pages/events/singleEvents/singleEvents"

// import LandingPage from "../pages/landing-page"

// const router = createBrowserRouter([
//   {
//     path: "/dashboard",
//     element: (
//       <ErrorBoundary>
//         <Outlet />
//       </ErrorBoundary>
//     ),
//     children: [
//       {
//         path: "",
//         element: (
//           <DashboardLayout>
//             <Dashboard />
//           </DashboardLayout>
//         ),
//       },
//       {
//         path: "/achievements",
//         element: (
//           <DashboardLayout>
//             <Achievements />
//           </DashboardLayout>
//         ),
//       },
//       {
//         path: "/my-profile",
//         element: (
//           <DashboardLayout>
//             <MyProfile />
//           </DashboardLayout>
//         ),
//       },
//       {
//         path: "/profile-settings",
//         element: (
//           <DashboardLayout>
//             <ProfileSettings />
//           </DashboardLayout>
//         ),
//       },
//       {
//         path: "/human-books",
//         element: (
//           <DashboardLayout>
//             <HumanBooks />
//           </DashboardLayout>
//         ),
//       },
//       {
//         path: "/activity",
//         element: (
//           <DashboardLayout>
//             <Activity />
//           </DashboardLayout>
//         ),
//       },
//       {
//         path: "/events",
//         element: (
//           <DashboardLayout>
//             <Events />
//           </DashboardLayout>
//         ),
//       },
//       {
//         path: "/events/:id",
//         element: (
//           <DashboardLayout>
//             <SingleEvent />
//           </DashboardLayout>
//         ),
//       },
//       {
//         path: "*",
//         element: <NotFound />,
//       },
//     ],
//   },
//   {
//     path: "/",
//     element: (
//       <AuthLayout>
//         <Outlet />
//       </AuthLayout>
//     ),
//     children: [
//       { path: "login", element: <LoginPage /> },
//       { path: "register", element: <RegisterPage /> },
//       { path: "forgot-password", element: <ForgotPasswordPage /> },
//       { path: "enter-otp", element: <EnterOtpPage /> },
//       { path: "change-password", element: <ChangePassword /> },
//       { path: "*", element: <Navigate to="/login" /> }, // Redirect unknown auth paths to login
//     ],
//   },
// ])

// export { router }

import { Outlet, createBrowserRouter, Navigate } from "react-router-dom"
import LoginPage from "../pages/auth/login/Login"
import ErrorBoundary from "../pages/error-boundary/Error-Boundary"
import AuthLayout from "../components/layouts/AuthLayout/AuthLayout"
import DashboardLayout from "../components/layouts/DashboardLayout/DashboardLayout"
import Dashboard from "../pages/dashboard/dashboard"
import NotFound from "../pages/not-found/NotFound"
import RegisterPage from "../pages/auth/register/Register"
import ForgotPasswordPage from "../pages/auth/forgot-password/ForgotPassword"
import EnterOtpPage from "../pages/auth/enter-otp/ResetPassword"
import ChangePassword from "../pages/auth/change-password/ChangePassword"
import Achievements from "../pages/achievements/Achievements"
import MyProfile from "../pages/my-profile/MyProfile"
import ProfileSettings from "../pages/profile-settings/ProfileSettings"
import HumanBooks from "../pages/human-books/HumanBooks"
import Blog from "../pages/landing-page/Blog"
import Events from "../pages/events/Events"
import SingleEvent from "../pages/events/singleEvents/singleEvents"
import ResetPassword from "../pages/auth/reset-password/ResetPassword"

import LandingPage from "../pages/landing-page"
import LandingPageLayout from "../components/layouts/LandingPage/LandingPage"
import About from "../pages/landing-page/About"
// import Acknowledgment from "../pages/landing-page/Acknowledgement"
import Activity from "../pages/activity/Activity"
import BookDetail from "../pages/human-books/BookDetail"
import ActivateReader from "@/pages/auth/activate-reader/ActivateReader"
import VerifyReader from "@/pages/auth/verify-reader"

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ErrorBoundary>
        <LandingPageLayout />
      </ErrorBoundary>
    ),
    children: [
      { path: "/", element: <LandingPage /> },
      { path: "/about", element: <About /> },
      { path: "/blog", element: <Blog /> },
      { path: "/about", element: <About /> },
      // { path: "/acknowledgement", element: <Acknowledgment /> },
    ],
  },
  {
    path: "/dashboard", // Prefix for all dashboard-related routes
    element: (
      <ErrorBoundary>
        <Outlet />
      </ErrorBoundary>
    ),
    children: [
      {
        path: "", // Equivalent to /dashboard
        element: (
          <DashboardLayout>
            <Dashboard />
          </DashboardLayout>
        ),
      },
      {
        path: "achievements", // Equivalent to /dashboard/achievements
        element: (
          <DashboardLayout>
            <Achievements />
          </DashboardLayout>
        ),
      },
      {
        path: "my-profile", // Equivalent to /dashboard/my-profile
        element: (
          <DashboardLayout>
            <MyProfile />
          </DashboardLayout>
        ),
      },
      {
        path: "profile-settings", // Equivalent to /dashboard/profile-settings
        element: (
          <DashboardLayout>
            <ProfileSettings />
          </DashboardLayout>
        ),
      },
      {
        path: "books", // Equivalent to console.log("Navigating to /dashboard/human-booksr
        element: (
          <DashboardLayout>
            <HumanBooks />
          </DashboardLayout>
        ),
      },
      {
        path: "activity", // Equivalent to /dashboard/activity
        element: (
          <DashboardLayout>
            <Activity />
          </DashboardLayout>
        ),
      },
      {
        path: "books/:bookId",
        element: (
          <DashboardLayout>
            <BookDetail />
          </DashboardLayout>
        ),
      },
      {
        path: "activity",
        element: (
          <DashboardLayout>
            <Activity />
          </DashboardLayout>
        ),
      },
      {
        path: "events", // Equivalent to /dashboard/events
        element: (
          <DashboardLayout>
            <Events />
          </DashboardLayout>
        ),
      },
      {
        path: "events/:id", // Equivalent to /dashboard/events/:id
        element: (
          <DashboardLayout>
            <SingleEvent />
          </DashboardLayout>
        ),
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
  {
    path: "/", // Root routes
    element: (
      <AuthLayout>
        <Outlet />
      </AuthLayout>
    ),
    children: [
      { path: "login", element: <LoginPage /> },
      { path: "register", element: <RegisterPage /> },
      { path: "forgot-password", element: <ForgotPasswordPage /> },
      { path: "enter-otp", element: <EnterOtpPage /> },
      { path: "reset-password", element: <ChangePassword /> },
      { path: "change-password", element: <ResetPassword /> },
      { path: `activate-reader/:token`, element: <ActivateReader /> },
      { path: `verify-reader/:token`, element: <VerifyReader /> },
      { path: "*", element: <Navigate to="/login" /> }, // Redirect unknown auth paths to login
    ],
  },
])

export { router }
