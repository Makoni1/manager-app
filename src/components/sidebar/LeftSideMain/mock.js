import React from 'react';
import PhotoHistoryIcon from '../../shared/icons/PhotoHistoryIcon';
import DocumentIcon from '../../shared/icons/DocumentIcon';
import TransportCompanyIcon from '../../shared/icons/TransportCompanyIcon';
import DirectionsIcon from '../../shared/icons/DirectionsIcon';
import AnalyticsIcon from '../../shared/icons/AnalyticsIcon';
import SupportIconMenu from '../../shared/icons/SupportIconMenu';
import CarOrderIcon from '../../shared/icons/CarOrderIcon';
import UsersIcon from '../../shared/icons/UsersIcon';
import AutoparkIcon from '../../shared/icons/AutoparkIcon';
import LupeIcon from '../../shared/icons/LupeIcon';

const commonNavigation = [
  // {
  //     title: "Счет-фактуры",
  //     icon: "invoices.svg",
  //     link: "/balance/lists",
  // },
  {
    title: "Аналитика",
    icon: <AnalyticsIcon />,
    link: "/analytics",
  },
  {
    title: "Поддержка",
    icon: <SupportIconMenu />,
    link: "/support",
  },
]


const clientTopMenu = [
  {
    title: "Мои заказы",
    isHasDropdownStatuses: true,
    icon: <CarOrderIcon type={2} />,
    link: "/main",
    children: [],
  },
  {
    title: "История заказов",
    icon: <PhotoHistoryIcon />,
    link: "/orders/history",
  },
  {
    title: "Черновики",
    icon: <DocumentIcon type={2} />,
    link: "/orders/draft",
  },
]

export const menuExpeditor = [
  {
    title: "Поиск заказов",
    icon: <LupeIcon isBigBg />,
    link: "/orders/available",
  },
  {
    title: "Заказы в работе",
    icon: <CarOrderIcon />,
    link: "/orders/in-progress",
  },
  ...clientTopMenu,
  {
    line: true,
  },
  {
    title: "Водители",
    icon: <UsersIcon />,
    link: "/drivers",
  },
  {
    title: "Автопарк",
    icon: <AutoparkIcon />,
    link: "/cars",
  },
  ...commonNavigation
]
export const menuClient = [
  ...clientTopMenu,
  {
    line: true,
  },
  {
    title: "Транспортные компании",
    icon: <TransportCompanyIcon />,
    link: "/transport-companies",
  },
  {
    title: "Направления",
    icon: <DirectionsIcon />,
    link: "/directions",
  },
  {
    line: true,
  },
  {
    title: "Сотрудники",
    icon: <UsersIcon />,
    link: "/workers",
  },
  {
    title: "Документооборот",
    icon: <DocumentIcon type={2} />,

    link: "/document-flow",
  },
  ...commonNavigation
]