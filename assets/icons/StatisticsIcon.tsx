interface StatisticsIconProps {
  isDark?: boolean;
}

function StatisticsIcon({ isDark = true }: StatisticsIconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="none">
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M7.25 16.125H4.25C4.04289 16.125 3.875 16.2929 3.875 16.5V19.5C3.875 19.7071 4.04289 19.875 4.25 19.875H7.25C7.45711 19.875 7.625 19.7071 7.625 19.5V16.5C7.625 16.2929 7.45711 16.125 7.25 16.125ZM4.25 15C3.42157 15 2.75 15.6716 2.75 16.5V19.5C2.75 20.3284 3.42157 21 4.25 21H7.25C8.07843 21 8.75 20.3284 8.75 19.5V16.5C8.75 15.6716 8.07843 15 7.25 15H4.25Z"
        fill={isDark ? "#222222" : "#A0A1A3"}
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M14.25 4.17391H11.25C11.0429 4.17391 10.875 4.34911 10.875 4.56522V19.4348C10.875 19.6509 11.0429 19.8261 11.25 19.8261H14.25C14.4571 19.8261 14.625 19.6509 14.625 19.4348V4.56522C14.625 4.34911 14.4571 4.17391 14.25 4.17391ZM11.25 3C10.4216 3 9.75 3.70077 9.75 4.56522V19.4348C9.75 20.2992 10.4216 21 11.25 21H14.25C15.0784 21 15.75 20.2992 15.75 19.4348V4.56522C15.75 3.70077 15.0784 3 14.25 3H11.25Z"
        fill={isDark ? "#222222" : "#A0A1A3"}
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M21.25 10.125H18.25C18.0429 10.125 17.875 10.2929 17.875 10.5V19.5C17.875 19.7071 18.0429 19.875 18.25 19.875H21.25C21.4571 19.875 21.625 19.7071 21.625 19.5V10.5C21.625 10.2929 21.4571 10.125 21.25 10.125ZM18.25 9C17.4216 9 16.75 9.67157 16.75 10.5V19.5C16.75 20.3284 17.4216 21 18.25 21H21.25C22.0784 21 22.75 20.3284 22.75 19.5V10.5C22.75 9.67157 22.0784 9 21.25 9H18.25Z"
        fill={isDark ? "#222222" : "#A0A1A3"}
      />
    </svg>
  );
}

export default StatisticsIcon;
