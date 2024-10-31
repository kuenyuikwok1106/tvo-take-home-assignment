import { styled, Typography, TypographyProps } from "@mui/material";

interface StyledTypographtProps extends TypographyProps {
    clickable?: boolean;

}

const VerticalCenterTypography = styled(Typography, {
    shouldForwardProp: (prop) => prop !== 'clickable',
  })<StyledTypographtProps>(({ clickable }) => ({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    ...(clickable && {
        '&:hover': {
            cursor: 'pointer',
        }
    })
}));

export default VerticalCenterTypography;