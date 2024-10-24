export function HeartIcon({
  size = "md",
  fill = false,
  color,
}: {
  size?: "sm" | "md";
  fill?: boolean;
  color?: "gray" | "red" | "orange";
}) {
  const width = size === "sm" ? 12 : 16;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={width}
      viewBox="0 0 16 16"
      fill={
        fill
          ? color === "gray"
            ? "var(--gray-300)"
            : color === "red"
              ? "var(--color-red)"
              : "var(--color-orange)"
          : "none"
      }
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.26941 14.3515C7.71341 14.6448 8.28608 14.6448 8.72941 14.3515C10.1394 13.4208 13.2094 11.1961 14.5321 8.70679C16.2754 5.42279 14.2281 2.14746 11.5214 2.14746C9.97875 2.14746 9.05075 2.95346 8.53741 3.64613C8.47576 3.73096 8.3949 3.8 8.30145 3.84761C8.20801 3.89521 8.10462 3.92003 7.99975 3.92003C7.89487 3.92003 7.79149 3.89521 7.69804 3.84761C7.60459 3.8 7.52374 3.73096 7.46208 3.64613C6.94875 2.95346 6.02075 2.14746 4.47808 2.14746C1.77141 2.14746 -0.275918 5.42279 1.46808 8.70679C2.78941 11.1961 5.86075 13.4208 7.26941 14.3515"
        fill="#E0E0E0"
        fillOpacity="0.2"
      />
      <path
        d="M7.26941 14.3515C7.71341 14.6448 8.28608 14.6448 8.72941 14.3515C10.1394 13.4208 13.2094 11.1961 14.5321 8.70679C16.2754 5.42279 14.2281 2.14746 11.5214 2.14746C9.97875 2.14746 9.05075 2.95346 8.53741 3.64613C8.47576 3.73096 8.3949 3.8 8.30145 3.84761C8.20801 3.89521 8.10462 3.92003 7.99975 3.92003C7.89487 3.92003 7.79149 3.89521 7.69804 3.84761C7.60459 3.8 7.52374 3.73096 7.46208 3.64613C6.94875 2.95346 6.02075 2.14746 4.47808 2.14746C1.77141 2.14746 -0.275918 5.42279 1.46808 8.70679C2.78941 11.1961 5.86075 13.4208 7.26941 14.3515"
        stroke={
          fill
            ? color === "gray"
              ? "var(--gray-300)"
              : color === "red"
                ? "var(--color-red)"
                : "var(--color-orange)"
            : "white"
        }
        strokeWidth="1"
      />
    </svg>
  );
}
