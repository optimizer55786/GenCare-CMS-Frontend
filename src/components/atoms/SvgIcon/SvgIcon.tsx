const SvgIcon = ({
  name,
  prefix = "icon",
  color = "red",
  height,
  width,
  onClick,
  className,
  ...props
}: {
  name: string;
  prefix?: string;
  color?: string;
  height?: number;
  onClick?: () => void;
  className?: string;
  width?: number;
}) => {
  const symbolId = `#${prefix}-${name}`;

  return (
    <svg width={width} height={height} {...props} aria-hidden="true">
      <use href={symbolId} />
    </svg>
  );
};

export default SvgIcon;
