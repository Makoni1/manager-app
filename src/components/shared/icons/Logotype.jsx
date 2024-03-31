import React from 'react';

const Logotype = ({ ...rest }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="69" height="34" viewBox="0 0 69 34" fill="none" {...rest}>
      <path d="M16.6666 21.1505C17.5923 23.5293 17.5923 26.1918 16.6666 28.5706C16.2312 29.6523 15.6014 30.6366 14.8112 31.4704C14.0417 32.2762 13.1256 32.9126 12.117 33.3425C11.0985 33.78 10.0074 34.0034 8.90618 34C7.67954 34 6.61994 33.7808 5.72738 33.3425C4.8348 32.9041 4.24871 32.359 3.9691 31.7069V33.527H0V8.97702H4.09824V17.9808C4.37712 17.3294 4.95254 16.7843 5.8245 16.3453C6.69647 15.9061 7.74503 15.687 8.97022 15.6878C10.0576 15.6857 11.1339 15.9153 12.1336 16.3625C13.1347 16.8048 14.0441 17.4461 14.8112 18.2507C15.6014 19.0845 16.2312 20.0688 16.6666 21.1505ZM12.8752 26.7159C13.1164 26.1304 13.2374 25.4986 13.2307 24.8611C13.2364 24.2183 13.1154 23.581 12.8752 22.9891C12.6497 22.433 12.3141 21.933 11.8907 21.5219C11.4508 21.1047 10.9356 20.7836 10.3753 20.5772C9.74822 20.3467 9.08738 20.2327 8.42273 20.2404C7.47067 20.2209 6.52864 20.4466 5.67992 20.8979C4.88447 21.3362 4.35762 21.8814 4.09934 22.5334V27.1542C4.35762 27.8063 4.88447 28.3514 5.67992 28.7898C6.52864 29.2411 7.47067 29.4669 8.42273 29.4472C9.08747 29.4551 9.7484 29.3407 10.3753 29.1093C10.9363 28.9044 11.4521 28.5835 11.8919 28.1658C12.3105 27.7583 12.6438 27.2647 12.8709 26.7159H12.8752Z" fill="#C3C5CA"/>
      <path d="M20.5674 12.8549C20.1236 12.3871 19.8487 11.7732 19.7893 11.1176C19.7299 10.4619 19.8897 9.8049 20.2415 9.25855C20.5933 8.7121 21.1155 8.3099 21.7191 8.12045C22.3227 7.93097 22.9704 7.96588 23.5522 8.21922C24.1339 8.47262 24.6137 8.92875 24.9098 9.51009C25.2061 10.0914 25.3003 10.7621 25.1767 11.4079C25.053 12.0537 24.7191 12.6349 24.2318 13.0524C23.7443 13.4699 23.1336 13.6981 22.5034 13.6981C22.1426 13.7034 21.7846 13.6314 21.4516 13.4863C21.1186 13.3413 20.8177 13.1264 20.5674 12.8549ZM20.4702 16.1642H24.5684V33.527H20.4702V16.1642Z" fill="#C3C5CA"/>
      <path d="M44.9956 33.5268H40.8974V24.1527C40.8974 22.8932 40.553 21.9262 39.8643 21.2518C39.1755 20.5775 38.3256 20.2403 37.3146 20.2403C36.4605 20.232 35.6235 20.4902 34.9106 20.9819C34.1894 21.4771 33.7539 22.1065 33.6038 22.8701V33.5268H29.5056V16.164H33.479V17.9183C33.7167 17.2662 34.2171 16.7322 34.9802 16.3162C35.7432 15.9002 36.7274 15.6922 37.9327 15.6922C38.801 15.6939 39.6628 15.8479 40.4824 16.1478C41.3165 16.4505 42.0832 16.9269 42.7362 17.5481C43.4358 18.2221 43.9927 19.0417 44.3709 19.9542C44.7903 20.9308 45 22.0942 45 23.4446L44.9956 33.5268Z" fill="#C3C5CA"/>
      <path d="M61.2159 4.87083L51.5131 14.4924L41.8092 4.87083L38.9116 7.74527L49.4633 18.2086V33H53.5618V18.2086L64.1136 7.74527L61.2159 4.87083Z" fill="#C3C5CA"/>
      <path d="M68.199 0.797786C67.6846 0.28728 66.9867 0.000308166 66.259 2.48049e-07C65.5312 -0.00030767 64.8332 0.286073 64.3184 0.796144C63.8036 1.30621 63.5142 1.99819 63.5139 2.71985C63.5136 3.4415 63.8023 4.13373 64.3168 4.64423C64.8311 5.15445 65.5289 5.44114 66.2564 5.44124C66.9839 5.44135 67.6817 5.15485 68.1963 4.64478C68.7108 4.13471 68.9998 3.44285 69 2.72139C69.0001 1.99994 68.7111 1.308 68.1968 0.797786H68.199Z" fill="#C3C5CA"/>
      <path d="M38.6832 0.820666C38.1688 0.31045 37.4711 0.0237564 36.7435 0.0236538C36.016 0.0235512 35.3182 0.310047 34.8037 0.820118C34.2892 1.33019 34.0001 2.02205 34 2.7435C33.9999 3.46495 34.2888 4.1569 34.8032 4.66711C35.3175 5.17733 36.0152 5.46402 36.7428 5.46413C37.4703 5.46423 38.1681 5.17773 38.6826 4.66766C39.1972 4.15759 39.4863 3.46573 39.4864 2.74428C39.4865 2.02283 39.1976 1.33088 38.6832 0.820666Z" fill="#C3C5CA"/>
    </svg>
  );
};

export default Logotype;