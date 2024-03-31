import React from 'react';
import OrderInfoPage from "../components/order/info/OrderInfoPage";
import OrderCreatePage from "../components/order/create/OrderCreatePage";
import InvoiceListPage from "../components/invoices/InvoiceListPage";
import AccountComponent from "../components/account/Account";
import ProfilePageComponent from "../components/profile/ProfilePageComponent";
import ChangePasswordPage from "../components/change-password/changePasswordPage";
import DriversPage from "../components/drivers/DriversPage";
import DriverCreatePage from "../components/drivers/DriverCreatePage";
import ExplorePage from "../components/explore/ExplorePage";
import LoginPage from "../pages/login/LoginPage";
import RegistrationPage from "../components/registration/RegistrationPage";
import PrivacyPolicyPage from "../components/documents/PrivacyPolicyPage";
import TermsUsePage from "../components/documents/TermsUsePage";
import ForgotPasswordPage from "../components/forgot-password/ForgotPasswordPage";
import NewPasswordPage from "../components/forgot-password/NewPasswordPage";
import ConfirmEmailPage from "../components/confirm-email/ConfirmEmail";
import OrdersList from "../pages/orders/list";
import OrdersInfo from "../pages/orders/info";
import ProfilePageComponentTwo from "../components/profileTwo/ProfilePageComponentTwo";
import OrdersCreate from "../pages/orders/create";
import BalanceLists from "../pages/balance/list";
import PageInDevelopPage from "../pages/page-in-develop";
import VerifyDocs from "../pages/verify-docs";
import Layouts from "../layouts";
import OrdersAvailable from "../pages/orders/available";
import OrderBooking from "../pages/orders/booking";
import OrdersDraftList from "../pages/orders/list-draft";
import Drivers from "../pages/drivers";
import DriversCreate from "../pages/drivers/create";
import CarsPage from "../pages/cars";
import CarsCreatePage from "../pages/cars/create";
import OrdersInProgressPage from '../pages/orders/in-progress';
import OrdersHistoryPage from '../pages/orders/history';
import Index from '../pages/develop/IconsPage';
import NotificationPage from "../pages/notification";


export const routes = [
  {
    name: 'login',
    title: 'Login page',
    Component: LoginPage,
    // Component: () => (<div> login</div>),
    Layout: Layouts.Without,
    path: '/login',
  },
  {
    name: 'registration',
    title: 'Registration page',
    Component: RegistrationPage,
    Layout: Layouts.Without,
    path: '/registration',
  },
  {
    name: 'privacy-policy',
    title: 'Privacy-policy page',
    Component: PrivacyPolicyPage,
    Layout: Layouts.Without,
    path: '/privacy-policy',
  },
  {
    name: 'terms-of-use',
    title: 'Terms of use page',
    Component: TermsUsePage,
    Layout: Layouts.Without,
    path: '/privacy',
  },
  {
    name: 'forgot-password',
    title: 'Forgot password page',
    Component: ForgotPasswordPage,
    Layout: Layouts.Without,
    path: '/forgot-password',
  },
  {
    name: '/auth/reset-password/:code',
    title: 'Reset password code page',
    Component: NewPasswordPage,
    Layout: Layouts.Without,
    path: '/auth/reset-password/:code',
  },
  {
    name: '/auth/confirm-email/:code',
    title: 'Confirm email page',
    Component: ConfirmEmailPage,
    Layout: Layouts.Without,
    path: '/auth/confirm-email/:code',
  },
  {
    name: 'main',
    title: 'Orders page',
    Component: OrdersList,
    Layout: Layouts.Main,
    Private: true,
    path: '/main'
  },
  {
    name: 'orders-create',
    title: 'Orders create page',
    Component: OrdersCreate,
    Layout: Layouts.Main,
    Private: true,
    path: '/orders/create'
  },
  {
    name: 'orders-available',
    title: 'Orders available page',
    Component: OrdersAvailable,
    Layout: Layouts.Main,
    Private: true,
    path: '/orders/available'
  },
  {
    name: 'orders-booking-id',
    title: 'Orders booking page',
    Component: OrderBooking,
    Layout: Layouts.Main,
    Private: true,
    path: '/orders/booking/:id'
  },
  {
    name: 'orders-draft',
    title: 'Orders draft page',
    Component: OrdersDraftList,
    Layout: Layouts.Main,
    Private: true,
    path: '/orders/draft'
  },
  {
    name: 'orders-draft-id',
    title: 'Order draft detail page',
    Component: OrdersCreate,
    Layout: Layouts.Main,
    Private: true,
    path: '/orders/draft/:id/edit'
  },
  {
    name: 'orders-in-progress',
    title: 'Orders in progress page',
    Component: OrdersInProgressPage,
    Layout: Layouts.Main,
    Private: true,
    path: '/orders/in-progress'
  },
  {
    name: 'orders-history',
    title: 'Orders history page',
    Component: OrdersHistoryPage,
    Layout: Layouts.Main,
    Private: true,
    path: '/orders/history'
  },
  {
    name: 'order/:id',
    title: 'Order page',
    Component: OrdersInfo,
    Layout: Layouts.Main,
    Private: true,
    path: '/order/:id'
  },
  {
    name: 'order-info',
    title: 'Order detail page',
    Component: OrderInfoPage,
    Layout: Layouts.Main,
    Private: true,
    path: '/order-info'
  },
  {
    name: 'order-create',
    title: 'Orders create old page',
    Component: OrderCreatePage,
    Layout: Layouts.Main,
    Private: true,
    path: '/order-create'
  },
  {
    name: 'order-create/:id',
    title: 'Orders edit page',
    Component: OrderCreatePage,
    Layout: Layouts.Main,
    Private: true,
    path: '/order-create/:id'
  },
  {
    name: 'invoices',
    title: 'invoices page',
    Component: AccountComponent,
    Layout: Layouts.Main,
    Private: true,
    path: '/invoices'
  },
  {
    name: 'invoices-old',
    title: 'invoices old page',
    Component: InvoiceListPage,
    Layout: Layouts.Main,
    Private: true,
    path: '/invoices-old'
  },
  {
    name: 'profile-old',
    title: 'profile-old page',
    Component: ProfilePageComponent,
    Layout: Layouts.Main,
    Private: true,
    path: '/profile-old'
  },
  {
    name: 'profile',
    title: 'Profile page',
    Component: ProfilePageComponentTwo,
    Layout: Layouts.Main,
    Private: true,
    path: '/profile'
  },
  {
    name: 'change-password',
    title: 'Change password page',
    Component: ChangePasswordPage,
    Layout: Layouts.Main,
    Private: true,
    path: '/change-password'
  },
  {
    name: 'drivers',
    title: 'drivers page',
    Component: Drivers,
    Layout: Layouts.Main,
    Private: true,
    path: '/drivers'
  },
  {
    name: 'drivers-create',
    title: 'drivers create page',
    Component: DriversCreate,
    Layout: Layouts.Main,
    Private: true,
    path: '/drivers/create'
  },
  {
    name: 'cars',
    title: 'cars page',
    Component: CarsPage,
    Layout: Layouts.Main,
    Private: true,
    path: '/cars'
  },
  {
    name: 'cars-create',
    title: 'drivers create page',
    Component: CarsCreatePage,
    Layout: Layouts.Main,
    Private: true,
    path: '/cars/create'
  },
  {
    name: 'drivers-old',
    title: 'drivers old page',
    Component: DriversPage,
    Layout: Layouts.Main,
    Private: true,
    path: '/drivers-old'
  },
  {
    name: 'driver-create',
    title: 'driver-create page',
    Component: DriverCreatePage,
    Layout: Layouts.Main,
    Private: true,
    path: '/driver-create'
  },
  {
    name: 'explore',
    title: 'explore page',
    Component: ExplorePage,
    Layout: Layouts.Main,
    Private: true,
    path: '/explore'
  },
  {
    name: 'balance/lists',
    title: 'balance/lists page',
    Component: BalanceLists,
    Layout: Layouts.Main,
    Private: true,
    path: '/balance/lists'
  },
  {
    name: 'history-order',
    title: 'history-order page',
    Component: PageInDevelopPage,
    Layout: Layouts.Main,
    Private: true,
    path: '/history-order'
  },
  {
    name: 'transport-companies',
    title: 'transport-companies page',
    Component: PageInDevelopPage,
    Layout: Layouts.Main,
    Private: true,
    path: '/transport-companies'
  },
  {
    name: 'directions',
    title: 'directions page',
    Component: PageInDevelopPage,
    Layout: Layouts.Main,
    Private: true,
    path: '/directions'
  },
  {
    name: 'workers',
    title: 'workers page',
    Component: PageInDevelopPage,
    Layout: Layouts.Main,
    Private: true,
    path: '/workers'
  },
  {
    name: 'document-flow',
    title: 'document-flow page',
    Component: PageInDevelopPage,
    Layout: Layouts.Main,
    Private: true,
    path: '/document-flow'
  },
  {
    name: 'analytics',
    title: 'analytics page',
    Component: PageInDevelopPage,
    Layout: Layouts.Main,
    Private: true,
    path: '/analytics'
  },
  {
    name: 'verify-docs',
    title: 'verify-docs page',
    Component: VerifyDocs,
    Layout: Layouts.Main,
    Private: true,
    path: '/verify-docs'
  },
  {
    name: 'notification',
    title: 'notification page',
    Component: NotificationPage,
    Layout: Layouts.Main,
    Private: true,
    path: '/notification'
  },
  {
    name: 'support',
    title: 'support page',
    Component: PageInDevelopPage,
    Layout: Layouts.Main,
    Private: true,
    path: '/support'
  },
  {
    name: 'icons',
    title: 'icons page',
    Component: Index,
    Layout: Layouts.Main,
    path: '/develop/icons'
  },
]
