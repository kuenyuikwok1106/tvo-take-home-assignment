'use client'

import Box from '@mui/material/Box';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Divider from '@mui/material/Divider';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import { usePathname, useRouter } from 'next/navigation';
import * as React from 'react';
import VerticalCenterTypography from '../VerticalCenterTypography/VerticalCenterTypography';

export default function GlobalBreadcrumbs() {
    const router = useRouter();
    const paths = usePathname().split('/').filter( path => path );

    const isRoot = paths.length === 0;
    const handleClick = () => {
        if(isRoot) return;
        else router.back()
    }

    return (
        <Box mb={2}>
            <Stack mb={1} direction="row" justifyContent="space-between" alignItems="center">
                <VerticalCenterTypography clickable={true} onClick={handleClick}>
                    <ArrowBackIcon />
                    Go Back
                </VerticalCenterTypography>
                <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 1 }}>
                    <Link underline="hover" color="inherit" href="/">
                        Dashboard
                    </Link>
                    {
                        paths.map((path, index) => (
                            <Link
                                key={path}
                                underline="hover"
                                color="inherit"
                                href={`/${paths.slice(0, index + 1).join('/')}`}
                                sx={{ textTransform: 'capitalize' }}
                            >
                                {path}
                            </Link>
                        ))
                    }
                </Breadcrumbs>
            </Stack>
            <Divider />
        </Box>
    )
}