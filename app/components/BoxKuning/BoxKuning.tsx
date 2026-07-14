import "./BoxKuning.css";

interface BoxKuningProps {
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

export default function BoxKuning({ className = "", style, children }: BoxKuningProps) {
  return (
    <div className={`box-kuning ${className}`} style={style}>
      <div className="box-kuning-inner-border" />
      <div className="box-kuning-highlight" />
      {children}
    </div>
  );
}