export function CheckCircleIcon({
  size,
  color,
  isFill,
}: {
  size: "sm" | "md" | "lg";
  color?: "mint" | "orange" | "gray";
  isFill: boolean;
}) {
  return size === "sm" ? (
    isFill ? (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="12"
        height="12"
        viewBox="0 0 12 12"
        fill="none"
      >
        <g clipPath="url(#clip0_2194_1565)">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M8.6035 5.1075L5.812 7.8995C5.71796 7.9929 5.59079 8.04532 5.45825 8.04532C5.32571 8.04532 5.19854 7.9929 5.1045 7.8995L3.3965 6.1915C3.35008 6.14508 3.31325 6.08997 3.28813 6.02931C3.26301 5.96866 3.25008 5.90365 3.25008 5.838C3.25008 5.70541 3.30275 5.57825 3.3965 5.4845C3.49025 5.39075 3.61741 5.33808 3.75 5.33808C3.88259 5.33808 4.00975 5.39075 4.1035 5.4845L5.458 6.839L7.8965 4.4005C7.94292 4.35408 7.99803 4.31725 8.05869 4.29213C8.11934 4.26701 8.18435 4.25408 8.25 4.25408C8.31565 4.25408 8.38066 4.26701 8.44131 4.29213C8.50197 4.31725 8.55708 4.35408 8.6035 4.4005C8.64992 4.44692 8.68675 4.50203 8.71187 4.56269C8.73699 4.62334 8.74992 4.68835 8.74992 4.754C8.74992 4.81965 8.73699 4.88466 8.71187 4.94531C8.68675 5.00597 8.64992 5.06108 8.6035 5.1075ZM6 0.5C2.9625 0.5 0.5 2.9625 0.5 6C0.5 9.0375 2.9625 11.5 6 11.5C9.0375 11.5 11.5 9.0375 11.5 6C11.5 2.9625 9.0375 0.5 6 0.5Z"
            fill={
              color === "mint"
                ? "var(--color-mint)"
                : color === "gray"
                ? "var(--gray-300)"
                : "white"
            }
          />
        </g>
        <defs>
          <clipPath id="clip0_2194_1565">
            <rect width="12" height="12" fill="white" />
          </clipPath>
        </defs>
      </svg>
    ) : (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="12"
        height="12"
        viewBox="0 0 12 12"
        fill="none"
      >
        <g clipPath="url(#clip0_2105_2224)">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M8.6 5.1L5.8 7.9C5.7 8 5.6 8.05 5.45 8.05C5.3 8.05 5.2 8 5.1 7.9L3.4 6.2C3.2 6 3.2 5.7 3.4 5.5C3.6 5.3 3.9 5.3 4.1 5.5L5.45 6.85L7.9 4.4C8.1 4.2 8.4 4.2 8.6 4.4C8.8 4.6 8.8 4.9 8.6 5.1Z"
            fill="white"
          />
          <path
            d="M6 1.5C8.5 1.5 10.5 3.5 10.5 6C10.5 8.5 8.5 10.5 6 10.5C3.5 10.5 1.5 8.5 1.5 6C1.5 3.5 3.5 1.5 6 1.5ZM6 0.5C2.95 0.5 0.5 2.95 0.5 6C0.5 9.05 2.95 11.5 6 11.5C9.05 11.5 11.5 9.05 11.5 6C11.5 2.95 9.05 0.5 6 0.5Z"
            fill="white"
          />
        </g>
        <defs>
          <clipPath id="clip0_2105_2224">
            <rect width="12" height="12" fill="white" />
          </clipPath>
        </defs>
      </svg>
    )
  ) : size === "md" ? (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 12 12" fill="none">
      <g clipPath="url(#clip0_2194_1565)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M8.6035 5.1075L5.812 7.8995C5.71796 7.9929 5.59079 8.04532 5.45825 8.04532C5.32571 8.04532 5.19854 7.9929 5.1045 7.8995L3.3965 6.1915C3.35008 6.14508 3.31325 6.08997 3.28813 6.02931C3.26301 5.96866 3.25008 5.90365 3.25008 5.838C3.25008 5.70541 3.30275 5.57825 3.3965 5.4845C3.49025 5.39075 3.61741 5.33808 3.75 5.33808C3.88259 5.33808 4.00975 5.39075 4.1035 5.4845L5.458 6.839L7.8965 4.4005C7.94292 4.35408 7.99803 4.31725 8.05869 4.29213C8.11934 4.26701 8.18435 4.25408 8.25 4.25408C8.31565 4.25408 8.38066 4.26701 8.44131 4.29213C8.50197 4.31725 8.55708 4.35408 8.6035 4.4005C8.64992 4.44692 8.68675 4.50203 8.71187 4.56269C8.73699 4.62334 8.74992 4.68835 8.74992 4.754C8.74992 4.81965 8.73699 4.88466 8.71187 4.94531C8.68675 5.00597 8.64992 5.06108 8.6035 5.1075ZM6 0.5C2.9625 0.5 0.5 2.9625 0.5 6C0.5 9.0375 2.9625 11.5 6 11.5C9.0375 11.5 11.5 9.0375 11.5 6C11.5 2.9625 9.0375 0.5 6 0.5Z"
          fill="white"
        />
      </g>
      <defs>
        <clipPath id="clip0_2194_1565">
          <rect width="12" height="12" fill="white" />
        </clipPath>
      </defs>
    </svg>
  ) : (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M17.207 10.215L11.624 15.799C11.4359 15.9858 11.1816 16.0906 10.9165 16.0906C10.6514 16.0906 10.3971 15.9858 10.209 15.799L6.793 12.383C6.70016 12.2902 6.62651 12.1799 6.57626 12.0586C6.52601 11.9373 6.50015 11.8073 6.50015 11.676C6.50015 11.4108 6.60549 11.1565 6.793 10.969C6.98051 10.7815 7.23482 10.6762 7.5 10.6762C7.76518 10.6762 8.01949 10.7815 8.207 10.969L10.916 13.678L15.793 8.801C15.8858 8.70816 15.9961 8.63451 16.1174 8.58426C16.2387 8.53401 16.3687 8.50815 16.5 8.50815C16.6313 8.50815 16.7613 8.53401 16.8826 8.58426C17.0039 8.63451 17.1142 8.70816 17.207 8.801C17.2998 8.89384 17.3735 9.00407 17.4237 9.12537C17.474 9.24668 17.4998 9.3767 17.4998 9.508C17.4998 9.6393 17.474 9.76932 17.4237 9.89063C17.3735 10.0119 17.2998 10.1222 17.207 10.215ZM12 1C5.925 1 1 5.925 1 12C1 18.075 5.925 23 12 23C18.075 23 23 18.075 23 12C23 5.925 18.075 1 12 1Z"
        fill={color === "mint" ? "#00C2B3" : color === "orange" ? "#ffa501" : "#e0e0e0"}
      />
    </svg>
  );
}

export function CheckCircleBigIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 50 50" fill="none">
      <path
        d="M25 0C11.225 0 0 11.225 0 25C0 38.775 11.225 50 25 50C38.775 50 50 38.775 50 25C50 11.225 38.775 0 25 0ZM36.95 19.25L22.775 33.425C22.425 33.775 21.95 33.975 21.45 33.975C20.95 33.975 20.475 33.775 20.125 33.425L13.05 26.35C12.325 25.625 12.325 24.425 13.05 23.7C13.775 22.975 14.975 22.975 15.7 23.7L21.45 29.45L34.3 16.6C35.025 15.875 36.225 15.875 36.95 16.6C37.675 17.325 37.675 18.5 36.95 19.25Z"
        fill="#00C2B3"
      />
    </svg>
  );
}

export function XCircleIcon({ size }: { size: "sm" | "md" }) {
  return size === "sm" ? (
    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
      <g clipPath="url(#clip0_2194_2037)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M8.1035 7.3965C8.14992 7.44292 8.18675 7.49803 8.21187 7.55869C8.23699 7.61934 8.24992 7.68435 8.24992 7.75C8.24992 7.81565 8.23699 7.88066 8.21187 7.94131C8.18675 8.00197 8.14992 8.05708 8.1035 8.1035C8.05708 8.14992 8.00197 8.18675 7.94131 8.21187C7.88066 8.23699 7.81565 8.24992 7.75 8.24992C7.68435 8.24992 7.61934 8.23699 7.55869 8.21187C7.49803 8.18675 7.44292 8.14992 7.3965 8.1035L6 6.707L4.6035 8.1035C4.55717 8.15009 4.50209 8.18707 4.44143 8.2123C4.38076 8.23753 4.3157 8.25052 4.25 8.25052C4.1843 8.25052 4.11924 8.23753 4.05857 8.2123C3.99791 8.18707 3.94283 8.15009 3.8965 8.1035C3.85003 8.05711 3.81316 8.002 3.788 7.94135C3.76285 7.88069 3.7499 7.81567 3.7499 7.75C3.7499 7.68433 3.76285 7.61931 3.788 7.55865C3.81316 7.498 3.85003 7.44289 3.8965 7.3965L5.293 6L3.8965 4.6035C3.85008 4.55708 3.81325 4.50197 3.78813 4.44131C3.76301 4.38066 3.75008 4.31565 3.75008 4.25C3.75008 4.18435 3.76301 4.11934 3.78813 4.05869C3.81325 3.99803 3.85008 3.94292 3.8965 3.8965C3.94292 3.85008 3.99803 3.81325 4.05869 3.78813C4.11934 3.76301 4.18435 3.75008 4.25 3.75008C4.31565 3.75008 4.38066 3.76301 4.44131 3.78813C4.50197 3.81325 4.55708 3.85008 4.6035 3.8965L6 5.293L7.3965 3.8965C7.44292 3.85008 7.49803 3.81325 7.55869 3.78813C7.61934 3.76301 7.68435 3.75008 7.75 3.75008C7.81565 3.75008 7.88066 3.76301 7.94131 3.78813C8.00197 3.81325 8.05708 3.85008 8.1035 3.8965C8.14992 3.94292 8.18675 3.99803 8.21187 4.05869C8.23699 4.11934 8.24992 4.18435 8.24992 4.25C8.24992 4.31565 8.23699 4.38066 8.21187 4.44131C8.18675 4.50197 8.14992 4.55708 8.1035 4.6035L6.707 6L8.1035 7.3965ZM6 0.5C2.9625 0.5 0.5 2.9625 0.5 6C0.5 9.0375 2.9625 11.5 6 11.5C9.0375 11.5 11.5 9.0375 11.5 6C11.5 2.9625 9.0375 0.5 6 0.5Z"
          fill="white"
        />
      </g>
      <defs>
        <clipPath id="clip0_2194_2037">
          <rect width="12" height="12" fill="white" />
        </clipPath>
      </defs>
    </svg>
  ) : (
    <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 26 26" fill="none">
      <path
        opacity="0.6"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16.0594 15.0313C16.1269 15.0988 16.1805 15.179 16.217 15.2672C16.2536 15.3554 16.2724 15.45 16.2724 15.5455C16.2724 15.6409 16.2536 15.7355 16.217 15.8237C16.1805 15.912 16.1269 15.9921 16.0594 16.0596C15.9919 16.1272 15.9117 16.1807 15.8235 16.2173C15.7353 16.2538 15.6407 16.2726 15.5452 16.2726C15.4497 16.2726 15.3552 16.2538 15.2669 16.2173C15.1787 16.1807 15.0986 16.1272 15.031 16.0596L12.9998 14.0284L10.9685 16.0596C10.9011 16.1274 10.821 16.1812 10.7327 16.2179C10.6445 16.2546 10.5499 16.2735 10.4543 16.2735C10.3587 16.2735 10.2641 16.2546 10.1759 16.2179C10.0876 16.1812 10.0075 16.1274 9.94012 16.0596C9.87252 15.9922 9.8189 15.912 9.78231 15.8238C9.74572 15.7355 9.72688 15.641 9.72688 15.5455C9.72688 15.4499 9.74572 15.3554 9.78231 15.2671C9.8189 15.1789 9.87252 15.0988 9.94012 15.0313L11.9714 13L9.94012 10.9687C9.8726 10.9012 9.81903 10.821 9.78249 10.7328C9.74595 10.6446 9.72714 10.55 9.72714 10.4545C9.72714 10.3591 9.74595 10.2645 9.78249 10.1763C9.81903 10.088 9.8726 10.0079 9.94012 9.94036C10.0076 9.87284 10.0878 9.81928 10.176 9.78273C10.2643 9.74619 10.3588 9.72738 10.4543 9.72738C10.5498 9.72738 10.6444 9.74619 10.7326 9.78273C10.8208 9.81928 10.901 9.87284 10.9685 9.94036L12.9998 11.9716L15.031 9.94036C15.0986 9.87284 15.1787 9.81928 15.2669 9.78273C15.3552 9.74619 15.4497 9.72738 15.5452 9.72738C15.6407 9.72738 15.7353 9.74619 15.8235 9.78273C15.9117 9.81928 15.9919 9.87284 16.0594 9.94036C16.1269 10.0079 16.1805 10.088 16.217 10.1763C16.2536 10.2645 16.2724 10.3591 16.2724 10.4545C16.2724 10.55 16.2536 10.6446 16.217 10.7328C16.1805 10.821 16.1269 10.9012 16.0594 10.9687L14.0281 13L16.0594 15.0313ZM12.9998 5C8.58157 5 4.99976 8.58182 4.99976 13C4.99976 17.4182 8.58157 21 12.9998 21C17.4179 21 20.9998 17.4182 20.9998 13C20.9998 8.58182 17.4179 5 12.9998 5Z"
        fill="#BDBDBD"
      />
    </svg>
  );
}

export function InfoCircleIcon() {
  return <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
    <g clip-path="url(#clip0_2444_1052)">
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M10 7.66671C9.73479 7.66671 9.48044 7.56135 9.2929 7.37381C9.10537 7.18628 9.00001 6.93192 9.00001 6.66671C9.00001 6.40149 9.10537 6.14714 9.2929 5.9596C9.48044 5.77206 9.73479 5.66671 10 5.66671C10.2652 5.66671 10.5196 5.77206 10.7071 5.9596C10.8947 6.14714 11 6.40149 11 6.66671C11 6.93192 10.8947 7.18628 10.7071 7.37381C10.5196 7.56135 10.2652 7.66671 10 7.66671ZM10.8333 13.8625C10.8333 14.0836 10.7455 14.2955 10.5893 14.4518C10.433 14.6081 10.221 14.6959 10 14.6959C9.779 14.6959 9.56704 14.6081 9.41076 14.4518C9.25447 14.2955 9.16668 14.0836 9.16668 13.8625V9.69587C9.16668 9.47486 9.25447 9.2629 9.41076 9.10662C9.56704 8.95034 9.779 8.86254 10 8.86254C10.221 8.86254 10.433 8.95034 10.5893 9.10662C10.7455 9.2629 10.8333 9.47486 10.8333 9.69587V13.8625ZM10 0.833374C4.93751 0.833374 0.833344 4.93754 0.833344 10C0.833344 15.0625 4.93751 19.1667 10 19.1667C15.0625 19.1667 19.1667 15.0625 19.1667 10C19.1667 4.93754 15.0625 0.833374 10 0.833374Z"
        fill="#E0E0E0"
      />
    </g>
    <defs>
      <clipPath id="clip0_2444_1052">
        <rect width="20" height="20" fill="white" />
      </clipPath>
    </defs>
  </svg>
}
