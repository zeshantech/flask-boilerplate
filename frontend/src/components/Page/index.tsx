import { Paper, PaperProps, SxProps } from "@mui/material";
import { ReactNode, Suspense } from "react";

interface PageProps extends PaperProps {
  children: ReactNode;
  isSuspense?: boolean;
  sx?: SxProps;
}

export default function Page({ children, sx, isSuspense }: PageProps) {
  const pageStyle: SxProps = {
    minHeight: "100vh",
    width: "100vw",
    padding: 0,
    margin: 0,
    ...sx,
  };

  if (isSuspense) {
    return (
      <Suspense fallback={null}>
        <Paper sx={pageStyle}>{children}</Paper>
      </Suspense>
    );
  }

  return <Paper sx={pageStyle}>{children}</Paper>;
}
